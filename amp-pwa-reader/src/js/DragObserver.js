class DragObserver extends Evented {

  constructor (element, options = {}) {

    super();

    this._started = false;

    this.element = element;
    this.axis = options.axis || 'both';
    this.distance = options.distance || 10;

    this._clickPreventer = this._createClickPreventer();

    this.element.addEventListener('pointerdown', this._start.bind(this), false);

  }

  _createClickPreventer () {
    var div = document.createElement('div');
    div.style.width = '30px';
    div.style.height = '30px';
    div.style.position = 'absolute';
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
    this.eventDown = event;

    //event.preventDefault();

    this.__move = (e) => this._move(e);
    this.__stop = (e) => this._stop(e);
    document.addEventListener('pointermove', this.__move, false);
    document.addEventListener('pointerup', this.__stop, false);

  }

  _move (event) {

    // store event for re-use
    this.eventMovePrev = this.eventMove || this.eventStart;
    this.eventMove = event;

    // prevent the default behavior
    //event.preventDefault();

    var position = {
      x: (this.axis === 'both' || this.axis === 'x') ? -(this.eventDown.pageX - this.eventMove.pageX) : 0,
      y: (this.axis === 'both' || this.axis === 'y') ? -(this.eventDown.pageY - this.eventMove.pageY) : 0
    };

    // only execute start callback when moved at least one pixel (configured as 'distance')
    if(this._meetsDistance(position) && !this._started) {
      this._started = true;
      document.body.appendChild(this._clickPreventer);
      this.trigger('start', position);
    }

    // only execute move callback when properly started
    if(this._started) {
      this._clickPreventer.style.transform = 'translate3d(' + (this.eventDown.pageX + position.x - 15) + 'px, ' + (this.eventDown.pageY + position.y - 15) + 'px, 0)';
      this.trigger('move', position);
    }

  }

  _stop (event) {

    document.removeEventListener('pointermove', this.__move);
    document.removeEventListener('pointerup', this.__stop);

    event.preventDefault();

    if(this._started) {
      event.stopPropagation();
      this._clickPreventer.remove();
      this._started = false;
      this.trigger('stop');
    }

  }

}