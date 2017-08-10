class DragObserver extends Evented {

  constructor (element, options = {}) {

    super();

    this._started = false;

    this.element = element;
    this.axis = options.axis || 'both';
    this.distance = options.distance || 10;

    this._clickPreventer = this._createClickPreventer();

    this._supportsPointerEvents = !!window.PointerEvent;

    this.element.addEventListener(
      this._supportsPointerEvents ? 'pointerdown' : 'touchstart',
      this._start.bind(this),
      { passive: true }
    );

  }

  _createClickPreventer () {
    var div = document.createElement('div');
    div.style.width = '30px';
    div.style.height = '30px';
    div.style.position = 'absolute';
    div.style.left = '0';
    div.style.top = '0';
    div.style.zIndex = '1000';
    return div;
  }

  _calculateOffset (elem) {

    var curleft = 0;
    var curtop = 0;

    do {
      curleft += elem.offsetLeft;
      curtop += elem.offsetTop;
    } while (elem = elem.offsetParent);

    return { x: curleft, y: curtop };

  }

  _meetsDistance (position) {
    return ((this.axis === 'both' && (Math.abs(position.x) >= this.distance || Math.abs(position.y) >= this.distance))
      || (this.axis === 'x' && Math.abs(position.x) >= this.distance)
      || (this.axis === 'y' && Math.abs(position.y) >= this.distance));
  }

  _start (event) {

    // store event for re-use
    if (event.pageX) {
      this.eventDown = event;
    }

    this.__move = (e) => this._move(e);
    this.__stop = (e) => this._stop(e);

    document.addEventListener(
        this._supportsPointerEvents ? 'pointermove' : 'touchmove',
        this.__move,
        { passive: true }
    );
    document.addEventListener(
        this._supportsPointerEvents ? 'pointerup' : 'touchend',
        this.__stop,
        { passive: true }
    );

  }

  _move (event) {

    // store event for re-use
    if (event.pageX) {
      this.eventMove = event;
    }

    // store event for re-use
    this.eventMovePrev = this.eventMove || this.eventStart;
    this.eventMove = event;

    // keep track of position before axis 'removal'
    let rawPosition = {
      x: -(this.eventDown.pageX - this.eventMove.pageX),
      y: -(this.eventDown.pageY - this.eventMove.pageY)
    }

    let position = {
      x: (this.axis === 'both' || this.axis === 'x') ? rawPosition.x : 0,
      y: (this.axis === 'both' || this.axis === 'y') ? rawPosition.y : 0
    };

    // only execute start callback when moved at least one pixel (configured as 'distance')
    if(this._meetsDistance(position) && !this._started) {
      this._started = true;
      document.body.appendChild(this._clickPreventer);
      this.trigger('start', position);
    }

    // only execute move callback when properly started
    if(this._started) {
      this._clickPreventer.style.transform = 'translate3d(' + (this.eventDown.pageX + rawPosition.x - 15) + 'px, ' + (this.eventDown.pageY + rawPosition.y - 15) + 'px, 0)';
      this.trigger('move', position);
    }
  }

  _stop (event) {

    document.removeEventListener(
        this._supportsPointerEvents ? 'pointermove' : 'touchmove',
        this.__move
    );
    document.removeEventListener(
        this._supportsPointerEvents ? 'pointerup' : 'touchend',
        this.__stop
    );

    if(this._started) {
      event.stopPropagation();
      this._clickPreventer.remove();
      this._started = false;
      this.trigger('stop');
    }
  }
}
