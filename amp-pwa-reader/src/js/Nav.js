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

class Nav {

  constructor() {
    this.category = null;
    this.cards = [];
    this.feedReader = new FeedReader;
    this.element = document.querySelector('.sr-navigation');

    this.bind();

    // initialize slide logic
    this.initMenuSlide();

    // Create the nav items from categories
    this.create();

    // The history module resolves the initial state from either the history API
    // or the loaded URL, in case there's no history entry.
    var state = shadowReader.history.state;

    if (state.articleUrl) {
      // Open the correct article, even before switching to the category, if we
      // have one (but only when the AMP lib is ready, since it's loaded async).
      shadowReader.ampReady(() => {
        this.startWithArticle(state);
      });
    } else {
      // If there's no article to be loaded, just load the default or
      // selected category.
      this.switchCategory(state.category);
    }

  }

  clear() {
    this.element.innerHTML = '';
  }

  create() {

    let fragment = document.createDocumentFragment();

    for (let category in shadowReader.backend.categories) {
      let item = document.createElement('li');
      let link = document.createElement('a');
      link.href = '#';
      link.dataset.tag = category;
      link.textContent = shadowReader.backend.categories[category];
      item.appendChild(link);
      fragment.appendChild(item);
    }

    this.element.appendChild(fragment);

  }

  initMenuSlide() {

    const skirt = document.querySelector('.sr-navigation-skirt');
    var wasOpen = false;
    var delta = 0;

    this.dragObserver = new DragObserver(document, { axis: 'x' });

    this.dragObserver.bind('start', () => {
      wasOpen = document.body.classList.contains('sr-nav-shown');
      this.element.classList.add('sr-disable-transitions');
    });

    this.dragObserver.bind('move', (position) => {
      delta = position.x;
      let refPoint = wasOpen ? 0 : 200;
      let x = Math.max(-200, Math.min(position.x, refPoint) - refPoint);
      this.element.style.transform = 'translateX(' + x + 'px)';
      skirt.style.opacity = 1 - (x / -200);
    });

    this.dragObserver.bind('stop', () => {
      this.element.classList.remove('sr-disable-transitions');
      this.element.style.transform = '';
      skirt.style.opacity = '';
      if (Math.abs(delta) > 70) {
        this[wasOpen ? 'hide' : 'show']();
      }
    });

  }

  startWithArticle(state) {

    let article = Article.getArticleByURL(state.articleUrl) || new Article(state.articleUrl, null, false);

    // if we have a card, things are easy: simply pretend we click on the card!
    if (article.card) {
      return article.card.activate();
    }

    // otherwise things are a little more complicated, as we have no card to click on.
    // load the article, render it invisibly, created the card, and then show everything.

    article.load()
      .then(() => article.render())
      .then(() => {

        article.getClonedCardElem();

        // disable transitions temporarily, don't want them at load time
        article.container.classList.add('sr-disable-transitions');

        // passing true here ensures that the state is overwritten again..
        article.show(true).then(() => {
          // hide the skeleton UI
          // INVESTIGATE: For some reason needs a delay..
          setTimeout(() => {
            document.body.classList.remove('sr-skeleton-ui-article');
            article.container.classList.remove('sr-disable-transitions');
          }, 100);

        });

        // the return button in this state is a special case, and can't animate (yet)
        this.hamburgerReturnAction = () => {
          shadowReader.enableCardTabbing();
          article.card && article.card.animateBack();
          article.hide();
          shadowReader.history.navigate(null);
        };

        // switch to the correct category only after the article is loaded for max perf
        this.switchCategory(state.category).then(() => {
          // now that the cards have been lazily loaded, attempt to reconnect the
          // already loaded article with the proper card
          for (let card of this.cards) {
            if (card.article.url === article.url) {
              card.ready(() => {

                // link our custom initialized article with our card
                article.card = card;
                card.article = article;

                // if the card is somewhere outside the scroll position, we need
                // to set it to a place where the card is actually visible.
                article._mainScrollY = Math.max(0, card.elem.offsetTop - innerHeight / 3);

                // apply the 'zoomed-in' state on the card behind the scenes, so
                // we can animate back when the user clicks back
                // TODO: stupid to call this method animate..
                article.card.animate(false, -article._mainScrollY);

              });
            }
          }

          // set main view to inert so you can't tab into it
          shadowReader.disableCardTabbing();

        });

      });

  }

  setOpenArticle(article, replace) {
    this.openArticle = article;

    // Set new history entry
    shadowReader.history.navigate(article.url, replace, article.ampDoc.title);
  }

  getNavElement(category) {
    return document.querySelector('.sr-navigation a[data-tag="' + category + '"]');
  }

