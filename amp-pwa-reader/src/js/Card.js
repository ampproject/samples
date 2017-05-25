/*
 * Card
 */
class Card {

  constructor(data, headless) {

    this.data = data;
    this.currentTransform = { scaleX: 1, scaleY: 1 };
    this.naturalDimensions = { width: 0, height: 0 };

    this.create(headless);

    if (!headless) {
      this.article = new Article(this.data.link, this);
      this.bind();
      this.render();
    }

  }

  resizeChildren(elemDimensions, animate) {

    let width = this.imageData.width;
    let height = this.imageData.height;
    let elemWidth = elemDimensions.width;
    let elemHeight = elemDimensions.height;
    let scaleY = elemHeight / height;
    let scaleX = elemWidth / width;

    let fitHorizontally = scaleX > scaleY;

    let centerX = 'translateX(' + (-(((width * scaleY) - elemWidth) / 2)) + 'px)';
    let centerY = 'translateY(' + (-(((height * scaleX) - elemHeight) / 2)) + 'px)';

    if (animate === false) {
      this.elem.classList.add('disable-transitions');
    }

    // rescale image
    this.img.style.transform = 'scaleX(' + (1 / this.currentTransform.scaleX) + ')' // normalizing
      + 'scaleY(' + (1 / this.currentTransform.scaleY) + ')' // normalizing
      + 'scaleX(' + (fitHorizontally ? scaleX : scaleY) + ')' // fill the whole card
      + 'scaleY(' + (fitHorizontally ? scaleX : scaleY) + ')' // fill the whole card
      + (fitHorizontally ? centerY : centerX); // center

    // rescale inner element
    this.innerElem.style.transform = 'scaleX(' + (1 / this.currentTransform.scaleX) + ')' // normalizing
      + 'scaleY(' + (1 / this.currentTransform.scaleY) + ')'; // normalizing

    // back to transitions after next render tick if prev disabled..
    requestAnimationFrame(() => {
      this.elem.classList.remove('disable-transitions');
    });

  }

  animate() {

    this.elem.classList.remove('loading');
    this.elem.classList.add('full');

    var offsetTop = this.elem.offsetTop - shadowReader.headerElement.offsetHeight - scrollY;
    var currentWidth = this.naturalDimensions.width;
    var currentHeight = this.naturalDimensions.height;
    var newWidth = innerWidth;
    var newHeight = newWidth * this.imageData.ratio;

    this.currentTransform = {
      scaleX: (newWidth / currentWidth),
      scaleY: (newHeight / currentHeight),
      translateY: -offsetTop
    };

    // animate the card to the natural ratio of the featured image
    this.elem.style.transform = 'translateY(' + this.currentTransform.translateY + 'px)'
                                + 'scaleX(' + this.currentTransform.scaleX + ')'
                                + 'scaleY(' + this.currentTransform.scaleY + ')';

    // counter-animate all children
    this.resizeChildren({
      width: newWidth,
      height: newHeight
    }, true);

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
    this.resizeChildren(this.naturalDimensions, true);

  }

  create(headless) {

    var elem = document.createElement('div'),
      innerElem = document.createElement('div'),
      img = document.createElement('img'),
      h2 = document.createElement('h2'),
      p = document.createElement('p');

    h2.textContent = this.data.title;
    p.innerHTML = this.data.description.replace(/\<\/?p\>/g, '').substr(0, 120) + '...';
    innerElem.className = 'inner';
    elem.className = 'card';
    img.src = this.data.image;

    // if we're in headless mode, that means the Card is initialized purely to
    // render out the featured image in the Shadow DOM, not for the list view,
    // thus we don't need to fancy it up for animations.
    if (!headless) {

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

  bind() {
    this.elem.addEventListener('pointerup', () => {
      !this.elem.classList.contains('full') && this.activate();
    });
  }

  wait() {
    this.elem.classList.add('loading');
  }

  hijackMenuButton() {
    shadowReader.hamburgerElement.onclick = event => {

      // Go back in history stack, but only if we don't trigger the method
      // manually, coming from popstate
      if(event) history.back();

      this.deactivate();
      shadowReader.hamburgerElement.onclick = null;
      return false;

    };
  }

  activate() {
    this.wait();
    this.article.load().then(() => {
      this.animate();
      this.article.show();
      this.hijackMenuButton();
    });
  }

  deactivate() {
    this.animateBack(this._naturalCardHeight);
    this.article.hide();
  }

  render() {
    shadowReader.itemsElement.appendChild(this.elem);
  }

}