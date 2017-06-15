class ShadowReader {

  constructor(config) {

    this.backend = new config.backend();
    document.documentElement.classList.add('sr-backend-' + this.backend.appTitle.toLowerCase());

    this.history = new HistoryStack(this.backend);
    this.clickEvent = 'ontouchend' in window ? 'touchend' : 'click';
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