  setNavElement(category) {

    // mark old menu element as inactive
    if (this.category) {
      let oldNavElement = this.getNavElement(this.category);
      oldNavElement && oldNavElement.parentNode.classList.remove('active');
    }

    // mark new one as active
    let navElement = this.getNavElement(category);
    navElement.parentNode.classList.add('active');

    // change category title
    document.querySelector('.sr-category span').textContent = this.categoryTitle;

  }

  switchCategory(category) {

    // set the new title
    this.categoryTitle = shadowReader.backend.getCategoryTitle(category);

    // mark menu element as active
    this.setNavElement(category);

    // set the category
    this.category = category;

    // set current cards to loading
    for (let card of this.cards) {
      card.elem.classList.add('sr-loading');
    }

    // hide menu
    this.hide();

    // fetch new nav entries via RSS via our server
    return this.feedReader.fetch(category).then(entries => {

      // if this is the first time loading cards, now would
      // be a good time to remove the skeleton ui class from the body
      if (!this._cardViewInitialized) {
        document.body.classList.remove('sr-skeleton-ui');
        this._cardViewInitialized = true;
      }

      // If for some reason the feed failed, let's bail
      if(!entries.length) {
        console.error('feed failed to update!');
        return;
      }

      // empty items container (lazy..)
      shadowReader.itemsElement.innerHTML = '';
      this.cards = [];

      // render new entries
      let prerender = 3;
      for (let entry of entries) {
        this.cards.push(new Card(entry, /*headless*/false, /*prerender*/--prerender >= 0));
      }

      // reset scroll position
      document.scrollingElement.scrollTop = 0;

      // restore focus
      shadowReader.itemsElement.firstElementChild.children[1].focus();

    });

  }

  show() {

    //disable focus for all menu elements
    let children = Array.from(this.element.children); // sadly needed for Safari
    for (let child of children) {
      child.firstChild.removeAttribute('tabindex');
    }

      // focus the first element in the menu
    this.element.children[0].firstChild.focus();

    document.body.classList.add('sr-nav-shown');

  }

  hide() {

    //disable focus for all menu elements
    const children = Array.from(this.element.children); // sadly needed for Safari
    for (let child of children) {
      child.firstChild.setAttribute('tabindex', '-1');
    }

    // focus on the appropriate card in the main view
    shadowReader.focusVisibleCard();

    document.body.classList.remove('sr-nav-shown');
  }

  toggle() {
    return this[document.body.classList.contains('sr-nav-shown') ? 'hide' : 'show']();
  }

  resize() {
    for (let card of this.cards) {
      card.refresh();
    }
  }

  bind() {

    /* history navigation */
    window.addEventListener('popstate', event => {

      let state = {
        category: event.state && event.state.category ? event.state.category : this.category,
        articleUrl: event.state ? event.state.articleUrl : null
      };

      // switch to the correct category if not already on it
      if (this.category !== state.category) {
        this.switchCategory(state.category);
      }

      // if we go to a state where no article was open, and we have a
      // currently-opened one, close it again
      if (this.openArticle && !state.articleUrl && this.hamburgerReturnAction) {
        this.hamburgerReturnAction();
        this.hamburgerReturnAction = null;
        this.openArticle = null;
      }

      // If there's an article in the state object, we need to open it
      if (state.articleUrl) {
        this.startWithArticle(state);
      }

    }, false);

    /* clicks on the hamburger menu icon */
    document.querySelector('.sr-hamburger').addEventListener(shadowReader.clickEvent, event => {

      // default menu toggle (only executes when not in article view)
      !document.documentElement.classList.contains('sr-article-shown') && this.toggle();

      // use as temporary back button
      if (this.hamburgerReturnAction) {
        this.hamburgerReturnAction(event);
        this.hamburgerReturnAction = null;
      }

    }), false;

    /* clicks on menu links */
    document.querySelector('.sr-navigation').addEventListener(shadowReader.clickEvent, event => {

      // we're doing event delegation, and only want to trigger action on links
      if (event.target.nodeName !== 'A')
        return;

      // switch to the clicked category
      this.switchCategory(event.target.dataset.tag, event.target.parentNode);

      // set entry in the browser history, navigate URL bar
      shadowReader.history.navigate(null);

      event.preventDefault();
    }), false;

    /* clicks on menu skirt */
    document.querySelector('.sr-navigation-skirt').addEventListener(shadowReader.clickEvent, () => {
      this.hide();
    }), false;

    /* resize event, mostly relevant for Desktop resolutions */
    let debounce;
    window.addEventListener('resize', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        this.resize();
      }, 100);
    });

  }

}