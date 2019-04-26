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

  constructor() {
    this.appTitle = 'TheGuardian';
    this.ampEndpoint = 'https://amp.theguardian.com/';
    this.defaultCategory = 'us';
    this.pathname = this.appTitle.toLowerCase();
    this.categories = {
      'us': 'top news',
      'us-news--us-politics': 'politics',
      'world': 'world',
      'commentisfree': 'opinion',
      'us--technology': 'tech',
      'us--culture': 'arts',
      'us--lifeandstyle': 'lifestyle',
      'fashion': 'fashion',
      'us--business': 'business',
      'us--travel': 'travel'
    };

    // selectors for DOM elements we want to hide in Shadow AMP mode
    this.elementsToHide = ['header', 'amp-sidebar', '.media-primary amp-img'];
  }

  getCategoryTitle(category) {
    return this.categories[category];
  }

  /*
   * RSS Feed related getters and functions.
   */

  getRSSUrl(category) {
    return 'https://www.theguardian.com/' + category.replace('--', '/') + '/rss';
  }

  getRSSTitle(entry) {
    return entry.title;
  }

  getRSSImage(entry) {
    const content = entry['media:content'];
    return content ? content[content.length - 1].url : '';
  }

  getRSSDescription(entry) {
    return entry.description.replace(/<[^>]+>/ig,'');
  }

  /*
   * AMP Doc related functions.
   */

  getAMPUrl(url) {
    return url.replace('www.', 'amp.');
  }

  constructAMPUrl(category, path) {
    return this.ampEndpoint + path;
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

// This hides article elements we don't want to show in the shadow root.
// But it also extracts and stores properties we'll need later.
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

// Inject CSS into the <style amp-custom> tag.
// In the non-streaming case, it's fine to add a link to inline.css.
// But, while streaming, we can't depend on that file being loaded and applied right away.
// So we simply inject it directly.
// If we owned the content pages, we'd use a much cleaner approach. We'd simply include the relevant styles
// in the initial document with an .amp-shadow selector. That way, they'd only apply when the AMP was in a shadow root.
// Note that the inlineCSS property gets added to this object by inline.css.js.
  injectCSS(html) {
    const styleTag = '<style amp-custom>';

    return html.replace(styleTag, styleTag + ' ' + this.hideElementsCSS() + this.inlineCSS);
  }

// Given an array of selectors, create CSS rules that hide each of those - and insert it into AMP HTML.
// This is the equivalent of sanitize() for the streaming case.
// TODO: We don't grab the metadata that sanitize() grabs, which could matter someday
  hideElementsCSS(html) {
    return this.elementsToHide
               .map(selector => selector + ' {display: none !important;}')
               .join(' ');
  }

}