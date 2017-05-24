class Nav {

  constructor() {
    this.category = null;
    this.cards = [];

    this.bind();

    // Open the correct article, even before switching to the category
    // TODO: AMP for some reason overrides the history state object, argh
    if (history.state && history.state.articleUrl) {
      this.startWithArticle(history.state);
    } else {

      // switch to the correct category immediately
      this.switchCategory(history.state && history.state.category ? history.state.category : 'us/travel');

    }

  }

  startWithArticle(state) {

    let article = Article.getArticleByURL(state.articleUrl) || new Article(state.articleUrl);

    // if we have a card, things are easy: simply pretend we click on the card!
    if (article.card) {
      return article.card.activate();
    }

    // otherwise things are a little more complicated, as we have no card to click on..
    article.load().then(() => {

      // passing true here ensures that the state is overwritten again..
      article.show(true);

      // the return button in this state is a special case, and can't animate (yet)
      menuButton.onclick = () => {
        article.hide();
        this.navigateTo(null);
        menuButton.onclick = null;
      };

      // switch to the correct category only after the article is loaded for max perf
      this.switchCategory(state && state.category ? state.category : 'us/travel');

    });

  }

  fetchRSS(url) {

    let rssUrl = url;
    let yqlQuery = "select * from feed where url = '" + encodeURIComponent(rssUrl) + "'";
    let yqlUrl = "https://query.yahooapis.com/v1/public/yql?q=" + yqlQuery + "&format=json";

    return fetch(yqlUrl)
      .then(response => response.json() )
      .then(rss => rss.query.results.item );

  }

  navigateTo(articleUrl, replace) {

    // set the correct document title
    document.title = 'The Shadow Guardian – ' + this.categoryTitle;

    var newUrl = "/" + this.category + (articleUrl ? articleUrl.replace(/https?\:\/\/[^\/]+/, '') : '');

    // bail if nothing would change
    if (newUrl === document.location.pathname) {

      if (replace) {

        // we need to replace the state anyway due to that nasty AMP bug.
        history.replaceState({
          category: this.category,
          categoryTitle: this.categoryTitle,
          articleUrl: articleUrl
        }, '', newUrl);

      } else {
        return;
      }

    }

    // set a new browser history entry and update the URL
    history.pushState({
      category: this.category,
      categoryTitle: this.categoryTitle,
      articleUrl: articleUrl
    }, '', newUrl);

  }

  setOpenArticle(article, replace) {

    this.openArticle = article;

    // Set new history entry
    this.navigateTo(article.url, replace);

  }

  switchCategory(category) {

    // mark old menu element as inactive
    if (this.category) {
      this.getNavElement(this.category).classList.remove('active');
    }

    // mark menu element as active
    let navElement = this.getNavElement(category);
    this.category = category;
    this.categoryTitle = navElement.textContent;
    navElement.classList.add('active');

    // change category title
    document.querySelector('.category span').textContent = this.categoryTitle;

    // set current cards to loading
    for (let card of this.cards) {
      card.wait();
    }

    // hide menu
    this.hide();

    // fetch new nav entries via RSS via YQL
    return this.fetchRSS('https://www.theguardian.com/' + category + '/rss').then(entries => {

      // empty items container (lazy..)
      itemsContainer.innerHTML = '';
      this.cards = [];

      // render new entries
      for (let entry of entries) {
        this.cards.push(new Card({
          title: entry.title,
          description: entry.description,
          link: entry.link,
          image: entry.content ? entry.content[entry.content.length - 1].url : ''
        }));
      }

      // reset scroll position
      document.scrollingElement.scrollTop = 0;

    });

  }

  getNavElement(category) {
    return document.querySelector('.navigation a[data-tag="' + category + '"]');
  }

  show() {
    document.body.classList.add('nav-shown');
  }

  hide() {
    document.body.classList.remove('nav-shown');
  }

  toggle() {
    return this[document.body.classList.contains('nav-shown') ? 'hide' : 'show']();
  }

  bind() {

    window.addEventListener('popstate', event => {

      var state = {
        category: event.state && event.state.category ? event.state.category : this.category,
        categoryTitle: event.state && event.state.categoryTitle ? event.state.categoryTitle : this.categoryTitle,
        articleUrl: event.state ? event.state.articleUrl : null
      };

      // switch to the correct category if not already on it
      if (this.category !== state.category) {
        this.switchCategory(state.category);
      }

      // if we go to a state where no article was open, and we have a
      // currently-opened one, close it again
      if (this.openArticle && !state.articleUrl && menuButton.onclick) {
        menuButton.onclick();
        this.openArticle = null;
      }

      // If there's an article in the state object, we need to open it
      if (state.articleUrl) {
        this.startWithArticle(state);
      }

    }, false);

    document.querySelector('.hamburger').addEventListener('click', event => {
      !document.documentElement.classList.contains('article-shown') && this.toggle();
      event.preventDefault();
    }), false;

    document.querySelector('.navigation').addEventListener('click', event => {

      if (event.target.nodeName !== 'A') {
        return;
      }

      // switch category
      this.switchCategory(event.target.dataset.tag, event.target.parentNode);

      // set entry in the browser history, navigate URL bar
      this.navigateTo(null);


      event.preventDefault();
    }), false;

  }

}