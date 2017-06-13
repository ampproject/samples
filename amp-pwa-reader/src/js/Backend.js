class Backend {

  constructor(config) {
    this.appTitle = config.appTitle;
    this.ampEndpoint = config.ampEndpoint; // AMP Endpoint
    this.defaultCategory = config.defaultCategory;
    this.categories = config.categories;
    this.create();
  }

  /*
   * Static methods
   */

  static get(className) {
    return Backend.classes[className.toLowerCase()];
  }

  getCategoryTitle(category) {
    return this.categories[category];
  }

  create() {
    document.documentElement.classList.add('sr-backend-' + this.appTitle.toLowerCase());
  }

  destroy() {
    document.documentElement.classList.remove('sr-backend-' + this.appTitle.toLowerCase());
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

  getRSSDescription(entry) {
    return entry.description.replace(/<[^>]+>/ig,'');
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

  getAMPUrlComponent(articleUrl) {
    return articleUrl.replace(this.ampEndpoint, '');
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
    var schemaData = doc.querySelectorAll('script[type="application/ld+json"]');
    for (let schema of schemaData) {
      let parsedSchema = JSON.parse(schema.textContent);
      if (/WebPage|NewsArticle/.test(parsedSchema['@type'])) {
        return parsedSchema;
      }
    }
    return null;
  }

  sanitize(doc) {
    return doc;
  }

}

Backend.classes = {};