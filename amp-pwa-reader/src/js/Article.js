/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class Article {

  constructor(url, card, streaming) {
    this.url = shadowReader.backend.getAMPUrl(url);
    this.proxyUrl = this.urlProxy(this.url);
    this.card = card;
    this.streaming = streaming;
    Article.articles[this.url] = this;
  }

  fetch() {

    // we use XMLHttpRequest instead of fetch() because it returns a ready-to-use Document object
    var xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open('GET', this.proxyUrl, true);
      xhr.responseType = 'document';
      xhr.setRequestHeader('Accept', 'text/html');
      xhr.onload = () => {
        var isAMP = xhr.responseXML.documentElement.hasAttribute('amp') || xhr.responseXML.documentElement.hasAttribute('⚡');
        return isAMP ? resolve(xhr.responseXML) : reject('Article does not have an AMP version.');
      };
      xhr.send();
    });

  }

  // see https://github.com/ampproject/amphtml/blob/master/spec/amp-shadow-doc.md
  // and https://jakearchibald.com/2016/fun-hacks-faster-content/
  // Recursively read and write chunks of data from the streaming API
  stream() {
    var shadowDoc = this.ampDoc;    // let's get this into the closure, and thus accessible to callback
    var article = this;             // this too

    fetch(this.proxyUrl).then(async response => {
      let reader = response.body.getReader();
      let decoder = new TextDecoder();

      while (true) {
        let chunk = await reader.read();

        if (chunk.done) {
          shadowDoc.writer.close();
          break;
        }

        let html = decoder.decode(
          chunk.value || new Uint8Array(),
          {stream: !chunk.done}
        );

        // check each chunk of HTML to see if it contains <style amp-custom>. If so, add in some extra CSS.
        // TODO: this will fail in the rare case that "<body" arrives in <1 chunk.
        if (html) {
          html = shadowReader.backend.injectCSS(html);

          // when we've got the body, start the process of animating the card and showing the article,
          // placing the card before the article
          if (html.includes('<body')) {
            html = article.prependCardHtml(html);
            shadowDoc.writer.write(html);
            article.card.animate();
            article.show();

          } else {
            shadowDoc.writer.write(html);
          }

        }
      }
      
    });

    return this.ampDoc.ampdoc.whenReady();
  }

  // Used during streaming. If we see <body>, add in the HTML of the card.
  // Also add in the CSS that was extracted from inline.css during the build process.
  prependCardHtml(html) {
    return html.replace(/<body.*?>/, '$&' + this.clonedCardElem.outerHTML);
  }

  load() {
    return (this.doc ? Promise.resolve() : this.fetch().then(doc => {
      this.doc = doc;
      this.sanitize();
    }));
  }

  clear() {
    this.ampDoc.close();
    this.destroyShadowRoot();
  }

  sanitize() {
    let doc = this.doc;
    let hasCard = !!this.card;

    // call the sanitizer of the respective content backend
    shadowReader.backend.sanitize(doc, hasCard);

    // add the correct backend class, as the styling expects it
    this.doc.body.classList.add('sr-backend-' + shadowReader.backend.pathname);

    // insert stylesheet that styles the featured image
    var stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.href = '/inline.css';
    doc.body.append(stylesheet);
  }

  createShadowRoot() {
    var shadowRoot = document.createElement('article');
    shadowRoot.classList.add('sr-article');
    document.body.appendChild(shadowRoot);
    return shadowRoot;
  }

  destroyShadowRoot() {
    document.body.removeChild(this.container);
  }

  cloneCard() {
    let cardElem = this.card.elem.cloneNode(true);

    // clear all transforms
    cardElem.style.transform = '';
    cardElem.children[0].style.transform = '';
    cardElem.children[1].style.transform = '';

    // resize card to image ratio
    cardElem.style.height = (innerWidth * this.card.imageData.ratio) + 'px';
    cardElem.style.opacity = '0';
    cardElem.style.margin = '0';

    this.clonedCardElem = cardElem;
  }

  generateCard() {
    let articleData = shadowReader.backend.getArticleData();
    let cardElem = new Card(articleData, /*headless*/true, /*prerender*/false, this.streaming).elem;

    // resize card to image ratio
    cardElem.style.height = (innerWidth * articleData.imageRatio) + 'px';
    cardElem.style.margin = '0';

    this.clonedCardElem = cardElem;
  }

  get cssVariables() {
    if (!this._cssVariables) {
      let htmlStyles = window.getComputedStyle(document.querySelector("html"));
      this._cssVariables = {
        animationSpeedIn: parseFloat(htmlStyles.getPropertyValue("--animation-speed-in")) * 1000,
        animationSpeedOut: parseFloat(htmlStyles.getPropertyValue("--animation-speed-in")) * 1000,
        easing: htmlStyles.getPropertyValue("--animation-easing")
      };
    }

    return this._cssVariables;

  }

  animateIn() {
    // No animation if there's no card to animate from
    if (!this.card) {
      return Promise.resolve();
    }

    return new Promise(resolve => {

      let _transitionEnd = () => {
        this.container.removeEventListener('transitionend', _transitionEnd);
        resolve();
      };

      this.container.addEventListener('transitionend', _transitionEnd, false);
      this.container.classList.add('at-top');

    });

  }

  animateOut() {
    // No animation if there's no card to animate from
    if (!this.card) {
      return Promise.resolve();
    }

    return new Promise(resolve => {

      let _transitionEnd = () => {
        this.container.removeEventListener('transitionend', _transitionEnd);
        resolve();
      };

      this.container.addEventListener('transitionend', _transitionEnd, false);
      this.container.classList.remove('at-top');

    });

  }

  render() {
      // Create an empty container for the AMP page
      this.container = this.createShadowRoot();

      // Tell Shadow AMP to initialize the AMP page in prerender-mode
      this.ampDoc = AMP.attachShadowDoc(this.container, this.doc, this.url);
      this.ampDoc.setVisibilityState('prerender');

      return this.ampDoc.ampdoc.whenReady();
  }

  // in the streaming case, simply create the shadow root, and do the rest in stream()
  renderStreaming() {
    this.container = this.createShadowRoot();
    this.ampDoc = AMP.attachShadowDocAsStream(this.container, this.url); 
  }


  // We need to clone the featured image into the Shadow DOM so it scrolls
  // along. There are cases were we don't have a linked card from the list
  // view (e.g. we load directly into the article), in which case we need to
  // generate a new one.
  getClonedCardElem() {
    this.card ? this.cloneCard() : this.generateCard();

    if (!this.streaming) {
      this.clonedCardElem.lastElementChild.onclick = function () { return false; };  //TODO: we will lose this in streaming case  
    }
  }

  show(replaceHistoryState) {
    if (!this.streaming) {
      this.ampDoc.ampdoc.getBody().prepend(this.clonedCardElem);  //TODO: this should perhaps be elsewhere in the code
    }

    // animate the article in. Only makes sense when there's a card transition
    // at the same time, within animateIn, we check for the availability of a
    // connected card, and don't animate if it's not around.
    return this.animateIn().then(() => {

      // Hide the original card, show the cloned one (this also animates)
      // if we're streaming, the clonedCardElem got serialized into HTML and written into the DOM. 
      // So we need to get that back out of the DOM.
      if (this.card) {
        let clonedCardElem = this.streaming ? this.container.shadowRoot.querySelector('.sr-card') : this.clonedCardElem;
        clonedCardElem.style.opacity = '1';
      }

      // add class to html element for to contain the scroll, and transform
      // the hamburger into a 'back' button.
      document.documentElement.classList.add('sr-article-shown');

      this.takeoverScroll();

      // Set the visibility state of the AMP doc to visible
      this.ampDoc.setVisibilityState('visible');

      // Finally, add new history entry
      // Note: We're doing this deliberately late due to an AMP
      // Bug that overrides the history state object early on
      shadowReader.nav.setOpenArticle(this, replaceHistoryState);
      return true;
    });

  }

  hide() {
    // remove class to html element for global CSS stuff
    document.documentElement.classList.remove('sr-article-shown');

    // for some reason the browser restores scroll lazily, so we need
    // to wait a few ms until scrollTop can be set again..
    setTimeout(() => {

      this.restoreScroll();

      // Show the card header, hide the cloned one
      if (this.card) {
        this.clonedCardElem.style.opacity = '0';
      }

      // animate everything back to the card/listing view, then
      // clear the old Shadow DOM to free up memory.
      return this.animateOut().then(() => {
        this.clear();
        return true;
      });

    }, 50);

  }

  takeoverScroll() {
    this._mainScrollY = document.scrollingElement.scrollTop;
    document.scrollingElement.scrollTop = 0;
    this.container.style.transform = '';

  }

  restoreScroll() {
    document.scrollingElement.scrollTop = this._mainScrollY;
  }

  // Proxy this URL through our server to avoid CORS restrictions and enable caching
  urlProxy(url) {
    return '/article?url=' + encodeURIComponent(url);
  }

}

Article.articles = {};
Article.getArticleByURL = function (url) {
  return Article.articles[url];
};