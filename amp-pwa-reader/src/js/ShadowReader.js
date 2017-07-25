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

  constructor() {
    this.backend = new Backend();
    this.history = new HistoryStack(this.backend);
    this.clickEvent = 'click';
  }

  init() {
    this.itemsElement = document.querySelector('main');
    this.headerElement = document.querySelector('header');
    this.hamburgerElement = document.querySelector('.sr-hamburger');

    this.nav = new Nav();

  }

  ampReady(callback) {
    (window.AMP = window.AMP || []).push(callback);
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

  focusVisibleCard() {

    // if cards haven't been initialized yet, ignore
    if (!this.nav || !this.nav.cards) {
      return;
    }

    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;

    for (let card of this.nav.cards) {
      if (card.elem.offsetTop < (scrollY + innerHeight)
          && card.elem.offsetTop > scrollY) {
        card.innerElem.focus();
        break;
      }
    }

  }

}