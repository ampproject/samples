/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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