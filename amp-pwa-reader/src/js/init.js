class ShadowReader {

  constructor(config) {
    this.backend = new config.backend();
    this.history = new HistoryStack(this.backend);
    this.clickEvent = 'ontouchend' in window ? 'touchend' : 'click';
  }

  init() {
    this.itemsElement = document.querySelector('main');
    this.headerElement = document.querySelector('header');
    this.hamburgerElement = document.querySelector('.hamburger');
    this.nav = new Nav();
  }

}

// Create app singleton
var shadowReader = new ShadowReader({
  backend: TheGuardian
});

// Initialize fully when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  shadowReader.init();
});