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

class Card {

  constructor(data, headless, prerender) {
    this.data = data;
    this.headless = headless;
    this.currentTransform = { scaleX: 1, scaleY: 1 };
    this.naturalDimensions = { width: 0, height: 0 };
    this.streaming = true; /* !prerender; */  //TODO: also check to see if browser supports it

    this.create();
    this.bind();

    // if we're in headless mode, that means the Card is initialized purely to
    // render out the featured image in the Shadow DOM, not for the list view,
    // thus we don't need to fancy it up.
    if (this.headless) {
      this.elem.classList.add('sr-full');
      this.innerElem.setAttribute('tabindex', -1);
    } else {
      this.article = new Article(this.data.link, this, this.streaming);
      this.render();
    }

    if (prerender) {
      this.article.load();
    }

  }

  resizeChildren(dimensions, animate, toFullView) {
    let width = this.imageData.width;
    let height = this.imageData.height;
    let elemWidth = dimensions.width;
    let elemHeight = dimensions.height;
    let scaleY = elemHeight / height;
    let scaleX = elemWidth / width;

    let fitHorizontally = scaleX > scaleY;
    let centerX = 'translateX(' + (-(((width * scaleY) - elemWidth) / 2)) + 'px)';
    let centerY = 'translateY(' + (-(((height * scaleX) - elemHeight) / 2)) + 'px)';

    if (animate === false) {
      this.elem.classList.add('sr-disable-transitions');
    }

    // rescale image
    this.img.style.transform = (fitHorizontally ? centerY : centerX) + // center
      'scaleY(' + (1 / this.currentTransform.scaleY) + ')' + // normalizing
      'scaleX(' + (fitHorizontally ? scaleX : scaleY) + ')' + // fill the whole card
      'scaleY(' + (fitHorizontally ? scaleX : scaleY) + ')' + // fill the whole card
      'scaleX(' + (1 / this.currentTransform.scaleX) + ')' + // normalizing
      'scale(var(--hover-scale))'; // additional CSS variable we can control (we use it for hover effects)

    // rescale inner element
    this.innerElem.style.transform = 'scaleX(' + (1 / this.currentTransform.scaleX) + ')' // normalizing
      + 'scaleY(' + (1 / this.currentTransform.scaleY) + ')'; // normalizing

    // if the paragraph was hidden before, we need to slide it in..
    if (!this.elem.matches('.sr-card:first-child') && toFullView) {
      let paragraph = this.elem.children[1].children[1];
      this.innerElem.style.transform += ' translateY(-' + (paragraph.offsetHeight+16) + 'px)'; // 16px = 1em
    }

    // back to transitions after next render tick if prev disabled..
    if (animate === false) {
      setTimeout(() => { // turns out requestAnimationFrame isn't enough here..
        this.elem.classList.remove('sr-disable-transitions');
      }, 0);
    }
  }

  animate(dontAnimate, scrollOffset) {
    let elem = this.elem;
    elem.classList.add('sr-full');

    let offsetLeft = elem.offsetLeft + elem.offsetParent.offsetLeft;
    let offsetTop = (elem.offsetTop + elem.offsetParent.offsetTop) - shadowReader.headerElement.offsetHeight - scrollY + (scrollOffset || 0);
    let currentWidth = this.naturalDimensions.width;
    let currentHeight = this.naturalDimensions.height;
    let newWidth = innerWidth;
    let newHeight = newWidth * this.imageData.ratio;

    this.currentTransform = {
      scaleX: (newWidth / currentWidth),
      scaleY: (newHeight / currentHeight),
      translateX: -offsetLeft,
      translateY: -offsetTop
    };

    // animate the card to the natural ratio of the featured image
    this.elem.style.transform = 'translateY(' + this.currentTransform.translateY + 'px)'
                                + 'translateX(' + this.currentTransform.translateX + 'px)'
                                + 'scaleX(' + this.currentTransform.scaleX + ')'
                                + 'scaleY(' + this.currentTransform.scaleY + ')';

    // counter-animate all children
    this.resizeChildren({
      width: newWidth,
      height: newHeight
    }, /*animate*/!dontAnimate, true);
  }

