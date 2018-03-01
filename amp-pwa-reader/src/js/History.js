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

class HistoryStack {

  constructor(backend) {
    this.backend = backend;
    this.state = (history.state && history.state.category) ? history.state : this.parseUrlIntoState();

    // if the category doesn't exist (e.g. we came from a different backend)
    // return the default one.
    if (!this.backend.categories[this.state.category]) {
      this.state.category = this.backend.defaultCategory;
      history.replaceState({
        category: this.state.category
      }, '', this.constructUrl());
    }
  }

  constructUrl(articleUrl) {
    return '/' + this.backend.pathname + '/' + ((window.shadowReader && shadowReader.nav.category) || this.state.category) + (articleUrl ? '/' + this.backend.getAMPUrlComponent(articleUrl) : '');
  }

  parseUrlIntoState() {

    // grab the pathname from the url (minus slashes at the beginning and end, and the backend)
    var path = location.pathname.replace(/^\/*/, '').replace(/\/*$/, '').replace(this.backend.pathname + '/', '');
    var state = {
      category: this.backend.defaultCategory,
      articleUrl: null
    };

    if (this.backend.getCategoryTitle(path)) {
      // if the pathname is an actual category, use that
      state.category = path;
    } else if (path) {
      // now we can be reasonably sure the path is a full article url
      state.category = path.split('/')[0];
      state.articleUrl = this.backend.constructAMPUrl(state.category, path.substr(state.category.length+1));
    }

    return state;

  }

  setDocTitle(subTitle) {
    document.title = 'ShadowReader' + ' – ' + shadowReader.nav.categoryTitle + (subTitle ? ' – ' + subTitle : '');
  }

  navigate(articleUrl, replace, subTitle) {

    // set the correct document title
    this.setDocTitle(subTitle);

    var newUrl = this.constructUrl(articleUrl);

    // bail if nothing would change
    if (newUrl === document.location.pathname) {
      if (replace) {
        // we need to replace the state anyway due to that nasty AMP bug.
        history.replaceState({
          category: shadowReader.nav.category,
          articleUrl: articleUrl
        }, '', newUrl);
      }
      return;
    }

    // set a new browser history entry and update the URL
    history.pushState({
      category: shadowReader.nav.category,
      articleUrl: articleUrl
    }, '', newUrl);

  }

}