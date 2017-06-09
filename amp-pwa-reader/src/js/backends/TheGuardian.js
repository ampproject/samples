class TheGuardian extends Backend {

  constructor() {
    super({
      appTitle: 'Guardian',
      ampEndpoint: 'https://amp.theguardian.com/',
      defaultCategory: 'us/travel',
      categories: {
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
      }
    });
  }

  /*
   * RSS Feed related getters and functions.
   */

  getRSSUrl(category) {
    return 'https://www.theguardian.com/' + category + '/rss';
  }

  getRSSTitle(entry) {
    return entry.title;
  }

  getRSSImage(entry) {
    return entry.content ? entry.content[entry.content.length - 1].url : '';
  }

  /*
   * AMP Doc related functions.
   */

  getAMPUrl(url) {
    return url.replace('www.', 'amp.');
  }

  getCategoryFromAMPUrl(url) {
    var path = url.replace(this.getAMPEndpoint(), '').replace(/^\/*/, '').replace(/\/*$/, '');

    if (path.startsWith('us-news/'))
      return 'us-news/us-politics';

    if (path.startsWith('commentisfree/'))
      return 'commentisfree';

    if (path.startsWith('technology/'))
      return 'us/technology';

    if (/^(tv-and-radio|film|music|culture)/.test(path)) {
      return 'us/culture';
    }

    if (/^(lifeandstyle|football)/.test(path))
      return 'us/lifeandstyle';

    if (path.startsWith('fashion/'))
      return 'fashion';

    if (path.startsWith('business/'))
      return 'us/business';

    if (path.startsWith('travel/'))
      return 'us/travel';

    return null;
  }

  sanitize(doc) {

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
    if (contentHead) {
      this._title = contentHead.querySelector('h1.content__headline').textContent;
      this._description = contentHead.querySelector('.content__standfirst meta').getAttribute('content');
      contentHead.remove();
    }

    // remove the featured image of the AMP article
    let featuredImage = doc.querySelector('.media-primary amp-img');
    if (featuredImage) {
      this._image = featuredImage.getAttribute('src');
      this._imageRatio = featuredImage.getAttribute('height') / featuredImage.getAttribute('width');
      featuredImage.remove();
    }

  }

}

Backend.classes['TheGuardian'] = TheGuardian;