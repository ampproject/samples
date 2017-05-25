class TheGuardian {

  constructor() {

    this._categories = {
      'us': 'Top News',
      'us-news/us-politics': 'Politics',
      'world': 'World',
      'commentisfree': 'Opinion',
      'us/technology': 'Tech',
      'us/culture': 'Arts',
      'us/lifeandstyle': 'Lifestyle',
      'fashion': 'Fashion',
      'us/business': 'Business',
      'us/travel': 'Travel'
    };

  }

  isCategory(category) {
    return !!this._categories[category];
  }

  getAMPUrl(url) {
    return url.replace('www.', 'amp.');
  }

  getCategoryFromAMPUrl(url) {
    var path = url.replace(this.getAMPEndpoint(), '').replace(/^\/*/, '').replace(/\/*$/, '');

    if (path.startsWith('travel/'))
      return 'us/travel';

    if (path.startsWith('us-news/'))
      return 'us-news/us-politics';

    if (path.startsWith('commentisfree/'))
      return 'commentisfree';

    // TODO: Complete other categories

    return null;
  }

  getAMPEndpoint() {
    return 'https://amp.theguardian.com/';
  }

  getDefaultCategory() {
    return 'us/travel';
  }

  getAppTitle() {
    return 'Guardian';
  }

  sanitize(doc, hasCard) {

    // remove stuff we don't need in embed mode
    let header = doc.getElementsByTagName('header');
    if (header.length)
      header[0].remove();

    // remove sidebar
    let sidebar = doc.getElementsByTagName('amp-sidebar');
    if (sidebar.length)
      sidebar[0].remove();

    // remove content head
    let contentHead = doc.querySelector('header.content__head');
    if(contentHead)
      contentHead.remove();

    // if we're coming from an existing card, we don't need to keep
    // the featured image of the AMP article
    if (hasCard) {
      let featuredImage = doc.querySelector('.media-primary amp-img');
      featuredImage && featuredImage.remove();
    }

  }

}