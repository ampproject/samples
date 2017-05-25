class ShadowReader {

  constructor(config) {
    this.itemsElement = document.querySelector('main');
    this.headerElement = document.querySelector('header');
    this.hamburgerElement = document.querySelector('.hamburger');

    this.backend = new config.backend();
  }

  init() {
    this.history = new HistoryStack();
    this.nav = new Nav();
  }

  getAnimationSpeed() {
    if (this._animationSpeed)
      return this._animationSpeed;

    let htmlStyles = window.getComputedStyle(document.querySelector("html"));
    this._animationSpeed = parseFloat(htmlStyles.getPropertyValue("--animation-speed")) * 1000;
    return this._animationSpeed;
  }

}

// Create app singleton
var shadowReader = new ShadowReader({
  backend: TheGuardian
});

// Initialize
shadowReader.init();