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

class TheGuardian extends Backend {

  constructor() {
    super({
      appTitle: 'TheGuardian',
      ampEndpoint: 'https://amp.theguardian.com/',
      defaultCategory: 'us',
      categories: {
        'us': 'Top News',
        'us-news--us-politics': 'Politics',
        'world': 'World',
        'commentisfree': 'Opinion',
        'us--technology': 'Tech',
        'us--culture': 'Arts',
        'us--lifeandstyle': 'Lifestyle',
        'fashion': 'Fashion',
        'us--business': 'Business',
        'us--travel': 'Travel'
      }
    });
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
    return entry.content ? entry.content[entry.content.length - 1].url : '';
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

Backend.classes['theguardian'] = TheGuardian;