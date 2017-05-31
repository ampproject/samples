class ShadowReader {

  constructor(config) {

    this.backend = new config.backend();
    document.documentElement.classList.add('backend-' + this.backend.appTitle.toLowerCase());

    this.history = new HistoryStack(this.backend);
    this.clickEvent = 'ontouchend' in window ? 'touchend' : 'click';
  }

  init() {
    this.itemsElement = document.querySelector('main');
    this.headerElement = document.querySelector('header');
    this.hamburgerElement = document.querySelector('.hamburger');
    this.nav = new Nav();
  }

  switchBackend(backend) {

    // initialize the new backend
    document.documentElement.classList.remove('backend-' + this.backend.appTitle.toLowerCase());
    this.backend = new backend();
    document.documentElement.classList.add('backend-' + this.backend.appTitle.toLowerCase());
    this.history.backend = this.backend;

    // reinitialize the nav
    this.nav.clear();
    this.nav.create();

    // reinitialize
    this.nav.switchCategory(this.backend.defaultCategory);
    shadowReader.history.navigate(null);

  }

}