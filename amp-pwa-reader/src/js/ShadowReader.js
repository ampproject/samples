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

class ShadowReader {

  constructor(config) {

    this.backend = new config.backend();
    document.documentElement.classList.add('sr-backend-' + this.backend.appTitle.toLowerCase());

    this.history = new HistoryStack(this.backend);
    this.clickEvent = 'click';
  }

  init() {
    this.itemsElement = document.querySelector('main');
    this.headerElement = document.querySelector('header');
    this.hamburgerElement = document.querySelector('.sr-hamburger');

    // load polyfills, if needed
    // TODO: In production, you'd do this with client hints if available, or
    // sadly, user agent checks on the server.
    this.loadPolyfills().then(() => {
      this.nav = new Nav();
    });
  }

  enableCardTabbing() {
    let children = Array.from(this.itemsElement.children); // sadly needed for Safari
    for (let item of children) {
      item.children[1].removeAttribute('tabindex');
    }
  }

  disableCardTabbing() {
    let children = Array.from(this.itemsElement.children); // sadly needed for Safari
    for (let item of children) {
      item.children[1].setAttribute('tabindex', -1);
    }
  }

  loadPolyfills() {

    var promises = [];
    var loadScript = function (src) {
      var script = document.createElement('script');
      script.src = src;
      document.getElementsByTagName("head")[0].appendChild(script);
      return new Promise((resolve) => {
        script.onload = resolve;
      });
    };

    if (!('animate' in document.body)) {
      promises.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.2.5/web-animations-next-lite.min.js'));
    }

    return Promise.all(promises);

  }

}