  animateBack() {
    this.elem.classList.remove('sr-full');

    // animate to the right height
    this.elem.style.transform = '';

    this.currentTransform = {
      scaleX: 1,
      scaleY: 1,
      translateY: 0
    };

    // counter-animate all children
    this.resizeChildren(this.naturalDimensions, true, false);

  }

  create() {
    var elem = document.createElement('div'),
      innerElem = document.createElement('a'),
      img = document.createElement('img'),
      h2 = document.createElement('h2'),
      p = document.createElement('p');

    h2.innerHTML = this.data.title;
    p.innerHTML = this.data.description;
    innerElem.className = 'sr-inner';
    innerElem.href = this.data.link || '';
    elem.className = 'sr-card';
    img.src = this.data.image;
    img.setAttribute('role', 'presentation'); // prevents screen reader access

    // if we're in headless mode, that means the Card is initialized purely to
    // render out the featured image in the Shadow DOM, not for the list view,
    // thus we don't need to fancy it up for animations.
    if (!this.headless) {

      img.style.opacity = 0;
      img.onload = () => {

        this.imageData = {
          ratio: img.offsetHeight / img.offsetWidth,
          width: img.offsetWidth,
          height: img.offsetHeight
        };

        this.naturalDimensions = {
          width: this.elem.offsetWidth,
          height: this.elem.offsetHeight
        };

        this.resizeChildren(this.naturalDimensions, false);
        img.style.opacity = '';
        this.setReady();

      };

    }

    innerElem.appendChild(h2);
    innerElem.appendChild(p);
    elem.appendChild(img);
    elem.appendChild(innerElem);

    this.elem = elem;
    this.img = img;
    this.innerElem = innerElem;

  }

  refresh() {
    this.naturalDimensions = {
      width: this.elem.offsetWidth,
      height: this.elem.offsetHeight
    };

    this.resizeChildren(this.naturalDimensions, false);

  }

  hijackMenuButton() {
    shadowReader.nav.hamburgerReturnAction = event => {
      // Go back in history stack, but only if we don't trigger the method
      // manually, coming from popstate
      if(event) history.back();

      this.deactivate();
    };
  }

  activate() {
    // set main view to inert so you can't tab into it
    shadowReader.disableCardTabbing();

    this.article.getClonedCardElem();

    // add loading spinner (and promote to layer)
    this.elem.classList.add('sr-loading', 'sr-promote-layer');

    // in streaming case, things happen in a different order
    if (this.streaming) {
      this.article.renderStreaming();
      this.article.stream()
        .then(() => {
          this.elem.classList.remove('sr-loading');
          this.hijackMenuButton();  //TODO: this should probably happen earlier in streaming case
      })
        .catch(error => {
          this.elem.classList.remove('sr-loading');
          this.elem.classList.add('sr-error');
        });

    } else {

      this.article.load()
        .then(() => this.article.render())
        .then(() => {
       // remove loading spinner
        this.elem.classList.remove('sr-loading');

        this.animate();
        this.article.show();
        this.hijackMenuButton();
      })
        .catch(error => {
          this.elem.classList.remove('sr-loading');
          this.elem.classList.add('sr-error');
        });
    }
  }

  deactivate() {
    // restore tabbing in main view
    shadowReader.enableCardTabbing();

    this.animateBack();
    this.article.hide();
  }

  bind() {
    /* use click event on purpose here, to not interfere with panning */
    this.innerElem.addEventListener('click', (event) => {

      // we only activate a card if we're on a narrow resolution, otherwise
      // we simply navigate to the link for now.
      if (innerWidth >= 768) {
        return;
      }

      // don't trigger the default link click
      event.preventDefault();

      // blur the element, as the focus style would hinder the animation
      this.innerElem.blur();

      // if we're looking at the duplicate card in the article view, a click
      // on the card should do nothing at all
      if (!this.elem.classList.contains('sr-full')) {
        // activate the card
        this.activate();
      }

    });
  }

  render() {
    shadowReader.itemsElement.appendChild(this.elem);
  }

  setReady() {
    this._ready = true;
    if (this._readyQueue) {
      for (let cb of this._readyQueue) {
        cb();
      }
      this._readyQueue = [];
    }
  }

  ready(cb) {
    if (!this._ready) {
      this._readyQueue = this._readyQueue || [];
      this._readyQueue.push(cb);
    } else {
      cb();
    }
  }

}