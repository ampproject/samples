class Lifehacker extends Backend {

  constructor() {
    super({
      appTitle: 'Lifehacker',
      ampEndpoint: 'https://www.cnet.com/google-amp/',
      defaultCategory: 'all',
      categories: {
        'all': 'All Stories',
        'skillet': 'Skillet',
        'twocents': 'Two Cents',
        'vitals': 'Vitals',
        'offspring': 'Offspring',
        'tag/apps/rss': 'Apps'
      }
    });

    this._domains = {
      'all': 'http://lifehacker.com/',
      'skillet': 'http://skillet.lifehacker.com/',
      'twocents': 'http://twocents.lifehacker.com/',
      'vitals': 'http://vitals.lifehacker.com/',
      'offspring': 'http://offspring.lifehacker.com/',
      'tag/apps/rss': 'http://lifehacker.com/tag/apps/'
    };
  }

  /*
   * RSS Feed related getters and functions.
   */

  getRSSUrl(category) {
    return this._domains[category] + 'rss';
  }

  getRSSTitle(entry) {
    return entry.title;
  }

  getRSSImage(entry) {
    let imgUrl = entry.description.match(/<img src="([^"]+)/);
    return imgUrl ? imgUrl[1] : null;
  }

  /*
   * AMP Doc related functions.
   */

  getAMPUrl(url) {
    url = url.replace(/\#.*/, ''); // strip hashes from URL
    return url.endsWith('/amp') ? url : url + '/amp';
  }

  constructAMPUrl(category, path) {
    return this._domains[category] + path;
  }

  getAMPUrlComponent(articleUrl) {
    return articleUrl.replace(/http\:\/\/[a-z]*\.*(lifehacker|kinja|jezebel)\.com\//, '').replace(/\/amp$/, '');
  }

  sanitize(doc) {

    // collect crucial data for article resolving first..
    let schemaData = this.extractSchemaData(doc);

    this._title = schemaData.headline;
    this._description = schemaData.description;
    this._image = schemaData.image.url;
    this._imageRatio = schemaData.image.height / schemaData.image.width;

    let nav = doc.querySelector('.nav__wrap');
    nav && nav.remove();

    doc.querySelector('.main__content header').remove();

    let firstImage = doc.querySelector('.post-content figure');
    firstImage && firstImage.remove();

  }

}

Backend.classes['lifehacker'] = Lifehacker;