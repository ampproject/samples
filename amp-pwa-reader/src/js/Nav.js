class Nav {

  constructor() {
    this.category = null;
    this.cards = [];
    this.feedReader = new FeedReader;

    this.bind();

    // Create the nav items from categories
    this.create();

    // The history module resolves the initial state from either the history API
    // or the loaded URL, in case there's no history entry.
    var state = shadowReader.history.state;

    if (state.articleUrl) {
      // Open the correct article, even before switching to the category, if we
      // have one.
      this.startWithArticle(state);
    } else {
      // If there's no article to be loaded, just load the default or
      // selected category.
      this.switchCategory(state.category);
    }

  }

  clear() {
    document.querySelector('ul.sr-navigation').innerHTML = '';
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

    document.querySelector('ul.sr-navigation').appendChild(fragment);

  }

  startWithArticle(state) {

    let article = Article.getArticleByURL(state.articleUrl) || new Article(state.articleUrl);

    // if we have a card, things are easy: simply pretend we click on the card!
    if (article.card) {
      return article.card.activate();
    }

    // otherwise things are a little more complicated, as we have no card to click on..
    article.load()
      .then(() => article.render())
      .then(() => {

        // passing true here ensures that the state is overwritten again..
        article.show(true).then(() => {
          // hide the skeleton UI
          // INVESTIGATE: For some reason needs a delay..
          setTimeout(() => {
            document.body.classList.remove('sr-show-article-skeleton');
          }, 100);

        });

        // the return button in this state is a special case, and can't animate (yet)
        this.hamburgerReturnAction = () => {
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
      oldNavElement && oldNavElement.classList.remove('active');
    }

    // mark new one as active
    let navElement = this.getNavElement(category);
    navElement.classList.add('active');

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

    // fetch new nav entries via RSS via YQL
    return this.feedReader.fetch(category).then(entries => {

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

    });

  }

  show() {
    document.body.classList.add('sr-nav-shown');
  }

  hide() {
    document.body.classList.remove('sr-nav-shown');
  }

  toggle() {
    return this[document.body.classList.contains('sr-nav-shown') ? 'hide' : 'show']();
  }

  bind() {

    /* history navigation */
    window.addEventListener('popstate', event => {

      var state = {
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

    // click on backend switcher
    document.querySelector('.sr-backend-switcher').addEventListener(shadowReader.clickEvent, event => {
      document.documentElement.classList.toggle('sr-backend-selector-visible');
      event.preventDefault();
    }), false;

    // clicks on the actual backends in the selector
    document.querySelector('.sr-backend-selector').addEventListener(shadowReader.clickEvent, event => {
      event.preventDefault();

      // we're doing event delegation, and only want to trigger action on links
      if (event.target.parentNode.nodeName !== 'A')
        return;

      // hide itself..
      document.documentElement.classList.toggle('sr-backend-selector-visible');

      var backend = event.target.parentNode.dataset.backend;
      shadowReader.switchBackend(Backend.get(backend));

    }), false;

  }

}