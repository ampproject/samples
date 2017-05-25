class HistoryStack {

  constructor() {
    this.state = (history.state && history.state.category) ? history.state : this.parseUrlIntoState();
    console.log(this.state);
  }

  constructUrl(articleUrl) {
    return '/' + (articleUrl ? articleUrl.replace(shadowReader.backend.getAMPEndpoint(), '') : shadowReader.nav.category);
  }

  parseUrlIntoState() {

    // grab the pathname from the url (minus slashes at the beginning and end)
    var path = location.pathname.replace(/^\/*/, '').replace(/\/*$/, '');
    var state = {
      category: shadowReader.backend.getDefaultCategory(),
      articleUrl: null
    };

    if (shadowReader.backend.isCategory(path)) {
      state.category = path;
    } else if (path) {
      // now we can be reasonably sure the path is a full article url
      state.articleUrl = shadowReader.backend.getAMPEndpoint() + path;
      state.category = shadowReader.backend.getCategoryFromAMPUrl(state.articleUrl);
    }

    return state;

  }

  navigate(articleUrl, replace) {

    // set the correct document title
    document.title = 'Shadow ' + shadowReader.backend.getAppTitle() + ' – ' + shadowReader.nav.categoryTitle;

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