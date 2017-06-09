/*
 * Card
 */
class Card {

  constructor(data, headless, prerender) {

    this.data = data;
    this.headless = headless;
    this.currentTransform = { scaleX: 1, scaleY: 1 };
    this.naturalDimensions = { width: 0, height: 0 };

    this.create();

    // if we're in headless mode, that means the Card is initialized purely to
    // render out the featured image in the Shadow DOM, not for the list view,
    // thus we don't need to fancy it up or bind events.
    if (!this.headless) {
      this.article = new Article(this.data.link, this);
      this.bind();
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
      this.elem.classList.add('disable-transitions');
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
    if (!this.elem.matches('.card:first-child') && toFullView) {
      let paragraph = this.elem.children[1].children[1];
      this.innerElem.style.transform += ' translateY(-' + (paragraph.offsetHeight+16) + 'px)'; // 16px = 1em
    }

    // back to transitions after next render tick if prev disabled..
    if (animate === false) {
      requestAnimationFrame(() => {
        this.elem.classList.remove('disable-transitions');
      });
    }

  }

  animate(dontAnimate, scrollOffset) {

    let elem = this.elem;
    elem.classList.add('full');

    var offsetLeft = elem.offsetLeft + elem.offsetParent.offsetLeft;
    var offsetTop = (elem.offsetTop + elem.offsetParent.offsetTop) - shadowReader.headerElement.offsetHeight - scrollY + (scrollOffset || 0);
    var currentWidth = this.naturalDimensions.width;
    var currentHeight = this.naturalDimensions.height;
    var newWidth = innerWidth;
    var newHeight = newWidth * this.imageData.ratio;

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

    this.elem.classList.remove('full');

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
      innerElem = document.createElement('div'),
      img = document.createElement('img'),
      h2 = document.createElement('h2'),
      p = document.createElement('p');

    h2.innerHTML = this.data.title;
    p.innerHTML = this.data.description;
    innerElem.className = 'inner';
    elem.className = 'card';
    img.src = this.data.image;

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

  hijackMenuButton() {
    shadowReader.nav.hamburgerReturnAction = event => {
      // Go back in history stack, but only if we don't trigger the method
      // manually, coming from popstate
      if(event) history.back();

      this.deactivate();
    };
  }

  activate() {

    // add loading spinner
    this.elem.classList.add('loading');

    this.article.load()
      .then(() => {
        return this.article.render();
      })
      .then(() => {

        // remove loading spinner
        this.elem.classList.remove('loading');

        this.animate();
        this.article.show();
        this.hijackMenuButton();
      });
  }

  deactivate() {
    this.animateBack();
    this.article.hide();
  }

  bind() {
    /* use click event on purpose here, to not interfere with panning */
    this.elem.addEventListener('click', () => {
      !this.elem.classList.contains('full') && this.activate();
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