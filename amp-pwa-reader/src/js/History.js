class HistoryStack {

  constructor(backend) {
    this.backend = backend;
    this.state = (history.state && history.state.category) ? history.state : this.parseUrlIntoState();

    /*
     * You'll notice there's no other DOM foolery in this file. So why here?
     * This file is initialized right after the body opens, so if there's an
     * article to show later on, we want to intitialize the skeleton UI for
     * perceived performance as soon as possible.
     */
    if (this.state.articleUrl) {
      document.body.classList.add('show-article-skeleton');
    }

  }

  constructUrl(articleUrl) {
    return '/' + (articleUrl ? articleUrl.replace(this.backend.getAMPEndpoint(), '') : shadowReader.nav.category);
  }

  parseUrlIntoState() {

    // grab the pathname from the url (minus slashes at the beginning and end)
    var path = location.pathname.replace(/^\/*/, '').replace(/\/*$/, '');
    var state = {
      category: this.backend.defaultCategory,
      articleUrl: null
    };

    if (this.backend.getCategoryTitle(path)) {
      // if the pathname is an actual category, use that
      state.category = path;
    } else if (path) {
      // now we can be reasonably sure the path is a full article url
      state.articleUrl = this.backend.getAMPEndpoint() + path;
      state.category = this.backend.getCategoryFromAMPUrl(state.articleUrl);
    }

    return state;

  }

  setDocTitle(subTitle) {
    document.title = 'ShadowReader' + ' – ' + shadowReader.nav.categoryTitle + (subTitle ? ' – ' + subTitle : '');
  }

  navigate(articleUrl, replace, subTitle) {

    // set the correct document title
    this.setDocTitle(subTitle);

    var newUrl = this.constructUrl(articleUrl);

    // bail if nothing would change
    if (newUrl === document.location.pathname) {
      if (replace) {
        // we need to replace the state anyway due to that nasty AMP bug.
        history.replaceState({
          category: shadowReader.nav.category,
          articleUrl: articleUrl
        }, '', newUrl);
      } else {
        return;
      }
    }

    // set a new browser history entry and update the URL
    history.pushState({
      category: shadowReader.nav.category,
      articleUrl: articleUrl
    }, '', newUrl);

  }

}