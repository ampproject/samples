class Backend {

  constructor() {
    this.appTitle = '';
    this.ampEndpoint = ''; // AMP Endpoint
    this.defaultCategory = '';
    this.categories = {};
  }

  /*
   * Static methods
   */

  static get(className) {
    return Backend.classes[className];
  }

  getCategoryTitle(category) {
    return this.categories[category];
  }

  /*
   * RSS Feed related getters and functions.
   */

  getRSSUrl(/*category*/) {
    return '';
  }

  getRSSTitle(entry) {
    return entry.title;
  }

  getRSSImage(entry) {
    return entry.thumbnail;
  }

  /*
   * AMP Doc related functions.
   */

  getAMPUrl(/*url*/) {
    /*return url.replace('www.', 'amp.');*/
  }

  getCategoryFromAMPUrl(/*url*/) {
    return this.defaultCategory;
  }

  getArticleData(/*doc*/) {
    return {
      description: this._description,
      title: this._title,
      image: this._image,
      imageRatio: this._imageRatio
    };
  }

  extractSchemaData(doc) {
    var schemaData = doc.querySelector('script[type="application/ld+json"]');
    if (schemaData) {
      return JSON.parse(schemaData.textContent);
    }
    return null;
  }

  sanitize(doc) {
    return doc;
  }

}

Backend.classes = {};