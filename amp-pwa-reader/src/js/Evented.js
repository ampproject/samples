class Evented {

  constructor () {
    this._events = {};
  }

  bind (eventName, fn) {
    this._events[eventName] = this._events[eventName] || [];
    this._events[eventName].push(fn);
    return this;
  }

  unbind (eventName, fn) {
    this._events[eventName] = this._events[eventName] || [];
    let index = this._events[eventName].indexOf(fn);
    if(index > -1) {
      this._events[eventName].splice(index, 1);
    }
    return this;
  }

  trigger (eventName, a, b, c, d, e, f, g, h) {
    this._events[eventName] = this._events[eventName] || [];
    for (let i = 0; i < this._events[eventName].length; i++) {
      this._events[eventName][i](a, b, c, d, e, f, g, h);
    }
    return this;
  }

}