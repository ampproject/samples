class Article {

  constructor(url, card) {
    this.url = shadowReader.backend.getAMPUrl(url);
    this.card = card;
    Article.articles[this.url] = this;
  }

  fetch() {

    // unfortunately fetch() does not support retrieving documents,
    // so we have to resort to good old XMLHttpRequest.
    var xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open('GET', 'https://seed-octagon.glitch.me/' + encodeURIComponent(this.url), true);
      xhr.responseType = 'document';
      xhr.setRequestHeader('Accept', 'text/html');
      xhr.onload = () => {
        var isAMP = xhr.responseXML.documentElement.hasAttribute('amp') || xhr.responseXML.documentElement.hasAttribute('⚡');
        if (isAMP) {
          resolve(xhr.responseXML);
        } else {
          reject('Article does not have an AMP version.');
        }
      }; // .responseXML contains a ready-to-use Document object
      xhr.send();
    });

  }

  load() {
    return (this.doc ? new Promise(resolve => resolve()) : this.fetch().then(doc => {
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

    // insert stylesheet that styles the featured image
    var stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.href = '/inline.css';
    this.doc.body.append(stylesheet);

  }

  createShadowRoot() {
    var shadowRoot = document.createElement('article');
    document.body.appendChild(shadowRoot);
    return shadowRoot;
  }

  destroyShadowRoot() {
    document.body.removeChild(this.container);
  }

  cloneCard() {

    let card = this.card.elem.cloneNode(true);

    // clear all transforms
    card.style.transform = '';
    card.children[0].style.transform = '';
    card.children[1].style.transform = '';

    // resize card to image ratio
    card.style.height = (innerWidth * this.card.imageData.ratio) + 'px';
    card.style.opacity = '0';
    card.style.margin = '0';

    this.clonedCard = card;
    return card;

  }

  generateCard() {

    let articleData = shadowReader.backend.getArticleData();
    let card = new Card(articleData, /*headless*/true).elem;

    // resize card to image ratio
    card.style.height = (innerWidth * articleData.imageRatio) + 'px';
    card.style.margin = '0';

    this.clonedCard = card;
    return card;

  }

  getAnimationSpeed() {
    if (this._animationSpeed)
      return this._animationSpeed;

    let htmlStyles = window.getComputedStyle(document.querySelector("html"));
    this._animationSpeed = parseFloat(htmlStyles.getPropertyValue("--animation-speed")) * 1000;
    return this._animationSpeed;
  }

  animateIn() {

    // No animation if there's no card to animate from
    if (!this.card) {
      return new Promise(resolve => resolve());
    }

    let offset = (innerWidth * this.card.imageData.ratio) / 2;
    this.container.style.transform = 'translateY(' + scrollY + 'px)';

    return new Promise(resolve => {
      this.container.animate([
        { opacity: 0, transform: 'translateY(' + (offset + scrollY) + 'px)' },
        { opacity: 1, transform: 'translateY(' + scrollY + 'px)' }
      ], { duration: this.getAnimationSpeed(), easing: 'ease-out' }).onfinish = resolve;
    });

  }

  animateOut() {

    // No animation if there's no card to animate from
    if (!this.card) {
        return new Promise(resolve => resolve());
    }

    let offset = (innerWidth * this.card.imageData.ratio) / 2;
    this.container.style.transform = 'translateY(' + (offset + scrollY) + 'px)';

    return new Promise(resolve => {
      return this.container.animate([
        { opacity: 1, transform: 'translateY(' + (scrollY) + 'px)' },
        { opacity: 0, transform: 'translateY(' + (offset + scrollY) + 'px)' }
      ], { duration: this.getAnimationSpeed(), easing: 'ease-out' }).onfinish = resolve;
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

  show(replaceHistoryState) {

    // We need to clone the featured image into the Shadow DOM so it scrolls
    // along. There are cases were we don't have a linked card from the list
    // view (e.g. we load directly into the article), in which case we need to
    // generate a new one.
    var card = this.card ? this.cloneCard() : this.generateCard();
    this.ampDoc.ampdoc.getBody().prepend(card);

    return new Promise(resolve => {

      // animate the article in. Only makes sense when there's a card transition
      // at the same time, within animateIn, we check for the availability of a
      // connected card, and don't animate if it's not around.
      this.animateIn().then(() => {

        // Hide the original card, show the cloned one (this also animates)
        if (this.card) {
          card.style.opacity = '1';
        }

        // add class to html element for to contain the scroll, and transform
        // the hamburger into a 'back' button.
        document.documentElement.classList.add('article-shown');

        this.takeoverScroll();

        // Set the visibility state of the AMP doc to visible
        this.ampDoc.setVisibilityState('visible');

        // Finally, add new history entry
        // Note: We're doing this deliberately late due to an AMP
        // Bug that overrides the history state object early on
        shadowReader.nav.setOpenArticle(this, replaceHistoryState);

        resolve();
      });
    });

  }

  hide() {

    // remove class to html element for global CSS stuff
    document.documentElement.classList.remove('article-shown');

    // for some reason the browser restores scroll lazily, so we need
    // to wait a few ms until scrollTop can be set again..
    setTimeout(() => {

      this.restoreScroll();

      // Show the card header, hide the cloned one
      if (this.card) {
        this.clonedCard.style.opacity = '0';
      }

      // animate everything back to the card/listing view, then
      // clear the old Shadow DOM to free up memory.
      return new Promise(resolve => {
        this.animateOut().then(() => {
          this.clear();
          resolve();
        });
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

}

Article.articles = {};
Article.getArticleByURL = function (url) {
  return Article.articles[url];
}