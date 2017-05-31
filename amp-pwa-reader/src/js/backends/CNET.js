class CNET extends Backend {

  constructor() {
    super();

    this.appTitle = 'CNET';
    this.ampEndpoint = 'https://www.cnet.com/google-amp/';
    this.defaultCategory = 'news';
    this.categories = {
      'news': 'News'
    };
  }

  /*
   * RSS Feed related getters and functions.
   */

  getRSSUrl(category) {
    return 'https://www.cnet.com/rss/' + category;
  }

  getRSSTitle(entry) {
    return entry.title.replace('     - CNET', '');
  }

  getRSSImage(entry) {
    return entry.thumbnail && entry.thumbnail.url;
  }

  /*
   * AMP Doc related functions.
   */

  getAMPUrl(url) {
    // strip hashes from URL
    url = url.replace(/\#.*/, '');
    return /\/google\-amp\//.test(url) ? url : url.replace('cnet.com/', 'cnet.com/google-amp/');
  }

  getCategoryFromAMPUrl(url) {
    var path = url.replace(this.getAMPEndpoint(), '').replace(/^\/*/, '').replace(/\/*$/, '');

    if (path.startsWith('news/'))
      return 'news';

    return null;
  }

  sanitize(doc) {

    // collect crucial data for article resolving first..
    let schemaData = this.extractSchemaData(doc);

    this._title = schemaData.headline;
    this._description = schemaData.description;
    this._image = schemaData.image.url;
    this._imageRatio = schemaData.image.height / schemaData.image.width;

    // remove stuff we don't need in embed mode
    let header = doc.getElementsByTagName('header');
    if (header.length)
      header[0].remove();

    // remove sidebar
    let sidebar = doc.getElementsByTagName('amp-sidebar');
    if (sidebar.length)
      sidebar[0].remove();

    // remove content header
    let contentHeader = doc.querySelector('header.content-header');
    if (contentHeader)
      contentHeader.remove();

    // fix styling issues
    let content = doc.getElementById('rbContent');
    content.style.paddingTop = '0';
    content.style.backgroundColor = '#fff';

  }

}

Backend.classes['CNET'] = CNET;