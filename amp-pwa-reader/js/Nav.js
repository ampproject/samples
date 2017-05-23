class Nav {

  constructor(category) {
    this.category = null;
    this.cards = [];

    this.bind();
    this.navigate(category);
  }

  fetchRSS(url) {

    let rssUrl = url;
    let yqlQuery = "select * from feed where url = '" + encodeURIComponent(rssUrl) + "'";
    let yqlUrl = "https://query.yahooapis.com/v1/public/yql?q=" + yqlQuery + "&format=json";

    return fetch(yqlUrl)
      .then(response => response.json() )
      .then(rss => rss.query.results.item );

  }

  navigate(category) {

    // mark old menu element as inactive
    if (this.category) {
      this.getNavElement(this.category).classList.remove('active');
    }

    // mark menu element as active
    this.category = category;
    let navElement = this.getNavElement(this.category);
    navElement.classList.add('active');

    // change category title
    document.querySelector('.category span').textContent = navElement.textContent;

    // set current cards to loading
    for (let card of this.cards) {
      card.wait();
    }

    // hide menu
    this.hide();

    // fetch new nav entries via RSS via YQL
    this.fetchRSS('https://www.theguardian.com/' + category + '/rss').then(entries => {

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

    document.querySelector('.hamburger').addEventListener('click', event => {
      this.toggle();
      event.preventDefault();
    }), false;

    document.querySelector('.navigation').addEventListener('click', event => {
      event.target.nodeName === 'A' && this.navigate(event.target.dataset.tag, event.target.parentNode);
      event.preventDefault();
    }), false;

  }

}