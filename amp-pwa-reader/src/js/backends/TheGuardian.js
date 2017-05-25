class TheGuardian {

  constructor() {
    this.appTitle = 'Guardian';
    this.defaultCategory = 'us/travel';
    this.categories = {
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

  getCategoryTitle(category) {
    return this.categories[category];
  }

  getRSSUrl(category) {
    return 'https://www.theguardian.com/' + category + '/rss';
  }

  getAMPUrl(url) {
    return url.replace('www.', 'amp.');
  }

  getAMPEndpoint() {
    return 'https://amp.theguardian.com/';
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

  getArticleData(doc) {
    return {
      description: this._description,
      title: this._title,
      image: this._image,
      imageRatio: this._imageRatio
    };
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