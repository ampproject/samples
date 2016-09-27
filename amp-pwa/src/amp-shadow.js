(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
var cssText = "html{overflow-x:hidden!important}body,html{height:auto!important}body{margin:0!important;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}.-amp-element{display:inline-block}.-amp-layout-fixed{display:inline-block;position:relative}.-amp-layout-container,.-amp-layout-fill,.-amp-layout-fixed-height,.-amp-layout-responsive{display:block;position:relative}.-amp-layout-fill{overflow:hidden!important;width:100%;height:100%}.-amp-layout-flex-item{display:block;position:relative;-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto}.-amp-layout-size-defined{overflow:hidden!important}i-amp-sizer{display:block!important}.-amp-fill-content{display:block;width:1px;min-width:100%;height:100%;margin:auto}.-amp-layout-size-defined .-amp-fill-content{position:absolute;top:0;left:0;bottom:0;right:0}.-amp-replaced-content{padding:0!important;border:none!important}.-amp-unresolved{position:relative;overflow:hidden!important}.-amp-notbuilt{position:relative;overflow:hidden!important;color:transparent!important}.-amp-notbuilt>*{display:none}.-amp-ghost{visibility:hidden!important}.-amp-element>[placeholder]{display:block}.-amp-element>[placeholder].amp-hidden,.-amp-element>[placeholder].hidden{visibility:hidden}.-amp-element:not(.amp-notsupported)>[fallback]{display:none}.-amp-layout-size-defined>[fallback],.-amp-layout-size-defined>[placeholder]{position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1!important}.-amp-notbuilt>[placeholder]{display:block!important}.-amp-hidden-by-media-query{display:none}.-amp-element-error{background:red!important;color:#fff!important;position:relative!important}.-amp-element-error:before{content:attr(error-message)}i-amp-scroll-container{position:absolute;top:0;left:0;right:0;bottom:0;display:block}i-amp-scroll-container.amp-active{overflow:auto}.-amp-loading-container{display:block!important;z-index:1}.-amp-notbuilt>.-amp-loading-container{display:block!important}.-amp-loading-container.amp-hidden{visibility:hidden}.-amp-loader{position:absolute;display:block;height:10px;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;white-space:nowrap}.-amp-loader.amp-active .-amp-loader-dot{-webkit-animation:a 2s infinite;animation:a 2s infinite}.-amp-loader-dot{position:relative;display:inline-block;height:10px;width:10px;margin:2px;border-radius:100%;background-color:rgba(0,0,0,.3);box-shadow:2px 2px 2px 1px rgba(0,0,0,.2);will-change:transform}.-amp-loader .-amp-loader-dot:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.-amp-loader .-amp-loader-dot:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}.-amp-loader .-amp-loader-dot:nth-child(3){-webkit-animation-delay:.2s;animation-delay:.2s}@-webkit-keyframes a{0%,to{-webkit-transform:scale(.7);transform:scale(.7);background-color:rgba(0,0,0,.3)}50%{-webkit-transform:scale(.8);transform:scale(.8);background-color:rgba(0,0,0,.5)}}@keyframes a{0%,to{-webkit-transform:scale(.7);transform:scale(.7);background-color:rgba(0,0,0,.3)}50%{-webkit-transform:scale(.8);transform:scale(.8);background-color:rgba(0,0,0,.5)}}.-amp-element>[overflow]{cursor:pointer;z-index:2;visibility:hidden}.-amp-element>[overflow].amp-visible{visibility:visible}template{display:none!important}.amp-border-box,.amp-border-box *,.amp-border-box :after,.amp-border-box :before{box-sizing:border-box}amp-pixel{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}amp-ad iframe{border:0!important;margin:0!important;padding:0!important}amp-instagram{padding:48px 8px!important;background-color:#fff}amp-analytics{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}[amp-access][amp-access-hide],amp-experiment,amp-live-list>[update],amp-share-tracking,form [submit-error],form [submit-success]{display:none}amp-fresh{visibility:hidden}\n/*# sourceURL=/css/amp.css*/";
exports.cssText = cssText;

},{}],2:[function(require,module,exports){
exports.__esModule = true;
exports.installImg = installImg;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _srcBaseElement = require('../src/base-element');

var _srcLayout = require('../src/layout');

var _srcCustomElement = require('../src/custom-element');

var _srcSrcset = require('../src/srcset');

var AmpImg = (function (_BaseElement) {
  babelHelpers.inherits(AmpImg, _BaseElement);

  /** @param {!AmpElement} element */

  function AmpImg(element) {
    babelHelpers.classCallCheck(this, AmpImg);

    _BaseElement.call(this, element);

    /** @private {boolean} */
    this.allowImgLoadFallback_ = true;

    /** @private {?Element} */
    this.img_ = null;

    /** @private {?../src/srcset.Srcset} */
    this.srcset_ = null;
  }

  /** @override */

  AmpImg.prototype.buildCallback = function buildCallback() {
    /** @private @const {boolean} */
    this.isPrerenderAllowed_ = !this.element.hasAttribute('noprerender');
  };

  /** @override */

  AmpImg.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /**
   * Create the actual image element and set up instance variables.
   * Called lazily in the first `#layoutCallback`.
   */

  AmpImg.prototype.initialize_ = function initialize_() {
    if (this.img_) {
      return;
    }
    /** @private {boolean} */
    this.allowImgLoadFallback_ = true;
    // If this amp-img IS the fallback then don't allow it to have its own
    // fallback to stop from nested fallback abuse.
    if (this.element.hasAttribute('fallback')) {
      this.allowImgLoadFallback_ = false;
    }

    this.img_ = new Image();
    if (this.element.id) {
      this.img_.setAttribute('amp-img-id', this.element.id);
    }
    this.propagateAttributes(['alt', 'referrerpolicy'], this.img_);
    this.applyFillContent(this.img_, true);

    this.element.appendChild(this.img_);

    this.srcset_ = _srcSrcset.srcsetFromElement(this.element);
  };

  /** @override */

  AmpImg.prototype.prerenderAllowed = function prerenderAllowed() {
    return this.isPrerenderAllowed_;
  };

  /** @override */

  AmpImg.prototype.isRelayoutNeeded = function isRelayoutNeeded() {
    return true;
  };

  /** @override */

  AmpImg.prototype.layoutCallback = function layoutCallback() {
    var _this = this;

    this.initialize_();
    var promise = this.updateImageSrc_();

    // We only allow to fallback on error on the initial layoutCallback
    // or else this would be pretty expensive.
    if (this.allowImgLoadFallback_) {
      promise = promise['catch'](function (e) {
        _this.onImgLoadingError_();
        throw e;
      });
      this.allowImgLoadFallback_ = false;
    }
    return promise;
  };

  /**
   * @return {!Promise}
   * @private
   */

  AmpImg.prototype.updateImageSrc_ = function updateImageSrc_() {
    var _this2 = this;

    if (this.getLayoutWidth() <= 0) {
      return Promise.resolve();
    }
    var src = this.srcset_.select(this.getLayoutWidth(), this.getDpr()).url;
    if (src == this.img_.getAttribute('src')) {
      return Promise.resolve();
    }

    this.img_.setAttribute('src', src);

    return this.loadPromise(this.img_).then(function () {
      // Clean up the fallback if the src has changed.
      if (!_this2.allowImgLoadFallback_ && _this2.img_.classList.contains('-amp-ghost')) {
        _this2.getVsync().mutate(function () {
          _this2.img_.classList.remove('-amp-ghost');
          _this2.toggleFallback(false);
        });
      }
    });
  };

  AmpImg.prototype.onImgLoadingError_ = function onImgLoadingError_() {
    var _this3 = this;

    this.getVsync().mutate(function () {
      _this3.img_.classList.add('-amp-ghost');
      _this3.toggleFallback(true);
    });
  };

  return AmpImg;
})(_srcBaseElement.BaseElement);

exports.AmpImg = AmpImg;
;

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installImg(win) {
  _srcCustomElement.registerElement(win, 'amp-img', AmpImg);
}

},{"../src/base-element":13,"../src/custom-element":18,"../src/layout":39,"../src/srcset":81}],3:[function(require,module,exports){
exports.__esModule = true;
exports.installPixel = installPixel;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _srcBaseElement = require('../src/base-element');

var _srcLayout = require('../src/layout');

var _srcUrlReplacements = require('../src/url-replacements');

var _srcCustomElement = require('../src/custom-element');

var _srcStyle = require('../src/style');

var _srcLog = require('../src/log');

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installPixel(win) {
  var AmpPixel = (function (_BaseElement) {
    babelHelpers.inherits(AmpPixel, _BaseElement);

    function AmpPixel() {
      babelHelpers.classCallCheck(this, AmpPixel);

      _BaseElement.apply(this, arguments);
    }

    /** @override */

    AmpPixel.prototype.getPriority = function getPriority() {
      // Loads after other content.
      return 1;
    };

    /** @override */

    AmpPixel.prototype.isLayoutSupported = function isLayoutSupported(layout) {
      return layout == _srcLayout.Layout.FIXED;
    };

    /** @override */

    AmpPixel.prototype.buildCallback = function buildCallback() {
      // Consider the element invisible.
      this.element.setAttribute('aria-hidden', 'true');
    };

    /** @override */

    AmpPixel.prototype.layoutCallback = function layoutCallback() {
      var _this = this;

      // Now that we are rendered, stop rendering the element to reduce
      // resource consumption.
      _srcStyle.toggle(this.element, false);
      var src = this.element.getAttribute('src');
      return _srcUrlReplacements.urlReplacementsFor(this.win).expandAsync(this.assertSource(src)).then(function (src) {
        var image = new Image();
        image.src = src;
        _this.element.appendChild(image);
      });
    };

    AmpPixel.prototype.assertSource = function assertSource(src) {
      _srcLog.user().assert(/^(https\:\/\/|\/\/)/i.test(src), 'The <amp-pixel> src attribute must start with ' + '"https://" or "//". Invalid value: ' + src);
      return src;
    };

    return AmpPixel;
  })(_srcBaseElement.BaseElement);

  ;

  _srcCustomElement.registerElement(win, 'amp-pixel', AmpPixel);
}

},{"../src/base-element":13,"../src/custom-element":18,"../src/layout":39,"../src/log":41,"../src/style":84,"../src/url-replacements":89}],4:[function(require,module,exports){
exports.__esModule = true;
exports.installVideo = installVideo;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _srcBaseElement = require('../src/base-element');

var _srcEventHelper = require('../src/event-helper');

var _srcUrl = require('../src/url');

var _srcLayout = require('../src/layout');

var _srcCustomElement = require('../src/custom-element');

var _srcMode = require('../src/mode');

var _srcLog = require('../src/log');

var _srcPlatform = require('../src/platform');

var _srcVideoInterface = require('../src/video-interface');

var _srcVideoManager = require('../src/video-manager');

/**
 * @param {!Window} win Destination window for the new element.
 * @this {undefined}  // Make linter happy
 * @return {undefined}
 */

function installVideo(win) {

  /**
   * @implements {../src/video-interface.VideoInterface}
   */

  var AmpVideo = (function (_BaseElement) {
    babelHelpers.inherits(AmpVideo, _BaseElement);

    function AmpVideo() {
      babelHelpers.classCallCheck(this, AmpVideo);

      _BaseElement.apply(this, arguments);
    }

    /** @override */

    AmpVideo.prototype.isLayoutSupported = function isLayoutSupported(layout) {
      return _srcLayout.isLayoutSizeDefined(layout);
    };

    /** @override */

    AmpVideo.prototype.buildCallback = function buildCallback() {
      /** @private @const {!Element} */
      this.video_ = this.element.ownerDocument.createElement('video');

      /** @private @const {!../src/service/platform-impl.Platform} */
      this.platform_ = _srcPlatform.platformFor(this.win);

      var posterAttr = this.element.getAttribute('poster');
      if (!posterAttr && _srcMode.getMode().development) {
        console /*OK*/.error('No "poster" attribute has been provided for amp-video.');
      }

      // Enable inline play for iOS.
      this.video_.setAttribute('playsinline', '');
      this.video_.setAttribute('webkit-playsinline', '');
      // Disable video preload in prerender mode.
      this.video_.setAttribute('preload', 'none');
      this.propagateAttributes(['poster', 'controls'], this.video_);
      this.forwardEvents([_srcVideoInterface.VideoEvents.CANPLAY], this.video_);
      this.fixIOSCanplayEventForAutoplay_();
      this.applyFillContent(this.video_, true);
      this.element.appendChild(this.video_);

      _srcVideoManager.videoManagerForDoc(this.win.document).register(this);
    };

    /** @override */

    AmpVideo.prototype.viewportCallback = function viewportCallback(visible) {
      this.element.dispatchCustomEvent(_srcVideoInterface.VideoEvents.VISIBILITY, { visible: visible });
    };

    /** @override */

    AmpVideo.prototype.layoutCallback = function layoutCallback() {
      var _this = this;

      if (!this.isVideoSupported_()) {
        this.toggleFallback(true);
        return Promise.resolve();
      }

      if (this.element.getAttribute('src')) {
        _srcUrl.assertHttpsUrl(this.element.getAttribute('src'), this.element);
      }

      // Do not propagate `autoplay`. Autoplay behaviour is managed by
      // video manager since amp-video implements the VideoInterface
      this.propagateAttributes(['src', 'loop'], this.video_);

      if (this.element.hasAttribute('preload')) {
        this.video_.setAttribute('preload', this.element.getAttribute('preload'));
      } else {
        this.video_.removeAttribute('preload');
      }

      this.getRealChildNodes().forEach(function (child) {
        // Skip the video we already added to the element.
        if (_this.video_ === child) {
          return;
        }
        if (child.getAttribute && child.getAttribute('src')) {
          _srcUrl.assertHttpsUrl(child.getAttribute('src'), _srcLog.dev().assertElement(child));
        }
        _this.video_.appendChild(child);
      });

      return this.loadPromise(this.video_);
    };

    /** @override */

    AmpVideo.prototype.pauseCallback = function pauseCallback() {
      if (this.video_) {
        this.video_.pause();
      }
    };

    /** @private */

    AmpVideo.prototype.isVideoSupported_ = function isVideoSupported_() {
      return !!this.video_.play;
    };

    /**
     * Safari on iOS does not trigger the `canplay` event for muted inline
     * videos despite the fact that calls to `play` are allowed for muted inline
     * videos in iOS 10.
     * It does trigger `canplay` if `autoplay` attribute is set however.
     * Since VideoManager handles autoplay behaviour for AMP, we do not
     * propagate the `autoplay` attribute to the underlying video element but
     * to get around the iOS bug, we will temporarily propagate `autoplay`
     * attribute until we get the `canplay` event and then remove it.
     * {@see https://bugs.webkit.org/show_bug.cgi?id=161804}
     * @private
     */

    AmpVideo.prototype.fixIOSCanplayEventForAutoplay_ = function fixIOSCanplayEventForAutoplay_() {
      var _this2 = this;

      if (!this.element.hasAttribute('autoplay') || !this.platform_.isIos()) {
        return;
      }

      this.propagateAttributes(['autoplay'], this.video_);
      _srcEventHelper.listenOnce(this.video_, _srcVideoInterface.VideoEvents.CANPLAY, function () {
        _this2.video_.removeAttribute('autoplay');
      });
    };

    // VideoInterface Implementation. See ../src/video-interface.VideoInterface

    /**
     * @override
     */

    AmpVideo.prototype.supportsPlatform = function supportsPlatform() {
      return this.isVideoSupported_();
    };

    /**
     * @override
     */

    AmpVideo.prototype.play = function play(unusedIsAutoplay) {
      this.video_.play();
    };

    /**
     * @override
     */

    AmpVideo.prototype.pause = function pause() {
      this.video_.pause();
    };

    /**
     * @override
     */

    AmpVideo.prototype.mute = function mute() {
      this.video_.muted = true;
    };

    /**
     * @override
     */

    AmpVideo.prototype.unmute = function unmute() {
      this.video_.muted = false;
    };

    /**
     * @override
     */

    AmpVideo.prototype.showControls = function showControls() {
      this.video_.controls = true;
    };

    /**
     * @override
     */

    AmpVideo.prototype.hideControls = function hideControls() {
      this.video_.controls = false;
    };

    return AmpVideo;
  })(_srcBaseElement.BaseElement);

  _srcCustomElement.registerElement(win, 'amp-video', AmpVideo);
}

},{"../src/base-element":13,"../src/custom-element":18,"../src/event-helper":27,"../src/layout":39,"../src/log":41,"../src/mode":43,"../src/platform":47,"../src/url":90,"../src/video-interface":94,"../src/video-manager":95}],5:[function(require,module,exports){
/*!
Copyright (C) 2014-2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(window, document, Object, REGISTER_ELEMENT){'use strict';

// in case it's there or already patched
if (REGISTER_ELEMENT in document) return;

// DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
// THIS IS A PROJECT BASED ON A BUILD SYSTEM
// THIS FILE IS JUST WRAPPED UP RESULTING IN
// build/document-register-element.js
// and its .max.js counter part

var
  // IE < 11 only + old WebKit for attributes + feature detection
  EXPANDO_UID = '__' + REGISTER_ELEMENT + (Math.random() * 10e4 >> 0),

  // shortcuts and costants
  ATTACHED = 'attached',
  DETACHED = 'detached',
  EXTENDS = 'extends',
  ADDITION = 'ADDITION',
  MODIFICATION = 'MODIFICATION',
  REMOVAL = 'REMOVAL',
  DOM_ATTR_MODIFIED = 'DOMAttrModified',
  DOM_CONTENT_LOADED = 'DOMContentLoaded',
  DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
  PREFIX_TAG = '<',
  PREFIX_IS = '=',

  // valid and invalid node names
  validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
  invalidNames = [
    'ANNOTATION-XML',
    'COLOR-PROFILE',
    'FONT-FACE',
    'FONT-FACE-SRC',
    'FONT-FACE-URI',
    'FONT-FACE-FORMAT',
    'FONT-FACE-NAME',
    'MISSING-GLYPH'
  ],

  // registered types and their prototypes
  types = [],
  protos = [],

  // to query subnodes
  query = '',

  // html shortcut used to feature detect
  documentElement = document.documentElement,

  // ES5 inline helpers || basic patches
  indexOf = types.indexOf || function (v) {
    for(var i = this.length; i-- && this[i] !== v;){}
    return i;
  },

  // other helpers / shortcuts
  OP = Object.prototype,
  hOP = OP.hasOwnProperty,
  iPO = OP.isPrototypeOf,

  defineProperty = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  gOPN = Object.getOwnPropertyNames,
  gPO = Object.getPrototypeOf,
  sPO = Object.setPrototypeOf,

  // jshint proto: true
  hasProto = !!Object.__proto__,

  // used to create unique instances
  create = Object.create || function Bridge(proto) {
    // silly broken polyfill probably ever used but short enough to work
    return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
  },

  // will set the prototype if possible
  // or copy over all properties
  setPrototype = sPO || (
    hasProto ?
      function (o, p) {
        o.__proto__ = p;
        return o;
      } : (
    (gOPN && gOPD) ?
      (function(){
        function setProperties(o, p) {
          for (var
            key,
            names = gOPN(p),
            i = 0, length = names.length;
            i < length; i++
          ) {
            key = names[i];
            if (!hOP.call(o, key)) {
              defineProperty(o, key, gOPD(p, key));
            }
          }
        }
        return function (o, p) {
          do {
            setProperties(o, p);
          } while ((p = gPO(p)) && !iPO.call(p, o));
          return o;
        };
      }()) :
      function (o, p) {
        for (var key in p) {
          o[key] = p[key];
        }
        return o;
      }
  )),

  // DOM shortcuts and helpers, if any

  MutationObserver = window.MutationObserver ||
                     window.WebKitMutationObserver,

  HTMLElementPrototype = (
    window.HTMLElement ||
    window.Element ||
    window.Node
  ).prototype,

  IE8 = !iPO.call(HTMLElementPrototype, documentElement),

  isValidNode = IE8 ?
    function (node) {
      return node.nodeType === 1;
    } :
    function (node) {
      return iPO.call(HTMLElementPrototype, node);
    },

  targets = IE8 && [],

  cloneNode = HTMLElementPrototype.cloneNode,
  setAttribute = HTMLElementPrototype.setAttribute,
  removeAttribute = HTMLElementPrototype.removeAttribute,

  // replaced later on
  createElement = document.createElement,

  // shared observer for all attributes
  attributesObserver = MutationObserver && {
    attributes: true,
    characterData: true,
    attributeOldValue: true
  },

  // useful to detect only if there's no MutationObserver
  DOMAttrModified = MutationObserver || function(e) {
    doesNotSupportDOMAttrModified = false;
    documentElement.removeEventListener(
      DOM_ATTR_MODIFIED,
      DOMAttrModified
    );
  },

  // will both be used to make DOMNodeInserted asynchronous
  asapQueue,
  rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (fn) { setTimeout(fn, 10); },

  // internal flags
  setListener = false,
  doesNotSupportDOMAttrModified = true,
  dropDomContentLoaded = true,

  // needed for the innerHTML helper
  notFromInnerHTMLHelper = true,

  // optionally defined later on
  onSubtreeModified,
  callDOMAttrModified,
  getAttributesMirror,
  observer,

  // based on setting prototype capability
  // will check proto or the expando attribute
  // in order to setup the node once
  patchIfNotAlready,
  patch
;

if (sPO || hasProto) {
    patchIfNotAlready = function (node, proto) {
      if (!iPO.call(proto, node)) {
        setupNode(node, proto);
      }
    };
    patch = setupNode;
} else {
    patchIfNotAlready = function (node, proto) {
      if (!node[EXPANDO_UID]) {
        node[EXPANDO_UID] = Object(true);
        setupNode(node, proto);
      }
    };
    patch = patchIfNotAlready;
}
if (IE8) {
  doesNotSupportDOMAttrModified = false;
  (function (){
    var
      descriptor = gOPD(HTMLElementPrototype, 'addEventListener'),
      addEventListener = descriptor.value,
      patchedRemoveAttribute = function (name) {
        var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
        e.attrName = name;
        e.prevValue = this.getAttribute(name);
        e.newValue = null;
        e[REMOVAL] = e.attrChange = 2;
        removeAttribute.call(this, name);
        this.dispatchEvent(e);
      },
      patchedSetAttribute = function (name, value) {
        var
          had = this.hasAttribute(name),
          old = had && this.getAttribute(name),
          e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
        ;
        setAttribute.call(this, name, value);
        e.attrName = name;
        e.prevValue = had ? old : null;
        e.newValue = value;
        if (had) {
          e[MODIFICATION] = e.attrChange = 1;
        } else {
          e[ADDITION] = e.attrChange = 0;
        }
        this.dispatchEvent(e);
      },
      onPropertyChange = function (e) {
        // jshint eqnull:true
        var
          node = e.currentTarget,
          superSecret = node[EXPANDO_UID],
          propertyName = e.propertyName,
          event
        ;
        if (superSecret.hasOwnProperty(propertyName)) {
          superSecret = superSecret[propertyName];
          event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
          event.attrName = superSecret.name;
          event.prevValue = superSecret.value || null;
          event.newValue = (superSecret.value = node[propertyName] || null);
          if (event.prevValue == null) {
            event[ADDITION] = event.attrChange = 0;
          } else {
            event[MODIFICATION] = event.attrChange = 1;
          }
          node.dispatchEvent(event);
        }
      }
    ;
    descriptor.value = function (type, handler, capture) {
      if (
        type === DOM_ATTR_MODIFIED &&
        this.attributeChangedCallback &&
        this.setAttribute !== patchedSetAttribute
      ) {
        this[EXPANDO_UID] = {
          className: {
            name: 'class',
            value: this.className
          }
        };
        this.setAttribute = patchedSetAttribute;
        this.removeAttribute = patchedRemoveAttribute;
        addEventListener.call(this, 'propertychange', onPropertyChange);
      }
      addEventListener.call(this, type, handler, capture);
    };
    defineProperty(HTMLElementPrototype, 'addEventListener', descriptor);
  }());
} else if (!MutationObserver) {
  documentElement.addEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
  documentElement.setAttribute(EXPANDO_UID, 1);
  documentElement.removeAttribute(EXPANDO_UID);
  if (doesNotSupportDOMAttrModified) {
    onSubtreeModified = function (e) {
      var
        node = this,
        oldAttributes,
        newAttributes,
        key
      ;
      if (node === e.target) {
        oldAttributes = node[EXPANDO_UID];
        node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
        for (key in newAttributes) {
          if (!(key in oldAttributes)) {
            // attribute was added
            return callDOMAttrModified(
              0,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              ADDITION
            );
          } else if (newAttributes[key] !== oldAttributes[key]) {
            // attribute was changed
            return callDOMAttrModified(
              1,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              MODIFICATION
            );
          }
        }
        // checking if it has been removed
        for (key in oldAttributes) {
          if (!(key in newAttributes)) {
            // attribute removed
            return callDOMAttrModified(
              2,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              REMOVAL
            );
          }
        }
      }
    };
    callDOMAttrModified = function (
      attrChange,
      currentTarget,
      attrName,
      prevValue,
      newValue,
      action
    ) {
      var e = {
        attrChange: attrChange,
        currentTarget: currentTarget,
        attrName: attrName,
        prevValue: prevValue,
        newValue: newValue
      };
      e[action] = attrChange;
      onDOMAttrModified(e);
    };
    getAttributesMirror = function (node) {
      for (var
        attr, name,
        result = {},
        attributes = node.attributes,
        i = 0, length = attributes.length;
        i < length; i++
      ) {
        attr = attributes[i];
        name = attr.name;
        if (name !== 'setAttribute') {
          result[name] = attr.value;
        }
      }
      return result;
    };
  }
}

function loopAndVerify(list, action) {
  for (var i = 0, length = list.length; i < length; i++) {
    verifyAndSetupAndAction(list[i], action);
  }
}

function loopAndSetup(list) {
  for (var i = 0, length = list.length, node; i < length; i++) {
    node = list[i];
    patch(node, protos[getTypeIndex(node)]);
  }
}

function executeAction(action) {
  return function (node) {
    if (isValidNode(node)) {
      verifyAndSetupAndAction(node, action);
      loopAndVerify(
        node.querySelectorAll(query),
        action
      );
    }
  };
}

function getTypeIndex(target) {
  var
    is = target.getAttribute('is'),
    nodeName = target.nodeName.toUpperCase(),
    i = indexOf.call(
      types,
      is ?
          PREFIX_IS + is.toUpperCase() :
          PREFIX_TAG + nodeName
    )
  ;
  return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
}

function isInQSA(name, type) {
  return -1 < query.indexOf(name + '[is="' + type + '"]');
}

function onDOMAttrModified(e) {
  var
    node = e.currentTarget,
    attrChange = e.attrChange,
    attrName = e.attrName,
    target = e.target
  ;
  if (notFromInnerHTMLHelper &&
      (!target || target === node) &&
      node.attributeChangedCallback &&
      attrName !== 'style' &&
      e.prevValue !== e.newValue) {
    node.attributeChangedCallback(
      attrName,
      attrChange === e[ADDITION] ? null : e.prevValue,
      attrChange === e[REMOVAL] ? null : e.newValue
    );
  }
}

function onDOMNode(action) {
  var executor = executeAction(action);
  return function (e) {
    asapQueue.push(executor, e.target);
  };
}

function onReadyStateChange(e) {
  if (dropDomContentLoaded) {
    dropDomContentLoaded = false;
    e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
  }
  loopAndVerify(
    (e.target || document).querySelectorAll(query),
    e.detail === DETACHED ? DETACHED : ATTACHED
  );
  if (IE8) purge();
}

function patchedSetAttribute(name, value) {
  // jshint validthis:true
  var self = this;
  setAttribute.call(self, name, value);
  onSubtreeModified.call(self, {target: self});
}

function setupNode(node, proto) {
  setPrototype(node, proto);
  if (observer) {
    observer.observe(node, attributesObserver);
  } else {
    if (doesNotSupportDOMAttrModified) {
      node.setAttribute = patchedSetAttribute;
      node[EXPANDO_UID] = getAttributesMirror(node);
      node.addEventListener(DOM_SUBTREE_MODIFIED, onSubtreeModified);
    }
    node.addEventListener(DOM_ATTR_MODIFIED, onDOMAttrModified);
  }
  if (node.createdCallback && notFromInnerHTMLHelper) {
    node.created = true;
    node.createdCallback();
    node.created = false;
  }
}

function purge() {
  for (var
    node,
    i = 0,
    length = targets.length;
    i < length; i++
  ) {
    node = targets[i];
    if (!documentElement.contains(node)) {
      length--;
      targets.splice(i--, 1);
      verifyAndSetupAndAction(node, DETACHED);
    }
  }
}

function throwTypeError(type) {
  throw new Error('A ' + type + ' type is already registered');
}

function verifyAndSetupAndAction(node, action) {
  var
    fn,
    i = getTypeIndex(node)
  ;
  if (-1 < i) {
    patchIfNotAlready(node, protos[i]);
    i = 0;
    if (action === ATTACHED && !node[ATTACHED]) {
      node[DETACHED] = false;
      node[ATTACHED] = true;
      i = 1;
      if (IE8 && indexOf.call(targets, node) < 0) {
        targets.push(node);
      }
    } else if (action === DETACHED && !node[DETACHED]) {
      node[ATTACHED] = false;
      node[DETACHED] = true;
      i = 1;
    }
    if (i && (fn = node[action + 'Callback'])) fn.call(node);
  }
}

// set as enumerable, writable and configurable
document[REGISTER_ELEMENT] = function registerElement(type, options) {
  upperType = type.toUpperCase();
  if (!setListener) {
    // only first time document.registerElement is used
    // we need to set this listener
    // setting it by default might slow down for no reason
    setListener = true;
    if (MutationObserver) {
      observer = (function(attached, detached){
        function checkEmAll(list, callback) {
          for (var i = 0, length = list.length; i < length; callback(list[i++])){}
        }
        return new MutationObserver(function (records) {
          for (var
            current, node, newValue,
            i = 0, length = records.length; i < length; i++
          ) {
            current = records[i];
            if (current.type === 'childList') {
              checkEmAll(current.addedNodes, attached);
              checkEmAll(current.removedNodes, detached);
            } else {
              node = current.target;
              if (notFromInnerHTMLHelper &&
                  node.attributeChangedCallback &&
                  current.attributeName !== 'style') {
                newValue = node.getAttribute(current.attributeName);
                if (newValue !== current.oldValue) {
                  node.attributeChangedCallback(
                    current.attributeName,
                    current.oldValue,
                    newValue
                  );
                }
              }
            }
          }
        });
      }(executeAction(ATTACHED), executeAction(DETACHED)));
      observer.observe(
        document,
        {
          childList: true,
          subtree: true
        }
      );
    } else {
      asapQueue = [];
      rAF(function ASAP() {
        while (asapQueue.length) {
          asapQueue.shift().call(
            null, asapQueue.shift()
          );
        }
        rAF(ASAP);
      });
      document.addEventListener('DOMNodeInserted', onDOMNode(ATTACHED));
      document.addEventListener('DOMNodeRemoved', onDOMNode(DETACHED));
    }

    document.addEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    document.addEventListener('readystatechange', onReadyStateChange);

    document.createElement = function (localName, typeExtension) {
      var
        node = createElement.apply(document, arguments),
        name = '' + localName,
        i = indexOf.call(
          types,
          (typeExtension ? PREFIX_IS : PREFIX_TAG) +
          (typeExtension || name).toUpperCase()
        ),
        setup = -1 < i
      ;
      if (typeExtension) {
        node.setAttribute('is', typeExtension = typeExtension.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), typeExtension);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    };

    HTMLElementPrototype.cloneNode = function (deep) {
      var
        node = cloneNode.call(this, !!deep),
        i = getTypeIndex(node)
      ;
      if (-1 < i) patch(node, protos[i]);
      if (deep) loopAndSetup(node.querySelectorAll(query));
      return node;
    };
  }

  if (-2 < (
    indexOf.call(types, PREFIX_IS + upperType) +
    indexOf.call(types, PREFIX_TAG + upperType)
  )) {
    throwTypeError(type);
  }

  if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
    throw new Error('The type ' + type + ' is invalid');
  }

  var
    constructor = function () {
      return extending ?
        document.createElement(nodeName, upperType) :
        document.createElement(nodeName);
    },
    opt = options || OP,
    extending = hOP.call(opt, EXTENDS),
    nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
    upperType,
    i
  ;

  if (extending && -1 < (
    indexOf.call(types, PREFIX_TAG + nodeName)
  )) {
    throwTypeError(nodeName);
  }

  i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;

  query = query.concat(
    query.length ? ',' : '',
    extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
  );

  constructor.prototype = (
    protos[i] = hOP.call(opt, 'prototype') ?
      opt.prototype :
      create(HTMLElementPrototype)
  );

  loopAndVerify(
    document.querySelectorAll(query),
    ATTACHED
  );

  return constructor;
};

}(window, document, Object, 'registerElement'));
},{}],6:[function(require,module,exports){
'use strict';

/**
 * Constructs a ES6/Promises A+ Promise instance.
 *
 * @constructor
 * @param {function(function(*=), function (*=))} resolver
 */
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Constructor Promise requires `new`');
  }
  if (!isFunction(resolver)) {
    throw new TypeError('Must pass resolver function');
  }

  /**
   * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
   * @private
   */
  this._state = PendingPromise;

  /**
   * @type {*}
   * @private
   */
  this._value = [];

  /**
   * @type {boolean}
   * @private
   */
  this._isChainEnd = true;

  doResolve(
    this,
    adopter(this, FulfilledPromise),
    adopter(this, RejectedPromise),
    { then: resolver }
  );
}

/****************************
  Public Instance Methods
 ****************************/

/**
 * Creates a new promise instance that will receive the result of this promise
 * as inputs to the onFulfilled or onRejected callbacks.
 *
 * @param {function(*)} onFulfilled
 * @param {function(*)} onRejected
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : void 0;
  onRejected = isFunction(onRejected) ? onRejected : void 0;

  if (onFulfilled || onRejected) {
    this._isChainEnd = false;
  }

  return this._state(
    this._value,
    onFulfilled,
    onRejected
  );
};

/**
 * Creates a new promise that will handle the rejected state of this promise.
 *
 * @param {function(*)} onRejected
 * @returns {!Promise}
 */
Promise.prototype.catch = function(onRejected) {
  return this.then(void 0, onRejected);
};

/****************************
  Public Static Methods
 ****************************/

/**
 * Creates a fulfilled Promise of value. If value is itself a then-able,
 * resolves with the then-able's value.
 *
 * @this {!Promise}
 * @param {*=} value
 * @returns {!Promise}
 */
Promise.resolve = function(value) {
  var Constructor = this;
  var promise;

  if (isObject(value) && value instanceof this) {
    promise = value;
  } else {
    promise = new Constructor(function(resolve) {
      resolve(value);
    });
  }

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a rejected Promise of reason.
 *
 * @this {!Promise}
 * @param {*=} reason
 * @returns {!Promise}
 */
Promise.reject = function(reason) {
  var Constructor = this;
  var promise = new Constructor(function(_, reject) {
    reject(reason);
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve with an array of the values of the
 * passed in promises. If any promise rejects, the returned promise will
 * reject.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.all = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    var length = promises.length;
    var values = new Array(length);

    if (length === 0) {
      return resolve(values);
    }

    each(promises, function(promise, index) {
      Constructor.resolve(promise).then(function(value) {
        values[index] = value;
        if (--length === 0) {
          resolve(values);
        }
      }, reject);
    });
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve or reject based on the first
 * resolved or rejected promise.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.race = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    for (var i = 0, l = promises.length; i < l; i++) {
      Constructor.resolve(promises[i]).then(resolve, reject);
    }
  });

  return /** @type {!Promise} */(promise);
};

/**
 * An internal use static function.
 */
Promise._overrideUnhandledExceptionHandler = function(handler) {
  onPossiblyUnhandledRejection = handler;
};

/****************************
  Private functions
 ****************************/

/**
 * The Fulfilled Promise state. Calls onFulfilled with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onFulfilled, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} value The current promise's resolved value.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} unused
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Fulfilled state from the
 *     Pending state.
 * @returns {!Promise}
 */
function FulfilledPromise(value, onFulfilled, unused, deferred) {
  if (!onFulfilled) { return this; }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onFulfilled, value));
  return deferred.promise;
}

/**
 * The Rejected Promise state. Calls onRejected with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onRejected, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} reason The current promise's rejection reason.
 * @param {function(*=)=} unused
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Rejected state from the
 *     Pending state.
 * @returns {!Promise}
 */
function RejectedPromise(reason, unused, onRejected, deferred) {
  if (!onRejected) { return this; }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onRejected, reason));
  return deferred.promise;
}

/**
 * The Pending Promise state. Eventually calls onFulfilled once the promise has
 * resolved, or onRejected once the promise rejects.
 *
 * If there is no onFulfilled and no onRejected, returns the current promise to
 * avoid an promise instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} queue The current promise's pending promises queue.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Pending state from the
 *     Pending state of another promise.
 * @returns {!Promise}
 */
function PendingPromise(queue, onFulfilled, onRejected, deferred) {
  if (!onFulfilled && !onRejected) { return this; }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  queue.push({
    deferred: deferred,
    onFulfilled: onFulfilled || deferred.resolve,
    onRejected: onRejected || deferred.reject
  });
  return deferred.promise;
}

/**
 * Constructs a deferred instance that holds a promise and its resolve and
 * reject functions.
 *
 * @constructor
 */
function Deferred(Promise) {
  var deferred = this;
  /** @type {!Promise} */
  this.promise = new Promise(function(resolve, reject) {
    /** @type {function(*=)} */
    deferred.resolve = resolve;

    /** @type {function(*=)} */
    deferred.reject = reject;
  });
  return deferred;
}

/**
 * Transitions the state of promise to another state. This is only ever called
 * on with a promise that is currently in the Pending state.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function adopt(promise, state, value) {
  var queue = promise._value;
  promise._state = state;
  promise._value = value;

  for (var i = 0; i < queue.length; i++) {
    var next = queue[i];
    promise._state(
      value,
      next.onFulfilled,
      next.onRejected,
      next.deferred
    );
  }

  // Determine if this rejected promise will be "handled".
  if (state === RejectedPromise && promise._isChainEnd) {
    setTimeout(function() {
      if (promise._isChainEnd) {
        onPossiblyUnhandledRejection(value, promise);
      }
    }, 0);
  }
}
/**
 * A partial application of adopt.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @returns {function(*=)}
 */
function adopter(promise, state) {
  return function(value) {
    adopt(promise, state, value);
  };
}

/**
 * A no-op function to prevent double resolving.
 */
function noop() {}

/**
 * Tests if fn is a Function
 *
 * @param {*} fn
 * @returns {boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Tests if fn is an Object
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
  return obj === Object(obj);
}

var onPossiblyUnhandledRejection = function(reason, promise) {
  throw reason;
}

/**
 * Iterates over each element of an array, calling the iterator with the
 * element and its index.
 *
 * @param {!Array} collection
 * @param {function(*=,number)} iterator
 */
function each(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i);
  }
}

/**
 * Creates a function that will attempt to resolve the deferred with the return
 * of fn. If any error is raised, rejects instead.
 *
 * @param {!Deferred} deferred
 * @param {function(*=)} fn
 * @param {*} arg
 * @returns {function()}
 */
function tryCatchDeferred(deferred, fn, arg) {
  var promise = deferred.promise;
  var resolve = deferred.resolve;
  var reject = deferred.reject;
  return function() {
    try {
      var result = fn(arg);
      if (resolve === fn || reject === fn) {
        return;
      }
      doResolve(promise, resolve, reject, result, result);
    } catch (e) {
      reject(e);
    }
  };
}

/**
 * Queues and executes multiple deferred functions on another run loop.
 */
var defer = (function() {
  /**
   * Defers fn to another run loop.
   */
  var scheduleFlush;
  if (typeof window !== 'undefined' && window.postMessage) {
    window.addEventListener('message', flush);
    scheduleFlush = function() {
      window.postMessage('macro-task', '*');
    };
  } else {
    scheduleFlush = function() {
      setTimeout(flush, 0);
    };
  }

  var queue = new Array(16);
  var length = 0;

  function flush() {
    for (var i = 0; i < length; i++) {
      var fn = queue[i];
      queue[i] = null;
      fn();
    }
    length = 0;
  }

  /**
   * @param {function()} fn
   */
  function defer(fn) {
    if (length === 0) { scheduleFlush(); }
    queue[length++] = fn;
  };

  return defer;
})();

/**
 * The Promise resolution procedure.
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param {!Promise} promise
 * @param {function(*=)} resolve
 * @param {function(*=)} reject
 * @param {*} value
 * @param {*=} context
 */
function doResolve(promise, resolve, reject, value, context) {
  var _reject = reject;
  var then;
  var _resolve;
  try {
    if (value === promise) {
      throw new TypeError('Cannot fulfill promise with itself');
    }
    var isObj = isObject(value);
    if (isObj && value instanceof promise.constructor) {
      adopt(promise, value._state, value._value);
    } else if (isObj && (then = value.then) && isFunction(then)) {
      _resolve = function(value) {
        _resolve = _reject = noop;
        doResolve(promise, resolve, reject, value, value);
      };
      _reject = function(reason) {
        _resolve = _reject = noop;
        reject(reason);
      };
      then.call(
        context,
        function(value) { _resolve(value); },
        function(reason) { _reject(reason); }
      );
    } else {
      resolve(value);
    }
  } catch (e) {
    _reject(e);
  }
}

module.exports = Promise;

},{}],7:[function(require,module,exports){
exports.__esModule = true;
exports.accessServiceFor = accessServiceFor;
exports.accessServiceForOrNull = accessServiceForOrNull;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _elementService = require('./element-service');

/**
 * Returns a promise for the Access service.
 * @param {!Window} win
 * @return {!Promise<!AccessService>}
 */

function accessServiceFor(win) {
  return (/** @type {!Promise<!AccessService>} */_elementService.getElementService(win, 'access', 'amp-access')
  );
}

/**
 * Returns a promise for the Access service or a promise for null if the service
 * is not available on the current page.
 * @param {!Window} win
 * @return {!Promise<?AccessService>}
 */

function accessServiceForOrNull(win) {
  return (/** @type {!Promise<?AccessService>} */_elementService.getElementServiceIfAvailable(win, 'access', 'amp-access')
  );
}

},{"./element-service":24}],8:[function(require,module,exports){
exports.__esModule = true;
exports.activityFor = activityFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _elementService = require('./element-service');

/**
 * @param {!Window} win
 * @return {!Promise<!Activity>}
 */

function activityFor(win) {
  return (/** @type {!Promise<!Activity>} */_elementService.getElementService(win, 'activity', 'amp-analytics')
  );
}

;

},{"./element-service":24}],9:[function(require,module,exports){
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

// Entry point into AMP for compilation with babel. Just loads amp.js and
// Babel's helpers.

require('../third_party/babel/custom-babel-helpers');

require('./amp-shadow');

},{"../third_party/babel/custom-babel-helpers":100,"./amp-shadow":10}],10:[function(require,module,exports){
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * The entry point for AMP Runtime (v0.js) when AMP Runtime may support
 * multiple AMP Docs in Shadow DOM.
 */

require('./polyfills');

var _serviceAmpdocImpl = require('./service/ampdoc-impl');

var _runtime = require('./runtime');

var _customElement = require('./custom-element');

// Declare that this runtime will support multiple shadow-root docs.
_serviceAmpdocImpl.installDocService(self, /* isSingleDoc */false);

// Core services.
_runtime.installRuntimeServices(self);

// Builtins.
_runtime.installBuiltins(self);

// Final configuration and stubbing.
_runtime.adoptShadowMode(self);
_customElement.stubElements(self);

// Output a message to the console and add an attribute to the <html>
// tag to give some information that can be used in error reports.
// (At least by sophisticated users).
if (self.console) {
  (console.info || console.log).call(console, 'Powered by AMP ⚡ HTML shadows – Version 1473975717617');
}
self.document.documentElement.setAttribute('amp-version', '1473975717617');

},{"./custom-element":18,"./polyfills":48,"./runtime":55,"./service/ampdoc-impl":58}],11:[function(require,module,exports){
exports.__esModule = true;
exports.ampdocServiceFor = ampdocServiceFor;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * Returns the global instance of the `AmpDocService` service that can be
 * used to resolve an ampdoc for any node: either in the single-doc or
 * shadow-doc environment.
 * @param {!Window} window
 * @return {!./service/ampdoc-impl.AmpDocService}
 */

function ampdocServiceFor(window) {
  return (/** @type {!./service/ampdoc-impl.AmpDocService} */_service.getExistingServiceForWindow(window, 'ampdoc')
  );
}

},{"./service":56}],12:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _curve = require('./curve');

var _log = require('./log');

var _vsync = require('./vsync');

var TAG_ = 'Animation';

var NOOP_CALLBACK = function () {};

/**
 * The animation class allows construction of arbitrary animation processes.
 * The main method is "add" that adds a segment of animation at particular
 * time offset (delay) and duration. All animation segments are simply functions
 * of type Transition which are iterated from 0 to 1 in animation frames to
 * achieve the desired effect.
 */

var Animation = (function () {

  /**
   * Creates and starts animation with a single segment. Returns AnimationPlayer
   * object that can be used to monitor or control animation.
   *
   * @param {!Node} contextNode The context node.
   * @param {!./transition.TransitionDef<?>} transition Transition to animate.
   * @param {./time.timeDef} duration Duration in milliseconds.
   * @param {(!./curve.CurveDef|string)=} opt_curve Optional curve to use for animation.
   *   Default is the linear animation.
   * @return {!AnimationPlayer}
   */

  Animation.animate = function animate(contextNode, transition, duration, opt_curve) {
    return new Animation(contextNode).setCurve(opt_curve).add(0, transition, 1).start(duration);
  };

  /**
   * @param {!Node} contextNode
   * @param {!./service/vsync-impl.Vsync=} opt_vsync
   */

  function Animation(contextNode, opt_vsync) {
    babelHelpers.classCallCheck(this, Animation);

    /** @private @const {!Node} */
    this.contextNode_ = contextNode;

    /** @private @const {!./service/vsync-impl.Vsync} */
    this.vsync_ = opt_vsync || _vsync.vsyncFor(self);

    /** @private {?./curve.CurveDef} */
    this.curve_ = null;

    /**
     * @private @const {!Array<!SegmentDef>}
     */
    this.segments_ = [];
  }

  /**
   * AnimationPlayer allows tracking and monitoring of the running animation.
   * Most importantly it exposes methods "then" and "thenAlways" that have the
   * semantics of a Promise and signal when the animation completed or failed.
   * Additionally, it exposes the method "halt" which allows to stop/reset the
   * animation.
   * // TODO(@cramforce) Actually fully implement.
   * implements {IThenable}
   */

  /**
   * Sets the default curve for the animation. Each segment is allowed to have
   * its own curve, but this curve will be used if a segment doesn't specify
   * its own.
   * @param {!./curve.CurveDef|string|undefined} curve
   * @return {!Animation}
   */

  Animation.prototype.setCurve = function setCurve(curve) {
    if (curve) {
      this.curve_ = _curve.getCurve(curve);
    }
    return this;
  };

  /**
   * Adds a segment to the animation. Each segment starts at offset (delay)
   * and runs for a portion of the overall animation (duration). Note that
   * both delay and duration and normtimeDef types which accept values from 0 to 1.
   * Optionally, the time is pushed through a curve. If curve is not specified,
   * the default animation curve will be used. The specified transition is
   * animated over the specified duration from 0 to 1.
   *
   * @param {./time.normtimeDef} delay
   * @param {!./transition.TransitionDef<?>} transition
   * @param {./time.normtimeDef} duration
   * @param {(!./curve.CurveDef|string)=} opt_curve
   * @return {!Animation}
   */

  Animation.prototype.add = function add(delay, transition, duration, opt_curve) {
    this.segments_.push({
      delay: delay,
      func: transition,
      duration: duration,
      curve: _curve.getCurve(opt_curve)
    });
    return this;
  };

  /**
   * Starts the animation and returns the AnimationPlayer object that can be
   * used to monitor and control the animation.
   *
   * @param {./time.timeDef} duration Absolute time in milliseconds.
   * @return {!AnimationPlayer}
   */

  Animation.prototype.start = function start(duration) {
    var player = new AnimationPlayer(this.vsync_, this.contextNode_, this.segments_, this.curve_, duration);
    player.start_();
    return player;
  };

  return Animation;
})();

exports.Animation = Animation;

var AnimationPlayer = (function () {

  /**
   * @param {!./service/vsync-impl.Vsync} vsync
   * @param {!Node} contextNode
   * @param {!Array<!SegmentDef>} segments
   * @param {?./curve.CurveDef} defaultCurve
   * @param {./time.timeDef} duration
   */

  function AnimationPlayer(vsync, contextNode, segments, defaultCurve, duration) {
    var _this = this;

    babelHelpers.classCallCheck(this, AnimationPlayer);

    /** @private @const {!./service/vsync-impl.Vsync} */
    this.vsync_ = vsync;

    /** @private @const {!Node} */
    this.contextNode_ = contextNode;

    /** @private @const {!Array<!SegmentRuntimeDef>} */
    this.segments_ = [];
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      this.segments_.push({
        delay: segment.delay,
        func: segment.func,
        duration: segment.duration,
        curve: segment.curve || defaultCurve,
        started: false,
        completed: false
      });
    }

    /** @private @const */
    this.duration_ = duration;

    /** @private {./time.timeDef} */
    this.startTime_ = 0;

    /** @private {./time.normtimeDef} */
    this.normLinearTime_ = 0;

    /** @private {./time.normtimeDef} */
    this.normTime_ = 0;

    /** @private {boolean} */
    this.running_ = false;

    /** @private {!Object<string, *>} */
    this.state_ = {};

    /** @const {function()} */
    this.resolve_;

    /** @const {function()} */
    this.reject_;

    /** @private {!Promise} */
    this.promise_ = new Promise(function (resolve, reject) {
      _this.resolve_ = resolve;
      _this.reject_ = reject;
    });

    /** @const */
    this.task_ = this.vsync_.createAnimTask(this.contextNode_, {
      mutate: this.stepMutate_.bind(this)
    });
  }

  /**
   * @typedef {{
   *   delay: ./time.normtimeDef,
   *   func: !./transition.TransitionDef,
   *   duration: ./time.normtimeDef,
   *   curve: ?./curve.CurveDef
   * }}
   */

  /**
   * Chains to the animation's promise that will resolve when the animation has
   * completed or will reject if animation has failed or was interrupted.
   * @param {!Function=} opt_resolve
   * @param {!Function=} opt_reject
   * @return {!Promise}
   */

  AnimationPlayer.prototype.then = function then(opt_resolve, opt_reject) {
    if (!opt_resolve && !opt_reject) {
      return this.promise_;
    }
    return this.promise_.then(opt_resolve, opt_reject);
  };

  /**
   * Callback for regardless whether the animation succeeds or fails.
   * @param {!Function=} opt_callback
   * @return {!Promise}
   */

  AnimationPlayer.prototype.thenAlways = function thenAlways(opt_callback) {
    var callback = opt_callback || NOOP_CALLBACK;
    return this.then(callback, callback);
  };

  /**
   * Halts the animation. Depending on the opt_dir value, the following actions
   * can be performed:
   * 0: No action. The state will be as at the moment of halting (default)
   * 1: Final state. Transitionable will be set to state = 1.
   * -1: Reset state. Transitionable will be reset to state = 0.
   * The animation's promise will be rejected since the transition has been
   * interrupted.
   * @param {number=} opt_dir
   */

  AnimationPlayer.prototype.halt = function halt(opt_dir) {
    this.complete_( /* success */false, /* dir */opt_dir || 0);
  };

  /**
   * @private
   */

  AnimationPlayer.prototype.start_ = function start_() {
    this.startTime_ = Date.now();
    this.running_ = true;
    if (this.vsync_.canAnimate(this.contextNode_)) {
      this.task_(this.state_);
    } else {
      _log.dev().warn(TAG_, 'cannot animate');
      this.complete_( /* success */false, /* dir */0);
    }
  };

  /**
   * @param {boolean} success
   * @param {number} dir
   * @private
   */

  AnimationPlayer.prototype.complete_ = function complete_(success, dir) {
    if (!this.running_) {
      return;
    }
    this.running_ = false;
    if (dir != 0) {
      // Sort in the completion order.
      if (this.segments_.length > 1) {
        this.segments_.sort(function (s1, s2) {
          return s1.delay + s1.duration - (s2.delay + s2.duration);
        });
      }
      try {
        if (dir > 0) {
          // Natural order - all set to 1.
          for (var i = 0; i < this.segments_.length; i++) {
            this.segments_[i].func(1, true);
          }
        } else {
          // Reverse order - all set to 0.
          for (var i = this.segments_.length - 1; i >= 0; i--) {
            this.segments_[i].func(0, false);
          }
        }
      } catch (e) {
        _log.dev().error(TAG_, 'completion failed: ' + e, e);
        success = false;
      }
    }
    if (success) {
      this.resolve_();
    } else {
      this.reject_();
    }
  };

  /**
   * @param {!Object<string, *>} unusedState
   * @private
   */

  AnimationPlayer.prototype.stepMutate_ = function stepMutate_(unusedState) {
    if (!this.running_) {
      return;
    }
    var currentTime = Date.now();
    var normLinearTime = Math.min((currentTime - this.startTime_) / this.duration_, 1);

    // Start segments due to be started
    for (var i = 0; i < this.segments_.length; i++) {
      var segment = this.segments_[i];
      if (!segment.started && normLinearTime >= segment.delay) {
        segment.started = true;
      }
    }

    // Execute all pending segments.
    for (var i = 0; i < this.segments_.length; i++) {
      var segment = this.segments_[i];
      if (!segment.started || segment.completed) {
        continue;
      }
      this.mutateSegment_(segment, normLinearTime);
    }

    // Complete or start next cycle.
    if (normLinearTime == 1) {
      this.complete_( /* success */true, /* dir */0);
    } else {
      if (this.vsync_.canAnimate(this.contextNode_)) {
        this.task_(this.state_);
      } else {
        _log.dev().warn(TAG_, 'cancel animation');
        this.complete_( /* success */false, /* dir */0);
      }
    }
  };

  /**
   * @param {!SegmentRuntimeDef} segment
   * @param {number} totalLinearTime
   */

  AnimationPlayer.prototype.mutateSegment_ = function mutateSegment_(segment, totalLinearTime) {
    var normLinearTime = undefined;
    var normTime = undefined;
    if (segment.duration > 0) {
      normLinearTime = Math.min((totalLinearTime - segment.delay) / segment.duration, 1);
      normTime = normLinearTime;
      if (segment.curve && normTime != 1) {
        try {
          normTime = segment.curve(normLinearTime);
        } catch (e) {
          _log.dev().error(TAG_, 'step curve failed: ' + e, e);
          this.complete_( /* success */false, /* dir */0);
          return;
        }
      }
    } else {
      normLinearTime = 1;
      normTime = 1;
    }
    if (normLinearTime == 1) {
      segment.completed = true;
    }
    try {
      segment.func(normTime, segment.completed);
    } catch (e) {
      _log.dev().error(TAG_, 'step mutate failed: ' + e, e);
      this.complete_( /* success */false, /* dir */0);
      return;
    }
  };

  return AnimationPlayer;
})();

var SegmentDef = undefined;

/**
 * @typedef {{
 *   delay: ./time.normtimeDef,
 *   func: !./transition.TransitionDef,
 *   duration: ./time.normtimeDef,
 *   curve: ?./curve.CurveDef,
 *   started: boolean,
 *   completed: boolean
 * }}
 */
var SegmentRuntimeDef = undefined;

},{"./curve":17,"./log":41,"./vsync":99}],13:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _layout = require('./layout');

var _eventHelper = require('./event-helper');

var _preconnect = require('./preconnect');

var _types = require('./types');

var _viewer = require('./viewer');

var _viewport = require('./viewport');

var _vsync = require('./vsync');

/**
 * Base class for all custom element implementations. Instead of inheriting
 * from Element this class has an Element. Among other things this allows
 * switching the element implementation when going from a stub to the full
 * implementation.
 *
 * The base class implements a set of lifecycle methods that are called by
 * the runtime as appropriate. These are mostly based on the custom element
 * lifecycle (See
 * http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
 * and adding AMP style late loading to the mix.
 *
 * The complete lifecycle of custom DOM element is:
 *
 *           ||
 *           || createdCallback
 *           ||
 *           \/
 *    State: <NOT BUILT> <NOT UPGRADED> <NOT ATTACHED>
 *           ||
 *           || upgrade
 *           ||
 *           \/
 *    State: <NOT BUILT> <NOT ATTACHED>
 *           ||
 *           || firstAttachedCallback
 *           ||
 *           \/
 *    State: <NOT BUILT>
 *           ||
 *           || buildCallback
 *           || !getPlaceholder() => createPlaceholderCallback
 *           || preconnectCallback may be called N times after this, but only
 *           || after the doc becomes visible.
 *           || pauseCallback may be called N times after this.
 *           || resumeCallback may be called N times after this.
 *           ||
 *           \/
 *    State: <BUILT>
 *           ||
 *           || layoutCallback        <==
 *           || (firstLayoutCompleted)  ||
 *           ||                         ||
 *           \/                         || isRelayoutNeeded?
 *    State: <LAID OUT>                 ||
 *           ||                         ||
 *           ||                 =========
 *           ||
 *           || viewportCallback
 *           || unlayoutCallback may be called N times after this.
 *           ||
 *           \/
 *    State: <IN VIEWPORT>
 *
 * The preconnectCallback is called when the systems thinks it is good
 * to preconnect to hosts needed by an element. It will never be called
 * before buildCallback and it might be called multiple times including
 * after layoutCallback.
 *
 * The pauseCallback is called when when the document becomes inactive, e.g.
 * when the user swipes away from the document, or when the element is no
 * longer being displayed, e.g. when the carousel slide slides out of view.
 * In these situations, any actively playing media should pause.
 *
 * The resumeCallback is called when when the document becomes active again
 * after becoming inactive, e.g. when the user swipes away from the document
 * and swipes back. In these situations, any paused media may begin playing
 * again, if user interaction is not required.
 * TODO(jridgewell) slide slides into view
 *
 * The createPlaceholderCallback is called if AMP didn't detect a provided
 * placeholder for the element, subclasses can override this to build and
 * return a dynamically created placeholder that AMP would append to the
 * element.
 *
 * The unlayoutCallback is called when the document becomes inactive, e.g.
 * when the user swipes away from the document, or another tab is focused.
 * In these situations, expensive memory and CPU resources should be freed.
 *
 * Additionally whenever the dimensions of an element might have changed
 * AMP remeasures its dimensions and calls `onLayoutMeasure` on the
 * element instance. This can be used to do additional style calculations
 * without triggering style recalculations.
 *
 * For more details, see {@link custom-element.js}.
 *
 * Each method is called exactly once and overriding them in subclasses
 * is optional.
 */

var BaseElement = (function () {
  /** @param {!AmpElement} element */

  function BaseElement(element) {
    babelHelpers.classCallCheck(this, BaseElement);

    /** @public @const */
    this.element = element;
    /*
         \   \  /  \  /   / /   \     |   _  \     |  \ |  | |  | |  \ |  |  /  _____|
     \   \/    \/   / /  ^  \    |  |_)  |    |   \|  | |  | |   \|  | |  |  __
      \            / /  /_\  \   |      /     |  . `  | |  | |  . `  | |  | |_ |
       \    /\    / /  _____  \  |  |\  \----.|  |\   | |  | |  |\   | |  |__| |
        \__/  \__/ /__/     \__\ | _| `._____||__| \__| |__| |__| \__|  \______|
     Any private property for BaseElement should be declared in
    build-system/amp.extern.js, this is so closure compiler doesn't reuse the
    same symbol it would use in the core compilation unit for the private
    property in the extensions compilation unit's private properties.
     */

    /** @package {!Layout} */
    this.layout_ = _layout.Layout.NODISPLAY;

    /** @package {number} */
    this.layoutWidth_ = -1;

    /** @package {boolean} */
    this.inViewport_ = false;

    /** @public @const {!Window}  */
    this.win = element.ownerDocument.defaultView;

    /** @private {!Object<string, function(!./service/action-impl.ActionInvocation)>} */
    this.actionMap_ = this.win.Object.create(null);

    /** @public {!./preconnect.Preconnect} */
    this.preconnect = _preconnect.preconnectFor(this.win);
  }

  /**
  * This is the priority of loading elements (layoutCallback).
  * The lower the number, the higher the priority.
  * The default priority for base elements is 0.
  * @return {number}
  */

  BaseElement.prototype.getPriority = function getPriority() {
    return 0;
  };

  /** @return {!Layout} */

  BaseElement.prototype.getLayout = function getLayout() {
    return this.layout_;
  };

  /**
   * DO NOT CALL. Retained for backward compat during rollout.
   * @public @return {!Window}
   */

  BaseElement.prototype.getWin = function getWin() {
    return this.win;
  };

  /**
   * Returns the associated ampdoc. Only available when `buildCallback` and
   * going forward. It throws an exception before `buildCallback`.
   * @return {!./service/ampdoc-impl.AmpDoc}
   */

  BaseElement.prototype.getAmpDoc = function getAmpDoc() {
    return this.element.getAmpDoc();
  };

  /** @public @return {!./service/vsync-impl.Vsync} */

  BaseElement.prototype.getVsync = function getVsync() {
    return _vsync.vsyncFor(this.win);
  };

  /**
   * Returns the layout width for this element. A `-1` value indicates that the
   * layout is not yet known. A `0` value indicates that the element is not
   * visible.
   * @return {number}
   * @public
   */

  BaseElement.prototype.getLayoutWidth = function getLayoutWidth() {
    return this.layoutWidth_;
  };

  /**
   * Intended to be implemented by subclasses. Tests whether the element
   * supports the specified layout. By default only Layout.NODISPLAY is
   * supported.
   * @param {!Layout} layout
   * @return {boolean}
   * @public
   */

  BaseElement.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return layout == _layout.Layout.NODISPLAY;
  };

  /**
   * Intended to be implemented by subclasses. Tests whether the element
   * requires fixed positioning.
   * @return {boolean}
   * @public
   */

  BaseElement.prototype.isAlwaysFixed = function isAlwaysFixed() {
    return false;
  };

  /**
   * @return {boolean}
   */

  BaseElement.prototype.isInViewport = function isInViewport() {
    return this.inViewport_;
  };

  /**
   * This method is called when the element is added to DOM for the first time
   * and before `buildCallback` to give the element a chance to redirect its
   * implementation to another `BaseElement` implementation. The returned
   * value can be either `null` or `undefined` to indicate that no redirection
   * will take place; `BaseElement` instance to upgrade immediately; or a
   * promise to upgrade with the resolved `BaseElement` instance.
   *
   * Notice that calls to `upgradeCallback` are not recursive. I.e. this
   * callback will not be called on the returned instance again.
   *
   * @return {!BaseElement|!Promise<!BaseElement>|null}
   */

  BaseElement.prototype.upgradeCallback = function upgradeCallback() {
    // Subclasses may override.
    return null;
  };

  /**
   * Called when the element is first created. Note that for element created
   * using createElement this may be before any children are added.
   */

  BaseElement.prototype.createdCallback = function createdCallback() {}
  // Subclasses may override.

  /**
   * Override in subclass to adjust the element when it is being added to the
   * DOM. Could e.g. be used to insert a fallback. Should not typically start
   * loading a resource.
   */
  ;

  BaseElement.prototype.firstAttachedCallback = function firstAttachedCallback() {}
  // Subclasses may override.

  /**
   * Override in subclass if the element needs to rebuilt its DOM content.
   * Until the element has been rebuilt its content are not shown with an only
   * exception of [placeholder] elements. From the moment the element is created
   * and until the building phase is complete it will have "amp-notbuilt" CSS
   * class set on it.
   *
   * This callback is executed early after the element has been attached to DOM.
   */
  ;

  BaseElement.prototype.buildCallback = function buildCallback() {}
  // Subclasses may override.

  /**
   * Called by the framework to give the element a chance to preconnect to
   * hosts and prefetch resources it is likely to need. May be called
   * multiple times because connections can time out.
   * @param {boolean=} opt_onLayout
   */
  ;

  BaseElement.prototype.preconnectCallback = function preconnectCallback(opt_onLayout) {}
  // Subclasses may override.

  /**
   * Override in subclass to adjust the element when it is being removed from
   * the DOM. Could e.g. be used to remove a listener.
   */
  ;

  BaseElement.prototype.detachedCallback = function detachedCallback() {}
  // Subclasses may override.

  /**
   * Sets this element as the owner of the specified element. By setting itself
   * as an owner, the element declares that it will manage the lifecycle of
   * the owned element itself. This element, as an owner, will have to call
   * {@link scheduleLayout}, {@link schedulePreload}, {@link updateInViewport}
   * and similar methods.
   * @param {!Element} element
   */
  ;

  BaseElement.prototype.setAsOwner = function setAsOwner(element) {
    this.element.getResources().setOwner(element, this.element);
  };

  /**
   * Subclasses can override this method to opt-in into being called to
   * prerender when document itself is not yet visible (pre-render mode).
   * @return {boolean}
   */

  BaseElement.prototype.prerenderAllowed = function prerenderAllowed() {
    return false;
  };

  /**
   * Subclasses can override this method to create a dynamic placeholder
   * element and return it to be appended to the element. This will only
   * be called if the element doesn't already have a placeholder.
   * @returns {?Element}
   */

  BaseElement.prototype.createPlaceholderCallback = function createPlaceholderCallback() {
    return null;
  };

  /**
   * Subclasses can override this method to opt-out of rendering the element
   * when it is not currently visible.
   * Returning a boolean allows or prevents rendering outside the viewport at
   * any distance, while returning a positive number allows rendering only when
   * the element is within X viewports of the current viewport. Returning a
   * zero causes the element to only render inside the viewport.
   * @return {boolean|number}
   */

  BaseElement.prototype.renderOutsideViewport = function renderOutsideViewport() {
    return 3;
  };

  /**
   * Subclasses can override this method to opt-in into receiving additional
   * {@link layoutCallback} calls. Note that this method is not consulted for
   * the first layout given that each element must be laid out at least once.
   * @return {boolean}
   */

  BaseElement.prototype.isRelayoutNeeded = function isRelayoutNeeded() {
    return false;
  };

  /**
   * Called when the element should perform layout. At this point the element
   * should load/reload resources associated with it. This method is called
   * by the runtime and cannot be called manually. Returns promise that will
   * complete when loading is considered to be complete.
   *
   * The first layout call is always called. If the subclass is interested in
   * receiving additional callbacks, it has to opt in to do so using
   * {@link isRelayoutNeeded} method.
   *
   * @return {!Promise}
   */

  BaseElement.prototype.layoutCallback = function layoutCallback() {
    return Promise.resolve();
  };

  /**
   * Called to notify the element that the first layout has been successfully
   * completed.
   *
   * The default behavior of this method is to hide the placeholder. However,
   * a subclass may choose to hide placeholder earlier or not hide it at all.
   *
   * @public
   */

  BaseElement.prototype.firstLayoutCompleted = function firstLayoutCompleted() {
    this.togglePlaceholder(false);
  };

  /**
   * Instructs the resource that it has either entered or exited the visible
   * viewport. Intended to be implemented by actual components.
   * @param {boolean} unusedInViewport
   */

  BaseElement.prototype.viewportCallback = function viewportCallback(unusedInViewport) {};

  /**
   * Requests the element to stop its activity when the document goes into
   * inactive state. The scope is up to the actual component. Among other
   * things the active playback of video or audio content must be stopped.
   */

  BaseElement.prototype.pauseCallback = function pauseCallback() {};

  /**
   * Requests the element to resume its activity when the document returns from
   * an inactive state. The scope is up to the actual component. Among other
   * things the active playback of video or audio content may be resumed.
   */

  BaseElement.prototype.resumeCallback = function resumeCallback() {};

  /**
   * Requests the element to unload any expensive resources when the element
   * goes into non-visible state. The scope is up to the actual component.
   * The component must return `true` if it'd like to later receive
   * {@link layoutCallback} in case document becomes active again.
   *
   * @return {boolean}
   */

  BaseElement.prototype.unlayoutCallback = function unlayoutCallback() {
    return false;
  };

  /**
   * Subclasses can override this method to opt-in into calling
   * {@link unlayoutCallback} when paused.
   * @return {boolean}
   */

  BaseElement.prototype.unlayoutOnPause = function unlayoutOnPause() {
    return false;
  };

  /**
   * Instructs the element that its activation is requested based on some
   * user event. Intended to be implemented by actual components.
   * @param {!./service/action-impl.ActionInvocation} unusedInvocation
   */

  BaseElement.prototype.activate = function activate(unusedInvocation) {};

  /**
   * Returns a promise that will resolve or fail based on the element's 'load'
   * and 'error' events. Optionally this method takes a timeout, which will reject
   * the promise if the resource has not loaded by then.
   * @param {T} element
   * @param {number=} opt_timeout
   * @return {!Promise<T>}
   * @template T
   * @final
   */

  BaseElement.prototype.loadPromise = function loadPromise(element, opt_timeout) {
    return _eventHelper.loadPromise(element, opt_timeout);
  };

  /**
   * Registers the action handler for the method with the specified name.
   * @param {string} method
   * @param {function(!./service/action-impl.ActionInvocation)} handler
   * @public
   */

  BaseElement.prototype.registerAction = function registerAction(method, handler) {
    this.actionMap_[method] = handler;
  };

  /**
   * Requests the element to execute the specified method. If method must have
   * been previously registered using {@link registerAction}, otherwise an
   * error is thrown.
   * @param {!./service/action-impl.ActionInvocation} invocation The invocation data.
   * @param {boolean} unusedDeferred Whether the invocation has had to wait any time
   *   for the element to be resolved, upgraded and built.
   * @final
   * @package
   */

  BaseElement.prototype.executeAction = function executeAction(invocation, unusedDeferred) {
    if (invocation.method == 'activate') {
      this.activate(invocation);
    } else {
      var handler = this.actionMap_[invocation.method];
      if (!handler) {
        throw new Error('Method not found: ' + invocation.method);
      }
      handler(invocation);
    }
  };

  /**
   * Returns the maximum DPR available on this device.
   * @return {number}
   */

  BaseElement.prototype.getMaxDpr = function getMaxDpr() {
    return this.element.getResources().getMaxDpr();
  };

  /**
   * Returns the most optimal DPR currently recommended.
   * @return {number}
   */

  BaseElement.prototype.getDpr = function getDpr() {
    return this.element.getResources().getDpr();
  };

  /**
   * Utility method that propagates attributes from this element
   * to the given element.
   * @param  {string|!Array<string>} attributes
   * @param  {!Element} element
   * @public @final
   */

  BaseElement.prototype.propagateAttributes = function propagateAttributes(attributes, element) {
    attributes = _types.isArray(attributes) ? attributes : [attributes];
    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes[i];
      if (!this.element.hasAttribute(attr)) {
        continue;
      }
      element.setAttribute(attr, this.element.getAttribute(attr));
    }
  };

  /**
   * Utility method that forwards the given list of non-bubbling events
   * from the given element to this element as custom events with the same name.
   * @param  {string|!Array<string>} events
   * @param  {!Element} element
   * @public @final
   */

  BaseElement.prototype.forwardEvents = function forwardEvents(events, element) {
    var _this = this;

    events = _types.isArray(events) ? events : [events];

    var _loop = function (i) {
      var name = events[i];
      element.addEventListener(name, function (event) {
        _this.element.dispatchCustomEvent(name, event.data || {});
      });
    };

    for (var i = 0; i < events.length; i++) {
      _loop(i);
    }
  };

  /**
   * Returns an optional placeholder element for this custom element.
   * @return {?Element}
   * @public @final
   */

  BaseElement.prototype.getPlaceholder = function getPlaceholder() {
    return this.element.getPlaceholder();
  };

  /**
   * Hides or shows the placeholder, if available.
   * @param {boolean} state
   * @public @final
   */

  BaseElement.prototype.togglePlaceholder = function togglePlaceholder(state) {
    this.element.togglePlaceholder(state);
  };

  /**
   * Returns an optional fallback element for this custom element.
   * @return {?Element}
   * @public @final
   */

  BaseElement.prototype.getFallback = function getFallback() {
    return this.element.getFallback();
  };

  /**
   * Hides or shows the fallback, if available. This function must only
   * be called inside a mutate context.
   * @param {boolean} state
   * @public @final
   */

  BaseElement.prototype.toggleFallback = function toggleFallback(state) {
    this.element.toggleFallback(state);
  };

  /**
   * Returns an optional overflow element for this custom element.
   * @return {?Element}
   * @public @final
   */

  BaseElement.prototype.getOverflowElement = function getOverflowElement() {
    return this.element.getOverflowElement();
  };

  /**
   * Returns the original nodes of the custom element without any service nodes
   * that could have been added for markup. These nodes can include Text,
   * Comment and other child nodes.
   * @return {!Array<!Node>}
   * @public @final
   */

  BaseElement.prototype.getRealChildNodes = function getRealChildNodes() {
    return this.element.getRealChildNodes();
  };

  /**
   * Returns the original children of the custom element without any service
   * nodes that could have been added for markup.
   * @return {!Array<!Element>}
   * @public @final
   */

  BaseElement.prototype.getRealChildren = function getRealChildren() {
    return this.element.getRealChildren();
  };

  /**
   * Configures the supplied element to have a "fill content" layout. The
   * exact interpretation of "fill content" depends on the element's layout.
   *
   * If `opt_replacedContent` is specified, it indicates whether the "replaced
   * content" styling should be applied. Replaced content is not allowed to
   * have its own paddings or border.
   *
   * @param {!Element} element
   * @param {boolean=} opt_replacedContent
   * @public @final
   */

  BaseElement.prototype.applyFillContent = function applyFillContent(element, opt_replacedContent) {
    element.classList.add('-amp-fill-content');
    if (opt_replacedContent) {
      element.classList.add('-amp-replaced-content');
    }
  };

  /**
   * Returns the viewport within which the element operates.
   * @return {!./service/viewport-impl.Viewport}
   */

  BaseElement.prototype.getViewport = function getViewport() {
    return _viewport.viewportFor(this.win);
  };

  /**
   * Returns a previously measured layout box of the element.
   * @return {!./layout-rect.LayoutRectDef}
   */

  BaseElement.prototype.getIntersectionElementLayoutBox = function getIntersectionElementLayoutBox() {
    return this.element.getResources().getResourceForElement(this.element).getLayoutBox();
  };

  /**
   * Schedule the layout request for the children element or elements
   * specified. Resource manager will perform the actual layout based on the
   * priority of this element and its children.
   * @param {!Element|!Array<!Element>} elements
   * @public
   */

  BaseElement.prototype.scheduleLayout = function scheduleLayout(elements) {
    this.element.getResources().scheduleLayout(this.element, elements);
  };

  /**
   * @param {!Element|!Array<!Element>} elements
   * @public
   */

  BaseElement.prototype.schedulePause = function schedulePause(elements) {
    this.element.getResources().schedulePause(this.element, elements);
  };

  /**
   * @param {!Element|!Array<!Element>} elements
   * @public
   */

  BaseElement.prototype.scheduleResume = function scheduleResume(elements) {
    this.element.getResources().scheduleResume(this.element, elements);
  };

  /**
   * Schedule the preload request for the children element or elements
   * specified. Resource manager will perform the actual preload based on the
   * priority of this element and its children.
   * @param {!Element|!Array<!Element>} elements
   * @public
   */

  BaseElement.prototype.schedulePreload = function schedulePreload(elements) {
    this.element.getResources().schedulePreload(this.element, elements);
  };

  /**
   * @param {!Element|!Array<!Element>} elements
   * @public
   */

  BaseElement.prototype.scheduleUnlayout = function scheduleUnlayout(elements) {
    this.element.getResources(). /*OK*/scheduleUnlayout(this.element, elements);
  };

  /**
   * Update inViewport state of the specified children element or elements.
   * Resource manager will perform the actual changes to the inViewport state
   * based on the state of these elements and their parent subtree.
   * @param {!Element|!Array<!Element>} elements
   * @param {boolean} inLocalViewport
   * @public
   */

  BaseElement.prototype.updateInViewport = function updateInViewport(elements, inLocalViewport) {
    this.element.getResources().updateInViewport(this.element, elements, inLocalViewport);
  };

  /**
   * Requests the runtime to update the height of this element to the specified
   * value. The runtime will schedule this request and attempt to process it
   * as soon as possible.
   * @param {number} newHeight
   * @public
   */

  BaseElement.prototype.changeHeight = function changeHeight(newHeight) {
    this.element.getResources(). /*OK*/changeSize(this.element, newHeight, /* newWidth */undefined);
  };

  /**
   * Return a promise that requests the runtime to update
   * the height of this element to the specified value.
   * The runtime will schedule this request and attempt to process it
   * as soon as possible. However, unlike in {@link changeHeight}, the runtime
   * may refuse to make a change in which case it will show the element's
   * overflow element if provided, which is supposed to provide the reader with
   * the necessary user action. (The overflow element is shown only if the
   * requested height is greater than 0.)
   * The promise is resolved if the height is successfully updated.
   * @param {number} newHeight
   * @return {!Promise}
   * @public
   */

  BaseElement.prototype.attemptChangeHeight = function attemptChangeHeight(newHeight) {
    return this.element.getResources().attemptChangeSize(this.element, newHeight, /* newWidth */undefined);
  };

  /**
   * Return a promise that requests the runtime to update
   * the size of this element to the specified value.
   * The runtime will schedule this request and attempt to process it
   * as soon as possible. However, unlike in {@link changeSize}, the runtime
   * may refuse to make a change in which case it will show the element's
   * overflow element if provided, which is supposed to provide the reader with
   * the necessary user action. (The overflow element is shown only if the
   * requested height is greater than 0.)
   * The promise is resolved if the height is successfully updated.
   * @param {number|undefined} newHeight
   * @param {number|undefined} newWidth
   * @return {!Promise}
   * @public
   */

  BaseElement.prototype.attemptChangeSize = function attemptChangeSize(newHeight, newWidth) {
    return this.element.getResources().attemptChangeSize(this.element, newHeight, newWidth);
  };

  /**
   * Runs the specified mutation on the element and ensures that measures
   * and layouts performed for the affected elements.
   *
   * This method should be called whenever a significant mutations are done
   * on the DOM that could affect layout of elements inside this subtree or
   * its siblings. The top-most affected element should be specified as the
   * first argument to this method and all the mutation work should be done
   * in the mutator callback which is called in the "mutation" vsync phase.
   *
   * @param {function()} mutator
   * @param {Element=} opt_element
   * @return {!Promise}
   */

  BaseElement.prototype.mutateElement = function mutateElement(mutator, opt_element) {
    return this.element.getResources().mutateElement(opt_element || this.element, mutator);
  };

  /**
   * Schedules callback to be complete within the next batch. This call is
   * intended for heavy DOM mutations that typically cause re-layouts.
   * @param {!Function} callback
   */

  BaseElement.prototype.deferMutate = function deferMutate(callback) {
    this.element.getResources().deferMutate(this.element, callback);
  };

  /**
   * Requests full overlay mode from the viewer.
   * @public
   * @deprecated Use `Viewport.enterLightboxMode`.
   * TODO(dvoytenko, #3406): Remove as deprecated.
   */

  BaseElement.prototype.requestFullOverlay = function requestFullOverlay() {
    _viewer.viewerFor(this.win).requestFullOverlay();
  };

  /**
   * Requests to cancel full overlay mode from the viewer.
   * @public
   * @deprecated Use `Viewport.leaveLightboxMode`.
   * TODO(dvoytenko, #3406): Remove as deprecated.
   */

  BaseElement.prototype.cancelFullOverlay = function cancelFullOverlay() {
    _viewer.viewerFor(this.win).cancelFullOverlay();
  };

  /**
   * Collapses the element, setting it to `display: none`, and notifies its
   * owner (if there is one) through {@link collapsedCallback} that the element
   * is no longer visible.
   */

  BaseElement.prototype.collapse = function collapse() {
    this.element.getResources().collapseElement(this.element);
  };

  /**
   * Called every time an owned AmpElement collapses itself.
   * See {@link collapse}.
   * @param {!AmpElement} unusedElement
   */

  BaseElement.prototype.collapsedCallback = function collapsedCallback(unusedElement) {}
  // Subclasses may override.

  /**
   * Called when we just measured the layout rect of this element. Doing
   * more expensive style reads should now be cheap.
   * This may currently not work with extended elements. Please file
   * an issue if that is required.
   * @public
   */
  ;

  BaseElement.prototype.onLayoutMeasure = function onLayoutMeasure() {};

  return BaseElement;
})();

exports.BaseElement = BaseElement;
;

},{"./event-helper":27,"./layout":39,"./preconnect":52,"./types":88,"./viewer":96,"./viewport":97,"./vsync":99}],14:[function(require,module,exports){
exports.__esModule = true;
exports.cidFor = cidFor;
exports.cidForOrNull = cidForOrNull;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Factory for ./service/cid-impl.js
 */

var _elementService = require('./element-service');

/**
 * @param {!Window} window
 * @return {!Promise<!Cid>}
 */

function cidFor(window) {
  return (/** @type {!Promise<!Cid>} */_elementService.getElementService(window, 'cid', 'amp-analytics')
  );
}

;

/**
 * Returns a promise for the CID service or a promise for null if the service
 * is not available on the current page.
 * @param {!Window} window
 * @return {!Promise<?Cid>}
 */

function cidForOrNull(window) {
  return (/** @type {!Promise<?Cid>} */_elementService.getElementServiceIfAvailable(window, 'cid', 'amp-analytics')
  );
}

;

},{"./element-service":24}],15:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Allows for runtime configuration. Internally, the runtime should
 * use the src/config.js module for various constants. We can use the
 * AMP_CONFIG global to translate user-defined configurations to this
 * module.
 * @type {!Object<string, string>}
 */
var env = self.AMP_CONFIG || {};

/** @type {!Object<string, string>} */
var urls = {
  thirdParty: env['thirdPartyUrl'] || 'https://3p.ampproject.net',
  thirdPartyFrameHost: env['thirdPartyFrameHost'] || 'ampproject.net',
  thirdPartyFrameRegex: env['thirdPartyFrameRegex'] || /^d-\d+\.ampproject\.net$/,
  cdn: env['cdnUrl'] || 'https://cdn.ampproject.org',
  errorReporting: env['errorReportingUrl'] || 'https://amp-error-reporting.appspot.com/r'
};
exports.urls = urls;

},{}],16:[function(require,module,exports){
exports.__esModule = true;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Returns the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * Returns the cookie's value or `null`.
 *
 * @param {!Window} win
 * @param {string} name
 * @return {?string}
 */

function getCookie(win, name) {
  var cookieString = tryGetDocumentCookieNoInline(win);
  if (!cookieString) {
    return null;
  }
  var cookies = cookieString.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var eq = cookie.indexOf('=');
    if (eq == -1) {
      continue;
    }
    if (decodeURIComponent(cookie.substring(0, eq).trim()) == name) {
      return decodeURIComponent(cookie.substring(eq + 1).trim());
    }
  }
  return null;
}

/**
 * This method should not be inlined to prevent TryCatch deoptimization.
 * NoInline keyword at the end of function name also prevents Closure compiler
 * from inlining the function.
 * @private
 */
function tryGetDocumentCookieNoInline(win) {
  try {
    return win.document.cookie;
  } catch (e) {
    // Act as if no cookie is available. Exceptions can be thrown when
    // AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
  }
}

/**
 * Sets the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {{highestAvailableDomain:boolean}=} opt_options
 *     - highestAvailableDomain: If true, set the cookie at the widest domain
 *       scope allowed by the browser. E.g. on example.com if we are currently
 *       on www.example.com.
 */

function setCookie(win, name, value, expirationTime, opt_options) {
  if (opt_options && opt_options.highestAvailableDomain) {
    var parts = win.location.hostname.split('.');
    var domain = parts[parts.length - 1];
    for (var i = parts.length - 2; i >= 0; i--) {
      domain = parts[i] + '.' + domain;
      trySetCookie(win, name, value, expirationTime, domain);
      if (getCookie(win, name) == value) {
        return;
      }
    }
  }
  trySetCookie(win, name, value, expirationTime, undefined);
}

/**
 * Attempt to set a cookie with the given params.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {string|undefined} domain
 */
function trySetCookie(win, name, value, expirationTime, domain) {
  // We do not allow setting cookies on the domain that contains both
  // the cdn. and www. hosts.
  if (domain == 'ampproject.org') {
    // Actively delete them.
    value = 'delete';
    expirationTime = 0;
  }
  var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/' + (domain ? '; domain=' + domain : '') + '; expires=' + new Date(expirationTime).toUTCString();
  try {
    win.document.cookie = cookie;
  } catch (ignore) {
    // Do not throw if setting the cookie failed Exceptions can be thrown
    // when AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
  };
}

},{}],17:[function(require,module,exports){
exports.__esModule = true;
exports.bezierCurve = bezierCurve;
exports.getCurve = getCurve;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

// Imported just for the side effect of getting the `types` it exports into
// the type system during compile time.

require('./time');

/**
 * A CurveDef is a function that returns a normtime value (0 to 1) for another
 * normtime value.
 * @typedef {function(./time.normtimeDef): ./time.normtimeDef}
 */
var CurveDef = undefined;

exports.CurveDef = CurveDef;
/**
 * Returns a cubic bezier curve.
 * @param {number} x1 X coordinate of the first control point.
 * @param {number} y1 Y coordinate of the first control point.
 * @param {number} x2 X coordinate of the second control point.
 * @param {number} y2 Y coordinate of the second control point.
 * @return {!CurveDef}
 */

function bezierCurve(x1, y1, x2, y2) {
  var bezier = new Bezier(0, 0, x1, y1, x2, y2, 1, 1);
  return bezier.solveYValueFromXValue.bind(bezier);
}

/**
 * Thanks to
 * https://closure-library.googlecode.com/git-history/docs/local_closure_goog_math_bezier.js.source.html
 */

var Bezier = (function () {

  /**
   * @param {number} x0 X coordinate of the start point.
   * @param {number} y0 Y coordinate of the start point.
   * @param {number} x1 X coordinate of the first control point.
   * @param {number} y1 Y coordinate of the first control point.
   * @param {number} x2 X coordinate of the second control point.
   * @param {number} y2 Y coordinate of the second control point.
   * @param {number} x3 X coordinate of the end point.
   * @param {number} y3 Y coordinate of the end point.
   */

  function Bezier(x0, y0, x1, y1, x2, y2, x3, y3) {
    babelHelpers.classCallCheck(this, Bezier);

    /**
     * X coordinate of the first point.
     * @type {number}
     */
    this.x0 = x0;

    /**
     * Y coordinate of the first point.
     * @type {number}
     */
    this.y0 = y0;

    /**
     * X coordinate of the first control point.
     * @type {number}
     */
    this.x1 = x1;

    /**
     * Y coordinate of the first control point.
     * @type {number}
     */
    this.y1 = y1;

    /**
     * X coordinate of the second control point.
     * @type {number}
     */
    this.x2 = x2;

    /**
     * Y coordinate of the second control point.
     * @type {number}
     */
    this.y2 = y2;

    /**
     * X coordinate of the end point.
     * @type {number}
     */
    this.x3 = x3;

    /**
     * Y coordinate of the end point.
     * @type {number}
     */
    this.y3 = y3;
  }

  /**
   * Computes the y coordinate of a point on the curve given its x coordinate.
   * @param {number} xVal The x coordinate of the point on the curve.
   * @return {number} The y coordinate of the point on the curve.
   */

  Bezier.prototype.solveYValueFromXValue = function solveYValueFromXValue(xVal) {
    return this.getPointY(this.solvePositionFromXValue(xVal));
  };

  /**
   * Computes the position t of a point on the curve given its x coordinate.
   * That is, for an input xVal, finds t s.t. getPointX(t) = xVal.
   * As such, the following should always be true up to some small epsilon:
   * t ~ solvePositionFromXValue(getPointX(t)) for t in [0, 1].
   * @param {number} xVal The x coordinate of the point to find on the curve.
   * @return {number} The position t.
   */

  Bezier.prototype.solvePositionFromXValue = function solvePositionFromXValue(xVal) {
    // Desired precision on the computation.
    var epsilon = 1e-6;

    // Initial estimate of t using linear interpolation.
    var t = (xVal - this.x0) / (this.x3 - this.x0);
    if (t <= 0) {
      return 0;
    } else if (t >= 1) {
      return 1;
    }

    // Try gradient descent to solve for t. If it works, it is very fast.
    var tMin = 0;
    var tMax = 1;
    var value = 0;
    for (var i = 0; i < 8; i++) {
      value = this.getPointX(t);
      var derivative = (this.getPointX(t + epsilon) - value) / epsilon;
      if (Math.abs(value - xVal) < epsilon) {
        return t;
      } else if (Math.abs(derivative) < epsilon) {
        break;
      } else {
        if (value < xVal) {
          tMin = t;
        } else {
          tMax = t;
        }
        t -= (value - xVal) / derivative;
      }
    }

    // If the gradient descent got stuck in a local minimum, e.g. because
    // the derivative was close to 0, use a Dichotomy refinement instead.
    // We limit the number of iterations to 8.
    for (var i = 0; Math.abs(value - xVal) > epsilon && i < 8; i++) {
      if (value < xVal) {
        tMin = t;
        t = (t + tMax) / 2;
      } else {
        tMax = t;
        t = (t + tMin) / 2;
      }
      value = this.getPointX(t);
    }
    return t;
  };

  /**
   * Computes the curve's X coordinate at a point between 0 and 1.
   * @param {number} t The point on the curve to find.
   * @return {number} The computed coordinate.
   */

  Bezier.prototype.getPointX = function getPointX(t) {
    // Special case start and end.
    if (t == 0) {
      return this.x0;
    } else if (t == 1) {
      return this.x3;
    }

    // Step one - from 4 points to 3
    var ix0 = this.lerp(this.x0, this.x1, t);
    var ix1 = this.lerp(this.x1, this.x2, t);
    var ix2 = this.lerp(this.x2, this.x3, t);

    // Step two - from 3 points to 2
    ix0 = this.lerp(ix0, ix1, t);
    ix1 = this.lerp(ix1, ix2, t);

    // Final step - last point
    return this.lerp(ix0, ix1, t);
  };

  /**
   * Computes the curve's Y coordinate at a point between 0 and 1.
   * @param {number} t The point on the curve to find.
   * @return {number} The computed coordinate.
   */

  Bezier.prototype.getPointY = function getPointY(t) {
    // Special case start and end.
    if (t == 0) {
      return this.y0;
    } else if (t == 1) {
      return this.y3;
    }

    // Step one - from 4 points to 3
    var iy0 = this.lerp(this.y0, this.y1, t);
    var iy1 = this.lerp(this.y1, this.y2, t);
    var iy2 = this.lerp(this.y2, this.y3, t);

    // Step two - from 3 points to 2
    iy0 = this.lerp(iy0, iy1, t);
    iy1 = this.lerp(iy1, iy2, t);

    // Final step - last point
    return this.lerp(iy0, iy1, t);
  };

  /**
   * Performs linear interpolation between values a and b. Returns the value
   * between a and b proportional to x (when x is between 0 and 1. When x is
   * outside this range, the return value is a linear extrapolation).
   * @param {number} a A number.
   * @param {number} b A number.
   * @param {number} x The proportion between a and b.
   * @return {number} The interpolated value between a and b.
   */

  Bezier.prototype.lerp = function lerp(a, b, x) {
    return a + x * (b - a);
  };

  return Bezier;
})();

;

/**
 * A collection of common curves.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function
 * @enum {!CurveDef}
 */
var Curves = {
  /**
   * linear
   * @param {number} n
   * @return {number}
   */
  LINEAR: function (n) {
    return n;
  },

  /**
   * ease
   */
  EASE: bezierCurve(0.25, 0.1, 0.25, 1.0),

  /**
   * ease-in: slow out, fast in
   */
  EASE_IN: bezierCurve(0.42, 0.0, 1.0, 1.0),

  /**
   * ease-out: fast out, slow in
   */
  EASE_OUT: bezierCurve(0.0, 0.0, 0.58, 1.0),

  /**
   * ease-in-out
   */
  EASE_IN_OUT: bezierCurve(0.42, 0.0, 0.58, 1.0)
};

exports.Curves = Curves;
/**
 * @const {!Object<string, !CurveDef>}
 */
var NAME_MAP = {
  'linear': Curves.LINEAR,
  'ease': Curves.EASE,
  'ease-in': Curves.EASE_IN,
  'ease-out': Curves.EASE_OUT,
  'ease-in-out': Curves.EASE_IN_OUT
};

/**
 * If the argument is a string, this methods matches an existing curve by name.
 * @param {?CurveDef|string|undefined} curve
 * @return {?CurveDef}
 */

function getCurve(curve) {
  if (!curve) {
    return null;
  }
  if (typeof curve == 'string') {
    // If the curve is a custom cubic-bezier curve
    if (curve.indexOf('cubic-bezier') != -1) {
      var match = curve.match(/cubic-bezier\((.+)\)/);
      if (match) {
        var values = match[1].split(',').map(parseFloat);
        if (values.length == 4) {
          for (var i = 0; i < 4; i++) {
            if (isNaN(values[i])) {
              return null;
            }
          }
          return bezierCurve(values[0], values[1], values[2], values[3]);
        }
      }
      return null;
    }
    return NAME_MAP[curve];
  }
  return curve;
}

},{"./time":85}],18:[function(require,module,exports){
exports.__esModule = true;
exports.upgradeOrRegisterElement = upgradeOrRegisterElement;
exports.stubElements = stubElements;
exports.stubElementIfNotKnown = stubElementIfNotKnown;
exports.copyElementToChildWindow = copyElementToChildWindow;
exports.applyLayout_ = applyLayout_;
exports.createAmpElementProto = createAmpElementProto;
exports.registerElement = registerElement;
exports.registerElementAlias = registerElementAlias;
exports.markElementScheduledForTesting = markElementScheduledForTesting;
exports.resetScheduledElementForTesting = resetScheduledElementForTesting;
exports.getElementClassForTesting = getElementClassForTesting;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _layout = require('./layout');

var _elementStub = require('./element-stub');

var _ampdoc = require('./ampdoc');

var _srcLoader = require('../src/loader');

var _log = require('./log');

var _documentState = require('./document-state');

var _srcIntersectionObserver = require('../src/intersection-observer');

var _mode = require('./mode');

var _sizeList = require('./size-list');

var _error = require('./error');

var _resources = require('./resources');

var _timer = require('./timer');

var _vsync = require('./vsync');

var _dom = require('./dom');

var dom = babelHelpers.interopRequireWildcard(_dom);

var TAG_ = 'CustomElement';

/**
 * This is the minimum width of the element needed to trigger `loading`
 * animation. This value is justified as about 1/3 of a smallish mobile
 * device viewport. Trying to put a loading indicator into a small element
 * is meaningless.
 * @private @const {number}
 */
var MIN_WIDTH_FOR_LOADING_ = 100;

/**
 * The elements positioned ahead of this threshold may have their loading
 * indicator initialized faster. This is benefitial to avoid relayout during
 * render phase or scrolling.
 * @private @const {number}
 */
var PREPARE_LOADING_THRESHOLD_ = 1000;

/**
 * Map from element name to implementation class.
 * @const {Object}
 */
var knownElements = {};

/**
 * Caches whether the template tag is supported to avoid memory allocations.
 * @type {boolean|undefined}
 */
var templateTagSupported = undefined;

/**
 * Whether this platform supports template tags.
 * @return {boolean}
 */
function isTemplateTagSupported() {
  if (templateTagSupported === undefined) {
    var template = self.document.createElement('template');
    templateTagSupported = 'content' in template;
  }
  return templateTagSupported;
}

/**
 * @enum {number}
 */
var UpgradeState = {
  NOT_UPGRADED: 1,
  UPGRADED: 2,
  UPGRADE_FAILED: 3,
  UPGRADE_IN_PROGRESS: 4
};

/**
 * Registers an element. Upgrades it if has previously been stubbed.
 * @param {!Window} win
 * @param {string} name
 * @param {function(!Function)} toClass
 */

function upgradeOrRegisterElement(win, name, toClass) {
  if (!knownElements[name]) {
    registerElement(win, name, /** @type {!Function} */toClass);
    return;
  }
  _log.user().assert(knownElements[name] == _elementStub.ElementStub, '%s is already registered. The script tag for ' + '%s is likely included twice in the page.', name, name);
  knownElements[name] = toClass;
  for (var i = 0; i < _elementStub.stubbedElements.length; i++) {
    var stub = _elementStub.stubbedElements[i];
    // There are 3 possible states here:
    // 1. We never made the stub because the extended impl. loaded first.
    //    In that case the element won't be in the array.
    // 2. We made a stub but the browser didn't attach it yet. In
    //    that case we don't need to upgrade but simply switch to the new
    //    implementation.
    // 3. A stub was attached. We upgrade which means we replay the
    //    implementation.
    var element = stub.element;
    if (element.tagName.toLowerCase() == name) {
      tryUpgradeElementNoInline(element, toClass);
    }
  }
}

/**
 * This method should not be inlined to prevent TryCatch deoptimization.
 * NoInline keyword at the end of function name also prevents Closure compiler
 * from inlining the function.
 * @private
 */
function tryUpgradeElementNoInline(element, toClass) {
  try {
    element.upgrade(toClass);
  } catch (e) {
    _error.reportError(e, this);
  }
}

/**
 * Stub extended elements missing an implementation.
 * @param {!Window} win
 */

function stubElements(win) {
  if (!win.ampExtendedElements) {
    win.ampExtendedElements = {};
    // If amp-ad and amp-embed haven't been registered, manually register them
    // with ElementStub, in case the script to the element is not included.
    if (!knownElements['amp-ad'] && !knownElements['amp-embed']) {
      stubLegacyElements(win);
    }
  }
  var list = win.document.querySelectorAll('[custom-element]');
  for (var i = 0; i < list.length; i++) {
    var _name = list[i].getAttribute('custom-element');
    win.ampExtendedElements[_name] = true;
    if (knownElements[_name]) {
      continue;
    }
    registerElement(win, _name, _elementStub.ElementStub);
  }
  // Repeat stubbing when HEAD is complete.
  if (!win.document.body) {
    var docState = _documentState.documentStateFor(win);
    docState.onBodyAvailable(function () {
      return stubElements(win);
    });
  }
}

/**
 * @param {!Window} win
 */
function stubLegacyElements(win) {
  win.ampExtendedElements['amp-ad'] = true;
  registerElement(win, 'amp-ad', _elementStub.ElementStub);
  win.ampExtendedElements['amp-embed'] = true;
  registerElement(win, 'amp-embed', _elementStub.ElementStub);
}

/**
 * Stub element if not yet known.
 * @param {!Window} win
 * @param {string} name
 */

function stubElementIfNotKnown(win, name) {
  if (knownElements[name]) {
    return;
  }
  if (!win.ampExtendedElements) {
    win.ampExtendedElements = {};
  }
  win.ampExtendedElements[name] = true;
  registerElement(win, name, _elementStub.ElementStub);
}

/**
 * Copies the specified element to child window (friendly iframe). This way
 * all implementations of the AMP elements are shared between all friendly
 * frames.
 * @param {!Window} childWin
 * @param {string} name
 */

function copyElementToChildWindow(childWin, name) {
  if (!childWin.ampExtendedElements) {
    childWin.ampExtendedElements = {};
    stubLegacyElements(childWin);
  }
  childWin.ampExtendedElements[name] = true;
  registerElement(childWin, name, knownElements[name] || _elementStub.ElementStub);
}

/**
 * Applies layout to the element. Visible for testing only.
 * @param {!Element} element
 */

function applyLayout_(element) {
  var layoutAttr = element.getAttribute('layout');
  var widthAttr = element.getAttribute('width');
  var heightAttr = element.getAttribute('height');
  var sizesAttr = element.getAttribute('sizes');
  var heightsAttr = element.getAttribute('heights');

  // Input layout attributes.
  var inputLayout = layoutAttr ? _layout.parseLayout(layoutAttr) : null;
  _log.user().assert(inputLayout !== undefined, 'Unknown layout: %s', layoutAttr);
  var inputWidth = widthAttr && widthAttr != 'auto' ? _layout.parseLength(widthAttr) : widthAttr;
  _log.user().assert(inputWidth !== undefined, 'Invalid width value: %s', widthAttr);
  var inputHeight = heightAttr ? _layout.parseLength(heightAttr) : null;
  _log.user().assert(inputHeight !== undefined, 'Invalid height value: %s', heightAttr);

  // Effective layout attributes. These are effectively constants.
  var width = undefined;
  var height = undefined;
  var layout = undefined;

  // Calculate effective width and height.
  if ((!inputLayout || inputLayout == _layout.Layout.FIXED || inputLayout == _layout.Layout.FIXED_HEIGHT) && (!inputWidth || !inputHeight) && _layout.hasNaturalDimensions(element.tagName)) {
    // Default width and height: handle elements that do not specify a
    // width/height and are defined to have natural browser dimensions.
    var dimensions = _layout.getNaturalDimensions(element);
    width = inputWidth || inputLayout == _layout.Layout.FIXED_HEIGHT ? inputWidth : dimensions.width;
    height = inputHeight || dimensions.height;
  } else {
    width = inputWidth;
    height = inputHeight;
  }

  // Calculate effective layout.
  if (inputLayout) {
    layout = inputLayout;
  } else if (!width && !height) {
    layout = _layout.Layout.CONTAINER;
  } else if (height && (!width || width == 'auto')) {
    layout = _layout.Layout.FIXED_HEIGHT;
  } else if (height && width && (sizesAttr || heightsAttr)) {
    layout = _layout.Layout.RESPONSIVE;
  } else {
    layout = _layout.Layout.FIXED;
  }

  // Verify layout attributes.
  if (layout == _layout.Layout.FIXED || layout == _layout.Layout.FIXED_HEIGHT || layout == _layout.Layout.RESPONSIVE) {
    _log.user().assert(height, 'Expected height to be available: %s', heightAttr);
  }
  if (layout == _layout.Layout.FIXED_HEIGHT) {
    _log.user().assert(!width || width == 'auto', 'Expected width to be either absent or equal "auto" ' + 'for fixed-height layout: %s', widthAttr);
  }
  if (layout == _layout.Layout.FIXED || layout == _layout.Layout.RESPONSIVE) {
    _log.user().assert(width && width != 'auto', 'Expected width to be available and not equal to "auto": %s', widthAttr);
  }
  if (layout == _layout.Layout.RESPONSIVE) {
    _log.user().assert(_layout.getLengthUnits(width) == _layout.getLengthUnits(height), 'Length units should be the same for width and height: %s, %s', widthAttr, heightAttr);
  } else {
    _log.user().assert(heightsAttr === null, 'Unexpected "heights" attribute for none-responsive layout');
  }

  // Apply UI.
  element.classList.add(_layout.getLayoutClass(layout));
  if (_layout.isLayoutSizeDefined(layout)) {
    element.classList.add('-amp-layout-size-defined');
  }
  if (layout == _layout.Layout.NODISPLAY) {
    element.style.display = 'none';
  } else if (layout == _layout.Layout.FIXED) {
    element.style.width = _log.dev().assertString(width);
    element.style.height = _log.dev().assertString(height);
  } else if (layout == _layout.Layout.FIXED_HEIGHT) {
    element.style.height = _log.dev().assertString(height);
  } else if (layout == _layout.Layout.RESPONSIVE) {
    var sizer = element.ownerDocument.createElement('i-amp-sizer');
    sizer.style.display = 'block';
    sizer.style.paddingTop = _layout.getLengthNumeral(height) / _layout.getLengthNumeral(width) * 100 + '%';
    element.insertBefore(sizer, element.firstChild);
    element.sizerElement_ = sizer;
  } else if (layout == _layout.Layout.FILL) {
    // Do nothing.
  } else if (layout == _layout.Layout.CONTAINER) {
      // Do nothing. Elements themselves will check whether the supplied
      // layout value is acceptable. In particular container is only OK
      // sometimes.
    } else if (layout == _layout.Layout.FLEX_ITEM) {
        // Set height and width to a flex item if they exist.
        // The size set to a flex item could be overridden by `display: flex` later.
        if (width) {
          element.style.width = width;
        }
        if (height) {
          element.style.height = height;
        }
      }
  return layout;
}

/**
 * Returns "true" for internal AMP nodes or for placeholder elements.
 * @param {!Node} node
 * @return {boolean}
 */
function isInternalOrServiceNode(node) {
  if (_layout.isInternalElement(node)) {
    return true;
  }
  if (node.tagName && (node.hasAttribute('placeholder') || node.hasAttribute('fallback') || node.hasAttribute('overflow'))) {
    return true;
  }
  return false;
}

/**
 * The interface that is implemented by all custom elements in the AMP
 * namespace.
 * @interface
 */

var AmpElement = function AmpElement() {
  babelHelpers.classCallCheck(this, AmpElement);
};

// TODO(dvoytenko): Add all exposed methods.

/**
 * Creates a new custom element class prototype.
 *
 * Visible for testing only.
 *
 * @param {!Window} win The window in which to register the elements.
 * @param {string} name Name of the custom element
 * @param {function(new:./base-element.BaseElement, !Element)=} opt_implementationClass For
 *     testing only.
 * @return {!Object} Prototype of element.
 */

function createAmpElementProto(win, name, opt_implementationClass) {
  var ElementProto = win.Object.create(createBaseAmpElementProto(win));
  ElementProto.name = name;
  if (_mode.getMode().test && opt_implementationClass) {
    ElementProto.implementationClassForTesting = opt_implementationClass;
  }
  return ElementProto;
}

/**
 * Creates a new custom element class prototype.
 *
 * The prototype is cached per window and meant to be sub classed for a
 * concrete object.
 *
 * @param {!Window} win The window in which to register the elements.
 * @return {!Object} Prototype of element.
 */
function createBaseAmpElementProto(win) {

  if (win.BaseCustomElementProto) {
    return win.BaseCustomElementProto;
  }

  /**
   * @lends {AmpElement.prototype}
   */
  var ElementProto = win.Object.create(win.HTMLElement.prototype);
  win.BaseCustomElementProto = ElementProto;

  /**
   * Called when elements is created. Sets instance vars since there is no
   * constructor.
   * @final @this {!Element}
   */
  ElementProto.createdCallback = function () {
    this.classList.add('-amp-element');

    // Flag "notbuilt" is removed by Resource manager when the resource is
    // considered to be built. See "setBuilt" method.
    /** @private {boolean} */
    this.built_ = false;
    this.classList.add('-amp-notbuilt');
    this.classList.add('amp-notbuilt');

    this.readyState = 'loading';
    this.everAttached = false;

    /**
     * Ampdoc can only be looked up when an element is attached.
     * @private {?./service/ampdoc-impl.AmpDoc}
     */
    this.ampdoc_ = null;

    /**
     * Resources can only be looked up when an element is attached.
     * @private {?./service/resources-impl.Resources}
     */
    this.resources_ = null;

    /** @private {!Layout} */
    this.layout_ = _layout.Layout.NODISPLAY;

    /** @private {number} */
    this.layoutWidth_ = -1;

    /** @private {number} */
    this.layoutCount_ = 0;

    /** @private {boolean} */
    this.isFirstLayoutCompleted_ = true;

    /** @private {boolean} */
    this.isInViewport_ = false;

    /** @private {string|null|undefined} */
    this.mediaQuery_ = undefined;

    /** @private {!./size-list.SizeList|null|undefined} */
    this.sizeList_ = undefined;

    /** @private {!./size-list.SizeList|null|undefined} */
    this.heightsList_ = undefined;

    /**
     * This element can be assigned by the {@link applyLayout_} to a child
     * element that will be used to size this element.
     * @private {?Element}
     */
    this.sizerElement_ = null;

    /** @private {boolean|undefined} */
    this.loadingDisabled_ = undefined;

    /** @private {boolean|undefined} */
    this.loadingState_ = undefined;

    /** @private {?Element} */
    this.loadingContainer_ = null;

    /** @private {?Element} */
    this.loadingElement_ = null;

    /** @private {?Element|undefined} */
    this.overflowElement_ = undefined;

    // `opt_implementationClass` is only used for tests.
    var Ctor = knownElements[this.name];
    if (_mode.getMode().test && this.implementationClassForTesting) {
      Ctor = this.implementationClassForTesting;
    }

    /** @private {!./base-element.BaseElement} */
    this.implementation_ = new Ctor(this);

    /**
     * An element always starts in a unupgraded state until it's added to DOM
     * for the first time in which case it can be upgraded immediately or wait
     * for script download or `upgradeCallback`.
     * @private {!UpgradeState}
     */
    this.upgradeState_ = UpgradeState.NOT_UPGRADED;

    /**
     * Action queue is initially created and kept around until the element
     * is ready to send actions directly to the implementation.
     * @private {?Array<!./service/action-impl.ActionInvocation>}
     */
    this.actionQueue_ = [];

    /**
     * Whether the element is in the template.
     * @private {boolean|undefined}
     */
    this.isInTemplate_ = undefined;
  };

  /**
   * Returns the associated ampdoc. Only available after attachment. It throws
   * exception before the element is attached.
   * @return {!./service/ampdoc-impl.AmpDoc}
   * @final @this {!Element}
   * @package
   */
  ElementProto.getAmpDoc = function () {
    return (/** @type {!./service/ampdoc-impl.AmpDoc} */_log.dev().assert(this.ampdoc_, 'no ampdoc yet, since element is not attached')
    );
  };

  /**
   * Returns Resources manager. Only available after attachment. It throws
   * exception before the element is attached.
   * @return {!./service/resources-impl.Resources}
   * @final @this {!Element}
   * @package
   */
  ElementProto.getResources = function () {
    return (/** @type {!./service/resources-impl.Resources} */_log.dev().assert(this.resources_, 'no resources yet, since element is not attached')
    );
  };

  /**
   * Whether the element has been upgraded yet. Always returns false when
   * the element has not yet been added to DOM. After the element has been
   * added to DOM, the value depends on the `BaseElement` implementation and
   * its `upgradeElement` callback.
   * @return {boolean}
   * @final @this {!Element}
   */
  ElementProto.isUpgraded = function () {
    return this.upgradeState_ == UpgradeState.UPGRADED;
  };

  /**
   * Upgrades the element to the provided new implementation. If element
   * has already been attached, it's layout validation and attachment flows
   * are repeated for the new implementation.
   * @param {function(new:./base-element.BaseElement, !Element)} newImplClass
   * @final @package @this {!Element}
   */
  ElementProto.upgrade = function (newImplClass) {
    if (this.isInTemplate_) {
      return;
    }
    this.tryUpgrade_(new newImplClass(this));
  };

  /**
   * Completes the upgrade of the element with the provided implementation.
   * @param {!./base-element.BaseElement} newImpl
   * @final @private @this {!Element}
   */
  ElementProto.completeUpgrade_ = function (newImpl) {
    this.upgradeState_ = UpgradeState.UPGRADED;
    this.implementation_ = newImpl;
    this.classList.remove('amp-unresolved');
    this.classList.remove('-amp-unresolved');
    this.implementation_.createdCallback();
    if (this.layout_ != _layout.Layout.NODISPLAY && !this.implementation_.isLayoutSupported(this.layout_)) {
      throw new Error('Layout not supported: ' + this.layout_);
    }
    this.implementation_.layout_ = this.layout_;
    this.implementation_.layoutWidth_ = this.layoutWidth_;
    if (this.everAttached) {
      this.implementation_.firstAttachedCallback();
      this.dispatchCustomEventForTesting('amp:attached');
      // For a never-added resource, the build will be done automatically
      // via `resources.add` on the first attach.
      this.getResources().upgraded(this);
    }
  };

  /**
   * Whether the element has been built. A built element had its
   * {@link buildCallback} method successfully invoked.
   * @return {boolean}
   * @final @this {!Element}
   */
  ElementProto.isBuilt = function () {
    return this.built_;
  };

  /**
   * Get the priority to load the element.
   * @return {number} @this {!Element}
   */
  ElementProto.getPriority = function () {
    _log.dev().assert(this.isUpgraded(), 'Cannot get priority of unupgraded element');
    return this.implementation_.getPriority();
  };

  /**
   * Requests or requires the element to be built. The build is done by
   * invoking {@link BaseElement.buildCallback} method.
   *
   * This method can only be called on a upgraded element.
   *
   * @final @this {!Element}
   */
  ElementProto.build = function () {
    assertNotTemplate(this);
    if (this.isBuilt()) {
      return;
    }
    _log.dev().assert(this.isUpgraded(), 'Cannot build unupgraded element');
    try {
      this.implementation_.buildCallback();
      this.preconnect( /* onLayout */false);
      this.built_ = true;
      this.classList.remove('-amp-notbuilt');
      this.classList.remove('amp-notbuilt');
    } catch (e) {
      _error.reportError(e, this);
      throw e;
    }
    if (this.built_ && this.isInViewport_) {
      this.updateInViewport_(true);
    }
    if (this.actionQueue_) {
      if (this.actionQueue_.length > 0) {
        // Only schedule when the queue is not empty, which should be
        // the case 99% of the time.
        _timer.timerFor(this.ownerDocument.defaultView).delay(this.dequeueActions_.bind(this), 1);
      } else {
        this.actionQueue_ = null;
      }
    }
    if (!this.getPlaceholder()) {
      var placeholder = this.createPlaceholder();
      if (placeholder) {
        this.appendChild(placeholder);
      }
    }
  };

  /**
   * Called to instruct the element to preconnect to hosts it uses during
   * layout.
   * @param {boolean} onLayout Whether this was called after a layout.
   * @this {!Element}
   */
  ElementProto.preconnect = function (onLayout) {
    var _this = this;

    if (onLayout) {
      this.implementation_.preconnectCallback(onLayout);
    } else {
      // If we do early preconnects we delay them a bit. This is kind of
      // an unfortunate trade off, but it seems faster, because the DOM
      // operations themselves are not free and might delay
      _timer.timerFor(this.ownerDocument.defaultView).delay(function () {
        _this.implementation_.preconnectCallback(onLayout);
      }, 1);
    }
  };

  /**
   * Whether the custom element declares that it has to be fixed.
   * @return {boolean}
   * @private @this {!Element}
   */
  ElementProto.isAlwaysFixed = function () {
    return this.implementation_.isAlwaysFixed();
  };

  /**
   * Updates the layout box of the element.
   * See {@link BaseElement.getLayoutWidth} for details.
   * @param {!./layout-rect.LayoutRectDef} layoutBox
   * @this {!Element}
   */
  ElementProto.updateLayoutBox = function (layoutBox) {
    var _this2 = this;

    this.layoutWidth_ = layoutBox.width;
    if (this.isUpgraded()) {
      this.implementation_.layoutWidth_ = this.layoutWidth_;
    }
    // TODO(malteubl): Forward for stubbed elements.
    this.implementation_.onLayoutMeasure();

    if (this.isLoadingEnabled_()) {
      if (this.isInViewport_) {
        // Already in viewport - start showing loading.
        this.toggleLoading_(true);
      } else if (layoutBox.top < PREPARE_LOADING_THRESHOLD_ && layoutBox.top >= 0) {
        // Few top elements will also be pre-initialized with a loading
        // element.
        getVsync(this).mutate(function () {
          // Repeat "loading enabled" check because it could have changed while
          // waiting for vsync.
          if (_this2.isLoadingEnabled_()) {
            _this2.prepareLoading_();
          }
        });
      }
    }
  };

  /**
   * If the element has a media attribute, evaluates the value as a media
   * query and based on the result adds or removes the class
   * `-amp-hidden-by-media-query`. The class adds display:none to the element
   * which in turn prevents any of the resource loading to happen for the
   * element.
   *
   * This method is called by Resources and shouldn't be called by anyone else.
   *
   * @final
   * @package @this {!Element}
   */
  ElementProto.applySizesAndMediaQuery = function () {
    assertNotTemplate(this);

    // Media query.
    if (this.mediaQuery_ === undefined) {
      this.mediaQuery_ = this.getAttribute('media') || null;
    }
    if (this.mediaQuery_) {
      this.classList.toggle('-amp-hidden-by-media-query', !this.ownerDocument.defaultView.matchMedia(this.mediaQuery_).matches);
    }

    // Sizes.
    if (this.sizeList_ === undefined) {
      var sizesAttr = this.getAttribute('sizes');
      this.sizeList_ = sizesAttr ? _sizeList.parseSizeList(sizesAttr) : null;
    }
    if (this.sizeList_) {
      this.style.width = this.sizeList_.select(this.ownerDocument.defaultView);
    }
    // Heights.
    if (this.heightsList_ === undefined) {
      var heightsAttr = this.getAttribute('heights');
      this.heightsList_ = heightsAttr ? _sizeList.parseSizeList(heightsAttr, /* allowPercent */true) : null;
    }

    if (this.heightsList_ && this.layout_ === _layout.Layout.RESPONSIVE && this.sizerElement_) {
      this.sizerElement_.style.paddingTop = this.heightsList_.select(this.ownerDocument.defaultView);
    }
  };

  /**
   * Changes the size of the element.
   *
   * This method is called by Resources and shouldn't be called by anyone else.
   * This method must always be called in the mutation context.
   *
   * @param {number|undefined} newHeight
   * @param {number|undefined} newWidth
   * @final
   * @package @this {!Element}
   */
  ElementProto. /*OK*/changeSize = function (newHeight, newWidth) {
    if (this.sizerElement_) {
      // From the moment height is changed the element becomes fully
      // responsible for managing its height. Aspect ratio is no longer
      // preserved.
      this.sizerElement_.style.paddingTop = '0';
    }
    if (newHeight !== undefined) {
      this.style.height = newHeight + 'px';
    }
    if (newWidth !== undefined) {
      this.style.width = newWidth + 'px';
    }
  };

  /**
   * Called when the element is first attached to the DOM. Calls
   * {@link firstAttachedCallback} if this is the first attachment.
   * @final @this {!Element}
   */
  ElementProto.attachedCallback = function () {
    if (!isTemplateTagSupported() && this.isInTemplate_ === undefined) {
      this.isInTemplate_ = !!dom.closestByTag(this, 'template');
    }
    if (this.isInTemplate_) {
      return;
    }
    if (!this.ampdoc_) {
      // Ampdoc can now be initialized.
      var ampdocService = _ampdoc.ampdocServiceFor(this.ownerDocument.defaultView);
      this.ampdoc_ = ampdocService.getAmpDoc(this);
    }
    if (!this.resources_) {
      // Resources can now be initialized since the ampdoc is now available.
      this.resources_ = _resources.resourcesForDoc(this.ampdoc_);
    }
    if (!this.everAttached) {
      if (!isStub(this.implementation_)) {
        this.tryUpgrade_(this.implementation_);
      }
      if (!this.isUpgraded()) {
        this.classList.add('amp-unresolved');
        this.classList.add('-amp-unresolved');
      }
      try {
        this.layout_ = applyLayout_(this);
        if (this.layout_ != _layout.Layout.NODISPLAY && !this.implementation_.isLayoutSupported(this.layout_)) {
          throw new Error('Layout not supported for: ' + this.layout_);
        }
        this.implementation_.layout_ = this.layout_;
        this.implementation_.firstAttachedCallback();
        if (!this.isUpgraded()) {
          // amp:attached is dispatched from the ElementStub class when it
          // replayed the firstAttachedCallback call.
          this.dispatchCustomEventForTesting('amp:stubbed');
        } else {
          this.dispatchCustomEventForTesting('amp:attached');
        }
      } catch (e) {
        _error.reportError(e, this);
      }

      // It's important to have this flag set in the end to avoid
      // `resources.add` called twice if upgrade happens immediately.
      this.everAttached = true;
    }
    this.getResources().add(this);
  };

  /**
   * Try to upgrade the element with the provided implementation.
   * @param {!./base-element.BaseElement=} opt_impl
   * @private @final @this {!Element}
   */
  ElementProto.tryUpgrade_ = function (opt_impl) {
    var _this3 = this;

    var impl = opt_impl || this.implementation_;
    _log.dev().assert(!isStub(impl), 'Implementation must not be a stub');
    if (this.upgradeState_ != UpgradeState.NOT_UPGRADED) {
      // Already upgraded or in progress or failed.
      return;
    }

    // The `upgradeCallback` only allows redirect once for the top-level
    // non-stub class. We may allow nested upgrades later, but they will
    // certainly be bad for performance.
    this.upgradeState_ = UpgradeState.UPGRADE_IN_PROGRESS;
    var res = impl.upgradeCallback();
    if (!res) {
      // Nothing returned: the current object is the upgraded version.
      this.completeUpgrade_(impl);
    } else if (typeof res.then == 'function') {
      // It's a promise: wait until it's done.
      res.then(function (impl) {
        return _this3.completeUpgrade_(impl);
      })['catch'](function (reason) {
        _this3.upgradeState_ = UpgradeState.UPGRADE_FAILED;
        _log.rethrowAsync(reason);
      });
    } else {
      // It's an actual instance: upgrade immediately.
      this.completeUpgrade_( /** @type {!./base-element.BaseElement} */res);
    }
  };

  /**
   * Called when the element is detached from the DOM.
   * @final @this {!Element}
   */
  ElementProto.detachedCallback = function () {
    if (this.isInTemplate_) {
      return;
    }
    this.getResources().remove(this);
    this.implementation_.detachedCallback();
  };

  /**
   * Dispatches a custom event.
   *
   * @param {string} name
   * @param {!Object=} opt_data Event data.
   * @final @this {!Element}
   */
  ElementProto.dispatchCustomEvent = function (name, opt_data) {
    var data = opt_data || {};
    // Constructors of events need to come from the correct window. Sigh.
    var win = this.ownerDocument.defaultView;
    var event = win.document.createEvent('Event');
    event.data = data;
    event.initEvent(name, true, true);
    this.dispatchEvent(event);
  };

  /**
   * Dispatches a custom event only in testing environment.
   *
   * @param {string} name
   * @param {!Object=} opt_data Event data.
   * @final @this {!Element}
   */
  ElementProto.dispatchCustomEventForTesting = function (name, opt_data) {
    if (!_mode.getMode().test) {
      return;
    }
    this.dispatchCustomEvent(name, opt_data);
  };

  /**
   * Whether the element can pre-render.
   * @return {boolean}
   * @final @this {!Element}
   */
  ElementProto.prerenderAllowed = function () {
    return this.implementation_.prerenderAllowed();
  };

  /**
   * Creates a placeholder for the element.
   * @returns {?Element}
   * @final @this {!Element}
   */
  ElementProto.createPlaceholder = function () {
    return this.implementation_.createPlaceholderCallback();
  };

  /**
   * Whether the element should ever render when it is not in viewport.
   * @return {boolean|number}
   * @final @this {!Element}
   */
  ElementProto.renderOutsideViewport = function () {
    return this.implementation_.renderOutsideViewport();
  };

  /**
   * @return {!./layout-rect.LayoutRectDef}
   * @final @this {!Element}
   */
  ElementProto.getLayoutBox = function () {
    return this.getResources().getResourceForElement(this).getLayoutBox();
  };

  /**
   * Returns a change entry for that should be compatible with
   * IntersectionObserverEntry.
   * @return {!IntersectionObserverEntry} A change entry.
   * @final @this {!Element}
   */
  ElementProto.getIntersectionChangeEntry = function () {
    var box = this.implementation_.getIntersectionElementLayoutBox();
    var owner = this.getResources().getResourceForElement(this).getOwner();
    var viewportBox = this.implementation_.getViewport().getRect();
    // TODO(jridgewell, #4826): We may need to make this recursive.
    var ownerBox = owner && owner.getLayoutBox();
    return _srcIntersectionObserver.getIntersectionChangeEntry(box, ownerBox, viewportBox);
  };

  /**
   * The runtime calls this method to determine if {@link layoutCallback}
   * should be called again when layout changes.
   * @return {boolean}
   * @package @final @this {!Element}
   */
  ElementProto.isRelayoutNeeded = function () {
    return this.implementation_.isRelayoutNeeded();
  };

  /**
   * Instructs the element to layout its content and load its resources if
   * necessary by calling the {@link BaseElement.layoutCallback} method that
   * should be implemented by BaseElement subclasses. Must return a promise
   * that will yield when the layout and associated loadings are complete.
   *
   * This method is always called for the first layout, but for subsequent
   * layouts the runtime consults {@link isRelayoutNeeded} method.
   *
   * Can only be called on a upgraded and built element.
   *
   * @return {!Promise}
   * @package @final @this {!Element}
   */
  ElementProto.layoutCallback = function () {
    var _this4 = this;

    assertNotTemplate(this);
    _log.dev().assert(this.isBuilt(), 'Must be built to receive viewport events');
    this.dispatchCustomEventForTesting('amp:load:start');
    var promise = this.implementation_.layoutCallback();
    this.preconnect( /* onLayout */true);
    this.classList.add('-amp-layout');
    return promise.then(function () {
      _this4.readyState = 'complete';
      _this4.layoutCount_++;
      _this4.toggleLoading_(false, /* cleanup */true);
      // Check if this is the first success layout that needs
      // to call firstLayoutCompleted.
      if (_this4.isFirstLayoutCompleted_) {
        _this4.implementation_.firstLayoutCompleted();
        _this4.isFirstLayoutCompleted_ = false;
      }
    }, function (reason) {
      // add layoutCount_ by 1 despite load fails or not
      _this4.layoutCount_++;
      _this4.toggleLoading_(false, /* cleanup */true);
      throw reason;
    });
  };

  /**
   * Instructs the resource that it entered or exited the visible viewport.
   *
   * Can only be called on a upgraded and built element.
   *
   * @param {boolean} inViewport Whether the element has entered or exited
   *   the visible viewport.
   * @final @package @this {!Element}
   */
  ElementProto.viewportCallback = function (inViewport) {
    var _this5 = this;

    assertNotTemplate(this);
    this.isInViewport_ = inViewport;
    if (this.layoutCount_ == 0) {
      if (!inViewport) {
        this.toggleLoading_(false);
      } else {
        // Set a minimum delay in case the element loads very fast or if it
        // leaves the viewport.
        _timer.timerFor(this.ownerDocument.defaultView).delay(function () {
          if (_this5.layoutCount_ == 0 && _this5.isInViewport_) {
            _this5.toggleLoading_(true);
          }
        }, 100);
      }
    }
    if (this.isBuilt()) {
      this.updateInViewport_(inViewport);
    }
  };

  /**
   * @param {boolean} inViewport
   * @private @this {!Element}
   */
  ElementProto.updateInViewport_ = function (inViewport) {
    this.implementation_.inViewport_ = inViewport;
    this.implementation_.viewportCallback(inViewport);
  };

  /**
   * Requests the resource to stop its activity when the document goes into
   * inactive state. The scope is up to the actual component. Among other
   * things the active playback of video or audio content must be stopped.
   *
   * @package @final @this {!Element}
   */
  ElementProto.pauseCallback = function () {
    assertNotTemplate(this);
    if (!this.isBuilt()) {
      return;
    }
    this.implementation_.pauseCallback();
  };

  /**
   * Requests the resource to resume its activity when the document returns from
   * an inactive state. The scope is up to the actual component. Among other
   * things the active playback of video or audio content may be resumed.
   *
   * @package @final @this {!Element}
   */
  ElementProto.resumeCallback = function () {
    assertNotTemplate(this);
    if (!this.isBuilt()) {
      return;
    }
    this.implementation_.resumeCallback();
  };

  /**
   * Requests the element to unload any expensive resources when the element
   * goes into non-visible state. The scope is up to the actual component.
   *
   * Calling this method on unbuilt ot unupgraded element has no effect.
   *
   * @return {boolean}
   * @package @final @this {!Element}
   */
  ElementProto.unlayoutCallback = function () {
    assertNotTemplate(this);
    if (!this.isBuilt()) {
      return false;
    }
    var isReLayoutNeeded = this.implementation_.unlayoutCallback();
    if (isReLayoutNeeded) {
      this.layoutCount_ = 0;
      this.isFirstLayoutCompleted_ = true;
    }
    return isReLayoutNeeded;
  };

  /**
   * Whether to call {@link unlayoutCallback} when pausing the element.
   * Certain elements cannot properly pause (like amp-iframes with unknown
   * video content), and so we must unlayout to stop playback.
   *
   * @return {boolean}
   * @package @final @this {!Element}
   */
  ElementProto.unlayoutOnPause = function () {
    return this.implementation_.unlayoutOnPause();
  };

  /**
   * Collapses the element, and notifies its owner (if there is one) that the
   * element is no longer present.
   */
  ElementProto.collapse = function () {
    this.implementation_. /*OK*/collapse();
  };

  /**
   * Called every time an owned AmpElement collapses itself.
   * @param {!AmpElement} element
   */
  ElementProto.collapsedCallback = function (element) {
    this.implementation_.collapsedCallback(element);
  };

  /**
   * Enqueues the action with the element. If element has been upgraded and
   * built, the action is dispatched to the implementation right away.
   * Otherwise the invocation is enqueued until the implementation is ready
   * to receive actions.
   * @param {!./service/action-impl.ActionInvocation} invocation
   * @final @this {!Element}
   */
  ElementProto.enqueAction = function (invocation) {
    assertNotTemplate(this);
    if (!this.isBuilt()) {
      _log.dev().assert(this.actionQueue_).push(invocation);
    } else {
      this.executionAction_(invocation, false);
    }
  };

  /**
   * Dequeues events from the queue and dispatches them to the implementation
   * with "deferred" flag.
   * @private @this {!Element}
   */
  ElementProto.dequeueActions_ = function () {
    var _this6 = this;

    if (!this.actionQueue_) {
      return;
    }

    var actionQueue = _log.dev().assert(this.actionQueue_);
    this.actionQueue_ = null;

    // TODO(dvoytenko, #1260): dedupe actions.
    actionQueue.forEach(function (invocation) {
      _this6.executionAction_(invocation, true);
    });
  };

  /**
   * Executes the action immediately. All errors are consumed and reported.
   * @param {!./service/action-impl.ActionInvocation} invocation
   * @param {boolean} deferred
   * @final
   * @private @this {!Element}
   */
  ElementProto.executionAction_ = function (invocation, deferred) {
    try {
      this.implementation_.executeAction(invocation, deferred);
    } catch (e) {
      _log.rethrowAsync('Action execution failed:', e, invocation.target.tagName, invocation.method);
    }
  };

  /**
   * Returns the original nodes of the custom element without any service nodes
   * that could have been added for markup. These nodes can include Text,
   * Comment and other child nodes.
   * @return {!Array<!Node>}
   * @package @final @this {!Element}
   */
  ElementProto.getRealChildNodes = function () {
    return dom.childNodes(this, function (node) {
      return !isInternalOrServiceNode(node);
    });
  };

  /**
   * Returns the original children of the custom element without any service
   * nodes that could have been added for markup.
   * @return {!Array<!Element>}
   * @package @final @this {!Element}
   */
  ElementProto.getRealChildren = function () {
    return dom.childElements(this, function (element) {
      return !isInternalOrServiceNode(element);
    });
  };

  /**
   * Returns an optional placeholder element for this custom element.
   * @return {?Element}
   * @package @final @this {!Element}
   */
  ElementProto.getPlaceholder = function () {
    return dom.lastChildElement(this, function (el) {
      return el.hasAttribute('placeholder') &&
      // Blacklist elements that has a native placeholder property
      // like input and textarea. These are not allowed to be AMP
      // placeholders.
      !('placeholder' in el);
    });
  };

  /**
   * Hides or shows the placeholder, if available.
   * @param {boolean} show
   * @package @final @this {!Element}
   */
  ElementProto.togglePlaceholder = function (show) {
    assertNotTemplate(this);
    if (show) {
      var placeholder = this.getPlaceholder();
      if (placeholder) {
        placeholder.classList.remove('amp-hidden');
      }
    } else {
      var placeholders = dom.childElementsByAttr(this, 'placeholder');
      for (var i = 0; i < placeholders.length; i++) {
        placeholders[i].classList.add('amp-hidden');
      }
    }
  };

  /**
   * Returns an optional fallback element for this custom element.
   * @return {?Element}
   * @package @final @this {!Element}
   */
  ElementProto.getFallback = function () {
    return dom.childElementByAttr(this, 'fallback');
  };

  /**
   * Hides or shows the fallback, if available. This function must only
   * be called inside a mutate context.
   * @param {boolean} state
   * @package @final @this {!Element}
   */
  ElementProto.toggleFallback = function (state) {
    assertNotTemplate(this);
    // This implementation is notably less efficient then placeholder toggling.
    // The reasons for this are: (a) "not supported" is the state of the whole
    // element, (b) some realyout is expected and (c) fallback condition would
    // be rare.
    this.classList.toggle('amp-notsupported', state);
    if (state == true) {
      var fallbackElement = this.getFallback();
      if (fallbackElement) {
        this.getResources().scheduleLayout(this, fallbackElement);
      }
    }
  };

  /**
   * Whether the loading can be shown for this element.
   * @return {boolean}
   * @private @this {!Element}
   */
  ElementProto.isLoadingEnabled_ = function () {
    // No loading indicator will be shown if either one of these
    // conditions true:
    // 1. `noloading` attribute is specified;
    // 2. The element has not been whitelisted;
    // 3. The element is too small or has not yet been measured;
    // 4. The element has already been laid out (include having loading error);
    // 5. The element is a `placeholder` or a `fallback`;
    // 6. The element's layout is not a size-defining layout.
    if (this.loadingDisabled_ === undefined) {
      this.loadingDisabled_ = this.hasAttribute('noloading');
    }
    if (this.loadingDisabled_ || !_layout.isLoadingAllowed(this.tagName) || this.layoutWidth_ < MIN_WIDTH_FOR_LOADING_ || this.layoutCount_ > 0 || isInternalOrServiceNode(this) || !_layout.isLayoutSizeDefined(this.layout_)) {
      return false;
    }
    return true;
  };

  /**
   * Creates a loading object. The caller must ensure that loading can
   * actually be shown. This method must also be called in the mutate
   * context.
   * @private @this {!Element}
   */
  ElementProto.prepareLoading_ = function () {
    if (!this.loadingContainer_) {
      var container = win.document.createElement('div');
      container.classList.add('-amp-loading-container');
      container.classList.add('-amp-fill-content');
      container.classList.add('amp-hidden');

      var element = _srcLoader.createLoaderElement(win.document);
      container.appendChild(element);

      this.appendChild(container);
      this.loadingContainer_ = container;
      this.loadingElement_ = element;
    }
  };

  /**
   * Turns the loading indicator on or off.
   * @param {boolean} state
   * @param {boolean=} opt_cleanup
   * @private @final @this {!Element}
   */
  ElementProto.toggleLoading_ = function (state, opt_cleanup) {
    var _this7 = this;

    assertNotTemplate(this);
    this.loadingState_ = state;
    if (!state && !this.loadingContainer_) {
      return;
    }

    // Check if loading should be shown.
    if (state && !this.isLoadingEnabled_()) {
      this.loadingState_ = false;
      return;
    }

    getVsync(this).mutate(function () {
      var state = _this7.loadingState_;
      // Repeat "loading enabled" check because it could have changed while
      // waiting for vsync.
      if (state && !_this7.isLoadingEnabled_()) {
        state = false;
      }
      if (state) {
        _this7.prepareLoading_();
      }
      if (!_this7.loadingContainer_) {
        return;
      }

      _this7.loadingContainer_.classList.toggle('amp-hidden', !state);
      _this7.loadingElement_.classList.toggle('amp-active', state);

      if (!state && opt_cleanup) {
        (function () {
          var loadingContainer = _this7.loadingContainer_;
          _this7.loadingContainer_ = null;
          _this7.loadingElement_ = null;
          _this7.getResources().deferMutate(_this7, function () {
            dom.removeElement(loadingContainer);
          });
        })();
      }
    });
  };

  /**
   * Returns an optional overflow element for this custom element.
   * @return {?Element}
   * @private @this {!Element}
   */
  ElementProto.getOverflowElement = function () {
    if (this.overflowElement_ === undefined) {
      this.overflowElement_ = dom.childElementByAttr(this, 'overflow');
      if (this.overflowElement_) {
        if (!this.overflowElement_.hasAttribute('tabindex')) {
          this.overflowElement_.setAttribute('tabindex', '0');
        }
        if (!this.overflowElement_.hasAttribute('role')) {
          this.overflowElement_.setAttribute('role', 'button');
        }
      }
    }
    return this.overflowElement_;
  };

  /**
   * Hides or shows the overflow, if available. This function must only
   * be called inside a mutate context.
   * @param {boolean} overflown
   * @param {number|undefined} requestedHeight
   * @param {number|undefined} requestedWidth
   * @package @final @this {!Element}
   */
  ElementProto.overflowCallback = function (overflown, requestedHeight, requestedWidth) {
    var _this8 = this;

    this.getOverflowElement();
    if (!this.overflowElement_) {
      if (overflown) {
        _log.user().warn(TAG_, 'Cannot resize element and overflow is not available', this);
      }
    } else {
      this.overflowElement_.classList.toggle('amp-visible', overflown);

      if (overflown) {
        this.overflowElement_.onclick = function () {
          _this8.getResources(). /*OK*/changeSize(_this8, requestedHeight, requestedWidth);
          getVsync(_this8).mutate(function () {
            _this8.overflowCallback(
            /* overflown */false, requestedHeight, requestedWidth);
          });
        };
      } else {
        this.overflowElement_.onclick = null;
      }
    }
  };

  return ElementProto;
}

/**
 * Registers a new custom element with its implementation class.
 * @param {!Window} win The window in which to register the elements.
 * @param {string} name Name of the custom element
 * @param {function(new:./base-element.BaseElement, !Element)} implementationClass
 */

function registerElement(win, name, implementationClass) {
  knownElements[name] = implementationClass;

  win.document.registerElement(name, {
    prototype: createAmpElementProto(win, name)
  });
}

/**
 * Registers a new alias for an existing custom element.
 * @param {!Window} win The window in which to register the elements.
 * @param {string} aliasName Additional name for an existing custom element.
 * @param {string} sourceName Name of an existing custom element
 */

function registerElementAlias(win, aliasName, sourceName) {
  var implementationClass = knownElements[sourceName];

  if (implementationClass) {
    // Update on the knownElements to prevent register again.
    knownElements[aliasName] = implementationClass;
    win.document.registerElement(aliasName, {
      prototype: createAmpElementProto(win, aliasName)
    });
  } else {
    throw new Error('Element name is unknown: ' + sourceName + '.' + ('Alias ' + aliasName + ' was not registered.'));
  }
}

/**
 * In order to provide better error messages we only allow to retrieve
 * services from other elements if those elements are loaded in the page.
 * This makes it possible to mark an element as loaded in a test.
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @visibleForTesting
 */

function markElementScheduledForTesting(win, elementName) {
  if (!win.ampExtendedElements) {
    win.ampExtendedElements = {};
  }
  win.ampExtendedElements[elementName] = true;
}

/**
 * Resets our scheduled elements.
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @visibleForTesting
 */

function resetScheduledElementForTesting(win, elementName) {
  if (win.ampExtendedElements) {
    win.ampExtendedElements[elementName] = null;
  }
  delete knownElements[elementName];
}

/**
 * Returns a currently registered element class.
 * @param {string} elementName Name of an extended custom element.
 * @return {?function()}
 * @visibleForTesting
 */

function getElementClassForTesting(elementName) {
  return knownElements[elementName] || null;
}

/** @param {!Element} element */
function assertNotTemplate(element) {
  _log.dev().assert(!element.isInTemplate_, 'Must never be called in template');
};

/**
 * @param {!Element} element
 * @return {!./service/vsync-impl.Vsync}
 */
function getVsync(element) {
  return _vsync.vsyncFor(element.ownerDocument.defaultView);
};

/**
 * Whether the implementation is a stub.
 * @param {!Object} impl
 * @return {boolean}
 */
function isStub(impl) {
  return impl instanceof _elementStub.ElementStub;
};

},{"../src/intersection-observer":36,"../src/loader":40,"./ampdoc":11,"./document-state":21,"./dom":23,"./element-stub":25,"./error":26,"./layout":39,"./log":41,"./mode":43,"./resources":54,"./size-list":80,"./timer":86,"./vsync":99}],19:[function(require,module,exports){
exports.__esModule = true;
exports.documentInfoForDoc = documentInfoForDoc;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

var _url = require('./url');

var _log = require('./log');

/**
 * Properties:
 *     - url: The doc's url.
 *     - sourceUrl: the source url of an amp document.
 *     - canonicalUrl: The doc's canonical.
 *     - pageViewId: Id for this page view. Low entropy but should be unique
 *       for concurrent page views of a user().
 *
 * @typedef {{
 *   url: string,
 *   sourceUrl: string,
 *   canonicalUrl: string,
 *   pageViewId: string,
 * }}
 */
var DocumentInfoDef = undefined;

exports.DocumentInfoDef = DocumentInfoDef;
/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!DocumentInfoDef} Info about the doc
 */

function documentInfoForDoc(nodeOrDoc) {
  return (/** @type {!DocumentInfoDef} */_service.getServiceForDoc(nodeOrDoc, 'documentInfo', function (ampdoc) {
      var url = ampdoc.getUrl();
      var sourceUrl = _url.getSourceUrl(url);
      var rootNode = ampdoc.getRootNode();
      var canonicalUrl = rootNode && rootNode.AMP && rootNode.AMP.canonicalUrl;
      if (!canonicalUrl) {
        var canonicalTag = _log.user().assert(rootNode.querySelector('link[rel=canonical]'), 'AMP files are required to have a <link rel=canonical> tag.');
        canonicalUrl = _url.parseUrl(canonicalTag.href).href;
      }
      var pageViewId = getPageViewId(ampdoc.win);
      return { url: url, sourceUrl: sourceUrl, canonicalUrl: canonicalUrl, pageViewId: pageViewId };
    })
  );
}

/**
 * Returns a relatively low entropy random string.
 * This should be called once per window and then cached for subsequent
 * access to the same value to be persistent per page.
 * @param {!Window} win
 * @return {string}
 */
function getPageViewId(win) {
  return String(Math.floor(win.Math.random() * 10000));
}

},{"./log":41,"./service":56,"./url":90}],20:[function(require,module,exports){
exports.__esModule = true;
exports.isDocumentReady = isDocumentReady;
exports.onDocumentReady = onDocumentReady;
exports.whenDocumentReady = whenDocumentReady;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Whether the document is ready.
 * @param {!Document} doc
 * @return {boolean}
 */

function isDocumentReady(doc) {
  return doc.readyState != 'loading';
}

/**
 * Calls the callback when document is ready.
 * @param {!Document} doc
 * @param {function(!Document)} callback
 */

function onDocumentReady(doc, callback) {
  var ready = isDocumentReady(doc);
  if (ready) {
    callback(doc);
  } else {
    (function () {
      var readyListener = function () {
        if (isDocumentReady(doc)) {
          if (!ready) {
            ready = true;
            callback(doc);
          }
          doc.removeEventListener('readystatechange', readyListener);
        }
      };
      doc.addEventListener('readystatechange', readyListener);
    })();
  }
}

/**
 * Returns a promise that is resolved when document is ready.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */

function whenDocumentReady(doc) {
  return new Promise(function (resolve) {
    onDocumentReady(doc, resolve);
  });
}

},{}],21:[function(require,module,exports){
exports.__esModule = true;
exports.documentStateFor = documentStateFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _observable = require('./observable');

var _service = require('./service');

var _style = require('./style');

var _dom = require('./dom');

/**
 */

var DocumentState = (function () {
  /**
   * @param {!Window} win
   */

  function DocumentState(win) {
    babelHelpers.classCallCheck(this, DocumentState);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Document} */
    this.document_ = win.document;

    /** @private @const {string|null} */
    this.hiddenProp_ = _style.getVendorJsPropertyName(this.document_, 'hidden', true);
    if (this.document_[this.hiddenProp_] === undefined) {
      this.hiddenProp_ = null;
    }

    /** @private @const {string|null} */
    this.visibilityStateProp_ = _style.getVendorJsPropertyName(this.document_, 'visibilityState', true);
    if (this.document_[this.visibilityStateProp_] === undefined) {
      this.visibilityStateProp_ = null;
    }

    /** @private @const */
    this.visibilityObservable_ = new _observable.Observable();

    /** @private @const {string|null} */
    this.visibilityChangeEvent_ = null;
    if (this.hiddenProp_) {
      this.visibilityChangeEvent_ = 'visibilitychange';
      var vendorStop = this.hiddenProp_.indexOf('Hidden');
      if (vendorStop != -1) {
        this.visibilityChangeEvent_ = this.hiddenProp_.substring(0, vendorStop) + 'Visibilitychange';
      }
    }

    /** @private @const {!Function} */
    this.boundOnVisibilityChanged_ = this.onVisibilityChanged_.bind(this);
    if (this.visibilityChangeEvent_) {
      this.document_.addEventListener(this.visibilityChangeEvent_, this.boundOnVisibilityChanged_);
    }

    /** @private @const {?Observable} */
    this.bodyAvailableObservable_ = null;
  }

  /**
   * @param {!Window} window
   * @return {!DocumentState}
   */

  /** @private */

  DocumentState.prototype.cleanup_ = function cleanup_() {
    if (this.visibilityChangeEvent_) {
      this.document_.removeEventListener(this.visibilityChangeEvent_, this.boundOnVisibilityChanged_);
    }
  };

  /**
   * Returns the value of "document.hidden" property. The reasons why it may
   * not be visible include document in a non-active tab or when the document
   * is being pre-rendered via link with rel="prerender".
   * @return {boolean}
   */

  DocumentState.prototype.isHidden = function isHidden() {
    if (!this.hiddenProp_) {
      return false;
    }
    return this.document_[this.hiddenProp_];
  };

  /**
   * Returns the value of "document.visibilityState" property. Possible values
   * are: 'hidden', 'visible', 'prerender', and 'unloaded'.
   * @return {string}
   */

  DocumentState.prototype.getVisibilityState = function getVisibilityState() {
    if (!this.visibilityStateProp_) {
      return this.isHidden() ? 'hidden' : 'visible';
    }
    return this.document_[this.visibilityStateProp_];
  };

  /**
   * @param {function()} handler
   * @return {!UnlistenDef}
   */

  DocumentState.prototype.onVisibilityChanged = function onVisibilityChanged(handler) {
    return this.visibilityObservable_.add(handler);
  };

  /** @private */

  DocumentState.prototype.onVisibilityChanged_ = function onVisibilityChanged_() {
    this.visibilityObservable_.fire();
  };

  /**
   * If body is already available, callback is called synchronously and null
   * is returned.
   * @param {function()} handler
   * @return {?UnlistenDef}
   */

  DocumentState.prototype.onBodyAvailable = function onBodyAvailable(handler) {
    var doc = this.document_;
    if (doc.body) {
      handler();
      return null;
    }
    if (!this.bodyAvailableObservable_) {
      this.bodyAvailableObservable_ = new _observable.Observable();
      _dom.waitForChild(doc.documentElement, function () {
        return !!doc.body;
      }, this.onBodyAvailable_.bind(this));
    }
    return this.bodyAvailableObservable_.add(handler);
  };

  /** @private */

  DocumentState.prototype.onBodyAvailable_ = function onBodyAvailable_() {
    this.bodyAvailableObservable_.fire();
    this.bodyAvailableObservable_.removeAll();
    this.bodyAvailableObservable_ = null;
  };

  return DocumentState;
})();

exports.DocumentState = DocumentState;

function documentStateFor(window) {
  return _service.fromClass(window, 'documentState', DocumentState);
}

;

},{"./dom":23,"./observable":44,"./service":56,"./style":84}],22:[function(require,module,exports){
exports.__esModule = true;
exports.installGlobalSubmitListener = installGlobalSubmitListener;
exports.onDocumentFormSubmit_ = onDocumentFormSubmit_;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _string = require('./string');

var _log = require('./log');

var _url = require('./url');

var _config = require('./config');

/** @const {string} */
var PROP = '__AMP_SUBMIT';

/**
 * @param {!Window} window
 */

function installGlobalSubmitListener(window) {
  if (!window[PROP]) {
    window[PROP] = true;
    window.document.documentElement.addEventListener('submit', onDocumentFormSubmit_, true);
  }
}

/**
 * Intercept any submit on the current document and prevent invalid submits from
 * going through.
 *
 * @param {!Event} e
 */

function onDocumentFormSubmit_(e) {
  if (e.defaultPrevented) {
    return;
  }

  var form = e.target;
  if (!form || form.tagName != 'FORM') {
    return;
  }

  var inputs = form.elements;
  for (var i = 0; i < inputs.length; i++) {
    _log.user().assert(!inputs[i].name || inputs[i].name != _url.SOURCE_ORIGIN_PARAM, 'Illegal input name, %s found: %s', _url.SOURCE_ORIGIN_PARAM, inputs[i]);
  }

  var action = form.getAttribute('action');
  var actionXhr = form.getAttribute('action-xhr');
  var method = (form.getAttribute('method') || 'GET').toUpperCase();
  if (method == 'GET') {
    _log.user().assert(action, 'form action attribute is required for method=GET: %s', form);
    _url.assertHttpsUrl(action, /** @type {!Element} */form, 'action');
    _log.user().assert(!_string.startsWith(action, _config.urls.cdn), 'form action should not be on AMP CDN: %s', form);
    _url.checkCorsUrl(action);
  } else if (action) {
    e.preventDefault();
    _log.user().assert(false, 'form action attribute is invalid for method=POST: %s', form);
  } else if (!actionXhr) {
    e.preventDefault();
    _log.user().assert(false, 'Only XHR based (via action-xhr attribute) submissions are support ' + 'for POST requests. %s', form);
  }
  _url.checkCorsUrl(actionXhr);

  var target = form.getAttribute('target');
  _log.user().assert(target, 'form target attribute is required: %s', form);
  _log.user().assert(target == '_blank' || target == '_top', 'form target=%s is invalid can only be _blank or _top: %s', target, form);

  // amp-form extension will add novalidate to all forms to manually trigger
  // validation. In that case `novalidate` doesn't have the same meaning.
  var isAmpFormMarked = form.classList.contains('-amp-form');
  var shouldValidate = undefined;
  if (isAmpFormMarked) {
    shouldValidate = !form.hasAttribute('amp-novalidate');
  } else {
    shouldValidate = !form.hasAttribute('novalidate');
  }

  // Safari does not trigger validation check on submission, hence we
  // trigger it manually. In other browsers this would never execute since
  // the submit event wouldn't be fired if the form is invalid.
  // TODO: This doesn't display the validation error messages. Safari makes them
  // available per input.validity object. We need to figure out a way of
  // displaying these.
  if (shouldValidate && form.checkValidity && !form.checkValidity()) {
    e.preventDefault();
    return;
  }
}

},{"./config":15,"./log":41,"./string":82,"./url":90}],23:[function(require,module,exports){
exports.__esModule = true;
exports.waitForChild = waitForChild;
exports.waitForBody = waitForBody;
exports.waitForBodyPromise = waitForBodyPromise;
exports.documentContains = documentContains;
exports.documentContainsPolyfillInternal_ = documentContainsPolyfillInternal_;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.copyChildren = copyChildren;
exports.createElementWithAttributes = createElementWithAttributes;
exports.closest = closest;
exports.closestNode = closestNode;
exports.closestByTag = closestByTag;
exports.elementByTag = elementByTag;
exports.childElement = childElement;
exports.childElements = childElements;
exports.lastChildElement = lastChildElement;
exports.childNodes = childNodes;
exports.setScopeSelectorSupportedForTesting = setScopeSelectorSupportedForTesting;
exports.childElementByAttr = childElementByAttr;
exports.lastChildElementByAttr = lastChildElementByAttr;
exports.childElementsByAttr = childElementsByAttr;
exports.childElementByTag = childElementByTag;
exports.childElementsByTag = childElementsByTag;
exports.getDataParamsFromAttributes = getDataParamsFromAttributes;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
exports.ancestorElements = ancestorElements;
exports.ancestorElementsByTag = ancestorElementsByTag;
exports.openWindowDialog = openWindowDialog;
exports.isJsonScriptTag = isJsonScriptTag;
exports.escapeCssSelectorIdent = escapeCssSelectorIdent;
exports.escapeHtml = escapeHtml;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

var _third_partyCssEscapeCssEscape = require('../third_party/css-escape/css-escape');

var _types = require('./types');

var HTML_ESCAPE_CHARS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
var HTML_ESCAPE_REGEX = /(&|<|>|"|'|`)/g;

/**
 * Waits until the child element is constructed. Once the child is found, the
 * callback is executed.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @param {function()} callback
 */

function waitForChild(parent, checkFunc, callback) {
  if (checkFunc(parent)) {
    callback();
    return;
  }
  var win = parent.ownerDocument.defaultView;
  if (win.MutationObserver) {
    (function () {
      var observer = new win.MutationObserver(function () {
        if (checkFunc(parent)) {
          observer.disconnect();
          callback();
        }
      });
      observer.observe(parent, { childList: true });
    })();
  } else {
    (function () {
      var interval = win.setInterval(function () {
        if (checkFunc(parent)) {
          win.clearInterval(interval);
          callback();
        }
      }, /* milliseconds */5);
    })();
  }
}

/**
 * Waits for document's body to be available.
 * Will be deprecated soon; use {@link AmpDoc#whenBodyAvailable} or
 * @{link DocumentState#onBodyAvailable} instead.
 * @param {!Document} doc
 * @param {function()} callback
 */

function waitForBody(doc, callback) {
  waitForChild(doc.documentElement, function () {
    return !!doc.body;
  }, callback);
}

/**
 * Waits for document's body to be available.
 * @param {!Document} doc
 * @return {!Promise}
 */

function waitForBodyPromise(doc) {
  return new Promise(function (resolve) {
    waitForBody(doc, resolve);
  });
}

/**
 * Whether the element is currently contained in the DOM. Polyfills
 * `document.contains()` method when necessary. Notice that according to spec
 * `document.contains` is inclusionary.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {!Document} doc
 * @param {!Element} element
 * @return {boolean}
 */

function documentContains(doc, element) {
  if (!doc.contains) {
    return documentContainsPolyfillInternal_(doc, element);
  }
  return doc.contains(element);
}

/**
 * Polyfill for `document.contains()` method.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {!Document} doc
 * @param {!Element} element
 * @return {boolean}
 * @private Visible for testing only.
 */

function documentContainsPolyfillInternal_(doc, element) {
  // Per spec, "contains" method is inclusionary
  // i.e. `node.contains(node) == true`. However, we still need to test
  // equality to the document itself.
  return element == doc || doc.documentElement.contains(element);
}

/**
 * Removes the element.
 * @param {!Element} element
 */

function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}

/**
 * Removes all child nodes of the specified element.
 * @param {!Element} parent
 */

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Copies all children nodes of element "from" to element "to". Child nodes
 * are deeply cloned. Notice, that this method should be used with care and
 * preferably on smaller subtrees.
 * @param {!Element} from
 * @param {!Element} to
 */

function copyChildren(from, to) {
  var frag = to.ownerDocument.createDocumentFragment();
  for (var n = from.firstChild; n; n = n.nextSibling) {
    frag.appendChild(n.cloneNode(true));
  }
  to.appendChild(frag);
}

/**
 * Create a new element on document with specified tagName and attributes.
 * @param {!Document} doc
 * @param {string} tagName
 * @param {!Object<string, string>} attributes
 * @return {!Element} created element
 */

function createElementWithAttributes(doc, tagName, attributes) {
  var element = doc.createElement(tagName);
  for (var attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

/**
 * Finds the closest element that satisfies the callback from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function closest(element, callback) {
  for (var el = element; el; el = el.parentElement) {
    if (callback(el)) {
      return el;
    }
  }
  return null;
}

/**
 * Finds the closest node that satisfies the callback from this node
 * up the DOM subtree.
 * @param {!Node} node
 * @param {function(!Node):boolean} callback
 * @return {?Node}
 */

function closestNode(node, callback) {
  for (var n = node; n; n = n.parentNode) {
    if (callback(n)) {
      return n;
    }
  }
  return null;
}

/**
 * Finds the closest element with the specified name from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */

function closestByTag(element, tagName) {
  if (element.closest) {
    return element.closest(tagName);
  }
  tagName = tagName.toUpperCase();
  return closest(element, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Finds the first descendant element with the specified name.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */

function elementByTag(element, tagName) {
  var elements = element.getElementsByTagName(tagName);
  return elements[0] || null;
}

/**
 * Finds the first child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function childElement(parent, callback) {
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      return child;
    }
  }
  return null;
}

/**
 * Finds all child elements that satisfy the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {!Array<!Element>}
 */

function childElements(parent, callback) {
  var children = [];
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Finds the last child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function lastChildElement(parent, callback) {
  for (var child = parent.lastElementChild; child; child = child.previousElementSibling) {
    if (callback(child)) {
      return child;
    }
  }
  return null;
}

/**
 * Finds all child nodes that satisfy the callback.
 * These nodes can include Text, Comment and other child nodes.
 * @param {!Node} parent
 * @param {function(!Node):boolean} callback
 * @return {!Array<!Node>}
 */

function childNodes(parent, callback) {
  var nodes = [];
  for (var child = parent.firstChild; child; child = child.nextSibling) {
    if (callback(child)) {
      nodes.push(child);
    }
  }
  return nodes;
}

/**
 * @type {boolean|undefined}
 * @visibleForTesting
 */
var scopeSelectorSupported = undefined;

/**
 * @param {boolean|undefined} val
 * @visibleForTesting
 */

function setScopeSelectorSupportedForTesting(val) {
  scopeSelectorSupported = val;
}

/**
 * @param {!Element} parent
 * @return {boolean}
 */
function isScopeSelectorSupported(parent) {
  try {
    parent.ownerDocument.querySelector(':scope');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Finds the first child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */

function childElementByAttr(parent, attr) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return parent.querySelector(':scope > [' + attr + ']');
  }
  return childElement(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds the last child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */

function lastChildElementByAttr(parent, attr) {
  return lastChildElement(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds all child elements that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {!Array<!Element>}
 */

function childElementsByAttr(parent, attr) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return _types.toArray(parent.querySelectorAll(':scope > [' + attr + ']'));
  }
  return childElements(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds the first child element that has the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {?Element}
 */

function childElementByTag(parent, tagName) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return parent.querySelector(':scope > ' + tagName);
  }
  tagName = tagName.toUpperCase();
  return childElement(parent, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Finds all child elements with the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {!Array<!Element>}
 */

function childElementsByTag(parent, tagName) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return _types.toArray(parent.querySelectorAll(':scope > ' + tagName));
  }
  tagName = tagName.toUpperCase();
  return childElements(parent, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Returns element data-param- attributes as url parameters key-value pairs.
 * e.g. data-param-some-attr=value -> {someAttr: value}.
 * @param {!Element} element
 * @param {function(string):string=} opt_computeParamNameFunc to compute the parameter
 *    name, get passed the camel-case parameter name.
 * @param {string=} opt_paramPattern Regex pattern to match data attributes.
 * @return {!Object<string, string>}
 */

function getDataParamsFromAttributes(element, opt_computeParamNameFunc, opt_paramPattern) {
  var computeParamNameFunc = opt_computeParamNameFunc || function (key) {
    return key;
  };
  var dataset = element.dataset;
  var params = Object.create(null);
  var paramPattern = opt_paramPattern ? opt_paramPattern : /^param(.+)/;
  for (var key in dataset) {
    var matches = key.match(paramPattern);
    if (matches) {
      var param = matches[1][0].toLowerCase() + matches[1].substr(1);
      params[computeParamNameFunc(param)] = dataset[key];
    }
  }
  return params;
}

/**
 * Whether the element have a next node in the document order.
 * This means either:
 *  a. The element itself has a nextSibling.
 *  b. Any of the element ancestors has a nextSibling.
 * @param {!Element} element
 * @return {boolean}
 */

function hasNextNodeInDocumentOrder(element) {
  var currentElement = element;
  do {
    if (currentElement.nextSibling) {
      return true;
    }
  } while (currentElement = currentElement.parentNode);
  return false;
}

/**
 * Finds all ancestor elements that satisfy predicate.
 * @param {!Element} child
 * @param {function(!Element):boolean} predicate
 * @return {!Array<!Element>}
 */

function ancestorElements(child, predicate) {
  var ancestors = [];
  for (var ancestor = child.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (predicate(ancestor)) {
      ancestors.push(ancestor);
    }
  }
  return ancestors;
}

/**
 * Finds all ancestor elements that has the specified tag name.
 * @param {!Element} child
 * @param {string} tagName
 * @return {!Array<!Element>}
 */

function ancestorElementsByTag(child, tagName) {
  tagName = tagName.toUpperCase();
  return ancestorElements(child, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * This method wraps around window's open method. It first tries to execute
 * `open` call with the provided target and if it fails, it retries the call
 * with the `_top` target. This is necessary given that in some embedding
 * scenarios, such as iOS' WKWebView, navigation to `_blank` and other targets
 * is blocked by default.
 *
 * @param {!Window} win
 * @param {string} url
 * @param {string} target
 * @param {string=} opt_features
 * @return {?Window}
 */

function openWindowDialog(win, url, target, opt_features) {
  // Try first with the specified target. If we're inside the WKWebView or
  // a similar environments, this method is expected to fail by default for
  // all targets except `_top`.
  var res = undefined;
  try {
    res = win.open(url, target, opt_features);
  } catch (e) {
    _log.dev().error('dom', 'Failed to open url on target: ', target, e);
  }

  // Then try with `_top` target.
  if (!res && target != '_top') {
    res = win.open(url, '_top');
  }
  return res;
}

/**
 * Whether the element is a script tag with application/json type.
 * @param {!Element} element
 * @return {boolean}
 */

function isJsonScriptTag(element) {
  return element.tagName == 'SCRIPT' && element.getAttribute('type').toUpperCase() == 'APPLICATION/JSON';
}

/**
 * Escapes an ident (ID or a class name) to be used as a CSS selector.
 *
 * See https://drafts.csswg.org/cssom/#serialize-an-identifier.
 *
 * @param {!Window} win
 * @param {string} ident
 * @return {string}
 */

function escapeCssSelectorIdent(win, ident) {
  if (win.CSS && win.CSS.escape) {
    return win.CSS.escape(ident);
  }
  // Polyfill.
  return _third_partyCssEscapeCssEscape.cssEscape(ident);
}

/**
 * Escapes `<`, `>` and other HTML charcaters with their escaped forms.
 * @param {string} text
 * @return {string}
 */

function escapeHtml(text) {
  if (!text) {
    return text;
  }
  return text.replace(HTML_ESCAPE_REGEX, escapeHtmlChar);
}

/**
 * @param {string} c
 * @return string
 */
function escapeHtmlChar(c) {
  return HTML_ESCAPE_CHARS[c];
}

},{"../third_party/css-escape/css-escape":101,"./log":41,"./types":88}],24:[function(require,module,exports){
exports.__esModule = true;
exports.getElementService = getElementService;
exports.getElementServiceIfAvailable = getElementServiceIfAvailable;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

var _log = require('./log');

var _dom = require('./dom');

var dom = babelHelpers.interopRequireWildcard(_dom);

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * viewportFor(win)) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} providedByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<*>}
 */

function getElementService(win, id, providedByElement) {
  return getElementServiceIfAvailable(win, id, providedByElement).then(function (service) {
    return _log.user().assert(service, 'Service %s was requested to be provided through %s, ' + 'but %s is not loaded in the current page. To fix this ' + 'problem load the JavaScript file for %s in this page.', id, providedByElement, providedByElement, providedByElement);
  });
}

/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} providedByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<*>}
 */

function getElementServiceIfAvailable(win, id, providedByElement) {
  var s = _service.getServicePromiseOrNull(win, id);
  if (s) {
    return s;
  }
  // Microtask is necessary to ensure that window.ampExtendedElements has been
  // initialized.
  return Promise.resolve().then(function () {
    if (isElementScheduled(win, providedByElement)) {
      return _service.getServicePromise(win, id);
    }
    // Wait for HEAD to fully form before denying access to the service.
    return dom.waitForBodyPromise(win.document).then(function () {
      if (isElementScheduled(win, providedByElement)) {
        return _service.getServicePromise(win, id);
      }
      return null;
    });
  });
}

/**
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @return {boolean} Whether this element is scheduled to be loaded.
 */
function isElementScheduled(win, elementName) {
  // Set in custom-element.js
  _log.dev().assert(win.ampExtendedElements, 'win.ampExtendedElements not created yet');
  return !!win.ampExtendedElements[elementName];
}

},{"./dom":23,"./log":41,"./service":56}],25:[function(require,module,exports){
exports.__esModule = true;
exports.resetLoadingCheckForTests = resetLoadingCheckForTests;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _baseElement = require('./base-element');

var _log = require('./log');

var _extensions = require('./extensions');

/** @type {!Array} */
var stubbedElements = [];

exports.stubbedElements = stubbedElements;
/** @type {!Object<string, boolean>} */
var loadingChecked = {};

var ElementStub = (function (_BaseElement) {
  babelHelpers.inherits(ElementStub, _BaseElement);

  function ElementStub(element) {
    babelHelpers.classCallCheck(this, ElementStub);

    _BaseElement.call(this, element);
    // Fetch amp-ad script if it is not present.
    var name = element.tagName.toLowerCase();
    if (!loadingChecked[name]) {
      loadingChecked[name] = true;
      _extensions.extensionsFor(this.win).loadExtension(name, /* stubElement */false);
    }
    stubbedElements.push(this);
  }

  /**
   * @visibleForTesting
   */

  /** @override */

  ElementStub.prototype.getPriority = function getPriority() {
    return _log.dev().assert(0, 'Cannot get priority of stubbed element');
  };

  /** @override */

  ElementStub.prototype.isLayoutSupported = function isLayoutSupported(unusedLayout) {
    // Always returns true and will eventually call this method on the actual
    // element.
    return true;
  };

  return ElementStub;
})(_baseElement.BaseElement);

exports.ElementStub = ElementStub;

function resetLoadingCheckForTests() {
  var keys = Object.keys(loadingChecked);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (loadingChecked.hasOwnProperty(key)) {
      delete loadingChecked[key];
    }
  }
}

},{"./base-element":13,"./extensions":31,"./log":41}],26:[function(require,module,exports){
exports.__esModule = true;
exports.reportError = reportError;
exports.cancellation = cancellation;
exports.installErrorReporting = installErrorReporting;
exports.getErrorReportUrl = getErrorReportUrl;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _mode = require('./mode');

var _exponentialBackoff = require('./exponential-backoff');

var _log = require('./log');

var _styleInstaller = require('./style-installer');

var _config = require('./config');

var CANCELLED = 'CANCELLED';

/**
 * A wrapper around our exponentialBackoff, to lazy initialize it to avoid an
 * un-DCE'able side-effect.
 * @param {function()} work the function to execute after backoff
 * @return {number} the setTimeout id
 */
var globalExponentialBackoff = function (work) {
  // Set globalExponentialBackoff as the lazy-created function. JS Vooodoooo.
  globalExponentialBackoff = _exponentialBackoff.exponentialBackoff(1.5);
  return globalExponentialBackoff(work);
};

/**
 * Reports an error. If the error has an "associatedElement" property
 * the element is marked with the -amp-element-error and displays
 * the message itself. The message is always send to the console.
 * If the error has a "messageArray" property, that array is logged.
 * This way one gets the native fidelity of the console for things like
 * elements instead of stringification.
 * @param {*} error
 * @param {!Element=} opt_associatedElement
 */

function reportError(error, opt_associatedElement) {
  if (!self.console) {
    return;
  }
  if (!error) {
    error = new Error('no error supplied');
  }
  if (error.reported) {
    return;
  }
  error.reported = true;
  var element = opt_associatedElement || error.associatedElement;
  if (element && element.classList) {
    element.classList.add('-amp-error');
    if (_mode.getMode().development) {
      element.classList.add('-amp-element-error');
      element.setAttribute('error-message', error.message);
    }
  }
  if (error.messageArray) {
    (console.error || console.log).apply(console, error.messageArray);
  } else {
    if (element) {
      (console.error || console.log).call(console, element.tagName + '#' + element.id, error.message);
    } else {
      (console.error || console.log).call(console, error.message);
    }
    if (!_mode.getMode().minified) {
      (console.error || console.log).call(console, error.stack);
    }
  }
  if (element && element.dispatchCustomEventForTesting) {
    element.dispatchCustomEventForTesting('amp:error', error.message);
  }
  // 'call' to make linter happy. And .call to make compiler happy
  // that expects some @this.
  reportErrorToServer['call'](undefined, undefined, undefined, undefined, undefined, error);
}

/**
 * Returns an error for a cancellation of a promise.
 * @return {!Error}
 */

function cancellation() {
  return new Error(CANCELLED);
}

/**
 * Install handling of global unhandled exceptions.
 * @param {!Window} win
 */

function installErrorReporting(win) {
  win.onerror = /** @type {!Function} */reportErrorToServer;
  win.addEventListener('unhandledrejection', function (event) {
    reportError(event.reason || new Error('rejected promise ' + event));
  });
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {*|undefined} error
 * @this {!Window|undefined}
 */
function reportErrorToServer(message, filename, line, col, error) {
  // Make an attempt to unhide the body.
  if (this && this.document) {
    _styleInstaller.makeBodyVisible(this.document);
  }
  if (_mode.getMode().localDev || _mode.getMode().development || _mode.getMode().test) {
    return;
  }
  var url = getErrorReportUrl(message, filename, line, col, error);
  globalExponentialBackoff(function () {
    if (url) {
      new Image().src = url;
    }
  });
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {*|undefined} error
 * @return {string|undefined} The URL
 * visibleForTesting
 */

function getErrorReportUrl(message, filename, line, col, error) {
  message = error && error.message ? error.message : message;
  if (/_reported_/.test(message)) {
    return;
  }
  if (message == CANCELLED) {
    return;
  }
  if (!message) {
    message = 'Unknown error';
  }

  // This is the App Engine app in
  // ../tools/errortracker
  // It stores error reports via https://cloud.google.com/error-reporting/
  // for analyzing production issues.
  var url = _config.urls.errorReporting + '?v=' + encodeURIComponent('1473975717617') + '&m=' + encodeURIComponent(message.replace(_log.USER_ERROR_SENTINEL, '')) + '&a=' + (_log.isUserErrorMessage(message) ? 1 : 0);
  if (self.context && self.context.location) {
    url += '&3p=1';
  }
  if (self.AMP_CONFIG && self.AMP_CONFIG.canary) {
    url += '&ca=1';
  }
  if (self.location.ancestorOrigins && self.location.ancestorOrigins[0]) {
    url += '&or=' + encodeURIComponent(self.location.ancestorOrigins[0]);
  }
  if (self.viewerState) {
    url += '&vs=' + encodeURIComponent(self.viewerState);
  }
  // Is embedded?
  if (self.parent && self.parent != self) {
    url += '&iem=1';
  }

  if (self.AMP.viewer) {
    var resolvedViewerUrl = self.AMP.viewer.getResolvedViewerUrl();
    var messagingOrigin = self.AMP.viewer.maybeGetMessagingOrigin();
    if (resolvedViewerUrl) {
      url += '&rvu=' + encodeURIComponent(resolvedViewerUrl);
    }
    if (messagingOrigin) {
      url += '&mso=' + encodeURIComponent(messagingOrigin);
    }
  }

  if (error) {
    var tagName = error && error.associatedElement ? error.associatedElement.tagName : 'u'; // Unknown
    url += '&el=' + encodeURIComponent(tagName) + '&s=' + encodeURIComponent(error.stack || '');
    error.message += ' _reported_';
  } else {
    url += '&f=' + encodeURIComponent(filename || '') + '&l=' + encodeURIComponent(line || '') + '&c=' + encodeURIComponent(col || '');
  }
  url += '&r=' + encodeURIComponent(self.document.referrer);

  // Shorten URLs to a value all browsers will send.
  return url.substr(0, 2000);
}

},{"./config":15,"./exponential-backoff":29,"./log":41,"./mode":43,"./style-installer":83}],27:[function(require,module,exports){
exports.__esModule = true;
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.listenOncePromise = listenOncePromise;
exports.isLoaded = isLoaded;
exports.loadPromise = loadPromise;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _timer = require('./timer');

var _log = require('./log');

/**
 * Listens for the specified event on the element.
 * @param {?EventTarget} element
 * @param {string} eventType
 * @param {?function(Event)} listener
 * @param {boolean=} opt_capture
 * @return {!UnlistenDef}
 */

function listen(element, eventType, listener, opt_capture) {
  var capture = opt_capture || false;
  element.addEventListener(eventType, listener, capture);
  return function () {
    if (element) {
      element.removeEventListener(eventType, listener, capture);
    }
    listener = null;
    element = null;
  };
}

/**
 * Listens for the specified event on the element and removes the listener
 * as soon as event has been received.
 * @param {?EventTarget} element
 * @param {string} eventType
 * @param {?function(Event)} listener
 * @param {boolean=} opt_capture
 * @return {!UnlistenDef}
 */

function listenOnce(element, eventType, listener, opt_capture) {
  var capture = opt_capture || false;
  var unlisten = undefined;
  var proxy = function (event) {
    listener(event);
    unlisten();
  };
  unlisten = function () {
    if (element) {
      element.removeEventListener(eventType, proxy, capture);
    }
    element = null;
    proxy = null;
    listener = null;
  };
  element.addEventListener(eventType, proxy, capture);
  return unlisten;
}

/**
 * Returns  a promise that will resolve as soon as the specified event has
 * fired on the element. Optionally, opt_timeout can be specified that will
 * reject the promise if the event has not fired by then.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {boolean=} opt_capture
 * @param {number=} opt_timeout
 * @return {!Promise<!Event>}
 */

function listenOncePromise(element, eventType, opt_capture, opt_timeout) {
  var unlisten = undefined;
  var eventPromise = new Promise(function (resolve, unusedReject) {
    unlisten = listenOnce(element, eventType, resolve, opt_capture);
  });
  return racePromise_(eventPromise, unlisten, undefined, opt_timeout);
}

/**
 * Whether the specified element has been loaded already.
 * @param {!Element} element
 * @return {boolean}
 */

function isLoaded(element) {
  return element.complete || element.readyState == 'complete';
}

/**
 * Returns a promise that will resolve or fail based on the element's 'load'
 * and 'error' events. Optionally this method takes a timeout, which will reject
 * the promise if the resource has not loaded by then.
 * @param {T} element
 * @param {number=} opt_timeout
 * @return {!Promise<T>}
 * @template T
 */

function loadPromise(element, opt_timeout) {
  var unlistenLoad = undefined;
  var unlistenError = undefined;
  if (isLoaded(element)) {
    return Promise.resolve(element);
  }
  var loadingPromise = new Promise(function (resolve, reject) {
    // Listen once since IE 5/6/7 fire the onload event continuously for
    // animated GIFs.
    if (element.tagName === 'AUDIO' || element.tagName === 'VIDEO') {
      unlistenLoad = listenOnce(element, 'loadstart', resolve);
    } else {
      unlistenLoad = listenOnce(element, 'load', resolve);
    }
    unlistenError = listenOnce(element, 'error', reject);
  });
  loadingPromise = loadingPromise.then(function () {
    return element;
  }, failedToLoad);
  return racePromise_(loadingPromise, unlistenLoad, unlistenError, opt_timeout);
}

/**
 * Emit error on load failure.
 * @param {*} event
 */
function failedToLoad(event) {
  // Report failed loads as user errors so that they automatically go
  // into the "document error" bucket.
  var target = event.target;
  if (target && target.src) {
    target = target.src;
  }
  throw _log.user().createError('Failed to load:', target);
}

/**
 * @param {!Promise<TYPE>} promise
 * @param {UnlistenDef|undefined} unlisten1
 * @param {UnlistenDef|undefined} unlisten2
 * @param {number|undefined} timeout
 * @return {!Promise<TYPE>}
 * @template TYPE
 */
function racePromise_(promise, unlisten1, unlisten2, timeout) {
  var racePromise = undefined;
  if (timeout === undefined) {
    // Timeout is not specified: return promise.
    racePromise = promise;
  } else {
    // Timeout has been specified: add a timeout condition.
    racePromise = _timer.timerFor(self).timeoutPromise(timeout || 0, promise);
  }
  if (unlisten1) {
    racePromise.then(unlisten1, unlisten1);
  }
  if (unlisten2) {
    racePromise.then(unlisten2, unlisten2);
  }
  return racePromise;
}

},{"./log":41,"./timer":86}],28:[function(require,module,exports){
exports.__esModule = true;
exports.isDevChannel = isDevChannel;
exports.isDevChannelVersionDoNotUse_ = isDevChannelVersionDoNotUse_;
exports.isExperimentOn = isExperimentOn;
exports.toggleExperiment = toggleExperiment;
exports.resetExperimentToggles_ = resetExperimentToggles_;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Experiments system allows a developer to opt-in to test
 * features that are not yet fully tested.
 *
 * Experiments page: https://cdn.ampproject.org/experiments.html *
 */

var _cookies = require('./cookies');

/** @const {string} */
var COOKIE_NAME = 'AMP_EXP';

/** @const {number} */
var COOKIE_MAX_AGE_DAYS = 180; // 6 month

/** @const {time} */
var COOKIE_EXPIRATION_INTERVAL = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/** @const {string} */
var CANARY_EXPERIMENT_ID = 'dev-channel';

/** @type {Object<string, boolean>|undefined} */
var toggles_ = undefined;

/**
 * A wrapper to avoid a static side-effect.
 * @return {!Object<string, boolean>}
 */
function experimentToggles() {
  return toggles_ || (toggles_ = Object.create(null));
}

/**
 * Whether the scripts come from a dev channel.
 * @param {!Window} win
 * @return {boolean}
 */

function isDevChannel(win) {
  if (isExperimentOn(win, CANARY_EXPERIMENT_ID)) {
    return true;
  }
  if (isDevChannelVersionDoNotUse_(win)) {
    return true;
  }
  return false;
}

/**
 * Whether the version corresponds to the dev-channel binary.
 * @param {!Window} win
 * @return {boolean}
 * @private Visible for testing only!
 */

function isDevChannelVersionDoNotUse_(win) {
  return !!win.AMP_CONFIG && win.AMP_CONFIG.canary;
}

/**
 * Whether the specified experiment is on or off.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */

function isExperimentOn(win, experimentId) {
  var toggles = experimentToggles();
  if (experimentId in toggles) {
    return toggles[experimentId];
  }
  return toggles[experimentId] = calcExperimentOn(win, experimentId);
}

/**
 * Calculate whether the specified experiment is on or off based off of the
 * cookieFlag or the global config frequency given.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */
function calcExperimentOn(win, experimentId) {
  var cookieFlag = getExperimentIds(win).indexOf(experimentId) != -1;
  if (cookieFlag) {
    return true;
  }

  if (win.AMP_CONFIG && win.AMP_CONFIG.hasOwnProperty(experimentId)) {
    var frequency = win.AMP_CONFIG[experimentId];
    return Math.random() < frequency;
  }
  return false;
}

/**
 * Toggles the experiment on or off. Returns the actual value of the experiment
 * after toggling is done.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean=} opt_on
 * @param {boolean=} opt_transientExperiment  Whether to toggle the
 *     experiment state "transiently" (i.e., for this page load only) or
 *     durably (by saving the experiment IDs to the cookie after toggling).
 *     Default: false (save durably).
 * @return {boolean} New state for experimentId.
 */

function toggleExperiment(win, experimentId, opt_on, opt_transientExperiment) {
  var toggles = experimentToggles();
  var experimentIds = getExperimentIds(win);
  var currentlyOn = experimentIds.indexOf(experimentId) != -1 || experimentId in toggles && toggles[experimentId];
  var on = opt_on !== undefined ? opt_on : !currentlyOn;
  if (on != currentlyOn) {
    if (on) {
      experimentIds.push(experimentId);
      toggles[experimentId] = true;
    } else {
      experimentIds.splice(experimentIds.indexOf(experimentId), 1);
      toggles[experimentId] = false;
    }
    if (!opt_transientExperiment) {
      saveExperimentIds(win, experimentIds);
    }
  }
  return on;
}

/**
 * Returns a set of experiment IDs currently on.
 * @param {!Window} win
 * @return {!Array<string>}
 */
function getExperimentIds(win) {
  if (win._experimentCookie) {
    return win._experimentCookie;
  }
  var experimentCookie = _cookies.getCookie(win, COOKIE_NAME);
  return win._experimentCookie = experimentCookie ? experimentCookie.split(/\s*,\s*/g) : [];
}

/**
 * Saves a set of experiment IDs currently on.
 * @param {!Window} win
 * @param {!Array<string>} experimentIds
 */
function saveExperimentIds(win, experimentIds) {
  win._experimentCookie = null;
  _cookies.setCookie(win, COOKIE_NAME, experimentIds.join(','), Date.now() + COOKIE_EXPIRATION_INTERVAL);
}

/**
 * Resets the experimentsToggle cache for testing purposes.
 * @visibleForTesting
 */

function resetExperimentToggles_() {
  toggles_ = undefined;
}

},{"./cookies":16}],29:[function(require,module,exports){
exports.__esModule = true;
exports.exponentialBackoff = exponentialBackoff;
exports.exponentialBackoffClock = exponentialBackoffClock;
exports.getJitter = getJitter;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @param {number=} opt_base Exponential base. Defaults to 2.
 * @return {function(function()): number} Function that when invoked will
 *     call the passed in function. On every invocation the next
 *     invocation of the passed in function will be exponentially
 *     later. Returned function returns timeout id.
 */

function exponentialBackoff(opt_base) {
  var getTimeout = exponentialBackoffClock(opt_base);
  return function (work) {
    return setTimeout(work, getTimeout());
  };
}

/**
 * @param {number=} opt_base Exponential base. Defaults to 2.
 * @return {function(): number} Function that when invoked will return
 *    a number that exponentially grows per invocation.
 */

function exponentialBackoffClock(opt_base) {
  var base = opt_base || 2;
  var count = 0;
  return function () {
    var wait = Math.pow(base, count++);
    wait += getJitter(wait);
    return wait * 1000;
  };
}

/**
 * Add jitter to avoid the thundering herd. This can e.g. happen when
 * we poll a backend and it fails for everyone at the same time.
 * We add up to 30% (default) longer or shorter than the given time.
 *
 * @param {number} wait the amount if base milliseconds
 * @param {number=} opt_perc the min/max percentage to add or sutract
 * @return {number}
 */

function getJitter(wait, opt_perc) {
  opt_perc = opt_perc || .3;
  var jitter = wait * opt_perc * Math.random();
  if (Math.random() > .5) {
    jitter *= -1;
  }
  return jitter;
}

},{}],30:[function(require,module,exports){
exports.__esModule = true;
exports.registerExtendedElement = registerExtendedElement;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _customElement = require('./custom-element');

/**
 * Registers an extended element. This function should typically be called
 * through the registerElement method on the AMP runtime.
 * @param {!Window} win
 * @param {string} name
 * @param {!Function} implementationClass
 * @package
 */

function registerExtendedElement(win, name, implementationClass) {
  _customElement.upgradeOrRegisterElement(win, name, implementationClass);
}

},{"./custom-element":18}],31:[function(require,module,exports){
exports.__esModule = true;
exports.extensionsFor = extensionsFor;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/extensions-impl.Extensions}
 */

function extensionsFor(window) {
  return (/** @type {!./service/extensions-impl.Extensions} */_service.getExistingServiceForWindow(window, 'extensions')
  );
}

;

},{"./service":56}],32:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

/**
 * @template STATE
 */

var FiniteStateMachine = (function () {

  /**
   * Constructs a FSM using the bits defined in initialState as changeable
   * states.
   * @param {!STATE} initialState
   */

  function FiniteStateMachine(initialState) {
    babelHelpers.classCallCheck(this, FiniteStateMachine);

    /**
     * The current state of the FSM
     * @type {!STATE}
     */
    this.state_ = initialState;

    /**
     * Callbacks that are invoked when transitioning from an old state
     * to the new.
     * @type {Object<string, function()>}
     */
    this.transitions_ = Object.create(null);
  }

  /**
   * Adds a transition callback that will be called when the oldState
   * transitions to the newState.
   * @param {!STATE} oldState
   * @param {!STATE} newState
   * @param {function()} callback
   */

  FiniteStateMachine.prototype.addTransition = function addTransition(oldState, newState, callback) {
    var transition = this.statesToTransition_(oldState, newState);
    _log.dev().assert(!this.transitions_[transition], 'cannot define a duplicate transition callback');
    this.transitions_[transition] = callback;
  };

  /**
   * Transitions to the newState and invokes the registered transition
   * callback, if one is defined.
   * @param {!STATE} newState
   */

  FiniteStateMachine.prototype.setState = function setState(newState) {
    var oldState = this.state_;
    this.state_ = newState;

    var transition = this.statesToTransition_(oldState, newState);
    var callback = this.transitions_[transition];

    if (callback) {
      callback();
    }
  };

  /**
   * Transforms the state transition into a key which identifies a callback.
   * @private
   * @param {!STATE} oldState
   * @param {!STATE} newState
   * @return {string}
   */

  FiniteStateMachine.prototype.statesToTransition_ = function statesToTransition_(oldState, newState) {
    return oldState + '|' + newState;
  };

  return FiniteStateMachine;
})();

exports.FiniteStateMachine = FiniteStateMachine;

},{"./log":41}],33:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _observable = require('./observable');

var _timer = require('./timer');

var _log = require('./log');

/**
 * FocusHistory keeps track of recent focused elements. This history can be
 * purged using `purgeBefore` method.
 */

var FocusHistory = (function () {
  /**
   * @param {!Window} win
   * @param {number} purgeTimeout
   */

  function FocusHistory(win, purgeTimeout) {
    var _this = this;

    babelHelpers.classCallCheck(this, FocusHistory);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {number} */
    this.purgeTimeout_ = purgeTimeout;

    /** @private @const {!Array<!{el: !Element, time: time}>} */
    this.history_ = [];

    /** @private @const {!Observable<!Element>} */
    this.observeFocus_ = new _observable.Observable();

    /** @private @const {function(!Event)} */
    this.captureFocus_ = function (e) {
      if (e.target) {
        _this.pushFocus_(_log.dev().assertElement(e.target));
      }
    };
    /** @private @const {function(!Event)} */
    this.captureBlur_ = function (unusedE) {
      // IFrame elements do not receive `focus` event. An alternative way is
      // implemented here. We wait for a blur to arrive on the main window
      // and after a short time check which element is active.
      _timer.timerFor(win).delay(function () {
        _this.pushFocus_(_this.win.document.activeElement);
      }, 500);
    };
    this.win.document.addEventListener('focus', this.captureFocus_, true);
    this.win.addEventListener('blur', this.captureBlur_);
  }

  /** @private For testing. */

  FocusHistory.prototype.cleanup_ = function cleanup_() {
    this.win.document.removeEventListener('focus', this.captureFocus_, true);
    this.win.removeEventListener('blur', this.captureBlur_);
  };

  /**
   * Add a listener for focus events.
   * @param {function(!Element)} handler
   * @return {!UnlistenDef}
   */

  FocusHistory.prototype.onFocus = function onFocus(handler) {
    return this.observeFocus_.add(handler);
  };

  /**
   * @param {!Element} element
   * @private
   */

  FocusHistory.prototype.pushFocus_ = function pushFocus_(element) {
    var now = Date.now();
    if (this.history_.length == 0 || this.history_[this.history_.length - 1].el != element) {
      this.history_.push({ el: element, time: now });
    } else {
      this.history_[this.history_.length - 1].time = now;
    }
    this.purgeBefore(now - this.purgeTimeout_);
    this.observeFocus_.fire(element);
  };

  /**
   * Returns the element that was focused last.
   * @return {?Element}
   */

  FocusHistory.prototype.getLast = function getLast() {
    if (this.history_.length == 0) {
      return null;
    }
    return this.history_[this.history_.length - 1].el;
  };

  /**
   * Removes elements from the history older than the specified time.
   * @param {time} time
   */

  FocusHistory.prototype.purgeBefore = function purgeBefore(time) {
    var index = this.history_.length - 1;
    for (var i = 0; i < this.history_.length; i++) {
      if (this.history_[i].time >= time) {
        index = i - 1;
        break;
      }
    }
    if (index != -1) {
      this.history_.splice(0, index + 1);
    }
  };

  /**
   * Returns `true` if the specified element contains any of the elements in
   * the history.
   * @param {!Element} element
   * @return {boolean}
   */

  FocusHistory.prototype.hasDescendantsOf = function hasDescendantsOf(element) {
    if (this.win.document.activeElement) {
      this.pushFocus_(this.win.document.activeElement);
    }
    for (var i = 0; i < this.history_.length; i++) {
      if (element.contains(this.history_[i].el)) {
        return true;
      }
    }
    return false;
  };

  return FocusHistory;
})();

exports.FocusHistory = FocusHistory;

},{"./log":41,"./observable":44,"./timer":86}],34:[function(require,module,exports){
exports.__esModule = true;
exports.listenFor = listenFor;
exports.listenForOncePromise = listenForOncePromise;
exports.postMessage = postMessage;
exports.postMessageToWindows = postMessageToWindows;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

var _url = require('./url');

var _utilsArray = require('./utils/array');

/**
 * Sentinel used to force unlistening after a iframe is detached.
 * @type {string}
 */
var UNLISTEN_SENTINEL = 'unlisten';

/**
 * @typedef {{
 *   frame: !Element,
 *   events: !Object<string, !Array<function(!Object)>>
 * }}
 */
var WindowEventsDef = undefined;

/**
 * Returns a mapping from a URL's origin to an array of windows and their listenFor listeners.
 * @param {!Window} parentWin the window that created the iframe
 * @param {boolean=} opt_create create the mapping if it does not exist
 * @return {?Object<string, !Array<!WindowEventsDef>>}
 */
function getListenFors(parentWin, opt_create) {
  var listeningFors = parentWin.listeningFors;

  if (!listeningFors && opt_create) {
    listeningFors = parentWin.listeningFors = Object.create(null);
  }
  return listeningFors || null;
}

/**
 * Returns an array of WindowEventsDef that have had any listenFor listeners registered for this sentinel.
 * @param {!Window} parentWin the window that created the iframe
 * @param {string} sentinel the sentinel of the message
 * @param {boolean=} opt_create create the array if it does not exist
 * @return {?Array<!WindowEventsDef>}
 */
function getListenForSentinel(parentWin, sentinel, opt_create) {
  var listeningFors = getListenFors(parentWin, opt_create);
  if (!listeningFors) {
    return listeningFors;
  }

  var listenSentinel = listeningFors[sentinel];
  if (!listenSentinel && opt_create) {
    listenSentinel = listeningFors[sentinel] = [];
  }
  return listenSentinel || null;
}

/**
 * Returns an mapping of event names to listenFor listeners.
 * @param {!Window} parentWin the window that created the iframe
 * @param {!Element} iframe the iframe element who's context will trigger the
 *     event
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 * @return {?Object<string, !Array<function(!Object, !Window, string)>>}
 */
function getOrCreateListenForEvents(parentWin, iframe, opt_is3P) {
  var origin = _url.parseUrl(iframe.src).origin;
  var sentinel = getSentinel_(iframe, opt_is3P);
  var listenSentinel = getListenForSentinel(parentWin, sentinel, true);

  var windowEvents = undefined;
  for (var i = 0; i < listenSentinel.length; i++) {
    var we = listenSentinel[i];
    if (we.frame === iframe) {
      windowEvents = we;
      break;
    }
  }

  if (!windowEvents) {
    windowEvents = {
      frame: iframe,
      origin: origin,
      events: Object.create(null)
    };
    listenSentinel.push(windowEvents);
  }

  return windowEvents.events;
}

/**
 * Returns an mapping of event names to listenFor listeners.
 * @param {!Window} parentWin the window that created the iframe
 * @param {string} sentinel the sentinel of the message
 * @param {string} origin the source window's origin
 * @param {!Window} triggerWin the window that triggered the event
 * @return {?Object<string, !Array<function(!Object, !Window, string)>>}
 */
function getListenForEvents(parentWin, sentinel, origin, triggerWin) {
  var listenSentinel = getListenForSentinel(parentWin, sentinel);

  if (!listenSentinel) {
    return listenSentinel;
  }

  // Find the entry for the frame.
  // TODO(@nekodo): Add a WeakMap<Window, WindowEventsDef> cache to
  //     speed up this process.
  var windowEvents = undefined;
  for (var i = 0; i < listenSentinel.length; i++) {
    var we = listenSentinel[i];
    var contentWindow = we.frame.contentWindow;
    if (!contentWindow) {
      setTimeout(dropListenSentinel, 0, listenSentinel);
    } else if (sentinel === 'amp') {
      // A non-3P code path, origin must match.
      if (we.origin === origin && contentWindow == triggerWin) {
        windowEvents = we;
        break;
      }
    } else if (triggerWin == contentWindow || isDescendantWindow(contentWindow, triggerWin)) {
      // 3P code path, we may accept messages from nested frames.
      windowEvents = we;
      break;
    }
  }

  return windowEvents ? windowEvents.events : null;
}

/**
 * Checks whether one window is a descendant of another by climbing
 * the parent chain.
 * @param {!Window} ancestor potential ancestor window
 * @param {!Window} descendant potential descendant window
 * @return {boolean}
 */
function isDescendantWindow(ancestor, descendant) {
  for (var win = descendant; win && win != win.parent; win = win.parent) {
    if (win == ancestor) {
      return true;
    }
  }
  return false;
}

/**
 * Removes any listenFors registed on listenSentinel that do not have
 * a contentWindow (the frame was removed from the DOM tree).
 * @param {!Array<!WindowEventsDef>} listenSentinel
 */
function dropListenSentinel(listenSentinel) {
  var noopData = { sentinel: UNLISTEN_SENTINEL };

  for (var i = listenSentinel.length - 1; i >= 0; i--) {
    var windowEvents = listenSentinel[i];

    if (!windowEvents.frame.contentWindow) {
      listenSentinel.splice(i, 1);

      var events = windowEvents.events;
      for (var _name in events) {
        // Splice here, so that each unlisten does not shift the array
        events[_name].splice(0, Infinity).forEach(function (event) {
          event(noopData);
        });
      }
    }
  }
}

/**
 * Registers the global listenFor event listener if it has yet to be.
 * @param {!Window} parentWin
 */
function registerGlobalListenerIfNeeded(parentWin) {
  if (parentWin.listeningFors) {
    return;
  }
  var listenForListener = function (event) {
    if (!event.data) {
      return;
    }
    var data = parseIfNeeded(event.data);
    if (!data.sentinel) {
      return;
    }

    var listenForEvents = getListenForEvents(parentWin, data.sentinel, event.origin, event.source);
    if (!listenForEvents) {
      return;
    }

    var listeners = listenForEvents[data.type];
    if (!listeners) {
      return;
    }

    // We slice to avoid issues with adding another listener or unlistening
    // during iteration. We could move to a Doubly Linked List with
    // backtracking, but that's overly complicated.
    listeners = listeners.slice();
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener(data, event.source, event.origin);
    }
  };

  parentWin.addEventListener('message', listenForListener);
}

/**
 * Allows listening for message from the iframe. Returns an unlisten
 * function to remove the listener.
 *
 * @param {!Element} iframe.
 * @param {string} typeOfMessage.
 * @param {?function(!Object, !Window, string)} callback Called when a message of
 *     this type arrives for this iframe.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 * @param {boolean=} opt_includingNestedWindows set to true if a messages from
 *     nested frames should also be accepted.
 * @return {!UnlistenDef}
 */

function listenFor(iframe, typeOfMessage, callback, opt_is3P, opt_includingNestedWindows) {
  _log.dev().assert(iframe.src, 'only iframes with src supported');
  _log.dev().assert(!iframe.parentNode, 'cannot register events on an attached ' + 'iframe. It will cause hair-pulling bugs like #2942');
  _log.dev().assert(callback);
  var parentWin = iframe.ownerDocument.defaultView;

  registerGlobalListenerIfNeeded(parentWin);

  var listenForEvents = getOrCreateListenForEvents(parentWin, iframe, opt_is3P);

  var events = listenForEvents[typeOfMessage] || (listenForEvents[typeOfMessage] = []);

  var unlisten = undefined;
  var listener = function (data, source, origin) {
    // Exclude nested frames if necessary.
    // Note that the source was already verified to be either the contentWindow
    // of the iframe itself or a descendant window within it.
    if (!opt_includingNestedWindows && source != iframe.contentWindow) {
      return;
    }

    if (data.sentinel == UNLISTEN_SENTINEL) {
      unlisten();
      return;
    }
    callback(data, source, origin);
  };

  events.push(listener);

  return unlisten = function () {
    if (listener) {
      var index = events.indexOf(listener);
      if (index > -1) {
        events.splice(index, 1);
      }
      // Make sure references to the unlisten function do not keep
      // alive too much.
      listener = null;
      events = null;
      callback = null;
    }
  };
}

/**
 * Returns a promise that resolves when one of given messages has been observed
 * for the first time. And remove listener for all other messages.
 * @param {!Element} iframe
 * @param {string|!Array<string>} typeOfMessages
 * @param {boolean=} opt_is3P
 * @return {!Promise<!{data, source, origin}>}
 */

function listenForOncePromise(iframe, typeOfMessages, opt_is3P) {
  var unlistenList = [];
  if (typeof typeOfMessages == 'string') {
    typeOfMessages = [typeOfMessages];
  }
  return new Promise(function (resolve) {
    for (var i = 0; i < typeOfMessages.length; i++) {
      var message = typeOfMessages[i];
      var unlisten = listenFor(iframe, message, function (data, source, origin) {
        for (var _i = 0; _i < unlistenList.length; _i++) {
          unlistenList[_i]();
        }
        resolve({ data: data, source: source, origin: origin });
      }, opt_is3P);
      unlistenList.push(unlisten);
    }
  });
}

/**
 * Posts a message to the iframe.
 * @param {!Element} iframe The iframe.
 * @param {string} type Type of the message.
 * @param {!Object} object Message payload.
 * @param {string} targetOrigin origin of the target.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 */

function postMessage(iframe, type, object, targetOrigin, opt_is3P) {
  postMessageToWindows(iframe, [{ win: iframe.contentWindow, origin: targetOrigin }], type, object, opt_is3P);
}

/**
 * Posts an identical message to multiple target windows with the same
 * sentinel.
 * The message is serialized only once.
 * @param {!Element} iframe The iframe.
 * @param {!Array<{win: !Window, origin: string}>} targets to send the message
 *     to, pairs of window and its origin.
 * @param {string} type Type of the message.
 * @param {!Object} object Message payload.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 */

function postMessageToWindows(iframe, targets, type, object, opt_is3P) {
  if (!iframe.contentWindow) {
    return;
  }
  object.type = type;
  object.sentinel = getSentinel_(iframe, opt_is3P);
  var payload = object;
  if (opt_is3P) {
    // Serialize ourselves because that is much faster in Chrome.
    payload = 'amp-' + JSON.stringify(object);
  }
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    target.win. /*OK*/postMessage(payload, target.origin);
  }
}

/**
 * Gets the sentinel string.
 * @param {!Element} iframe The iframe.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 * @returns {string} Sentinel string.
 * @private
 */
function getSentinel_(iframe, opt_is3P) {
  return opt_is3P ? iframe.getAttribute('data-amp-3p-sentinel') : 'amp';
}

/**
 * Json parses event.data if it needs to be
 * @returns {!Object} object message
 * @private
 */
function parseIfNeeded(data) {
  var shouldBeParsed = typeof data === 'string' && data.charAt(0) === '{';
  if (shouldBeParsed) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      _log.dev().warn('Postmessage could not be parsed. ' + 'Is it in a valid JSON format?', e);
    }
  }
  return (/** @type {!Object} */data
  );
}

/**
 * Manages a postMessage API for an iframe with a subscription message and
 * a way to broadcast messages to all subscribed windows, which
 * in turn must all be descendants of the contentWindow of the iframe.
 */

var SubscriptionApi = (function () {
  /**
   * @param {!Element} iframe The iframe.
   * @param {string} type Type of the subscription message.
   * @param {boolean} is3p set to true if the iframe is 3p.
   * @param {function(!Object, !Window, string)} requestCallback Callback
   *     invoked whenever a new window subscribes.
   */

  function SubscriptionApi(iframe, type, is3p, requestCallback) {
    var _this = this;

    babelHelpers.classCallCheck(this, SubscriptionApi);

    /** @private @const {!Element} */
    this.iframe_ = iframe;
    /** @private @const {boolean} */
    this.is3p_ = is3p;
    /** @private @const {!Array<{win: !Window, origin: string}>} */
    this.clientWindows_ = [];

    /** @private @const {!UnlistenDef} */
    this.unlisten_ = listenFor(this.iframe_, type, function (data, source, origin) {
      // This message might be from any window within the iframe, we need
      // to keep track of which windows want to be sent updates.
      if (!_this.clientWindows_.some(function (entry) {
        return entry.win == source;
      })) {
        _this.clientWindows_.push({ win: source, origin: origin });
      }
      requestCallback(data, source, origin);
    }, this.is3p_,
    // For 3P frames we also allow nested frames within them to subscribe..
    this.is3p_ /* opt_includingNestedWindows */);
  }

  /**
   * Sends a message to all subscribed windows.
   * @param {string} type Type of the message.
   * @param {!Object} data Message payload.
   */

  SubscriptionApi.prototype.send = function send(type, data) {
    // Remove clients that have been removed from the DOM.
    _utilsArray.filterSplice(this.clientWindows_, function (client) {
      return !!client.win.parent;
    });
    postMessageToWindows(this.iframe_, this.clientWindows_, type, data, this.is3p_);
  };

  SubscriptionApi.prototype.destroy = function destroy() {
    this.unlisten_();
    this.clientWindows_.length = 0;
  };

  return SubscriptionApi;
})();

exports.SubscriptionApi = SubscriptionApi;

},{"./log":41,"./url":90,"./utils/array":92}],35:[function(require,module,exports){
exports.__esModule = true;
exports.inputFor = inputFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _observable = require('./observable');

var _service = require('./service');

var _log = require('./log');

var _eventHelper = require('./event-helper');

var TAG_ = 'Input';

var MAX_MOUSE_CONFIRM_ATTEMPS_ = 3;
var CLICK_TIMEOUT_ = 300;

/**
 * Detects and maintains different types of input such as touch, mouse or
 * keyboard.
 */

var Input = (function () {
  /**
   * @param {!Window} win
   */

  function Input(win) {
    babelHelpers.classCallCheck(this, Input);

    /** @const {!Window} */
    this.win = win;

    /** @private {!Function} */
    this.boundOnKeyDown_ = this.onKeyDown_.bind(this);

    /** @private {!Function} */
    this.boundOnMouseDown_ = this.onMouseDown_.bind(this);

    /** @private {!Function} */
    this.boundOnMouseMove_ = this.onMouseMove_.bind(this);

    /** @private {!Function} */
    this.boundMouseCanceled_ = this.mouseCanceled_.bind(this);

    /** @private {!Function} */
    this.boundMouseConfirmed_ = this.mouseConfirmed_.bind(this);

    /** @private {boolean} */
    this.hasTouch_ = 'ontouchstart' in win || win.navigator['maxTouchPoints'] !== undefined && win.navigator['maxTouchPoints'] > 0 || win['DocumentTouch'] !== undefined;
    _log.dev().fine(TAG_, 'touch detected:', this.hasTouch_);

    /** @private {boolean} */
    this.keyboardActive_ = false;
    this.win.document.addEventListener('keydown', this.boundOnKeyDown_);
    this.win.document.addEventListener('mousedown', this.boundOnMouseDown_);

    /** @private {boolean} */
    this.hasMouse_ = true;

    /** @private {number} */
    this.mouseConfirmAttemptCount_ = 0;

    /** @private {!Observable<boolean>} */
    this.touchDetectedObservable_ = new _observable.Observable();

    /** @private {!Observable<boolean>} */
    this.mouseDetectedObservable_ = new _observable.Observable();

    /** @private {!Observable<boolean>} */
    this.keyboardStateObservable_ = new _observable.Observable();

    // If touch available, temporarily set hasMouse to false and wait for
    // mouse events.
    if (this.hasTouch_) {
      this.hasMouse_ = !this.hasTouch_;
      _eventHelper.listenOnce(win.document, 'mousemove', this.boundOnMouseMove_);
    }
  }

  /**
   * @param {!Window} window
   * @return {!Input}
   */

  /** @private */

  Input.prototype.cleanup_ = function cleanup_() {
    this.win.document.removeEventListener('keydown', this.boundOnKeyDown_);
    this.win.document.removeEventListener('mousedown', this.boundOnMouseDown_);
  };

  /**
   * Whether the touch input has been detected.
   * @return {boolean}
   */

  Input.prototype.isTouchDetected = function isTouchDetected() {
    return this.hasTouch_;
  };

  /**
   * Registers an event handle in case if the touch is detected.
   * @param {function(boolean)} handler
   * @param {boolean=} opt_fireImmediately
   * @return {!UnlistenDef}
   */

  Input.prototype.onTouchDetected = function onTouchDetected(handler, opt_fireImmediately) {
    if (opt_fireImmediately) {
      handler(this.isTouchDetected());
    }
    return this.touchDetectedObservable_.add(handler);
  };

  /**
   * Whether the mouse input has been detected.
   * @return {boolean}
   */

  Input.prototype.isMouseDetected = function isMouseDetected() {
    return this.hasMouse_;
  };

  /**
   * Registers an event handle in case if the mouse is detected.
   * @param {function(boolean)} handler
   * @param {boolean=} opt_fireImmediately
   * @return {!UnlistenDef}
   */

  Input.prototype.onMouseDetected = function onMouseDetected(handler, opt_fireImmediately) {
    if (opt_fireImmediately) {
      handler(this.isMouseDetected());
    }
    return this.mouseDetectedObservable_.add(handler);
  };

  /**
   * Whether the keyboard input is currently active.
   * @return {boolean}
   */

  Input.prototype.isKeyboardActive = function isKeyboardActive() {
    return this.keyboardActive_;
  };

  /**
   * Registers an event handle for changes in the keyboard input.
   * @param {function(boolean)} handler
   * @param {boolean=} opt_fireImmediately
   * @return {!UnlistenDef}
   */

  Input.prototype.onKeyboardStateChanged = function onKeyboardStateChanged(handler, opt_fireImmediately) {
    if (opt_fireImmediately) {
      handler(this.isKeyboardActive());
    }
    return this.keyboardStateObservable_.add(handler);
  };

  /**
   * @param {!Event} e
   * @private
   */

  Input.prototype.onKeyDown_ = function onKeyDown_(e) {
    if (this.keyboardActive_) {
      return;
    }

    if (e.defaultPrevented) {
      return;
    }

    // Ignore inputs.
    var target = e.target;
    if (target && (target.tagName == 'INPUT' || target.tagName == 'TEXTAREA' || target.tagName == 'SELECT' || target.tagName == 'OPTION' || target.hasAttribute('contenteditable'))) {
      return;
    }

    this.keyboardActive_ = true;
    this.keyboardStateObservable_.fire(true);
    _log.dev().fine(TAG_, 'keyboard activated');
  };

  /** @private */

  Input.prototype.onMouseDown_ = function onMouseDown_() {
    if (!this.keyboardActive_) {
      return;
    }
    this.keyboardActive_ = false;
    this.keyboardStateObservable_.fire(false);
    _log.dev().fine(TAG_, 'keyboard deactivated');
  };

  /**
   * @param {!Event} e
   * @return {!Promise|undefined}
   * @private
   */

  Input.prototype.onMouseMove_ = function onMouseMove_(e) {
    // The event explicitly states that it's a result of a touch event.
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
      this.mouseCanceled_();
      return undefined;
    }
    // If "click" arrives within a timeout time, this is most likely a
    // touch/mouse emulation. Otherwise, if timeout exceeded, this looks
    // like a legitimate mouse event.
    return _eventHelper.listenOncePromise(this.win.document, 'click', false, CLICK_TIMEOUT_).then(this.boundMouseCanceled_, this.boundMouseConfirmed_);
  };

  /** @private */

  Input.prototype.mouseConfirmed_ = function mouseConfirmed_() {
    this.hasMouse_ = true;
    this.mouseDetectedObservable_.fire(true);
    _log.dev().fine(TAG_, 'mouse detected');
  };

  /** @private */

  Input.prototype.mouseCanceled_ = function mouseCanceled_() {
    // Repeat, if attempts allow.
    this.mouseConfirmAttemptCount_++;
    if (this.mouseConfirmAttemptCount_ <= MAX_MOUSE_CONFIRM_ATTEMPS_) {
      _eventHelper.listenOnce(this.win.document, 'mousemove', this.boundOnMouseMove_);
    } else {
      _log.dev().fine(TAG_, 'mouse detection failed');
    }
  };

  return Input;
})();

exports.Input = Input;

function inputFor(window) {
  return _service.fromClass(window, 'input', Input);
}

;

},{"./event-helper":27,"./log":41,"./observable":44,"./service":56}],36:[function(require,module,exports){
exports.__esModule = true;
exports.getIntersectionChangeEntry = getIntersectionChangeEntry;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

var _layoutRect = require('./layout-rect');

var _iframeHelper = require('./iframe-helper');

var _timer = require('./timer');

/**
 * The structure that defines the rectangle used in intersection observers.
 *
 * @typedef {{
 *   top: number,
 *   bottom: number,
 *   left: number,
 *   right: number,
 *   width: number,
 *   height: number,
 *   x: number,
 *   y: number,
 * }}
 */
var DOMRect = undefined;

exports.DOMRect = DOMRect;
/**
 * Transforms a LayoutRect into a DOMRect for use in intersection observers.
 * @param {!./layout-rect.LayoutRectDef} rect
 * @return {!DOMRect}
 */
function DomRectFromLayoutRect(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom,
    right: rect.right,
    x: rect.left,
    y: rect.top
  };
}

/**
 * Returns the ratio of the smaller box's area to the larger box's area.
 * @param {!./layout-rect.LayoutRectDef} smaller
 * @param {!./layout-rect.LayoutRectDef} larger
 * @return {number}
 */
function intersectionRatio(smaller, larger) {
  return smaller.width * smaller.height / (larger.width * larger.height);
}

/**
 * Produces a change entry for that should be compatible with
 * IntersectionObserverEntry.
 *
 * Mutates passed in rootBounds to have x and y according to spec.
 *
 * @param {!./layout-rect.LayoutRectDef} element The element's layout rectangle
 * @param {?./layout-rect.LayoutRectDef} owner The owner's layout rect, if
 *     there is an owner.
 * @param {!./layout-rect.LayoutRectDef} viewport The viewport's layout rect.
 * @return {!IntersectionObserverEntry} A change entry.
 * @private
 */

function getIntersectionChangeEntry(element, owner, viewport) {
  _log.dev().assert(element.width >= 0 && element.height >= 0, 'Negative dimensions in element.');
  // Building an IntersectionObserverEntry.

  var intersectionRect = element;
  if (owner) {
    intersectionRect = _layoutRect.rectIntersection(owner, intersectionRect) ||
    // No intersection.
    _layoutRect.layoutRectLtwh(0, 0, 0, 0);
  }
  intersectionRect = _layoutRect.rectIntersection(viewport, intersectionRect) ||
  // No intersection.
  _layoutRect.layoutRectLtwh(0, 0, 0, 0);

  return (/** @type {!IntersectionObserverEntry} */{
      time: Date.now(),
      rootBounds: DomRectFromLayoutRect(viewport),
      boundingClientRect: DomRectFromLayoutRect(element),
      intersectionRect: DomRectFromLayoutRect(intersectionRect),
      intersectionRatio: intersectionRatio(intersectionRect, element)
    }
  );
}

/**
 * The IntersectionObserver class lets any element share its viewport
 * intersection data with an iframe of its choice (most likely contained within
 * the element itself.). When instantiated the class will start listening for
 * a 'send-intersection' postMessage from the iframe, and only then  would start
 * sending intersection data to the iframe. The intersection data would be sent
 * when the element is moved inside or outside the viewport as well as on
 * scroll and resize.
 * The element should create an IntersectionObserver instance once the Iframe
 * element is created.
 * The IntersectionObserver class exposes a `fire` method that would send the
 * intersection data to the iframe.
 * The IntersectionObserver class exposes a `onViewportCallback` method that
 * should be called inside if the viewportCallback of the element. This would
 * let the element sent intersection data automatically when there element comes
 * inside or goes outside the viewport and also manage sending intersection data
 * onscroll and resize.
 * Note: The IntersectionObserver would not send any data over to the iframe if
 * it had not requested the intersection data already via a postMessage.
 */

var IntersectionObserver = (function () {
  /**
   * @param {!BaseElement} element.
   * @param {!HTMLIFrameElement} iframe Iframe element which requested the
   *     intersection data.
   * @param {?boolean} opt_is3p Set to `true` when the iframe is 3'rd party.
   */

  function IntersectionObserver(baseElement, iframe, opt_is3p) {
    var _this = this;

    babelHelpers.classCallCheck(this, IntersectionObserver);

    /** @private @const */
    this.baseElement_ = baseElement;
    /** @private @const {!./service/timer-impl.Timer} */
    this.timer_ = _timer.timerFor(baseElement.win);
    /** @private {boolean} */
    this.shouldSendIntersectionChanges_ = false;
    /** @private {boolean} */
    this.inViewport_ = false;

    /** @private {!Array<!IntersectionObserverEntry>} */
    this.pendingChanges_ = [];

    /** @private {number|string} */
    this.flushTimeout_ = 0;

    /** @private @const {function()} */
    this.boundFlush_ = this.flush_.bind(this);

    /**
     * An object which handles tracking subscribers to the
     * intersection updates for this element.
     * Triggered by context.observeIntersection(…) inside the ad/iframe
     * or by directly posting a send-intersections message.
     * @private {!SubscriptionApi}
     */
    this.postMessageApi_ = new _iframeHelper.SubscriptionApi(iframe, 'send-intersections', opt_is3p || false,
    // Each time someone subscribes we make sure that they
    // get an update.
    function () {
      return _this.startSendingIntersectionChanges_();
    });

    /** @private {?Function} */
    this.unlistenViewportChanges_ = null;
  }

  IntersectionObserver.prototype.fire = function fire() {
    this.sendElementIntersection_();
  };

  /**
   * Check if we need to unlisten when moving out of viewport,
   * unlisten and reset unlistenViewportChanges_.
   * @private
   */

  IntersectionObserver.prototype.unlistenOnOutViewport_ = function unlistenOnOutViewport_() {
    if (this.unlistenViewportChanges_) {
      this.unlistenViewportChanges_();
      this.unlistenViewportChanges_ = null;
    }
  };

  /**
   * Called via postMessage from the child iframe when the ad/iframe starts
   * observing its position in the viewport.
   * Sets a flag, measures the iframe position if necessary and sends
   * one change record to the iframe.
   * Note that this method may be called more than once if a single ad
   * has multiple parties interested in viewability data.
   * @private
   */

  IntersectionObserver.prototype.startSendingIntersectionChanges_ = function startSendingIntersectionChanges_() {
    var _this2 = this;

    this.shouldSendIntersectionChanges_ = true;
    this.baseElement_.getVsync().measure(function () {
      if (_this2.baseElement_.isInViewport()) {
        _this2.onViewportCallback(true);
      }
      _this2.fire();
    });
  };

  /**
   * Triggered by the AmpElement to when it either enters or exits the visible
   * viewport.
   * @param {boolean} inViewport true if the element is in viewport.
   */

  IntersectionObserver.prototype.onViewportCallback = function onViewportCallback(inViewport) {
    var _this3 = this;

    if (this.inViewport_ == inViewport) {
      return;
    }
    this.inViewport_ = inViewport;
    // Lets the ad know that it became visible or no longer is.
    this.fire();
    // And update the ad about its position in the viewport while
    // it is visible.
    if (inViewport) {
      (function () {
        var send = _this3.fire.bind(_this3);
        // Scroll events.
        var unlistenScroll = _this3.baseElement_.getViewport().onScroll(send);
        // Throttled scroll events. Also fires for resize events.
        var unlistenChanged = _this3.baseElement_.getViewport().onChanged(send);
        _this3.unlistenViewportChanges_ = function () {
          unlistenScroll();
          unlistenChanged();
        };
      })();
    } else {
      this.unlistenOnOutViewport_();
    }
  };

  /**
   * Sends 'intersection' message to ad/iframe with intersection change records
   * if this has been activated and we measured the layout box of the iframe
   * at least once.
   * @private
   */

  IntersectionObserver.prototype.sendElementIntersection_ = function sendElementIntersection_() {
    if (!this.shouldSendIntersectionChanges_) {
      return;
    }
    var change = this.baseElement_.element.getIntersectionChangeEntry();
    if (this.pendingChanges_.length > 0 && this.pendingChanges_[this.pendingChanges_.length - 1].time == change.time) {
      return;
    }
    this.pendingChanges_.push(change);
    if (!this.flushTimeout_) {
      // Send one immediately, …
      this.flush_();
      // but only send a maximum of 10 postMessages per second.
      this.flushTimeout_ = this.timer_.delay(this.boundFlush_, 100);
    }
  };

  /**
   * @private
   */

  IntersectionObserver.prototype.flush_ = function flush_() {
    // TODO(zhouyx): One potential place to check if element is still in doc.
    this.flushTimeout_ = 0;
    if (!this.pendingChanges_.length) {
      return;
    }
    // Note that SubscribeApi multicasts the update to all interested windows.
    this.postMessageApi_.send('intersection', { changes: this.pendingChanges_ });
    this.pendingChanges_.length = 0;
  };

  /**
   * Provide a function to clear timeout before set this intersection to null.
   */

  IntersectionObserver.prototype.destroy = function destroy() {
    this.timer_.cancel(this.flushTimeout_);
    this.unlistenOnOutViewport_();
    this.postMessageApi_.destroy();
  };

  return IntersectionObserver;
})();

exports.IntersectionObserver = IntersectionObserver;

},{"./iframe-helper":34,"./layout-rect":38,"./log":41,"./timer":86}],37:[function(require,module,exports){
exports.__esModule = true;
exports.recreateNonProtoObject = recreateNonProtoObject;
exports.getValueForExpr = getValueForExpr;
exports.tryParseJson = tryParseJson;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview This module declares JSON types as defined in the
 * {@link http://json.org/}.
 */

var _types = require('./types');

// NOTE Type are changed to {*} because of
// https://github.com/google/closure-compiler/issues/1999

/**
 * JSON scalar. It's either string, number or boolean.
 * @typedef {*} should be string|number|boolean
 */
var JSONScalarDef = undefined;

/**
 * JSON object. It's a map with string keys and JSON values.
 * @typedef {*} should be !Object<string, ?JSONValueDef>
 */
var JSONObjectDef = undefined;

/**
 * JSON array. It's an array with JSON values.
 * @typedef {*} should be !Array<?JSONValueDef>
 */
var JSONArrayDef = undefined;

/**
 * JSON value. It's either a scalar, an object or an array.
 * @typedef {*} should be !JSONScalarDef|!JSONObjectDef|!JSONArrayDef
 */
var JSONValueDef = undefined;

/**
 * Recreates objects with prototype-less copies.
 * @param {!JSONObjectDef} obj
 * @return {!JSONObjectDef}
 */

function recreateNonProtoObject(obj) {
  var copy = Object.create(null);
  for (var k in obj) {
    if (!obj.hasOwnProperty(k)) {
      continue;
    }
    var v = obj[k];
    copy[k] = _types.isObject(v) ? recreateNonProtoObject(v) : v;
  }
  return copy;
}

/**
 * Returns a value from an object for a field-based expression. The expression
 * is a simple nested dot-notation of fields, such as `field1.field2`. If any
 * field in a chain does not exist or is not an object, the returned value will
 * be `undefined`.
 *
 * @param {!JSONObjectDef} obj
 * @param {string} expr
 * @return {?JSONValueDef|undefined}
 */

function getValueForExpr(obj, expr) {
  var parts = expr.split('.');
  var value = obj;
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (!part) {
      value = undefined;
      break;
    }
    if (!_types.isObject(value) || value[part] === undefined || value.hasOwnProperty && !value.hasOwnProperty(part)) {
      value = undefined;
      break;
    }
    value = value[part];
  }
  return value;
}

/**
 * Parses the given `json` string without throwing an exception if not valid.
 * Returns `undefined` if parsing fails.
 * Returns the `Object` corresponding to the JSON string when parsing succeeds.
 * @param {*} json JSON string to parse
 * @param {function(!Error)=} opt_onFailed Optional function that will be called with
 *     the error if parsing fails.
 * @return {?JSONValueDef|undefined}
 */

function tryParseJson(json, opt_onFailed) {
  try {
    return JSON.parse( /** @type {string} */json);
  } catch (e) {
    if (opt_onFailed) {
      opt_onFailed(e);
    }
    return undefined;
  }
}

},{"./types":88}],38:[function(require,module,exports){
exports.__esModule = true;
exports.layoutRectLtwh = layoutRectLtwh;
exports.layoutRectFromDomRect = layoutRectFromDomRect;
exports.layoutRectsOverlap = layoutRectsOverlap;
exports.rectIntersection = rectIntersection;
exports.expandLayoutRect = expandLayoutRect;
exports.moveLayoutRect = moveLayoutRect;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * The structure that combines position and size for an element. The exact
 * interpretation of position and size depends on the use case.
 *
 * @typedef {{
 *   top: number,
 *   bottom: number,
 *   left: number,
 *   right: number,
 *   width: number,
 *   height: number
 * }}
 */
var LayoutRectDef = undefined;

exports.LayoutRectDef = LayoutRectDef;
/**
 * Creates a layout rect based on the left, top, width and height parameters
 * in that order.
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @return {!LayoutRectDef}
 */

function layoutRectLtwh(left, top, width, height) {
  return {
    left: left,
    top: top,
    width: width,
    height: height,
    bottom: top + height,
    right: left + width
  };
}

/**
 * Creates a layout rect based on the DOMRect, e.g. obtained from calling
 * getBoundingClientRect.
 * @param {!Rect} rect
 * @return {!LayoutRectDef}
 */

function layoutRectFromDomRect(rect) {
  return layoutRectLtwh(Number(rect.left), Number(rect.top), Number(rect.width), Number(rect.height));
}

/**
 * Returns true if the specified two rects overlap by a single pixel.
 * @param {!LayoutRectDef} r1
 * @param {!LayoutRectDef} r2
 * @return {boolean}
 */

function layoutRectsOverlap(r1, r2) {
  return r1.top <= r2.bottom && r2.top <= r1.bottom && r1.left <= r2.right && r2.left <= r1.right;
}

/**
 * Returns the intersection between a, b or null if there is none.
 * @param {!LayoutRectDef} a
 * @param {!LayoutRectDef} b
 * @return {?LayoutRectDef}
 */

function rectIntersection(a, b) {
  var x0 = Math.max(a.left, b.left);
  var x1 = Math.min(a.left + a.width, b.left + b.width);

  if (x0 <= x1) {
    var y0 = Math.max(a.top, b.top);
    var y1 = Math.min(a.top + a.height, b.top + b.height);

    if (y0 <= y1) {
      return layoutRectLtwh(x0, y0, x1 - x0, y1 - y0);
    }
  }
  return null;
}

/**
 * Expand the layout rect using multiples of width and height.
 * @param {!LayoutRectDef} rect Original rect.
 * @param {number} dw Expansion in width, specified as a multiple of width.
 * @param {number} dh Expansion in height, specified as a multiple of height.
 * @return {!LayoutRectDef}
 */

function expandLayoutRect(rect, dw, dh) {
  return {
    top: rect.top - rect.height * dh,
    bottom: rect.bottom + rect.height * dh,
    left: rect.left - rect.width * dw,
    right: rect.right + rect.width * dw,
    width: rect.width * (1 + dw * 2),
    height: rect.height * (1 + dh * 2)
  };
}

/**
 * Moves the layout rect using dx and dy.
 * @param {!LayoutRectDef} rect Original rect.
 * @param {number} dx Move horizontally with this value.
 * @param {number} dy Move vertically with this value.
 * @return {!LayoutRectDef}
 */

function moveLayoutRect(rect, dx, dy) {
  if (dx == 0 && dy == 0) {
    return rect;
  }
  return layoutRectLtwh(rect.left + dx, rect.top + dy, rect.width, rect.height);
}

},{}],39:[function(require,module,exports){
exports.__esModule = true;
exports.parseLayout = parseLayout;
exports.getLayoutClass = getLayoutClass;
exports.isLayoutSizeDefined = isLayoutSizeDefined;
exports.isInternalElement = isInternalElement;
exports.parseLength = parseLength;
exports.assertLength = assertLength;
exports.assertLengthOrPercent = assertLengthOrPercent;
exports.getLengthUnits = getLengthUnits;
exports.getLengthNumeral = getLengthNumeral;
exports.hasNaturalDimensions = hasNaturalDimensions;
exports.getNaturalDimensions = getNaturalDimensions;
exports.isLoadingAllowed = isLoadingAllowed;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Implements element layout. See https://goo.gl/9avXuT for
 * details.
 */

var _log = require('./log');

var _types = require('./types');

/**
 * @enum {string}
 */
var Layout = {
  NODISPLAY: 'nodisplay',
  FIXED: 'fixed',
  FIXED_HEIGHT: 'fixed-height',
  RESPONSIVE: 'responsive',
  CONTAINER: 'container',
  FILL: 'fill',
  FLEX_ITEM: 'flex-item'
};

exports.Layout = Layout;
/**
 * CSS Length type. E.g. "1px" or "20vh".
 * @typedef {string}
 */
var LengthDef = undefined;

exports.LengthDef = LengthDef;
/**
 * @typedef {{
 *   width: string,
 *   height: string
 * }}
 */
var DimensionsDef = undefined;

/**
 * The set of elements with natural dimensions, that is, elements
 * which have a known dimension either based on their value specified here,
 * or, if the value is null, a dimension specific to the browser.
 * `hasNaturalDimensions` checks for membership in this set.
 * `getNaturalDimensions` determines the dimensions for an element in the
 *    set and caches it.
 * @type {!Object<string, ?DimensionsDef>}
 * @private  Visible for testing only!
 */
var naturalDimensions_ = {
  'AMP-PIXEL': { width: '1px', height: '1px' },
  'AMP-ANALYTICS': { width: '1px', height: '1px' },
  // TODO(dvoytenko): audio should have width:auto.
  'AMP-AUDIO': null,
  'AMP-SOCIAL-SHARE': { width: '60px', height: '44px' }
};

exports.naturalDimensions_ = naturalDimensions_;
/**
 * Elements that the progess can be shown for. This set has to be externalized
 * since the element's implementation may not be downloaded yet.
 * @enum {boolean}
 * @private  Visible for testing only!
 */
var LOADING_ELEMENTS_ = {
  'AMP-ANIM': true,
  'AMP-BRIGHTCOVE': true,
  'AMP-EMBED': true,
  'AMP-IFRAME': true,
  'AMP-IMG': true,
  'AMP-INSTAGRAM': true,
  'AMP-LIST': true,
  'AMP-PINTEREST': true,
  'AMP-VIDEO': true,
  'AMP-YOUTUBE': true
};

exports.LOADING_ELEMENTS_ = LOADING_ELEMENTS_;
/**
 * @param {string} s
 * @return {Layout|undefined} Returns undefined in case of failure to parse
 *   the layout string.
 */

function parseLayout(s) {
  for (var k in Layout) {
    if (Layout[k] == s) {
      return Layout[k];
    }
  }
  return undefined;
}

/**
 * @param {!Layout} layout
 * @return {string}
 */

function getLayoutClass(layout) {
  return '-amp-layout-' + layout;
}

/**
 * Whether an element with this layout inherently defines the size.
 * @param {!Layout} layout
 * @return {boolean}
 */

function isLayoutSizeDefined(layout) {
  return layout == Layout.FIXED || layout == Layout.FIXED_HEIGHT || layout == Layout.RESPONSIVE || layout == Layout.FILL || layout == Layout.FLEX_ITEM;
}

/**
 * Whether the tag is an internal (service) AMP tag.
 * @param {!Node|string} tag
 * @return {boolean}
 */

function isInternalElement(tag) {
  var tagName = typeof tag == 'string' ? tag : tag.tagName;
  return tagName && tagName.toLowerCase().indexOf('i-') == 0;
}

/**
 * Parses the CSS length value. If no units specified, the assumed value is
 * "px". Returns undefined in case of parsing error.
 * @param {string|undefined} s
 * @return {!LengthDef|undefined}
 */

function parseLength(s) {
  if (typeof s == 'number') {
    return s + 'px';
  }
  if (!s) {
    return undefined;
  }
  if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(s)) {
    return undefined;
  }
  if (/^\d+(\.\d+)?$/.test(s)) {
    return s + 'px';
  }
  return s;
}

/**
 * Asserts that the supplied value is a non-percent CSS Length value.
 * @param {!LengthDef|string|null|undefined} length
 * @return {!LengthDef}
 */

function assertLength(length) {
  _log.user().assert(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)$/.test(length), 'Invalid length value: %s', length);
  return (/** @type {!LengthDef} */length
  );
}

/**
 * Asserts that the supplied value is a CSS Length value
 * (including percent unit).
 * @param {!LengthDef|string} length
 * @return {!LengthDef}
 */

function assertLengthOrPercent(length) {
  _log.user().assert(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|%)$/.test(length), 'Invalid length or percent value: %s', length);
  return length;
}

/**
 * Returns units from the CSS length value.
 * @param {!LengthDef|string|null|undefined} length
 * @return {string}
 */

function getLengthUnits(length) {
  assertLength(length);
  _log.dev().assertString(length);
  var m = _log.user().assert(length.match(/[a-z]+/i), 'Failed to read units from %s', length);
  return m[0];
}

/**
 * Returns the numeric value of a CSS length value.
 * @param {!LengthDef|string|null|undefined} length
 * @return {number|undefined}
 */

function getLengthNumeral(length) {
  var res = parseFloat(length);
  return !_types.isFiniteNumber(res) ? undefined : res;
}

/**
 * Determines whether the tagName is a known element that has natural dimensions
 * in our runtime or the browser.
 * @param {string} tagName The element tag name.
 * @return {boolean}
 */

function hasNaturalDimensions(tagName) {
  tagName = tagName.toUpperCase();
  return naturalDimensions_[tagName] !== undefined;
}

/**
 * Determines the default dimensions for an element which could vary across
 * different browser implementations, like <audio> for instance.
 * This operation can only be completed for an element whitelisted by
 * `hasNaturalDimensions`.
 * @param {!Element} element
 * @return {DimensionsDef}
 */

function getNaturalDimensions(element) {
  var tagName = element.tagName.toUpperCase();
  _log.dev().assert(naturalDimensions_[tagName] !== undefined);
  if (!naturalDimensions_[tagName]) {
    var doc = element.ownerDocument;
    var naturalTagName = tagName.replace(/^AMP\-/, '');
    var temp = doc.createElement(naturalTagName);
    // For audio, should no-op elsewhere.
    temp.controls = true;
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    doc.body.appendChild(temp);
    naturalDimensions_[tagName] = {
      width: (temp. /*OK*/offsetWidth || 1) + 'px',
      height: (temp. /*OK*/offsetHeight || 1) + 'px'
    };
    doc.body.removeChild(temp);
  }
  return (/** @type {DimensionsDef} */naturalDimensions_[tagName]
  );
}

/**
 * Whether the loading can be shown for the specified elemeent. This set has
 * to be externalized since the element's implementation may not be
 * downloaded yet.
 * @param {string} tagName The element tag name.
 * @return {boolean}
 */

function isLoadingAllowed(tagName) {
  return LOADING_ELEMENTS_[tagName.toUpperCase()] || false;
}

},{"./log":41,"./types":88}],40:[function(require,module,exports){
exports.__esModule = true;
exports.createLoaderElement = createLoaderElement;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Creates a default "loading indicator" element. This element accepts
 * `amp-active` class in which case it may choose to run an animation.
 * @param {!Document} doc
 * @return {!Element}
 */

function createLoaderElement(doc) {
  var loader = doc.createElement('div');
  loader.classList.add('-amp-loader');
  for (var i = 0; i < 3; i++) {
    var dot = doc.createElement('div');
    dot.classList.add('-amp-loader-dot');
    loader.appendChild(dot);
  }
  return loader;
}

},{}],41:[function(require,module,exports){
exports.__esModule = true;
exports.isUserErrorMessage = isUserErrorMessage;
exports.rethrowAsync = rethrowAsync;
exports.initLogConstructor = initLogConstructor;
exports.resetLogConstructorForTesting = resetLogConstructorForTesting;
exports.user = user;
exports.dev = dev;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _mode = require('./mode');

var _modeObject = require('./mode-object');

/** @const Time when this JS loaded.  */
var start = new Date().getTime();

/**
 * Triple zero width space.
 *
 * This is added to user error messages, so that we can later identify
 * them, when the only thing that we have is the message. This is the
 * case in many browsers when the global exception handler is invoked.
 *
 * @const {string}
 */
var USER_ERROR_SENTINEL = '\u200B\u200B\u200B';

exports.USER_ERROR_SENTINEL = USER_ERROR_SENTINEL;
/**
 * @return {boolean} Whether this message was a user error.
 */

function isUserErrorMessage(message) {
  return message.indexOf(USER_ERROR_SENTINEL) >= 0;
}

/**
 * @enum {number}
 * @private Visible for testing only.
 */
var LogLevel = {
  OFF: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  FINE: 4
};

exports.LogLevel = LogLevel;
/**
 * Logging class.
 * @final
 * @private Visible for testing only.
 */

var Log = (function () {
  /**
   * @param {!Window} win
   * @param {function(!./mode.ModeDef):!LogLevel} levelFunc
   * @param {string=} opt_suffix
   */

  function Log(win, levelFunc, opt_suffix) {
    babelHelpers.classCallCheck(this, Log);

    /**
     * In tests we use the main test window instead of the iframe where
     * the tests runs because only the former is relayed to the console.
     * @const {!Window}
     */
    this.win = _mode.getMode().test && win.AMP_TEST_IFRAME ? win.parent : win;

    /** @private @const {function(!./mode.ModeDef):!LogLevel} */
    this.levelFunc_ = levelFunc;

    /** @private @const {!LogLevel} */
    this.level_ = this.calcLevel_();

    /** @private @const {string} */
    this.suffix_ = opt_suffix || '';
  }

  /**
   * @param {string|!Element} val
   * @return {string}
   */

  /**
   * @return {!LogLevel}
   * @private
   */

  Log.prototype.calcLevel_ = function calcLevel_() {
    // No console - can't enable logging.
    if (!this.win.console || !this.win.console.log) {
      return LogLevel.OFF;
    }

    // Logging has been explicitly disabled.
    if (_mode.getMode().log == '0') {
      return LogLevel.OFF;
    }

    // Logging is enabled for tests directly.
    if (_mode.getMode().test && this.win.ENABLE_LOG) {
      return LogLevel.FINE;
    }

    // LocalDev by default allows INFO level, unless overriden by `#log`.
    if (_mode.getMode().localDev && !_mode.getMode().log) {
      return LogLevel.INFO;
    }

    // Delegate to the specific resolver.
    return this.levelFunc_(_modeObject.getModeObject());
  };

  /**
   * @param {string} tag
   * @param {string} level
   * @param {!Array} messages
   */

  Log.prototype.msg_ = function msg_(tag, level, messages) {
    if (this.level_ != LogLevel.OFF) {
      var fn = this.win.console.log;
      if (level == 'ERROR') {
        fn = this.win.console.error || fn;
      } else if (level == 'INFO') {
        fn = this.win.console.info || fn;
      } else if (level == 'WARN') {
        fn = this.win.console.warn || fn;
      }
      messages.unshift(Date.now() - start, '[' + tag + ']');
      fn.apply(this.win.console, messages);
    }
  };

  /**
   * Whether the logging is enabled.
   * @return {boolean}
   */

  Log.prototype.isEnabled = function isEnabled() {
    return this.level_ != LogLevel.OFF;
  };

  /**
   * Reports a fine-grained message.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.fine = function fine(tag, var_args) {
    if (this.level_ >= LogLevel.FINE) {
      this.msg_(tag, 'FINE', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports a informational message.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.info = function info(tag, var_args) {
    if (this.level_ >= LogLevel.INFO) {
      this.msg_(tag, 'INFO', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports a warning message.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.warn = function warn(tag, var_args) {
    if (this.level_ >= LogLevel.WARN) {
      this.msg_(tag, 'WARN', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports an error message. If the logging is disabled, the error is rethrown
   * asynchronously.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.error = function error(tag, var_args) {
    var _arguments = arguments,
        _this = this;

    if (this.level_ >= LogLevel.ERROR) {
      this.msg_(tag, 'ERROR', Array.prototype.slice.call(arguments, 1));
    } else {
      (function () {
        var error = createErrorVargs.apply(null, Array.prototype.slice.call(_arguments, 1));
        _this.prepareError_(error);
        _this.win.setTimeout(function () {
          throw error;
        });
      })();
    }
  };

  /**
   * Creates an error object.
   * @param {...*} var_args
   * @return {!Error}
   */

  Log.prototype.createError = function createError(var_args) {
    var error = createErrorVargs.apply(null, arguments);
    this.prepareError_(error);
    return error;
  };

  /**
   * Throws an error if the first argument isn't trueish.
   *
   * Supports argument substitution into the message via %s placeholders.
   *
   * Throws an error object that has two extra properties:
   * - associatedElement: This is the first element provided in the var args.
   *   It can be used for improved display of error messages.
   * - messageArray: The elements of the substituted message as non-stringified
   *   elements in an array. When e.g. passed to console.error this yields
   *   native displays of things like HTML elements.
   *
   * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
   *     not evaluate to true.
   * @param {string=} opt_message The assertion message
   * @param {...*} var_args Arguments substituted into %s in the message.
   * @return {T} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 0*/

  Log.prototype.assert = function assert(shouldBeTrueish, opt_message, var_args) {
    var firstElement = undefined;
    if (!shouldBeTrueish) {
      var message = opt_message || 'Assertion failed';
      var splitMessage = message.split('%s');
      var first = splitMessage.shift();
      var formatted = first;
      var messageArray = [];
      pushIfNonEmpty(messageArray, first);
      for (var i = 2; i < arguments.length; i++) {
        var val = arguments[i];
        if (val && val.tagName) {
          firstElement = val;
        }
        var nextConstant = splitMessage.shift();
        messageArray.push(val);
        pushIfNonEmpty(messageArray, nextConstant.trim());
        formatted += toString(val) + nextConstant;
      }
      var e = new Error(formatted);
      e.fromAssert = true;
      e.associatedElement = firstElement;
      e.messageArray = messageArray;
      this.prepareError_(e);
      throw e;
    }
    return shouldBeTrueish;
  };

  /**
   * Throws an error if the first argument isn't an Element
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeElement
   * @param {string=} opt_message The assertion message
   * @return {!Element} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/

  Log.prototype.assertElement = function assertElement(shouldBeElement, opt_message) {
    var shouldBeTrueish = shouldBeElement && shouldBeElement.nodeType == 1;
    this.assert(shouldBeTrueish, (opt_message || 'Element expected') + ': %s', shouldBeElement);
    return (/** @type {!Element} */shouldBeElement
    );
  };

  /**
   * Throws an error if the first argument isn't a string.
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeString
   * @param {string=} opt_message The assertion message
   * @return {string} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/

  Log.prototype.assertString = function assertString(shouldBeString, opt_message) {
    this.assert(typeof shouldBeString == 'string', (opt_message || 'String expected') + ': %s', shouldBeString);
    return (/** @type {string} */shouldBeString
    );
  };

  /**
   * Throws an error if the first argument isn't a number.
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeNumber
   * @param {string=} opt_message The assertion message
   * @return {number} The value of shouldBeTrueish.
   */

  Log.prototype.assertNumber = function assertNumber(shouldBeNumber, opt_message) {
    this.assert(typeof shouldBeNumber == 'number', (opt_message || 'Number expected') + ': %s', shouldBeNumber);
    return (/** @type {number} */shouldBeNumber
    );
  };

  /**
   * Asserts and returns the enum value. If the enum doesn't contain such a value,
   * the error is thrown.
   *
   * @param {!Object<T>} enumObj
   * @param {string} s
   * @param {string=} opt_enumName
   * @return T
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/

  Log.prototype.assertEnumValue = function assertEnumValue(enumObj, s, opt_enumName) {
    for (var k in enumObj) {
      if (enumObj[k] == s) {
        return enumObj[k];
      }
    }
    this.assert(false, 'Unknown %s value: "%s"', opt_enumName || 'enum', s);
  };

  /**
   * @param {!Error} error
   * @private
   */

  Log.prototype.prepareError_ = function prepareError_(error) {
    if (this.suffix_) {
      if (!error.message) {
        error.message = this.suffix_;
      } else if (error.message.indexOf(this.suffix_) == -1) {
        error.message += this.suffix_;
      }
    }
  };

  return Log;
})();

exports.Log = Log;
function toString(val) {
  if (val instanceof Element) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }
  return val;
}

/**
 * @param {!Array} array
 * @param {*} val
 */
function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}

/**
 * @param {...*} var_args
 * @return {!Error}
 * @private
 */
function createErrorVargs(var_args) {
  var error = null;
  var message = '';
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (arg instanceof Error && !error) {
      error = arg;
    } else {
      if (message) {
        message += ' ';
      }
      message += arg;
    }
  }
  if (!error) {
    error = new Error(message);
  } else if (message) {
    error.message = message + ': ' + error.message;
  }
  return error;
}

/**
 * Rethrows the error without terminating the current context. This preserves
 * whether the original error designation is a user error or a dev error.
 * @param {...*} var_args
 */

function rethrowAsync(var_args) {
  var error = createErrorVargs.apply(null, arguments);
  setTimeout(function () {
    throw error;
  });
}

/**
 * Cache for logs. We do not use a Service since the service module depends
 * on Log and closure literally can't even.
 * @type {{user: ?Log, dev: ?Log}}
 */
var logs = self.log = self.log || {
  user: null,
  dev: null
};

/**
 * Eventually holds a constructor for Log objects. Lazily initialized, so we
 * can avoid ever referencing the real constructor except in JS binaries
 * that actually want to include the implementation.
 * @typedef {?Function}
 */
var logConstructor = null;

function initLogConstructor() {
  logConstructor = Log;
}

function resetLogConstructorForTesting() {
  logConstructor = null;
}

/**
 * Publisher level log.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Development mode is enabled via `#development=1` or logging is explicitly
 *     enabled via `#log=D` where D >= 1.
 *
 * @return {!Log}
 */

function user() {
  if (logs.user) {
    return logs.user;
  }
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }
  return logs.user = new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);
    if (mode.development || logNum >= 1) {
      return LogLevel.FINE;
    }
    return LogLevel.OFF;
  }, USER_ERROR_SENTINEL);
}

/**
 * AMP development log. Calls to `devLog().assert` and `dev.fine` are stripped in
 * the PROD binary. However, `devLog().assert` result is preserved in either case.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Logging is explicitly enabled via `#log=D`, where D >= 2.
 *
 * @return {!Log}
 */

function dev() {
  if (logs.dev) {
    return logs.dev;
  }
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }
  return logs.dev = new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);
    if (logNum >= 3) {
      return LogLevel.FINE;
    }
    if (logNum >= 2) {
      return LogLevel.INFO;
    }
    return LogLevel.OFF;
  });
}

},{"./mode":43,"./mode-object":42}],42:[function(require,module,exports){
exports.__esModule = true;
exports.getModeObject = getModeObject;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _mode = require('./mode');

/**
 * Provides info about the current app. This return value may be cached and
 * passed around as it will always be DCE'd.
 * @param {?Window=} opt_win
 * @return {!./mode.ModeDef}
 */

function getModeObject(opt_win) {
  return {
    localDev: _mode.getMode(opt_win).localDev,
    development: _mode.getMode(opt_win).development,
    filter: _mode.getMode(opt_win).filter,
    minified: _mode.getMode(opt_win).minified,
    test: _mode.getMode(opt_win).test,
    log: _mode.getMode(opt_win).log,
    version: _mode.getMode(opt_win).version
  };
}

},{"./mode":43}],43:[function(require,module,exports){
exports.__esModule = true;
exports.getMode = getMode;
exports.getFullVersion_ = getFullVersion_;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @typedef {{
 *   localDev: boolean,
 *   development: boolean,
 *   filter: (string|undefined),
 *   minified: boolean,
 *   test: boolean,
 *   log: (string|undefined),
 *   version: string,
 * }}
 */
var ModeDef = undefined;

exports.ModeDef = ModeDef;
/** @typedef {string} */
var version = '1473975717617';

/**
 * `fullVersion` is the prefixed version we serve off of the cdn.
 * The prefix denotes canary(00) or prod(01) or an experiment version ( > 01).
 * @type {string}
 */
var fullVersion = '';

/**
 * A #querySelector query to see if we have any scripts with development paths.
 * @type {string}
 */
var developmentScriptQuery = 'script[src*="/dist/"],script[src*="/base/"]';

/**
 * Provides info about the current app.
 * @param {?Window=} opt_win
 * @return {!ModeDef}
 */

function getMode(opt_win) {
  var win = opt_win || self;
  if (win.AMP_MODE) {
    return win.AMP_MODE;
  }
  return win.AMP_MODE = getMode_(win);
}

/**
 * Provides info about the current app.
 * @param {!Window} win
 * @return {!ModeDef}
 */
function getMode_(win) {
  // For 3p integration code
  if (win.context && win.context.mode) {
    return win.context.mode;
  }

  var IS_DEV = true;

  var isLocalDev = IS_DEV && !!(location.hostname == 'localhost' || location.ancestorOrigins && location.ancestorOrigins[0] && location.ancestorOrigins[0].indexOf('http://localhost:') == 0) && (
  // Filter out localhost running against a prod script.
  // Because all allowed scripts are ours, we know that these can only
  // occur during local dev.
  !win.document || !!win.document.querySelector(developmentScriptQuery));

  var developmentQuery = parseQueryString_(
  // location.originalHash is set by the viewer when it removes the fragment
  // from the URL.
  location.originalHash || location.hash);

  if (!fullVersion) {
    fullVersion = getFullVersion_(win, isLocalDev);
  }

  // The `minified`, `test` and `localDev` properties are replaced
  // as boolean literals when we run `gulp dist` without the `--fortesting`
  // flags. This improved DCE on the production file we deploy as the code
  // paths for localhost/testing/development are eliminated.
  return {
    localDev: isLocalDev,
    // Triggers validation
    development: !!(developmentQuery['development'] == '1' || win.AMP_DEV_MODE),
    // Allows filtering validation errors by error category. For the
    // available categories, see ErrorCategory in validator/validator.proto.
    filter: developmentQuery['filter'],
    /* global process: false */
    minified: !IS_DEV || undefined == 'production',
    test: IS_DEV && !!(win.AMP_TEST || win.__karma__),
    log: developmentQuery['log'],
    version: fullVersion
  };
}

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 * @param {string} queryString
 * @return {!Object<string, string>}
 * TODO(dvoytenko): dedupe with `url.js:parseQueryString`. This is currently
 * necessary here because `url.js` itself inderectly depends on `mode.js`.
 */
function parseQueryString_(queryString) {
  var params = Object.create(null);
  if (!queryString) {
    return params;
  }
  if (queryString.indexOf('?') == 0 || queryString.indexOf('#') == 0) {
    queryString = queryString.substr(1);
  }
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eqIndex = pair.indexOf('=');
    var _name = undefined;
    var value = undefined;
    if (eqIndex != -1) {
      _name = decodeURIComponent(pair.substring(0, eqIndex)).trim();
      value = decodeURIComponent(pair.substring(eqIndex + 1)).trim();
    } else {
      _name = decodeURIComponent(pair).trim();
      value = '';
    }
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Retrieve the `fullVersion` which will have a numeric prefix
 * denoting canary/prod/experiment.
 *
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 * @private
 * @visibleForTesting
 */

function getFullVersion_(win, isLocalDev) {
  // If it's local dev then we won't actually have a full version so
  // just use the version.
  if (isLocalDev) {
    return version;
  }

  if (win.AMP_CONFIG && win.AMP_CONFIG.v) {
    return win.AMP_CONFIG.v;
  }

  return version;
}

},{}],44:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * This class helps to manage observers. Observers can be added, removed or
 * fired through and instance of this class.
 * @template TYPE
 */

var Observable = (function () {
  function Observable() {
    babelHelpers.classCallCheck(this, Observable);

    /** @const {!Array<function(TYPE)>} */
    this.handlers_ = [];
  }

  /**
   * Adds the observer to this instance.
   * @param {function(TYPE)} handler Observer's handler.
   * @return {!UnlistenDef}
   */

  Observable.prototype.add = function add(handler) {
    var _this = this;

    this.handlers_.push(handler);
    return function () {
      _this.remove(handler);
    };
  };

  /**
   * Removes the observer from this instance.
   * @param {function(TYPE)} handler Observer's instance.
   */

  Observable.prototype.remove = function remove(handler) {
    var index = this.handlers_.indexOf(handler);
    if (index > -1) {
      this.handlers_.splice(index, 1);
    }
  };

  /**
   * Removes all observers.
   */

  Observable.prototype.removeAll = function removeAll() {
    this.handlers_.length = 0;
  };

  /**
   * Fires an event. All observers are called.
   * @param {TYPE=} opt_event
   */

  Observable.prototype.fire = function fire(opt_event) {
    var handlers = this.handlers_;
    for (var i = 0; i < handlers.length; i++) {
      var handler = handlers[i];
      handler(opt_event);
    }
  };

  /**
   * Returns number of handlers. Mostly needed for tests.
   * @return {number}
   */

  Observable.prototype.getHandlerCount = function getHandlerCount() {
    return this.handlers_.length;
  };

  return Observable;
})();

exports.Observable = Observable;

},{}],45:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _timer = require('./timer');

/**
 * Pass class helps to manage single-pass process. A pass is scheduled using
 * delay method. Only one pass can be pending at a time. If no pass is pending
 * the process is considered to be "idle".
 */

var Pass = (function () {

  /**
   * Creates a new Pass instance.
   * @param {!Window} win
   * @param {function()} handler Handler to be executed when pass is triggered.
   * @param {number=} opt_defaultDelay Default delay to be used when schedule
   *   is called without one.
   */

  function Pass(win, handler, opt_defaultDelay) {
    var _this = this;

    babelHelpers.classCallCheck(this, Pass);

    this.timer_ = _timer.timerFor(win);

    /** @private @const {function()} */
    this.handler_ = handler;

    /** @private @const {number} */
    this.defaultDelay_ = opt_defaultDelay || 0;

    /** @private {number|string} */
    this.scheduled_ = -1;

    /** @private {number} */
    this.nextTime_ = 0;

    /** @private {boolean} */
    this.running_ = false;

    /** @private @const */
    this.boundPass_ = function () {
      return _this.pass_();
    };
  }

  /**
   * Whether or not a pass is currently pending.
   * @return {boolean}
   */

  Pass.prototype.isPending = function isPending() {
    return this.scheduled_ != -1;
  };

  /**
   * Tries to schedule a new pass optionally with specified delay. If the new
   * requested pass is requested before the pending pass, the pending pass is
   * canceled. If the new pass is requested after the pending pass, the newly
   * requested pass is ignored.
   *
   * Returns {@code true} if the pass has been scheduled and {@code false} if
   * ignored.
   *
   * @param {number=} opt_delay Delay to schedule the pass. If not specified
   *   the default delay is used, falling back to 0.
   * @return {boolean}
   */

  Pass.prototype.schedule = function schedule(opt_delay) {
    var delay = opt_delay || this.defaultDelay_;
    if (this.running_ && delay < 10) {
      // If we get called recursively, wait at least 10ms for the next
      // execution.
      delay = 10;
    }

    var nextTime = Date.now() + delay;
    // Schedule anew if nothing is scheduled currently or if the new time is
    // sooner then previously requested.
    if (!this.isPending() || nextTime - this.nextTime_ < -10) {
      this.cancel();
      this.nextTime_ = nextTime;
      this.scheduled_ = this.timer_.delay(this.boundPass_, delay);

      return true;
    }

    return false;
  };

  Pass.prototype.pass_ = function pass_() {
    this.scheduled_ = -1;
    this.nextTime_ = 0;
    this.running_ = true;
    this.handler_();
    this.running_ = false;
  };

  /**
   * Cancels the pending pass if any.
   */

  Pass.prototype.cancel = function cancel() {
    if (this.isPending()) {
      this.timer_.cancel(this.scheduled_);
      this.scheduled_ = -1;
    }
  };

  return Pass;
})();

exports.Pass = Pass;

},{"./timer":86}],46:[function(require,module,exports){
exports.__esModule = true;
exports.performanceFor = performanceFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/performance-impl.Performance}
 */

function performanceFor(window) {
  return (/** @type {!./service/performance-impl.Performance}*/_service.getExistingServiceForWindow(window, 'performance')
  );
}

;

},{"./service":56}],47:[function(require,module,exports){
exports.__esModule = true;
exports.platformFor = platformFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/platform-impl.Platform}
 */

function platformFor(window) {
  return (/** @type {!./service/platform-impl.Platform} */_service.getExistingServiceForWindow(window, 'platform')
  );
}

;

},{"./service":56}],48:[function(require,module,exports){
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

require('document-register-element/build/document-register-element.max');

var _polyfillsMathSign = require('./polyfills/math-sign');

var _polyfillsObjectAssign = require('./polyfills/object-assign');

var _polyfillsPromise = require('./polyfills/promise');

_polyfillsMathSign.install(self);
_polyfillsObjectAssign.install(self);
_polyfillsPromise.install(self);

},{"./polyfills/math-sign":49,"./polyfills/object-assign":50,"./polyfills/promise":51,"document-register-element/build/document-register-element.max":5}],49:[function(require,module,exports){
exports.__esModule = true;
exports.sign = sign;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Parses the number x and returns its sign. For positive x returns 1, for
 * negative, -1. For 0 and -0, returns 0 and -0 respectively. For any number
 * that parses to NaN, returns NaN.
 *
 * @param {number} x
 * @returns {number}
 */

function sign(x) {
  x = Number(x);

  // If x is 0, -0, or NaN, return it.
  if (!x) {
    return x;
  }

  return x > 0 ? 1 : -1;
}

;

/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Math.sign) {
    win.Math.sign = sign;
  }
}

},{}],50:[function(require,module,exports){
exports.__esModule = true;
exports.assign = assign;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Copies values of all enumerable own properties from one or more source
 * objects (provided as extended arguments to the function) to a target object.
 *
 * @param {!Object} target
 * @returns {!Object}
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

function assign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          output[key] = source[key];
        }
      }
    }
  }
  return output;
}

/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Object.assign) {
    win.Object.assign = assign;
  }
}

},{}],51:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _promisePjsPromise = require('promise-pjs/promise');

var Promise = babelHelpers.interopRequireWildcard(_promisePjsPromise);

/**
 * Sets the Promise polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Promise) {
    win.Promise = /** @type {?} */Promise;
    // In babel the * export is an Object with a default property.
    // In closure compiler it is the Promise function itself.
    if (Promise['default']) {
      win.Promise = Promise['default'];
    }
    // We copy the individual static methods, because closure
    // compiler flattens the polyfill namespace.
    win.Promise.resolve = Promise.resolve;
    win.Promise.reject = Promise.reject;
    win.Promise.all = Promise.all;
    win.Promise.race = Promise.race;
  }
}

},{"promise-pjs/promise":6}],52:[function(require,module,exports){
exports.__esModule = true;
exports.preconnectFor = preconnectFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Provides a services to preconnect to a url to warm up the
 * connection before the real request can be made.
 */

var _service = require('./service');

var _url2 = require('./url');

var _timer = require('./timer');

var _platform = require('./platform');

var _viewer = require('./viewer');

var _log = require('./log');

var ACTIVE_CONNECTION_TIMEOUT_MS = 180 * 1000;
var PRECONNECT_TIMEOUT_MS = 10 * 1000;

var Preconnect = (function () {

  /**
   * @param {!Window} win
   */

  function Preconnect(win) {
    babelHelpers.classCallCheck(this, Preconnect);

    /** @private @const {!Document} */
    this.document_ = win.document;

    /** @private @const {!Element} */
    this.head_ = _log.dev().assertElement(win.document.head);
    /**
     * Origin we've preconnected to and when that connection
     * expires as a timestamp in MS.
     * @private @const {!Object<string, number>}
     */
    this.origins_ = {};
    /**
     * Urls we've prefetched.
     * @private @const {!Object<string, boolean>}
     */
    this.urls_ = {};
    /** @private @const {!./service/platform-impl.Platform}  */
    this.platform_ = _platform.platformFor(win);
    // Mark current origin as preconnected.
    this.origins_[_url2.parseUrl(win.location.href).origin] = true;

    /**
     * Detect support for the given resource hints.
     * Unfortunately not all browsers support this, so this can only
     * be used as an affirmative signal.
     * @private @const {{
     *   preload: (boolean|undefined),
     *   preconnect: (boolean|undefined)
     * }}
     */
    this.features_ = this.detectFeatures_();

    /** @private @const {!./service/viewer-impl.Viewer} */
    this.viewer_ = _viewer.viewerFor(win);

    /** @private @const {!./service/timer-impl.Timer} */
    this.timer_ = _timer.timerFor(win);
  }

  /**
   * @param {!Window} window
   * @return {!Preconnect}
   */

  /**
   * Preconnects to a URL. Always also does a dns-prefetch because
   * browser support for that is better.
   * @param {string} url
   * @param {boolean=} opt_alsoConnecting Set this flag if you also just
   *    did or are about to connect to this host. This is for the case
   *    where preconnect is issued immediate before or after actual connect
   *    and preconnect is used to flatten a deep HTTP request chain.
   *    E.g. when you preconnect to a host that an embed will connect to
   *    when it is more fully rendered, you already know that the connection
   *    will be used very soon.
   */

  Preconnect.prototype.url = function url(_url, opt_alsoConnecting) {
    if (!this.isInterestingUrl_(_url)) {
      return;
    }
    var origin = _url2.parseUrl(_url).origin;
    var now = Date.now();
    var lastPreconnectTimeout = this.origins_[origin];
    if (lastPreconnectTimeout && now < lastPreconnectTimeout) {
      if (opt_alsoConnecting) {
        this.origins_[origin] = now + ACTIVE_CONNECTION_TIMEOUT_MS;
      }
      return;
    }
    // If we are about to use the connection, don't re-preconnect for
    // 180 seconds.
    var timeout = opt_alsoConnecting ? ACTIVE_CONNECTION_TIMEOUT_MS : PRECONNECT_TIMEOUT_MS;
    this.origins_[origin] = now + timeout;
    // If we know that preconnect is supported, there is no need to do
    // dedicated dns-prefetch.
    var dns = undefined;
    if (!this.features_.preconnect) {
      dns = this.document_.createElement('link');
      dns.setAttribute('rel', 'dns-prefetch');
      dns.setAttribute('href', origin);
      this.head_.appendChild(dns);
    }
    var preconnect = this.document_.createElement('link');
    preconnect.setAttribute('rel', 'preconnect');
    preconnect.setAttribute('href', origin);
    preconnect.setAttribute('referrerpolicy', 'origin');
    this.head_.appendChild(preconnect);

    // Remove the tags eventually to free up memory.
    this.timer_.delay(function () {
      if (dns && dns.parentNode) {
        dns.parentNode.removeChild(dns);
      }
      if (preconnect.parentNode) {
        preconnect.parentNode.removeChild(preconnect);
      }
    }, 10000);

    this.preconnectPolyfill_(origin);
  };

  /**
   * Asks the browser to preload a URL. Always also does a preconnect
   * because browser support for that is better.
   *
   * @param {string} url
   * @param {string=} opt_preloadAs
   */

  Preconnect.prototype.preload = function preload(url, opt_preloadAs) {
    var _this = this;

    if (!this.isInterestingUrl_(url)) {
      return;
    }
    if (this.urls_[url]) {
      return;
    }
    var command = this.features_.preload ? 'preload' : 'prefetch';
    this.urls_[url] = true;
    this.url(url, /* opt_alsoConnecting */true);
    this.viewer_.whenFirstVisible().then(function () {
      var preload = _this.document_.createElement('link');
      preload.setAttribute('rel', command);
      preload.setAttribute('href', url);
      preload.setAttribute('referrerpolicy', 'origin');
      // Do not set 'as' attribute for now, for 2 reasons
      // - document value is not yet supported and dropped
      // - script is blocked due to CSP.
      // if (opt_preloadAs) {
      //  preload.setAttribute('as', opt_preloadAs);
      // }
      _this.head_.appendChild(preload);
      // As opposed to preconnect we do not clean this tag up, because there is
      // no expectation as to it having an immediate effect.
    });
  };

  /**
   * Skips over non HTTP/HTTPS URL.
   * @param {string} url
   * @return {boolean}
   */

  Preconnect.prototype.isInterestingUrl_ = function isInterestingUrl_(url) {
    if (url.indexOf('https:') == 0 || url.indexOf('http:') == 0) {
      return true;
    }
    return false;
  };

  /**
   * Detect related features if feature detection is supported by the
   * browser. Even if this fails, the browser may support the feature.
   * @return {{
   *   preload: (boolean|undefined),
   *   preconnect: (boolean|undefined)
   * }}
   * @private
   */

  Preconnect.prototype.detectFeatures_ = function detectFeatures_() {
    var tokenList = this.document_.createElement('link')['relList'];
    if (!tokenList || !tokenList.supports) {
      return {};
    }
    return {
      preconnect: tokenList.supports('preconnect'),
      preload: tokenList.supports('preload')
    };
  };

  /**
   * Safari does not support preconnecting, but due to its significant
   * performance benefits we implement this crude polyfill.
   *
   * We make an image connection to a "well-known" file on the origin adding
   * a random query string to bust the cache (no caching because we do want to
   * actually open the connection).
   *
   * This should get us an open SSL connection to these hosts and significantly
   * speed up the next connections.
   *
   * The actual URL is expected to 404. If you see errors for
   * amp_preconnect_polyfill in your DevTools console or server log:
   * This is expected and fine to leave as is. Its fine to send a non 404
   * response, but please make it small :)
   */

  Preconnect.prototype.preconnectPolyfill_ = function preconnectPolyfill_(origin) {
    var _this2 = this;

    // Unfortunately there is no reliable way to feature detect whether
    // preconnect is supported, so we do this only in Safari, which is
    // the most important browser without support for it.
    if (this.features_.preconnect || !this.platform_.isSafari()) {
      return;
    }

    this.viewer_.whenFirstVisible().then(function () {
      // Don't attempt to preconnect for ACTIVE_CONNECTION_TIMEOUT_MS since
      // we effectively create an active connection.
      // TODO(@cramforce): Confirm actual http2 timeout in Safari.
      _this2.origins_[origin] = Date.now() + ACTIVE_CONNECTION_TIMEOUT_MS;
      var url = origin + '/amp_preconnect_polyfill_404_or_other_error_expected.' + '_Do_not_worry_about_it?' + Math.random();
      // We use an XHR without withCredentials(true), so we do not send cookies
      // to the host and the host cannot set cookies.
      var xhr = new XMLHttpRequest();
      xhr.open('HEAD', url, true);

      xhr.send();
    });
  };

  return Preconnect;
})();

exports.Preconnect = Preconnect;

function preconnectFor(window) {
  return _service.fromClass(window, 'preconnect', Preconnect);
}

;

},{"./log":41,"./platform":47,"./service":56,"./timer":86,"./url":90,"./viewer":96}],53:[function(require,module,exports){
exports.__esModule = true;
exports.waitForServices = waitForServices;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

var _service = require('./service');

var _timer = require('./timer');

/**
 * A map of services that delay rendering. The key is the name of the service
 * and the value is a DOM query which is used to check if the service is needed
 * in the current document.
 * Do not add a service unless absolutely necessary.
 * @const {!Object<string, string>}
 */
var SERVICES = {
  'amp-accordion': '[custom-element=amp-accordion]',
  'amp-dynamic-css-classes': '[custom-element=amp-dynamic-css-classes]',
  'variant': 'amp-experiment'
};

/**
 * Maximum milliseconds to wait for all extensions to load before erroring.
 * @const
 */
var LOAD_TIMEOUT = 3000;

/**
 * Detects any render delaying services that are required on the page,
 * and returns a promise with a timeout.
 * @param {!Window} win
 * @return {!Promise}
 */

function waitForServices(win) {
  var promises = includedServices(win).map(function (service) {
    return _timer.timerFor(win).timeoutPromise(LOAD_TIMEOUT, _service.getServicePromise(win, service), 'Render timeout waiting for service ' + service + ' to be ready.');
  });
  return Promise.all(promises);
}

/**
 * Detects which, if any, render-delaying extensions are included on the page.
 * @param {!Window} win
 * @return {!Array<string>}
 * @private
 */
function includedServices(win) {
  var doc = win.document;
  _log.dev().assert(doc.body);

  return Object.keys(SERVICES).filter(function (service) {
    return doc.querySelector(SERVICES[service]);
  });
}

},{"./log":41,"./service":56,"./timer":86}],54:[function(require,module,exports){
exports.__esModule = true;
exports.resourcesForDoc = resourcesForDoc;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/resources-impl.Resources}
 */

function resourcesForDoc(nodeOrDoc) {
  return (/** @type {!./service/resources-impl.Resources} */_service.getExistingServiceForDoc(nodeOrDoc, 'resources')
  );
}

;

},{"./service":56}],55:[function(require,module,exports){
exports.__esModule = true;
exports.installRuntimeServices = installRuntimeServices;
exports.installAmpdocServices = installAmpdocServices;
exports.installBuiltins = installBuiltins;
exports.adopt = adopt;
exports.adoptShadowMode = adoptShadowMode;
exports.registerForUnitTest = registerForUnitTest;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _baseElement = require('./base-element');

var _serviceTemplateImpl = require('./service/template-impl');

var _serviceExtensionsImpl = require('./service/extensions-impl');

var _ampdoc = require('./ampdoc');

var _buildCss = require('../build/css');

var _log = require('./log');

var _service = require('./service');

var _dom = require('./dom');

var _shadowEmbed = require('./shadow-embed');

var _mode = require('./mode');

var _serviceActionImpl = require('./service/action-impl');

var _documentSubmit = require('./document-submit');

var _extensions = require('./extensions');

var _serviceHistoryImpl = require('./service/history-impl');

var _servicePlatformImpl = require('./service/platform-impl');

var _serviceResourcesImpl = require('./service/resources-impl');

var _serviceAmpdocImpl = require('./service/ampdoc-impl');

var _serviceStandardActionsImpl = require('./service/standard-actions-impl');

var _serviceStorageImpl = require('./service/storage-impl');

var _styleInstaller = require('./style-installer');

var _serviceTimerImpl = require('./service/timer-impl');

var _serviceUrlReplacementsImpl = require('./service/url-replacements-impl');

var _serviceVideoManagerImpl = require('./service/video-manager-impl');

var _serviceViewerImpl = require('./service/viewer-impl');

var _serviceViewportImpl = require('./service/viewport-impl');

var _serviceVsyncImpl = require('./service/vsync-impl');

var _serviceXhrImpl = require('./service/xhr-impl');

var _experiments = require('./experiments');

var _platform = require('./platform');

var _customElement = require('./custom-element');

var _extendedElement = require('./extended-element');

var _resources = require('./resources');

var _style = require('./style');

var _viewer = require('./viewer');

var _viewport = require('./viewport');

var _config = require('./config');

var config = babelHelpers.interopRequireWildcard(_config);

_log.initLogConstructor();

/** @const @private {string} */
var TAG = 'runtime';

/** @type {!Object} */
var elementsForTesting = {};

/**
 * Install runtime-level services.
 * @param {!Window} global Global scope to adopt.
 */

function installRuntimeServices(global) {
  // TODO(dvoytenko, #3742): Split into runtime and ampdoc services.
  _servicePlatformImpl.installPlatformService(global);
  _serviceTimerImpl.installTimerService(global);
  _serviceViewerImpl.installViewerService(global);
  _serviceViewportImpl.installViewportService(global);
  _serviceHistoryImpl.installHistoryService(global);
  _serviceStorageImpl.installStorageService(global);
  _serviceVsyncImpl.installVsyncService(global);
  _serviceUrlReplacementsImpl.installUrlReplacementsService(global);
  _serviceXhrImpl.installXhrService(global);
  _serviceTemplateImpl.installTemplatesService(global);
  if (_experiments.isExperimentOn(global, 'form-submit')) {
    _documentSubmit.installGlobalSubmitListener(global);
  }
}

/**
 * Install ampdoc-level services.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 */

function installAmpdocServices(ampdoc) {
  // TODO(dvoytenko, #3742): Split into runtime and ampdoc services.
  _serviceResourcesImpl.installResourcesServiceForDoc(ampdoc);
  _serviceActionImpl.installActionServiceForDoc(ampdoc);
  _serviceStandardActionsImpl.installStandardActionsForDoc(ampdoc);
  _serviceVideoManagerImpl.installVideoManagerForDoc(ampdoc);
}

/**
 * Install builtins.
 * @param {!Window} global Global scope to adopt.
 */

function installBuiltins(global) {
  _serviceExtensionsImpl.installBuiltinElements(global);
}

/**
 * Applies the runtime to a given global scope for a single-doc mode.
 * Multi frame support is currently incomplete.
 * @param {!Window} global Global scope to adopt.
 * @param {!{
 *     registerElement: function(
 *         !Window,
 *         !./service/extensions-impl.Extensions,
 *         string, !Function, (string|undefined)),
 *     registerServiceForDoc: function(
 *         !Window,
 *         !./service/extensions-impl.Extensions,
 *         string,
 *         (function(new:Object, !./service/ampdoc-impl.AmpDoc)|undefined),
 *         (function(!./service/ampdoc-impl.AmpDoc):!Object|undefined)),
 *   }} opts
 * @param {function(!Window, !./service/extensions-impl.Extensions)} callback
 */
function adoptShared(global, opts, callback) {

  // Tests can adopt the same window twice. sigh.
  if (global.AMP_TAG) {
    return;
  }
  global.AMP_TAG = true;
  // If there is already a global AMP object we assume it is an array
  // of functions
  var preregisteredExtensions = global.AMP || [];

  var extensions = _serviceExtensionsImpl.installExtensionsService(global);
  installRuntimeServices(global);

  global.AMP = {
    win: global
  };

  /** @const */
  global.AMP.config = config;

  /** @const */
  global.AMP.BaseElement = _baseElement.BaseElement;

  /** @const */
  global.AMP.BaseTemplate = _serviceTemplateImpl.BaseTemplate;

  /**
   * Registers an extended element and installs its styles.
   * @const
   */
  global.AMP.registerElement = opts.registerElement.bind(null, global, extensions);

  /**
   * Registers an extended template.
   * @param {string} name
   * @param {!Function} implementationClass
   */
  global.AMP.registerTemplate = function (name, implementationClass) {
    _serviceTemplateImpl.registerExtendedTemplate(global, name, implementationClass);
  };

  /**
   * Registers an ampdoc service.
   * @const
   */
  global.AMP.registerServiceForDoc = opts.registerServiceForDoc.bind(null, global, extensions);

  // Experiments.
  /** @const */
  global.AMP.isExperimentOn = _experiments.isExperimentOn.bind(null, global);
  /** @const */
  global.AMP.toggleExperiment = _experiments.toggleExperiment.bind(null, global);

  /**
   * Sets the function to forward tick events to.
   * @param {function(string,?string=,number=)} fn
   * @param {function()=} opt_flush
   * @deprecated
   * @export
   */
  global.AMP.setTickFunction = function (fn, opt_flush) {};

  // Run specific setup for a single-doc or shadow-doc mode.
  callback(global, extensions);

  /**
   * @param {function(!Object)|{n:string, f:function(!Object)}} fnOrStruct
   */
  function installExtension(fnOrStruct) {
    if (typeof fnOrStruct == 'function') {
      fnOrStruct(global.AMP);
    } else {
      _serviceExtensionsImpl.registerExtension(extensions, fnOrStruct.n, fnOrStruct.f, global.AMP);
    }
  }

  /**
   * Certain extensions can be auto-loaded by runtime based on experiments or
   * other configurations.
   */
  function installAutoLoadExtensions() {
    if (!_mode.getMode().test && _experiments.isExperimentOn(global, 'amp-lightbox-viewer-auto')) {
      _extensions.extensionsFor(global).loadExtension('amp-lightbox-viewer');
    }
  }

  /**
   * Registers a new custom element.
   * @param {function(!Object)|{n:string, f:function(!Object)}} fnOrStruct
   */
  global.AMP.push = function (fnOrStruct) {
    // Extensions are only processed once HEAD is complete.
    _dom.waitForBody(global.document, function () {
      installExtension(fnOrStruct);
    });
  };

  // Execute asynchronously scheduled elements.
  // Extensions are only processed once HEAD is complete.
  _dom.waitForBody(global.document, function () {
    for (var i = 0; i < preregisteredExtensions.length; i++) {
      var fnOrStruct = preregisteredExtensions[i];
      try {
        installExtension(fnOrStruct);
      } catch (e) {
        // Throw errors outside of loop in its own micro task to
        // avoid on error stopping other extensions from loading.
        _log.dev().error(TAG, 'Extension failed: ', e, fnOrStruct.n);
      }
    }

    installAutoLoadExtensions();

    // Make sure we empty the array of preregistered extensions.
    // Technically this is only needed for testing, as everything should
    // go out of scope here, but just making sure.
    preregisteredExtensions.length = 0;
  });

  // For iOS we need to set `cursor:pointer` to ensure that click events are
  // delivered.
  if (_platform.platformFor(global).isIos()) {
    _style.setStyle(global.document.documentElement, 'cursor', 'pointer');
  }
}

/**
 * Applies the runtime to a given global scope for a single-doc mode.
 * Multi frame support is currently incomplete.
 * @param {!Window} global Global scope to adopt.
 */

function adopt(global) {
  adoptShared(global, {
    registerElement: prepareAndRegisterElement,
    registerServiceForDoc: prepareAndRegisterServiceForDoc
  }, function (global) {
    var viewer = _viewer.viewerFor(global);

    /** @const */
    global.AMP.viewer = viewer;

    if (_mode.getMode().development) {
      /** @const */
      global.AMP.toggleRuntime = viewer.toggleRuntime.bind(viewer);
      /** @const */
      global.AMP.resources = _resources.resourcesForDoc(global.document);
    }

    var viewport = _viewport.viewportFor(global);

    /** @const */
    global.AMP.viewport = {};
    global.AMP.viewport.getScrollLeft = viewport.getScrollLeft.bind(viewport);
    global.AMP.viewport.getScrollWidth = viewport.getScrollWidth.bind(viewport);
    global.AMP.viewport.getWidth = viewport.getWidth.bind(viewport);
  });
}

/**
 * Applies the runtime to a given global scope for shadow mode.
 * @param {!Window} global Global scope to adopt.
 */

function adoptShadowMode(global) {
  adoptShared(global, {
    registerElement: prepareAndRegisterElementShadowMode,
    registerServiceForDoc: prepareAndRegisterServiceForDocShadowMode
  }, function (global, extensions) {
    /**
     * Registers a shadow root document.
     * @param {!Element} hostElement
     * @param {!Document} doc
     * @param {string} url
     */
    global.AMP.attachShadowDoc = prepareAndAttachShadowDoc.bind(null, global, extensions);
  });
}

/**
 * Registers an extended element and installs its styles in a single-doc mode.
 * @param {!Window} global
 * @param {!./service/extensions-impl.Extensions} extensions
 * @param {string} name
 * @param {!Function} implementationClass
 * @param {string=} opt_css
 */
function prepareAndRegisterElement(global, extensions, name, implementationClass, opt_css) {
  _serviceExtensionsImpl.addElementToExtension(extensions, name, implementationClass, opt_css);
  if (opt_css) {
    _styleInstaller.installStyles(global.document, opt_css, function () {
      registerElementClass(global, name, implementationClass, opt_css);
    }, false, name);
  } else {
    registerElementClass(global, name, implementationClass, opt_css);
  }
}

/**
 * Registers an extended element and installs its styles in a shodow-doc mode.
 * @param {!Window} global
 * @param {!./service/extensions-impl.Extensions} extensions
 * @param {string} name
 * @param {!Function} implementationClass
 * @param {string=} opt_css
 */
function prepareAndRegisterElementShadowMode(global, extensions, name, implementationClass, opt_css) {
  _serviceExtensionsImpl.addElementToExtension(extensions, name, implementationClass, opt_css);
  registerElementClass(global, name, implementationClass, opt_css);
  if (opt_css) {
    _serviceExtensionsImpl.addShadowRootFactoryToExtension(extensions, function (shadowRoot) {
      _shadowEmbed.installStylesForShadowRoot(shadowRoot, _log.dev().assertString(opt_css),
      /* isRuntimeCss */false, name);
    });
  }
}

/**
 * Registration steps for an extension element in both single- and shadow-doc
 * modes.
 * @param {!Window} global
 * @param {string} name
 * @param {!Function} implementationClass
 * @param {string=} opt_css
 */
function registerElementClass(global, name, implementationClass, opt_css) {
  _extendedElement.registerExtendedElement(global, name, implementationClass);
  if (_mode.getMode().test) {
    elementsForTesting[name] = {
      name: name,
      implementationClass: implementationClass,
      css: opt_css
    };
  }
  // Resolve this extension's Service Promise.
  _service.getService(global, name, emptyService);
}

/**
 * Registers an ampdoc service in a single-doc mode.
 * @param {!Window} global
 * @param {!./service/extensions-impl.Extensions} extensions
 * @param {string} name
 * @param {function(new:Object, !./service/ampdoc-impl.AmpDoc)=} opt_ctor
 * @param {function(!./service/ampdoc-impl.AmpDoc):!Object=} opt_factory
 */
function prepareAndRegisterServiceForDoc(global, extensions, name, opt_ctor, opt_factory) {
  var ampdocService = _ampdoc.ampdocServiceFor(global);
  var ampdoc = ampdocService.getAmpDoc();
  registerServiceForDoc(ampdoc, name, opt_ctor, opt_factory);
}

/**
 * Registers an ampdoc service in a shadow-doc mode.
 * @param {!Window} global
 * @param {!./service/extensions-impl.Extensions} extensions
 * @param {string} name
 * @param {function(new:Object, !./service/ampdoc-impl.AmpDoc)=} opt_ctor
 * @param {function(!./service/ampdoc-impl.AmpDoc):!Object=} opt_factory
 */
function prepareAndRegisterServiceForDocShadowMode(global, extensions, name, opt_ctor, opt_factory) {
  _serviceExtensionsImpl.addDocFactoryToExtension(extensions, function (ampdoc) {
    registerServiceForDoc(ampdoc, name, opt_ctor, opt_factory);
  }, name);
}

/**
 * Registration steps for an ampdoc service in both single- and shadow-doc
 * modes.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 * @param {string} name
 * @param {function(new:Object, !./service/ampdoc-impl.AmpDoc)=} opt_ctor
 * @param {function(!./service/ampdoc-impl.AmpDoc):!Object=} opt_factory
 */
function registerServiceForDoc(ampdoc, name, opt_ctor, opt_factory) {
  _log.dev().assert((opt_ctor || opt_factory) && (!opt_ctor || !opt_factory), 'Only one: a class or a factory must be specified');
  if (opt_ctor) {
    _service.fromClassForDoc(ampdoc, name, opt_ctor);
  } else {
    _service.getServiceForDoc(ampdoc, name, opt_factory);
  }
}

/**
 * Attaches the shadow doc and configures ampdoc for it.
 * @param {!Window} global
 * @param {!./service/extensions-impl.Extensions} extensions
 * @param {!Element} hostElement
 * @param {!Document} doc
 * @param {string} url
 */
function prepareAndAttachShadowDoc(global, extensions, hostElement, doc, url) {
  _log.dev().fine(TAG, 'Attach shadow doc:', doc);
  var ampdocService = _ampdoc.ampdocServiceFor(global);

  hostElement.style.visibility = 'hidden';
  var shadowRoot = _shadowEmbed.createShadowRoot(hostElement);

  shadowRoot.AMP = {};
  shadowRoot.AMP.url = url;

  var ampdoc = _serviceAmpdocImpl.installShadowDoc(ampdocService, url, shadowRoot);
  _log.dev().fine(TAG, 'Attach to shadow root:', shadowRoot, ampdoc);

  // Install runtime CSS.
  _shadowEmbed.installStylesForShadowRoot(shadowRoot, _buildCss.cssText, /* opt_isRuntimeCss */true);

  // Instal doc services.
  installAmpdocServices(ampdoc);

  // Install extensions.
  var extensionIds = mergeShadowHead(global, extensions, shadowRoot, doc);

  // Apply all doc extensions.
  _serviceExtensionsImpl.installExtensionsInShadowDoc(extensions, ampdoc, extensionIds);

  // Append body.
  if (doc.body) {
    var body = _shadowEmbed.importShadowBody(shadowRoot, doc.body);
    body.classList.add('amp-shadow');
    shadowRoot.appendChild(body);
    _serviceAmpdocImpl.shadowDocHasBody(ampdoc, body);
  }

  // Document is ready.
  _serviceAmpdocImpl.shadowDocReady(ampdoc);

  // TODO(dvoytenko): find a better and more stable way to make content visible.
  // E.g. integrate with dynamic classes. In shadow case specifically, we have
  // to wait for stubbing to complete, which may take awhile due to importNode.
  global.setTimeout(function () {
    hostElement.style.visibility = 'visible';
  }, 50);

  _log.dev().fine(TAG, 'Shadow root initialization is done:', shadowRoot, ampdoc);
  return shadowRoot.AMP;
}

/**
 * Processes the contents of the shadow document's head.
 * @param {!Window} global
 * @param {!./service/extensions-impl.Extensions} extensions
 * @param {!ShadowRoot} shadowRoot
 * @param {!Document} doc
 * @return {!Array<string>}
 */
function mergeShadowHead(global, extensions, shadowRoot, doc) {
  var extensionIds = [];
  if (doc.head) {
    (function () {
      var parentLinks = {};
      _dom.childElementsByTag(_log.dev().assertElement(global.document.head), 'link').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href) {
          parentLinks[href] = true;
        }
      });

      for (var n = doc.head.firstElementChild; n; n = n.nextElementSibling) {
        var tagName = n.tagName;
        var _name = n.getAttribute('name');
        var rel = n.getAttribute('rel');
        if (n.tagName == 'TITLE') {
          shadowRoot.AMP.title = n.textContent;
          _log.dev().fine(TAG, '- set title: ', shadowRoot.AMP.title);
        } else if (tagName == 'META' && n.hasAttribute('charset')) {
          // Ignore.
        } else if (tagName == 'META' && _name == 'viewport') {
            // Ignore.
          } else if (tagName == 'META') {
              // TODO(dvoytenko): copy other meta tags.
              _log.dev().warn(TAG, 'meta ignored: ', n);
            } else if (tagName == 'LINK' && rel == 'canonical') {
              shadowRoot.AMP.canonicalUrl = n.getAttribute('href');
              _log.dev().fine(TAG, '- set canonical: ', shadowRoot.AMP.canonicalUrl);
            } else if (tagName == 'LINK' && rel == 'stylesheet') {
              // This must be a font definition: no other stylesheets are allowed.
              var href = n.getAttribute('href');
              if (parentLinks[href]) {
                _log.dev().fine(TAG, '- stylesheet already included: ', href);
              } else {
                parentLinks[href] = true;
                var el = global.document.createElement('link');
                el.setAttribute('rel', 'stylesheet');
                el.setAttribute('type', 'text/css');
                el.setAttribute('href', href);
                global.document.head.appendChild(el);
                _log.dev().fine(TAG, '- import font to parent: ', href, el);
              }
            } else if (n.tagName == 'STYLE') {
              if (n.hasAttribute('amp-boilerplate')) {
                // Ignore.
                _log.dev().fine(TAG, '- ignore boilerplate style: ', n);
              } else {
                _shadowEmbed.installStylesForShadowRoot(shadowRoot, n.textContent,
                /* isRuntimeCss */false, 'amp-custom');
                _log.dev().fine(TAG, '- import style: ', n);
              }
            } else if (n.tagName == 'SCRIPT' && n.hasAttribute('src')) {
              _log.dev().fine(TAG, '- src script: ', n);
              var src = n.getAttribute('src');
              var isRuntime = src.indexOf('/amp.js') != -1 || src.indexOf('/v0.js') != -1;
              var customElement = n.getAttribute('custom-element');
              var customTemplate = n.getAttribute('custom-template');
              if (isRuntime) {
                _log.dev().fine(TAG, '- ignore runtime script: ', src);
              } else if (customElement || customTemplate) {
                // This is an extension.
                extensions.loadExtension(customElement || customTemplate);
                _log.dev().fine(TAG, '- load extension: ', customElement || customTemplate);
                if (customElement) {
                  extensionIds.push(customElement);
                }
              } else if (!n.hasAttribute('data-amp-report-test')) {
                _log.user().error(TAG, '- unknown script: ', n, src);
              }
            } else if (n.tagName == 'SCRIPT') {
              // Non-src version of script.
              var type = n.getAttribute('type') || 'application/javascript';
              if (type.indexOf('javascript') == -1) {
                shadowRoot.appendChild(global.document.importNode(n, true));
                _log.dev().fine(TAG, '- non-src script: ', n);
              } else {
                _log.user().error(TAG, '- unallowed inline javascript: ', n);
              }
            } else if (n.tagName == 'NOSCRIPT') {
              // Ignore.
            } else {
                _log.user().error(TAG, '- UNKNOWN head element:', n);
              }
      }
    })();
  }
  return extensionIds;
}

/**
 * @return {!Object}
 */
function emptyService() {
  // All services need to resolve to an object.
  return {};
}

/**
 * Registers all extended elements as normal elements in the given
 * window.
 * Make sure to call `adopt(window)` in your unit test as well and
 * then call this on the generated iframe.
 * @param {!Window} win
 */

function registerForUnitTest(win) {
  var _loop = function (key) {
    var element = elementsForTesting[key];
    if (element.css) {
      _styleInstaller.installStyles(win.document, element.css, function () {
        _customElement.registerElement(win, element.name, element.implementationClass);
      }, false, element.name);
    } else {
      _customElement.registerElement(win, element.name, element.implementationClass);
    }
  };

  for (var key in elementsForTesting) {
    _loop(key);
  }
}

},{"../build/css":1,"./ampdoc":11,"./base-element":13,"./config":15,"./custom-element":18,"./document-submit":22,"./dom":23,"./experiments":28,"./extended-element":30,"./extensions":31,"./log":41,"./mode":43,"./platform":47,"./resources":54,"./service":56,"./service/action-impl":57,"./service/ampdoc-impl":58,"./service/extensions-impl":59,"./service/history-impl":61,"./service/platform-impl":64,"./service/resources-impl":66,"./service/standard-actions-impl":67,"./service/storage-impl":68,"./service/template-impl":70,"./service/timer-impl":71,"./service/url-replacements-impl":72,"./service/video-manager-impl":73,"./service/viewer-impl":74,"./service/viewport-impl":75,"./service/vsync-impl":76,"./service/xhr-impl":77,"./shadow-embed":78,"./style":84,"./style-installer":83,"./viewer":96,"./viewport":97}],56:[function(require,module,exports){
exports.__esModule = true;
exports.getExistingServiceForWindow = getExistingServiceForWindow;
exports.getExistingServiceForDoc = getExistingServiceForDoc;
exports.getService = getService;
exports.fromClass = fromClass;
exports.getServicePromise = getServicePromise;
exports.getServicePromiseOrNull = getServicePromiseOrNull;
exports.getServiceForDoc = getServiceForDoc;
exports.fromClassForDoc = fromClassForDoc;
exports.getServicePromiseForDoc = getServicePromiseForDoc;
exports.getServicePromiseOrNullForDoc = getServicePromiseOrNullForDoc;
exports.setParentWindow = setParentWindow;
exports.getParentWindow = getParentWindow;
exports.getTopWindow = getTopWindow;
exports.getParentWindowFrameElement = getParentWindowFrameElement;
exports.resetServiceForTesting = resetServiceForTesting;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

// Requires polyfills in immediate side effect.

require('./polyfills');

var _log = require('./log');

/**
 * Holds info about a service.
 * - obj: Actual service implementation when available.
 * - promise: Promise for the obj.
 * - resolve: Function to resolve the promise with the object.
 * @typedef {{
 *   obj: (?Object),
 *   promise: (?Promise|undefined),
 *   resolve: (?function(!Object)|undefined),
 * }}
 */
var ServiceHolderDef = undefined;

/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 * @param {!Window} win
 * @param {string} id
 * @return {!Object} The service.
 */

function getExistingServiceForWindow(win, id) {
  win = getTopWindow(win);
  var exists = win.services && win.services[id] && win.services[id].obj;
  return _log.dev().assert(exists, id + ' service not found. Make sure it is ' + 'installed.');
}

/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id
 * @return {!Object} The service.
 */

function getExistingServiceForDoc(nodeOrDoc, id) {
  var serviceHolder = getAmpdocServiceHolder(nodeOrDoc);
  var exists = serviceHolder && serviceHolder.services && serviceHolder.services[id] && serviceHolder.services[id].obj;
  return _log.dev().assert(exists, id + ' doc service not found. Make sure it is ' + 'installed.');
}

/**
 * Returns a service for the given id and window (a per-window singleton).
 * If the service is not yet available the factory function is invoked and
 * expected to return the service.
 * Users should typically wrap this as a special purpose function (e.g.
 * `viewportFor(win)`) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(!Window):T} opt_factory Should create the service
 *     if it does not exist yet. If the factory is not given, it is an error
 *     if the service does not exist yet.
 * @template T
 * @return {T}
 */

function getService(win, id, opt_factory) {
  win = getTopWindow(win);
  return getServiceInternal(win, win, id, opt_factory ? opt_factory : undefined);
}

/**
 * Returns a service and registers it given a class to be used as
 * implementation.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(new:T, !Window)} constructor
 * @return {T}
 * @template T
 */

function fromClass(win, id, constructor) {
  win = getTopWindow(win);
  return getServiceInternal(win, win, id, undefined, constructor);
}

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * `viewportFor(win)`) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {!Promise<*>}
 */

function getServicePromise(win, id) {
  return getServicePromiseInternal(win, id);
}

/**
 * Like getServicePromise but returns null if the service was never registered.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {?Promise<*>}
 */

function getServicePromiseOrNull(win, id) {
  return getServicePromiseOrNullInternal(win, id);
}

/**
 * Returns a service for the given id and ampdoc (a per-ampdoc singleton).
 * If the service is not yet available the factory function is invoked and
 * expected to return the service.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {function(!AmpDoc):!Object=} opt_factory Should create the service
 *     if it does not exist yet. If the factory is not given, it is an error
 *     if the service does not exist yet.
 * @return {*}
 */

function getServiceForDoc(nodeOrDoc, id, opt_factory) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return getServiceInternal(getAmpdocServiceHolder(ampdoc), ampdoc, id, opt_factory);
}

/**
 * Returns a service and registers it given a class to be used as
 * implementation.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} win
 * @param {string} id of the service.
 * @param {function(new:T, !./service/ampdoc-impl.AmpDoc)} constructor
 * @return {T}
 * @template T
 */

function fromClassForDoc(nodeOrDoc, id, constructor) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return getServiceInternal(getAmpdocServiceHolder(ampdoc), ampdoc, id, undefined, constructor);
}

/**
 * Returns a promise for a service for the given id and ampdoc. Also expects
 * a service that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {!Promise<*>}
 */

function getServicePromiseForDoc(nodeOrDoc, id) {
  return getServicePromiseInternal(getAmpdocServiceHolder(nodeOrDoc), id);
}

/**
 * Like getServicePromiseForDoc but returns null if the service was never
 * registered for this ampdoc.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {?Promise<*>}
 */

function getServicePromiseOrNullForDoc(nodeOrDoc, id) {
  return getServicePromiseOrNullInternal(getAmpdocServiceHolder(nodeOrDoc), id);
}

/**
 * Set the parent and top windows on a child window (friendly iframe).
 * @param {!Window} win
 * @param {!Window} parentWin
 */

function setParentWindow(win, parentWin) {
  win.__AMP_PARENT = parentWin;
  win.__AMP_TOP = getTopWindow(parentWin);
}

/**
 * Returns the parent window for a child window (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */

function getParentWindow(win) {
  return win.__AMP_PARENT || win;
}

/**
 * Returns the top window where AMP Runtime is installed for a child window
 * (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */

function getTopWindow(win) {
  return win.__AMP_TOP || win;
}

/**
 * Returns the parent "friendly" iframe if the node belongs to a child window.
 * @param {!Node} node
 * @param {!Window} topWin
 * @return {?HTMLIFrameElement}
 */

function getParentWindowFrameElement(node, topWin) {
  var childWin = (node.ownerDocument || node).defaultView;
  if (childWin && childWin != topWin && getTopWindow(childWin) == topWin) {
    try {
      return (/** @type {?HTMLIFrameElement} */childWin.frameElement
      );
    } catch (e) {
      // Ignore the error.
    }
  }
  return null;
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc}
 */
function getAmpdoc(nodeOrDoc) {
  if (nodeOrDoc.nodeType) {
    var win = (nodeOrDoc.ownerDocument || nodeOrDoc).defaultView;
    return getAmpdocService(win).getAmpDoc(nodeOrDoc);
  }
  return (/** @type {!./service/ampdoc-impl.AmpDoc} */nodeOrDoc
  );
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc|!Window}
 */
function getAmpdocServiceHolder(nodeOrDoc) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return ampdoc.isSingleDoc() ? ampdoc.win : ampdoc;
}

/**
 * This is essentially a duplicate of `ampdoc.js`, but necessary to avoid
 * circular dependencies.
 * @param {!Window} win
 * @return {!./service/ampdoc-impl.AmpDocService}
 */
function getAmpdocService(win) {
  return (/** @type {!./service/ampdoc-impl.AmpDocService} */getService(win, 'ampdoc')
  );
}

/**
 * @param {!Object} holder Object holding the service instance.
 * @param {!Object} context Win or AmpDoc.
 * @param {string} id of the service.
 * @param {!Function=} opt_factory Should create the service
 *     if it does not exist yet. If the factory is not given, it is an error
 *     if the service does not exist yet. Called with context.
 * @param {!Function} opt_constructor Constructor function to new the service.
 *     Called with context.
 * @return {*}
 */
function getServiceInternal(holder, context, id, opt_factory, opt_constructor) {
  var services = getServices(holder);
  var s = services[id];
  if (!s) {
    s = services[id] = {
      obj: null,
      promise: null,
      resolve: null
    };
  }

  if (!s.obj) {
    _log.dev().assert(opt_factory || opt_constructor, 'Factory or class not given and service missing %s', id);
    s.obj = opt_constructor ? new opt_constructor(context) : opt_factory(context);
    // The service may have been requested already, in which case we have a
    // pending promise we need to fulfill.
    if (s.resolve) {
      s.resolve(s.obj);
    }
  }
  return s.obj;
}

/**
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {!Promise<*>}
 */
function getServicePromiseInternal(holder, id) {
  var cached = getServicePromiseOrNullInternal(holder, id);
  if (cached) {
    return cached;
  }
  var services = getServices(holder);

  // TODO(@cramforce): Add a check that if the element is eventually registered
  // that the service is actually provided and this promise resolves.
  var resolve = undefined;
  var p = new Promise(function (r) {
    resolve = r;
  });
  services[id] = {
    obj: null,
    promise: p,
    resolve: resolve
  };

  return p;
}

/**
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {?Promise<*>}
 */
function getServicePromiseOrNullInternal(holder, id) {
  var services = getServices(holder);
  var s = services[id];
  if (s) {
    var p = s.promise;
    if (p) {
      return p;
    }
    if (s.obj) {
      return s.promise = Promise.resolve(s.obj);
    }
    _log.dev().assert(false, 'Expected object or promise to be present');
  }
  return null;
}

/**
 * Returns the object that holds the services registered in a holder.
 * @param {!Object} holder
 * @return {!Object<string,!ServiceHolderDef>}
 */
function getServices(holder) {
  var services = holder.services;
  if (!services) {
    services = holder.services = {};
  }
  return services;
}

/**
 * Resets a single service, so it gets recreated on next getService invocation.
 * @param {!Object} holder
 * @param {string} id of the service.
 */

function resetServiceForTesting(holder, id) {
  if (holder.services) {
    holder.services[id] = null;
  }
}

},{"./log":41,"./polyfills":48}],57:[function(require,module,exports){
exports.__esModule = true;
exports.parseActionMap = parseActionMap;
exports.installActionServiceForDoc = installActionServiceForDoc;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('../log');

var _service = require('../service');

var _mode = require('../mode');

var _timer = require('../timer');

var _vsync = require('../vsync');

var _types = require('../types');

/** @const {string} */
var TAG_ = 'Action';

/** @const {string} */
var ACTION_MAP_ = '__AMP_ACTION_MAP__' + Math.random();

/** @const {string} */
var ACTION_QUEUE_ = '__AMP_ACTION_QUEUE__';

/** @const {string} */
var DEFAULT_METHOD_ = 'activate';

/**
 * @typedef {{
 *   event: string,
 *   target: string,
 *   method: string,
 *   args: ?JSONType,
 *   str: string
 * }}
 */
var ActionInfoDef = undefined;

/**
 * The structure that contains all details of the action method invocation.
 * @struct
 * @const
 * TODO(dvoytenko): add action arguments here as well.
 * @package For type.
 */

var ActionInvocation =
/**
 * @param {!Element} target
 * @param {string} method
 * @param {?JSONType} args
 * @param {?Element} source
 * @param {?Event} event
 */
function ActionInvocation(target, method, args, source, event) {
  babelHelpers.classCallCheck(this, ActionInvocation);

  /** @const {!Element} */
  this.target = target;
  /** @const {string} */
  this.method = method;
  /** @const {?JSONType} */
  this.args = args;
  /** @const {?Element} */
  this.source = source;
  /** @const {?Event} */
  this.event = event;
}

/**
 * TODO(dvoytenko): consider splitting this class into two:
 * 1. A class that has a method "trigger(element, eventType, data)" and
 *    simply can search target in DOM and trigger methods on it.
 * 2. A class that configures event recognizers and rules and then
 *    simply calls action.trigger.
 */
;

exports.ActionInvocation = ActionInvocation;

var ActionService = (function () {

  /**
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   */

  function ActionService(ampdoc) {
    babelHelpers.classCallCheck(this, ActionService);

    /** @const {!./ampdoc-impl.AmpDoc} */
    this.ampdoc = ampdoc;

    /** @const @private {!Object<string, function(!ActionInvocation)>} */
    this.globalMethodHandlers_ = {};

    /** @private {!./vsync-impl.Vsync} */
    this.vsync_ = _vsync.vsyncFor(ampdoc.win);

    // Add core events.
    this.addEvent('tap');
    this.addEvent('submit');
  }

  /**
   * @param {string} s
   * @param {!Element} context
   * @return {?Object<string, ActionInfoDef>}
   * @private Visible for testing only.
   */

  /**
   * @param {string} name
   * TODO(dvoytenko): switch to a system where the event recognizers are
   * registered with Action instead, e.g. "doubletap", "tap to zoom".
   */

  ActionService.prototype.addEvent = function addEvent(name) {
    var _this = this;

    if (name == 'tap') {
      // TODO(dvoytenko): if needed, also configure touch-based tap, e.g. for
      // fast-click.
      this.ampdoc.getRootNode().addEventListener('click', function (event) {
        if (!event.defaultPrevented) {
          _this.trigger(_log.dev().assertElement(event.target), 'tap', event);
        }
      });
    } else if (name == 'submit') {
      this.ampdoc.getRootNode().addEventListener('submit', function (event) {
        _this.trigger(_log.dev().assertElement(event.target), 'submit', event);
      });
    }
  };

  /**
   * Registers the action handler for a common method.
   * @param {string} name
   * @param {function(!ActionInvocation)} handler
   */

  ActionService.prototype.addGlobalMethodHandler = function addGlobalMethodHandler(name, handler) {
    this.globalMethodHandlers_[name] = handler;
  };

  /**
   * Triggers the specified event on the target element.
   * @param {!Element} target
   * @param {string} eventType
   * @param {?Event} event
   */

  ActionService.prototype.trigger = function trigger(target, eventType, event) {
    this.action_(target, eventType, event);
  };

  /**
   * Triggers execution of the method on a target/method.
   * @param {!Element} target
   * @param {string} method
   * @param {?JSONType} args
   * @param {?Element} source
   * @param {?Event} event
   */

  ActionService.prototype.execute = function execute(target, method, args, source, event) {
    this.invoke_(target, method, args, source, event, null);
  };

  /**
   * Installs action handler for the specified element.
   * @param {!Element} target
   * @param {function(!ActionInvocation)} handler
   */

  ActionService.prototype.installActionHandler = function installActionHandler(target, handler) {
    var debugid = target.tagName + '#' + target.id;
    _log.user().assert(target.id && target.id.substring(0, 4) == 'amp-', 'AMP element is expected: %s', debugid);

    var currentQueue = target[ACTION_QUEUE_];
    if (currentQueue) {
      _log.dev().assert(_types.isArray(currentQueue), 'Expected queue to be an array: %s', debugid);
    }

    // Override queue with the handler.
    target[ACTION_QUEUE_] = { 'push': handler };

    // Dequeue the current queue.
    if (currentQueue) {
      _timer.timerFor(target.ownerDocument.defaultView).delay(function () {
        // TODO(dvoytenko, #1260): dedupe actions.
        currentQueue.forEach(function (invocation) {
          try {
            handler(invocation);
          } catch (e) {
            _log.dev().error(TAG_, 'Action execution failed:', invocation, e);
          }
        });
      }, 1);
    }
  };

  /**
   * @param {!Element} source
   * @param {string} actionEventType
   * @param {?Event} event
   * @private
   */

  ActionService.prototype.action_ = function action_(source, actionEventType, event) {
    var action = this.findAction_(source, actionEventType);
    if (!action) {
      // TODO(dvoytenko): implement default (catch-all) actions.
      return;
    }

    var target = this.ampdoc.getElementById(action.actionInfo.target);
    if (!target) {
      this.actionInfoError_('target not found', action.actionInfo, target);
      return;
    }

    this.invoke_(target, action.actionInfo.method, action.actionInfo.args, action.node, event, action.actionInfo);
  };

  /**
   * The errors that are a result of action definition.
   * @param {string} s
   * @param {?ActionInfoDef} actionInfo
   * @param {?Element} target
   * @private
   */

  ActionService.prototype.actionInfoError_ = function actionInfoError_(s, actionInfo, target) {
    // Method not found "activate" on ' + target
    _log.user().assert(false, 'Action Error: ' + s + (actionInfo ? ' in [' + actionInfo.str + ']' : '') + (target ? ' on [' + target + ']' : ''));
  };

  /**
   * @param {!Element} target
   * @param {string} method
   * @param {?JSONType} args
   * @param {?Element} source
   * @param {?Event} event
   * @param {?ActionInfoDef} actionInfo
   */

  ActionService.prototype.invoke_ = function invoke_(target, method, args, source, event, actionInfo) {
    var invocation = new ActionInvocation(target, method, args, source, event);

    // Try a global method handler first.
    if (this.globalMethodHandlers_[invocation.method]) {
      this.globalMethodHandlers_[invocation.method](invocation);
      return;
    }

    // AMP elements.
    if (target.tagName.toLowerCase().substring(0, 4) == 'amp-') {
      if (target.enqueAction) {
        target.enqueAction(invocation);
      } else {
        this.actionInfoError_('Unrecognized AMP element "' + target.tagName.toLowerCase() + '". ' + 'Did you forget to include it via <script custom-element>?', actionInfo, target);
      }
      return;
    }

    // Special elements with AMP ID.
    if (target.id && target.id.substring(0, 4) == 'amp-') {
      if (!target[ACTION_QUEUE_]) {
        target[ACTION_QUEUE_] = [];
      }
      target[ACTION_QUEUE_].push(invocation);
      return;
    }

    // Unsupported target.
    this.actionInfoError_('Target must be an AMP element or have an AMP ID', actionInfo, target);
  };

  /**
   * @param {!Element} target
   * @param {string} actionEventType
   * @return {?{node: !Element, actionInfo: !ActionInfoDef}}
   */

  ActionService.prototype.findAction_ = function findAction_(target, actionEventType) {
    // Go from target up the DOM tree and find the applicable action.
    var n = target;
    var actionInfo = null;
    while (n) {
      actionInfo = this.matchActionInfo_(n, actionEventType);
      if (actionInfo) {
        return { node: n, actionInfo: actionInfo };
      }
      n = n.parentElement;
    }
    return null;
  };

  /**
   * @param {!Element} node
   * @param {string} actionEventType
   * @return {?ActionInfoDef}
   */

  ActionService.prototype.matchActionInfo_ = function matchActionInfo_(node, actionEventType) {
    var actionMap = this.getActionMap_(node);
    if (!actionMap) {
      return null;
    }
    return actionMap[actionEventType] || null;
  };

  /**
   * @param {!Element} node
   * @return {?Object<string, ActionInfoDef>}
   */

  ActionService.prototype.getActionMap_ = function getActionMap_(node) {
    var actionMap = node[ACTION_MAP_];
    if (actionMap === undefined) {
      actionMap = null;
      if (node.hasAttribute('on')) {
        actionMap = parseActionMap(node.getAttribute('on'), node);
      }
      node[ACTION_MAP_] = actionMap;
    }
    return actionMap;
  };

  return ActionService;
})();

exports.ActionService = ActionService;

function parseActionMap(s, context) {
  var assertAction = assertActionForParser.bind(null, s, context);
  var assertToken = assertTokenForParser.bind(null, s, context);

  var actionMap = null;

  var toks = new ParserTokenizer(s);
  var tok = undefined;
  var peek = undefined;
  do {
    tok = toks.next();
    if (tok.type == TokenType.EOF || tok.type == TokenType.SEPARATOR && tok.value == ';') {
      // Expected, ignore.
    } else if (tok.type == TokenType.LITERAL) {

        // Format: event:target.method

        // Event: "event:"
        var _event = tok.value;

        // Target: ":target."
        assertToken(toks.next(), TokenType.SEPARATOR, ':');
        var target = assertToken(toks.next(), TokenType.LITERAL).value;

        // Method: ".method". Method is optional.
        var method = DEFAULT_METHOD_;
        var args = null;
        peek = toks.peek();
        if (peek.type == TokenType.SEPARATOR && peek.value == '.') {
          toks.next(); // Skip '.'
          method = assertToken(toks.next(), TokenType.LITERAL).value || method;

          // Optionally, there may be arguments: "(key = value, key = value)".
          peek = toks.peek();
          if (peek.type == TokenType.SEPARATOR && peek.value == '(') {
            toks.next(); // Skip '('.
            do {
              tok = toks.next();

              // Format: key = value, ....
              if (tok.type == TokenType.SEPARATOR && (tok.value == ',' || tok.value == ')')) {
                // Expected: ignore.
              } else if (tok.type == TokenType.LITERAL) {
                  // Key: "key = "
                  var argKey = tok.value;
                  assertToken(toks.next(), TokenType.SEPARATOR, '=');
                  var argValue = assertToken(toks.next( /* convertValue */true), TokenType.LITERAL).value;
                  if (!args) {
                    args = Object.create(null);
                  }
                  args[argKey] = argValue;
                  peek = toks.peek();
                  assertAction(peek.type == TokenType.SEPARATOR && (peek.value == ',' || peek.value == ')'), 'Expected either [,] or [)]');
                } else {
                  // Unexpected token.
                  assertAction(false, '; unexpected token [' + (tok.value || '') + ']');
                }
            } while (!(tok.type == TokenType.SEPARATOR && tok.value == ')'));
          }
        }

        var action = {
          event: _event,
          target: target,
          method: method,
          args: args && _mode.getMode().test && Object.freeze ? Object.freeze(args) : args,
          str: s
        };
        if (!actionMap) {
          actionMap = {};
        }
        actionMap[action.event] = action;
      } else {
        // Unexpected token.
        assertAction(false, '; unexpected token [' + (tok.value || '') + ']');
      }
  } while (tok.type != TokenType.EOF);

  return actionMap;
}

/**
 * @param {string} s
 * @param {!Element} context
 * @param {?T} condition
 * @param {string=} opt_message
 * @return T
 * @template T
 * @private
 */
function assertActionForParser(s, context, condition, opt_message) {
  return _log.user().assert(condition, 'Invalid action definition in %s: [%s] %s', context, s, opt_message || '');
}

/**
 * @param {string} s
 * @param {!Element} context
 * @param {!{type: TokenType, value: *}} tok
 * @param {TokenType} type
 * @param {*=} opt_value
 * @return {!{type: TokenType, value: *}}
 * @private
 */
function assertTokenForParser(s, context, tok, type, opt_value) {
  if (opt_value !== undefined) {
    assertActionForParser(s, context, tok.type == type && tok.value == opt_value, '; expected [' + opt_value + ']');
  } else {
    assertActionForParser(s, context, tok.type == type);
  }
  return tok;
}

/**
 * @enum {number}
 */
var TokenType = {
  INVALID: 0,
  EOF: 1,
  SEPARATOR: 2,
  LITERAL: 3
};

/** @private @const {string} */
var WHITESPACE_SET = ' \t\n\r\f\v\u00A0\u2028\u2029';

/** @private @const {string} */
var SEPARATOR_SET = ';:.()=,|!';

/** @private @const {string} */
var STRING_SET = '"\'';

/** @private @const {string} */
var SPECIAL_SET = WHITESPACE_SET + SEPARATOR_SET + STRING_SET;

/** @private */

var ParserTokenizer = (function () {
  /**
   * @param {string} str
   */

  function ParserTokenizer(str) {
    babelHelpers.classCallCheck(this, ParserTokenizer);

    /** @private @const {string} */
    this.str_ = str;

    /** @private {number} */
    this.index_ = -1;
  }

  /**
   * Tests whether a chacter is a number.
   * @param {string} c
   * @return {boolean}
   */

  /**
   * Returns the next token and advances the position.
   * @param {boolean=} opt_convertValues
   * @return {!{type: TokenType, value: *}}
   */

  ParserTokenizer.prototype.next = function next(opt_convertValues) {
    var tok = this.next_(opt_convertValues || false);
    this.index_ = tok.index;
    return tok;
  };

  /**
   * Returns the next token but keeps the current position.
   * @param {boolean=} opt_convertValues
   * @return {!{type: TokenType, value: *}}
   */

  ParserTokenizer.prototype.peek = function peek(opt_convertValues) {
    return this.next_(opt_convertValues || false);
  };

  /**
   * @param {boolean} convertValues
   * @return {!{type: TokenType, value: *, index: number}}
   */

  ParserTokenizer.prototype.next_ = function next_(convertValues) {
    var newIndex = this.index_ + 1;
    if (newIndex >= this.str_.length) {
      return { type: TokenType.EOF, index: this.index_ };
    }

    var c = this.str_.charAt(newIndex);

    // Whitespace: standard set.
    if (WHITESPACE_SET.indexOf(c) != -1) {
      newIndex++;
      for (; newIndex < this.str_.length; newIndex++) {
        if (WHITESPACE_SET.indexOf(this.str_.charAt(newIndex)) == -1) {
          break;
        }
      }
      if (newIndex >= this.str_.length) {
        return { type: TokenType.EOF, index: newIndex };
      }
      c = this.str_.charAt(newIndex);
    }

    // A numeric. Notice that it steals the `.` from separators.
    if (convertValues && (isNum(c) || c == '.' && newIndex + 1 < this.str_.length && isNum(this.str_[newIndex + 1]))) {
      var hasFraction = c == '.';
      var _end = newIndex + 1;
      for (; _end < this.str_.length; _end++) {
        var c2 = this.str_.charAt(_end);
        if (c2 == '.') {
          hasFraction = true;
          continue;
        }
        if (!isNum(c2)) {
          break;
        }
      }
      var _s = this.str_.substring(newIndex, _end);
      var _value = hasFraction ? parseFloat(_s) : parseInt(_s, 10);
      newIndex = _end - 1;
      return { type: TokenType.LITERAL, value: _value, index: newIndex };
    }

    // Different separators.
    if (SEPARATOR_SET.indexOf(c) != -1) {
      return { type: TokenType.SEPARATOR, value: c, index: newIndex };
    }

    // String literal.
    if (STRING_SET.indexOf(c) != -1) {
      var _end2 = -1;
      for (var i = newIndex + 1; i < this.str_.length; i++) {
        if (this.str_.charAt(i) == c) {
          _end2 = i;
          break;
        }
      }
      if (_end2 == -1) {
        return { type: TokenType.INVALID, index: newIndex };
      }
      var _value2 = this.str_.substring(newIndex + 1, _end2);
      newIndex = _end2;
      return { type: TokenType.LITERAL, value: _value2, index: newIndex };
    }

    // A key
    var end = newIndex + 1;
    for (; end < this.str_.length; end++) {
      if (SPECIAL_SET.indexOf(this.str_.charAt(end)) != -1) {
        break;
      }
    }
    var s = this.str_.substring(newIndex, end);
    var value = convertValues && (s == 'true' || s == 'false') ? s == 'true' : s;
    newIndex = end - 1;
    return { type: TokenType.LITERAL, value: value, index: newIndex };
  };

  return ParserTokenizer;
})();

function isNum(c) {
  return c >= '0' && c <= '9';
}

/**
 * @param {!./ampdoc-impl.AmpDoc} ampdoc
 * @return {!ActionService}
 */

function installActionServiceForDoc(ampdoc) {
  return _service.fromClassForDoc(ampdoc, 'action', ActionService);
}

;

},{"../log":41,"../mode":43,"../service":56,"../timer":86,"../types":88,"../vsync":99}],58:[function(require,module,exports){
exports.__esModule = true;
exports.installShadowDoc = installShadowDoc;
exports.shadowDocReady = shadowDocReady;
exports.shadowDocHasBody = shadowDocHasBody;
exports.installDocService = installDocService;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('../log');

var _service = require('../service');

var _shadowEmbed = require('../shadow-embed');

var _documentReady = require('../document-ready');

var _dom = require('../dom');

/** @const {string} */
var AMPDOC_PROP = '__AMPDOC';

/**
 * Creates and installs the ampdoc for the shadow root.
 * @param {!AmpDocService} ampdocService
 * @param {string} url
 * @param {!ShadowRoot} shadowRoot
 * @return {!AmpDocShadow}
 * @restricted
 */

function installShadowDoc(ampdocService, url, shadowRoot) {
  return ampdocService.installShadowDoc_(url, shadowRoot);
}

/**
 * Signals that the shadow doc is ready.
 * @param {!AmpDocShadow} ampdoc
 * @restricted
 */

function shadowDocReady(ampdoc) {
  ampdoc.setReady_();
}

/**
 * Signals that the shadow doc has a body.
 * @param {!AmpDocShadow} ampdoc
 * @param {!Element} body
 * @restricted
 */

function shadowDocHasBody(ampdoc, body) {
  ampdoc.setBody_(body);
}

/**
 * This service helps locate an ampdoc (`AmpDoc` instance) for any node,
 * either in the single-doc or shadow-doc environments.
 *
 * In the single-doc environment an ampdoc is equivalent to the
 * `window.document`. In the shadow-doc mode, any number of AMP documents
 * could be hosted in shadow roots in the same global `window.document`.
 *
 * @package
 */

var AmpDocService = (function () {
  /**
   * @param {!Window} win
   * @param {boolean} isSingleDoc
   */

  function AmpDocService(win, isSingleDoc) {
    babelHelpers.classCallCheck(this, AmpDocService);

    /** @const {!Window} */
    this.win = win;

    /** @private {?AmpDoc} */
    this.singleDoc_ = null;
    if (isSingleDoc) {
      this.singleDoc_ = new AmpDocSingle(win);
    }
  }

  /**
   * This class represents a single ampdoc. `AmpDocService` can contain only one
   * global ampdoc or multiple, depending on the runtime mode: single-doc or
   * shadow-doc.
   * @abstract
   * @package
   */

  /**
   * Whether the runtime in the single-doc mode. Alternative is the shadow-doc
   * mode that supports multiple documents per a single window.
   * @return {boolean}
   */

  AmpDocService.prototype.isSingleDoc = function isSingleDoc() {
    return !!this.singleDoc_;
  };

  /**
   * Returns the instance of the ampdoc (`AmpDoc`) that contains the specified
   * node. If the runtime is in the single-doc mode, the one global `AmpDoc`
   * instance is always returned. Otherwise, this method locates the `AmpDoc`
   * that contains the specified node and, if necessary, initializes it.
   *
   * @param {!Node=} node
   * @return {!AmpDoc}
   */

  AmpDocService.prototype.getAmpDoc = function getAmpDoc(node) {
    // Single document: return it immediately.
    if (this.singleDoc_) {
      return this.singleDoc_;
    }
    _log.dev().assert(node);
    // Otherwise discover and possibly create the ampdoc.
    var n = node;
    while (n) {
      // A custom element may already have the reference to the ampdoc.
      if (n.ampdoc_) {
        return n.ampdoc_;
      }

      // Traverse the boundary of a friendly iframe.
      var _frameElement = _service.getParentWindowFrameElement(n, this.win);
      if (_frameElement) {
        n = _frameElement;
        continue;
      }

      // Shadow doc.
      var shadowRoot = _shadowEmbed.getShadowRootNode(n);
      if (!shadowRoot) {
        break;
      }

      var ampdoc = shadowRoot[AMPDOC_PROP];
      if (ampdoc) {
        return ampdoc;
      }
      n = shadowRoot.host;
    }

    throw _log.dev().createError('No ampdoc found for', node);
  };

  /**
   * Creates and installs the ampdoc for the shadow root.
   * @param {string} url
   * @param {!ShadowRoot} shadowRoot
   * @return {!AmpDocShadow}
   * @private
   */

  AmpDocService.prototype.installShadowDoc_ = function installShadowDoc_(url, shadowRoot) {
    _log.dev().assert(!shadowRoot[AMPDOC_PROP], 'The shadow root already contains ampdoc');
    var ampdoc = new AmpDocShadow(this.win, url, shadowRoot);
    shadowRoot[AMPDOC_PROP] = ampdoc;
    return ampdoc;
  };

  return AmpDocService;
})();

exports.AmpDocService = AmpDocService;

var AmpDoc = (function () {
  /**
   * @param {!Window} win
   */

  function AmpDoc(win) {
    babelHelpers.classCallCheck(this, AmpDoc);

    /** @public @const {!Window} */
    this.win = win;
  }

  /**
   * The version of `AmpDoc` in the single-doc mode that corresponds to the
   * global `window.document`.
   * @package @visibleForTesting
   */

  /**
   * Whether the runtime in the single-doc mode. Alternative is the shadow-doc
   * mode that supports multiple documents per a single window.
   * @return {boolean}
   */

  AmpDoc.prototype.isSingleDoc = function isSingleDoc() {
    return (/** @type {?} */_log.dev().assert(null, 'not implemented')
    );
  };

  /**
   * DO NOT CALL. Retained for backward compat during rollout.
   * @return {!Window}
   * @deprecated. Use `ampdoc.win` instead.
   */

  AmpDoc.prototype.getWin = function getWin() {
    return this.win;
  };

  /**
   * Returns the root node for this ampdoc. It will either be a `Document` for
   * the single-doc runtime mode, or a `ShadowRoot` for shadow-doc mode. This
   * node can be used, among other things, to add ampdoc-wide event listeners.
   *
   * @return {!Document|!ShadowRoot}
   */

  AmpDoc.prototype.getRootNode = function getRootNode() {
    return (/** @type {?} */_log.dev().assert(null, 'not implemented')
    );
  };

  /**
   * Returns `true` if the ampdoc's body is available.
   *
   * @return {boolean}
   */

  AmpDoc.prototype.isBodyAvailable = function isBodyAvailable() {
    return (/** @type {?} */_log.dev().assert(false, 'not implemented')
    );
  };

  /**
   * Returns the ampdoc's body. Requires the body to already be available.
   *
   * See `isBodyAvailable` and `whenBodyAvailable`.
   *
   * @return {!Element}
   */

  AmpDoc.prototype.getBody = function getBody() {
    return _log.dev().assertElement(null, 'not implemented');
  };

  /**
   * Returns a promise that will be resolved when the ampdoc's body is
   * available.
   * @return {!Promise<!Element>}
   */

  AmpDoc.prototype.whenBodyAvailable = function whenBodyAvailable() {
    return (/** @type {?} */_log.dev().assert(null, 'not implemented')
    );
  };

  /**
   * Returns `true` if document is ready.
   *
   * See `whenReady`.
   *
   * @return {boolean}
   */

  AmpDoc.prototype.isReady = function isReady() {
    return (/** @type {?} */_log.dev().assert(null, 'not implemented')
    );
  };

  /**
   * Returns a promise that will be resolved when the ampdoc's DOM is fully
   * ready.
   * @return {!Promise}
   */

  AmpDoc.prototype.whenReady = function whenReady() {
    return (/** @type {?} */_log.dev().assert(null, 'not implemented')
    );
  };

  /**
   * Returns the URL from which the document was loaded.
   * @return {string}
   */

  AmpDoc.prototype.getUrl = function getUrl() {
    return _log.dev().assertString(null, 'not implemented');
  };

  /**
   * Locates an element with the specified ID within the ampdoc. In the
   * shadow-doc mode, when multiple documents could be present, this method
   * localizes search only to the DOM subtree specific to this ampdoc.
   *
   * @param {string} id
   * @return {?Element}
   */

  AmpDoc.prototype.getElementById = function getElementById(id) {
    return this.getRootNode().getElementById(id);
  };

  return AmpDoc;
})();

exports.AmpDoc = AmpDoc;

var AmpDocSingle = (function (_AmpDoc) {
  babelHelpers.inherits(AmpDocSingle, _AmpDoc);

  /**
   * @param {!Window} win
   */

  function AmpDocSingle(win) {
    var _this = this;

    babelHelpers.classCallCheck(this, AmpDocSingle);

    _AmpDoc.call(this, win);

    /** @private @const {!Promise<!Element>} */
    this.bodyPromise_ = this.win.document.body ? Promise.resolve(this.win.document.body) : _dom.waitForBodyPromise(this.win.document).then(function () {
      return _this.getBody();
    });

    /** @private @const {!Promise} */
    this.readyPromise_ = _documentReady.isDocumentReady(this.win.document) ? Promise.resolve() : _documentReady.whenDocumentReady(this.win.document);
  }

  /**
   * The version of `AmpDoc` in the shadow-doc mode that is allocated for each
   * ampdoc hosted within a shadow root.
   * @package @visibleForTesting
   */

  /** @override */

  AmpDocSingle.prototype.isSingleDoc = function isSingleDoc() {
    return true;
  };

  /** @override */

  AmpDocSingle.prototype.getRootNode = function getRootNode() {
    return this.win.document;
  };

  /** @override */

  AmpDocSingle.prototype.getUrl = function getUrl() {
    return this.win.location.href;
  };

  /** @override */

  AmpDocSingle.prototype.isBodyAvailable = function isBodyAvailable() {
    return !!this.win.document.body;
  };

  /** @override */

  AmpDocSingle.prototype.getBody = function getBody() {
    return _log.dev().assertElement(this.win.document.body, 'body not available');
  };

  /** @override */

  AmpDocSingle.prototype.whenBodyAvailable = function whenBodyAvailable() {
    return this.bodyPromise_;
  };

  /** @override */

  AmpDocSingle.prototype.isReady = function isReady() {
    return _documentReady.isDocumentReady(this.win.document);
  };

  /** @override */

  AmpDocSingle.prototype.whenReady = function whenReady() {
    return this.readyPromise_;
  };

  return AmpDocSingle;
})(AmpDoc);

exports.AmpDocSingle = AmpDocSingle;

var AmpDocShadow = (function (_AmpDoc2) {
  babelHelpers.inherits(AmpDocShadow, _AmpDoc2);

  /**
   * @param {!Window} win
   * @param {string} url
   * @param {!ShadowRoot} shadowRoot
   */

  function AmpDocShadow(win, url, shadowRoot) {
    var _this2 = this;

    babelHelpers.classCallCheck(this, AmpDocShadow);

    _AmpDoc2.call(this, win);
    /** @private @const {string} */
    this.url_ = url;
    /** @private @const {!ShadowRoot} */
    this.shadowRoot_ = shadowRoot;

    /** @private {?Element} */
    this.body_ = null;

    /** @private {function(!Element)|undefined} */
    this.bodyResolver_ = undefined;

    /** @private {!Promise<!Element>} */
    this.bodyPromise_ = new Promise(function (resolve) {
      _this2.bodyResolver_ = resolve;
    });

    /** @private {boolean} */
    this.ready_ = false;

    /** @private {function()|undefined} */
    this.readyResolver_ = undefined;

    /** @private {!Promise} */
    this.readyPromise_ = new Promise(function (resolve) {
      _this2.readyResolver_ = resolve;
    });
  }

  /**
   * Install the ampdoc service and immediately configure it for either a
   * single-doc or a shadow-doc mode. The mode cannot be changed after the
   * initial configuration.
   * @param {!Window} win
   * @param {boolean} isSingleDoc
   * @return {!AmpDocService}
   */

  /** @override */

  AmpDocShadow.prototype.isSingleDoc = function isSingleDoc() {
    return false;
  };

  /** @override */

  AmpDocShadow.prototype.getRootNode = function getRootNode() {
    return this.shadowRoot_;
  };

  /** @override */

  AmpDocShadow.prototype.getUrl = function getUrl() {
    return this.url_;
  };

  /** @override */

  AmpDocShadow.prototype.isBodyAvailable = function isBodyAvailable() {
    return !!this.body_;
  };

  /** @override */

  AmpDocShadow.prototype.getBody = function getBody() {
    return _log.dev().assertElement(this.body_, 'body not available');
  };

  /**
   * @param {!Element} body
   * @private
   */

  AmpDocShadow.prototype.setBody_ = function setBody_(body) {
    _log.dev().assert(!this.body_, 'Duplicate body');
    this.body_ = body;
    this.bodyResolver_(body);
    this.bodyResolver_ = undefined;
  };

  /** @override */

  AmpDocShadow.prototype.whenBodyAvailable = function whenBodyAvailable() {
    return this.bodyPromise_;
  };

  /** @override */

  AmpDocShadow.prototype.isReady = function isReady() {
    return this.ready_;
  };

  /** @private */

  AmpDocShadow.prototype.setReady_ = function setReady_() {
    _log.dev().assert(!this.ready_, 'Duplicate ready state');
    this.ready_ = true;
    this.readyResolver_();
    this.readyResolver_ = undefined;
  };

  /** @override */

  AmpDocShadow.prototype.whenReady = function whenReady() {
    return this.readyPromise_;
  };

  return AmpDocShadow;
})(AmpDoc);

exports.AmpDocShadow = AmpDocShadow;

function installDocService(win, isSingleDoc) {
  return (/** @type {!AmpDocService} */_service.getService(win, 'ampdoc', function () {
      return new AmpDocService(win, isSingleDoc);
    })
  );
}

;

},{"../document-ready":20,"../dom":23,"../log":41,"../service":56,"../shadow-embed":78}],59:[function(require,module,exports){
exports.__esModule = true;
exports.installExtensionsService = installExtensionsService;
exports.registerExtension = registerExtension;
exports.installExtensionsInShadowDoc = installExtensionsInShadowDoc;
exports.addElementToExtension = addElementToExtension;
exports.addDocFactoryToExtension = addDocFactoryToExtension;
exports.addShadowRootFactoryToExtension = addShadowRootFactoryToExtension;
exports.calculateScriptBaseUrl = calculateScriptBaseUrl;
exports.calculateExtensionScriptUrl = calculateExtensionScriptUrl;
exports.installBuiltinElements = installBuiltinElements;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _customElement = require('../custom-element');

var _buildCss = require('../../build/css');

var _log = require('../log');

var _mode = require('../mode');

var _service = require('../service');

var _builtinsAmpImg = require('../../builtins/amp-img');

var _builtinsAmpPixel = require('../../builtins/amp-pixel');

var _styleInstaller = require('../style-installer');

var _builtinsAmpVideo = require('../../builtins/amp-video');

var _config = require('../config');

var TAG = 'extensions';
var UNKNOWN_EXTENSION = '_UNKNOWN_';

/**
 * The structure that contains the declaration of a custom element.
 *
 * @typedef {{
 *   implementationClass:
 *       function(new:../base-element.BaseElement, !Element),
 *   css: (?string|undefined),
 * }}
 */
var ExtensionElementDef = undefined;

/**
 * The structure that contains the resources declared by an extension.
 * Currently only limitted to elements.
 *
 * @typedef {{
 *   elements: !Object<string, !ExtensionElementDef>,
 * }}
 */
var ExtensionDef = undefined;

/**
 * Internal structure that maintains the state of an extension through loading.
 *
 * @typedef {{
 *   extension: !ExtensionDef,
 *   docFactories: !Array<function(!./ampdoc-impl.AmpDoc)>,
 *   shadowRootFactories: !Array<function(!ShadowRoot)>,
 *   promise: (!Promise<!ExtensionDef>|undefined),
 *   resolve: (function(!ExtensionDef)|undefined),
 *   reject: (function(!Error)|undefined),
 *   loaded: (boolean|undefined),
 *   error: (!Error|undefined),
 *   scriptPresent: (boolean|undefined),
 * }}
 * @private
 */
var ExtensionHolderDef = undefined;

/**
 * Install extensions service.
 * @param {!Window} window
 * @restricted
 */

function installExtensionsService(window) {
  return _service.fromClass(window, 'extensions', Extensions);
}

/**
 * Register and process the specified extension. The factory is called
 * immediately, which in turn is expected to register elements, templates,
 * services and document factories.
 * @param {!Extensions} extensions
 * @param {string} extensionId
 * @param {function(!Object)} factory
 * @param {!Object} arg
 * @restricted
 */

function registerExtension(extensions, extensionId, factory, arg) {
  extensions.registerExtension_(extensionId, factory, arg);
}

/**
 * Apply all registered factories to the specified ampdoc.
 * @param {!Extensions} extensions
 * @param {!./ampdoc-impl.AmpDoc} ampdoc
 * @param {!Array<string>} extensionIds
 * @return {!Promise}
 * @restricted
 */

function installExtensionsInShadowDoc(extensions, ampdoc, extensionIds) {
  return extensions.installExtensionsInShadowDoc_(ampdoc, extensionIds);
}

/**
 * Add an element to the extension currently being registered. This is a
 * restricted method and it's allowed to be called only during the overall
 * extension registration.
 * @param {!Extensions} extensions
 * @param {string} name
 * @param {function(new:../base-element.BaseElement, !Element)}
 *     implementationClass
 * @param {?string|undefined} css
 * @restricted
 */

function addElementToExtension(extensions, name, implementationClass, css) {
  extensions.addElement_(name, implementationClass, css);
}

/**
 * Add a ampdoc factory to the extension currently being registered. This is a
 * restricted method and it's allowed to be called only during the overall
 * extension registration.
 * @param {!Extensions} extensions
 * @param {function(!./ampdoc-impl.AmpDoc)} factory
 * @param {string=} opt_forName
 * @restricted
 */

function addDocFactoryToExtension(extensions, factory, opt_forName) {
  extensions.addDocFactory_(factory, opt_forName);
}

/**
 * Add a shadow-root factory to the extension currently being registered. This
 * is a restricted method and it's allowed to be called only during the overall
 * extension registration.
 * @param {!Extensions} extensions
 * @param {function(!ShadowRoot)} factory
 * @param {string=} opt_forName
 * @restricted
 */

function addShadowRootFactoryToExtension(extensions, factory, opt_forName) {
  extensions.addShadowRootFactory_(factory, opt_forName);
}

/**
 * The services that manages extensions in the runtime.
 * @visibleForTesting
 */

var Extensions = (function () {

  /**
   * @param {!Window} win
   */

  function Extensions(win) {
    babelHelpers.classCallCheck(this, Extensions);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Object<string, !ExtensionHolderDef>} */
    this.extensions_ = {};

    /** @private {?string} */
    this.currentExtensionId_ = null;
  }

  /**
   * Calculate the base url for any scripts.
   * @param {!Location} location The window's location
   * @param {boolean=} isLocalDev
   * @param {boolean=} isTest
   * @return {string}
   */

  /**
   * Registers a new extension. This method is called by the extension's script
   * itself when it's loaded using the regular `AMP.push()` callback.
   * @param {string} extensionId
   * @param {function(!Object)} factory
   * @param {!Object} arg
   * @private
   * @restricted
   */

  Extensions.prototype.registerExtension_ = function registerExtension_(extensionId, factory, arg) {
    var holder = this.getExtensionHolder_(extensionId);
    try {
      this.currentExtensionId_ = extensionId;
      factory(arg);
      if (_mode.getMode().localDev || _mode.getMode().test) {
        if (Object.freeze) {
          var m = holder.extension;
          m.elements = Object.freeze(m.elements);
          holder.extension = Object.freeze(m);
        }
      }
      holder.loaded = true;
      if (holder.resolve) {
        holder.resolve(holder.extension);
      }
    } catch (e) {
      holder.error = e;
      if (holder.reject) {
        holder.reject(e);
      }
      throw e;
    } finally {
      this.currentExtensionId_ = null;
    }
  };

  /**
   * Waits for the previously included extension to complete
   * loading/registration.
   * @param {string} extensionId
   * @return {!Promise<!ExtensionDef>}
   */

  Extensions.prototype.waitForExtension = function waitForExtension(extensionId) {
    return this.waitFor_(this.getExtensionHolder_(extensionId));
  };

  /**
   * Returns the promise that will be resolved when the extension has been
   * loaded. If necessary, adds the extension script to the page.
   * @param {string} extensionId
   * @param {boolean=} stubElement
   * @return {!Promise<!ExtensionDef>}
   */

  Extensions.prototype.loadExtension = function loadExtension(extensionId) {
    var stubElement = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    if (extensionId == 'amp-embed') {
      extensionId = 'amp-ad';
    }
    var holder = this.getExtensionHolder_(extensionId);
    this.insertExtensionScriptIfNeeded_(extensionId, holder, stubElement);
    return this.waitFor_(holder);
  };

  /**
   * Returns the promise that will be resolved with the extension element's
   * class when the extension has been loaded. If necessary, adds the extension
   * script to the page.
   * @param {string} elementName
   * @return {!Promise<function(new:../base-element.BaseElement, !Element)>}
   */

  Extensions.prototype.loadElementClass = function loadElementClass(elementName) {
    return this.loadExtension(elementName).then(function (extension) {
      var element = _log.dev().assert(extension.elements[elementName], 'Element not found: %s', elementName);
      return element.implementationClass;
    });
  };

  /**
   * Registers the element implementation with the current extension.
   * @param {string} name
   * @param {!Function} implementationClass
   * @param {?string|undefined} css
   * @private
   * @restricted
   */

  Extensions.prototype.addElement_ = function addElement_(name, implementationClass, css) {
    var holder = this.getCurrentExtensionHolder_(name);
    holder.extension.elements[name] = { implementationClass: implementationClass, css: css };
  };

  /**
   * Registers an ampdoc factory.
   * @param {function(!./ampdoc-impl.AmpDoc)} factory
   * @param {string=} opt_forName
   * @private
   * @restricted
   */

  Extensions.prototype.addDocFactory_ = function addDocFactory_(factory, opt_forName) {
    var holder = this.getCurrentExtensionHolder_(opt_forName);
    holder.docFactories.push(factory);
  };

  /**
   * Registers a shadow-root factory.
   * @param {function(!ShadowRoot)} factory
   * @param {string=} opt_forName
   * @private
   * @restricted
   */

  Extensions.prototype.addShadowRootFactory_ = function addShadowRootFactory_(factory, opt_forName) {
    var holder = this.getCurrentExtensionHolder_(opt_forName);
    holder.shadowRootFactories.push(factory);
  };

  /**
   * Installs all ampdoc factories previously registered with
   * `addDocFactory_`.
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   * @param {!Array<string>} extensionIds
   * @return {!Promise}
   * @private
   * @restricted
   */

  Extensions.prototype.installExtensionsInShadowDoc_ = function installExtensionsInShadowDoc_(ampdoc, extensionIds) {
    var _this = this;

    var promises = [];
    extensionIds.forEach(function (extensionId) {
      var holder = _this.getExtensionHolder_(extensionId);
      promises.push(_this.waitFor_(holder).then(function () {
        holder.shadowRootFactories.forEach(function (factory) {
          try {
            factory( /** @type {!ShadowRoot} */ampdoc.getRootNode());
          } catch (e) {
            _log.rethrowAsync('ShadowRoot factory failed: ', e, extensionId);
          }
        });
        holder.docFactories.forEach(function (factory) {
          try {
            factory(ampdoc);
          } catch (e) {
            _log.rethrowAsync('Doc factory failed: ', e, extensionId);
          }
        });
      }));
    });
    return Promise.all(promises);
  };

  /**
   * Installs all shadow-root factories previously registered with
   * `addShadowRootFactory_`.
   * @param {!ShadowRoot} shadowRoot
   * @param {!Array<string>} extensionIds
   * @return {!Promise}
   * @restricted
   */

  Extensions.prototype.installFactoriesInShadowRoot = function installFactoriesInShadowRoot(shadowRoot, extensionIds) {
    var _this2 = this;

    var promises = [];
    extensionIds.forEach(function (extensionId) {
      var holder = _this2.getExtensionHolder_(extensionId);
      promises.push(_this2.waitFor_(holder).then(function () {
        holder.shadowRootFactories.forEach(function (factory) {
          try {
            factory( /** @type {!ShadowRoot} */shadowRoot);
          } catch (e) {
            _log.rethrowAsync('ShadowRoot factory failed: ', e, extensionId);
          }
        });
      }));
    });
    return Promise.all(promises);
  };

  /**
   * Install extensions in the child window (friendly iframe).
   * @param {!Window} childWin
   * @param {!Array<string>} extensionIds
   * @return {!Promise}
   * @restricted
   */

  Extensions.prototype.installExtensionsInChildWindow = function installExtensionsInChildWindow(childWin, extensionIds) {
    var _this3 = this;

    var topWin = this.win;
    var parentWin = childWin.frameElement.ownerDocument.defaultView;
    _service.setParentWindow(childWin, parentWin);

    // Install necessary polyfills.
    installPolyfillsInChildWindow(childWin);

    // Install runtime styles.
    _styleInstaller.installStyles(childWin.document, _buildCss.cssText, function () {},
    /* opt_isRuntimeCss */true, /* opt_ext */'amp-runtime');

    // Install built-ins.
    copyBuiltinElementsToChildWindow(childWin);

    var promises = [];
    extensionIds.forEach(function (extensionId) {
      // This will extend automatic upgrade of custom elements from top
      // window to the child window.
      _customElement.stubElementIfNotKnown(topWin, extensionId);
      _customElement.copyElementToChildWindow(childWin, extensionId);

      // Install CSS.
      var promise = _this3.loadExtension(extensionId).then(function (extension) {
        var elementDef = extension.elements[extensionId];
        if (elementDef && elementDef.css) {
          _styleInstaller.installStyles(childWin.document, elementDef.css, function () {},
          /* isRuntime */false, extensionId);
        }
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  };

  /**
   * Creates or returns an existing extension holder.
   * @param {string} extensionId
   * @return {!ExtensionHolderDef}
   * @private
   */

  Extensions.prototype.getExtensionHolder_ = function getExtensionHolder_(extensionId) {
    var holder = this.extensions_[extensionId];
    if (!holder) {
      var extension = {
        elements: {}
      };
      holder = /** @type {ExtensionHolderDef} */{
        extension: extension,
        docFactories: [],
        shadowRootFactories: [],
        promise: undefined,
        resolve: undefined,
        reject: undefined,
        loaded: undefined,
        error: undefined,
        scriptPresent: undefined
      };
      this.extensions_[extensionId] = holder;
    }
    return holder;
  };

  /**
   * Returns the holder for the extension currently being registered.
   * @param {string=} opt_forName Used for logging only.
   * @return {!ExtensionHolderDef}
   * @private
   */

  Extensions.prototype.getCurrentExtensionHolder_ = function getCurrentExtensionHolder_(opt_forName) {
    if (!this.currentExtensionId_ && !_mode.getMode().test) {
      _log.dev().error(TAG, 'unknown extension for ', opt_forName);
    }
    return this.getExtensionHolder_(this.currentExtensionId_ || UNKNOWN_EXTENSION);
  };

  /**
   * Creates or returns an existing promise that will yield as soon as the
   * extension has been loaded.
   * @param {!ExtensionHolderDef} holder
   * @return {!Promise<!ExtensionDef>}
   * @private
   */

  Extensions.prototype.waitFor_ = function waitFor_(holder) {
    if (!holder.promise) {
      if (holder.loaded) {
        holder.promise = Promise.resolve(holder.extension);
      } else if (holder.error) {
        holder.promise = Promise.reject(holder.error);
      } else {
        holder.promise = new Promise(function (resolve, reject) {
          holder.resolve = resolve;
          holder.reject = reject;
        });
      }
    }
    return holder.promise;
  };

  /**
   * Ensures that the script has already been injected in the page.
   * @param {string} extensionId
   * @param {!ExtensionHolderDef} holder
   * @param {boolean} stubElement
   * @private
   */

  Extensions.prototype.insertExtensionScriptIfNeeded_ = function insertExtensionScriptIfNeeded_(extensionId, holder, stubElement) {
    if (this.isExtensionScriptRequired_(extensionId, holder)) {
      var scriptElement = this.createExtensionScript_(extensionId);
      this.win.document.head.appendChild(scriptElement);
      holder.scriptPresent = true;
      if (stubElement) {
        _customElement.stubElementIfNotKnown(this.win, extensionId);
      }
    }
  };

  /**
   * Determine the need to add amp extension script to document.
   * @param {string} extensionId
   * @param {!ExtensionHolderDef} holder
   * @return {boolean}
   * @private
   */

  Extensions.prototype.isExtensionScriptRequired_ = function isExtensionScriptRequired_(extensionId, holder) {
    if (holder.loaded || holder.error) {
      return false;
    }
    if (holder.scriptPresent === undefined) {
      var scriptInHead = this.win.document.head.querySelector('[custom-element="' + extensionId + '"]');
      holder.scriptPresent = !!scriptInHead;
    }
    return !holder.scriptPresent;
  };

  /**
   * Create the missing amp extension HTML script element.
   * @param {string} extensionId
   * @return {!Element} Script object
   * @private
   */

  Extensions.prototype.createExtensionScript_ = function createExtensionScript_(extensionId) {
    var scriptElement = this.win.document.createElement('script');
    scriptElement.async = true;
    scriptElement.setAttribute('custom-element', extensionId);
    scriptElement.setAttribute('data-script', extensionId);
    var loc = this.win.location;
    var useCompiledJs = shouldUseCompiledJs();
    var scriptSrc = calculateExtensionScriptUrl(loc, extensionId, _mode.getMode().version, _mode.getMode().localDev, _mode.getMode().test, useCompiledJs);
    scriptElement.src = scriptSrc;
    return scriptElement;
  };

  return Extensions;
})();

exports.Extensions = Extensions;

function calculateScriptBaseUrl(location, isLocalDev, isTest) {
  if (isLocalDev) {
    if (isTest || isMax(location) || isMin(location)) {
      return location.protocol + '//' + location.host + '/dist';
    }
  }
  return _config.urls.cdn;
}

/**
 * Calculate script url for amp-ad.
 * @param {!Location} location The window's location
 * @param {string} extensionId
 * @param {string} version
 * @param {boolean=} isLocalDev
 * @param {boolean=} isTest
 * @param {boolean=} isUsingCompiledJs
 * @return {string}
 */

function calculateExtensionScriptUrl(location, extensionId, version, isLocalDev, isTest, isUsingCompiledJs) {
  var base = calculateScriptBaseUrl(location, isLocalDev, isTest);
  if (isLocalDev) {
    if (isTest && !isUsingCompiledJs || isMax(location)) {
      return base + '/v0/' + extensionId + '-0.1.max.js';
    }
    return base + '/v0/' + extensionId + '-0.1.js';
  }
  var folderPath = version == '1473975717617' ? 'v0' : 'rtv/' + version + '/v0';
  return base + '/' + folderPath + '/' + extensionId + '-0.1.js';
}

/**
 * Is this path to a max (unminified) version?
 * @param {!Location} location
 * @return {boolean}
 */
function isMax(location) {
  var path = location.pathname;
  return path.indexOf('.max') >= 0 || path.substr(0, 5) == '/max/';
}

/**
 * Is this path to a minified version?
 * @param {!Location} location
 * @return {boolean}
 */
function isMin(location) {
  var path = location.pathname;
  return path.indexOf('.min') >= 0 || path.substr(0, 5) == '/min/';
}

/**
 * @return {boolean}
 */
function shouldUseCompiledJs() {
  return _mode.getMode().test && self.ampTestRuntimeConfig && self.ampTestRuntimeConfig.useCompiledJs;
}

/**
 * Install builtins.
 * @param {!Window} win
 * @restricted
 */

function installBuiltinElements(win) {
  _builtinsAmpImg.installImg(win);
  _builtinsAmpPixel.installPixel(win);
  _builtinsAmpVideo.installVideo(win);
}

/**
 * Copy builtins to a child window.
 * @param {!Window} childWin
 */
function copyBuiltinElementsToChildWindow(childWin) {
  _customElement.copyElementToChildWindow(childWin, 'amp-img');
  _customElement.copyElementToChildWindow(childWin, 'amp-pixel');
  _customElement.copyElementToChildWindow(childWin, 'amp-video');
}

/**
 * Install polyfills in the child window (friendly iframe).
 * @param {!Window} unusedChildWin
 */
function installPolyfillsInChildWindow(unusedChildWin) {
  // TODO(dvoytenko): polyfill APIs in the childWin as needed. At the very
  // least, it will be a `registerElement` API.
}

},{"../../build/css":1,"../../builtins/amp-img":2,"../../builtins/amp-pixel":3,"../../builtins/amp-video":4,"../config":15,"../custom-element":18,"../log":41,"../mode":43,"../service":56,"../style-installer":83}],60:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _dom = require('../dom');

var _log = require('../log');

var _platform = require('../platform');

var _style = require('../style');

var TAG = 'FixedLayer';

var DECLARED_FIXED_PROP = '__AMP_DECLFIXED';

/**
 * The fixed layer is a *sibling* of the body element. I.e. it's a direct
 * child of documentElement. It's used to manage the `postition:fixed`
 * elements in iOS-iframe case due to the
 * https://bugs.webkit.org/show_bug.cgi?id=154399 bug, which is itself
 * a result of workaround for the issue where scrolling is not supported
 * in iframes (https://bugs.webkit.org/show_bug.cgi?id=149264).
 * This implementation finds all elements that could be `fixed` and checks
 * on major relayouts if they are indeed `fixed`. All `fixed` elements are
 * moved into the fixed layer.
 */

var FixedLayer = (function () {
  /**
   * @param {!Document} doc
   * @param {!./vsync-impl.Vsync} vsync
   * @param {number} paddingTop
   * @param {boolean} transfer
   */

  function FixedLayer(doc, vsync, paddingTop, transfer) {
    babelHelpers.classCallCheck(this, FixedLayer);

    /** @const {!Document} */
    this.doc = doc;

    /** @private @const */
    this.vsync_ = vsync;

    /** @private {number} */
    this.paddingTop_ = paddingTop;

    /** @private @const {boolean} */
    this.transfer_ = transfer;

    /** @private {?Element} */
    this.fixedLayer_ = null;

    /** @private {number} */
    this.counter_ = 0;

    /** @const @private {!Array<!FixedElementDef>} */
    this.fixedElements_ = [];
  }

  /**
   * @typedef {{
   *   id: string,
   *   selectors: !Array,
   *   element: !Element,
   *   placeholder: (?Element|undefined),
   *   fixedNow: (boolean|undefined),
   *   top: (string|undefined),
   *   transform: (string|undefined),
   * }}
   */

  /**
   * @param {boolean} visible
   */

  FixedLayer.prototype.setVisible = function setVisible(visible) {
    var _this = this;

    if (this.fixedLayer_) {
      this.vsync_.mutate(function () {
        _style.setStyle(_this.fixedLayer_, 'visibility', visible ? 'visible' : 'hidden');
      });
    }
  };

  /**
   * Must be always called after DOMReady.
   */

  FixedLayer.prototype.setup = function setup() {
    var stylesheets = this.doc.styleSheets;
    if (!stylesheets) {
      return;
    }

    // Find all `position:fixed` elements.
    var fixedSelectors = [];
    for (var i = 0; i < stylesheets.length; i++) {
      var stylesheet = stylesheets[i];
      if (stylesheet.disabled || !stylesheet.ownerNode || stylesheet.ownerNode.tagName != 'STYLE' || stylesheet.ownerNode.hasAttribute('amp-boilerplate') || stylesheet.ownerNode.hasAttribute('amp-runtime') || stylesheet.ownerNode.hasAttribute('amp-extension')) {
        continue;
      }
      this.discoverFixedSelectors_(stylesheet.cssRules, fixedSelectors);
    }

    this.trySetupFixedSelectorsNoInline(fixedSelectors);

    // Sort in document order.
    this.sortInDomOrder_();

    var platform = _platform.platformFor(this.doc.defaultView);
    if (this.fixedElements_.length > 0 && !this.transfer_ && platform.isIos()) {
      _log.user().warn(TAG, 'Please test this page inside of an AMP Viewer such' + ' as Google\'s because the fixed positioning might have slightly' + ' different layout.');
    }

    this.update();
  };

  /**
   * Updates the viewer's padding-top position and recalculates offsets of
   * all elements.
   * @param {number} paddingTop
   */

  FixedLayer.prototype.updatePaddingTop = function updatePaddingTop(paddingTop) {
    this.paddingTop_ = paddingTop;
    this.update();
  };

  /**
   * Apply or reset transform style to fixed elements
   * @param {?string} transform
   */

  FixedLayer.prototype.transformMutate = function transformMutate(transform) {
    if (transform) {
      // Apply transform style to all fixed elements
      this.fixedElements_.forEach(function (e) {
        if (e.fixedNow && e.top) {
          if (e.transform && e.transform != 'none') {
            _style.setStyle(e.element, 'transform', e.transform + ' ' + transform);
          } else {
            _style.setStyle(e.element, 'transform', transform);
          }
        }
      });
    } else {
      // Reset transform style to all fixed elements
      this.fixedElements_.forEach(function (e) {
        if (e.fixedNow && e.top) {
          _style.setStyle(e.element, 'transform', '');
        }
      });
    }
  };

  /**
   * Adds the element directly into the fixed layer, bypassing discovery.
   * @param {!Element} element
   */

  FixedLayer.prototype.addElement = function addElement(element) {
    this.setupFixedElement_(element, /* selector */'*');
    this.sortInDomOrder_();
    this.update();
  };

  /**
   * Removes the element from the fixed layer.
   * @param {!Element} element
   */

  FixedLayer.prototype.removeElement = function removeElement(element) {
    var _this2 = this;

    var fe = this.removeFixedElement_(element);
    if (fe && this.fixedLayer_) {
      this.vsync_.mutate(function () {
        _this2.returnFromFixedLayer_( /** @type {FixedElementDef} */fe);
      });
    }
  };

  /**
   * Whether the element is declared as fixed in any of the user's stylesheets.
   * Will include any matches, not necessarily currently fixed elements.
   * @param {!Element} element
   * @return {boolean}
   */

  FixedLayer.prototype.isDeclaredFixed = function isDeclaredFixed(element) {
    return !!element[DECLARED_FIXED_PROP];
  };

  /**
   * Performs fixed actions.
   * 1. Updates `top` styling if necessary.
   * 2. On iOS/Iframe moves elements between fixed layer and BODY depending on
   * whether they are currently visible and fixed.
   * @return {!Promise}
   */

  FixedLayer.prototype.update = function update() {
    var _this3 = this;

    if (this.fixedElements_.length == 0) {
      return Promise.resolve();
    }

    // Some of the elements may no longer be in DOM.
    /** @type {!Array<!FixedElementDef>} */
    var toRemove = this.fixedElements_.filter(function (fe) {
      return !_dom.documentContains(_this3.doc, fe.element);
    });
    toRemove.forEach(function (fe) {
      return _this3.removeFixedElement_(fe.element);
    });

    // Next, the positioning-related properties will be measured. If a
    // potentially fixed element turns out to be actually fixed, it will
    // be decorated and possibly move to a separate layer.
    var hasTransferables = false;
    return this.vsync_.runPromise({
      measure: function (state) {
        var autoTopMap = {};

        // Notice that this code intentionally breaks vsync contract.
        // Unfortunately, there's no way to reliably test whether or not
        // `top` has been set to a non-auto value on all platforms. To work
        // this around, this code compares `offsetTop` values with and without
        // `style.top = auto`.

        // 1. Set all style top to `auto` and calculate the auto-offset.
        _this3.fixedElements_.forEach(function (fe) {
          fe.element.style.top = 'auto';
        });
        _this3.fixedElements_.forEach(function (fe) {
          autoTopMap[fe.id] = fe.element. /*OK*/offsetTop;
        });

        // 2. Reset style top.
        _this3.fixedElements_.forEach(function (fe) {
          fe.element.style.top = '';
        });

        // 3. Calculated fixed info.
        _this3.fixedElements_.forEach(function (fe) {
          var element = fe.element;
          var styles = _this3.doc.defaultView. /*OK*/getComputedStyle(element, null);
          if (!styles) {
            // Notice that `styles` can be `null`, courtesy of long-standing
            // Gecko bug: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
            // See #3096 for more details.
            state[fe.id] = {
              fixed: false,
              transferrable: false,
              top: '',
              zIndex: ''
            };
            return;
          }

          var position = styles.getPropertyValue('position');
          // Element is indeed fixed. Visibility is added to the test to
          // avoid moving around invisible elements.
          var isFixed = position == 'fixed' && element. /*OK*/offsetWidth > 0 && element. /*OK*/offsetHeight > 0;
          if (!isFixed) {
            state[fe.id] = {
              fixed: false,
              transferrable: false,
              top: '',
              zIndex: ''
            };
            return;
          }

          // Calculate top, assuming that it could implicitly be `auto`.
          // `getComputedStyle().top` will return `auto` in Safari and the
          // actual calculated value in all other browsers. To find out whether
          // or not the `top` was actually set in CSS, this method compares
          // `offsetTop` with `style.top = 'auto'` and without.
          var top = styles.getPropertyValue('top');
          var currentOffsetTop = element. /*OK*/offsetTop;
          var isImplicitAuto = currentOffsetTop == autoTopMap[fe.id];
          if ((top == 'auto' || isImplicitAuto) && top != '0px' && currentOffsetTop != 0) {
            top = '';
          }

          var bottom = styles.getPropertyValue('bottom');
          var opacity = parseFloat(styles.getPropertyValue('opacity'));
          // Transferability requires element to be fixed and top or bottom to
          // be styled with `0`. Also, do not transfer transparent
          // elements - that's a lot of work for no benefit.  Additionally,
          // transparent elements used for "service" needs and thus
          // best kept in the original tree. The visibility, however, is not
          // considered because `visibility` CSS is inherited. Also, the
          // `height` is constrained to at most 300px. This is to avoid
          // transfering of more substantial sections for now. Likely to be
          // relaxed in the future.
          var isTransferrable = isFixed && opacity > 0 && element. /*OK*/offsetHeight < 300 && (_this3.isAllowedCoord_(top) || _this3.isAllowedCoord_(bottom));
          if (isTransferrable) {
            hasTransferables = true;
          }
          state[fe.id] = {
            fixed: isFixed,
            transferrable: isTransferrable,
            top: top,
            zIndex: styles.getPropertyValue('z-index'),
            transform: styles.getPropertyValue('transform')
          };
        });
      },
      mutate: function (state) {
        if (hasTransferables && _this3.transfer_) {
          var fixedLayer = _this3.getFixedLayer_();
          if (fixedLayer.className != _this3.doc.body.className) {
            fixedLayer.className = _this3.doc.body.className;
          }
        }
        _this3.fixedElements_.forEach(function (fe, i) {
          var feState = state[fe.id];
          if (feState) {
            _this3.mutateFixedElement_(fe, i, feState);
          }
        });
      }
    }, {})['catch'](function (error) {
      // Fail silently.
      _log.dev().error(TAG, 'Failed to mutate fixed elements:', error);
    });
  };

  /**
   * We currently only allow elements with `top: 0` or `bottom: 0`.
   * @param {string} s
   * @return {boolean}
   */

  FixedLayer.prototype.isAllowedCoord_ = function isAllowedCoord_(s) {
    return !!s && parseInt(s, 10) == 0;
  };

  /**
   * Calls `setupFixedSelectors_` in a try-catch.
   * Fails quietly with a dev error if call fails.
   * This method should not be inlined to prevent TryCatch deoptimization.
   * NoInline keyword at the end of function name also prevents Closure compiler
   * from inlining the function.
   * @param {!Array<string>} fixedSelectors
   * @private
   */

  FixedLayer.prototype.trySetupFixedSelectorsNoInline = function trySetupFixedSelectorsNoInline(fixedSelectors) {
    try {
      this.setupFixedSelectors_(fixedSelectors);
    } catch (e) {
      // Fail quietly.
      _log.dev().error(TAG, 'Failed to setup fixed elements:', e);
    }
  };

  /**
   * Calls `setupFixedElement_` for up to 10 elements matching each selector
   * in `fixedSelectors`.
   * @param {!Array<string>} fixedSelectors
   * @private
   */

  FixedLayer.prototype.setupFixedSelectors_ = function setupFixedSelectors_(fixedSelectors) {
    for (var i = 0; i < fixedSelectors.length; i++) {
      var fixedSelector = fixedSelectors[i];
      var elements = this.doc.querySelectorAll(fixedSelector);
      for (var j = 0; j < elements.length; j++) {
        if (j > 10) {
          // We shouldn't have too many of `fixed` elements.
          break;
        }
        this.setupFixedElement_(elements[j], fixedSelector);
      }
    }
  };

  /**
   * This method records the potentially fixed element. One of a more critical
   * function - it records all selectors that may apply "fixed" to this element
   * to check them later.
   *
   * @param {!Element} element
   * @param {string} selector
   * @private
   */

  FixedLayer.prototype.setupFixedElement_ = function setupFixedElement_(element, selector) {
    var fe = null;
    for (var i = 0; i < this.fixedElements_.length; i++) {
      if (this.fixedElements_[i].element == element) {
        fe = this.fixedElements_[i];
        break;
      }
    }
    if (fe) {
      // Already seen.
      fe.selectors.push(selector);
    } else {
      // A new entry.
      var fixedId = 'F' + this.counter_++;
      element.setAttribute('i-amp-fixedid', fixedId);
      element[DECLARED_FIXED_PROP] = true;
      fe = {
        id: fixedId,
        element: element,
        selectors: [selector]
      };
      this.fixedElements_.push(fe);
    }
  };

  /**
   * Removes element from the fixed layer.
   *
   * @param {!Element} element
   * @return {FixedElementDef|undefined} [description]
   * @private
   */

  FixedLayer.prototype.removeFixedElement_ = function removeFixedElement_(element) {
    for (var i = 0; i < this.fixedElements_.length; i++) {
      if (this.fixedElements_[i].element == element) {
        this.vsync_.mutate(function () {
          element.style.top = '';
        });
        var fe = this.fixedElements_[i];
        this.fixedElements_.splice(i, 1);
        return fe;
      }
    }
    return undefined;
  };

  /** @private */

  FixedLayer.prototype.sortInDomOrder_ = function sortInDomOrder_() {
    this.fixedElements_.sort(function (fe1, fe2) {
      // 8 | 2 = 0x0A
      // 2 - preceeding
      // 8 - contains
      if (fe1.element.compareDocumentPosition(fe2.element) & 0x0A != 0) {
        return 1;
      }
      return -1;
    });
  };

  /**
   * Mutates the fixed element. At this point it's determined that the element
   * is indeed fixed. There are two main functions here:
   *  1. `top` has to be updated to reflect viewer's paddingTop.
   *  2. The element may need to be transfered to the separate fixed layer.
   *
   * @param {!FixedElementDef} fe
   * @param {number} index
   * @param {!FixedElementStateDef} state
   * @private
   */

  FixedLayer.prototype.mutateFixedElement_ = function mutateFixedElement_(fe, index, state) {
    var element = fe.element;
    var oldFixed = fe.fixedNow;

    fe.fixedNow = state.fixed;
    fe.top = state.fixed ? state.top : '';
    fe.transform = state.transform;
    if (state.fixed) {
      // Update `top`. This is necessary to adjust position to the viewer's
      // paddingTop.
      element.style.top = state.top ? 'calc(' + state.top + ' + ' + this.paddingTop_ + 'px)' : '';

      // Move element to the fixed layer.
      if (!oldFixed && this.transfer_) {
        if (state.transferrable) {
          this.transferToFixedLayer_(fe, index, state);
        } else {
          this.returnFromFixedLayer_(fe);
        }
      }
    } else if (oldFixed) {
      // Reset `top` which was assigned above.
      if (element.style.top) {
        element.style.top = '';
      }

      // Move back to the BODY layer and reset transfer z-index.
      this.returnFromFixedLayer_(fe);
    }
  };

  /**
   * @param {!FixedElementDef} fe
   * @param {number} index
   * @param {!FixedElementStateDef} state
   * @private
   */

  FixedLayer.prototype.transferToFixedLayer_ = function transferToFixedLayer_(fe, index, state) {
    var _this4 = this;

    var element = fe.element;
    if (element.parentElement == this.fixedLayer_) {
      return;
    }

    _log.dev().fine(TAG, 'transfer to fixed:', fe.id, fe.element);
    _log.user().warn(TAG, 'In order to improve scrolling performance in Safari,' + ' we now move the element to a fixed positioning layer:', fe.element);

    if (!fe.placeholder) {
      // Never been transfered before: ensure that it's properly configured.
      _style.setStyle(element, 'pointer-events', 'initial');
      fe.placeholder = this.doc.createElement('i-amp-fp');
      fe.placeholder.setAttribute('i-amp-fixedid', fe.id);
      _style.setStyle(fe.placeholder, 'display', 'none');
    }

    // Calculate z-index based on the declared z-index and DOM position.
    element.style.zIndex = 'calc(' + (10000 + index) + ' + ' + (state.zIndex || 0) + ')';

    element.parentElement.replaceChild(fe.placeholder, element);
    this.getFixedLayer_().appendChild(element);

    // Test if the element still matches one of the `fixed ` selectors. If not
    // return it back to BODY.
    var matches = fe.selectors.some(function (selector) {
      return _this4.matches_(element, selector);
    });
    if (!matches) {
      _log.user().warn(TAG, 'Failed to move the element to the fixed position layer.' + ' This is most likely due to the compound CSS selector:', fe.element);
      this.returnFromFixedLayer_(fe);
    }
  };

  /**
   * @param {!Element} element
   * @param {string} selector
   * @return {boolean}
   */

  FixedLayer.prototype.matches_ = function matches_(element, selector) {
    try {
      var matcher = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
      if (matcher) {
        return matcher.call(element, selector);
      }
    } catch (e) {
      // Fail silently.
      _log.dev().error(TAG, 'Failed to test query match:', e);
    }
    return false;
  };

  /**
   * @param {!FixedElementDef} fe
   * @private
   */

  FixedLayer.prototype.returnFromFixedLayer_ = function returnFromFixedLayer_(fe) {
    if (!fe.placeholder || !_dom.documentContains(this.doc, fe.placeholder)) {
      return;
    }
    _log.dev().fine(TAG, 'return from fixed:', fe.id, fe.element);
    if (_dom.documentContains(this.doc, fe.element)) {
      if (fe.element.style.zIndex) {
        fe.element.style.zIndex = '';
      }
      fe.placeholder.parentElement.replaceChild(fe.element, fe.placeholder);
    } else {
      fe.placeholder.parentElement.removeChild(fe.placeholder);
    }
  };

  /**
   * @return {?Element}
   */

  FixedLayer.prototype.getFixedLayer_ = function getFixedLayer_() {
    if (!this.transfer_ || this.fixedLayer_) {
      return this.fixedLayer_;
    }
    this.fixedLayer_ = this.doc.createElement('body');
    this.fixedLayer_.id = '-amp-fixedlayer';
    _style.setStyles(this.fixedLayer_, {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 0,
      width: 0,
      pointerEvents: 'none',
      overflow: 'hidden',

      // Reset possible BODY styles.
      animation: 'none',
      background: 'none',
      border: 'none',
      borderImage: 'none',
      boxSizing: 'border-box',
      boxShadow: 'none',
      display: 'block',
      float: 'none',
      margin: 0,
      opacity: 1,
      outline: 'none',
      padding: 'none',
      transform: 'none',
      transition: 'none',
      visibility: 'visible'
    });
    this.doc.documentElement.appendChild(this.fixedLayer_);
    // TODO(erwinm, #4097): Remove this when safari technology preview has merged
    // the fix for https://github.com/ampproject/amphtml/issues/4047
    // https://bugs.webkit.org/show_bug.cgi?id=159791 which is in r202950.
    if (this.fixedLayer_.style['webkitAnimation'] !== undefined) {
      this.fixedLayer_.style['webkitAnimation'] = 'none';
    } else if (this.fixedLayer_.style['WebkitAnimation'] !== undefined) {
      this.fixedLayer_.style['WebkitAnimation'] = 'none';
    }
    return this.fixedLayer_;
  };

  /**
   * @param {!Array<CSSRule>} rules
   * @param {!Array<string>} foundSelectors
   * @private
   */

  FixedLayer.prototype.discoverFixedSelectors_ = function discoverFixedSelectors_(rules, foundSelectors) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type == /* CSSStyleRule */1) {
        if (rule.selectorText != '*' && rule.style.position == 'fixed') {
          foundSelectors.push(rule.selectorText);
        }
      } else if (rule.type == /* CSSMediaRule */4) {
        this.discoverFixedSelectors_(rule.cssRules, foundSelectors);
      } else if (rule.type == /* CSSSupportsRule */12) {
        this.discoverFixedSelectors_(rule.cssRules, foundSelectors);
      }
    }
  };

  return FixedLayer;
})();

exports.FixedLayer = FixedLayer;
var FixedElementDef = undefined;

/**
 * @typedef {{
 *   fixed: boolean,
 *   transferrable: boolean,
 *   top: string,
 *   zIndex: string,
 * }}
 */
var FixedElementStateDef = undefined;

},{"../dom":23,"../log":41,"../platform":47,"../style":84}],61:[function(require,module,exports){
exports.__esModule = true;
exports.installHistoryService = installHistoryService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _pass = require('../pass');

var _service = require('../service');

var _mode = require('../mode');

var _log = require('../log');

var _timer = require('../timer');

var _viewerImpl = require('./viewer-impl');

/** @private @const */
var TAG_ = 'History';

/** @private @const */
var HISTORY_PROP_ = 'AMP.History';

/**
 * @return {*}
 * @private
 */
function historyState_(stackIndex) {
  var state = {};
  state[HISTORY_PROP_] = stackIndex;
  return state;
}

/** @typedef {number} */
var HistoryIdDef = undefined;

var History = (function () {

  /**
   * @param {!Window} win
   * @param {!HistoryBindingInterface} binding
   */

  function History(win, binding) {
    babelHelpers.classCallCheck(this, History);

    /** @private @const {!../service/timer-impl.Timer} */
    this.timer_ = _timer.timerFor(win);

    /** @private @const {!HistoryBindingInterface} */
    this.binding_ = binding;

    /** @private {number} */
    this.stackIndex_ = 0;

    /** @private {!Array<!Function|undefined>} */
    this.stackOnPop_ = [];

    /** @private {!Array<!{callback:function():!Promise, resolve:!Function,reject:!Function}>} */
    this.queue_ = [];

    this.binding_.setOnStackIndexUpdated(this.onStackIndexUpdated_.bind(this));
  }

  /**
   * HistoryBindingInterface is an interface that defines an underlying technology
   * behind the {@link History}.
   * @interface
   */

  /** @private */

  History.prototype.cleanup_ = function cleanup_() {
    this.binding_.cleanup_();
  };

  /**
   * Pushes new state into history stack with an optional callback to be called
   * when this state is popped.
   * @param {!Function=} opt_onPop
   * @return {!Promise<!HistoryIdDef>}
   */

  History.prototype.push = function push(opt_onPop) {
    var _this = this;

    return this.enque_(function () {
      return _this.binding_.push().then(function (stackIndex) {
        _this.onStackIndexUpdated_(stackIndex);
        if (opt_onPop) {
          _this.stackOnPop_[stackIndex] = opt_onPop;
        }
        return stackIndex;
      });
    });
  };

  /**
   * Pops a previously pushed state from the history stack. If onPop callback
   * has been registered, it will be called. All states coming after this
   * state will also be popped and their callbacks executed.
   * @param {!HistoryIdDef} stateId
   * @return {!Promise}
   */

  History.prototype.pop = function pop(stateId) {
    var _this2 = this;

    return this.enque_(function () {
      return _this2.binding_.pop(stateId).then(function (stackIndex) {
        _this2.onStackIndexUpdated_(stackIndex);
      });
    });
  };

  /**
   * @param {number} stackIndex
   * @private
   */

  History.prototype.onStackIndexUpdated_ = function onStackIndexUpdated_(stackIndex) {
    this.stackIndex_ = stackIndex;
    this.doPop_();
  };

  /** @private */

  History.prototype.doPop_ = function doPop_() {
    if (this.stackIndex_ >= this.stackOnPop_.length - 1) {
      return;
    }

    var toPop = [];
    for (var i = this.stackOnPop_.length - 1; i > this.stackIndex_; i--) {
      if (this.stackOnPop_[i]) {
        toPop.push(this.stackOnPop_[i]);
        this.stackOnPop_[i] = undefined;
      }
    }
    this.stackOnPop_.splice(this.stackIndex_ + 1);

    if (toPop.length > 0) {
      for (var i = 0; i < toPop.length; i++) {
        // With the same delay timeouts must observe the order, although
        // there's no hard requirement in this case to follow the pop order.
        this.timer_.delay(toPop[i], 1);
      }
    }
  };

  /**
   * @param {function():!Promise<RESULT>} callback
   * @return {!Promise<RESULT>}
   * @template RESULT
   * @private
   */

  History.prototype.enque_ = function enque_(callback) {
    var resolve = undefined;
    var reject = undefined;
    var promise = new Promise(function (aResolve, aReject) {
      resolve = aResolve;
      reject = aReject;
    });

    this.queue_.push({ callback: callback, resolve: resolve, reject: reject });
    if (this.queue_.length == 1) {
      this.deque_();
    }

    return promise;
  };

  /**
   * @private
   */

  History.prototype.deque_ = function deque_() {
    var _this3 = this;

    if (this.queue_.length == 0) {
      return;
    }

    var task = this.queue_[0];
    var promise = undefined;
    try {
      promise = task.callback();
    } catch (e) {
      promise = Promise.reject(e);
    }

    promise.then(function (result) {
      task.resolve(result);
    }, function (reason) {
      _log.dev().error(TAG_, 'failed to execute a task:', reason);
      task.reject(reason);
    }).then(function () {
      _this3.queue_.splice(0, 1);
      _this3.deque_();
    });
  };

  return History;
})();

exports.History = History;

var HistoryBindingInterface = (function () {
  function HistoryBindingInterface() {
    babelHelpers.classCallCheck(this, HistoryBindingInterface);
  }

  /**
   * Implementation of HistoryBindingInterface based on the native window. It uses
   * window.history properties and events.
   *
   * Visible for testing.
   *
   * @implements {HistoryBindingInterface}
   */

  /** @private */

  HistoryBindingInterface.prototype.cleanup_ = function cleanup_() {};

  /**
   * Configures a callback to be called when stack index has been updated.
   * @param {function(number)} unusedCallback
   * @protected
   */

  HistoryBindingInterface.prototype.setOnStackIndexUpdated = function setOnStackIndexUpdated(unusedCallback) {};

  /**
   * Pushes new state into the history stack. Returns promise that yields new
   * stack index.
   * @return {!Promise<number>}
   */

  HistoryBindingInterface.prototype.push = function push() {};

  /**
   * Pops a previously pushed state from the history stack. All states coming
   * after this state will also be popped. Returns promise that yields new
   * state index.
   * @param {number} unusedStackIndex
   * @return {!Promise<number>}
   */

  HistoryBindingInterface.prototype.pop = function pop(unusedStackIndex) {};

  return HistoryBindingInterface;
})();

var HistoryBindingNatural_ = (function () {

  /**
   * @param {!Window} win
   */

  function HistoryBindingNatural_(win) {
    var _this4 = this;

    babelHelpers.classCallCheck(this, HistoryBindingNatural_);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!../service/timer-impl.Timer} */
    this.timer_ = _timer.timerFor(win);

    var history = this.win.history;

    /** @private {number} */
    this.startIndex_ = history.length - 1;
    if (history.state && history.state[HISTORY_PROP_] !== undefined) {
      this.startIndex_ = Math.min(history.state[HISTORY_PROP_], this.startIndex_);
    }

    /** @private {number} */
    this.stackIndex_ = this.startIndex_;

    /**
     * @private {{promise: !Promise, resolve: !Function,
     *   reject: !Function}|undefined}
     */
    this.waitingState_;

    /** @private {?function(number)} */
    this.onStackIndexUpdated_ = null;

    // A number of browsers do not support history.state. In this cases,
    // History will track its own version. See unsupportedState_.
    /** @private {boolean} @const */
    this.supportsState_ = 'state' in history;

    /** @private {*} */
    this.unsupportedState_ = historyState_(this.stackIndex_);

    // There are still browsers who do not support push/replaceState.
    var pushState = undefined,
        replaceState = undefined;
    if (history.pushState && history.replaceState) {
      /** @private @const {function(*, string=, string=)|undefined} */
      this.origPushState_ = history.originalPushState || history.pushState.bind(history);
      /** @private @const {function(*, string=, string=)|undefined} */
      this.origReplaceState_ = history.originalReplaceState || history.replaceState.bind(history);
      pushState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
        _this4.origPushState_(state, opt_title, opt_url);
      };
      replaceState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
        // NOTE: check for `undefined` since IE11 and Edge
        // unexpectedly coerces it into a `string`.
        if (opt_url !== undefined) {
          _this4.origReplaceState_(state, opt_title, opt_url);
        } else {
          _this4.origReplaceState_(state, opt_title);
        }
      };
      if (!history.originalPushState) {
        history.originalPushState = this.origPushState_;
      }
      if (!history.originalReplaceState) {
        history.originalReplaceState = this.origReplaceState_;
      }
    } else {
      pushState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
      };
      replaceState = function (state, opt_title, opt_url) {
        _this4.unsupportedState_ = state;
      };
    }

    /** @private @const {!Function} */
    this.pushState_ = pushState;

    /** @private @const {!Function} */
    this.replaceState_ = replaceState;

    try {
      this.replaceState_(historyState_(this.stackIndex_));
    } catch (e) {
      _log.dev().error(TAG_, 'Initial replaceState failed: ' + e.message);
    }

    history.pushState = this.historyPushState_.bind(this);
    history.replaceState = this.historyReplaceState_.bind(this);

    var eventPass = new _pass.Pass(this.win, this.onHistoryEvent_.bind(this), 50);
    this.popstateHandler_ = function (e) {
      _log.dev().fine(TAG_, 'popstate event: ' + _this4.win.history.length + ', ' + JSON.stringify(e.state));
      eventPass.schedule();
    };
    this.hashchangeHandler_ = function () {
      _log.dev().fine(TAG_, 'hashchange event: ' + _this4.win.history.length + ', ' + _this4.win.location.hash);
      eventPass.schedule();
    };
    this.win.addEventListener('popstate', this.popstateHandler_);
    this.win.addEventListener('hashchange', this.hashchangeHandler_);
  }

  /**
   * Implementation of HistoryBindingInterface that assumes a virtual history that
   * relies on viewer's "pushHistory", "popHistory" and "historyPopped"
   * protocol.
   *
   * Visible for testing.
   *
   * @implements {HistoryBindingInterface}
   */

  /** @override */

  HistoryBindingNatural_.prototype.cleanup_ = function cleanup_() {
    if (this.origPushState_) {
      this.win.history.pushState = this.origPushState_;
    }
    if (this.origReplaceState_) {
      this.win.history.replaceState = this.origReplaceState_;
    }
    this.win.removeEventListener('popstate', this.popstateHandler_);
    this.win.removeEventListener('hashchange', this.hashchangeHandler_);
  };

  /** @override */

  HistoryBindingNatural_.prototype.setOnStackIndexUpdated = function setOnStackIndexUpdated(callback) {
    this.onStackIndexUpdated_ = callback;
  };

  /** @override */

  HistoryBindingNatural_.prototype.push = function push() {
    var _this5 = this;

    return this.whenReady_(function () {
      _this5.historyPushState_();
      return Promise.resolve(_this5.stackIndex_);
    });
  };

  /** @override */

  HistoryBindingNatural_.prototype.pop = function pop(stackIndex) {
    var _this6 = this;

    // On pop, stack is not allowed to go prior to the starting point.
    stackIndex = Math.max(stackIndex, this.startIndex_);
    return this.whenReady_(function () {
      return _this6.back_(_this6.stackIndex_ - stackIndex + 1);
    });
  };

  /**
   * @param {number} stackIndex
   * @return {!Promise}
   */

  HistoryBindingNatural_.prototype.backTo = function backTo(stackIndex) {
    var _this7 = this;

    // On pop, stack is not allowed to go prior to the starting point.
    stackIndex = Math.max(stackIndex, this.startIndex_);
    return this.whenReady_(function () {
      return _this7.back_(_this7.stackIndex_ - stackIndex);
    });
  };

  /** @private */

  HistoryBindingNatural_.prototype.onHistoryEvent_ = function onHistoryEvent_() {
    var state = this.getState_();
    _log.dev().fine(TAG_, 'history event: ' + this.win.history.length + ', ' + JSON.stringify(state));
    var stackIndex = state ? state[HISTORY_PROP_] : undefined;
    var newStackIndex = this.stackIndex_;
    var waitingState = this.waitingState_;
    this.waitingState_ = undefined;

    if (newStackIndex > this.win.history.length - 2) {
      // Make sure stack has enough space. Whether we are going forward or
      // backward, the stack should have at least one extra cell.
      newStackIndex = this.win.history.length - 2;
      this.updateStackIndex_(newStackIndex);
    }

    if (stackIndex == undefined) {
      // A new navigation forward by the user().
      newStackIndex = newStackIndex + 1;
    } else if (stackIndex < this.win.history.length) {
      // A simple trip back.
      newStackIndex = stackIndex;
    } else {
      // Generally not possible, but for posterity.
      newStackIndex = this.win.history.length - 1;
    }

    // If state index has been updated as the result replace the state.
    if (!state) {
      state = {};
    }
    state[HISTORY_PROP_] = newStackIndex;
    this.replaceState_(state, undefined, undefined);

    // Update the stack, pop squeezed states.
    if (newStackIndex != this.stackIndex_) {
      this.updateStackIndex_(newStackIndex);
    }

    // User navigation is allowed to move past the starting point of
    // the history stack.
    if (newStackIndex < this.startIndex_) {
      this.startIndex_ = newStackIndex;
    }

    if (waitingState) {
      waitingState.resolve();
    }
  };

  /** @private */

  HistoryBindingNatural_.prototype.getState_ = function getState_() {
    if (this.supportsState_) {
      return this.win.history.state;
    }
    return this.unsupportedState_;
  };

  /** @private */

  HistoryBindingNatural_.prototype.assertReady_ = function assertReady_() {
    _log.dev().assert(!this.waitingState_, 'The history must not be in the waiting state');
  };

  /**
   * @param {function():!Promise<RESULT>} callback
   * @return {!Promise<RESULT>}
   * @template RESULT
   * @private
   */

  HistoryBindingNatural_.prototype.whenReady_ = function whenReady_(callback) {
    if (!this.waitingState_) {
      return callback();
    }
    return this.waitingState_.promise.then(callback, callback);
  };

  /**
   * @return {!Promise}
   * @private
   */

  HistoryBindingNatural_.prototype.wait_ = function wait_() {
    this.assertReady_();
    var resolve = undefined;
    var reject = undefined;
    var promise = this.timer_.timeoutPromise(500, new Promise(function (aResolve, aReject) {
      resolve = aResolve;
      reject = aReject;
    }));
    this.waitingState_ = { promise: promise, resolve: resolve, reject: reject };
    return promise;
  };

  /**
   * @param {number} steps
   * @return {!Promise}
   */

  HistoryBindingNatural_.prototype.back_ = function back_(steps) {
    var _this8 = this;

    this.assertReady_();
    if (steps <= 0) {
      return Promise.resolve(this.stackIndex_);
    }
    this.unsupportedState_ = historyState_(this.stackIndex_ - steps);
    var promise = this.wait_();
    this.win.history.go(-steps);
    return promise.then(function () {
      return Promise.resolve(_this8.stackIndex_);
    });
  };

  /**
   * @param {*=} state
   * @param {(string|undefined)=} title
   * @param {(string|undefined)=} url
   * @private
   */

  HistoryBindingNatural_.prototype.historyPushState_ = function historyPushState_(state, title, url) {
    this.assertReady_();
    if (!state) {
      state = {};
    }
    var stackIndex = this.stackIndex_ + 1;
    state[HISTORY_PROP_] = stackIndex;
    this.pushState_(state, title, url);
    if (stackIndex != this.win.history.length - 1) {
      stackIndex = this.win.history.length - 1;
      state[HISTORY_PROP_] = stackIndex;
      this.replaceState_(state);
    }
    this.updateStackIndex_(stackIndex);
  };

  /**
   * @param {*=} state
   * @param {(string|undefined)=} title
   * @param {(string|undefined)=} url
   * @private
   */

  HistoryBindingNatural_.prototype.historyReplaceState_ = function historyReplaceState_(state, title, url) {
    this.assertReady_();
    if (!state) {
      state = {};
    }
    var stackIndex = Math.min(this.stackIndex_, this.win.history.length - 1);
    state[HISTORY_PROP_] = stackIndex;
    this.replaceState_(state, title, url);
    this.updateStackIndex_(stackIndex);
  };

  /**
   * @param {number} stackIndex
   * @private
   */

  HistoryBindingNatural_.prototype.updateStackIndex_ = function updateStackIndex_(stackIndex) {
    this.assertReady_();
    stackIndex = Math.min(stackIndex, this.win.history.length - 1);
    if (this.stackIndex_ != stackIndex) {
      _log.dev().fine(TAG_, 'stack index changed: ' + this.stackIndex_ + ' -> ' + stackIndex);
      this.stackIndex_ = stackIndex;
      if (this.onStackIndexUpdated_) {
        this.onStackIndexUpdated_(stackIndex);
      }
    }
  };

  return HistoryBindingNatural_;
})();

exports.HistoryBindingNatural_ = HistoryBindingNatural_;

var HistoryBindingVirtual_ = (function () {

  /**
   * @param {!./viewer-impl.Viewer} viewer
   */

  function HistoryBindingVirtual_(viewer) {
    babelHelpers.classCallCheck(this, HistoryBindingVirtual_);

    /** @private @const */
    this.viewer_ = viewer;

    /** @private {number} */
    this.stackIndex_ = 0;

    /** @private {?function(number)} */
    this.onStackIndexUpdated_ = null;

    /** @private {!UnlistenDef} */
    this.unlistenOnHistoryPopped_ = this.viewer_.onHistoryPoppedEvent(this.onHistoryPopped_.bind(this));
  }

  /**
   * @param {!Window} window
   * @return {!History}
   * @private
   */

  /** @override */

  HistoryBindingVirtual_.prototype.cleanup_ = function cleanup_() {
    this.unlistenOnHistoryPopped_();
  };

  /** @override */

  HistoryBindingVirtual_.prototype.setOnStackIndexUpdated = function setOnStackIndexUpdated(callback) {
    this.onStackIndexUpdated_ = callback;
  };

  /** @override */

  HistoryBindingVirtual_.prototype.push = function push() {
    // Current implementation doesn't wait for response from viewer.
    this.updateStackIndex_(this.stackIndex_ + 1);
    this.viewer_.postPushHistory(this.stackIndex_);
    return Promise.resolve(this.stackIndex_);
  };

  /** @override */

  HistoryBindingVirtual_.prototype.pop = function pop(stackIndex) {
    if (stackIndex > this.stackIndex_) {
      return Promise.resolve(this.stackIndex_);
    }
    this.viewer_.postPopHistory(stackIndex);
    this.updateStackIndex_(stackIndex - 1);
    return Promise.resolve(this.stackIndex_);
  };

  /**
   * @param {!./viewer-impl.ViewerHistoryPoppedEventDef} event
   * @private
   */

  HistoryBindingVirtual_.prototype.onHistoryPopped_ = function onHistoryPopped_(event) {
    this.updateStackIndex_(event.newStackIndex);
  };

  /**
   * @param {number} stackIndex
   * @private
   */

  HistoryBindingVirtual_.prototype.updateStackIndex_ = function updateStackIndex_(stackIndex) {
    if (this.stackIndex_ != stackIndex) {
      _log.dev().fine(TAG_, 'stack index changed: ' + this.stackIndex_ + ' -> ' + stackIndex);
      this.stackIndex_ = stackIndex;
      if (this.onStackIndexUpdated_) {
        this.onStackIndexUpdated_(stackIndex);
      }
    }
  };

  return HistoryBindingVirtual_;
})();

exports.HistoryBindingVirtual_ = HistoryBindingVirtual_;
function createHistory_(window) {
  var viewer = _viewerImpl.installViewerService(window);
  var binding = undefined;
  if (viewer.isOvertakeHistory() || _mode.getMode().test) {
    binding = new HistoryBindingVirtual_(viewer);
  } else {
    binding = new HistoryBindingNatural_(window);
  }
  return new History(window, binding);
};

/**
 * @param {!Window} window
 */

function installHistoryService(window) {
  _service.getService(window, 'history', function () {
    return createHistory_(window);
  });
}

;

},{"../log":41,"../mode":43,"../pass":45,"../service":56,"../timer":86,"./viewer-impl":74}],62:[function(require,module,exports){
exports.__esModule = true;
exports.checkAndFix = checkAndFix;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('../log');

var _platform = require('../platform');

var TAG = 'ie-media-bug';

/**
 * An ugly fix for IE's problem with `matchMedia` API, where media queries
 * are evaluated incorrectly. See #2577 for more details. Returns the promise
 * that will be resolved when the bug is fixed.
 * @param {!Window} win
 * @param {!../service/platform-impl.Platform=} opt_platform
 * @return {?Promise}
 * @package
 */

function checkAndFix(win, opt_platform) {
  var platform = opt_platform || _platform.platformFor(win);
  if (!platform.isIe() || matchMediaIeQuite(win)) {
    return null;
  }

  // Poll until the expression resolves correctly, but only up to a point.
  return new Promise(function (resolve) {
    var endTime = Date.now() + 2000;
    var interval = win.setInterval(function () {
      var now = Date.now();
      var matches = matchMediaIeQuite(win);
      if (matches || now > endTime) {
        win.clearInterval(interval);
        resolve();
        if (!matches) {
          _log.dev().error(TAG, 'IE media never resolved');
        }
      }
    }, 10);
  });
}

/**
 * @param {!Window} win
 * @return {boolean}
 * @private
 */
function matchMediaIeQuite(win) {
  var q = '(min-width: ' + win. /*OK*/innerWidth + 'px)' + (' AND (max-width: ' + win. /*OK*/innerWidth + 'px)');
  try {
    return win.matchMedia(q).matches;
  } catch (e) {
    _log.dev().error(TAG, 'IE matchMedia failed: ', e);
    // Return `true` to avoid polling on a broken API.
    return true;
  }
}

},{"../log":41,"../platform":47}],63:[function(require,module,exports){
exports.__esModule = true;
exports.checkAndFix = checkAndFix;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _platform = require('../platform');

var _viewer = require('../viewer');

var _vsync = require('../vsync');

/**
 * An ugly fix for iOS Safari version 7 and 8 problem with the scrolling
 * freezes completely on initialization. Unfortunately there's no a sure
 * way to recognize that the scrolling is frozen, so the fix has to be
 * executed in either case for the applicable situation, which is: iOS Safari
 * and version < 9 and "b29185497" viewer parameter is provided. The fix
 * itself is to force the document-wide relayout. The fix does not introduce
 * FOUC, but does consume resources to perform relayout itself.
 *
 * See #3481 for more details.
 *
 * @param {!Window} win
 * @param {!../service/platform-impl.Platform=} opt_platform
 * @param {!./viewer-impl.Viewer=} opt_viewer
 * @param {!./vsync-impl.Vsync=} opt_vsync
 * @return {?Promise}
 * @package
 */

function checkAndFix(win, opt_platform, opt_viewer, opt_vsync) {
  var platform = opt_platform || _platform.platformFor(win);
  var viewer = opt_viewer || _viewer.viewerFor(win);
  var vsync = opt_vsync || _vsync.vsyncFor(win);
  if (!platform.isIos() || !platform.isSafari() || platform.getMajorVersion() > 8 || viewer.getParam('b29185497') != '1') {
    return null;
  }
  return new Promise(function (resolve) {
    // Reset `bottom` CSS. This will force the major relayout.
    vsync.mutate(function () {
      win.document.body.style.bottom = '';
      vsync.mutate(function () {
        win.document.body.style.bottom = '0px';
        resolve();
      });
    });
  });
}

},{"../platform":47,"../viewer":96,"../vsync":99}],64:[function(require,module,exports){
exports.__esModule = true;
exports.installPlatformService = installPlatformService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('../service');

/**
 * A helper class that provides information about device/OS/browser currently
 * running.
 */

var Platform = (function () {

  /**
   * @param {!Window} win
   */

  function Platform(win) {
    babelHelpers.classCallCheck(this, Platform);

    /** @const @private {!Navigator} */
    this.navigator_ = /** @type {!Navigator} */win.navigator;
  }

  /**
   * Whether the current platform an Android device.
   * @return {boolean}
   */

  Platform.prototype.isAndroid = function isAndroid() {
    return (/Android/i.test(this.navigator_.userAgent)
    );
  };

  /**
   * Whether the current platform an iOS device.
   * @return {boolean}
   */

  Platform.prototype.isIos = function isIos() {
    return (/iPhone|iPad|iPod/i.test(this.navigator_.userAgent)
    );
  };

  /**
   * Whether the current browser is Safari.
   * @return {boolean}
   */

  Platform.prototype.isSafari = function isSafari() {
    return (/Safari/i.test(this.navigator_.userAgent) && !this.isChrome() && !this.isEdge()
    );
  };

  /**
   * Whether the current browser is a Chrome browser.
   * @return {boolean}
   */

  Platform.prototype.isChrome = function isChrome() {
    // Also true for MS Edge :)
    return (/Chrome|CriOS/i.test(this.navigator_.userAgent) && !this.isEdge()
    );
  };

  /**
   * Whether the current browser is a Firefox browser.
   * @return {boolean}
   */

  Platform.prototype.isFirefox = function isFirefox() {
    return (/Firefox/i.test(this.navigator_.userAgent) && !this.isEdge()
    );
  };

  /**
   * Whether the current browser is a IE browser.
   * @return {boolean}
   */

  Platform.prototype.isIe = function isIe() {
    return (/MSIE/i.test(this.navigator_.userAgent) || /IEMobile/i.test(this.navigator_.userAgent)
    );
  };

  /**
   * Whether the current browser is an Edge browser.
   * @return {boolean}
   */

  Platform.prototype.isEdge = function isEdge() {
    return (/Edge/i.test(this.navigator_.userAgent)
    );
  };

  /**
   * Whether the current browser is based on the WebKit engine.
   * @return {boolean}
   */

  Platform.prototype.isWebKit = function isWebKit() {
    return (/WebKit/i.test(this.navigator_.userAgent) && !this.isEdge()
    );
  };

  /**
   * Returns the major version of the browser.
   * @return {number}
   */

  Platform.prototype.getMajorVersion = function getMajorVersion() {
    if (this.isSafari()) {
      return this.evalMajorVersion_(/\sVersion\/(\d+)/, 1);
    }
    if (this.isChrome()) {
      return this.evalMajorVersion_(/\Chrome\/(\d+)/, 1);
    }
    if (this.isFirefox()) {
      return this.evalMajorVersion_(/\Firefox\/(\d+)/, 1);
    }
    if (this.isIe()) {
      return this.evalMajorVersion_(/\MSIE\s(\d+)/, 1);
    }
    if (this.isEdge()) {
      return this.evalMajorVersion_(/\Edge\/(\d+)/, 1);
    }
    return 0;
  };

  /**
   * @param {!RegExp} expr
   * @param {number} index The index in the result that's interpreted as the
   *   major version (integer).
   * @return {number}
   */

  Platform.prototype.evalMajorVersion_ = function evalMajorVersion_(expr, index) {
    if (!this.navigator_.userAgent) {
      return 0;
    }
    var res = this.navigator_.userAgent.match(expr);
    if (!res || index >= res.length) {
      return 0;
    }
    return parseInt(res[index], 10);
  };

  return Platform;
})();

exports.Platform = Platform;
;

/**
 * @param {!Window} window
 * @return {!Platform}
 */

function installPlatformService(window) {
  return _service.fromClass(window, 'platform', Platform);
}

;

},{"../service":56}],65:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _layoutRect = require('../layout-rect');

var _log = require('../log');

var _style = require('../style');

var TAG = 'Resource';
var RESOURCE_PROP_ = '__AMP__RESOURCE';
var OWNER_PROP_ = '__AMP__OWNER';

/**
 * Resource state.
 *
 * @enum {number}
 */
var ResourceState = {
  /**
   * The resource has not been built yet. Measures, layouts, preloads or
   * viewport signals are not allowed.
   */
  NOT_BUILT: 0,

  /**
   * The resource has been built, but not measured yet and not yet ready
   * for layout.
   */
  NOT_LAID_OUT: 1,

  /**
   * The resource has been built and measured and ready for layout.
   */
  READY_FOR_LAYOUT: 2,

  /**
   * The resource is currently scheduled for layout.
   */
  LAYOUT_SCHEDULED: 3,

  /**
   * The resource has been laid out.
   */
  LAYOUT_COMPLETE: 4,

  /**
   * The latest resource's layout failed.
   */
  LAYOUT_FAILED: 5
};

exports.ResourceState = ResourceState;
/**
 * A Resource binding for an AmpElement.
 * @package
 */

var Resource = (function () {

  /**
   * @param {!Element} element
   * @return {!Resource}
   */

  Resource.forElement = function forElement(element) {
    return (/** @type {!Resource} */_log.dev().assert(Resource.forElementOptional(element), 'Missing resource prop on %s', element)
    );
  };

  /**
   * @param {!Element} element
   * @return {?Resource}
   */

  Resource.forElementOptional = function forElementOptional(element) {
    return (/** @type {!Resource} */element[RESOURCE_PROP_]
    );
  };

  /**
   * Assigns an owner for the specified element. This means that the resources
   * within this element will be managed by the owner and not Resources manager.
   * @param {!Element} element
   * @param {!AmpElement} owner
   */

  Resource.setOwner = function setOwner(element, owner) {
    _log.dev().assert(owner.contains(element), 'Owner must contain the element');
    element[OWNER_PROP_] = owner;
  };

  /**
   * @param {number} id
   * @param {!AmpElement} element
   * @param {!./resources-impl.Resources} resources
   */

  function Resource(id, element, resources) {
    var _this = this;

    babelHelpers.classCallCheck(this, Resource);

    element[RESOURCE_PROP_] = this;

    /** @private {number} */
    this.id_ = id;

    /** @export @const {!AmpElement} */
    this.element = element;

    /** @export @const {string} */
    this.debugid = element.tagName.toLowerCase() + '#' + id;

    /** @const {!Window} */
    this.hostWin = element.ownerDocument.defaultView;

    /** @private {!./resources-impl.Resources} */
    this.resources_ = resources;

    /** @private {boolean} */
    this.blacklisted_ = false;

    /** @private {!AmpElement|undefined|null} */
    this.owner_ = undefined;

    /** @private {!ResourceState} */
    this.state_ = element.isBuilt() ? ResourceState.NOT_LAID_OUT : ResourceState.NOT_BUILT;

    /** @private {number} */
    this.layoutCount_ = 0;

    /** @private {boolean} */
    this.isFixed_ = false;

    /** @private {!../layout-rect.LayoutRectDef} */
    this.layoutBox_ = _layoutRect.layoutRectLtwh(-10000, -10000, 0, 0);

    /** @private {!../layout-rect.LayoutRectDef} */
    this.initialLayoutBox_ = this.layoutBox_;

    /** @private {boolean} */
    this.isMeasureRequested_ = false;

    /** @private {boolean} */
    this.isInViewport_ = false;

    /** @private {?Promise<undefined>} */
    this.layoutPromise_ = null;

    /**
     * Pending change size that was requested but could not be satisfied.
     * @private {!./resources-impl.SizeDef|undefined}
     */
    this.pendingChangeSize_ = undefined;

    /** @private {boolean} */
    this.loadedOnce_ = false;

    /** @private {?Function} */
    this.loadPromiseResolve_ = null;

    /** @private @const {!Promise} */
    this.loadPromise_ = new Promise(function (resolve) {
      _this.loadPromiseResolve_ = resolve;
    }).then(function () {
      _this.loadedOnce_ = true;
    });

    /** @private {boolean} */
    this.paused_ = false;
  }

  /**
   * Returns resource's ID.
   * @return {number}
   */

  Resource.prototype.getId = function getId() {
    return this.id_;
  };

  /**
   * Returns an owner element or null.
   * @return {?AmpElement}
   */

  Resource.prototype.getOwner = function getOwner() {
    if (this.owner_ === undefined) {
      for (var n = this.element; n; n = n.parentElement) {
        if (n[OWNER_PROP_]) {
          this.owner_ = n[OWNER_PROP_];
          break;
        }
      }
      if (this.owner_ === undefined) {
        this.owner_ = null;
      }
    }
    return this.owner_;
  };

  /**
   * Whether the resource has an owner.
   * @return {boolean}
   */

  Resource.prototype.hasOwner = function hasOwner() {
    return !!this.getOwner();
  };

  /**
   * Returns the resource's element priority.
   * @return {number}
   */

  Resource.prototype.getPriority = function getPriority() {
    return this.element.getPriority();
  };

  /**
   * Returns the resource's state. See {@link ResourceState} for details.
   * @return {!ResourceState}
   */

  Resource.prototype.getState = function getState() {
    return this.state_;
  };

  /**
   * Requests the resource's element to be built. See {@link AmpElement.build}
   * for details.
   */

  Resource.prototype.build = function build() {
    if (this.blacklisted_ || !this.element.isUpgraded()) {
      return;
    }
    try {
      this.element.build();
    } catch (e) {
      _log.dev().error(TAG, 'failed to build:', this.debugid, e);
      this.blacklisted_ = true;
      return;
    }

    if (this.hasBeenMeasured()) {
      this.state_ = ResourceState.READY_FOR_LAYOUT;
    } else {
      this.state_ = ResourceState.NOT_LAID_OUT;
    }
  };

  /**
   * Optionally hides or shows the element depending on the media query.
   */

  Resource.prototype.applySizesAndMediaQuery = function applySizesAndMediaQuery() {
    this.element.applySizesAndMediaQuery();
  };

  /**
   * Instructs the element to change its size and transitions to the state
   * awaiting the measure and possibly layout.
   * @param {number|undefined} newHeight
   * @param {number|undefined} newWidth
   */

  Resource.prototype.changeSize = function changeSize(newHeight, newWidth) {
    this.element. /*OK*/changeSize(newHeight, newWidth);
    // Schedule for re-layout.
    if (this.state_ != ResourceState.NOT_BUILT) {
      this.state_ = ResourceState.NOT_LAID_OUT;
    }
  };

  /**
   * Informs the element that it's either overflown or not.
   * @param {boolean} overflown
   * @param {number|undefined} requestedHeight
   * @param {number|undefined} requestedWidth
   */

  Resource.prototype.overflowCallback = function overflowCallback(overflown, requestedHeight, requestedWidth) {
    if (overflown) {
      this.pendingChangeSize_ = {
        height: requestedHeight,
        width: requestedWidth
      };
    }
    this.element.overflowCallback(overflown, requestedHeight, requestedWidth);
  };

  Resource.prototype.resetPendingChangeSize = function resetPendingChangeSize() {
    this.pendingChangeSize_ = undefined;
  };

  /**
   * @return {!./resources-impl.SizeDef|undefined}
   */

  Resource.prototype.getPendingChangeSize = function getPendingChangeSize() {
    return this.pendingChangeSize_;
  };

  /**
   * Measures the resource's boundaries. Only allowed for upgraded elements.
   */

  Resource.prototype.measure = function measure() {
    this.isMeasureRequested_ = false;
    var box = this.resources_.getViewport().getLayoutRect(this.element);
    // Note that "left" doesn't affect readiness for the layout.
    if (this.state_ == ResourceState.NOT_LAID_OUT || this.layoutBox_.top != box.top || this.layoutBox_.width != box.width || this.layoutBox_.height != box.height) {

      if (this.element.isUpgraded() && this.state_ != ResourceState.NOT_BUILT && (this.state_ == ResourceState.NOT_LAID_OUT || this.element.isRelayoutNeeded())) {
        this.state_ = ResourceState.READY_FOR_LAYOUT;
      }
    }
    if (!this.hasBeenMeasured()) {
      this.initialLayoutBox_ = box;
    }
    this.layoutBox_ = box;

    // Calculate whether the element is currently is or in `position:fixed`.
    var isFixed = false;
    if (this.isDisplayed()) {
      var win = this.resources_.win;
      var body = win.document.body;
      var viewport = this.resources_.getViewport();
      for (var n = this.element; n && n != body; n = n. /*OK*/offsetParent) {
        if (n.isAlwaysFixed && n.isAlwaysFixed()) {
          isFixed = true;
          break;
        }
        if (viewport.isDeclaredFixed(n) && win. /*OK*/getComputedStyle(n).position == 'fixed') {
          isFixed = true;
          break;
        }
      }
    }
    this.isFixed_ = isFixed;

    this.element.updateLayoutBox(box);
  };

  /**
   * Completes collapse: ensures that the element is `display:none` and
   * updates layout box.
   */

  Resource.prototype.completeCollapse = function completeCollapse() {
    _style.toggle(this.element, false);
    this.layoutBox_ = _layoutRect.layoutRectLtwh(this.layoutBox_.left, this.layoutBox_.top, 0, 0);
    this.isFixed_ = false;
    this.element.updateLayoutBox(this.layoutBox_);
  };

  /**
   * @return {boolean}
   */

  Resource.prototype.isMeasureRequested = function isMeasureRequested() {
    return this.isMeasureRequested_;
  };

  /**
   * Checks if the current resource has been measured.
   * @return {boolean}
   */

  Resource.prototype.hasBeenMeasured = function hasBeenMeasured() {
    return this.layoutBox_.top != -10000;
  };

  /**
   * Requests the element to be remeasured on the next pass.
   */

  Resource.prototype.requestMeasure = function requestMeasure() {
    if (this.state_ == ResourceState.NOT_BUILT) {
      // Can't measure unbuilt element.
      return;
    }
    this.isMeasureRequested_ = true;
  };

  /**
   * Returns a previously measured layout box.
   * @return {!../layout-rect.LayoutRectDef}
   */

  Resource.prototype.getLayoutBox = function getLayoutBox() {
    return this.layoutBox_;
  };

  /**
   * Returns the first measured layout box.
   * @return {!../layout-rect.LayoutRectDef}
   */

  Resource.prototype.getInitialLayoutBox = function getInitialLayoutBox() {
    return this.initialLayoutBox_;
  };

  /**
   * Whether the resource is displayed, i.e. if it has non-zero width and
   * height.
   * @return {boolean}
   */

  Resource.prototype.isDisplayed = function isDisplayed() {
    return this.layoutBox_.height > 0 && this.layoutBox_.width > 0;
  };

  /**
   * Whether the element is fixed according to the latest measurement.
   * @return {boolean}
   */

  Resource.prototype.isFixed = function isFixed() {
    return this.isFixed_;
  };

  /**
   * Whether the element's layout box overlaps with the specified rect.
   * @param {!../layout-rect.LayoutRectDef} rect
   * @return {boolean}
   */

  Resource.prototype.overlaps = function overlaps(rect) {
    return _layoutRect.layoutRectsOverlap(this.layoutBox_, rect);
  };

  /**
   * Whether this element can be pre-rendered.
   * @return {boolean}
   */

  Resource.prototype.prerenderAllowed = function prerenderAllowed() {
    return this.element.prerenderAllowed();
  };

  /**
   * Whether this is allowed to render when not in viewport.
   * @return {boolean}
   */

  Resource.prototype.renderOutsideViewport = function renderOutsideViewport() {
    var renders = this.element.renderOutsideViewport();
    // Boolean interface, element is either always allowed or never allowed to
    // render outside viewport.
    if (renders === true || renders === false) {
      return renders;
    }
    // Numeric interface, element is allowed to render outside viewport when it
    // is within X times the viewport height of the current viewport.
    var viewportBox = this.resources_.getViewport().getRect();
    var layoutBox = this.layoutBox_;
    var scrollDirection = this.resources_.getScrollDirection();
    var multipler = Math.max(renders, 0);
    var scrollPenalty = 1;
    var distance = undefined;
    // If outside of viewport's x-axis, element is not in viewport.
    if (viewportBox.right < layoutBox.left || viewportBox.left > layoutBox.right) {
      return false;
    }
    if (viewportBox.bottom < layoutBox.top) {
      // Element is below viewport
      distance = layoutBox.top - viewportBox.bottom;

      // If we're scrolling away from the element
      if (scrollDirection == -1) {
        scrollPenalty = 2;
      }
    } else if (viewportBox.top > layoutBox.bottom) {
      // Element is above viewport
      distance = viewportBox.top - layoutBox.bottom;

      // If we're scrolling away from the element
      if (scrollDirection == 1) {
        scrollPenalty = 2;
      }
    } else {
      // Element is in viewport
      return true;
    }
    return distance < viewportBox.height * multipler / scrollPenalty;
  };

  /**
   * Sets the resource's state to LAYOUT_SCHEDULED.
   */

  Resource.prototype.layoutScheduled = function layoutScheduled() {
    this.state_ = ResourceState.LAYOUT_SCHEDULED;
  };

  /**
   * Starts the layout of the resource. Returns the promise that will yield
   * once layout is complete. Only allowed to be called on a upgraded, built
   * and displayed element.
   * @param {boolean} isDocumentVisible
   * @return {!Promise}
   */

  Resource.prototype.startLayout = function startLayout(isDocumentVisible) {
    var _this2 = this;

    if (this.layoutPromise_) {
      return this.layoutPromise_;
    }
    if (this.state_ == ResourceState.LAYOUT_COMPLETE) {
      return Promise.resolve();
    }
    if (this.state_ == ResourceState.LAYOUT_FAILED) {
      return Promise.reject('already failed');
    }

    _log.dev().assert(this.state_ != ResourceState.NOT_BUILT, 'Not ready to start layout: %s (%s)', this.debugid, this.state_);

    if (!isDocumentVisible && !this.prerenderAllowed()) {
      _log.dev().fine(TAG, 'layout canceled due to non pre-renderable element:', this.debugid, this.state_);
      this.state_ = ResourceState.READY_FOR_LAYOUT;
      return Promise.resolve();
    }

    if (!this.isInViewport() && !this.renderOutsideViewport()) {
      _log.dev().fine(TAG, 'layout canceled due to element not being in viewport:', this.debugid, this.state_);
      this.state_ = ResourceState.READY_FOR_LAYOUT;
      return Promise.resolve();
    }

    // Double check that the element has not disappeared since scheduling
    this.measure();
    if (!this.isDisplayed()) {
      _log.dev().fine(TAG, 'layout canceled due to element loosing display:', this.debugid, this.state_);
      return Promise.resolve();
    }

    // Not-wanted re-layouts are ignored.
    if (this.layoutCount_ > 0 && !this.element.isRelayoutNeeded()) {
      _log.dev().fine(TAG, 'layout canceled since it wasn\'t requested:', this.debugid, this.state_);
      this.state_ = ResourceState.LAYOUT_COMPLETE;
      return Promise.resolve();
    }

    _log.dev().fine(TAG, 'start layout:', this.debugid, 'count:', this.layoutCount_);
    this.layoutCount_++;
    this.state_ = ResourceState.LAYOUT_SCHEDULED;

    var promise = undefined;
    try {
      promise = this.element.layoutCallback();
    } catch (e) {
      return Promise.reject(e);
    }

    this.layoutPromise_ = promise.then(function () {
      return _this2.layoutComplete_(true);
    }, function (reason) {
      return _this2.layoutComplete_(false, reason);
    });
    return this.layoutPromise_;
  };

  /**
   * @param {boolean} success
   * @param {*=} opt_reason
   * @return {!Promise|undefined}
   */

  Resource.prototype.layoutComplete_ = function layoutComplete_(success, opt_reason) {
    this.loadPromiseResolve_();
    this.layoutPromise_ = null;
    this.state_ = success ? ResourceState.LAYOUT_COMPLETE : ResourceState.LAYOUT_FAILED;
    if (success) {
      _log.dev().fine(TAG, 'layout complete:', this.debugid);
    } else {
      _log.dev().fine(TAG, 'loading failed:', this.debugid, opt_reason);
      return Promise.reject(opt_reason);
    }
  };

  /**
   * Returns true if the resource layout has not completed or failed.
   * @return {boolean}
   * */

  Resource.prototype.isLayoutPending = function isLayoutPending() {
    return this.state_ != ResourceState.LAYOUT_COMPLETE && this.state_ != ResourceState.LAYOUT_FAILED;
  };

  /**
   * Returns a promise that is resolved when this resource is laid out
   * for the first time and the resource was loaded. Note that the resource
   * could be unloaded subsequently. This method returns resolved promise for
   * sunch unloaded elements.
   * @return {!Promise}
   */

  Resource.prototype.loadedOnce = function loadedOnce() {
    return this.loadPromise_;
  };

  /**
   * @return {boolean} true if the resource has been loaded at least once.
   */

  Resource.prototype.hasLoadedOnce = function hasLoadedOnce() {
    return this.loadedOnce_;
  };

  /**
   * Whether the resource is currently visible in the viewport.
   * @return {boolean}
   */

  Resource.prototype.isInViewport = function isInViewport() {
    return this.isInViewport_;
  };

  /**
   * Updates the inViewport state of the element.
   * @param {boolean} inViewport
   */

  Resource.prototype.setInViewport = function setInViewport(inViewport) {
    if (inViewport == this.isInViewport_) {
      return;
    }
    _log.dev().fine(TAG, 'inViewport:', this.debugid, inViewport);
    this.isInViewport_ = inViewport;
    this.element.viewportCallback(inViewport);
  };

  /**
   * Calls element's unlayoutCallback callback and resets state for
   * relayout in case document becomes active again.
   */

  Resource.prototype.unlayout = function unlayout() {
    if (this.state_ == ResourceState.NOT_BUILT || this.state_ == ResourceState.NOT_LAID_OUT) {
      return;
    }
    this.setInViewport(false);
    if (this.element.unlayoutCallback()) {
      this.element.togglePlaceholder(true);
      this.state_ = ResourceState.NOT_LAID_OUT;
      this.layoutCount_ = 0;
      this.layoutPromise_ = null;
    }
  };

  /**
   * Returns the task ID for this resource.
   * @param localId
   * @returns {string}
   */

  Resource.prototype.getTaskId = function getTaskId(localId) {
    return this.debugid + '#' + localId;
  };

  /**
   * Calls element's pauseCallback callback.
   */

  Resource.prototype.pause = function pause() {
    if (this.state_ == ResourceState.NOT_BUILT || this.paused_) {
      return;
    }
    this.paused_ = true;
    this.setInViewport(false);
    this.element.pauseCallback();
    if (this.element.unlayoutOnPause()) {
      this.unlayout();
    }
  };

  /**
   * Calls element's pauseCallback callback.
   */

  Resource.prototype.pauseOnRemove = function pauseOnRemove() {
    if (this.state_ == ResourceState.NOT_BUILT) {
      return;
    }
    this.setInViewport(false);
    if (this.paused_) {
      return;
    }
    this.paused_ = true;
    this.element.pauseCallback();
  };

  /**
   * Calls element's resumeCallback callback.
   */

  Resource.prototype.resume = function resume() {
    if (this.state_ == ResourceState.NOT_BUILT || !this.paused_) {
      return;
    }
    this.paused_ = false;
    this.element.resumeCallback();
  };

  /**
   * Called when a previously visible element is no longer displayed.
   */

  Resource.prototype.unload = function unload() {
    this.pause();
    this.unlayout();
  };

  return Resource;
})();

exports.Resource = Resource;

},{"../layout-rect":38,"../log":41,"../style":84}],66:[function(require,module,exports){
exports.__esModule = true;
exports.installResourcesServiceForDoc = installResourcesServiceForDoc;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _finiteStateMachine = require('../finite-state-machine');

var _focusHistory = require('../focus-history');

var _pass = require('../pass');

var _resource = require('./resource');

var _taskQueue = require('./task-queue');

var _visibilityState = require('../visibility-state');

var _ieMediaBug = require('./ie-media-bug');

var _dom = require('../dom');

var _layoutRect = require('../layout-rect');

var _service = require('../service');

var _input = require('../input');

var _viewerImpl = require('./viewer-impl');

var _viewportImpl = require('./viewport-impl');

var _vsyncImpl = require('./vsync-impl');

var _types = require('../types');

var _log = require('../log');

var _error = require('../error');

var _utilsArray = require('../utils/array');

var TAG_ = 'Resources';
var LAYOUT_TASK_ID_ = 'L';
var LAYOUT_TASK_OFFSET_ = 0;
var PRELOAD_TASK_ID_ = 'P';
var PRELOAD_TASK_OFFSET_ = 2;
var PRIORITY_BASE_ = 10;
var PRIORITY_PENALTY_TIME_ = 1000;
var POST_TASK_PASS_DELAY_ = 1000;
var MUTATE_DEFER_DELAY_ = 500;
var FOCUS_HISTORY_TIMEOUT_ = 1000 * 60; // 1min
var FOUR_FRAME_DELAY_ = 70;

/**
 * The internal structure of a ChangeHeightRequest.
 * @typedef {{
 *   resource: !Resource,
 *   newHeight: (number|undefined),
 *   newWidth: (number|undefined),
 *   force: boolean,
 *   callback: (function(boolean)|undefined)
 * }}
 */
var ChangeSizeRequestDef = undefined;

var Resources = (function () {
  /**
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   */

  function Resources(ampdoc) {
    var _this = this;

    babelHelpers.classCallCheck(this, Resources);

    /** @const {!./ampdoc-impl.AmpDoc} */
    this.ampdoc = ampdoc;

    /** @const {!Window} */
    this.win = ampdoc.win;

    /** @const @private {!./viewer-impl.Viewer} */
    this.viewer_ = _viewerImpl.installViewerService(this.win);

    /** @private {boolean} */
    this.isRuntimeOn_ = this.viewer_.isRuntimeOn();

    /** @private @const {number} */
    this.maxDpr_ = this.win.devicePixelRatio || 1;

    /** @private {number} */
    this.resourceIdCounter_ = 0;

    /** @private @const {!Array<!Resource>} */
    this.resources_ = [];

    /** @private {boolean} */
    this.visible_ = this.viewer_.isVisible();

    /** @private {number} */
    this.prerenderSize_ = this.viewer_.getPrerenderSize();

    /** @private {boolean} */
    this.documentReady_ = false;

    /**
     * We want to do some work in the first pass after
     * the document is ready.
     * @private {boolean}
     */
    this.firstPassAfterDocumentReady_ = true;

    /**
     * We also adjust the timeout penalty shortly after the first pass.
     * @private {number}
     */
    this.firstVisibleTime_ = -1;

    /** @private {boolean} */
    this.relayoutAll_ = true;

    /** @private {number} */
    this.relayoutTop_ = -1;

    /** @private {time} */
    this.lastScrollTime_ = 0;

    /** @private {number} */
    this.lastVelocity_ = 0;

    /** @const {!Pass} */
    this.pass_ = new _pass.Pass(this.win, function () {
      return _this.doPass_();
    });

    /** @const {!TaskQueue} */
    this.exec_ = new _taskQueue.TaskQueue();

    /** @const {!TaskQueue} */
    this.queue_ = new _taskQueue.TaskQueue();

    /** @const */
    this.boundTaskScorer_ = function (task) {
      return _this.calcTaskScore_(task);
    };

    /**
     * @private {!Array<!ChangeSizeRequestDef>}
     */
    this.requestsChangeSize_ = [];

    /** @private {!Array<!Function>} */
    this.deferredMutates_ = [];

    /** @private {?Array<!Resource>} */
    this.pendingBuildResources_ = [];

    /** @private {boolean} */
    this.isCurrentlyBuildingPendingResources_ = false;

    /** @private @const {!./viewport-impl.Viewport} */
    this.viewport_ = _viewportImpl.installViewportService(this.win);

    /** @private @const {!./vsync-impl.Vsync} */
    this.vsync_ = _vsyncImpl.installVsyncService(this.win);

    /** @private @const {!FocusHistory} */
    this.activeHistory_ = new _focusHistory.FocusHistory(this.win, FOCUS_HISTORY_TIMEOUT_);

    /** @private {boolean} */
    this.vsyncScheduled_ = false;

    /** @private @const {!FiniteStateMachine<!VisibilityState>} */
    this.visibilityStateMachine_ = new _finiteStateMachine.FiniteStateMachine(this.viewer_.getVisibilityState());
    this.setupVisibilityStateMachine_(this.visibilityStateMachine_);

    // When viewport is resized, we have to re-measure all elements.
    this.viewport_.onChanged(function (event) {
      _this.lastScrollTime_ = Date.now();
      _this.lastVelocity_ = event.velocity;
      _this.relayoutAll_ = _this.relayoutAll_ || event.relayoutAll;
      _this.schedulePass();
    });
    this.viewport_.onScroll(function () {
      _this.lastScrollTime_ = Date.now();
    });

    // When document becomes visible, e.g. from "prerender" mode, do a
    // simple pass.
    this.viewer_.onVisibilityChanged(function () {
      if (_this.firstVisibleTime_ == -1 && _this.viewer_.isVisible()) {
        _this.firstVisibleTime_ = Date.now();
      }
      _this.schedulePass();
    });

    this.viewer_.onRuntimeState(function (state) {
      _log.dev().fine(TAG_, 'Runtime state:', state);
      _this.isRuntimeOn_ = state;
      _this.schedulePass(1);
    });

    this.activeHistory_.onFocus(function (element) {
      _this.checkPendingChangeSize_(element);
    });

    this.schedulePass();

    // Ensure that we attempt to rebuild things when DOM is ready.
    this.ampdoc.whenReady().then(function () {
      _this.documentReady_ = true;
      _this.buildReadyResources_();
      _this.pendingBuildResources_ = null;
      var fixPromise = _ieMediaBug.checkAndFix(_this.win);
      if (fixPromise) {
        fixPromise.then(function () {
          _this.relayoutAll_ = true;
          _this.schedulePass();
        });
      } else {
        // No promise means that there's no problem.
        _this.relayoutAll_ = true;
      }
      _this.schedulePass();
      _this.monitorInput_();
    });
  }

  /**
   * @param {!Element|!Array<!Element>} elements
   * @return {!Array<!Element>}
   */

  /**
   * Returns a list of resources.
   * @return {!Array<!Resource>}
   * @export
   */

  Resources.prototype.get = function get() {
    return this.resources_.slice(0);
  };

  /**
   * Whether the runtime is currently on.
   * @return {boolean}
   */

  Resources.prototype.isRuntimeOn = function isRuntimeOn() {
    return this.isRuntimeOn_;
  };

  /**
   * Returns a subset of resources which is identified as being in the current
   * viewport.
   * @param {boolean=} opt_isInPrerender signifies if we are in prerender mode.
   * @return {!Array<!Resource>}
   */

  Resources.prototype.getResourcesInViewport = function getResourcesInViewport(opt_isInPrerender) {
    opt_isInPrerender = opt_isInPrerender || false;
    var viewportRect = this.viewport_.getRect();
    return this.resources_.filter(function (r) {
      if (r.hasOwner() || !r.isDisplayed() || !r.overlaps(viewportRect)) {
        return false;
      }
      if (opt_isInPrerender && !r.prerenderAllowed()) {
        return false;
      }
      return true;
    });
  };

  /** @private */

  Resources.prototype.monitorInput_ = function monitorInput_() {
    var _this2 = this;

    var input = _input.inputFor(this.win);
    input.onTouchDetected(function (detected) {
      _this2.toggleInputClass_('amp-mode-touch', detected);
    }, true);
    input.onMouseDetected(function (detected) {
      _this2.toggleInputClass_('amp-mode-mouse', detected);
    }, true);
    input.onKeyboardStateChanged(function (active) {
      _this2.toggleInputClass_('amp-mode-keyboard-active', active);
    }, true);
  };

  /**
   * @param {string} clazz
   * @param {boolean} on
   * @private
   */

  Resources.prototype.toggleInputClass_ = function toggleInputClass_(clazz, on) {
    var _this3 = this;

    this.ampdoc.whenBodyAvailable().then(function (body) {
      _this3.vsync_.mutate(function () {
        body.classList.toggle(clazz, on);
      });
    });
  };

  /**
   * Returns the maximum DPR available on this device.
   * @return {number}
   */

  Resources.prototype.getMaxDpr = function getMaxDpr() {
    return this.maxDpr_;
  };

  /**
   * Returns the most optimal DPR currently recommended.
   * @return {number}
   */

  Resources.prototype.getDpr = function getDpr() {
    // TODO(dvoytenko): return optimal DPR.
    return this.maxDpr_;
  };

  /**
   * Returns the {@link Resource} instance corresponding to the specified AMP
   * Element. If no Resource is found, the exception is thrown.
   * @param {!AmpElement} element
   * @return {!Resource}
   */

  Resources.prototype.getResourceForElement = function getResourceForElement(element) {
    return _resource.Resource.forElement(element);
  };

  /**
   * Returns the viewport instance
   * @return {!./viewport-impl.Viewport}
   */

  Resources.prototype.getViewport = function getViewport() {
    return this.viewport_;
  };

  /**
   * Returns the direction the user last scrolled.
   *  - -1 for scrolling up
   *  - 1 for scrolling down
   *  - Defaults to 1
   * @return {number}
   */

  Resources.prototype.getScrollDirection = function getScrollDirection() {
    return Math.sign(this.lastVelocity_) || 1;
  };

  /**
   * Signals that an element has been added to the DOM. Resources manager
   * will start tracking it from this point on.
   * @param {!AmpElement} element
   */

  Resources.prototype.add = function add(element) {
    var resource = new _resource.Resource(++this.resourceIdCounter_, element, this);
    if (!element.id) {
      element.id = 'AMP_' + resource.getId();
    }
    this.resources_.push(resource);
    this.buildOrScheduleBuildForResource_(resource);
    _log.dev().fine(TAG_, 'element added:', resource.debugid);
  };

  /**
   * Builds the element if ready to be built, otherwise adds it to pending resources.
   * @param {!Resource} resource
   * @param {boolean=} checkForDupes
   * @private
   */

  Resources.prototype.buildOrScheduleBuildForResource_ = function buildOrScheduleBuildForResource_(resource) {
    var checkForDupes = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (this.isRuntimeOn_) {
      if (this.documentReady_) {
        // Build resource immediately, the document has already been parsed.
        resource.build();
        this.schedulePass();
      } else if (!resource.element.isBuilt()) {
        if (!checkForDupes || this.pendingBuildResources_.indexOf(resource) == -1) {
          // Otherwise add to pending resources and try to build any ready ones.
          this.pendingBuildResources_.push(resource);
          this.buildReadyResources_();
        }
      }
    }
  };

  /**
   * Builds resources that are ready to be built.
   * @private
   */

  Resources.prototype.buildReadyResources_ = function buildReadyResources_() {
    // Avoid cases where elements add more elements inside of them
    // and cause an infinite loop of building - see #3354 for details.
    if (this.isCurrentlyBuildingPendingResources_) {
      return;
    }
    try {
      this.isCurrentlyBuildingPendingResources_ = true;
      this.buildReadyResourcesUnsafe_();
    } finally {
      this.isCurrentlyBuildingPendingResources_ = false;
    }
  };

  /** @private */

  Resources.prototype.buildReadyResourcesUnsafe_ = function buildReadyResourcesUnsafe_() {
    var builtElementsCount = 0;
    // This will loop over all current pending resources and those that
    // get added by other resources build-cycle, this will make sure all
    // elements get a chance to be built.
    for (var i = 0; i < this.pendingBuildResources_.length; i++) {
      var resource = this.pendingBuildResources_[i];
      if (this.documentReady_ || _dom.hasNextNodeInDocumentOrder(resource.element)) {
        // Remove resource before build to remove it from the pending list
        // in either case the build succeed or throws an error.
        this.pendingBuildResources_.splice(i--, 1);
        builtElementsCount++;
        resource.build();
      }
    }

    if (builtElementsCount > 0) {
      this.schedulePass();
    }
  };

  /**
   * Signals that an element has been removed to the DOM. Resources manager
   * will stop tracking it from this point on.
   * @param {!AmpElement} element
   */

  Resources.prototype.remove = function remove(element) {
    var resource = _resource.Resource.forElementOptional(element);
    if (!resource) {
      return;
    }
    this.removeResource_(resource);
  };

  /**
   * @param {!Resource} resource
   * @private
   */

  Resources.prototype.removeResource_ = function removeResource_(resource) {
    var index = this.resources_.indexOf(resource);
    if (index != -1) {
      this.resources_.splice(index, 1);
    }
    resource.pauseOnRemove();
    this.cleanupTasks_(resource, /* opt_removePending */true);
    _log.dev().fine(TAG_, 'element removed:', resource.debugid);
  };

  /**
   * Removes all resources belonging to the specified child window.
   * @param {!Window} childWin
   */

  Resources.prototype.removeForChildWindow = function removeForChildWindow(childWin) {
    var _this4 = this;

    var toRemove = this.resources_.filter(function (r) {
      return r.hostWin == childWin;
    });
    toRemove.forEach(function (r) {
      return _this4.removeResource_(r);
    });
  };

  /**
   * Signals that an element has been upgraded to the DOM. Resources manager
   * will perform build and enable layout/viewport signals for this element.
   * @param {!AmpElement} element
   */

  Resources.prototype.upgraded = function upgraded(element) {
    var resource = _resource.Resource.forElement(element);
    this.buildOrScheduleBuildForResource_(resource);
    _log.dev().fine(TAG_, 'element upgraded:', resource.debugid);
  };

  /**
   * Assigns an owner for the specified element. This means that the resources
   * within this element will be managed by the owner and not Resources manager.
   * @param {!Element} element
   * @param {!AmpElement} owner
   * @package
   */

  Resources.prototype.setOwner = function setOwner(element, owner) {
    _resource.Resource.setOwner(element, owner);
  };

  /**
   * Schedules layout for the specified sub-elements that are children of the
   * parent element. The parent element may choose to send this signal either
   * because it's an owner (see {@link setOwner}) or because it wants the
   * layouts to be done sooner. In either case, both parent's and children's
   * priority is observed when scheduling this work.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.scheduleLayout = function scheduleLayout(parentElement, subElements) {
    this.scheduleLayoutOrPreloadForSubresources_(_resource.Resource.forElement(parentElement),
    /* layout */true, elements_(subElements));
  };

  /**
   * Invokes `unload` on the elements' resource which in turn will invoke
   * the `documentBecameInactive` callback on the custom element.
   * Resources that call `schedulePause` must also call `scheduleResume`.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.schedulePause = function schedulePause(parentElement, subElements) {
    var parentResource = _resource.Resource.forElement(parentElement);
    subElements = elements_(subElements);

    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      resource.pause();
    });
  };

  /**
   * Invokes `resume` on the elements' resource which in turn will invoke
   * `resumeCallback` only on paused custom elements.
   * Resources that call `schedulePause` must also call `scheduleResume`.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.scheduleResume = function scheduleResume(parentElement, subElements) {
    var parentResource = _resource.Resource.forElement(parentElement);
    subElements = elements_(subElements);

    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      resource.resume();
    });
  };

  /**
   * Schedules unlayout for specified sub-elements that are children of the
   * parent element. The parent element can choose to send this signal when
   * it want to unload resources for its children.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.scheduleUnlayout = function scheduleUnlayout(parentElement, subElements) {
    var parentResource = _resource.Resource.forElement(parentElement);
    subElements = elements_(subElements);

    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      resource.unlayout();
    });
  };

  /**
   * Schedules preload for the specified sub-elements that are children of the
   * parent element. The parent element may choose to send this signal either
   * because it's an owner (see {@link setOwner}) or because it wants the
   * preloads to be done sooner. In either case, both parent's and children's
   * priority is observed when scheduling this work.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   */

  Resources.prototype.schedulePreload = function schedulePreload(parentElement, subElements) {
    this.scheduleLayoutOrPreloadForSubresources_(_resource.Resource.forElement(parentElement),
    /* layout */false, elements_(subElements));
  };

  /**
   * A parent resource, especially in when it's an owner (see {@link setOwner}),
   * may request the Resources manager to update children's inViewport state.
   * A child's inViewport state is a logical AND between inLocalViewport
   * specified here and parent's own inViewport state.
   * @param {!Element} parentElement
   * @param {!Element|!Array<!Element>} subElements
   * @param {boolean} inLocalViewport
   */

  Resources.prototype.updateInViewport = function updateInViewport(parentElement, subElements, inLocalViewport) {
    this.updateInViewportForSubresources_(_resource.Resource.forElement(parentElement), elements_(subElements), inLocalViewport);
  };

  /**
   * Requests the runtime to change the element's size. When the size is
   * successfully updated then the opt_callback is called.
   * @param {!Element} element
   * @param {number|undefined} newHeight
   * @param {number|undefined} newWidth
   * @param {function()=} opt_callback A callback function.
   */

  Resources.prototype.changeSize = function changeSize(element, newHeight, newWidth, opt_callback) {
    this.scheduleChangeSize_(_resource.Resource.forElement(element), newHeight, newWidth, /* force */true, opt_callback);
  };

  /**
   * Return a promise that requests the runtime to update the size of
   * this element to the specified value.
   * The runtime will schedule this request and attempt to process it
   * as soon as possible. However, unlike in {@link changeSize}, the runtime
   * may refuse to make a change in which case it will reject promise, call the
   * `overflowCallback` method on the target resource with the height value.
   * Overflow callback is expected to provide the reader with the user action
   * to update the height manually.
   * Note that the runtime does not call the `overflowCallback` method if the
   * requested height is 0 or negative.
   * If the height is successfully updated then the promise is resolved.
   * @param {!Element} element
   * @param {number|undefined} newHeight
   * @param {number|undefined} newWidth
   * @return {!Promise}
   * @protected
   */

  Resources.prototype.attemptChangeSize = function attemptChangeSize(element, newHeight, newWidth) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      _this5.scheduleChangeSize_(_resource.Resource.forElement(element), newHeight, newWidth, /* force */false, function (hasSizeChanged) {
        if (hasSizeChanged) {
          resolve();
        } else {
          reject(new Error('changeSize attempt denied'));
        }
      });
    });
  };

  /**
   * Requests mutate callback to executed at the earliest possibility.
   * @param {!Element} element
   * @param {!Function} callback
   */

  Resources.prototype.deferMutate = function deferMutate(element, callback) {
    this.scheduleDeferredMutate_(_resource.Resource.forElement(element), callback);
    this.schedulePassVsync();
  };

  /**
   * Runs the specified mutation on the element and ensures that measures
   * and layouts performed for the affected elements.
   *
   * This method should be called whenever a significant mutations are done
   * on the DOM that could affect layout of elements inside this subtree or
   * its siblings. The top-most affected element should be specified as the
   * first argument to this method and all the mutation work should be done
   * in the mutator callback which is called in the "mutation" vsync phase.
   *
   * @param {!Element} element
   * @param {function()} mutator
   * @return {!Promise}
   */

  Resources.prototype.mutateElement = function mutateElement(element, mutator) {
    var _this6 = this;

    var calcRelayoutTop = function () {
      var box = _this6.viewport_.getLayoutRect(element);
      if (box.width != 0 && box.height != 0) {
        return box.top;
      }
      return -1;
    };
    var relayoutTop = -1;
    return this.vsync_.runPromise({
      measure: function () {
        relayoutTop = calcRelayoutTop();
      },
      mutate: function () {
        mutator();

        // Mark itself and children for re-measurement.
        if (element.classList.contains('-amp-element')) {
          var r = _resource.Resource.forElement(element);
          r.requestMeasure();
        }
        var ampElements = element.getElementsByClassName('-amp-element');
        for (var i = 0; i < ampElements.length; i++) {
          var r = _resource.Resource.forElement(ampElements[i]);
          r.requestMeasure();
        }
        if (relayoutTop != -1) {
          _this6.setRelayoutTop_(relayoutTop);
        }
        _this6.schedulePass(FOUR_FRAME_DELAY_);

        // Need to measure again in case the element has become visible or
        // shifted.
        _this6.vsync_.measure(function () {
          var updatedRelayoutTop = calcRelayoutTop();
          if (updatedRelayoutTop != -1 && updatedRelayoutTop != relayoutTop) {
            _this6.setRelayoutTop_(updatedRelayoutTop);
            _this6.schedulePass(FOUR_FRAME_DELAY_);
          }
        });
      }
    });
  };

  /**
   * Collapses the element: ensures that it's `display:none`, notifies its
   * owner and updates the layout box.
   * @param {!Element} element
   */

  Resources.prototype.collapseElement = function collapseElement(element) {
    var box = this.viewport_.getLayoutRect(element);
    var resource = _resource.Resource.forElement(element);
    if (box.width != 0 && box.height != 0) {
      this.setRelayoutTop_(box.top);
    }
    resource.completeCollapse();

    var owner = resource.getOwner();
    if (owner) {
      owner.collapsedCallback(element);
    }

    this.schedulePass(FOUR_FRAME_DELAY_);
  };

  /**
   * Schedules the work pass at the latest with the specified delay.
   * @param {number=} opt_delay
   * @return {boolean}
   */

  Resources.prototype.schedulePass = function schedulePass(opt_delay) {
    return this.pass_.schedule(opt_delay);
  };

  /**
   * Schedules the work pass at the latest with the specified delay.
   */

  Resources.prototype.schedulePassVsync = function schedulePassVsync() {
    var _this7 = this;

    if (this.vsyncScheduled_) {
      return;
    }
    this.vsyncScheduled_ = true;
    this.vsync_.mutate(function () {
      return _this7.doPass_();
    });
  };

  /**
   * @private
   */

  Resources.prototype.doPass_ = function doPass_() {
    if (!this.isRuntimeOn_) {
      _log.dev().fine(TAG_, 'runtime is off');
      return;
    }

    this.visible_ = this.viewer_.isVisible();
    this.prerenderSize_ = this.viewer_.getPrerenderSize();

    if (this.documentReady_ && this.firstPassAfterDocumentReady_) {
      this.firstPassAfterDocumentReady_ = false;
      this.viewer_.postDocumentReady();
    }

    var viewportSize = this.viewport_.getSize();
    var now = Date.now();
    _log.dev().fine(TAG_, 'PASS: at ' + now + ', visible=', this.visible_, ', relayoutAll=', this.relayoutAll_, ', relayoutTop=', this.relayoutTop_, ', viewportSize=', viewportSize.width, viewportSize.height, ', prerenderSize=', this.prerenderSize_);
    this.pass_.cancel();
    this.vsyncScheduled_ = false;

    this.visibilityStateMachine_.setState(this.viewer_.getVisibilityState());
  };

  /**
   * Returns `true` when there's mutate work currently batched.
   * @return {boolean}
   * @private
   */

  Resources.prototype.hasMutateWork_ = function hasMutateWork_() {
    return this.deferredMutates_.length > 0 || this.requestsChangeSize_.length > 0;
  };

  /**
   * Performs pre-discovery mutates.
   * @private
   */

  Resources.prototype.mutateWork_ = function mutateWork_() {
    var _this8 = this;

    // Read all necessary data before mutates.
    // The height changing depends largely on the target element's position
    // in the active viewport. When not in prerendering, we also consider the
    // active viewport the part of the visible viewport below 10% from the top
    // and above 25% from the bottom.
    // This is basically the portion of the viewport where the reader is most
    // likely focused right now. The main goal is to avoid drastic UI changes
    // in that part of the content. The elements below the active viewport are
    // freely resized. The elements above the viewport are resized and request
    // scroll adjustment to avoid active viewport changing without user's
    // action. The elements in the active viewport are not resized and instead
    // the overflow callbacks are called.
    var now = Date.now();
    var viewportRect = this.viewport_.getRect();
    var scrollHeight = this.viewport_.getScrollHeight();
    var topOffset = viewportRect.height / 10;
    var bottomOffset = viewportRect.height / 10;
    var docBottomOffset = scrollHeight * 0.85;
    var isScrollingStopped = Math.abs(this.lastVelocity_) < 1e-2 && now - this.lastScrollTime_ > MUTATE_DEFER_DELAY_ || now - this.lastScrollTime_ > MUTATE_DEFER_DELAY_ * 2;

    if (this.deferredMutates_.length > 0) {
      _log.dev().fine(TAG_, 'deferred mutates:', this.deferredMutates_.length);
      var deferredMutates = this.deferredMutates_;
      this.deferredMutates_ = [];
      for (var i = 0; i < deferredMutates.length; i++) {
        deferredMutates[i]();
      }
    }
    if (this.requestsChangeSize_.length > 0) {
      (function () {
        _log.dev().fine(TAG_, 'change size requests:', _this8.requestsChangeSize_.length);
        var requestsChangeSize = _this8.requestsChangeSize_;
        _this8.requestsChangeSize_ = [];

        // Find minimum top position and run all mutates.
        var minTop = -1;
        var scrollAdjSet = [];
        for (var i = 0; i < requestsChangeSize.length; i++) {
          var request = requestsChangeSize[i];
          var resource = request.resource;
          var box = resource.getLayoutBox();
          var iniBox = resource.getInitialLayoutBox();
          var diff = request.newHeight - box.height;

          // Check resize rules. It will either resize element immediately, or
          // wait until scrolling stops or will call the overflow callback.
          var resize = false;
          if (diff == 0) {
            // 1. Nothing to resize.
          } else if (request.force || !_this8.visible_) {
              // 2. An immediate execution requested or the document is hidden.
              resize = true;
            } else if (_this8.activeHistory_.hasDescendantsOf(resource.element)) {
              // 3. Active elements are immediately resized. The assumption is that
              // the resize is triggered by the user action or soon after.
              resize = true;
            } else if (box.bottom + Math.min(diff, 0) >= viewportRect.bottom - bottomOffset) {
              // 4. Elements under viewport are resized immediately, but only if
              // an element's boundary is not changed above the viewport after
              // resize.
              resize = true;
            } else if (box.bottom <= viewportRect.top + topOffset) {
              // 5. Elements above the viewport can only be resized when scrolling
              // has stopped, otherwise defer util next cycle.
              if (isScrollingStopped) {
                // These requests will be executed in the next animation cycle and
                // adjust the scroll position.
                scrollAdjSet.push(request);
              } else {
                // Defer till next cycle.
                _this8.requestsChangeSize_.push(request);
              }
              continue;
            } else if (iniBox.bottom >= docBottomOffset || box.bottom >= docBottomOffset) {
              // 6. Elements close to the bottom of the document (not viewport)
              // are resized immediately.
              resize = true;
            } else if (diff < 0) {
              // 7. The new height is smaller than the current one.
            } else {
                // 8. Element is in viewport don't resize and try overflow callback
                // instead.
                request.resource.overflowCallback( /* overflown */true, request.newHeight, request.newWidth);
              }

          if (resize) {
            if (box.top >= 0) {
              minTop = minTop == -1 ? box.top : Math.min(minTop, box.top);
            }
            request.resource. /*OK*/changeSize(request.newHeight, request.newWidth);
            request.resource.overflowCallback( /* overflown */false, request.newHeight, request.newWidth);
          }

          if (request.callback) {
            request.callback( /* hasSizeChanged */resize);
          }
        }

        if (minTop != -1) {
          _this8.setRelayoutTop_(minTop);
        }

        // Execute scroll-adjusting resize requests, if any.
        if (scrollAdjSet.length > 0) {
          _this8.vsync_.run({
            measure: function (state) {
              state. /*OK*/scrollHeight = _this8.viewport_. /*OK*/getScrollHeight();
              state. /*OK*/scrollTop = _this8.viewport_. /*OK*/getScrollTop();
            },
            mutate: function (state) {
              var minTop = -1;
              scrollAdjSet.forEach(function (request) {
                var box = request.resource.getLayoutBox();
                minTop = minTop == -1 ? box.top : Math.min(minTop, box.top);
                request.resource. /*OK*/changeSize(request.newHeight, request.newWidth);
                if (request.callback) {
                  request.callback( /* hasSizeChanged */true);
                }
              });
              if (minTop != -1) {
                _this8.setRelayoutTop_(minTop);
              }
              // Sync is necessary here to avoid UI jump in the next frame.
              var newScrollHeight = _this8.viewport_. /*OK*/getScrollHeight();
              if (newScrollHeight > state. /*OK*/scrollHeight) {
                _this8.viewport_.setScrollTop(state. /*OK*/scrollTop + (newScrollHeight - state. /*OK*/scrollHeight));
              }
            }
          }, {});
        }
      })();
    }
  };

  /**
   * @param {number} relayoutTop
   * @private
   */

  Resources.prototype.setRelayoutTop_ = function setRelayoutTop_(relayoutTop) {
    if (this.relayoutTop_ == -1) {
      this.relayoutTop_ = relayoutTop;
    } else {
      this.relayoutTop_ = Math.min(relayoutTop, this.relayoutTop_);
    }
  };

  /**
   * Reschedules change size request when an overflown element is activated.
   * @param {!Element} element
   * @private
   */

  Resources.prototype.checkPendingChangeSize_ = function checkPendingChangeSize_(element) {
    var resourceElement = _dom.closest(element, function (el) {
      return !!_resource.Resource.forElementOptional(el);
    });
    if (!resourceElement) {
      return;
    }
    var resource = _resource.Resource.forElement(resourceElement);
    var pendingChangeSize = resource.getPendingChangeSize();
    if (pendingChangeSize !== undefined) {
      this.scheduleChangeSize_(resource, pendingChangeSize.height, pendingChangeSize.width, /* force */true);
    }
  };

  /**
   * Discovers work that needs to be done since the last pass. If viewport
   * has changed, it will try to build new elements, measure changed elements,
   * and schedule layouts and preloads within a reasonable distance of the
   * current viewport. Finally, this process also updates inViewport state
   * of changed elements.
   *
   * Layouts and preloads are not executed immediately, but instead scheduled
   * in the queue with different priorities.
   *
   * @private
   */

  Resources.prototype.discoverWork_ = function discoverWork_() {
    var _this9 = this;

    // TODO(dvoytenko): vsync separation may be needed for different phases

    var now = Date.now();

    // Ensure all resources layout phase complete; when relayoutAll is requested
    // force re-layout.
    var relayoutAll = this.relayoutAll_;
    this.relayoutAll_ = false;
    var relayoutTop = this.relayoutTop_;
    this.relayoutTop_ = -1;

    // Phase 1: Build and relayout as needed. All mutations happen here.
    var relayoutCount = 0;
    var remeasureCount = 0;
    for (var i = 0; i < this.resources_.length; i++) {
      var r = this.resources_[i];
      if (r.getState() == _resource.ResourceState.NOT_BUILT) {
        this.buildOrScheduleBuildForResource_(r, /* checkForDupes */true);
      }
      if (relayoutAll || r.getState() == _resource.ResourceState.NOT_LAID_OUT) {
        r.applySizesAndMediaQuery();
        relayoutCount++;
      }
      if (r.isMeasureRequested()) {
        remeasureCount++;
      }
    }

    // Phase 2: Remeasure if there were any relayouts. Unfortunately, currently
    // there's no way to optimize this. All reads happen here.
    var toUnload = undefined;
    if (relayoutCount > 0 || remeasureCount > 0 || relayoutAll || relayoutTop != -1) {
      for (var i = 0; i < this.resources_.length; i++) {
        var r = this.resources_[i];
        if (r.getState() == _resource.ResourceState.NOT_BUILT || r.hasOwner()) {
          continue;
        }
        if (relayoutAll || r.getState() == _resource.ResourceState.NOT_LAID_OUT || r.isMeasureRequested() || relayoutTop != -1 && r.getLayoutBox().bottom >= relayoutTop) {
          var wasDisplayed = r.isDisplayed();
          r.measure();
          if (wasDisplayed && !r.isDisplayed()) {
            if (!toUnload) {
              toUnload = [];
            }
            toUnload.push(r);
          }
        }
      }
    }

    // Unload all in one cycle.
    if (toUnload) {
      this.vsync_.mutate(function () {
        toUnload.forEach(function (r) {
          r.unload();
          _this9.cleanupTasks_(r);
        });
      });
    }

    var viewportRect = this.viewport_.getRect();
    // Load viewport = viewport + 3x up/down when document is visible or
    // depending on prerenderSize in pre-render mode.
    var loadRect = undefined;
    if (this.visible_) {
      loadRect = _layoutRect.expandLayoutRect(viewportRect, 0.25, 2);
    } else if (this.prerenderSize_ > 0) {
      loadRect = _layoutRect.expandLayoutRect(viewportRect, 0, this.prerenderSize_ - 1);
    } else {
      loadRect = null;
    }

    var visibleRect = this.visible_
    // When the doc is visible, consider the viewport to be 25% larger,
    // to minimize effect from small scrolling and notify things that
    // they are in viewport just before they are actually visible.
    ? _layoutRect.expandLayoutRect(viewportRect, 0.25, 0.25) : viewportRect;

    // Phase 3: Trigger "viewport enter/exit" events.
    for (var i = 0; i < this.resources_.length; i++) {
      var r = this.resources_[i];
      if (r.getState() == _resource.ResourceState.NOT_BUILT || r.hasOwner()) {
        continue;
      }
      // Note that when the document is not visible, neither are any of its
      // elements to reduce CPU cycles.
      // TODO(dvoytenko, #3434): Reimplement the use of `isFixed` with
      // layers. This is currently a short-term fix to the problem that
      // the fixed elements get incorrect top coord.
      var shouldBeInViewport = this.visible_ && r.isDisplayed() && (r.isFixed() || r.overlaps(visibleRect));
      r.setInViewport(shouldBeInViewport);
    }

    // Phase 4: Schedule elements for layout within a reasonable distance from
    // current viewport.
    if (loadRect) {
      for (var i = 0; i < this.resources_.length; i++) {
        var r = this.resources_[i];
        if (r.getState() != _resource.ResourceState.READY_FOR_LAYOUT || r.hasOwner()) {
          continue;
        }
        // TODO(dvoytenko, #3434): Reimplement the use of `isFixed` with
        // layers. This is currently a short-term fix to the problem that
        // the fixed elements get incorrect top coord.
        if (r.isDisplayed() && (r.isFixed() || r.overlaps(loadRect))) {
          this.scheduleLayoutOrPreload_(r, /* layout */true);
        }
      }
    }

    // Phase 5: Idle layout: layout more if we are otherwise not doing much.
    // TODO(dvoytenko): document/estimate IDLE timeouts and other constants
    if (this.visible_ && this.exec_.getSize() == 0 && this.queue_.getSize() == 0 && now > this.exec_.getLastDequeueTime() + 5000) {
      var idleScheduledCount = 0;
      for (var i = 0; i < this.resources_.length; i++) {
        var r = this.resources_[i];
        if (r.getState() == _resource.ResourceState.READY_FOR_LAYOUT && !r.hasOwner() && r.isDisplayed()) {
          _log.dev().fine(TAG_, 'idle layout:', r.debugid);
          this.scheduleLayoutOrPreload_(r, /* layout */false);
          idleScheduledCount++;
          if (idleScheduledCount >= 4) {
            break;
          }
        }
      }
    }
  };

  /**
   * Dequeues layout and preload tasks from the queue and initiates their
   * execution.
   *
   * There are two main drivers to dequeueing: a task's score and timeout. The
   * score is built based on the resource's priority and viewport location
   * (see {@link calcTaskScore_}). Timeout depends on the priority and age
   * of tasks currently in the execution pool (see {@link calcTaskTimeout_}).
   *
   * @return {!time}
   * @private
   */

  Resources.prototype.work_ = function work_() {
    var now = Date.now();
    var visibility = this.viewer_.getVisibilityState();

    var timeout = -1;
    var task = this.queue_.peek(this.boundTaskScorer_);
    while (task) {
      timeout = this.calcTaskTimeout_(task);
      _log.dev().fine(TAG_, 'peek from queue:', task.id, 'sched at', task.scheduleTime, 'score', this.boundTaskScorer_(task), 'timeout', timeout);
      if (timeout > 16) {
        break;
      }

      this.queue_.dequeue(task);

      // Do not override a task in execution. This task will have to wait
      // until the current one finished the execution.
      var executing = this.exec_.getTaskById(task.id);
      if (executing) {
        // Reschedule post execution.
        var reschedule = this.reschedule_.bind(this, task);
        executing.promise.then(reschedule, reschedule);
      } else {
        task.promise = task.callback(visibility == 'visible');
        task.startTime = now;
        _log.dev().fine(TAG_, 'exec:', task.id, 'at', task.startTime);
        this.exec_.enqueue(task);
        task.promise.then(this.taskComplete_.bind(this, task, true), this.taskComplete_.bind(this, task, false))['catch']( /** @type {function (*)} */_error.reportError);
      }

      task = this.queue_.peek(this.boundTaskScorer_);
      timeout = -1;
    }

    _log.dev().fine(TAG_, 'queue size:', this.queue_.getSize());
    _log.dev().fine(TAG_, 'exec size:', this.exec_.getSize());

    if (timeout >= 0) {
      // Still tasks in the queue, but we took too much time.
      // Schedule the next work pass.
      return timeout;
    }

    // No tasks left in the queue.
    // Schedule the next idle pass.
    var nextPassDelay = (now - this.exec_.getLastDequeueTime()) * 2;
    nextPassDelay = Math.max(Math.min(30000, nextPassDelay), 5000);
    return nextPassDelay;
  };

  /**
   * Calculates the task's score. A task with the lowest score will be dequeued
   * from the queue the first.
   *
   * There are three components of the score: element's priority, operation or
   * offset priority and viewport priority.
   *
   * Element's priority is constant of the element's name. E.g. amp-img has a
   * priority of 0, while amp-ad has a priority of 2.
   *
   * The operation (offset) priority is the priority of the task. A layout is
   * a high-priority task while preload is a lower-priority task.
   *
   * Viewport priority is a function of the distance of the element from the
   * currently visible viewports. The elements in the visible viewport get
   * higher priority and further away from the viewport get lower priority.
   * This priority also depends on whether or not the user is scrolling towards
   * this element or away from it.
   *
   * @param {!./task-queue.TaskDef} task
   * @private
   */

  Resources.prototype.calcTaskScore_ = function calcTaskScore_(task) {
    var posPriority = 0;
    // TODO(dvoytenko, #3434): Reimplement the use of `isFixed` with
    // layers. This is currently a short-term fix to the problem that
    // the fixed elements get incorrect top coord.
    if (!task.resource.isFixed()) {
      var viewport = this.viewport_.getRect();
      var box = task.resource.getLayoutBox();
      posPriority = Math.floor((box.top - viewport.top) / viewport.height);
    }
    if (Math.sign(posPriority) != this.getScrollDirection()) {
      posPriority *= 2;
    }
    posPriority = Math.abs(posPriority);
    return task.priority * PRIORITY_BASE_ + posPriority;
  };

  /**
   * Calculates the timeout of a task. The timeout depends on two main factors:
   * the priorities of the tasks currently in the execution pool and their age.
   * The timeout is calculated against each task in the execution pool and the
   * maximum value is returned.
   *
   * A task is penalized with higher timeout values when it's lower in priority
   * than the task in the execution pool. However, this penalty is judged
   * against the age of the executing task. If it has been in executing for
   * some time, the penalty is reduced.
   *
   * @param {!./task-queue.TaskDef} task
   * @private
   */

  Resources.prototype.calcTaskTimeout_ = function calcTaskTimeout_(task) {
    var now = Date.now();

    if (this.exec_.getSize() == 0) {
      // If we've never been visible, return 0. This follows the previous
      // behavior of not delaying tasks when there's nothing to do.
      if (this.firstVisibleTime_ === -1) {
        return 0;
      }

      // Scale off the first visible time, so penalized tasks must wait a
      // second or two to run. After we have been visible for a time, we no
      // longer have to wait.
      var penalty = task.priority * PRIORITY_PENALTY_TIME_;
      return Math.max(penalty - (now - this.firstVisibleTime_), 0);
    }

    var timeout = 0;
    this.exec_.forEach(function (other) {
      // Higher priority tasks get the head start. Currently 500ms per a drop
      // in priority (note that priority is 10-based).
      var penalty = Math.max((task.priority - other.priority) * PRIORITY_PENALTY_TIME_, 0);
      // TODO(dvoytenko): Consider running total and not maximum.
      timeout = Math.max(timeout, penalty - (now - other.startTime));
    });

    return timeout;
  };

  /**
   * @param {!./task-queue.TaskDef} task
   * @private
   */

  Resources.prototype.reschedule_ = function reschedule_(task) {
    if (!this.queue_.getTaskById(task.id)) {
      this.queue_.enqueue(task);
    }
  };

  /**
   * @param {!./task-queue.TaskDef} task
   * @param {boolean} success
   * @param {*=} opt_reason
   * @return {!Promise|undefined}
   * @private
   */

  Resources.prototype.taskComplete_ = function taskComplete_(task, success, opt_reason) {
    this.exec_.dequeue(task);
    this.schedulePass(POST_TASK_PASS_DELAY_);
    if (!success) {
      _log.dev().error(TAG_, 'task failed:', task.id, task.resource.debugid, opt_reason);
      return Promise.reject(opt_reason);
    }
  };

  /**
   * Schedules change of the element's height.
   * @param {!Resource} resource
   * @param {number|undefined} newHeight
   * @param {number|undefined} newWidth
   * @param {boolean} force
   * @param {function(boolean)=} opt_callback A callback function
   * @private
   */

  Resources.prototype.scheduleChangeSize_ = function scheduleChangeSize_(resource, newHeight, newWidth, force, opt_callback) {
    resource.resetPendingChangeSize();
    var layoutBox = resource.getLayoutBox();
    if ((newHeight === undefined || newHeight == layoutBox.height) && (newWidth === undefined || newWidth == layoutBox.width)) {
      if (newHeight === undefined && newWidth === undefined) {
        _log.dev().error(TAG_, 'attempting to change size with undefined dimensions', resource.debugid);
      }
      // Nothing to do.
      if (opt_callback) {
        opt_callback( /* hasSizeChanged */false);
      }
      return;
    }

    var request = null;
    for (var i = 0; i < this.requestsChangeSize_.length; i++) {
      if (this.requestsChangeSize_[i].resource == resource) {
        request = this.requestsChangeSize_[i];
        break;
      }
    }

    if (request) {
      request.newHeight = newHeight;
      request.newWidth = newWidth;
      request.force = force || request.force;
      request.callback = opt_callback;
    } else {
      this.requestsChangeSize_.push( /** {!ChangeSizeRequestDef} */{
        resource: resource,
        newHeight: newHeight,
        newWidth: newWidth,
        force: force,
        callback: opt_callback
      });
    }
    this.schedulePassVsync();
  };

  /**
   * Schedules deferred mutate.
   * @param {!Resource} resource
   * @param {!Function} callback
   * @private
   */

  Resources.prototype.scheduleDeferredMutate_ = function scheduleDeferredMutate_(resource, callback) {
    this.deferredMutates_.push(callback);
  };

  /**
   * Schedules layout or preload for the specified resource.
   * @param {!Resource} resource
   * @param {boolean} layout
   * @param {number=} opt_parentPriority
   * @private
   */

  Resources.prototype.scheduleLayoutOrPreload_ = function scheduleLayoutOrPreload_(resource, layout, opt_parentPriority) {
    _log.dev().assert(resource.getState() != _resource.ResourceState.NOT_BUILT && resource.isDisplayed(), 'Not ready for layout: %s (%s)', resource.debugid, resource.getState());

    // Don't schedule elements when we're not visible, or in prerender mode
    // (and they can't prerender).
    if (!this.visible_) {
      if (this.viewer_.getVisibilityState() != _visibilityState.VisibilityState.PRERENDER) {
        return;
      } else if (!resource.prerenderAllowed()) {
        return;
      }
    }

    if (!resource.isInViewport() && !resource.renderOutsideViewport()) {
      return;
    }
    if (layout) {
      this.schedule_(resource, LAYOUT_TASK_ID_, LAYOUT_TASK_OFFSET_, opt_parentPriority || 0, resource.startLayout.bind(resource));
    } else {
      this.schedule_(resource, PRELOAD_TASK_ID_, PRELOAD_TASK_OFFSET_, opt_parentPriority || 0, resource.startLayout.bind(resource));
    }
  };

  /**
   * Schedules layout or preload for the sub-resources of the specified
   * resource.
   * @param {!Resource} parentResource
   * @param {boolean} layout
   * @param {!Array<!Element>} subElements
   * @private
   */

  Resources.prototype.scheduleLayoutOrPreloadForSubresources_ = function scheduleLayoutOrPreloadForSubresources_(parentResource, layout, subElements) {
    var _this10 = this;

    var resources = [];
    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      if (resource.getState() != _resource.ResourceState.NOT_BUILT) {
        resources.push(resource);
      }
    });
    if (resources.length > 0) {
      resources.forEach(function (resource) {
        resource.measure();
        if (resource.getState() == _resource.ResourceState.READY_FOR_LAYOUT && resource.isDisplayed()) {
          _this10.scheduleLayoutOrPreload_(resource, layout, parentResource.getPriority());
        }
      });
    }
  };

  /**
   * Schedules a task.
   * @param {!Resource} resource
   * @param {string} localId
   * @param {number} priorityOffset
   * @param {number} parentPriority
   * @param {function(boolean):!Promise} callback
   * @private
   */

  Resources.prototype.schedule_ = function schedule_(resource, localId, priorityOffset, parentPriority, callback) {
    var taskId = resource.getTaskId(localId);

    var task = {
      id: taskId,
      resource: resource,
      priority: Math.max(resource.getPriority(), parentPriority) + priorityOffset,
      callback: callback,
      scheduleTime: Date.now(),
      startTime: 0,
      promise: null
    };
    _log.dev().fine(TAG_, 'schedule:', task.id, 'at', task.scheduleTime);

    // Only schedule a new task if there's no one enqueued yet or if this task
    // has a higher priority.
    var queued = this.queue_.getTaskById(taskId);
    if (!queued || task.priority < queued.priority) {
      if (queued) {
        this.queue_.dequeue(queued);
      }
      this.queue_.enqueue(task);
      this.schedulePass(this.calcTaskTimeout_(task));
    }
    task.resource.layoutScheduled();
  };

  /**
   * Updates inViewport state for the specified sub-resources of a resource.
   * @param {!Resource} parentResource
   * @param {!Array<!Element>} subElements
   * @param {boolean} inLocalViewport
   * @private
   */

  Resources.prototype.updateInViewportForSubresources_ = function updateInViewportForSubresources_(parentResource, subElements, inLocalViewport) {
    var inViewport = parentResource.isInViewport() && inLocalViewport;
    this.discoverResourcesForArray_(parentResource, subElements, function (resource) {
      resource.setInViewport(inViewport);
    });
  };

  /**
   * Finds resources within the parent resource's shallow subtree.
   * @param {!Resource} parentResource
   * @param {!Array<!Element>} elements
   * @param {function(!Resource)} callback
   */

  Resources.prototype.discoverResourcesForArray_ = function discoverResourcesForArray_(parentResource, elements, callback) {
    var _this11 = this;

    elements.forEach(function (element) {
      _log.dev().assert(parentResource.element.contains(element));
      _this11.discoverResourcesForElement_(element, callback);
    });
  };

  /**
   * @param {!Element} element
   * @param {function(!Resource)} callback
   */

  Resources.prototype.discoverResourcesForElement_ = function discoverResourcesForElement_(element, callback) {
    // Breadth-first search.
    if (element.classList.contains('-amp-element')) {
      callback(_resource.Resource.forElement(element));
      // Also schedule amp-element that is a placeholder for the element.
      var placeholder = element.getPlaceholder();
      if (placeholder) {
        this.discoverResourcesForElement_(placeholder, callback);
      }
    } else {
      var ampElements = element.getElementsByClassName('-amp-element');
      var seen = [];
      for (var i = 0; i < ampElements.length; i++) {
        var ampElement = ampElements[i];
        var covered = false;
        for (var j = 0; j < seen.length; j++) {
          if (seen[j].contains(ampElement)) {
            covered = true;
            break;
          }
        }
        if (!covered) {
          seen.push(ampElement);
          callback(_resource.Resource.forElement(ampElement));
        }
      }
    }
  };

  /**
   * Calls iterator on each sub-resource
   * @param {!FiniteStateMachine<!VisibilityState>} vsm
   */

  Resources.prototype.setupVisibilityStateMachine_ = function setupVisibilityStateMachine_(vsm) {
    var _this12 = this;

    var prerender = _visibilityState.VisibilityState.PRERENDER;
    var visible = _visibilityState.VisibilityState.VISIBLE;
    var hidden = _visibilityState.VisibilityState.HIDDEN;
    var paused = _visibilityState.VisibilityState.PAUSED;
    var inactive = _visibilityState.VisibilityState.INACTIVE;
    var doPass = function () {
      // If viewport size is 0, the manager will wait for the resize event.
      var viewportSize = _this12.viewport_.getSize();
      if (viewportSize.height > 0 && viewportSize.width > 0) {
        if (_this12.hasMutateWork_()) {
          _this12.mutateWork_();
        }
        _this12.discoverWork_();
        var delay = _this12.work_();
        if (_this12.hasMutateWork_()) {
          // Overflow mutate work.
          delay = Math.min(delay, MUTATE_DEFER_DELAY_);
        }
        if (_this12.visible_) {
          if (_this12.schedulePass(delay)) {
            _log.dev().fine(TAG_, 'next pass:', delay);
          } else {
            _log.dev().fine(TAG_, 'pass already scheduled');
          }
        } else {
          _log.dev().fine(TAG_, 'document is not visible: no scheduling');
        }
      }
    };
    var noop = function () {};
    var pause = function () {
      _this12.resources_.forEach(function (r) {
        return r.pause();
      });
    };
    var unload = function () {
      _this12.resources_.forEach(function (r) {
        r.unload();
        _this12.cleanupTasks_(r);
      });
      _this12.unselectText();
    };
    var resume = function () {
      _this12.resources_.forEach(function (r) {
        return r.resume();
      });
      doPass();
    };

    vsm.addTransition(prerender, prerender, doPass);
    vsm.addTransition(prerender, visible, doPass);
    vsm.addTransition(prerender, hidden, doPass);
    vsm.addTransition(prerender, inactive, doPass);
    vsm.addTransition(prerender, paused, doPass);

    vsm.addTransition(visible, visible, doPass);
    vsm.addTransition(visible, hidden, doPass);
    vsm.addTransition(visible, inactive, unload);
    vsm.addTransition(visible, paused, pause);

    vsm.addTransition(hidden, visible, doPass);
    vsm.addTransition(hidden, hidden, doPass);
    vsm.addTransition(hidden, inactive, unload);
    vsm.addTransition(hidden, paused, pause);

    vsm.addTransition(inactive, visible, resume);
    vsm.addTransition(inactive, hidden, resume);
    vsm.addTransition(inactive, inactive, noop);
    vsm.addTransition(inactive, paused, doPass);

    vsm.addTransition(paused, visible, resume);
    vsm.addTransition(paused, hidden, doPass);
    vsm.addTransition(paused, inactive, unload);
    vsm.addTransition(paused, paused, noop);
  };

  /**
   * Unselects any selected text
   */

  Resources.prototype.unselectText = function unselectText() {
    try {
      this.win.getSelection().removeAllRanges();
    } catch (e) {
      // Selection API not supported.
    }
  };

  /**
   * Cleanup task queues from tasks for elements that has been unloaded.
   * @param {Resource} resource
   * @param {boolean=} opt_removePending Whether to remove from pending
   *     build resources.
   * @private
   */

  Resources.prototype.cleanupTasks_ = function cleanupTasks_(resource, opt_removePending) {
    if (resource.getState() == _resource.ResourceState.NOT_LAID_OUT) {
      // If the layout promise for this resource has not resolved yet, remove
      // it from the task queues to make sure this resource can be rescheduled
      // for layout again later on.
      // TODO(mkhatib): Think about how this might affect preload tasks once the
      // prerender change is in.
      this.queue_.purge(function (task) {
        return task.resource == resource;
      });
      this.exec_.purge(function (task) {
        return task.resource == resource;
      });
      _utilsArray.filterSplice(this.requestsChangeSize_, function (request) {
        return request.resource != resource;
      });
    }

    if (resource.getState() == _resource.ResourceState.NOT_BUILT && opt_removePending && this.pendingBuildResources_) {
      var pendingIndex = this.pendingBuildResources_.indexOf(resource);
      if (pendingIndex != -1) {
        this.pendingBuildResources_.splice(pendingIndex, 1);
      }
    }
  };

  return Resources;
})();

exports.Resources = Resources;
function elements_(elements) {
  return (/** @type {!Array<!Element>} */_types.isArray(elements) ? elements : [elements]
  );
}

/**
 * The internal structure of a ChangeHeightRequest.
 * @typedef {{
 *   height: (number|undefined),
 *   width: (number|undefined)
 * }}
 */
var SizeDef = undefined;

exports.SizeDef = SizeDef;
/**
 * @param {!./ampdoc-impl.AmpDoc} ampdoc
 * @return {!Resources}
 */

function installResourcesServiceForDoc(ampdoc) {
  return _service.fromClassForDoc(ampdoc, 'resources', Resources);
}

;

},{"../dom":23,"../error":26,"../finite-state-machine":32,"../focus-history":33,"../input":35,"../layout-rect":38,"../log":41,"../pass":45,"../service":56,"../types":88,"../utils/array":92,"../visibility-state":98,"./ie-media-bug":62,"./resource":65,"./task-queue":69,"./viewer-impl":74,"./viewport-impl":75,"./vsync-impl":76}],67:[function(require,module,exports){
exports.__esModule = true;
exports.installStandardActionsForDoc = installStandardActionsForDoc;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('../service');

var _actionImpl = require('./action-impl');

var _resourcesImpl = require('./resources-impl');

var _style = require('../style');

/**
 * This service contains implementations of some of the most typical actions,
 * such as hiding DOM elements.
 * @private Visible for testing.
 */

var StandardActions = (function () {
  /**
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   */

  function StandardActions(ampdoc) {
    babelHelpers.classCallCheck(this, StandardActions);

    /** @const @private {!./action-impl.ActionService} */
    this.actions_ = _actionImpl.installActionServiceForDoc(ampdoc);

    /** @const @private {!./resources-impl.Resources} */
    this.resources_ = _resourcesImpl.installResourcesServiceForDoc(ampdoc);

    this.actions_.addGlobalMethodHandler('hide', this.handleHide.bind(this));
  }

  /**
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   * @return {!StandardActions}
   */

  /**
   * Handles "hide" action. This is a very simple action where "display: none"
   * is applied to the target element.
   * @param {!./action-impl.ActionInvocation} invocation
   */

  StandardActions.prototype.handleHide = function handleHide(invocation) {
    var target = invocation.target;
    this.resources_.mutateElement(target, function () {
      if (target.classList.contains('-amp-element')) {
        target. /*OK*/collapse();
      } else {
        _style.toggle(target, false);
      }
    });
  };

  return StandardActions;
})();

exports.StandardActions = StandardActions;

function installStandardActionsForDoc(ampdoc) {
  return _service.fromClassForDoc(ampdoc, 'standard-actions', StandardActions);
}

;

},{"../service":56,"../style":84,"./action-impl":57,"./resources-impl":66}],68:[function(require,module,exports){
exports.__esModule = true;
exports.installStorageService = installStorageService;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('../service');

var _url = require('../url');

var _log = require('../log');

var _json = require('../json');

var _viewer = require('../viewer');

/** @const */
var TAG = 'Storage';

/** @const */
var MAX_VALUES_PER_ORIGIN = 8;

/**
 * The storage API. This is an API equivalent to the Web LocalStorage API but
 * extended to all AMP embedding scenarios.
 *
 * The storage is done per source origin. See `get`, `set` and `remove` methods
 * for more info.
 *
 * @see https://html.spec.whatwg.org/multipage/webstorage.html
 * @private Visible for testing only.
 */

var Storage = (function () {

  /**
   * @param {!Window} win
   * @param {!../service/viewer-impl.Viewer} viewer
   * @param {!StorageBindingDef} binding
   */

  function Storage(win, viewer, binding) {
    babelHelpers.classCallCheck(this, Storage);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!../service/viewer-impl.Viewer} */
    this.viewer_ = viewer;

    /** @private @const {!StorageBindingDef} */
    this.binding_ = binding;

    /** @const @private {string} */
    this.origin_ = _url.getSourceOrigin(this.win.location);

    /** @private {?Promise<!Store>} */
    this.storePromise_ = null;
  }

  /**
   * The implementation of store logic for get, set and remove.
   *
   * The structure of the store is equivalent to the following typedef:
   * ```
   * {
   *   vv: !Object<key(string), !{
   *     v: *,
   *     t: time
   *   }>
   * }
   * ```
   *
   * @private Visible for testing only.
   */

  /**
   * @return {!Storage}
   * @private
   */

  Storage.prototype.start_ = function start_() {
    this.listenToBroadcasts_();
    return this;
  };

  /**
   * Returns the promise that yields the value of the property for the specified
   * key.
   * @param {string} name
   * @return {!Promise<*>}
   */

  Storage.prototype.get = function get(name) {
    return this.getStore_().then(function (store) {
      return store.get(name);
    });
  };

  /**
   * Saves the value of the specified property. Returns the promise that's
   * resolved when the operation completes.
   * @param {string} name
   * @param {*} value
   * @return {!Promise}
   */

  Storage.prototype.set = function set(name, value) {
    _log.dev().assert(typeof value == 'boolean', 'Only boolean values accepted');
    return this.saveStore_(function (store) {
      return store.set(name, value);
    });
  };

  /**
   * Removes the specified property. Returns the promise that's resolved when
   * the operation completes.
   * @param {string} name
   * @return {!Promise}
   */

  Storage.prototype.remove = function remove(name) {
    return this.saveStore_(function (store) {
      return store.remove(name);
    });
  };

  /**
   * @return {!Promise<!Store>}
   * @private
   */

  Storage.prototype.getStore_ = function getStore_() {
    if (!this.storePromise_) {
      this.storePromise_ = this.binding_.loadBlob(this.origin_).then(function (blob) {
        return blob ? JSON.parse(atob(blob)) : {};
      })['catch'](function (reason) {
        _log.dev().error(TAG, 'Failed to load store: ', reason);
        return {};
      }).then(function (obj) {
        return new Store(obj);
      });
    }
    return this.storePromise_;
  };

  /**
   * @param {function(!Store)} mutator
   * @return {!Promise}
   * @private
   */

  Storage.prototype.saveStore_ = function saveStore_(mutator) {
    var _this = this;

    return this.getStore_().then(function (store) {
      mutator(store);
      var blob = btoa(JSON.stringify(store.obj));
      return _this.binding_.saveBlob(_this.origin_, blob);
    }).then(this.broadcastReset_.bind(this));
  };

  /** @private */

  Storage.prototype.listenToBroadcasts_ = function listenToBroadcasts_() {
    var _this2 = this;

    this.viewer_.onBroadcast(function (message) {
      if (message['type'] == 'amp-storage-reset' && message['origin'] == _this2.origin_) {
        _log.dev().fine(TAG, 'Received reset message');
        _this2.storePromise_ = null;
      }
    });
  };

  /** @private */

  Storage.prototype.broadcastReset_ = function broadcastReset_() {
    _log.dev().fine(TAG, 'Broadcasted reset message');
    this.viewer_.broadcast( /** @type {!JSONType} */{
      'type': 'amp-storage-reset',
      'origin': this.origin_
    });
  };

  return Storage;
})();

exports.Storage = Storage;

var Store = (function () {
  /**
   * @param {!JSONType} obj
   * @param {number=} opt_maxValues
   */

  function Store(obj, opt_maxValues) {
    babelHelpers.classCallCheck(this, Store);

    /** @const {!JSONType} */
    this.obj = /** @type {!JSONType} */_json.recreateNonProtoObject(obj);

    /** @private @const {number} */
    this.maxValues_ = opt_maxValues || MAX_VALUES_PER_ORIGIN;

    /** @private @const {!Object<string, !JSONType>} */
    this.values_ = this.obj['vv'] || Object.create(null);
    if (!this.obj['vv']) {
      this.obj['vv'] = this.values_;
    }
  }

  /**
   * A binding provides the specific implementation of storage technology.
   * @interface
   */

  /**
   * @param {string} name
   * @return {*|undefined}
   */

  Store.prototype.get = function get(name) {
    // The structure is {key: {v: *, t: time}}
    var item = this.values_[name];
    return item ? item['v'] : undefined;
  };

  /**
   * @param {string} name
   * @param {*} value
   */

  Store.prototype.set = function set(name, value) {
    _log.dev().assert(name != '__proto__' && name != 'prototype', 'Name is not allowed: %s', name);
    // The structure is {key: {v: *, t: time}}
    if (this.values_[name] !== undefined) {
      var item = this.values_[name];
      item['v'] = value;
      item['t'] = Date.now();
    } else {
      this.values_[name] = /** @type {!JSONType} */{
        'v': value,
        't': Date.now()
      };
    }

    // Purge old values.
    var keys = Object.keys(this.values_);
    if (keys.length > this.maxValues_) {
      var minTime = Infinity;
      var minKey = null;
      for (var i = 0; i < keys.length; i++) {
        var item = this.values_[keys[i]];
        if (item['t'] < minTime) {
          minKey = keys[i];
          minTime = item['t'];
        }
      }
      if (minKey) {
        delete this.values_[minKey];
      }
    }
  };

  /**
   * @param {string} name
   */

  Store.prototype.remove = function remove(name) {
    // The structure is {key: {v: *, t: time}}
    delete this.values_[name];
  };

  return Store;
})();

exports.Store = Store;

var StorageBindingDef = (function () {
  function StorageBindingDef() {
    babelHelpers.classCallCheck(this, StorageBindingDef);
  }

  /**
   * Storage implementation using Web LocalStorage API.
   * @implements {StorageBindingDef}
   * @private Visible for testing only.
   */

  /**
   * Returns the promise that yields the store blob for the specified origin.
   * @param {string} unusedOrigin
   * @return {!Promise<?string>}
   */

  StorageBindingDef.prototype.loadBlob = function loadBlob(unusedOrigin) {};

  /**
   * Saves the store blob for the specified origin and returns the promise
   * that's resolved when the operation completes.
   * @param {string} unusedOrigin
   * @param {string} unusedBlob
   * @return {!Promise}
   */

  StorageBindingDef.prototype.saveBlob = function saveBlob(unusedOrigin, unusedBlob) {};

  return StorageBindingDef;
})();

var LocalStorageBinding = (function () {

  /**
   * @param {!Window} win
   */

  function LocalStorageBinding(win) {
    babelHelpers.classCallCheck(this, LocalStorageBinding);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {boolean} */
    this.isLocalStorageSupported_ = !!this.win.localStorage;

    if (!this.isLocalStorageSupported_) {
      _log.dev().error(TAG, 'localStorage not supported.');
    }
  }

  /**
   * Storage implementation delegated to the Viewer.
   * @implements {StorageBindingDef}
   * @private Visible for testing only.
   */

  /**
   * @param {string} origin
   * @return {string}
   * @private
   */

  LocalStorageBinding.prototype.getKey_ = function getKey_(origin) {
    return 'amp-store:' + origin;
  };

  /** @override */

  LocalStorageBinding.prototype.loadBlob = function loadBlob(origin) {
    var _this3 = this;

    return new Promise(function (resolve) {
      if (!_this3.isLocalStorageSupported_) {
        resolve(null);
        return;
      }
      resolve(_this3.win.localStorage.getItem(_this3.getKey_(origin)));
    });
  };

  /** @override */

  LocalStorageBinding.prototype.saveBlob = function saveBlob(origin, blob) {
    var _this4 = this;

    return new Promise(function (resolve) {
      if (!_this4.isLocalStorageSupported_) {
        resolve();
        return;
      }
      _this4.win.localStorage.setItem(_this4.getKey_(origin), blob);
      resolve();
    });
  };

  return LocalStorageBinding;
})();

exports.LocalStorageBinding = LocalStorageBinding;

var ViewerStorageBinding = (function () {

  /**
   * @param {!../service/viewer-impl.Viewer} viewer
   */

  function ViewerStorageBinding(viewer) {
    babelHelpers.classCallCheck(this, ViewerStorageBinding);

    /** @private @const {!../service/viewer-impl.Viewer} */
    this.viewer_ = viewer;
  }

  /**
   * @param {!Window} window
   * @return {!Storage}
   */

  /** @override */

  ViewerStorageBinding.prototype.loadBlob = function loadBlob(origin) {
    return this.viewer_.sendMessage('loadStore', { origin: origin }, true).then(function (response) {
      return response['blob'];
    });
  };

  /** @override */

  ViewerStorageBinding.prototype.saveBlob = function saveBlob(origin, blob) {
    return (/** @type {!Promise} */this.viewer_.sendMessage('saveStore', { origin: origin, blob: blob }, true)
    );
  };

  return ViewerStorageBinding;
})();

exports.ViewerStorageBinding = ViewerStorageBinding;

function installStorageService(window) {
  return (/** @type {!Storage} */_service.getService(window, 'storage', function () {
      var viewer = _viewer.viewerFor(window);
      var overrideStorage = parseInt(viewer.getParam('storage'), 10);
      var binding = overrideStorage ? new ViewerStorageBinding(viewer) : new LocalStorageBinding(window);
      return new Storage(window, viewer, binding).start_();
    })
  );
}

;

},{"../json":37,"../log":41,"../service":56,"../url":90,"../viewer":96}],69:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('../log');

/**
 * The internal structure for the task.
 * @typedef {{
 *   id: string,
 *   resource: !./resource.Resource,
 *   priority: number,
 *   callback: function(boolean),
 *   scheduleTime: time,
 *   startTime: time,
 *   promise: (?Promise|undefined)
 * }}
 */
var TaskDef = undefined;

exports.TaskDef = TaskDef;
/**
 * A scheduling queue for Resources.
 *
 * @package
 */

var TaskQueue = (function () {
  function TaskQueue() {
    babelHelpers.classCallCheck(this, TaskQueue);

    /** @private @const {!Array<!TaskDef>} */
    this.tasks_ = [];

    /** @private @const {!Object<string, !TaskDef>} */
    this.taskIdMap_ = {};

    /** @private {!time} */
    this.lastEnqueueTime_ = 0;

    /** @private {!time} */
    this.lastDequeueTime_ = 0;
  }

  /**
   * Size of the queue.
   * @return {number}
   */

  TaskQueue.prototype.getSize = function getSize() {
    return this.tasks_.length;
  };

  /**
   * Last time a task was enqueued.
   * @return {!time}
   */

  TaskQueue.prototype.getLastEnqueueTime = function getLastEnqueueTime() {
    return this.lastEnqueueTime_;
  };

  /**
   * Last time a task was dequeued.
   * @return {!time}
   */

  TaskQueue.prototype.getLastDequeueTime = function getLastDequeueTime() {
    return this.lastDequeueTime_;
  };

  /**
   * Returns the task with the specified ID or null.
   * @param {string} taskId
   * @return {?TaskDef}
   */

  TaskQueue.prototype.getTaskById = function getTaskById(taskId) {
    return this.taskIdMap_[taskId] || null;
  };

  /**
   * Enqueues the task. If the task is already in the queue, the error is
   * thrown.
   * @param {!TaskDef} task
   */

  TaskQueue.prototype.enqueue = function enqueue(task) {
    _log.dev().assert(!this.taskIdMap_[task.id], 'Task already enqueued: %s', task.id);
    this.tasks_.push(task);
    this.taskIdMap_[task.id] = task;
    this.lastEnqueueTime_ = Date.now();
  };

  /**
   * Dequeues the task and returns "true" if dequeueing is successful. Otherwise
   * returns "false", e.g. when this task is not currently enqueued.
   * @param {!TaskDef} task
   * @return {boolean}
   */

  TaskQueue.prototype.dequeue = function dequeue(task) {
    var existing = this.taskIdMap_[task.id];
    var dequeued = this.removeAtIndex(task, this.tasks_.indexOf(existing));
    if (!dequeued) {
      return false;
    }
    this.lastDequeueTime_ = Date.now();
    return true;
  };

  /**
   * Returns the task with the minimal score based on the provided scoring
   * callback.
   * @param {function(!TaskDef):number} scorer
   * @return {?TaskDef}
   */

  TaskQueue.prototype.peek = function peek(scorer) {
    var minScore = 1e6;
    var minTask = null;
    for (var i = 0; i < this.tasks_.length; i++) {
      var task = this.tasks_[i];
      var score = scorer(task);
      if (score < minScore) {
        minScore = score;
        minTask = task;
      }
    }
    return minTask;
  };

  /**
   * Iterates over all tasks in queue in the insertion order.
   * @param {function(!TaskDef)} callback
   */

  TaskQueue.prototype.forEach = function forEach(callback) {
    this.tasks_.forEach(callback);
  };

  /**
   * Removes the task and returns "true" if dequeueing is successful. Otherwise
   * returns "false", e.g. when this task is not currently enqueued.
   * @param {!TaskDef} task
   * @param {number} index of the task to remove.
   * @return {boolean}
   */

  TaskQueue.prototype.removeAtIndex = function removeAtIndex(task, index) {
    var existing = this.taskIdMap_[task.id];
    if (!existing || this.tasks_[index] != existing) {
      return false;
    }
    this.tasks_.splice(index, 1);
    delete this.taskIdMap_[task.id];
    return true;
  };

  /**
   * Removes tasks in queue that pass the callback test.
   * @param {function(!TaskDef):boolean} callback Return true to remove the task.
   */

  TaskQueue.prototype.purge = function purge(callback) {
    var index = this.tasks_.length;
    while (index--) {
      if (callback(this.tasks_[index])) {
        this.removeAtIndex(this.tasks_[index], index);
      }
    }
  };

  return TaskQueue;
})();

exports.TaskQueue = TaskQueue;

},{"../log":41}],70:[function(require,module,exports){
exports.__esModule = true;
exports.registerExtendedTemplate = registerExtendedTemplate;
exports.installTemplatesService = installTemplatesService;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _dom = require('../dom');

var _service = require('../service');

var _log = require('../log');

/**
 * @fileoverview
 * For the set of decisions made on templating see:
 * {@link https://docs.google.com/document/d/1q-5MPQHnOHLF_uL7lQsGZdzuBgrPTkCy2PdRP-YCbOw/edit#}
 */

/**
 * @typedef {function(new:BaseTemplate, !Element)}
 */
var TemplateClassDef = {};

/** @private @const {string} */
var PROP_ = '__AMP_IMPL_';

/** @private @const {string} */
var PROP_PROMISE_ = '__AMP_WAIT_';

/**
 * The interface that is implemented by all templates.
 */

var BaseTemplate = (function () {

  /** @param {!Element} element */

  function BaseTemplate(element) {
    babelHelpers.classCallCheck(this, BaseTemplate);

    /** @public @const */
    this.element = element;

    /** @public @const */
    this.win = element.ownerDocument.defaultView;

    this.compileCallback();
  }

  /**
   */

  /**
   * Override in subclass if the element needs to compile the template.
   * @protected
   */

  BaseTemplate.prototype.compileCallback = function compileCallback() {}
  // Subclasses may override.

  /**
   * To be implemented by subclasses.
   * @param {!JSONType} unusedData
   * @return {!Element}
   */
  ;

  BaseTemplate.prototype.render = function render(unusedData) {
    throw new Error('Not implemented');
  };

  /**
   * Helps the template implementation to unwrap the root element. The root
   * element can be unwrapped only when it contains a single element or a
   * single element surrounded by empty text nodes.
   * @param {!Element} root
   * @return {!Element}
   * @protected @final
   */

  BaseTemplate.prototype.unwrap = function unwrap(root) {
    var singleElement = null;
    for (var n = root.firstChild; n != null; n = n.nextSibling) {
      if (n.nodeType == /* TEXT */3) {
        if (n.textContent.trim()) {
          // Non-empty text node - can't unwrap.
          singleElement = null;
          break;
        }
      } else if (n.nodeType == /* COMMENT */8) {
        // Ignore comments.
      } else if (n.nodeType == /* ELEMENT */1) {
          if (!singleElement) {
            singleElement = /** @type {!Element} */n;
          } else {
            // This is not the first element - can't unwrap.
            singleElement = null;
            break;
          }
        } else {
          singleElement = null;
        }
    }
    return singleElement || root;
  };

  return BaseTemplate;
})();

exports.BaseTemplate = BaseTemplate;

var Templates = (function () {
  /** @param {!Window} win */

  function Templates(win) {
    babelHelpers.classCallCheck(this, Templates);

    /** @private @const {!Window} */
    this.win_ = win;

    /**
     * A map from template type to template's class promise.
     * @private @const {!Object<string, !Promise<!TemplateClassDef>>}
     */
    this.templateClassMap_ = {};

    /**
     * A map from template type to template's class promise. This is a transient
     * storage. As soon as the template class loaded, the entry is removed.
     * @private @const {!Object<string, function(!TemplateClassDef)>}
     */
    this.templateClassResolvers_ = {};

    /** @type {!Object<string, boolean>|undefined} */
    this.declaredTemplates_ = undefined;
  }

  /**
   * Registers an extended template. This function should typically be called
   * through the registerTemplate method on the AMP runtime.
   * @param {!Window} win
   * @param {string} type
   * @param {!TemplateClassDef} templateClass
   * @package
   */

  /**
   * Renders the specified template element using the supplied data.
   * @param {!Element} templateElement
   * @param {!JSONType} data
   * @return {!Promise<!Element>}
   */

  Templates.prototype.renderTemplate = function renderTemplate(templateElement, data) {
    var _this = this;

    return this.getImplementation_(templateElement).then(function (impl) {
      return _this.render_(impl, data);
    });
  };

  /**
   * Renders the specified template element using the supplied array of data
   * and returns an array of resulting elements.
   * @param {!Element} templateElement
   * @param {!Array<!JSONType>} array
   * @return {!Promise<!Array<!Element>>}
   */

  Templates.prototype.renderTemplateArray = function renderTemplateArray(templateElement, array) {
    var _this2 = this;

    if (array.length == 0) {
      return Promise.resolve([]);
    }
    return this.getImplementation_(templateElement).then(function (impl) {
      return array.map(function (item) {
        return _this2.render_(impl, item);
      });
    });
  };

  /**
   * Discovers the template for the specified parent and renders it using the
   * supplied data. The template can be specified either via "template"
   * attribute  or as a child "template" element. When specified via "template"
   * attribute, the value indicates the ID of the template element.
   * @param {!Element} parent
   * @param {!JSONType} data
   * @return {!Promise<!Element>}
   */

  Templates.prototype.findAndRenderTemplate = function findAndRenderTemplate(parent, data) {
    return this.renderTemplate(this.findTemplate_(parent), data);
  };

  /**
   * Discovers the template for the specified parent and renders it using the
   * supplied array of data. The template can be specified either via "template"
   * attribute or as a child "template" element. When specified via "template"
   * attribute, the value indicates the ID of the template element. Returns
   * the array of the rendered elements.
   * @param {!Element} parent
   * @param {!Array<!JSONType>} array
   * @return {!Promise<!Array<!Element>>}
   */

  Templates.prototype.findAndRenderTemplateArray = function findAndRenderTemplateArray(parent, array) {
    return this.renderTemplateArray(this.findTemplate_(parent), array);
  };

  /**
   * The template can be specified either via "template" attribute or as a
   * child "template" element. When specified via "template" attribute,
   * the value indicates the ID of the template element.
   * @param {!Element} parent
   * @return {!Element}
   * @private
   */

  Templates.prototype.findTemplate_ = function findTemplate_(parent) {
    var templateElement = null;
    var templateId = parent.getAttribute('template');
    if (templateId) {
      templateElement = parent.ownerDocument.getElementById(templateId);
    } else {
      templateElement = _dom.childElementByTag(parent, 'template');
    }
    _log.user().assert(templateElement, 'Template not found for %s', parent);
    _log.user().assert(templateElement.tagName == 'TEMPLATE', 'Template element must be a "template" tag %s', templateElement);
    return templateElement;
  };

  /**
   * Returns the promise that will eventually yield the template implementation
   * for the specified template element.
   * @param {!Element} element
   * @return {!Promise<!BaseTemplate>}
   * @private
   */

  Templates.prototype.getImplementation_ = function getImplementation_(element) {
    var impl = element[PROP_];
    if (impl) {
      return Promise.resolve(impl);
    }

    var type = _log.user().assert(element.getAttribute('type'), 'Type must be specified: %s', element);

    var promise = element[PROP_PROMISE_];
    if (promise) {
      return promise;
    }

    promise = this.waitForTemplateClass_(element, type).then(function (templateClass) {
      var impl = element[PROP_] = new templateClass(element);
      delete element[PROP_PROMISE_];
      return impl;
    });
    element[PROP_PROMISE_] = promise;
    return promise;
  };

  /**
   * Returns the promise that will eventually yield the template class. This will
   * wait until the actual template script has been downloaded and parsed.
   * @param {!Element} element
   * @param {string} type
   * @return {!Promise<!TemplateClassDef>}
   * @private
   */

  Templates.prototype.waitForTemplateClass_ = function waitForTemplateClass_(element, type) {
    if (this.templateClassMap_[type]) {
      return this.templateClassMap_[type];
    }

    this.checkTemplateDeclared_(element, type);
    var aResolve = undefined;
    var promise = new Promise(function (resolve, unusedReject) {
      aResolve = resolve;
    });
    this.templateClassMap_[type] = promise;
    this.templateClassResolvers_[type] = aResolve;
    return promise;
  };

  /**
   * Checks that the template type has actually been declared by a
   * `<script custom-template=$type>` tag in the head.
   * @param {!Element} element
   * @param {string} type
   * @private
   */

  Templates.prototype.checkTemplateDeclared_ = function checkTemplateDeclared_(element, type) {
    if (!this.declaredTemplates_) {
      this.declaredTemplates_ = this.win_.Object.create(null);
      var scriptTags = this.win_.document.querySelectorAll('script[custom-template]');
      for (var i = 0; i < scriptTags.length; i++) {
        this.declaredTemplates_[scriptTags[i].getAttribute('custom-template')] = true;
      }
    }
    _log.user().assert(this.declaredTemplates_[type], 'Template must be declared for %s as <script custom-template=%s>', element, type);
  };

  /**
   * Registers an extended template. This function should typically be called
   * through the registerTemplate method on the AMP runtime.
   * @param {string} type
   * @param {!TemplateClassDef} templateClass
   * @private
   */

  Templates.prototype.registerTemplate_ = function registerTemplate_(type, templateClass) {
    if (!this.templateClassMap_[type]) {
      this.templateClassMap_[type] = Promise.resolve(templateClass);
    } else {
      var resolver = this.templateClassResolvers_[type];
      _log.user().assert(resolver, 'Duplicate template type: %s', type);
      delete this.templateClassResolvers_[type];
      resolver(templateClass);
    }
  };

  /**
   * @param {!BaseTemplate} impl
   * @param {!JSONType} data
   * @private
   */

  Templates.prototype.render_ = function render_(impl, data) {
    var root = impl.render(data);
    var anchors = root.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      if (!anchor.hasAttribute('href')) {
        // Ignore anchors without href.
        continue;
      }

      // TODO(dvoytenko, #1572): This code should be unnecessary after
      // sanitization issue has been addressed.
      anchor.setAttribute('target', '_blank');
    }
    return root;
  };

  return Templates;
})();

exports.Templates = Templates;

function registerExtendedTemplate(win, type, templateClass) {
  return installTemplatesService(win).registerTemplate_(type, templateClass);
}

/**
 * @param {!Window} window
 * @return {!Templates}
 */

function installTemplatesService(window) {
  return _service.fromClass(window, 'templates', Templates);
}

;

},{"../dom":23,"../log":41,"../service":56}],71:[function(require,module,exports){
exports.__esModule = true;
exports.installTimerService = installTimerService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

// Requires polyfills in immediate side effect.

require('../polyfills');

var _log = require('../log');

var _service = require('../service');

/**
 * Helper with all things Timer.
 */

var Timer = (function () {

  /**
   * @param {!Window} win
   */

  function Timer(win) {
    babelHelpers.classCallCheck(this, Timer);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Promise}  */
    this.resolved_ = Promise.resolve();

    this.taskCount_ = 0;

    this.canceled_ = {};

    /** @const {number} */
    this.startTime_ = Date.now();
  }

  /**
   * @param {!Window} window
   * @return {!Timer}
   */

  /**
   * Returns time since start in milliseconds.
   * @return {number}
   */

  Timer.prototype.timeSinceStart = function timeSinceStart() {
    return Date.now() - this.startTime_;
  };

  /**
   * Runs the provided callback after the specified delay. This uses a micro
   * task for 0 or no specified time. This means that the delay will actually
   * be close to 0 and this will NOT yield to the event queue.
   *
   * Returns the timer ID that can be used to cancel the timer (cancel method).
   * @param {!function()} callback
   * @param {number=} opt_delay
   * @return {number|string}
   */

  Timer.prototype.delay = function delay(callback, opt_delay) {
    var _this = this;

    if (!opt_delay) {
      var _ret = (function () {
        // For a delay of zero,  schedule a promise based micro task since
        // they are predictably fast.
        var id = 'p' + _this.taskCount_++;
        _this.resolved_.then(function () {
          if (_this.canceled_[id]) {
            delete _this.canceled_[id];
            return;
          }
          callback();
        });
        return {
          v: id
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
    return this.win.setTimeout(callback, opt_delay);
  };

  /**
   * Cancels the previously scheduled callback.
   * @param {number|string|null} timeoutId
   */

  Timer.prototype.cancel = function cancel(timeoutId) {
    if (typeof timeoutId == 'string') {
      this.canceled_[timeoutId] = true;
      return;
    }
    this.win.clearTimeout(timeoutId);
  };

  /**
   * Returns a promise that will resolve after the delay. Optionally, the
   * resolved value can be provided as opt_result argument.
   * @param {number=} opt_delay
   * @param {RESULT=} opt_result
   * @return {!Promise<RESULT>}
   * @template RESULT
   */

  Timer.prototype.promise = function promise(opt_delay, opt_result) {
    var _this2 = this;

    var timerKey = null;
    return new Promise(function (resolve, reject) {
      timerKey = _this2.delay(function () {
        timerKey = -1;
        resolve(opt_result);
      }, opt_delay);
      if (timerKey == -1) {
        reject(new Error('Failed to schedule timer.'));
      }
    })['catch'](function (error) {
      // Clear the timer. The most likely reason is "cancel" signal.
      if (timerKey != -1) {
        _this2.cancel(timerKey);
      }
      throw error;
    });
  };

  /**
   * Returns a promise that will fail after the specified delay. Optionally,
   * this method can take opt_racePromise parameter. In this case, the
   * resulting promise will either fail when the specified delay expires or
   * will resolve based on the opt_racePromise, whichever happens first.
   * @param {number} delay
   * @param {!Promise<RESULT>|undefined} opt_racePromise
   * @param {string=} opt_message
   * @return {!Promise<RESULT>}
   * @template RESULT
   */

  Timer.prototype.timeoutPromise = function timeoutPromise(delay, opt_racePromise, opt_message) {
    var _this3 = this;

    var timerKey = null;
    var delayPromise = new Promise(function (_resolve, reject) {
      timerKey = _this3.delay(function () {
        timerKey = -1;
        reject(_log.user().createError(opt_message || 'timeout'));
      }, delay);
      if (timerKey == -1) {
        reject(new Error('Failed to schedule timer.'));
      }
    })['catch'](function (error) {
      // Clear the timer. The most likely reason is "cancel" signal.
      if (timerKey != -1) {
        _this3.cancel(timerKey);
      }
      throw error;
    });
    if (!opt_racePromise) {
      return delayPromise;
    }
    return Promise.race([delayPromise, opt_racePromise]);
  };

  return Timer;
})();

exports.Timer = Timer;

function installTimerService(window) {
  return _service.fromClass(window, 'timer', Timer);
}

;

},{"../log":41,"../polyfills":48,"../service":56}],72:[function(require,module,exports){
exports.__esModule = true;
exports.installUrlReplacementsService = installUrlReplacementsService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _accessService = require('../access-service');

var _cid = require('../cid');

var _variantService = require('../variant-service');

var _shareTrackingService = require('../share-tracking-service');

var _log = require('../log');

var _documentInfo = require('../document-info');

var _service = require('../service');

var _eventHelper = require('../event-helper');

var _types = require('../types');

var _url = require('../url');

var _viewer = require('../viewer');

var _viewport = require('../viewport');

var _vsync = require('../vsync');

var _userNotification = require('../user-notification');

var _activity = require('../activity');

/** @private @const {string} */
var TAG = 'UrlReplacements';
var EXPERIMENT_DELIMITER = '!';
var VARIANT_DELIMITER = '.';

/** @typedef {string|number|boolean|undefined|null} */
var ResolverReturnDef = undefined;

/** @typedef {function(...*):ResolverReturnDef} */
var SyncResolverDef = undefined;

/** @typedef {function(...*):!Promise<ResolverReturnDef>} */
var AsyncResolverDef = undefined;

/** @typedef {{sync: SyncResolverDef, async: AsyncResolverDef}} */
var ReplacementDef = undefined;

/**
 * This class replaces substitution variables with their values.
 * Document new values in ../spec/amp-var-substitutions.md
 * @package For export.
 */

var UrlReplacements = (function () {
  /** @param {!Window} win */

  function UrlReplacements(win) {
    babelHelpers.classCallCheck(this, UrlReplacements);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private {!RegExp|undefined} */
    this.replacementExpr_ = undefined;

    /** @private @const {!Object<string, !ReplacementDef>} */
    this.replacements_ = this.win_.Object.create(null);

    /** @private @const {function(!Window):!Promise<?AccessService>} */
    this.getAccessService_ = _accessService.accessServiceForOrNull;

    /** @private @const {!Promise<?Object<string, string>>} */
    this.variants_ = _variantService.variantForOrNull(win);

    /**
     * @private @const {
     *   !Promise<(?{incomingFragment: string, outgoingFragment: string})>}
     */
    this.shareTrackingFragments_ = _shareTrackingService.shareTrackingForOrNull(win);

    /** @private {boolean} */
    this.initialized_ = false;
  }

  /**
   * @param {!Window} window
   * @return {!UrlReplacements}
   */

  /**
   * Lazily initialize the default replacements.
   */

  UrlReplacements.prototype.initialize_ = function initialize_() {
    var _this = this;

    this.initialized_ = true;
    // Returns a random value for cache busters.
    this.set_('RANDOM', function () {
      return Math.random();
    });

    // Returns the canonical URL for this AMP document.
    this.set_('CANONICAL_URL', this.getDocInfoValue_.bind(this, function (info) {
      return info.canonicalUrl;
    }));

    // Returns the host of the canonical URL for this AMP document.
    this.set_('CANONICAL_HOST', this.getDocInfoValue_.bind(this, function (info) {
      var url = _url.parseUrl(info.canonicalUrl);
      return url && url.host;
    }));

    // Returns the hostname of the canonical URL for this AMP document.
    this.set_('CANONICAL_HOSTNAME', this.getDocInfoValue_.bind(this, function (info) {
      var url = _url.parseUrl(info.canonicalUrl);
      return url && url.hostname;
    }));

    // Returns the path of the canonical URL for this AMP document.
    this.set_('CANONICAL_PATH', this.getDocInfoValue_.bind(this, function (info) {
      var url = _url.parseUrl(info.canonicalUrl);
      return url && url.pathname;
    }));

    // Returns the referrer URL.
    this.setAsync_('DOCUMENT_REFERRER', /** @type {AsyncResolverDef} */function () {
      return _viewer.viewerFor(_this.win_).getReferrerUrl();
    });

    // Returns the title of this AMP document.
    this.set_('TITLE', function () {
      return _this.win_.document.title;
    });

    // Returns the URL for this AMP document.
    this.set_('AMPDOC_URL', function () {
      return _url.removeFragment(_this.win_.location.href);
    });

    // Returns the host of the URL for this AMP document.
    this.set_('AMPDOC_HOST', function () {
      var url = _url.parseUrl(_this.win_.location.href);
      return url && url.host;
    });

    // Returns the hostname of the URL for this AMP document.
    this.set_('AMPDOC_HOSTNAME', function () {
      var url = _url.parseUrl(_this.win_.location.href);
      return url && url.hostname;
    });

    // Returns the Source URL for this AMP document.
    this.set_('SOURCE_URL', this.getDocInfoValue_.bind(this, function (info) {
      return _url.removeFragment(info.sourceUrl);
    }));

    // Returns the host of the Source URL for this AMP document.
    this.set_('SOURCE_HOST', this.getDocInfoValue_.bind(this, function (info) {
      return _url.parseUrl(info.sourceUrl).host;
    }));

    // Returns the hostname of the Source URL for this AMP document.
    this.set_('SOURCE_HOSTNAME', this.getDocInfoValue_.bind(this, function (info) {
      return _url.parseUrl(info.sourceUrl).hostname;
    }));

    // Returns the path of the Source URL for this AMP document.
    this.set_('SOURCE_PATH', this.getDocInfoValue_.bind(this, function (info) {
      return _url.parseUrl(info.sourceUrl).pathname;
    }));

    // Returns a random string that will be the constant for the duration of
    // single page view. It should have sufficient entropy to be unique for
    // all the page views a single user is making at a time.
    this.set_('PAGE_VIEW_ID', this.getDocInfoValue_.bind(this, function (info) {
      return info.pageViewId;
    }));

    this.set_('QUERY_PARAM', function (param) {
      var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      _log.user().assert(param, 'The first argument to QUERY_PARAM, the query string ' + 'param is required');
      var url = _url.parseUrl(_this.win_.location.href);
      var params = _url.parseQueryString(url.search);

      return typeof params[param] !== 'undefined' ? params[param] : defaultValue;
    });

    this.setAsync_('CLIENT_ID', function (scope, opt_userNotificationId) {
      _log.user().assertString(scope, 'The first argument to CLIENT_ID, the fallback c' +
      /*OK*/'ookie name, is required');
      var consent = Promise.resolve();

      // If no `opt_userNotificationId` argument is provided then
      // assume consent is given by default.
      if (opt_userNotificationId) {
        consent = _userNotification.userNotificationManagerFor(_this.win_).then(function (service) {
          return service.get(opt_userNotificationId);
        });
      }
      return _cid.cidFor(_this.win_).then(function (cid) {
        return cid.get({
          scope: _log.dev().assertString(scope),
          createCookieIfNotPresent: true
        }, consent);
      });
    });

    // Returns assigned variant name for the given experiment.
    this.setAsync_('VARIANT', function (experiment) {
      return _this.variants_.then(function (variants) {
        _log.user().assert(variants, 'To use variable VARIANT, amp-experiment should be configured');
        var variant = variants[/** @type {string} */experiment];
        _log.user().assert(variant !== undefined, 'The value passed to VARIANT() is not a valid experiment name:' + experiment);
        // When no variant assigned, use reserved keyword 'none'.
        return variant === null ? 'none' : /** @type {string} */variant;
      });
    });

    // Returns all assigned experiment variants in a serialized form.
    this.setAsync_('VARIANTS', function () {
      return _this.variants_.then(function (variants) {
        _log.user().assert(variants, 'To use variable VARIANTS, amp-experiment should be configured');

        var experiments = [];
        for (var experiment in variants) {
          var variant = variants[experiment];
          experiments.push(experiment + VARIANT_DELIMITER + (variant || 'none'));
        }

        return experiments.join(EXPERIMENT_DELIMITER);
      });
    });

    // Returns incoming share tracking fragment.
    this.setAsync_('SHARE_TRACKING_INCOMING', function () {
      return _this.shareTrackingFragments_.then(function (fragments) {
        _log.user().assert(fragments, 'To use variable SHARE_TRACKING_INCOMING, ' + 'amp-share-tracking should be configured');
        return fragments.incomingFragment;
      });
    });

    // Returns outgoing share tracking fragment.
    this.setAsync_('SHARE_TRACKING_OUTGOING', function () {
      return _this.shareTrackingFragments_.then(function (fragments) {
        _log.user().assert(fragments, 'To use variable SHARE_TRACKING_OUTGOING, ' + 'amp-share-tracking should be configured');
        return fragments.outgoingFragment;
      });
    });

    // Returns the number of milliseconds since 1 Jan 1970 00:00:00 UTC.
    this.set_('TIMESTAMP', function () {
      return Date.now();
    });

    // Returns the user's time-zone offset from UTC, in minutes.
    this.set_('TIMEZONE', function () {
      return new Date().getTimezoneOffset();
    });

    // Returns a promise resolving to viewport.getScrollTop.
    this.setAsync_('SCROLL_TOP', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollTop();
      });
    });

    // Returns a promise resolving to viewport.getScrollLeft.
    this.setAsync_('SCROLL_LEFT', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollLeft();
      });
    });

    // Returns a promise resolving to viewport.getScrollHeight.
    this.setAsync_('SCROLL_HEIGHT', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollHeight();
      });
    });

    // Returns a promise resolving to viewport.getScrollWidth.
    this.setAsync_('SCROLL_WIDTH', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getScrollWidth();
      });
    });

    // Returns screen.width.
    this.set_('SCREEN_WIDTH', function () {
      return _this.win_.screen.width;
    });

    // Returns screen.height.
    this.set_('SCREEN_HEIGHT', function () {
      return _this.win_.screen.height;
    });

    // Returns screen.availHeight.
    this.set_('AVAILABLE_SCREEN_HEIGHT', function () {
      return _this.win_.screen.availHeight;
    });

    // Returns screen.availWidth.
    this.set_('AVAILABLE_SCREEN_WIDTH', function () {
      return _this.win_.screen.availWidth;
    });

    // Returns screen.ColorDepth.
    this.set_('SCREEN_COLOR_DEPTH', function () {
      return _this.win_.screen.colorDepth;
    });

    // Returns the viewport height.
    this.setAsync_('VIEWPORT_HEIGHT', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getSize().height;
      });
    });

    // Returns the viewport width.
    this.setAsync_('VIEWPORT_WIDTH', function () {
      return _vsync.vsyncFor(_this.win_).measurePromise(function () {
        return _viewport.viewportFor(_this.win_).getSize().width;
      });
    });

    // Returns document characterset.
    this.set_('DOCUMENT_CHARSET', function () {
      var doc = _this.win_.document;
      return doc.characterSet || doc.charset;
    });

    // Returns the browser language.
    this.set_('BROWSER_LANGUAGE', function () {
      var nav = _this.win_.navigator;
      return (nav.language || nav.userLanguage || nav.browserLanguage || '').toLowerCase();
    });

    // Returns the time it took to load the whole page. (excludes amp-* elements
    // that are not rendered by the system yet.)
    this.setTimingResolver_('PAGE_LOAD_TIME', 'navigationStart', 'loadEventStart');

    // Returns the time it took to perform DNS lookup for the domain.
    this.setTimingResolver_('DOMAIN_LOOKUP_TIME', 'domainLookupStart', 'domainLookupEnd');

    // Returns the time it took to connet to the server.
    this.setTimingResolver_('TCP_CONNECT_TIME', 'connectStart', 'connectEnd');

    // Returns the time it took for server to start sending a response to the
    // request.
    this.setTimingResolver_('SERVER_RESPONSE_TIME', 'requestStart', 'responseStart');

    // Returns the time it took to download the page.
    this.setTimingResolver_('PAGE_DOWNLOAD_TIME', 'responseStart', 'responseEnd');

    // Returns the time it took for redirects to complete.
    this.setTimingResolver_('REDIRECT_TIME', 'navigationStart', 'fetchStart');

    // Returns the time it took for DOM to become interactive.
    this.setTimingResolver_('DOM_INTERACTIVE_TIME', 'navigationStart', 'domInteractive');

    // Returns the time it took for content to load.
    this.setTimingResolver_('CONTENT_LOAD_TIME', 'navigationStart', 'domContentLoadedEventStart');

    // Access: Reader ID.
    this.setAsync_('ACCESS_READER_ID', /** @type {AsyncResolverDef} */function () {
      return _this.getAccessValue_(function (accessService) {
        return accessService.getAccessReaderId();
      }, 'ACCESS_READER_ID');
    });

    // Access: data from the authorization response.
    this.setAsync_('AUTHDATA', /** @type {AsyncResolverDef} */function (field) {
      _log.user().assert(field, 'The first argument to AUTHDATA, the field, is required');
      return _this.getAccessValue_(function (accessService) {
        return accessService.getAuthdataField(field);
      }, 'AUTHDATA');
    });

    // Returns an identifier for the viewer.
    this.setAsync_('VIEWER', function () {
      return _viewer.viewerFor(_this.win_).getViewerOrigin().then(function (viewer) {
        return viewer == undefined ? '' : viewer;
      });
    });

    // Returns the total engaged time since the content became viewable.
    this.setAsync_('TOTAL_ENGAGED_TIME', function () {
      return _activity.activityFor(_this.win_).then(function (activity) {
        return activity.getTotalEngagedTime();
      });
    });

    this.set_('NAV_TIMING', function (startAttribute, endAttribute) {
      _log.user().assert(startAttribute, 'The first argument to NAV_TIMING, the ' + 'start attribute name, is required');
      return _this.getTimingDataSync_( /**@type {string}*/startAttribute,
      /**@type {string}*/endAttribute);
    });
    this.setAsync_('NAV_TIMING', function (startAttribute, endAttribute) {
      _log.user().assert(startAttribute, 'The first argument to NAV_TIMING, the ' + 'start attribute name, is required');
      return _this.getTimingDataAsync_( /**@type {string}*/startAttribute,
      /**@type {string}*/endAttribute);
    });

    this.set_('NAV_TYPE', function () {
      return _this.getNavigationData_('type');
    });

    this.set_('NAV_REDIRECT_COUNT', function () {
      return _this.getNavigationData_('redirectCount');
    });

    // returns the AMP version number
    this.set_('AMP_VERSION', function () {
      return '1473975717617';
    });
  };

  /**
   * Resolves the value via document info.
   * @param {function(!../document-info.DocumentInfoDef):T} getter
   * @return {T}
   * @template T
   */

  UrlReplacements.prototype.getDocInfoValue_ = function getDocInfoValue_(getter) {
    return getter(_documentInfo.documentInfoForDoc(this.win_.document));
  };

  /**
   * Resolves the value via access service. If access service is not configured,
   * the resulting value is `null`.
   * @param {function(!AccessService):(T|!Promise<T>)} getter
   * @param {string} expr
   * @return {T|null}
   * @template T
   */

  UrlReplacements.prototype.getAccessValue_ = function getAccessValue_(getter, expr) {
    return this.getAccessService_(this.win_).then(function (accessService) {
      if (!accessService) {
        // Access service is not installed.
        _log.user().error(TAG, 'Access service is not installed to access: ', expr);
        return null;
      }
      return getter(accessService);
    });
  };

  /**
   * Returns navigation timing information based on the start and end events.
   * The data for the timing events is retrieved from performance.timing API.
   * If start and end events are both given, the result is the difference between the two.
   * If only start event is given, the result is the timing value at start event.
   * @param {string} startEvent
   * @param {string=} endEvent
   * @return {!Promise<ResolverReturnDef>}
   * @private
   */

  UrlReplacements.prototype.getTimingDataAsync_ = function getTimingDataAsync_(startEvent, endEvent) {
    var _this2 = this;

    var metric = this.getTimingDataSync_(startEvent, endEvent);
    if (metric === '') {
      // Metric is not yet available. Retry after a delay.
      return _eventHelper.loadPromise(this.win_).then(function () {
        return _this2.getTimingDataSync_(startEvent, endEvent);
      });
    }
    return Promise.resolve(metric);
  };

  /**
   * Returns navigation timing information based on the start and end events.
   * The data for the timing events is retrieved from performance.timing API.
   * If start and end events are both given, the result is the difference between the two.
   * If only start event is given, the result is the timing value at start event.
   * Enforces synchronous evaluation.
   * @param {string} startEvent
   * @param {string=} endEvent
   * @return {ResolverReturnDef} undefined if API is not available, empty string
   *    if it is not yet available, or value as string
   */

  UrlReplacements.prototype.getTimingDataSync_ = function getTimingDataSync_(startEvent, endEvent) {
    var timingInfo = this.win_['performance'] && this.win_['performance']['timing'];
    if (!timingInfo || timingInfo['navigationStart'] == 0) {
      // Navigation timing API is not supported.
      return;
    }

    var metric = endEvent === undefined ? timingInfo[startEvent] : timingInfo[endEvent] - timingInfo[startEvent];

    if (!_types.isFiniteNumber(metric)) {
      // The metric is not supported.
      return;
    } else if (metric < 0) {
      ;
      return '';
    } else {
      return metric;
    }
  };

  /**
   * Returns navigation information from the current browsing context.
   * @param {string} attribute
   * @return {ResolverReturnDef}
   * @private
   */

  UrlReplacements.prototype.getNavigationData_ = function getNavigationData_(attribute) {
    var navigationInfo = this.win_['performance'] && this.win_['performance']['navigation'];
    if (!navigationInfo || navigationInfo[attribute] === undefined) {
      // PerformanceNavigation interface is not supported or attribute is not implemented.
      return;
    }

    return navigationInfo[attribute];
  };

  /**
   *
   * Sets a synchronous value resolver for the variable with the specified name.
   * The value resolver may optionally take an extra parameter.
   * Can be called in conjuction with setAsync to allow for additional
   * asynchronous resolver where expand will use async and expandSync the sync
   * version.
   * @param {string} varName
   * @param {!SyncResolverDef} syncResolver
   * @return {!UrlReplacements}
   * @private
   */

  UrlReplacements.prototype.set_ = function set_(varName, syncResolver) {
    _log.dev().assert(varName.indexOf('RETURN') == -1);
    this.replacements_[varName] = this.replacements_[varName] || { sync: undefined, async: undefined };
    this.replacements_[varName].sync = syncResolver;
    this.replacementExpr_ = undefined;
    return this;
  };

  /**
   * Sets an async value resolver for the variable with the specified name.
   * The value resolver may optionally take an extra parameter.
   * Can be called in conjuction with setAsync to allow for additional
   * asynchronous resolver where expand will use async and expandSync the sync
   * version.
   * @param {string} varName
   * @param {!AsyncResolverDef} asyncResolver
   * @return {!UrlReplacements}
   * @private
   */

  UrlReplacements.prototype.setAsync_ = function setAsync_(varName, asyncResolver) {
    _log.dev().assert(varName.indexOf('RETURN') == -1);
    this.replacements_[varName] = this.replacements_[varName] || { sync: undefined, async: undefined };
    this.replacements_[varName].async = asyncResolver;
    this.replacementExpr_ = undefined;
    return this;
  };

  /**
   * Utility function for setting resolver for timing data that supports
   * sync and async.
   * @param {string} varName
   * @param {string} startEvent
   * @param {string=} endEvent
   * @return {!UrlReplacements}
   * @private
   */

  UrlReplacements.prototype.setTimingResolver_ = function setTimingResolver_(varName, startEvent, endEvent) {
    var _this3 = this;

    return this.set_(varName, function () {
      return _this3.getTimingDataSync_(startEvent, endEvent);
    }).setAsync_(varName, function () {
      return _this3.getTimingDataAsync_(startEvent, endEvent);
    });
  };

  /**
   * Synchronously expands the provided URL by replacing all known variables with
   * their resolved values. Optional `opt_bindings` can be used to add new
   * variables or override existing ones.  Any async bindings are ignored.
   * @param {string} url
   * @param {!Object<string, (ResolverReturnDef|!SyncResolverDef)>=} opt_bindings
   * @param {!Object<string, ResolverReturnDef>=} opt_collectVars
   * @return {string}
   */

  UrlReplacements.prototype.expandSync = function expandSync(url, opt_bindings, opt_collectVars) {
    return (/** @type {string} */this.expand_(url, opt_bindings, opt_collectVars, /* opt_sync */true)
    );
  };

  /**
   * Expands the provided URL by replacing all known variables with their
   * resolved values. Optional `opt_bindings` can be used to add new variables
   * or override existing ones.
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<string>}
   */

  UrlReplacements.prototype.expandAsync = function expandAsync(url, opt_bindings) {
    return (/** @type {!Promise<string>} */this.expand_(url, opt_bindings)
    );
  };

  /**
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @param {!Object<string, *>=} opt_collectVars
   * @param {boolean=} opt_sync
   * @return {!Promise<string>|string}
   * @private
   */

  UrlReplacements.prototype.expand_ = function expand_(url, opt_bindings, opt_collectVars, opt_sync) {
    var _this4 = this;

    if (!this.initialized_) {
      this.initialize_();
    }
    var expr = this.getExpr_(opt_bindings);
    var replacementPromise = undefined;
    var encodeValue = function (val) {
      if (val == null) {
        val = '';
      }
      return encodeURIComponent(val);
    };
    url = url.replace(expr, function (match, name, opt_strargs) {
      var args = [];
      if (typeof opt_strargs == 'string') {
        args = opt_strargs.split(',');
      }
      var binding = undefined;
      if (opt_bindings && name in opt_bindings) {
        binding = opt_bindings[name];
      } else if (binding = _this4.getReplacement_(name)) {
        if (opt_sync) {
          binding = binding.sync;
          if (!binding) {
            _log.user().error(TAG, 'ignoring async replacement key: ', name);
            return '';
          }
        } else {
          binding = binding.async || binding.sync;
        }
      }
      var val = undefined;
      try {
        val = typeof binding == 'function' ? binding.apply(null, args) : binding;
      } catch (e) {
        // Report error, but do not disrupt URL replacement. This will
        // interpolate as the empty string.
        if (opt_sync) {
          val = '';
        }
        _log.rethrowAsync(e);
      }
      // In case the produced value is a promise, we don't actually
      // replace anything here, but do it again when the promise resolves.
      if (val && val.then) {
        var _ret = (function () {
          if (opt_sync) {
            _log.user().error(TAG, 'ignoring promise value for key: ', name);
            return {
              v: ''
            };
          }
          var p = val['catch'](function (err) {
            // Report error, but do not disrupt URL replacement. This will
            // interpolate as the empty string.
            _log.rethrowAsync(err);
          }).then(function (v) {
            url = url.replace(match, encodeValue(v));
            if (opt_collectVars) {
              opt_collectVars[match] = v;
            }
          });
          if (replacementPromise) {
            replacementPromise = replacementPromise.then(function () {
              return p;
            });
          } else {
            replacementPromise = p;
          }
          return {
            v: match
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
      if (opt_collectVars) {
        opt_collectVars[match] = val;
      }
      return encodeValue(val);
    });

    if (replacementPromise) {
      replacementPromise = replacementPromise.then(function () {
        return url;
      });
    }

    return opt_sync ? url : replacementPromise || Promise.resolve(url);
  };

  /**
   * Collects all substitutions in the provided URL and expands them to the
   * values for known variables. Optional `opt_bindings` can be used to add
   * new variables or override existing ones.
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<!Object<string, *>>}
   */

  UrlReplacements.prototype.collectVars = function collectVars(url, opt_bindings) {
    var vars = Object.create(null);
    return this.expand_(url, opt_bindings, vars).then(function () {
      return vars;
    });
  };

  /**
   * Method exists to assist stubbing in tests.
   * @param {string} name
   * @return {!ReplacementDef}
   */

  UrlReplacements.prototype.getReplacement_ = function getReplacement_(name) {
    return this.replacements_[name];
  };

  /**
   * @param {!Object<string, *>=} opt_bindings
   * @return {!RegExp}
   * @private
   */

  UrlReplacements.prototype.getExpr_ = function getExpr_(opt_bindings) {
    var _this5 = this;

    var additionalKeys = opt_bindings ? Object.keys(opt_bindings) : null;
    if (additionalKeys && additionalKeys.length > 0) {
      var _ret2 = (function () {
        var allKeys = Object.keys(_this5.replacements_);
        additionalKeys.forEach(function (key) {
          if (_this5.replacements_[key] === undefined) {
            allKeys.push(key);
          }
        });
        return {
          v: _this5.buildExpr_(allKeys)
        };
      })();

      if (typeof _ret2 === 'object') return _ret2.v;
    }
    if (!this.replacementExpr_) {
      this.replacementExpr_ = this.buildExpr_(Object.keys(this.replacements_));
    }
    return this.replacementExpr_;
  };

  /**
   * @param {!Array<string>} keys
   * @return {!RegExp}
   * @private
   */

  UrlReplacements.prototype.buildExpr_ = function buildExpr_(keys) {
    // The keys must be sorted to ensure that the longest keys are considered
    // first. This avoids a problem where a RANDOM conflicts with RANDOM_ONE.
    keys.sort(function (s1, s2) {
      return s2.length - s1.length;
    });
    var all = keys.join('|');
    // Match the given replacement patterns, as well as optionally
    // arguments to the replacement behind it in parantheses.
    // Example string that match
    // FOO_BAR
    // FOO_BAR(arg1)
    // FOO_BAR(arg1,arg2)
    return new RegExp('\\$?(' + all + ')(?:\\(([0-9a-zA-Z-_.,]+)\\))?', 'g');
  };

  return UrlReplacements;
})();

exports.UrlReplacements = UrlReplacements;

function installUrlReplacementsService(window) {
  return _service.fromClass(window, 'url-replace', UrlReplacements);
}

;

},{"../access-service":7,"../activity":8,"../cid":14,"../document-info":19,"../event-helper":27,"../log":41,"../service":56,"../share-tracking-service":79,"../types":88,"../url":90,"../user-notification":91,"../variant-service":93,"../viewer":96,"../viewport":97,"../vsync":99}],73:[function(require,module,exports){
exports.__esModule = true;
exports.installVideoManagerForDoc = installVideoManagerForDoc;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _eventHelper = require('../event-helper');

var _log = require('../log');

var _platform = require('../platform');

var _service = require('../service');

var _videoInterface = require('../video-interface');

var _viewer = require('../viewer');

var _viewport = require('../viewport');

var _vsync = require('../vsync');

/**
 * @const {number} Percentage of the video that should be in viewport before it
 * is considered visible.
 */
var VISIBILITY_PERCENT = 75;

/**
 * VideoManager keeps track of all AMP video players that implement
 * the common Video API {@see ../video-interface.VideoInterface}.
 *
 * It is responsible for providing a unified user experience and analytics for
 * all videos within a document.
 */

var VideoManager = (function () {

  /**
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   */

  function VideoManager(ampdoc) {
    babelHelpers.classCallCheck(this, VideoManager);

    /** @private @const {!Window} */
    this.win_ = ampdoc.win;

    /** @private {?Array<!VideoEntry>} */
    this.entries_ = null;

    /** @private {boolean} */
    this.scrollListenerInstalled_ = false;
  }

  /**
   * VideoEntry represents an entry in the VideoManager's list.
   */

  /**
   * Registers a video component that implements the VideoInterface.
   * @param {!../video-interface.VideoInterface} video
   */

  VideoManager.prototype.register = function register(video) {
    _log.dev().assert(video);

    // TODO(aghassemi): Remove this later. For now, VideoManager only matters
    // for autoplay videos so no point in registering arbitrary videos yet.
    if (!video.element.hasAttribute(_videoInterface.VideoAttributes.AUTOPLAY) || !platformSupportsAutoplay(_platform.platformFor(this.win_))) {
      return;
    }

    if (!video.supportsPlatform()) {
      return;
    }

    this.entries_ = this.entries_ || [];
    var entry = new VideoEntry(this.win_, video);

    if (entry.needsVisibilityObserver()) {
      this.maybeInstallVisibilityObserver_(entry);
    }

    this.entries_.push(entry);
  };

  /**
   * Install the necessary listeners to be notified when a video becomes visible
   * in the viewport.
   *
   * Visibility of a video is defined by being in the viewport AND having
   * {@link VISIBILITY_PERCENT} of the video element visible.
   *
   * @param {VideoEntry} entry
   * @private
   */

  VideoManager.prototype.maybeInstallVisibilityObserver_ = function maybeInstallVisibilityObserver_(entry) {
    var _this = this;

    _eventHelper.listen(entry.video.element, _videoInterface.VideoEvents.VISIBILITY, function () {
      entry.updateVisibility();
    });

    // TODO(aghassemi, #4780): Create a new IntersectionObserver service.
    if (!this.scrollListenerInstalled_) {
      var scrollListener = function () {
        for (var i = 0; i < _this.entries_.length; i++) {
          _this.entries_[i].updateVisibility();
        }
      };
      var viewport = _viewport.viewportFor(this.win_);
      viewport.onScroll(scrollListener);
      viewport.onChanged(scrollListener);
      this.scrollListenerInstalled_ = true;
    }
  };

  return VideoManager;
})();

exports.VideoManager = VideoManager;

var VideoEntry = (function () {
  /**
   * @param {!Window} win
   * @param {!../video-interface.VideoInterface} video
   */

  function VideoEntry(win, video) {
    var _this2 = this;

    babelHelpers.classCallCheck(this, VideoEntry);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @package @const {!../video-interface.VideoInterface} */
    this.video = video;

    /** @private {boolean} */
    this.loaded_ = false;

    /** @private {boolean} */
    this.isVisible_ = false;

    /** @private {boolean} */
    this.userInteracted_ = false;

    /** @private @const {!../service/vsync-impl.Vsync} */
    this.vsync_ = _vsync.vsyncFor(win);

    /** @private {boolean} */
    this.canAutoplay_ = video.element.hasAttribute(_videoInterface.VideoAttributes.AUTOPLAY) && platformSupportsAutoplay(_platform.platformFor(win));

    var element = _log.dev().assert(video.element);

    _eventHelper.listenOncePromise(element, _videoInterface.VideoEvents.CANPLAY).then(function () {
      return _this2.videoLoaded_();
    });

    // Currently we only register after video player is build.
    this.videoBuilt_();
  }

  /**
   * Detects whether the platform even supports autoplay videos.
   * @param {!../service/platform-impl.Platform} platform
   * @return {boolean}
   */

  /**
   * Called when the video element is built.
   * @private
   */

  VideoEntry.prototype.videoBuilt_ = function videoBuilt_() {
    if (this.canAutoplay_) {
      this.autoplayVideoBuilt_();
    }
  };

  /**
   * Called when the video is loaded and can play.
   * @private
   */

  VideoEntry.prototype.videoLoaded_ = function videoLoaded_() {
    this.loaded_ = true;
    if (this.isVisible_) {
      // Handles the case when the video becomes visible before loading
      this.loadedVideoVisibilityChanged_();
    }
  };

  /**
   * Called when visibility of a video changes.
   * @private
   */

  VideoEntry.prototype.videoVisibilityChanged_ = function videoVisibilityChanged_() {
    if (this.loaded_) {
      this.loadedVideoVisibilityChanged_();
    }
  };

  /**
   * Only called when visibility of a loaded video changes.
   * @private
   */

  VideoEntry.prototype.loadedVideoVisibilityChanged_ = function loadedVideoVisibilityChanged_() {
    if (this.canAutoplay_) {
      this.autoplayLoadedVideoVisibilityChanged_();
    }
  };

  /**
   * Whether there is a need to monitor visibility of this video.
   * @return {boolean}
   * @package
   */

  VideoEntry.prototype.needsVisibilityObserver = function needsVisibilityObserver() {
    return this.canAutoplay_;
  };

  /* Autoplay Behaviour */

  /**
   * Called when an autoplay video is built.
   * @private
   */

  VideoEntry.prototype.autoplayVideoBuilt_ = function autoplayVideoBuilt_() {
    var _this3 = this;

    this.video.mute();

    // If autoplay video has controls, hide them and only show them on
    // user-ineraction.
    if (this.video.element.hasAttribute(_videoInterface.VideoAttributes.CONTROLS)) {
      this.video.hideControls();

      // TODO(aghassemi): This won't work for iframes, needs a transparent shim
      _eventHelper.listenOnce(this.video.element, 'click', function () {
        _this3.userInteracted_ = true;
        _this3.video.showControls();
        _this3.video.unmute();
      });
    }
  };

  /**
   * Called when visibility of a loaded autoplay video changes.
   * @private
   */

  VideoEntry.prototype.autoplayLoadedVideoVisibilityChanged_ = function autoplayLoadedVideoVisibilityChanged_() {
    if (this.userInteracted_ || !_viewer.viewerFor(this.win_).isVisible()) {
      return;
    }

    if (this.isVisible_) {
      this.video.play( /*autoplay*/true);
    } else {
      this.video.pause();
    }
  };

  /**
   * Called by all possible events that might change the visibility of the video
   * such as scrolling or {@link ../video-interface.VideoEvents#VISIBILITY}.
   * @package
   */

  VideoEntry.prototype.updateVisibility = function updateVisibility() {
    var _this4 = this;

    var wasVisible = this.isVisible_;

    // Measure if video is now in viewport and what percentage of it is visible
    var measure = function () {
      if (!_this4.video.isInViewport()) {
        _this4.isVisible_ = false;
        return;
      }

      // Calculate what percentage of the video is in viewport
      var change = _this4.video.element.getIntersectionChangeEntry();
      var ir = change.intersectionRect;
      var br = change.boundingClientRect;
      var visiblePercent = br.height * br.width == 0 ? 0 : ir.width * ir.height * 100 / (br.height * br.width);

      _this4.isVisible_ = visiblePercent >= VISIBILITY_PERCENT;
    };

    // Mutate if visibility changed from previous state
    var mutate = function () {
      if (_this4.isVisible_ != wasVisible) {
        _this4.videoVisibilityChanged_();
      }
    };

    this.vsync_.run({
      measure: measure,
      mutate: mutate
    });
  };

  return VideoEntry;
})();

function platformSupportsAutoplay(platform) {
  // non-mobile platforms always supported autoplay
  if (!platform.isAndroid() && !platform.isIos()) {
    return true;
  }

  var version = platform.getMajorVersion();
  if (platform.isAndroid()) {
    if (platform.isFirefox() && version >= 37) {
      return true;
    }
    if (platform.isChrome() && version >= 53) {
      return true;
    }
  }

  if (platform.isIos()) {
    if (platform.isSafari() && version >= 10) {
      return true;
    }
  }

  // TODO(aghassemi): Test other combinations and add support.
  // TODO(aghassemi): Is there a way to detect that autoplay has been disabled
  // in the user preferences of the browser?
  return false;
}

/**
 * @param {!./ampdoc-impl.AmpDoc} ampdoc
 * @return {!VideoManager}
 */

function installVideoManagerForDoc(ampdoc) {
  return _service.fromClassForDoc(ampdoc, 'video-manager', VideoManager);
}

;

},{"../event-helper":27,"../log":41,"../platform":47,"../service":56,"../video-interface":94,"../viewer":96,"../viewport":97,"../vsync":99}],74:[function(require,module,exports){
exports.__esModule = true;
exports.installViewerService = installViewerService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _observable = require('../observable');

var _documentState = require('../document-state');

var _mode = require('../mode');

var _service = require('../service');

var _log = require('../log');

var _url = require('../url');

var _platform = require('../platform');

var _timer = require('../timer');

var _error = require('../error');

var _visibilityState = require('../visibility-state');

var _config = require('../config');

var _json = require('../json');

var TAG_ = 'Viewer';
var SENTINEL_ = '__AMP__';

/**
 * Duration in milliseconds to wait for viewerOrigin to be set before an empty
 * string is returned.
 * @const
 * @private {number}
 */
var VIEWER_ORIGIN_TIMEOUT_ = 1000;

/**
 * The type of the viewport.
 * @enum {string}
 */
var ViewportType = {

  /**
   * Viewer leaves sizing and scrolling up to the AMP document's window.
   */
  NATURAL: 'natural',

  /**
   * This is AMP-specific type and doesn't come from viewer. This is the type
   * that AMP sets when Viewer has requested "natural" viewport on a iOS
   * device.
   * See:
   * https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md
   * and {@link ViewportBindingNaturalIosEmbed_} for more details.
   */
  NATURAL_IOS_EMBED: 'natural-ios-embed'
};

exports.ViewportType = ViewportType;
/**
 * These domains are trusted with more sensitive viewer operations such as
 * propagating the referrer. If you believe your domain should be here,
 * file the issue on GitHub to discuss. The process will be similar
 * (but somewhat more stringent) to the one described in the [3p/README.md](
 * https://github.com/ampproject/amphtml/blob/master/3p/README.md)
 *
 * @export {!Array<!RegExp>}
 */
var TRUSTED_VIEWER_HOSTS = [
/**
 * Google domains, including country-codes and subdomains:
 * - google.com
 * - www.google.com
 * - google.co
 * - www.google.co
 * - google.az
 * - www.google..az
 * - google.com.az
 * - www.google.com.az
 * - google.co.az
 * - www.google.co.az
 */
/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2})$/];

exports.TRUSTED_VIEWER_HOSTS = TRUSTED_VIEWER_HOSTS;
/**
 * An AMP representation of the Viewer. This class doesn't do any work itself
 * but instead delegates everything to the actual viewer. This class and the
 * actual Viewer are connected via "AMP.viewer" using three methods:
 * {@link getParam}, {@link receiveMessage} and {@link setMessageDeliverer}.
 * @package Visible for type.
 */

var Viewer = (function () {

  /**
   * @param {!Window} win
   */

  function Viewer(win) {
    var _this = this;

    babelHelpers.classCallCheck(this, Viewer);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {boolean} */
    this.isIframed_ = this.win.parent && this.win.parent != this.win;

    /** @const {!../document-state.DocumentState} */
    this.docState_ = _documentState.documentStateFor(this.win);

    /** @private {boolean} */
    this.isRuntimeOn_ = true;

    /** @private {boolean} */
    this.overtakeHistory_ = false;

    /** @private {!VisibilityState} */
    this.visibilityState_ = _visibilityState.VisibilityState.VISIBLE;

    /** @private {string} */
    this.viewerVisibilityState_ = this.visibilityState_;

    /** @private {number} */
    this.prerenderSize_ = 1;

    /** @private {!ViewportType} */
    this.viewportType_ = ViewportType.NATURAL;

    /** @private {number} */
    this.paddingTop_ = 0;

    /** @private {!Observable<boolean>} */
    this.runtimeOnObservable_ = new _observable.Observable();

    /** @private {!Observable} */
    this.visibilityObservable_ = new _observable.Observable();

    /** @private {!Observable<!{paddingTop: number, duration: (number|undefined), curve: (string|undefined)}>} */
    this.viewportObservable_ = new _observable.Observable();

    /** @private {!Observable<!ViewerHistoryPoppedEventDef>} */
    this.historyPoppedObservable_ = new _observable.Observable();

    /** @private {!Observable<!JSONType>} */
    this.broadcastObservable_ = new _observable.Observable();

    /** @private {?function(string, *, boolean):(Promise<*>|undefined)} */
    this.messageDeliverer_ = null;

    /** @private {?string} */
    this.messagingOrigin_ = null;

    /** @private {!Array<!{eventType: string, data: *}>} */
    this.messageQueue_ = [];

    /** @const @private {!Object<string, string>} */
    this.params_ = {};

    /** @private {?function()} */
    this.whenFirstVisibleResolve_ = null;

    /** @private {?time} */
    this.firstVisibleTime_ = null;

    /** @private {?Function} */
    this.messagingReadyResolver_ = null;

    /** @private {?Function} */
    this.viewerOriginResolver_ = null;

    /** @private {?Function} */
    this.trustedViewerResolver_ = null;

    /**
     * This promise might be resolved right away if the current
     * document is already visible. See end of this constructor where we call
     * `this.onVisibilityChange_()`.
     * @private @const {!Promise}
     */
    this.whenFirstVisiblePromise_ = new Promise(function (resolve) {
      _this.whenFirstVisibleResolve_ = resolve;
    });

    // Params can be passed either via iframe name or via hash. Hash currently
    // has precedence.
    if (this.win.name && this.win.name.indexOf(SENTINEL_) == 0) {
      parseParams_(this.win.name.substring(SENTINEL_.length), this.params_);
    }
    if (this.win.location.hash) {
      parseParams_(this.win.location.hash, this.params_);
    }

    _log.dev().fine(TAG_, 'Viewer params:', this.params_);

    this.isRuntimeOn_ = !parseInt(this.params_['off'], 10);
    _log.dev().fine(TAG_, '- runtimeOn:', this.isRuntimeOn_);

    this.overtakeHistory_ = !!(parseInt(this.params_['history'], 10) || this.overtakeHistory_);
    _log.dev().fine(TAG_, '- history:', this.overtakeHistory_);

    this.setVisibilityState_(this.params_['visibilityState']);
    _log.dev().fine(TAG_, '- visibilityState:', this.getVisibilityState());

    this.prerenderSize_ = parseInt(this.params_['prerenderSize'], 10) || this.prerenderSize_;
    _log.dev().fine(TAG_, '- prerenderSize:', this.prerenderSize_);

    this.viewportType_ = this.params_['viewportType'] || this.viewportType_;
    // Configure scrolling parameters when AMP is iframed on iOS.
    var platform = _platform.platformFor(this.win);
    if (this.viewportType_ == ViewportType.NATURAL && this.isIframed_ && platform.isIos()) {
      this.viewportType_ = ViewportType.NATURAL_IOS_EMBED;
    }
    // Enable iOS Embedded mode so that it's easy to test against a more
    // realistic iOS environment.
    if (platform.isIos() && this.viewportType_ != ViewportType.NATURAL_IOS_EMBED && (_mode.getMode(win).localDev || _mode.getMode(win).development)) {
      this.viewportType_ = ViewportType.NATURAL_IOS_EMBED;
    }
    _log.dev().fine(TAG_, '- viewportType:', this.viewportType_);

    this.paddingTop_ = parseInt(this.params_['paddingTop'], 10) || this.paddingTop_;
    _log.dev().fine(TAG_, '- padding-top:', this.paddingTop_);

    /** @private @const {boolean} */
    this.performanceTracking_ = this.params_['csi'] === '1';
    _log.dev().fine(TAG_, '- performanceTracking:', this.performanceTracking_);

    /**
     * Whether the AMP document is embedded in a viewer, such as an iframe or
     * a web view.
     * @private @const {boolean}
     */
    this.isEmbedded_ = (this.isIframed_ || this.params_['webview'] === '1') && !this.win.AMP_TEST_IFRAME;

    /** @private {boolean} */
    this.hasBeenVisible_ = this.isVisible();

    // Wait for document to become visible.
    this.docState_.onVisibilityChanged(this.recheckVisibilityState_.bind(this));

    /**
     * This promise will resolve when communications channel has been
     * established or timeout in 20 seconds. The timeout is needed to avoid
     * this promise becoming a memory leak with accumulating undelivered
     * messages. The promise is only available when the document is embedded.
     * @private @const {?Promise}
     */
    this.messagingReadyPromise_ = this.isEmbedded_ ? _timer.timerFor(this.win).timeoutPromise(20000, new Promise(function (resolve) {
      _this.messagingReadyResolver_ = resolve;
    }))['catch'](function (reason) {
      throw getChannelError( /** @type {!Error|string|undefined} */reason);
    }) : null;

    /**
     * A promise for non-essential messages. These messages should not fail
     * if there's no messaging channel set up. But ideally viewer would try to
     * deliver if at all possible. This promise is only available when the
     * document is embedded.
     * @private @const {?Promise}
     */
    this.messagingMaybePromise_ = this.isEmbedded_ ? this.messagingReadyPromise_['catch'](function (reason) {
      // Don't fail promise, but still report.
      _error.reportError(getChannelError(
      /** @type {!Error|string|undefined} */reason));
    }) : null;

    // Trusted viewer and referrer.
    var trustedViewerResolved = undefined;
    var trustedViewerPromise = undefined;
    if (!this.isEmbedded_) {
      // Not embedded in IFrame - can't trust the viewer.
      trustedViewerResolved = false;
      trustedViewerPromise = Promise.resolve(false);
    } else if (this.win.location.ancestorOrigins) {
      // Ancestors when available take precedence. This is the main API used
      // for this determination. Fallback is only done when this API is not
      // supported by the browser.
      trustedViewerResolved = this.win.location.ancestorOrigins.length > 0 && this.isTrustedViewerOrigin_(this.win.location.ancestorOrigins[0]);
      trustedViewerPromise = Promise.resolve(trustedViewerResolved);
    } else {
      // Wait for comms channel to confirm the origin.
      trustedViewerResolved = undefined;
      trustedViewerPromise = new Promise(function (resolve) {
        _this.trustedViewerResolver_ = resolve;
      });
    }

    /** @const @private {!Promise<boolean>} */
    this.isTrustedViewer_ = trustedViewerPromise;

    /** @const @private {!Promise<string>} */
    this.viewerOrigin_ = new Promise(function (resolve) {
      if (!_this.isEmbedded()) {
        // Viewer is only determined for iframed documents at this time.
        resolve('');
      } else if (_this.win.location.ancestorOrigins && _this.win.location.ancestorOrigins.length > 0) {
        resolve(_this.win.location.ancestorOrigins[0]);
      } else {
        // Race to resolve with a timer.
        _timer.timerFor(_this.win).delay(function () {
          return resolve('');
        }, VIEWER_ORIGIN_TIMEOUT_);
        _this.viewerOriginResolver_ = resolve;
      }
    });

    /** @private {string} */
    this.unconfirmedReferrerUrl_ = this.isEmbedded() && 'referrer' in this.params_ && trustedViewerResolved !== false ? this.params_['referrer'] : this.win.document.referrer;

    /** @const @private {!Promise<string>} */
    this.referrerUrl_ = new Promise(function (resolve) {
      if (_this.isEmbedded() && 'referrer' in _this.params_) {
        // Viewer override, but only for whitelisted viewers. Only allowed for
        // iframed documents.
        _this.isTrustedViewer_.then(function (isTrusted) {
          if (isTrusted) {
            resolve(_this.params_['referrer']);
          } else {
            resolve(_this.win.document.referrer);
            if (_this.unconfirmedReferrerUrl_ != _this.win.document.referrer) {
              _log.dev().error(TAG_, 'Untrusted viewer referrer override: ' + _this.unconfirmedReferrerUrl_ + ' at ' + _this.messagingOrigin_);
              _this.unconfirmedReferrerUrl_ = _this.win.document.referrer;
            }
          }
        });
      } else {
        resolve(_this.win.document.referrer);
      }
    });

    /** @private {string} */
    this.resolvedViewerUrl_ = _url.removeFragment(this.win.location.href || '');

    /** @const @private {!Promise<string>} */
    this.viewerUrl_ = new Promise(function (resolve) {
      var viewerUrlOverride = _this.params_['viewerUrl'];
      if (_this.isEmbedded() && viewerUrlOverride) {
        // Viewer override, but only for whitelisted viewers. Only allowed for
        // iframed documents.
        _this.isTrustedViewer_.then(function (isTrusted) {
          if (isTrusted) {
            _this.resolvedViewerUrl_ = viewerUrlOverride;
          } else {
            _log.dev().error(TAG_, 'Untrusted viewer url override: ' + viewerUrlOverride + ' at ' + _this.messagingOrigin_);
          }
          resolve(_this.resolvedViewerUrl_);
        });
      } else {
        resolve(_this.resolvedViewerUrl_);
      }
    });

    // Remove hash - no reason to keep it around, but only when embedded or we have
    // an incoming click tracking string (see impression.js).
    if (this.isEmbedded_ || this.params_['click']) {
      var newUrl = _url.removeFragment(this.win.location.href);
      if (newUrl != this.win.location.href && this.win.history.replaceState) {
        // Persist the hash that we removed has location.originalHash.
        // This is currently used my mode.js to infer development mode.
        this.win.location.originalHash = this.win.location.hash;
        this.win.history.replaceState({}, '', newUrl);
        _log.dev().fine(TAG_, 'replace url:' + this.win.location.href);
      }
    }

    // Check if by the time the `Viewer`
    // instance is constructed, the document is already `visible`.
    this.recheckVisibilityState_();
    this.onVisibilityChange_();
  }

  /**
   * Parses the viewer parameters as a string.
   *
   * Visible for testing only.
   *
   * @param {string} str
   * @param {!Object<string, string>} allParams
   * @private
   */

  /**
   * Handler for visibility change.
   * @private
   */

  Viewer.prototype.onVisibilityChange_ = function onVisibilityChange_() {
    if (this.isVisible()) {
      if (!this.firstVisibleTime_) {
        this.firstVisibleTime_ = Date.now();
      }
      this.hasBeenVisible_ = true;
      this.whenFirstVisibleResolve_();
    }
    this.visibilityObservable_.fire();
  };

  /**
   * Returns the value of a viewer's startup parameter with the specified
   * name or "undefined" if the parameter wasn't defined at startup time.
   * @param {string} name
   * @return {string|undefined}
   * @export
   */

  Viewer.prototype.getParam = function getParam(name) {
    return this.params_[name];
  };

  /**
   * Viewers can communicate their "capabilities" and this method allows
   * checking them.
   * @param {string} name Of the capability.
   * @return {boolean}
   */

  Viewer.prototype.hasCapability = function hasCapability(name) {
    var capabilities = this.params_['cap'];
    if (!capabilities) {
      return false;
    }
    // TODO(@cramforce): Consider caching the split.
    return capabilities.split(',').indexOf(name) != -1;
  };

  /**
   * Requests A2A navigation to the given destination. If the viewer does
   * not support this operation, will navigate the top level window
   * to the destination.
   * The URL is assumed to be in AMP Cache format already.
   * @param {string} url An AMP article URL.
   * @param {string} requestedBy Informational string about the entity that
   *     requested the navigation.
   */

  Viewer.prototype.navigateTo = function navigateTo(url, requestedBy) {
    _log.dev().assert(url.indexOf(_config.urls.cdn) == 0, 'Invalid A2A URL %s %s', url, requestedBy);
    if (this.hasCapability('a2a')) {
      this.sendMessage('a2a', {
        url: url,
        requestedBy: requestedBy
      }, /* awaitResponse */false);
    } else {
      this.win.top.location.href = url;
    }
  };

  /**
   * Whether the document is embedded in a iframe.
   * @return {boolean}
   */

  Viewer.prototype.isIframed = function isIframed() {
    return this.isIframed_;
  };

  /**
   * Whether the document is embedded in a viewer.
   * @return {boolean}
   */

  Viewer.prototype.isEmbedded = function isEmbedded() {
    return this.isEmbedded_;
  };

  /**
   * @return {boolean}
   */

  Viewer.prototype.isRuntimeOn = function isRuntimeOn() {
    return this.isRuntimeOn_;
  };

  /**
   * Identifies if the viewer is recording instrumentation.
   * Will also return false if no messaging channel is established, this
   * means the AMP page is not embedded.
   * @return {boolean}
   */

  Viewer.prototype.isPerformanceTrackingOn = function isPerformanceTrackingOn() {
    // If there is no messagingMaybePromise_, then document is not
    // embedded and no performance tracking is needed since there is nobody
    // to forward the events.
    return this.performanceTracking_ && !!this.messagingMaybePromise_;
  };

  /**
   */

  Viewer.prototype.toggleRuntime = function toggleRuntime() {
    this.isRuntimeOn_ = !this.isRuntimeOn_;
    _log.dev().fine(TAG_, 'Runtime state:', this.isRuntimeOn_);
    this.runtimeOnObservable_.fire(this.isRuntimeOn_);
  };

  /**
   * @param {function(boolean)} handler
   * @return {!UnlistenDef}
   */

  Viewer.prototype.onRuntimeState = function onRuntimeState(handler) {
    return this.runtimeOnObservable_.add(handler);
  };

  /**
   * Whether the viewer overtakes the history for AMP document. If yes,
   * the viewer must implement history messages "pushHistory" and "popHistory"
   * and emit message "historyPopped"
   * @return {boolean}
   */

  Viewer.prototype.isOvertakeHistory = function isOvertakeHistory() {
    return this.overtakeHistory_;
  };

  /**
   * Returns visibility state configured by the viewer.
   * See {@link isVisible}.
   * @return {!VisibilityState}
   */

  Viewer.prototype.getVisibilityState = function getVisibilityState() {
    return this.visibilityState_;
  };

  Viewer.prototype.recheckVisibilityState_ = function recheckVisibilityState_() {
    this.setVisibilityState_(this.viewerVisibilityState_);
  };

  /**
   * Sets the viewer defined visibility state.
   * @param {string|undefined} state
   */

  Viewer.prototype.setVisibilityState_ = function setVisibilityState_(state) {
    if (!state) {
      return;
    }
    var oldState = this.visibilityState_;
    state = _log.dev().assertEnumValue(_visibilityState.VisibilityState, state, 'VisibilityState');

    // The viewer is informing us we are not currently active because we are
    // being pre-rendered, or the user swiped to another doc (or closed the
    // viewer). Unfortunately, the viewer sends HIDDEN instead of PRERENDER or
    // INACTIVE, though we know better.
    if (state === _visibilityState.VisibilityState.HIDDEN) {
      state = this.hasBeenVisible_ ? _visibilityState.VisibilityState.INACTIVE : _visibilityState.VisibilityState.PRERENDER;
    }

    this.viewerVisibilityState_ = state;

    if (this.docState_.isHidden() && (state === _visibilityState.VisibilityState.VISIBLE || state === _visibilityState.VisibilityState.PAUSED)) {
      state = _visibilityState.VisibilityState.HIDDEN;
    }

    this.visibilityState_ = state;

    _log.dev().fine(TAG_, 'visibilitychange event:', this.getVisibilityState());

    if (oldState !== state) {
      this.onVisibilityChange_();
    }
  };

  /**
   * Whether the AMP document currently visible. The reasons why it might not
   * be visible include user switching to another tab, browser running the
   * document in the prerender mode or viewer running the document in the
   * prerender mode.
   * @return {boolean}
   */

  Viewer.prototype.isVisible = function isVisible() {
    return this.getVisibilityState() == _visibilityState.VisibilityState.VISIBLE;
  };

  /**
   * Whether the AMP document has been ever visible before. Since the visiblity
   * state of a document can be flipped back and forth we sometimes want to know
   * if a document has ever been visible.
   * @return {boolean}
   */

  Viewer.prototype.hasBeenVisible = function hasBeenVisible() {
    return this.hasBeenVisible_;
  };

  /**
   * Returns a Promise that only ever resolved when the current
   * AMP document becomes visible.
   * @return {!Promise}
   */

  Viewer.prototype.whenFirstVisible = function whenFirstVisible() {
    return this.whenFirstVisiblePromise_;
  };

  /**
   * Returns the time when the document has become visible for the first time.
   * If document has not yet become visible, the returned value is `null`.
   * @return {?time}
   */

  Viewer.prototype.getFirstVisibleTime = function getFirstVisibleTime() {
    return this.firstVisibleTime_;
  };

  /**
   * How much the viewer has requested the runtime to prerender the document.
   * The values are in number of screens.
   * @return {number}
   */

  Viewer.prototype.getPrerenderSize = function getPrerenderSize() {
    return this.prerenderSize_;
  };

  /**
   * See `ViewportType` enum for the set of allowed values.
   * See {@link Viewport} and {@link ViewportBinding} for more details.
   * @return {!ViewportType}
   */

  Viewer.prototype.getViewportType = function getViewportType() {
    return this.viewportType_;
  };

  /**
   * Returns the top padding requested by the viewer.
   * @return {number}
   */

  Viewer.prototype.getPaddingTop = function getPaddingTop() {
    return this.paddingTop_;
  };

  /**
   * Returns the resolved viewer URL value. It's by default the current page's
   * URL. The trusted viewers are allowed to override this value.
   * @return {string}
   */

  Viewer.prototype.getResolvedViewerUrl = function getResolvedViewerUrl() {
    return this.resolvedViewerUrl_;
  };

  /**
   * Returns the promise that will yield the viewer URL value. It's by default
   * the current page's URL. The trusted viewers are allowed to override this
   * value.
   * @return {!Promise<string>}
   */

  Viewer.prototype.getViewerUrl = function getViewerUrl() {
    return this.viewerUrl_;
  };

  /**
   * Possibly return the messaging origin if set. This would be the origin
   * of the parent viewer.
   * @return {?string}
   */

  Viewer.prototype.maybeGetMessagingOrigin = function maybeGetMessagingOrigin() {
    return this.messagingOrigin_;
  };

  /**
   * Returns an unconfirmed "referrer" URL that can be optionally customized by
   * the viewer. Consider using `getReferrerUrl()` instead, which returns the
   * promise that will yield the confirmed "referrer" URL.
   * @return {string}
   */

  Viewer.prototype.getUnconfirmedReferrerUrl = function getUnconfirmedReferrerUrl() {
    return this.unconfirmedReferrerUrl_;
  };

  /**
   * Returns the promise that will yield the confirmed "referrer" URL. This
   * URL can be optionally customized by the viewer, but viewer is required
   * to be a trusted viewer.
   * @return {!Promise<string>}
   */

  Viewer.prototype.getReferrerUrl = function getReferrerUrl() {
    return this.referrerUrl_;
  };

  /**
   * Whether the viewer has been whitelisted for more sensitive operations
   * such as customizing referrer.
   * @return {!Promise<boolean>}
   */

  Viewer.prototype.isTrustedViewer = function isTrustedViewer() {
    return this.isTrustedViewer_;
  };

  /**
   * Returns the promise that resolves to URL representing the origin of the
   * viewer. If the document is not embedded or if a viewer origin can't be
   * found, empty string is returned.
   * @return {!Promise<string>}
   */

  Viewer.prototype.getViewerOrigin = function getViewerOrigin() {
    return this.viewerOrigin_;
  };

  /**
   * @param {string} urlString
   * @return {boolean}
   * @private
   */

  Viewer.prototype.isTrustedViewerOrigin_ = function isTrustedViewerOrigin_(urlString) {
    var url = _url.parseUrl(urlString);
    if (url.protocol != 'https:') {
      // Non-https origins are never trusted.
      return false;
    }
    return TRUSTED_VIEWER_HOSTS.some(function (th) {
      return th.test(url.hostname);
    });
  };

  /**
   * Adds a "visibilitychange" event listener for viewer events. The
   * callback can check {@link isVisible} and {@link getPrefetchCount}
   * methods for more info.
   * @param {function()} handler
   * @return {!UnlistenDef}
   */

  Viewer.prototype.onVisibilityChanged = function onVisibilityChanged(handler) {
    return this.visibilityObservable_.add(handler);
  };

  /**
   * Adds a "viewport" event listener for viewer events.
   * @param {function({
   *   paddingTop: number,
   *   duration: (number|undefined),
   *   curve: (string|undefined)
   * })} handler
   * @return {!UnlistenDef}
   */

  Viewer.prototype.onViewportEvent = function onViewportEvent(handler) {
    return this.viewportObservable_.add(handler);
  };

  /**
   * Adds a "history popped" event listener for viewer events.
   * @param {function(ViewerHistoryPoppedEventDef)} handler
   * @return {!UnlistenDef}
   */

  Viewer.prototype.onHistoryPoppedEvent = function onHistoryPoppedEvent(handler) {
    return this.historyPoppedObservable_.add(handler);
  };

  /**
   * Triggers "documentLoaded" event for the viewer.
   */

  Viewer.prototype.postDocumentReady = function postDocumentReady() {
    this.sendMessageUnreliable_('documentLoaded', {
      title: this.win.document.title
    }, false);
  };

  /**
   * Triggers "scroll" event for the viewer.
   * @param {number} scrollTop
   */

  Viewer.prototype.postScroll = function postScroll(scrollTop) {
    this.sendMessageUnreliable_('scroll', { scrollTop: scrollTop }, false);
  };

  /**
   * Requests full overlay mode from the viewer. Returns a promise that yields
   * when the viewer has switched to full overlay mode.
   * @return {!Promise}
   */

  Viewer.prototype.requestFullOverlay = function requestFullOverlay() {
    return (/** @type {!Promise} */this.sendMessageUnreliable_('requestFullOverlay', {}, true)
    );
  };

  /**
   * Requests to cancel full overlay mode from the viewer. Returns a promise
   * that yields when the viewer has switched off full overlay mode.
   * @return {!Promise}
   */

  Viewer.prototype.cancelFullOverlay = function cancelFullOverlay() {
    return (/** @type {!Promise} */this.sendMessageUnreliable_('cancelFullOverlay', {}, true)
    );
  };

  /**
   * Triggers "pushHistory" event for the viewer.
   * @param {number} stackIndex
   * @return {!Promise}
   */

  Viewer.prototype.postPushHistory = function postPushHistory(stackIndex) {
    return (/** @type {!Promise} */this.sendMessageUnreliable_('pushHistory', { stackIndex: stackIndex }, true)
    );
  };

  /**
   * Triggers "popHistory" event for the viewer.
   * @param {number} stackIndex
   * @return {!Promise}
   */

  Viewer.prototype.postPopHistory = function postPopHistory(stackIndex) {
    return (/** @type {!Promise} */this.sendMessageUnreliable_('popHistory', { stackIndex: stackIndex }, true)
    );
  };

  /**
   * Get/set the Base CID from/to the viewer.
   * @param {string=} opt_data Stringified JSON object {cid, time}.
   * @return {!Promise<string|undefined>}
   */

  Viewer.prototype.baseCid = function baseCid(opt_data) {
    var _this2 = this;

    return this.isTrustedViewer().then(function (trusted) {
      if (!trusted) {
        return undefined;
      }
      var cidPromise = _this2.sendMessage('cid', opt_data, true).then(function (data) {
        // For backward compatibility: #4029
        if (data && !_json.tryParseJson(data)) {
          return JSON.stringify({
            time: Date.now(), // CID returned from old API is always fresh
            cid: data
          });
        }
        return data;
      });
      // Getting the CID may take some time (waits for JS file to
      // load, might hit GC), but we do not wait indefinitely. Typically
      // it should resolve in milli seconds.
      return _timer.timerFor(_this2.win).timeoutPromise(10000, cidPromise, 'base cid')['catch'](function (error) {
        _log.dev().error(TAG_, error);
        return undefined;
      });
    });
  };

  /**
   * Get the fragment from the url or the viewer.
   * Strip leading '#' in the fragment
   * @return {!Promise<string>}
   */

  Viewer.prototype.getFragment = function getFragment() {
    if (!this.isEmbedded_) {
      var hash = this.win.location.hash;
      /* Strip leading '#' */
      hash = hash.substr(1);
      return Promise.resolve(hash);
    }
    if (!this.hasCapability('fragment')) {
      return Promise.resolve('');
    }
    return this.sendMessageUnreliable_('fragment', undefined, true).then(function (hash) {
      return hash || '';
    });
  };

  /**
   * Triggers "tick" event for the viewer.
   * @param {!Object} message
   */

  Viewer.prototype.tick = function tick(message) {
    this.sendMessageUnreliable_('tick', message, false);
  };

  /**
   * Triggers "sendCsi" event for the viewer.
   */

  Viewer.prototype.flushTicks = function flushTicks() {
    this.sendMessageUnreliable_('sendCsi', undefined, false);
  };

  /**
   * Triggers "setFlushParams" event for the viewer.
   * @param {!Object} message
   */

  Viewer.prototype.setFlushParams = function setFlushParams(message) {
    this.sendMessageUnreliable_('setFlushParams', message, false);
  };

  /**
   * Triggers "prerenderComplete" event for the viewer.
   * @param {!Object} message
   */

  Viewer.prototype.prerenderComplete = function prerenderComplete(message) {
    this.sendMessageUnreliable_('prerenderComplete', message, false);
  };

  /**
   * Requests AMP document to receive a message from Viewer.
   * @param {string} eventType
   * @param {!JSONType} data
   * @param {boolean} unusedAwaitResponse
   * @return {(!Promise<*>|undefined)}
   * @export
   */

  Viewer.prototype.receiveMessage = function receiveMessage(eventType, data, unusedAwaitResponse) {
    if (eventType == 'viewport') {
      if (data['paddingTop'] !== undefined) {
        this.paddingTop_ = data['paddingTop'];
        this.viewportObservable_.fire({
          paddingTop: this.paddingTop_,
          duration: data['duration'],
          curve: data['curve']
        });
      }
      return undefined;
    }
    if (eventType == 'historyPopped') {
      this.historyPoppedObservable_.fire({
        newStackIndex: data['newStackIndex']
      });
      return Promise.resolve();
    }
    if (eventType == 'visibilitychange') {
      if (data['prerenderSize'] !== undefined) {
        this.prerenderSize_ = data['prerenderSize'];
        _log.dev().fine(TAG_, '- prerenderSize change:', this.prerenderSize_);
      }
      this.setVisibilityState_(data['state']);
      return Promise.resolve();
    }
    if (eventType == 'broadcast') {
      this.broadcastObservable_.fire(
      /** @type {!JSONType|undefined} */data);
      return Promise.resolve();
    }
    _log.dev().fine(TAG_, 'unknown message:', eventType);
    return undefined;
  };

  /**
   * Provides a message delivery mechanism by which AMP document can send
   * messages to the viewer.
   * @param {function(string, *, boolean):(!Promise<*>|undefined)} deliverer
   * @param {string} origin
   * @export
   */

  Viewer.prototype.setMessageDeliverer = function setMessageDeliverer(deliverer, origin) {
    var _this3 = this;

    if (this.messageDeliverer_) {
      throw new Error('message channel can only be initialized once');
    }
    if (!origin) {
      throw new Error('message channel must have an origin');
    }
    _log.dev().fine(TAG_, 'message channel established with origin: ', origin);
    this.messageDeliverer_ = deliverer;
    this.messagingOrigin_ = origin;
    if (this.messagingReadyResolver_) {
      this.messagingReadyResolver_();
    }
    if (this.trustedViewerResolver_) {
      this.trustedViewerResolver_(origin ? this.isTrustedViewerOrigin_(origin) : false);
    }
    if (this.viewerOriginResolver_) {
      this.viewerOriginResolver_(origin || '');
    }

    if (this.messageQueue_.length > 0) {
      var queue = this.messageQueue_.slice(0);
      this.messageQueue_ = [];
      queue.forEach(function (message) {
        _this3.messageDeliverer_(message.eventType, message.data, false);
      });
    }
  };

  /**
   * Sends the message to the viewer. This method will wait for the messaging
   * channel to be established. If the messaging channel times out, the
   * promise will fail.
   *
   * This is a restricted API.
   *
   * @param {string} eventType
   * @param {*} data
   * @param {boolean} awaitResponse
   * @return {!Promise<*>|undefined}
   */

  Viewer.prototype.sendMessage = function sendMessage(eventType, data, awaitResponse) {
    var _this4 = this;

    if (!this.messagingReadyPromise_) {
      return Promise.reject(getChannelError());
    }
    return this.messagingReadyPromise_.then(function () {
      return _this4.sendMessageUnreliable_(eventType, data, awaitResponse);
    });
  };

  /**
   * Broadcasts a message to all other AMP documents under the same viewer. It
   * will attempt to deliver messages when the messaging channel has been
   * established, but it will not fail if the channel is timed out.
   *
   * @param {!JSONType} message
   */

  Viewer.prototype.broadcast = function broadcast(message) {
    this.maybeSendMessage_('broadcast', message);
  };

  /**
   * Registers receiver for the broadcast events.
   * @param {function(!JSONType)} handler
   * @return {!UnlistenDef}
   */

  Viewer.prototype.onBroadcast = function onBroadcast(handler) {
    return this.broadcastObservable_.add(handler);
  };

  /**
   * This message queues up the message to be sent when communication channel
   * is established. If the communication channel is not established at
   * this time, this method responds immediately with a Promise that yields
   * `undefined` value.
   * @param {string} eventType
   * @param {*} data
   * @param {boolean} awaitResponse
   * @return {?Promise<*>|undefined}
   * @private
   */

  Viewer.prototype.sendMessageUnreliable_ = function sendMessageUnreliable_(eventType, data, awaitResponse) {
    if (this.messageDeliverer_) {
      return this.messageDeliverer_(eventType, data, awaitResponse);
    }

    // Store only a last version for an event type.
    var found = null;
    for (var i = 0; i < this.messageQueue_.length; i++) {
      if (this.messageQueue_[i].eventType == eventType) {
        found = this.messageQueue_[i];
        break;
      }
    }
    if (found) {
      found.data = data;
    } else {
      this.messageQueue_.push({ eventType: eventType, data: data });
    }
    if (awaitResponse) {
      // TODO(dvoytenko): This is somewhat questionable. What do we return
      // when no one is listening?
      return Promise.resolve();
    }
    return undefined;
  };

  /**
   * @param {string} eventType
   * @param {*} data
   * @private
   */

  Viewer.prototype.maybeSendMessage_ = function maybeSendMessage_(eventType, data) {
    var _this5 = this;

    if (!this.messagingMaybePromise_) {
      // Messaging is not expected.
      return;
    }
    this.messagingMaybePromise_.then(function () {
      if (_this5.messageDeliverer_) {
        _this5.sendMessageUnreliable_(eventType, data, false);
      }
    });
  };

  /**
   * Resolves when there is a messaging channel established with the viewer.
   * Will be null if no messaging is needed like in an non-embedded document.
   * @return {?Promise}
   */

  Viewer.prototype.whenMessagingReady = function whenMessagingReady() {
    return this.messagingMaybePromise_;
  };

  return Viewer;
})();

exports.Viewer = Viewer;
function parseParams_(str, allParams) {
  var params = _url.parseQueryString(str);
  for (var k in params) {
    allParams[k] = params[k];
  }
}

/**
 * Creates an error for the case where a channel cannot be established.
 * @param {*=} opt_reason
 * @return {!Error}
 */
function getChannelError(opt_reason) {
  if (opt_reason instanceof Error) {
    opt_reason.message = 'No messaging channel: ' + opt_reason.message;
    return opt_reason;
  }
  return new Error('No messaging channel: ' + opt_reason);
}

/**
 * @typedef {{
 *   newStackIndex: number
 * }}
 */
var ViewerHistoryPoppedEventDef = undefined;

exports.ViewerHistoryPoppedEventDef = ViewerHistoryPoppedEventDef;
/**
 * @param {!Window} window
 * @return {!Viewer}
 */

function installViewerService(window) {
  return _service.fromClass(window, 'viewer', Viewer);
}

;

},{"../config":15,"../document-state":21,"../error":26,"../json":37,"../log":41,"../mode":43,"../observable":44,"../platform":47,"../service":56,"../timer":86,"../url":90,"../visibility-state":98}],75:[function(require,module,exports){
exports.__esModule = true;
exports.parseViewportMeta = parseViewportMeta;
exports.stringifyViewportMeta = stringifyViewportMeta;
exports.updateViewportMetaString = updateViewportMetaString;
exports.installViewportService = installViewportService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _animation = require('../animation');

var _fixedLayer = require('./fixed-layer');

var _observable = require('../observable');

var _iosScrollfreezeBug = require('./ios-scrollfreeze-bug');

var _service = require('../service');

var _layoutRect = require('../layout-rect');

var _log = require('../log');

var _transition = require('../transition');

var _documentReady = require('../document-ready');

var _platform = require('../platform');

var _style = require('../style');

var _timer = require('../timer');

var _vsyncImpl = require('./vsync-impl');

var _viewerImpl = require('./viewer-impl');

var _experiments = require('../experiments');

var _dom = require('../dom');

var TAG_ = 'Viewport';

/**
 * @typedef {{
 *   relayoutAll: boolean,
 *   top: number,
 *   left: number,
 *   width: number,
 *   height: number,
 *   velocity: number
 * }}
 */
var ViewportChangedEventDef = undefined;

/**
 * This object represents the viewport. It tracks scroll position, resize
 * and other events and notifies interesting parties when viewport has changed
 * and how.
 * @package Visible for type.
 */

var Viewport = (function () {

  /**
   * @param {!Window} win
   * @param {!ViewportBindingDef} binding
   * @param {!./viewer-impl.Viewer} viewer
   */

  function Viewport(win, binding, viewer) {
    var _this = this;

    babelHelpers.classCallCheck(this, Viewport);

    /** @const {!Window} */
    this.win_ = win;

    /** @const {!ViewportBindingDef} */
    this.binding_ = binding;

    /** @const {!./viewer-impl.Viewer} */
    this.viewer_ = viewer;

    /**
     * Used to cache the rect of the viewport.
     * @private {?../layout-rect.LayoutRectDef}
     */
    this.rect_ = null;

    /**
     * Used to cache the size of the viewport. Also used as last known size,
     * so users should call getSize early on to get a value. The timing should
     * be chosen to avoid extra style recalcs.
     * @private {{width: number, height: number}|null}
     */
    this.size_ = null;

    /** @private {?number} */
    this. /*OK*/scrollTop_ = null;

    /** @private {?number} */
    this.lastMeasureScrollTop_ = null;

    /** @private {boolean} */
    this.scrollAnimationFrameThrottled_ = false;

    /** @private {?number} */
    this. /*OK*/scrollLeft_ = null;

    /** @private {number} */
    this.paddingTop_ = viewer.getPaddingTop();

    /** @private {number} */
    this.scrollMeasureTime_ = 0;

    /** @private {!./vsync-impl.Vsync} */
    this.vsync_ = _vsyncImpl.installVsyncService(win);

    /** @private {boolean} */
    this.scrollTracking_ = false;

    /** @private {number} */
    this.scrollCount_ = 0;

    /** @private @const {!Observable<!ViewportChangedEventDef>} */
    this.changeObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private {?Element|undefined} */
    this.viewportMeta_ = undefined;

    /** @private {string|undefined} */
    this.originalViewportMetaString_ = undefined;

    /** @private @const {!FixedLayer} */
    this.fixedLayer_ = new _fixedLayer.FixedLayer(this.win_.document, this.vsync_, this.paddingTop_, this.binding_.requiresFixedLayerTransfer());
    _documentReady.onDocumentReady(this.win_.document, function () {
      return _this.fixedLayer_.setup();
    });

    /** @private @const (function()) */
    this.boundThrottledScroll_ = this.throttledScroll_.bind(this);

    this.viewer_.onViewportEvent(this.updateOnViewportEvent_.bind(this));
    this.binding_.updateViewerViewport(this.viewer_);
    this.binding_.updatePaddingTop(this.paddingTop_);

    this.binding_.onScroll(this.scroll_.bind(this));
    this.binding_.onResize(this.resize_.bind(this));

    this.onScroll(this.sendScrollMessage_.bind(this));

    // TODO(dvoytenko, #4894): Cleanup the experiment by moving this to CSS:
    // `html {touch-action: pan-y}` (will require adding `amp-embedded` class).
    // The enables passive touch handlers, e.g. for document swipe, since they
    // no will longer need to try to cancel vertical scrolls during swipes.
    // This is only done in the embedded mode because (a) the document swipe
    // is only possible in this case, and (b) we'd like to preserve pinch-zoom.
    if (viewer.isEmbedded() && _experiments.isExperimentOn(this.win_, 'pan-y')) {
      _style.setStyle(this.win_.document.documentElement, 'touch-action', 'pan-y');
    }
  }

  /**
   * ViewportBindingDef is an interface that defines an underlying technology
   * behind the {@link Viewport}.
   * @interface
   * @visibleForTesting
   */

  /** For testing. */

  Viewport.prototype.cleanup_ = function cleanup_() {
    this.binding_.cleanup_();
  };

  /**
   * Returns the top padding mandated by the viewer.
   * @return {number}
   */

  Viewport.prototype.getPaddingTop = function getPaddingTop() {
    return this.paddingTop_;
  };

  /**
   * Returns the viewport's top position in the document. This is essentially
   * the scroll position.
   * @return {number}
   * @deprecated Use {@link getScrollTop}
   */

  Viewport.prototype.getTop = function getTop() {
    return this.getScrollTop();
  };

  /**
   * Returns the viewport's vertical scroll position.
   * @return {number}
   */

  Viewport.prototype.getScrollTop = function getScrollTop() {
    if (this. /*OK*/scrollTop_ == null) {
      this. /*OK*/scrollTop_ = this.binding_.getScrollTop();
    }
    return this. /*OK*/scrollTop_;
  };

  /**
   * Returns the viewport's horizontal scroll position.
   * @return {number}
   */

  Viewport.prototype.getScrollLeft = function getScrollLeft() {
    if (this. /*OK*/scrollLeft_ == null) {
      this. /*OK*/scrollLeft_ = this.binding_.getScrollLeft();
    }
    return this. /*OK*/scrollLeft_;
  };

  /**
   * Sets the desired scroll position on the viewport.
   * @param {number} scrollPos
   */

  Viewport.prototype.setScrollTop = function setScrollTop(scrollPos) {
    this. /*OK*/scrollTop_ = null;
    this.binding_.setScrollTop(scrollPos);
  };

  /**
   * Sets the body padding bottom to the specified value.
   * @param {number} paddingBottom
   */

  Viewport.prototype.updatePaddingBottom = function updatePaddingBottom(paddingBottom) {
    _documentReady.onDocumentReady(this.win_.document, function (doc) {
      doc.body.style.borderBottom = paddingBottom + 'px solid transparent';
    });
  };

  /**
   * Returns the size of the viewport.
   * @return {!{width: number, height: number}}
   */

  Viewport.prototype.getSize = function getSize() {
    if (this.size_) {
      return this.size_;
    }
    return this.size_ = this.binding_.getSize();
  };

  /**
   * Returns the height of the viewport.
   * @return {number}
   */

  Viewport.prototype.getHeight = function getHeight() {
    return this.getSize().height;
  };

  /**
   * Returns the width of the viewport.
   * @return {number}
   */

  Viewport.prototype.getWidth = function getWidth() {
    return this.getSize().width;
  };

  /**
   * Returns the scroll width of the content of the document. Note that this
   * method is not cached since we there's no indication when it might change.
   * @return {number}
   */

  Viewport.prototype.getScrollWidth = function getScrollWidth() {
    return this.binding_.getScrollWidth();
  };

  /**
   * Returns the scroll height of the content of the document. Note that this
   * method is not cached since we there's no indication when it might change.
   * @return {number}
   */

  Viewport.prototype.getScrollHeight = function getScrollHeight() {
    return this.binding_.getScrollHeight();
  };

  /**
   * Returns the rect of the viewport which includes scroll positions and size.
   * @return {!../layout-rect.LayoutRectDef}}
   */

  Viewport.prototype.getRect = function getRect() {
    if (this.rect_ == null) {
      var scrollTop = this.getScrollTop();
      var scrollLeft = this.getScrollLeft();
      var size = this.getSize();
      this.rect_ = _layoutRect.layoutRectLtwh(scrollLeft, scrollTop, size.width, size.height);
    }
    return this.rect_;
  };

  /**
   * Returns the rect of the element within the document.
   * @param {!Element} el
   * @return {!../layout-rect.LayoutRectDef}}
   */

  Viewport.prototype.getLayoutRect = function getLayoutRect(el) {
    var scrollLeft = this.getScrollLeft();
    var scrollTop = this.getScrollTop();

    // Go up the window hierarchy through friendly iframes.
    var frameElement = _service.getParentWindowFrameElement(el, this.win_);
    if (frameElement) {
      var b = this.binding_.getLayoutRect(el, 0, 0);
      var c = this.binding_.getLayoutRect(frameElement, scrollLeft, scrollTop);
      return _layoutRect.layoutRectLtwh(Math.round(b.left + c.left), Math.round(b.top + c.top), Math.round(b.width), Math.round(b.height));
    }

    return this.binding_.getLayoutRect(el, scrollLeft, scrollTop);
  };

  /**
   * Whether the element is declared as fixed in any of the user's stylesheets.
   * Will include any matches, not necessarily currently fixed elements.
   * @param {!Element} element
   * @return {boolean}
   */

  Viewport.prototype.isDeclaredFixed = function isDeclaredFixed(element) {
    return this.fixedLayer_.isDeclaredFixed(element);
  };

  /**
   * Scrolls element into view much like Element. scrollIntoView does but
   * in the AMP/Viewer environment.
   * @param {!Element} element
   */

  Viewport.prototype.scrollIntoView = function scrollIntoView(element) {
    var elementTop = this.binding_.getLayoutRect(element).top;
    var newScrollTop = Math.max(0, elementTop - this.paddingTop_);
    this.binding_.setScrollTop(newScrollTop);
  };

  /**
   * Scrolls element into view much like Element. scrollIntoView does but
   * in the AMP/Viewer environment. Adds animation for the sccrollIntoView
   * transition.
   *
   * @param {!Element} element
   * @param {number=} duration
   * @param {string=} curve
   * @return {!Promise}
   */

  Viewport.prototype.animateScrollIntoView = function animateScrollIntoView(element) {
    var _this2 = this;

    var duration = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
    var curve = arguments.length <= 2 || arguments[2] === undefined ? 'ease-in' : arguments[2];

    var elementTop = this.binding_.getLayoutRect(element).top;
    var newScrollTop = Math.max(0, elementTop - this.paddingTop_);
    var curScrollTop = this.getScrollTop();
    if (newScrollTop == curScrollTop) {
      return Promise.resolve();
    }
    var interpolate = _transition.numeric(curScrollTop, newScrollTop);
    // TODO(erwinm): the duration should not be a constant and should
    // be done in steps for better transition experience when things
    // are closer vs farther.
    // TODO(dvoytenko, #3742): documentElement will be replaced by ampdoc.
    return _animation.Animation.animate(this.win_.document.documentElement, function (pos) {
      _this2.binding_.setScrollTop(interpolate(pos));
    }, duration, curve).then();
  };

  /**
   * Registers the handler for ViewportChangedEventDef events.
   * @param {!function(!ViewportChangedEventDef)} handler
   * @return {!UnlistenDef}
   */

  Viewport.prototype.onChanged = function onChanged(handler) {
    return this.changeObservable_.add(handler);
  };

  /**
   * Registers the handler for scroll events. These events DO NOT contain
   * scrolling offset and it's discouraged to read scrolling offset in the
   * event handler. The primary use case for this handler is to inform that
   * scrolling might be going on. To get more information {@link onChanged}
   * handler should be used.
   * @param {!function()} handler
   * @return {!UnlistenDef}
   */

  Viewport.prototype.onScroll = function onScroll(handler) {
    return this.scrollObservable_.add(handler);
  };

  /**
   * Instruct the viewport to enter lightbox mode.
   */

  Viewport.prototype.enterLightboxMode = function enterLightboxMode() {
    var _this3 = this;

    this.viewer_.requestFullOverlay();
    this.disableTouchZoom();
    this.hideFixedLayer();
    this.vsync_.mutate(function () {
      return _this3.binding_.updateLightboxMode(true);
    });
  };

  /**
   * Instruct the viewport to enter lightbox mode.
   */

  Viewport.prototype.leaveLightboxMode = function leaveLightboxMode() {
    var _this4 = this;

    this.viewer_.cancelFullOverlay();
    this.showFixedLayer();
    this.restoreOriginalTouchZoom();
    this.vsync_.mutate(function () {
      return _this4.binding_.updateLightboxMode(false);
    });
  };

  /**
   * Resets touch zoom to initial scale of 1.
   */

  Viewport.prototype.resetTouchZoom = function resetTouchZoom() {
    var _this5 = this;

    var windowHeight = this.win_. /*OK*/innerHeight;
    var documentHeight = this.win_.document.documentElement. /*OK*/clientHeight;
    if (windowHeight && documentHeight && windowHeight === documentHeight) {
      // This code only works when scrollbar overlay content and take no space,
      // which is fine on mobile. For non-mobile devices this code is
      // irrelevant.
      return;
    }
    if (this.disableTouchZoom()) {
      _timer.timerFor(this.win_).delay(function () {
        _this5.restoreOriginalTouchZoom();
      }, 50);
    }
  };

  /**
   * Disables touch zoom on this viewport. Returns `true` if any actual
   * changes have been done.
   * @return {boolean}
   */

  Viewport.prototype.disableTouchZoom = function disableTouchZoom() {
    var viewportMeta = this.getViewportMeta_();
    if (!viewportMeta) {
      // This should never happen in a valid AMP document, thus shortcircuit.
      return false;
    }
    // Setting maximum-scale=1 and user-scalable=no zooms page back to normal
    // and prohibit further default zooming.
    var newValue = updateViewportMetaString(viewportMeta.content, {
      'maximum-scale': '1',
      'user-scalable': 'no'
    });
    return this.setViewportMetaString_(newValue);
  };

  /**
   * Restores original touch zoom parameters. Returns `true` if any actual
   * changes have been done.
   * @return {boolean}
   */

  Viewport.prototype.restoreOriginalTouchZoom = function restoreOriginalTouchZoom() {
    if (this.originalViewportMetaString_ !== undefined) {
      return this.setViewportMetaString_(this.originalViewportMetaString_);
    }
    return false;
  };

  /**
   * Returns whether the user has scrolled yet.
   * @return {boolean}
   */

  Viewport.prototype.hasScrolled = function hasScrolled() {
    return this.scrollCount_ > 0;
  };

  /**
   * Hides the fixed layer.
   */

  Viewport.prototype.hideFixedLayer = function hideFixedLayer() {
    this.fixedLayer_.setVisible(false);
  };

  /**
   * Shows the fixed layer.
   */

  Viewport.prototype.showFixedLayer = function showFixedLayer() {
    this.fixedLayer_.setVisible(true);
  };

  /**
   * Updates the fixed layer.
   */

  Viewport.prototype.updatedFixedLayer = function updatedFixedLayer() {
    this.fixedLayer_.update();
  };

  /**
   * Adds the element to the fixed layer.
   * @param {!Element} element
   */

  Viewport.prototype.addToFixedLayer = function addToFixedLayer(element) {
    this.fixedLayer_.addElement(element);
  };

  /**
   * Removes the element from the fixed layer.
   * @param {!Element} element
   */

  Viewport.prototype.removeFromFixedLayer = function removeFromFixedLayer(element) {
    this.fixedLayer_.removeElement(element);
  };

  /**
   * Updates touch zoom meta data. Returns `true` if any actual
   * changes have been done.
   * @return {boolean}
   */

  Viewport.prototype.setViewportMetaString_ = function setViewportMetaString_(viewportMetaString) {
    var viewportMeta = this.getViewportMeta_();
    if (viewportMeta && viewportMeta.content != viewportMetaString) {
      _log.dev().fine(TAG_, 'changed viewport meta to:', viewportMetaString);
      viewportMeta.content = viewportMetaString;
      return true;
    }
    return false;
  };

  /**
   * @return {?Element}
   * @private
   */

  Viewport.prototype.getViewportMeta_ = function getViewportMeta_() {
    if (this.viewer_.isIframed()) {
      // An embedded document does not control its viewport meta tag.
      return null;
    }
    if (this.viewportMeta_ === undefined) {
      this.viewportMeta_ = /** @type {?HTMLMetaElement} */this.win_.document.querySelector('meta[name=viewport]');
      if (this.viewportMeta_) {
        this.originalViewportMetaString_ = this.viewportMeta_.content;
      }
    }
    return this.viewportMeta_;
  };

  /**
   * @param {{paddingTop: number, duration: (number|undefined), curve: (string|undefined)}} event
   * @private
   */

  Viewport.prototype.updateOnViewportEvent_ = function updateOnViewportEvent_(event) {
    var _this6 = this;

    this.binding_.updateViewerViewport(this.viewer_);
    var paddingTop = event.paddingTop;
    if (paddingTop != this.paddingTop_) {
      var lastPaddingTop = this.paddingTop_;
      this.paddingTop_ = paddingTop;
      this.binding_.updatePaddingTop(this.paddingTop_, /* adjustScroll */true, lastPaddingTop);
      this.fixedLayer_.updatePaddingTop(this.paddingTop_);

      if (event.duration > 0) {
        (function () {
          // Add transit effect on position fixed element
          var tr = _transition.numeric(lastPaddingTop - _this6.paddingTop_, 0);
          _animation.Animation.animate(_this6.win_.document.documentElement, function (time) {
            var p = tr(time);
            _this6.fixedLayer_.transformMutate('translateY(' + p + 'px)');
          }, event.duration, event.curve).thenAlways(function () {
            _this6.fixedLayer_.transformMutate(null);
          });
        })();
      }
    }
  };

  /**
   * @param {boolean} relayoutAll
   * @param {number} velocity
   * @private
   */

  Viewport.prototype.changed_ = function changed_(relayoutAll, velocity) {
    var size = this.getSize();
    var scrollTop = this.getScrollTop();
    var scrollLeft = this.getScrollLeft();
    _log.dev().fine(TAG_, 'changed event:', 'relayoutAll=', relayoutAll, 'top=', scrollTop, 'left=', scrollLeft, 'bottom=', scrollTop + size.height, 'velocity=', velocity);
    this.changeObservable_.fire({
      relayoutAll: relayoutAll,
      top: scrollTop,
      left: scrollLeft,
      width: size.width,
      height: size.height,
      velocity: velocity
    });
  };

  /** @private */

  Viewport.prototype.scroll_ = function scroll_() {
    var _this7 = this;

    this.rect_ = null;
    this.scrollCount_++;
    this.scrollLeft_ = this.binding_.getScrollLeft();
    var newScrollTop = this.binding_.getScrollTop();
    if (newScrollTop < 0) {
      // iOS and some other browsers use negative values of scrollTop for
      // overscroll. Overscroll does not affect the viewport and thus should
      // be ignored here.
      return;
    }
    this.scrollTop_ = newScrollTop;
    if (!this.scrollTracking_) {
      (function () {
        _this7.scrollTracking_ = true;
        var now = Date.now();
        // Wait 2 frames and then request an animation frame.
        _timer.timerFor(_this7.win_).delay(function () {
          _this7.vsync_.measure(function () {
            _this7.throttledScroll_(now, newScrollTop);
          });
        }, 36);
      })();
    }
    this.scrollObservable_.fire();
  };

  /**
   * This method is called about every 3 frames (assuming 60hz) and it
   * is called in a vsync measure task.
   * @param {number} referenceTime Time when the scroll measurement, that
   *     triggered this call made, was made.
   * @param {number} referenceTop Scrolltop at that time.
   * @private
   */

  Viewport.prototype.throttledScroll_ = function throttledScroll_(referenceTime, referenceTop) {
    var _this8 = this;

    var newScrollTop = this.scrollTop_ = this.binding_.getScrollTop();
    var now = Date.now();
    var velocity = 0;
    if (now != referenceTime) {
      velocity = (newScrollTop - referenceTop) / (now - referenceTime);
    }
    _log.dev().fine(TAG_, 'scroll: ' + 'scrollTop=' + newScrollTop + '; ' + 'velocity=' + velocity);
    if (Math.abs(velocity) < 0.03) {
      this.changed_( /* relayoutAll */false, velocity);
      this.scrollTracking_ = false;
    } else {
      _timer.timerFor(this.win_).delay(function () {
        return _this8.vsync_.measure(_this8.throttledScroll_.bind(_this8, now, newScrollTop));
      }, 20);
    }
  };

  /**
   * Send scroll message via the viewer per animation frame
   * @private
   */

  Viewport.prototype.sendScrollMessage_ = function sendScrollMessage_() {
    var _this9 = this;

    if (!this.scrollAnimationFrameThrottled_) {
      this.scrollAnimationFrameThrottled_ = true;
      this.vsync_.measure(function () {
        _this9.scrollAnimationFrameThrottled_ = false;
        _this9.viewer_.postScroll(_this9.getScrollTop());
      });
    }
  };

  /** @private */

  Viewport.prototype.resize_ = function resize_() {
    var _this10 = this;

    this.rect_ = null;
    var oldSize = this.size_;
    this.size_ = null; // Need to recalc.
    var newSize = this.getSize();
    this.fixedLayer_.update().then(function () {
      _this10.changed_(!oldSize || oldSize.width != newSize.width, 0);
    });
  };

  return Viewport;
})();

exports.Viewport = Viewport;

var ViewportBindingDef = (function () {
  function ViewportBindingDef() {
    babelHelpers.classCallCheck(this, ViewportBindingDef);
  }

  /**
   * Implementation of ViewportBindingDef based on the native window. It assumes that
   * the native window is sized properly and events represent the actual
   * scroll/resize events. This mode is applicable to a standalone document
   * display or when an iframe has a fixed size.
   *
   * Visible for testing.
   *
   * @implements {ViewportBindingDef}
   */

  /**
   * Whether the binding requires fixed elements to be transfered to a
   * independent fixed layer.
   * @return {boolean}
   */

  ViewportBindingDef.prototype.requiresFixedLayerTransfer = function requiresFixedLayerTransfer() {};

  /**
   * Register a callback for scroll events.
   * @param {function()} unusedCallback
   */

  ViewportBindingDef.prototype.onScroll = function onScroll(unusedCallback) {};

  /**
   * Register a callback for resize events.
   * @param {function()} unusedCallback
   */

  ViewportBindingDef.prototype.onResize = function onResize(unusedCallback) {};

  /**
   * Updates binding with the new viewer's viewport info.
   * @param {!./viewer-impl.Viewer} unusedViewer
   */

  ViewportBindingDef.prototype.updateViewerViewport = function updateViewerViewport(unusedViewer) {};

  /**
   * Updates binding with the new padding.
   * @param {number} unusedPaddingTop
   * @param {(boolean|undefined)=} unusedOptUpdateScrollPos
   * @param {(number|undefined)=} unusedOptLastPaddingTop
   */

  ViewportBindingDef.prototype.updatePaddingTop = function updatePaddingTop(unusedPaddingTop, unusedOptUpdateScrollPos, unusedOptLastPaddingTop) {};

  /**
   * Updates the viewport whether it's currently in the lightbox or a normal
   * mode.
   * @param {boolean} unusedLightboxMode
   */

  ViewportBindingDef.prototype.updateLightboxMode = function updateLightboxMode(unusedLightboxMode) {};

  /**
   * Returns the size of the viewport.
   * @return {!{width: number, height: number}}
   */

  ViewportBindingDef.prototype.getSize = function getSize() {};

  /**
   * Returns the top scroll position for the viewport.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollTop = function getScrollTop() {};

  /**
   * Sets scroll top position to the specified value or the nearest possible.
   * @param {number} unusedScrollTop
   */

  ViewportBindingDef.prototype.setScrollTop = function setScrollTop(unusedScrollTop) {};

  /**
   * Returns the left scroll position for the viewport.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollLeft = function getScrollLeft() {};

  /**
   * Returns the scroll width of the content of the document.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollWidth = function getScrollWidth() {};

  /**
   * Returns the scroll height of the content of the document.
   * @return {number}
   */

  ViewportBindingDef.prototype.getScrollHeight = function getScrollHeight() {};

  /**
   * Returns the rect of the element within the document.
   * @param {!Element} unusedEl
   * @param {number=} unusedScrollLeft Optional arguments that the caller may
   *     pass in, if they cached these values and would like to avoid
   *     remeasure. Requires appropriate updating the values on scroll.
   * @param {number=} unusedScrollTop Same comment as above.
   * @return {!../layout-rect.LayoutRectDef}
   */

  ViewportBindingDef.prototype.getLayoutRect = function getLayoutRect(unusedEl, unusedScrollLeft, unusedScrollTop) {};

  /** For testing. */

  ViewportBindingDef.prototype.cleanup_ = function cleanup_() {};

  return ViewportBindingDef;
})();

exports.ViewportBindingDef = ViewportBindingDef;

var ViewportBindingNatural_ = (function () {

  /**
   * @param {!Window} win
   */

  function ViewportBindingNatural_(win, viewer) {
    var _this11 = this;

    babelHelpers.classCallCheck(this, ViewportBindingNatural_);

    /** @const {!Window} */
    this.win = win;

    /** @const {!../service/platform-impl.Platform} */
    this.platform_ = _platform.platformFor(win);

    /** @private @const {!./viewer-impl.Viewer} */
    this.viewer_ = viewer;

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.resizeObservable_ = new _observable.Observable();

    this.win.addEventListener('scroll', function () {
      return _this11.scrollObservable_.fire();
    });
    this.win.addEventListener('resize', function () {
      return _this11.resizeObservable_.fire();
    });

    // Override a user-supplied `body{overflow}` to be always visible. This
    // style is set in runtime vs css to avoid conflicts with ios-embedded
    // mode and fixed transfer layer.
    if (this.win.document.defaultView) {
      _dom.waitForBody(this.win.document, function () {
        _this11.win.document.body.style.overflow = 'visible';
        if (_this11.platform_.isIos() && _this11.viewer_.getParam('webview') === '1') {
          _style.setStyles(_this11.win.document.body, {
            overflowX: 'hidden',
            overflowY: 'visible'
          });
        }
      });
    }

    _log.dev().fine(TAG_, 'initialized natural viewport');
  }

  /**
   * Implementation of ViewportBindingDef based on the native window in case when
   * the AMP document is embedded in a IFrame on iOS. It assumes that the native
   * window is sized properly and events represent the actual resize events.
   * The main difference from natural binding is that in this case, the document
   * itself is not scrollable, but instead only "body" is scrollable.
   *
   * Visible for testing.
   *
   * @implements {ViewportBindingDef}
   */

  /** @override */

  ViewportBindingNatural_.prototype.cleanup_ = function cleanup_() {}
  // TODO(dvoytenko): remove listeners

  /** @override */
  ;

  ViewportBindingNatural_.prototype.requiresFixedLayerTransfer = function requiresFixedLayerTransfer() {
    return false;
  };

  /** @override */

  ViewportBindingNatural_.prototype.onScroll = function onScroll(callback) {
    this.scrollObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNatural_.prototype.onResize = function onResize(callback) {
    this.resizeObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNatural_.prototype.updateViewerViewport = function updateViewerViewport(unusedViewer) {}
  // Viewer's viewport is ignored since this window is fully accurate.

  /** @override */
  ;

  ViewportBindingNatural_.prototype.updatePaddingTop = function updatePaddingTop(paddingTop, opt_updateScrollPos, opt_lastPaddingTop) {
    this.win.document.documentElement.style.paddingTop = _style.px(paddingTop);
    if (opt_updateScrollPos) {
      var oldScrollTop = this.getScrollTop();
      this.setScrollTop(oldScrollTop + paddingTop - opt_lastPaddingTop);
    }
  };

  /** @override */

  ViewportBindingNatural_.prototype.updateLightboxMode = function updateLightboxMode(unusedLightboxMode) {}
  // The layout is always accurate.

  /** @override */
  ;

  ViewportBindingNatural_.prototype.getSize = function getSize() {
    // Prefer window innerWidth/innerHeight but fall back to
    // documentElement clientWidth/clientHeight.
    // documentElement./*OK*/clientHeight is buggy on iOS Safari
    // and thus cannot be used.
    var winWidth = this.win. /*OK*/innerWidth;
    var winHeight = this.win. /*OK*/innerHeight;
    if (winWidth && winHeight) {
      return { width: winWidth, height: winHeight };
    }
    var el = this.win.document.documentElement;
    return { width: el. /*OK*/clientWidth, height: el. /*OK*/clientHeight };
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollTop = function getScrollTop() {
    return this.getScrollingElement_(). /*OK*/scrollTop || this.win. /*OK*/pageYOffset;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollLeft = function getScrollLeft() {
    return this.getScrollingElement_(). /*OK*/scrollLeft || this.win. /*OK*/pageXOffset;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollWidth = function getScrollWidth() {
    return this.getScrollingElement_(). /*OK*/scrollWidth;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getScrollHeight = function getScrollHeight() {
    return this.getScrollingElement_(). /*OK*/scrollHeight;
  };

  /** @override */

  ViewportBindingNatural_.prototype.getLayoutRect = function getLayoutRect(el, opt_scrollLeft, opt_scrollTop) {
    var scrollTop = opt_scrollTop != undefined ? opt_scrollTop : this.getScrollTop();
    var scrollLeft = opt_scrollLeft != undefined ? opt_scrollLeft : this.getScrollLeft();
    var b = el. /*OK*/getBoundingClientRect();
    return _layoutRect.layoutRectLtwh(Math.round(b.left + scrollLeft), Math.round(b.top + scrollTop), Math.round(b.width), Math.round(b.height));
  };

  /** @override */

  ViewportBindingNatural_.prototype.setScrollTop = function setScrollTop(scrollTop) {
    this.getScrollingElement_(). /*OK*/scrollTop = scrollTop;
  };

  /**
   * @return {!Element}
   * @private
   */

  ViewportBindingNatural_.prototype.getScrollingElement_ = function getScrollingElement_() {
    var doc = this.win.document;
    if (doc. /*OK*/scrollingElement) {
      return doc. /*OK*/scrollingElement;
    }
    if (doc.body
    // Due to https://bugs.webkit.org/show_bug.cgi?id=106133, WebKit
    // browsers have to use `body` and NOT `documentElement` for
    // scrolling purposes. This has mostly being resolved via
    // `scrollingElement` property, but this branch is still necessary
    // for backward compatibility purposes.
     && this.platform_.isWebKit()) {
      return doc.body;
    }
    return doc.documentElement;
  };

  return ViewportBindingNatural_;
})();

exports.ViewportBindingNatural_ = ViewportBindingNatural_;

var ViewportBindingNaturalIosEmbed_ = (function () {
  /**
   * @param {!Window} win
   */

  function ViewportBindingNaturalIosEmbed_(win) {
    var _this12 = this;

    babelHelpers.classCallCheck(this, ViewportBindingNaturalIosEmbed_);

    /** @const {!Window} */
    this.win = win;

    /** @private {?Element} */
    this.scrollPosEl_ = null;

    /** @private {?Element} */
    this.scrollMoveEl_ = null;

    /** @private {?Element} */
    this.endPosEl_ = null;

    /** @private {!{x: number, y: number}} */
    this.pos_ = { x: 0, y: 0 };

    /** @private @const {!Observable} */
    this.scrollObservable_ = new _observable.Observable();

    /** @private @const {!Observable} */
    this.resizeObservable_ = new _observable.Observable();

    /** @private {number} */
    this.paddingTop_ = 0;

    // Microtask is necessary here to let Safari to recalculate scrollWidth
    // post DocumentReady signal.
    _documentReady.whenDocumentReady(this.win.document).then(function () {
      return _this12.setup_();
    });
    this.win.addEventListener('resize', function () {
      return _this12.resizeObservable_.fire();
    });

    _log.dev().fine(TAG_, 'initialized natural viewport for iOS embeds');
  }

  /**
   * Parses viewport meta value. It usually looks like:
   * ```
   * width=device-width,initial-scale=1,minimum-scale=1
   * ```
   * @param {string} content
   * @return {!Object<string, (string|undefined)>}
   * @private Visible for testing only.
   */

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.requiresFixedLayerTransfer = function requiresFixedLayerTransfer() {
    return true;
  };

  /** @private */

  ViewportBindingNaturalIosEmbed_.prototype.setup_ = function setup_() {
    var documentElement = this.win.document.documentElement;
    var documentBody = /** @type {!Element} */this.win.document.body;

    // Embedded scrolling on iOS is rather complicated. IFrames cannot be sized
    // and be scrollable. Sizing iframe by scrolling height has a big negative
    // that "fixed" position is essentially impossible. The only option we
    // found is to reset scrolling on the AMP doc, which overrides natural BODY
    // scrolling with overflow:auto. We need the following styling:
    // html {
    //   overflow: auto;
    //   -webkit-overflow-scrolling: touch;
    // }
    // body {
    //   position: absolute;
    //   overflow: auto;
    //   -webkit-overflow-scrolling: touch;
    // }
    _style.setStyles(documentElement, {
      overflowY: 'auto',
      webkitOverflowScrolling: 'touch'
    });
    _style.setStyles(documentBody, {
      overflowX: 'hidden',
      overflowY: 'auto',
      webkitOverflowScrolling: 'touch',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    });

    // Insert scrollPos element into DOM. See {@link onScrolled_} for why
    // this is needed.
    this.scrollPosEl_ = this.win.document.createElement('div');
    this.scrollPosEl_.id = '-amp-scrollpos';
    _style.setStyles(this.scrollPosEl_, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      visibility: 'hidden'
    });
    documentBody.appendChild(this.scrollPosEl_);

    // Insert scrollMove element into DOM. See {@link adjustScrollPos_} for why
    // this is needed.
    this.scrollMoveEl_ = this.win.document.createElement('div');
    this.scrollMoveEl_.id = '-amp-scrollmove';
    _style.setStyles(this.scrollMoveEl_, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      visibility: 'hidden'
    });
    documentBody.appendChild(this.scrollMoveEl_);

    // Insert endPos element into DOM. See {@link getScrollHeight} for why
    // this is needed.
    this.endPosEl_ = this.win.document.createElement('div');
    this.endPosEl_.id = '-amp-endpos';
    _style.setStyles(this.endPosEl_, {
      width: 0,
      height: 0,
      visibility: 'hidden'
    });
    // TODO(dvoytenko): not only it should be at the bottom at setup time,
    // but it must always be at the bottom. Consider using BODY "childList"
    // mutations to track this. For now, however, this is ok since we don't
    // allow arbitrary content inserted into BODY.
    documentBody.appendChild(this.endPosEl_);

    documentBody.addEventListener('scroll', this.onScrolled_.bind(this));

    // Correct iOS Safari scroll freezing issues if applicable.
    _iosScrollfreezeBug.checkAndFix(this.win);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.updateViewerViewport = function updateViewerViewport(unusedViewer) {}
  // Viewer's viewport is ignored since this window is fully accurate.

  /** @override */
  ;

  ViewportBindingNaturalIosEmbed_.prototype.updatePaddingTop = function updatePaddingTop(paddingTop, opt_updateScrollPos, opt_lastPaddingTop) {
    var _this13 = this;

    _documentReady.onDocumentReady(this.win.document, function (doc) {
      _this13.paddingTop_ = paddingTop;
      // Also tried `paddingTop` but it didn't work for `position:absolute`
      // on iOS.
      doc.body.style.borderTop = paddingTop + 'px solid transparent';
      if (opt_updateScrollPos) {
        // TODO(yuxichen): This is a partially working formula for calculating
        // adjusted scroll top. Add two more paddingTop to compensate the
        // paddingTop being removed by the setScrollTop function and the removal
        // of border top. This formula only works when either paddingTop or
        // lastPaddingTop is 0.
        var adjScrollTop = _this13.getScrollTop() + 3 * paddingTop - opt_lastPaddingTop;
        _this13.setScrollTop(adjScrollTop);
      }
    });
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.updateLightboxMode = function updateLightboxMode(lightboxMode) {
    // This code will no longer be needed with the newer iOS viewport
    // implementation.
    _documentReady.onDocumentReady(this.win.document, function (doc) {
      doc.body.style.borderStyle = lightboxMode ? 'none' : 'solid';
    });
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.cleanup_ = function cleanup_() {}
  // TODO(dvoytenko): remove listeners

  /** @override */
  ;

  ViewportBindingNaturalIosEmbed_.prototype.onScroll = function onScroll(callback) {
    this.scrollObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.onResize = function onResize(callback) {
    this.resizeObservable_.add(callback);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getSize = function getSize() {
    return {
      width: this.win. /*OK*/innerWidth,
      height: this.win. /*OK*/innerHeight
    };
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollTop = function getScrollTop() {
    return Math.round(this.pos_.y);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollLeft = function getScrollLeft() {
    return Math.round(this.pos_.x);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollWidth = function getScrollWidth() {
    // There's no good way to calculate scroll width on iOS in this mode.
    return this.win. /*OK*/innerWidth;
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getScrollHeight = function getScrollHeight() {
    // We have to use a special "tail" element on iOS due to the issues outlined
    // in the {@link onScrolled_} method. Because we are forced to layout BODY
    // with position:absolute, we can no longer use BODY's scrollHeight to
    // determine scrolling height - it will always return the viewport height.
    // Instead, we append the "tail" element as the last child of BODY and use
    // it's viewport-relative position to calculate scrolling height.
    if (!this.endPosEl_) {
      return 0;
    }
    return Math.round(this.endPosEl_. /*OK*/getBoundingClientRect().top - this.scrollPosEl_. /*OK*/getBoundingClientRect().top);
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.getLayoutRect = function getLayoutRect(el) {
    var b = el. /*OK*/getBoundingClientRect();
    return _layoutRect.layoutRectLtwh(Math.round(b.left + this.pos_.x), Math.round(b.top + this.pos_.y), Math.round(b.width), Math.round(b.height));
  };

  /** @override */

  ViewportBindingNaturalIosEmbed_.prototype.setScrollTop = function setScrollTop(scrollTop) {
    this.setScrollPos_(scrollTop || 1);
  };

  /**
   * @param {!Event} event
   * @private
   */

  ViewportBindingNaturalIosEmbed_.prototype.onScrolled_ = function onScrolled_(event) {
    // We have to use a special "positioning" element on iOS due to the
    // following bugs:
    // - https://code.google.com/p/chromium/issues/detail?id=2891
    // - https://code.google.com/p/chromium/issues/detail?id=157855
    // - https://bugs.webkit.org/show_bug.cgi?id=106133
    // - https://bugs.webkit.org/show_bug.cgi?id=149264
    // This is an iOS-specific issue in the context of AMP, but Chrome bugs
    // are listed for reference. In a nutshell, this is because WebKit (and
    // Chrome as well) redirect body's scrollTop to documentElement instead of
    // body. Since in this case we are actually using direct body scrolling,
    // body's scrollTop would always return wrong values.
    // This will all change with a complete migration when
    // document./*OK*/scrollingElement will point to document.documentElement.
    // This already works correctly in Chrome with "scroll-top-left-interop"
    // flag turned on "chrome://flags/#scroll-top-left-interop".
    if (!this.scrollPosEl_) {
      return;
    }
    this.adjustScrollPos_(event);
    var rect = this.scrollPosEl_. /*OK*/getBoundingClientRect();
    if (this.pos_.x != -rect.left || this.pos_.y != -rect.top) {
      this.pos_.x = -rect.left;
      this.pos_.y = -rect.top + this.paddingTop_;
      this.scrollObservable_.fire();
    }
  };

  /** @private */

  ViewportBindingNaturalIosEmbed_.prototype.setScrollPos_ = function setScrollPos_(scrollPos) {
    if (!this.scrollMoveEl_) {
      return;
    }
    _style.setStyle(this.scrollMoveEl_, 'transform', 'translateY(' + (scrollPos - this.paddingTop_) + 'px)');
    this.scrollMoveEl_. /*OK*/scrollIntoView(true);
  };

  /**
   * @param {!Event=} opt_event
   * @private
   */

  ViewportBindingNaturalIosEmbed_.prototype.adjustScrollPos_ = function adjustScrollPos_(opt_event) {
    if (!this.scrollPosEl_ || !this.scrollMoveEl_) {
      return;
    }

    // Scroll document into a safe position to avoid scroll freeze on iOS.
    // This means avoiding scrollTop to be minimum (0) or maximum value.
    // This is very sad but very necessary. See #330 for more details.
    var scrollTop = -this.scrollPosEl_. /*OK*/getBoundingClientRect().top + this.paddingTop_;
    if (scrollTop == 0) {
      this.setScrollPos_(1);
      if (opt_event) {
        opt_event.preventDefault();
      }
      return;
    }

    // TODO(dvoytenko, #330): Ideally we would do the same for the overscroll
    // on the bottom. Unfortunately, iOS Safari misreports scrollHeight in
    // this case.
  };

  return ViewportBindingNaturalIosEmbed_;
})();

exports.ViewportBindingNaturalIosEmbed_ = ViewportBindingNaturalIosEmbed_;

function parseViewportMeta(content) {
  // Ex: width=device-width,initial-scale=1,minimal-ui
  var params = Object.create(null);
  if (!content) {
    return params;
  }
  var pairs = content.split(/,|;/);
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var split = pair.split('=');
    var _name = split[0].trim();
    var value = split[1];
    value = (value || '').trim();
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Stringifies viewport meta value based on the provided map. It usually looks
 * like:
 * ```
 * width=device-width,initial-scale=1,minimum-scale=1
 * ```
 * @param {!Object<string, string>} params
 * @return {string}
 * @private Visible for testing only.
 */

function stringifyViewportMeta(params) {
  // Ex: width=device-width,initial-scale=1,minimal-ui
  var content = '';
  for (var k in params) {
    if (content.length > 0) {
      content += ',';
    }
    if (params[k]) {
      content += k + '=' + params[k];
    } else {
      content += k;
    }
  }
  return content;
}

/**
 * This method makes a minimal effort to keep the original viewport string
 * unchanged if in fact none of the values have been updated. Returns the
 * updated string or the `currentValue` if no changes were necessary.
 *
 * @param {string} currentValue
 * @param {!Object<string, string|undefined>} updateParams
 * @return {string}
 * @private Visible for testing only.
 */

function updateViewportMetaString(currentValue, updateParams) {
  var params = parseViewportMeta(currentValue);
  var changed = false;
  for (var k in updateParams) {
    if (params[k] !== updateParams[k]) {
      changed = true;
      if (updateParams[k] !== undefined) {
        params[k] = /** @type {string} */updateParams[k];
      } else {
        delete params[k];
      }
    }
  }
  if (!changed) {
    return currentValue;
  }
  return stringifyViewportMeta(params);
}

/**
 * @param {!Window} window
 * @return {!Viewport}
 * @private
 */
function createViewport_(window) {
  var viewer = _viewerImpl.installViewerService(window);
  var binding = undefined;
  if (viewer.getViewportType() == 'natural-ios-embed') {
    binding = new ViewportBindingNaturalIosEmbed_(window);
  } else {
    binding = new ViewportBindingNatural_(window, viewer);
  }
  return new Viewport(window, binding, viewer);
}

/**
 * @param {!Window} window
 * @return {!Viewport}
 */

function installViewportService(window) {
  return (/** @type !Viewport} */_service.getService(window, 'viewport', function () {
      return createViewport_(window);
    })
  );
}

;

},{"../animation":12,"../document-ready":20,"../dom":23,"../experiments":28,"../layout-rect":38,"../log":41,"../observable":44,"../platform":47,"../service":56,"../style":84,"../timer":86,"../transition":87,"./fixed-layer":60,"./ios-scrollfreeze-bug":63,"./viewer-impl":74,"./vsync-impl":76}],76:[function(require,module,exports){
exports.__esModule = true;
exports.installVsyncService = installVsyncService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _pass = require('../pass');

var _error = require('../error');

var _service = require('../service');

var _log = require('../log');

var _viewerImpl = require('./viewer-impl');

var _timerImpl = require('./timer-impl');

/** @const {time} */
var FRAME_TIME = 16;

/**
 * @typedef {Object<string, *>}
 */
var VsyncStateDef = undefined;

/**
 * @typedef {{
 *   measure: (function(!VsyncStateDef)|undefined),
 *   mutate: (function(!VsyncStateDef)|undefined)
 * }}
 */
var VsyncTaskSpecDef = undefined;

/**
 * Abstraction over requestAnimationFrame that align DOM read (measure)
 * and write (mutate) tasks in a single frame.
 *
 * NOTE: If the document is invisible due to prerendering (this includes
 * application level prerendering where the doc is rendered in a hidden
 * iframe or webview), then no frame will be scheduled.
 * @package Visible for type.
 */

var Vsync = (function () {

  /**
   * @param {!Window} win
   * @param {!./viewer-impl.Viewer} viewer
   */

  function Vsync(win, viewer) {
    var _this = this;

    babelHelpers.classCallCheck(this, Vsync);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!./viewer-impl.Viewer} */
    this.viewer_ = viewer;

    /** @private @const {function(function())}  */
    this.raf_ = this.getRaf_();

    /**
     * Tasks to run in the next frame.
     * @private {!Array<!VsyncTaskSpecDef>}
     */
    this.tasks_ = [];

    /**
     * Double buffer for tasks.
     * @private {!Array<!VsyncTaskSpecDef>}
     */
    this.nextTasks_ = [];

    /**
     * States for tasks in the next frame in the same order.
     * @private {!Array<!VsyncStateDef>}
     */
    this.states_ = [];

    /**
     * Double buffer for states.
     * @private {!Array<!VsyncStateDef>}
     */
    this.nextStates_ = [];

    /**
     * Whether a new animation frame has been scheduled.
     * @private {boolean}
     */
    this.scheduled_ = false;

    /**
     * @private {?Promise}
     */
    this.nextFramePromise_ = null;

    /**
     * @private {?function()}
     */
    this.nextFrameResolver_ = null;

    /** @const {!Function} */
    this.boundRunScheduledTasks_ = this.runScheduledTasks_.bind(this);

    /** @const {!Pass} */
    this.pass_ = new _pass.Pass(this.win, this.boundRunScheduledTasks_, FRAME_TIME);

    // When the document changes visibility, vsync has to reschedule the queue
    // processing.
    this.viewer_.onVisibilityChanged(function () {
      if (_this.scheduled_) {
        _this.forceSchedule_();
      }
    });
  }

  /**
   * @param {!Window} window
   * @return {!Vsync}
   */

  /**
   * Runs vsync task: measure followed by mutate.
   *
   * If state is not provided, the value passed to the measure and mutate
   * will be undefined.
   *
   * @param {!VsyncTaskSpecDef} task
   * @param {!VsyncStateDef=} opt_state
   */

  Vsync.prototype.run = function run(task, opt_state) {
    this.tasks_.push(task);
    this.states_.push(opt_state || undefined);
    this.schedule_();
  };

  /**
   * Runs vsync task: measure followed by mutate. Returns the promise that
   * will be resolved as soon as the task has been completed.
   *
   * If state is not provided, the value passed to the measure and mutate
   * will be undefined.
   *
   * @param {!VsyncTaskSpecDef} task
   * @param {!VsyncStateDef=} opt_state
   * @return {!Promise}
   */

  Vsync.prototype.runPromise = function runPromise(task, opt_state) {
    var _this2 = this;

    this.run(task, opt_state);
    if (this.nextFramePromise_) {
      return this.nextFramePromise_;
    }
    return this.nextFramePromise_ = new Promise(function (resolve) {
      _this2.nextFrameResolver_ = resolve;
    });
  };

  /**
   * Creates a function that will call {@link run} method.
   * @param {!VsyncTaskSpecDef} task
   * @return {function(!VsyncStateDef=)}
   */

  Vsync.prototype.createTask = function createTask(task) {
    var _this3 = this;

    return (/** @type {function(!VsyncStateDef=)} */function (opt_state) {
        _this3.run(task, opt_state);
      }
    );
  };

  /**
   * Runs the mutate operation via vsync.
   * @param {function()} mutator
   */

  Vsync.prototype.mutate = function mutate(mutator) {
    this.run({
      measure: undefined, // For uniform hidden class.
      mutate: mutator
    });
  };

  /**
   * Runs `mutate` wrapped in a promise.
   * @param {function()} mutator
   * @return {!Promise}
   */

  Vsync.prototype.mutatePromise = function mutatePromise(mutator) {
    return this.runPromise({
      measure: undefined,
      mutate: mutator
    });
  };

  /**
   * Runs the measure operation via vsync.
   * @param {function()} measurer
   */

  Vsync.prototype.measure = function measure(measurer) {
    this.run({
      measure: measurer,
      mutate: undefined });
  };

  /**
   * Runs `measure` wrapped in a promise.
   * @param {function():TYPE} measurer
   * @return {!Promise<TYPE>}
   * @template TYPE
   */
  // For uniform hidden class.

  Vsync.prototype.measurePromise = function measurePromise(measurer) {
    var _this4 = this;

    return new Promise(function (resolve) {
      _this4.measure(function () {
        resolve(measurer());
      });
    });
  };

  /**
   * Whether the runtime is allowed to animate at this time.
   * @param {!Node} contextNode
   * @return {boolean}
   */

  Vsync.prototype.canAnimate = function canAnimate(contextNode) {
    return this.canAnimate_(_log.dev().assert(contextNode));
  };

  /**
   * @param {!Node=} unusedOptContextNode
   * @return {boolean}
   * @private
   */

  Vsync.prototype.canAnimate_ = function canAnimate_(unusedOptContextNode) {
    // TODO(dvoytenko, #3742): Use opt_node -> ampdoc.
    return this.viewer_.isVisible();
  };

  /**
   * Runs the animation vsync task. This operation can only run when animations
   * are allowed. Otherwise, this method returns `false` and exits.
   * @param {!Node} contextNode
   * @param {!VsyncTaskSpecDef} task
   * @param {!VsyncStateDef=} opt_state
   * @return {boolean}
   */

  Vsync.prototype.runAnim = function runAnim(contextNode, task, opt_state) {
    // Do not request animation frames when the document is not visible.
    if (!this.canAnimate_(contextNode)) {
      _log.dev().warn('Vsync', 'Did not schedule a vsync request, because doc' + 'ument was invisible');
      return false;
    }
    this.run(task, opt_state);
    return true;
  };

  /**
   * Creates an animation vsync task. This operation can only run when
   * animations are allowed. Otherwise, this closure returns `false` and exits.
   * @param {!Node} contextNode
   * @param {!VsyncTaskSpecDef} task
   * @return {function(!VsyncStateDef=):boolean}
   */

  Vsync.prototype.createAnimTask = function createAnimTask(contextNode, task) {
    var _this5 = this;

    return (/** @type {function(!VsyncStateDef=):boolean} */function (opt_state) {
        return _this5.runAnim(contextNode, task, opt_state);
      }
    );
  };

  /**
   * Runs the series of mutates until the mutator returns a false value.
   * @param {!Node} contextNode
   * @param {function(time, time, !VsyncStateDef):boolean} mutator The
   *   mutator callback. Only expected to do DOM writes, not reads. If the
   *   returned value is true, the vsync task will be repeated, otherwise it
   *   will be completed. The arguments are: timeSinceStart:time,
   *   timeSincePrev:time and state:VsyncStateDef.
   * @param {number=} opt_timeout Optional timeout that will force the series
   *   to complete and reject the promise.
   * @return {!Promise} Returns the promise that will either resolve on when
   *   the vsync series are completed or reject in case of failure, such as
   *   timeout.
   */

  Vsync.prototype.runAnimMutateSeries = function runAnimMutateSeries(contextNode, mutator, opt_timeout) {
    var _this6 = this;

    if (!this.canAnimate_(contextNode)) {
      return Promise.reject(_error.cancellation());
    }
    return new Promise(function (resolve, reject) {
      var startTime = Date.now();
      var prevTime = 0;
      var task = _this6.createAnimTask(contextNode, {
        mutate: function (state) {
          var timeSinceStart = Date.now() - startTime;
          var res = mutator(timeSinceStart, timeSinceStart - prevTime, state);
          if (!res) {
            resolve();
          } else if (opt_timeout && timeSinceStart > opt_timeout) {
            reject(new Error('timeout'));
          } else {
            prevTime = timeSinceStart;
            task(state);
          }
        }
      });
      task({});
    });
  };

  /** @private */

  Vsync.prototype.schedule_ = function schedule_() {
    if (this.scheduled_) {
      return;
    }
    // Schedule actual animation frame and then run tasks.
    this.scheduled_ = true;
    this.forceSchedule_();
  };

  /** @private */

  Vsync.prototype.forceSchedule_ = function forceSchedule_() {
    if (this.canAnimate_()) {
      this.raf_(this.boundRunScheduledTasks_);
    } else {
      this.pass_.schedule();
    }
  };

  /**
   * Runs all scheduled tasks. This is typically called in an RAF
   * callback. Tests may call this method to force execution of
   * tasks without waiting.
   * @private
   */

  Vsync.prototype.runScheduledTasks_ = function runScheduledTasks_() {
    this.scheduled_ = false;
    var tasks = this.tasks_;
    var states = this.states_;
    var resolver = this.nextFrameResolver_;
    this.nextFrameResolver_ = null;
    this.nextFramePromise_ = null;
    // Double buffering
    this.tasks_ = this.nextTasks_;
    this.states_ = this.nextStates_;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].measure) {
        tasks[i].measure(states[i]);
      }
    }
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].mutate) {
        tasks[i].mutate(states[i]);
      }
    }
    // Swap last arrays into double buffer.
    this.nextTasks_ = tasks;
    this.nextStates_ = states;
    this.nextTasks_.length = 0;
    this.nextStates_.length = 0;
    if (resolver) {
      resolver();
    }
  };

  /**
   * @return {function(function())} requestAnimationFrame or polyfill.
   */

  Vsync.prototype.getRaf_ = function getRaf_() {
    var _this7 = this;

    var raf = this.win.requestAnimationFrame || this.win.webkitRequestAnimationFrame;
    if (raf) {
      return raf.bind(this.win);
    }
    var lastTime = 0;
    return function (fn) {
      var now = Date.now();
      // By default we take 16ms between frames, but if the last frame is say
      // 10ms ago, we only want to wait 6ms.
      var timeToCall = Math.max(0, FRAME_TIME - (now - lastTime));
      lastTime = now + timeToCall;
      _this7.win.setTimeout(fn, timeToCall);
    };
  };

  return Vsync;
})();

exports.Vsync = Vsync;

function installVsyncService(window) {
  return (/** @type {!Vsync} */_service.getService(window, 'vsync', function () {
      _timerImpl.installTimerService(window);
      return new Vsync(window, _viewerImpl.installViewerService(window));
    })
  );
}

;

},{"../error":26,"../log":41,"../pass":45,"../service":56,"./timer-impl":71,"./viewer-impl":74}],77:[function(require,module,exports){
exports.__esModule = true;
exports.normalizeMethod_ = normalizeMethod_;
exports.fetchPolyfill = fetchPolyfill;
exports.assertSuccess = assertSuccess;
exports.installXhrService = installXhrService;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('../log');

var _service = require('../service');

var _url = require('../url');

var _types = require('../types');

/**
 * The "init" argument of the Fetch API. Currently, only "credentials: include"
 * is implemented.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * @typedef {{
 *   body: (!Object|!Array|undefined|string),
 *   credentials: (string|undefined),
 *   headers: (!Object|undefined),
 *   method: (string|undefined),
 *   requireAmpResponseSourceOrigin: (boolean|undefined)
 * }}
 */
var FetchInitDef = undefined;

/** @private @const {!Array<string>} */
var allowedMethods_ = ['GET', 'POST'];

/** @private @const {!Array<function(*):boolean>} */
var allowedJsonBodyTypes_ = [_types.isArray, _types.isObject];

/** @private @enum {number} Allowed fetch responses. */
var allowedFetchTypes_ = {
  document: 1,
  text: 2,
  arraybuffer: 3
};

/** @private @const {string} */
var ALLOW_SOURCE_ORIGIN_HEADER = 'AMP-Access-Control-Allow-Source-Origin';

/**
 * A service that polyfills Fetch API for use within AMP.
 *
 * @package Visible for type.
 * @visibleForTesting
 */

var Xhr = (function () {

  /**
   * @param {!Window} win
   */

  function Xhr(win) {
    babelHelpers.classCallCheck(this, Xhr);

    /** @const {!Window} */
    this.win = win;
  }

  /**
   * Normalized method name by uppercasing.
   * @param {string|undefined} method
   * @return {string}
   * @private
   */

  /**
   * We want to call `fetch_` unbound from any context since it could
   * be either the native fetch or our polyfill.
   *
   * @param {string} input
   * @param {!FetchInitDef=} opt_init
   * @return {!Promise<!FetchResponse>|!Promise<!Response>}
   * @private
   */

  Xhr.prototype.fetch_ = function fetch_(input, opt_init) {
    _log.dev().assert(typeof input == 'string', 'Only URL supported: %s', input);
    if (opt_init && opt_init.credentials !== undefined) {
      // In particular, Firefox does not tolerate `null` values for
      // `credentials`.
      _log.dev().assert(opt_init.credentials == 'include', 'Only credentials=include support: %s', opt_init.credentials);
    }
    // Fallback to xhr polyfill since `fetch` api does not support
    // responseType = 'document'. We do this so we don't have to do any parsing
    // and document construction on the UI thread which would be expensive.
    if (opt_init && opt_init.responseType == 'document') {
      return fetchPolyfill(input, opt_init);
    }
    return (this.win.fetch || fetchPolyfill).apply(null, arguments);
  };

  /**
   * Performs the final initialization and requests the fetch. It does three
   * main things: (1) It adds "__amp_source_origin" URL parameter with source
   * origin; (2) It verifies "AMP-Access-Control-Allow-Source-Origin" if it's
   * returned in the response; and (3) It requires
   * "AMP-Access-Control-Allow-Source-Origin" to be present in the response
   * if the `init.requireAmpResponseSourceOrigin = true`.
   *
   * @param {string} input
   * @param {!FetchInitDef=} opt_init
   * @return {!Promise<!FetchResponse>}
   * @private
   */

  Xhr.prototype.fetchAmpCors_ = function fetchAmpCors_(input, opt_init) {
    var _this = this;

    var init = opt_init || {};
    input = this.getCorsUrl(this.win, input);
    // For some same origin requests, add AMP-Same-Origin: true header to allow
    // publishers to validate that this request came from their own origin.
    var currentOrigin = _url.parseUrl(this.win.location.href).origin;
    var targetOrigin = _url.parseUrl(input).origin;
    if (currentOrigin == targetOrigin) {
      init['headers'] = init['headers'] || {};
      init['headers']['AMP-Same-Origin'] = 'true';
    }
    return this.fetch_(input, init).then(function (response) {
      var allowSourceOriginHeader = response.headers.get(ALLOW_SOURCE_ORIGIN_HEADER);
      if (allowSourceOriginHeader) {
        var sourceOrigin = _url.getSourceOrigin(_this.win.location.href);
        // If the `AMP-Access-Control-Allow-Source-Origin` header is returned,
        // ensure that it's equal to the current source origin.
        _log.user().assert(allowSourceOriginHeader == sourceOrigin, 'Returned ' + ALLOW_SOURCE_ORIGIN_HEADER + ' is not' + (' equal to the current: ' + allowSourceOriginHeader) + (' vs ' + sourceOrigin));
      } else if (init.requireAmpResponseSourceOrigin) {
        // If the `AMP-Access-Control-Allow-Source-Origin` header is not
        // returned but required, return error.
        _log.user().assert(false, 'Response must contain the' + (' ' + ALLOW_SOURCE_ORIGIN_HEADER + ' header'));
      }
      return response;
    }, function (reason) {
      _log.user().assert(false, 'Fetch failed %s: %s', input, reason && reason.message);
    });
  };

  /**
   * Fetches and constructs JSON object based on the fetch polyfill.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
   *
   * See `fetchAmpCors_` for more detail.
   *
   * @param {string} input
   * @param {?FetchInitDef=} opt_init
   * @return {!Promise<!JSONType>}
   */

  Xhr.prototype.fetchJson = function fetchJson(input, opt_init) {
    var init = opt_init || {};
    init.method = normalizeMethod_(init.method);
    setupJson_(init);

    return this.fetchAmpCors_(input, init).then(function (response) {
      return assertSuccess(response);
    }).then(function (response) {
      return response.json();
    });
  };

  /**
   * Fetches text based on the fetch polyfill.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
   *
   * See `fetchAmpCors_` for more detail.
   *
   * @param {string} input
   * @param {?FetchInitDef=} opt_init
   * @return {!Promise<string>}
   */

  Xhr.prototype.fetchText = function fetchText(input, opt_init) {
    var init = opt_init || {};
    init.method = normalizeMethod_(init.method);
    init.headers = init.headers || {};
    init.headers['Accept'] = 'text/plain';
    return this.fetchAmpCors_(input, init).then(function (response) {
      return assertSuccess(response);
    }).then(function (response) {
      return response.text();
    });
  };

  /**
   * Creates an XHR request with responseType=document
   * and returns the `FetchResponse` object.
   *
   * @param {string} input
   * @param {?FetchInitDef=} opt_init
   * @return {!Promise<!Document>}
   */

  Xhr.prototype.fetchDocument = function fetchDocument(input, opt_init) {
    var init = opt_init || {};
    init.responseType = 'document';
    init.method = normalizeMethod_(init.method);
    init.headers = init.headers || {};
    init.headers['Accept'] = 'text/html';

    return this.fetchAmpCors_(input, init).then(function (response) {
      return assertSuccess(response);
    }).then(function (response) {
      return response.document_();
    });
  };

  /**
   * @param {string} input URL
   * @param {FetchInitDef} opt_init Fetch options object.
   * @return {!Promise<!FetchResponse>}
   */

  Xhr.prototype.fetch = function fetch(input, opt_init) {
    var init = opt_init || {};
    // The "real" fetch API does not specify the response type in the request.
    // The fetch response object lets you extract the body in any of the types.
    // Here, specify 'arraybuffer' in case we use the polyfill, since that is
    // what we will use when we use fetch.
    init.responseType = 'arraybuffer';
    init.method = normalizeMethod_(init.method);
    init.headers = init.headers || {};
    return this.fetchAmpCors_(input, init).then(function (response) {
      return assertSuccess(response);
    });
  };

  /**
   * Sends the request, awaits result and confirms that it was successful.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
   *
   * See `fetchAmpCors_` for more detail.
   *
   * @param {string} input
   * @param {!FetchInitDef=} opt_init
   * @return {!Promise}
   */

  Xhr.prototype.sendSignal = function sendSignal(input, opt_init) {
    return this.fetchAmpCors_(input, opt_init).then(function (response) {
      return assertSuccess(response);
    });
  };

  /**
   * Add "__amp_source_origin" query parameter to the URL. Ideally, we'd be
   * able to set a header (e.g. AMP-Source-Origin), but this will force
   * preflight request on all CORS request.
   * @param {!Window} win
   * @param {string} url
   * @return {string}
   */

  Xhr.prototype.getCorsUrl = function getCorsUrl(win, url) {
    return _url.getCorsUrl(win, url);
  };

  return Xhr;
})();

exports.Xhr = Xhr;

function normalizeMethod_(method) {
  if (method === undefined) {
    return 'GET';
  }
  method = method.toUpperCase();

  _log.dev().assert(allowedMethods_.indexOf(method) > -1, 'Only one of %s is currently allowed. Got %s', allowedMethods_.join(', '), method);

  return method;
}

/**
* Initialize init object with headers and stringifies the body.
 * @param {!FetchInitDef} init
 * @private
 */
function setupJson_(init) {
  init.headers = init.headers || {};
  init.headers['Accept'] = 'application/json';

  if (init.method == 'POST' && !_types.isFormData(init.body)) {
    // Assume JSON strict mode where only objects or arrays are allowed
    // as body.
    _log.dev().assert(allowedJsonBodyTypes_.some(function (test) {
      return test(init.body);
    }), 'body must be of type object or array. %s', init.body);

    init.headers['Content-Type'] = 'application/json;charset=utf-8';
    init.body = JSON.stringify(init.body);
  }
}

/**
 * A minimal polyfill of Fetch API. It only polyfills what we currently use.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * Notice that the "fetch" method itself is not exported as that would require
 * us to immediately support a much wide API.
 *
 * @param {string} input
 * @param {!FetchInitDef=} opt_init
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */

function fetchPolyfill(input, opt_init) {
  /** @type {!FetchInitDef} */
  var init = opt_init || {};
  return new Promise(function (resolve, reject) {
    var xhr = createXhrRequest(init.method || 'GET', input);

    if (init.credentials == 'include') {
      xhr.withCredentials = true;
    }

    if (init.responseType in allowedFetchTypes_) {
      xhr.responseType = init.responseType;
    }

    if (init.headers) {
      Object.keys(init.headers).forEach(function (header) {
        xhr.setRequestHeader(header, init.headers[header]);
      });
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState < /* STATUS_RECEIVED */2) {
        return;
      }
      if (xhr.status < 100 || xhr.status > 599) {
        xhr.onreadystatechange = null;
        reject(new Error('Unknown HTTP status ' + xhr.status));
        return;
      }

      // TODO(dvoytenko): This is currently simplified: we will wait for the
      // whole document loading to complete. This is fine for the use cases
      // we have now, but may need to be reimplemented later.
      if (xhr.readyState == /* COMPLETE */4) {
        resolve(new FetchResponse(xhr));
      }
    };
    xhr.onerror = function () {
      reject(new Error('Network failure'));
    };
    xhr.onabort = function () {
      reject(new Error('Request aborted'));
    };

    if (init.method == 'POST') {
      xhr.send(init.body);
    } else {
      xhr.send();
    }
  });
}

/**
 * @param {string} method
 * @param {string} url
 * @return {!XMLHttpRequest|!XDomainRequest}
 * @private
 */
function createXhrRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != 'undefined') {
    // IE-specific object.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    throw new Error('CORS is not supported');
  }
  return xhr;
}

/**
 * If 415 or in the 5xx range.
 * @param {string} status
 */
function isRetriable(status) {
  return status == 415 || status >= 500 && status < 600;
}

/**
 * Returns the response if successful or otherwise throws an error.
 * @paran {!FetchResponse} response
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */

function assertSuccess(response) {
  return new Promise(function (resolve, reject) {
    if (response.status < 200 || response.status >= 300) {
      (function () {
        var err = _log.user().createError('HTTP error ' + response.status);
        if (isRetriable(response.status)) {
          err.retriable = true;
        }
        if (response.headers.get('Content-Type') == 'application/json') {
          response.json().then(function (json) {
            err.responseJson = json;
            reject(err);
          }, function () {
            // Ignore a failed json parsing and just throw the error without
            // setting responseJson.
            reject(err);
          });
        } else {
          reject(err);
        }
      })();
    } else {
      resolve(response);
    }
  });
}

/**
 * Response object in the Fetch API.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 */

var FetchResponse = (function () {
  /**
   * @param {!XMLHttpRequest|!XDomainRequest} xhr
   */

  function FetchResponse(xhr) {
    babelHelpers.classCallCheck(this, FetchResponse);

    /** @private @const {!XMLHttpRequest|!XDomainRequest} */
    this.xhr_ = xhr;

    /** @type {number} */
    this.status = this.xhr_.status;

    /** @const {!FetchResponseHeaders} */
    this.headers = new FetchResponseHeaders(xhr);

    /** @type {boolean} */
    this.bodyUsed = false;
  }

  /**
   * Provides access to the response headers as defined in the Fetch API.
   */

  /**
   * Drains the response and returns the text.
   * @return {!Promise<string>}
   * @private
   */

  FetchResponse.prototype.drainText_ = function drainText_() {
    _log.dev().assert(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    return Promise.resolve(this.xhr_.responseText);
  };

  /**
   * Drains the response and returns a promise that resolves with the response
   * text.
   * @return {!Promise<string>}
   */

  FetchResponse.prototype.text = function text() {
    return this.drainText_();
  };

  /**
   * Drains the response and returns the JSON object.
   * @return {!Promise<!JSONType>}
   */

  FetchResponse.prototype.json = function json() {
    return (/** @type {!Promise<!JSONType>} */this.drainText_().then(JSON.parse.bind(JSON))
    );
  };

  /**
   * Reads the xhr responseXML.
   * @return {!Promise<!Document>}
   * @private
   */

  FetchResponse.prototype.document_ = function document_() {
    _log.dev().assert(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    _log.user().assert(this.xhr_.responseXML, 'responseXML should exist. Make sure to return ' + 'Content-Type: text/html header.');
    return (/** @type {!Promise<!Document>} */Promise.resolve(_log.dev().assert(this.xhr_.responseXML))
    );
  };

  /**
   * Drains the response and returns a promise that resolves with the response
   * ArrayBuffer.
   * @return {!Promise<!ArrayBuffer>}
   */

  FetchResponse.prototype.arrayBuffer = function arrayBuffer() {
    _log.user().assert(this.xhr_.response, 'arrayBuffer response should exist.');
    _log.dev().assert(this.xhr_.responseType == 'arraybuffer', 'responseType was not "arraybuffer"');
    _log.dev().assert(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    return (/** @type {!Promise<!ArrayBuffer>} */Promise.resolve(this.xhr_.response)
    );
  };

  return FetchResponse;
})();

exports.FetchResponse = FetchResponse;

var FetchResponseHeaders = (function () {
  /**
   * @param {!XMLHttpRequest|!XDomainRequest} xhr
   */

  function FetchResponseHeaders(xhr) {
    babelHelpers.classCallCheck(this, FetchResponseHeaders);

    /** @private @const {!XMLHttpRequest|!XDomainRequest} */
    this.xhr_ = xhr;
  }

  /**
   * @param {!Window} window
   * @return {!Xhr}
   */

  /**
   * @param {string} name
   * @return {*}
   */

  FetchResponseHeaders.prototype.get = function get(name) {
    return this.xhr_.getResponseHeader(name);
  };

  return FetchResponseHeaders;
})();

function installXhrService(window) {
  return _service.fromClass(window, 'xhr', Xhr);
}

;

},{"../log":41,"../service":56,"../types":88,"../url":90}],78:[function(require,module,exports){
exports.__esModule = true;
exports.setShadowDomSupportedForTesting = setShadowDomSupportedForTesting;
exports.isShadowDomSupported = isShadowDomSupported;
exports.createShadowRoot = createShadowRoot;
exports.isShadowRoot = isShadowRoot;
exports.getShadowRootNode = getShadowRootNode;
exports.createShadowEmbedRoot = createShadowEmbedRoot;
exports.importShadowBody = importShadowBody;
exports.installStylesForShadowRoot = installStylesForShadowRoot;
exports.copyRuntimeStylesToShadowRoot = copyRuntimeStylesToShadowRoot;
exports.transformShadowCss = transformShadowCss;
exports.scopeShadowCss = scopeShadowCss;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _third_partyWebcomponentsjsShadowCSS = require('../third_party/webcomponentsjs/ShadowCSS');

var _ampdoc = require('./ampdoc');

var _log = require('./log');

var _dom = require('./dom');

var _extensions = require('./extensions');

var _styleInstaller = require('./style-installer');

/**
 * Used for non-composed root-node search. See `getRootNode`.
 * @const {!GetRootNodeOptions}
 */
var UNCOMPOSED_SEARCH = { composed: false };

/** @const {!RegExp} */
var CSS_SELECTOR_BEG_REGEX = /[^\.\-\_0-9a-zA-Z]/;

/** @const {!RegExp} */
var CSS_SELECTOR_END_REGEX = /[^\-\_0-9a-zA-Z]/;

/**
 * @type {boolean|undefined}
 * @visibleForTesting
 */
var shadowDomSupported = undefined;

/**
 * @param {boolean|undefined} val
 * @visibleForTesting
 */

function setShadowDomSupportedForTesting(val) {
  shadowDomSupported = val;
}

/**
 * Returns `true` if the Shadow DOM is supported.
 * @return {boolean}
 */

function isShadowDomSupported() {
  if (shadowDomSupported === undefined) {
    shadowDomSupported = !!Element.prototype.createShadowRoot;
  }
  return shadowDomSupported;
}

/**
 * Creates a shadow root for the specified host and returns it. Polyfills
 * shadow root creation if necessary.
 * @param {!Element} hostElement
 * @return {!ShadowRoot}
 */

function createShadowRoot(hostElement) {
  var existingRoot = hostElement.shadowRoot || hostElement.__AMP_SHADOW_ROOT;
  if (existingRoot) {
    existingRoot. /*OK*/innerHTML = '';
    return existingRoot;
  }

  // Native support.
  if (isShadowDomSupported()) {
    return hostElement.createShadowRoot();
  }

  // Polyfill.
  return createShadowRootPolyfill(hostElement);
}

/**
 * Shadow root polyfill.
 * @param {!Element} hostElement
 * @return {!ShadowRoot}
 */
function createShadowRootPolyfill(hostElement) {
  var doc = hostElement.ownerDocument;
  var win = doc.defaultView;
  var shadowRoot = /** @type {!ShadowRoot} */
  // Cast to ShadowRoot even though it is an Element
  // TODO(@dvoytenko) Consider to switch to a type union instead.
  /** @type {?}  */doc.createElement('i-amp-shadow-root');
  shadowRoot.id = 'i-amp-sd-' + Math.floor(win.Math.random() * 10000);
  hostElement.appendChild(shadowRoot);
  hostElement.shadowRoot = hostElement.__AMP_SHADOW_ROOT = shadowRoot;

  // API: https://www.w3.org/TR/shadow-dom/#the-shadowroot-interface

  /** @type {!Element} */
  shadowRoot.host = hostElement;

  /** @type {function (this:ShadowRoot, string): ?HTMLElement} */
  shadowRoot.getElementById = function (id) {
    var escapedId = _dom.escapeCssSelectorIdent(win, id);
    return (/** @type {HTMLElement|null} */shadowRoot.querySelector('#' + escapedId)
    );
  };

  return shadowRoot;
}

/**
 * Determines if value is actually a `ShadowRoot` node.
 * @param {*} value
 * @return {boolean}
 */

function isShadowRoot(value) {
  if (!value) {
    return false;
  }
  // Node.nodeType == DOCUMENT_FRAGMENT to speed up the tests. Unfortunately,
  // nodeType of DOCUMENT_FRAGMENT is used currently for ShadowRoot nodes.
  if (value.tagName == 'I-AMP-SHADOW-ROOT') {
    return true;
  }
  return value.nodeType == /* DOCUMENT_FRAGMENT */11 && Object.prototype.toString.call(value) === '[object ShadowRoot]';
}

/**
 * Return shadow root for the specified node.
 * @param {!Node} node
 * @return {?ShadowRoot}
 */

function getShadowRootNode(node) {
  if (isShadowDomSupported() && Node.prototype.getRootNode) {
    return (/** @type {?ShadowRoot} */node.getRootNode(UNCOMPOSED_SEARCH)
    );
  }
  // Polyfill shadow root lookup.
  return (/** @type {?ShadowRoot} */_dom.closestNode(node, function (n) {
      return isShadowRoot(n);
    })
  );
}

/**
 * Creates a shadow root for an shadow embed.
 * @param {!Element} hostElement
 * @param {!Array<string>} extensionIds
 * @return {!ShadowRoot}
 */

function createShadowEmbedRoot(hostElement, extensionIds) {
  var shadowRoot = createShadowRoot(hostElement);
  shadowRoot.AMP = {};

  var win = hostElement.ownerDocument.defaultView;
  var extensions = _extensions.extensionsFor(win);
  var ampdocService = _ampdoc.ampdocServiceFor(win);
  var ampdoc = ampdocService.getAmpDoc(hostElement);

  // Instal runtime CSS.
  copyRuntimeStylesToShadowRoot(ampdoc, shadowRoot);

  // Install extensions.
  extensionIds.forEach(function (extensionId) {
    return extensions.loadExtension(extensionId);
  });

  // Apply extensions factories, such as CSS.
  extensions.installFactoriesInShadowRoot(shadowRoot, extensionIds);

  return shadowRoot;
}

/**
 * Imports a body into a shadow root with the workaround for a polyfill case.
 * @param {!ShadowRoot} shadowRoot
 * @param {!Element} body
 * @return {!Element}
 */

function importShadowBody(shadowRoot, body) {
  var doc = shadowRoot.ownerDocument;
  var resultBody = undefined;
  if (isShadowDomSupported()) {
    resultBody = doc.importNode(body, true);
  } else {
    resultBody = doc.createElement('amp-body');
    for (var n = body.firstChild; !!n; n = n.nextSibling) {
      resultBody.appendChild(doc.importNode(n, true));
    }
    resultBody.style.display = 'block';
  }
  resultBody.style.position = 'relative';
  shadowRoot.appendChild(resultBody);
  return _log.dev().assertElement(resultBody);
}

/**
 * Adds the given css text to the given shadow root.
 *
 * The style tags will be at the beginning of the shadow root before all author
 * styles. One element can be the main runtime CSS. This is guaranteed
 * to always be the first stylesheet in the doc.
 *
 * @param {!ShadowRoot} shadowRoot
 * @param {string} cssText
 * @param {boolean=} opt_isRuntimeCss If true, this style tag will be inserted
 *     as the first element in head and all style elements will be positioned
 *     after.
 * @param {string=} opt_ext
 * @return {!Element}
 */

function installStylesForShadowRoot(shadowRoot, cssText, opt_isRuntimeCss, opt_ext) {
  return _styleInstaller.insertStyleElement(_log.dev().assert(shadowRoot.ownerDocument), shadowRoot, transformShadowCss(shadowRoot, cssText), opt_isRuntimeCss || false, opt_ext || null);
}

/*
 * Copies runtime styles from the ampdoc context into a shadow root.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 * @param {!ShadowRoot} shadowRoot
 */

function copyRuntimeStylesToShadowRoot(ampdoc, shadowRoot) {
  var style = _log.dev().assert(ampdoc.getRootNode().querySelector('style[amp-runtime]'), 'Runtime style is not found in the ampdoc: %s', ampdoc.getRootNode());
  var cssText = style.textContent;
  installStylesForShadowRoot(shadowRoot, cssText, /* opt_isRuntimeCss */true);
}

/**
 * If necessary, transforms CSS to isolate AMP CSS within the shaodw root and
 * reduce the possibility of high-level conflicts.
 * @param {!ShadowRoot} shadowRoot
 * @param {string} css
 * @return {string}
 */

function transformShadowCss(shadowRoot, css) {
  if (isShadowDomSupported()) {
    return css;
  }
  return scopeShadowCss(shadowRoot, css);
}

/**
 * Transforms CSS to isolate AMP CSS within the shadow root and reduce the
 * possibility of high-level conflicts. There are two types of transformations:
 * 1. Root transformation: `body` -> `amp-body`, etc.
 * 2. Scoping: `a {}` -> `#i-amp-sd-123 a {}`.
 *
 * @param {!ShadowRoot} shadowRoot
 * @param {string} css
 * @return {string}
 * @visibleForTesting
 */

function scopeShadowCss(shadowRoot, css) {
  var id = _log.dev().assert(shadowRoot.id);
  var doc = shadowRoot.ownerDocument;
  var rules = null;
  // Try to use a separate document.
  try {
    rules = getStylesheetRules(doc.implementation.createHTMLDocument(''), css);
  } catch (e) {}
  // Ignore.

  // Try to use the current document.
  if (!rules) {
    try {
      rules = getStylesheetRules(doc, css);
    } catch (e) {
      // Ignore.
    }
  }

  // No rules could be parsed - return css as is.
  if (!rules) {
    return css;
  }

  // Patch selectors.
  return _third_partyWebcomponentsjsShadowCSS.ShadowCSS.scopeRules(rules, '#' + id, transformRootSelectors);
}

/**
 * Replaces top-level selectors such as `html` and `body` with their polyfill
 * counterparts: `amp-html` and `amp-body`.
 * @param {string} selector
 * @return {string}
 */
function transformRootSelectors(selector) {
  return selector.replace(/(html|body)/g, rootSelectorPrefixer);
}

/**
 * See `transformRootSelectors`.
 * @param {string} match
 * @param {string} name
 * @param {number} pos
 * @param {string} selector
 * @return {string}
 * @private
 */
function rootSelectorPrefixer(match, name, pos, selector) {
  var prev = selector.charAt(pos - 1);
  var next = selector.charAt(pos + match.length);
  if ((!prev || CSS_SELECTOR_BEG_REGEX.test(prev)) && (!next || CSS_SELECTOR_END_REGEX.test(next))) {
    return 'amp-' + match;
  }
  return match;
}

/**
 * @param {!Document} doc
 * @param {string} css
 * @return {?CSSRuleList}
 */
function getStylesheetRules(doc, css) {
  var style = doc.createElement('style');
  style.textContent = css;
  try {
    (doc.head || doc.documentElement).appendChild(style);
    if (style.sheet) {
      return style.sheet.cssRules;
    }
    return null;
  } finally {
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }
}

},{"../third_party/webcomponentsjs/ShadowCSS":102,"./ampdoc":11,"./dom":23,"./extensions":31,"./log":41,"./style-installer":83}],79:[function(require,module,exports){
exports.__esModule = true;
exports.shareTrackingForOrNull = shareTrackingForOrNull;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _elementService = require('./element-service');

/**
 * Returns a promise for the share tracking fragments or a promise for null
 * if it is not available on the current page.
 * @param {!Window} win
 * @return {!Promise<?{incomingFragment: string, outgoingFragment: string}>}
 */

function shareTrackingForOrNull(win) {
  return (/** @type {
         !Promise<?{incomingFragment: string, outgoingFragment: string}>} */_elementService.getElementServiceIfAvailable(win, 'share-tracking', 'amp-share-tracking')
  );
}

},{"./element-service":24}],80:[function(require,module,exports){
exports.__esModule = true;
exports.parseSizeList = parseSizeList;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _layout = require('./layout');

var _log = require('./log');

/**
 * A single option within a SizeList.
 * @typedef {{
 *   mediaQuery: (string|undefined),
 *   size: (!./layout.LengthDef)
 * }}
 */
var SizeListOptionDef = undefined;

/**
 * Parses the text representation of "sizes" into SizeList object.
 *
 * There could be any number of size options within the SizeList. They are tried
 * in the order they were defined. The final size option must not have "media"
 * condition specified. All other size options must have "media" condition
 * specified.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-sizes
 * @param {string} s
 * @param {boolean=} opt_allowPercentAsLength when parsing heights
 * @return {!SizeList}
 */

function parseSizeList(s, opt_allowPercentAsLength) {
  var sSizes = s.split(',');
  _log.user().assert(sSizes.length > 0, 'sizes has to have at least one size');
  var sizes = [];
  sSizes.forEach(function (sSize) {
    sSize = sSize.replace(/\s+/g, ' ').trim();
    if (sSize.length == 0) {
      return;
    }

    var mediaStr = undefined;
    var sizeStr = undefined;

    // Process the expression from the end.
    var lastChar = sSize.charAt(sSize.length - 1);
    var div = undefined;
    var func = false;
    if (lastChar == ')') {
      // Value is the CSS function, e.g. `calc(50vw + 10px)`.
      func = true;

      // First, skip to the opening paren.
      var parens = 1;
      div = sSize.length - 2;
      for (; div >= 0; div--) {
        var c = sSize.charAt(div);
        if (c == '(') {
          parens--;
        } else if (c == ')') {
          parens++;
        }
        if (parens == 0) {
          break;
        }
      }

      // Then, skip to the begining to the function's name.
      var funcEnd = div - 1;
      if (div > 0) {
        div--;
        for (; div >= 0; div--) {
          var c = sSize.charAt(div);
          if (!(c == '%' || c == '-' || c == '_' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9')) {
            break;
          }
        }
      }
      _log.user().assert(div < funcEnd, 'Invalid CSS function in "%s"', sSize);
    } else {
      // Value is the length or a percent: accept a wide range of values,
      // including invalid values - they will be later asserted to conform
      // to exact CSS length or percent value.
      div = sSize.length - 2;
      for (; div >= 0; div--) {
        var c = sSize.charAt(div);
        if (!(c == '%' || c == '.' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9')) {
          break;
        }
      }
    }
    if (div >= 0) {
      mediaStr = sSize.substring(0, div + 1).trim();
      sizeStr = sSize.substring(div + 1).trim();
    } else {
      sizeStr = sSize;
      mediaStr = undefined;
    }
    sizes.push({ mediaQuery: mediaStr,
      size: func ? sizeStr : opt_allowPercentAsLength ? _layout.assertLengthOrPercent(sizeStr) : _layout.assertLength(sizeStr) });
  });
  return new SizeList(sizes);
}

;

/**
 * A SizeList object contains one or more sizes as typically seen in "sizes"
 * attribute.
 *
 * See "select" method for details on how the size selection is performed.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-sizes
 */

var SizeList = (function () {
  /**
   * @param {!Array<!SizeListOptionDef>} sizes
   */

  function SizeList(sizes) {
    babelHelpers.classCallCheck(this, SizeList);

    _log.user().assert(sizes.length > 0, 'SizeList must have at least one option');
    /** @private @const {!Array<!SizeListOptionDef>} */
    this.sizes_ = sizes;

    // All sources except for last must have a media query. The last one must
    // not.
    for (var i = 0; i < sizes.length; i++) {
      var option = sizes[i];
      if (i < sizes.length - 1) {
        _log.user().assert(option.mediaQuery, 'All options except for the last must have a media condition');
      } else {
        _log.user().assert(!option.mediaQuery, 'The last option must not have a media condition');
      }
    }
  }

  /**
   * Selects the first size that matches media conditions. If no options match,
   * the last option is returned.
   *
   * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-sizes
   * @param {!Window} win
   * @return {!./layout.LengthDef|string}
   */

  SizeList.prototype.select = function select(win) {
    for (var i = 0; i < this.sizes_.length - 1; i++) {
      var option = this.sizes_[i];
      if (option.mediaQuery && win.matchMedia(option.mediaQuery).matches) {
        return option.size;
      }
    }
    return this.getLast();
  };

  /**
   * Returns the last size in the SizeList, which is the default.
   * @return {!./layout.LengthDef|string}
   */

  SizeList.prototype.getLast = function getLast() {
    return this.sizes_[this.sizes_.length - 1].size;
  };

  return SizeList;
})();

exports.SizeList = SizeList;

},{"./layout":39,"./log":41}],81:[function(require,module,exports){
exports.__esModule = true;
exports.srcsetFromElement = srcsetFromElement;
exports.parseSrcset = parseSrcset;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

/**
 * A single source within a srcset. Only one: width or DPR can be specified at
 * a time.
 * @typedef {{
 *   url: string,
 *   width: (number|undefined),
 *   dpr: (number|undefined)
 * }}
 */
var SrcsetSourceDef = undefined;

/**
 * Extracts `srcset` and fallbacks to `src` if not available.
 * @param {!Element} element
 * @return {!Srcset}
 */

function srcsetFromElement(element) {
  var srcsetAttr = element.getAttribute('srcset');
  if (srcsetAttr) {
    return parseSrcset(srcsetAttr);
  }
  // We can't push `src` via `parseSrcset` because URLs in `src` are not always
  // RFC compliant and can't be easily parsed as an `srcset`. For instance,
  // they sometimes contain space characters.
  var srcAttr = _log.user().assert(element.getAttribute('src'), 'Either non-empty "srcset" or "src" attribute must be specified: %s', element);
  return new Srcset([{ url: srcAttr, width: undefined, dpr: 1 }]);
}

/**
 * Parses the text representation of srcset into Srcset object.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes.
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
 * @param {string} s
 * @param {!Element=} opt_element
 * @return {!Srcset}
 */

function parseSrcset(s, opt_element) {
  // General grammar: (URL [NUM[w|x]],)*
  // Example 1: "image1.png 100w, image2.png 50w"
  // Example 2: "image1.png 2x, image2.png"
  // Example 3: "image1,100w.png 100w, image2.png 50w"
  var sSources = s.match(/\s*(?:[\S]*)(?:\s+(?:-?(?:\d+(?:\.(?:\d+)?)?|\.\d+)[a-zA-Z]))?(?:\s*,)?/g);
  _log.user().assert(sSources.length > 0, 'srcset has to have at least one source: %s', opt_element);
  var sources = [];
  for (var i = 0; i < sSources.length; i++) {
    var sSource = sSources[i].trim();
    if (sSource.substr(-1) == ',') {
      sSource = sSource.substr(0, sSource.length - 1).trim();
    }
    var parts = sSource.split(/\s+/, 2);
    if (parts.length == 0 || parts.length == 1 && !parts[0] || parts.length == 2 && !parts[0] && !parts[1]) {
      continue;
    }
    var url = parts[0];
    if (parts.length == 1 || parts.length == 2 && !parts[1]) {
      // If no "w" or "x" specified, we assume it's "1x".
      sources.push({ url: url, width: undefined, dpr: 1 });
    } else {
      var spec = parts[1].toLowerCase();
      var lastChar = spec.substring(spec.length - 1);
      if (lastChar == 'w') {
        sources.push({ url: url, width: parseFloat(spec), dpr: undefined });
      } else if (lastChar == 'x') {
        sources.push({ url: url, width: undefined, dpr: parseFloat(spec) });
      }
    }
  }
  return new Srcset(sources);
}

/**
 * A srcset object contains one or more sources.
 *
 * There are two types of sources: width-based and DPR-based. Only one type
 * of sources allowed to be specified within a single srcset. Depending on a
 * usecase, the components are free to choose any source that best corresponds
 * to the required rendering quality and network and CPU conditions. See
 * "select" method for details on how this selection is performed.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 */

var Srcset = (function () {

  /**
   * @param {!Array<!SrcsetSourceDef>} sources
   */

  function Srcset(sources) {
    babelHelpers.classCallCheck(this, Srcset);

    _log.user().assert(sources.length > 0, 'Srcset must have at least one source');
    /** @private @const {!Array<!SrcsetSourceDef>} */
    this.sources_ = sources;

    // Only one type of source specified can be used - width or DPR.
    var hasWidth = false;
    var hasDpr = false;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      _log.user().assert((source.width || source.dpr) && (!source.width || !source.dpr), 'Either dpr or width must be specified');
      hasWidth = hasWidth || !!source.width;
      hasDpr = hasDpr || !!source.dpr;
    }
    _log.user().assert(!hasWidth || !hasDpr, 'Srcset cannot have both width and dpr sources');

    // Source and assert duplicates.
    if (hasWidth) {
      this.sources_.sort(sortByWidth);
    } else {
      this.sources_.sort(sortByDpr);
    }

    /** @private @const {boolean} */
    this.widthBased_ = hasWidth;

    /** @private @const {boolean} */
    this.dprBased_ = hasDpr;
  }

  /**
   * Performs selection for specified width and DPR. Here, width is the width
   * in screen pixels and DPR is the device-pixel-ratio or pixel density of
   * the device. Depending on the circumstances, such as low network conditions,
   * it's possible to manipulate the result of this method by passing a lower
   * DPR value.
   *
   * The source selection depends on whether this is width-based or DPR-based
   * srcset.
   *
   * In a width-based source, the source's width is the physical width of a
   * resource (e.g. an image). Depending on the provided DPR, this width is
   * converted to the screen pixels as following:
   *   pixelWidth = sourceWidth / DPR
   *
   * Then, the source closest to the requested "width" is selected using
   * the "pixelWidth". The slight preference is given to the bigger sources to
   * ensure the most optimal quality.
   *
   * In a DPR-based source, the source's DPR is used to return the source that
   * is closest to the requested DPR.
   *
   * Based on
   * http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
   * @param {number} width
   * @param {number} dpr
   * @return {!SrcsetSourceDef}
   */

  Srcset.prototype.select = function select(width, dpr) {
    _log.dev().assert(width, 'width=%s', width);
    _log.dev().assert(dpr, 'dpr=%s', dpr);
    var index = -1;
    if (this.widthBased_) {
      index = this.selectByWidth_(width, dpr);
    } else if (this.dprBased_) {
      index = this.selectByDpr_(width, dpr);
    }
    if (index != -1) {
      return this.sources_[index];
    }
    return this.getLast();
  };

  /**
   * @param {number} width
   * @param {number} dpr
   * @return {number}
   * @private
   */

  Srcset.prototype.selectByWidth_ = function selectByWidth_(width, dpr) {
    var minIndex = -1;
    var minWidth = 1000000;
    var minScore = 1000000;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      var sourceWidth = undefined;
      if (source.width) {
        sourceWidth = source.width / dpr;
      } else {
        // Default source: no width: assume values are half of of the
        // minimum values seen.
        sourceWidth = minWidth / 2;
      }
      minWidth = Math.min(minWidth, sourceWidth);
      // The calculation is slightly biased toward higher width by offsetting
      // score by negative 0.2.
      var score = Math.abs((sourceWidth - width) / width - 0.2);
      if (score < minScore) {
        minScore = score;
        minIndex = i;
      }
    }
    return minIndex;
  };

  /**
   * @param {number} _width
   * @param {number} dpr
   * @return {number}
   * @private
   */

  Srcset.prototype.selectByDpr_ = function selectByDpr_(_width, dpr) {
    var minIndex = -1;
    var minScore = 1000000;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      // Default DPR = 1.
      var sourceDpr = source.dpr || 1;
      var score = Math.abs(sourceDpr - dpr);
      if (score < minScore) {
        minScore = score;
        minIndex = i;
      }
    }
    return minIndex;
  };

  /**
   * Returns the last source in the srcset, which is the default source.
   * @return {!SrcsetSourceDef}
   */

  Srcset.prototype.getLast = function getLast() {
    return this.sources_[this.sources_.length - 1];
  };

  /**
   * Returns all sources in the srcset.
   * @return {!Array<!SrcsetSourceDef>}
   */

  Srcset.prototype.getSources = function getSources() {
    return this.sources_;
  };

  /**
   * Reconstructs the string expression for this srcset.
   * @return {string}
   */

  Srcset.prototype.stringify = function stringify() {
    var res = [];
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      if (source.width) {
        res.push(source.url + ' ' + source.width + 'w');
      } else if (source.dpr) {
        res.push(source.url + ' ' + source.dpr + 'x');
      } else {
        res.push('' + source.url);
      }
    }
    return res.join(', ');
  };

  return Srcset;
})();

exports.Srcset = Srcset;

function sortByWidth(s1, s2) {
  _log.user().assert(s1.width != s2.width, 'Duplicate width: %s', s1.width);
  return s2.width - s1.width;
}

function sortByDpr(s1, s2) {
  _log.user().assert(s1.dpr != s2.dpr, 'Duplicate dpr: %s', s1.dpr);
  return s2.dpr - s1.dpr;
}

},{"./log":41}],82:[function(require,module,exports){
exports.__esModule = true;
exports.dashToCamelCase = dashToCamelCase;
exports.endsWith = endsWith;
exports.startsWith = startsWith;
exports.expandTemplate = expandTemplate;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes removed and character after to upper case.
 * visibleForTesting
 */

function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, function (_all, character) {
    return character.toUpperCase();
  });
}

/**
 * Polyfill for String.prototype. endsWith.
 * @param {string} string
 * @param {string} suffix
 * @return {boolean}
 */

function endsWith(string, suffix) {
  var index = string.length - suffix.length;
  return index >= 0 && string.indexOf(suffix, index) == index;
}

/**
 * Polyfill for String.prototype. startsWith.
 * @param {string} string
 * @param {string} prefix
 * @return {boolean}
 */

function startsWith(string, prefix) {
  if (prefix.length > string.length) {
    return false;
  }
  return string.lastIndexOf(prefix, 0) == 0;
}

/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {!function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=} opt_maxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */

function expandTemplate(template, getter, opt_maxIterations) {
  var maxIterations = opt_maxIterations || 1;

  var _loop = function (i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });
    if (!matches) {
      return "break";
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }
  return template;
}

},{}],83:[function(require,module,exports){
exports.__esModule = true;
exports.installStyles = installStyles;
exports.insertStyleElement = insertStyleElement;
exports.makeBodyVisible = makeBodyVisible;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _log = require('./log');

var _documentState = require('./document-state');

var _performance = require('./performance');

var _platform = require('./platform');

var _style = require('./style');

var _renderDelayingServices = require('./render-delaying-services');

var bodyVisibleSentinel = '__AMP_BODY_VISIBLE';

/**
 * Adds the given css text to the given document.
 *
 * The style tags will be at the beginning of the head before all author
 * styles. One element can be the main runtime CSS. This is guaranteed
 * to always be the first stylesheet in the doc.
 *
 * @param {!Document} doc The document that should get the new styles.
 * @param {string} cssText
 * @param {function()} cb Called when the new styles are available.
 *     Not using a promise, because this is synchronous when possible.
 *     for better performance.
 * @param {boolean=} opt_isRuntimeCss If true, this style tag will be inserted
 *     as the first element in head and all style elements will be positioned
 *     after.
 * @param {string=} opt_ext
 * @return {!Element}
 */

function installStyles(doc, cssText, cb, opt_isRuntimeCss, opt_ext) {
  var style = insertStyleElement(doc, _log.dev().assertElement(doc.head), cssText, opt_isRuntimeCss || false, opt_ext || null);

  // Styles aren't always available synchronously. E.g. if there is a
  // pending style download, it will have to finish before the new
  // style is visible.
  // For this reason we poll until the style becomes available.
  // Sync case.
  if (styleLoaded(doc, style)) {
    cb();
    return style;
  }
  // Poll until styles are available.
  var interval = setInterval(function () {
    if (styleLoaded(doc, style)) {
      clearInterval(interval);
      cb();
    }
  }, 4);
  return style;
}

/**
 * Creates the properly configured style element.
 * @param {?Document} doc
 * @param {!Element|!ShadowRoot} cssRoot
 * @param {string} cssText
 * @param {boolean} isRuntimeCss
 * @param {?string} ext
 * @return {!Element}
 */

function insertStyleElement(doc, cssRoot, cssText, isRuntimeCss, ext) {
  var style = doc.createElement('style');
  style.textContent = cssText;
  var afterElement = null;
  // Make sure that we place style tags after the main runtime CSS. Otherwise
  // the order is random.
  if (isRuntimeCss) {
    style.setAttribute('amp-runtime', '');
    cssRoot.runtimeStyleElement = style;
  } else if (ext == 'amp-custom') {
    style.setAttribute('amp-custom', '');
    afterElement = cssRoot.lastChild;
  } else {
    style.setAttribute('amp-extension', ext || '');
    afterElement = cssRoot.runtimeStyleElement;
  }
  insertAfterOrAtStart(cssRoot, style, afterElement);
  return style;
}

/**
 * Sets the document's body opacity to 1.
 * If the body is not yet available (because our script was loaded
 * synchronously), polls until it is.
 * @param {!Document} doc The document who's body we should make visible.
 * @param {boolean=} opt_waitForServices Whether the body visibility should
 *     be blocked on key services being loaded.
 */

function makeBodyVisible(doc, opt_waitForServices) {
  var set = function () {
    _style.setStyles(_log.dev().assertElement(doc.body), {
      opacity: 1,
      visibility: 'visible',
      animation: 'none'
    });

    // TODO(erwinm, #4097): Remove this when safari technology preview has merged
    // the fix for https://github.com/ampproject/amphtml/issues/4047
    // https://bugs.webkit.org/show_bug.cgi?id=159791 which is in r202950.
    if (_platform.platformFor(doc.defaultView).isSafari()) {
      if (doc.body.style['webkitAnimation'] !== undefined) {
        doc.body.style['webkitAnimation'] = 'none';
      } else if (doc.body.style['WebkitAnimation'] !== undefined) {
        doc.body.style['WebkitAnimation'] = 'none';
      }
    }
  };
  var win = doc.defaultView;
  var docState = _documentState.documentStateFor(win);
  docState.onBodyAvailable(function () {
    if (win[bodyVisibleSentinel]) {
      return;
    }
    win[bodyVisibleSentinel] = true;
    if (opt_waitForServices) {
      _renderDelayingServices.waitForServices(win).then(set, set).then(function () {
        try {
          var perf = _performance.performanceFor(win);
          perf.tick('mbv');
          perf.flush();
        } catch (e) {}
      });
    } else {
      set();
    }
  });
}

/**
 * Checks whether a style element was registered in the DOM.
 * @param {!Document} doc
 * @param {!Element} style
 * @return {boolean}
 */
function styleLoaded(doc, style) {
  var sheets = doc.styleSheets;
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.ownerNode == style) {
      return true;
    }
  }
  return false;
};

/**
 * Insert the element in the root after the element named after or
 * if that is null at the beginning.
 * @param {!Element|!ShadowRoot} root
 * @param {!Element} element
 * @param {?Element} after
 */
function insertAfterOrAtStart(root, element, after) {
  if (after) {
    if (after.nextSibling) {
      root.insertBefore(element, after.nextSibling);
    } else {
      root.appendChild(element);
    }
  } else {
    // Add at the start.
    root.insertBefore(element, root.firstChild);
  }
}

},{"./document-state":21,"./log":41,"./performance":46,"./platform":47,"./render-delaying-services":53,"./style":84}],84:[function(require,module,exports){
exports.__esModule = true;
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.setStyle = setStyle;
exports.getStyle = getStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

// Note: loaded by 3p system. Cannot rely on babel polyfills.

/** @type {Object<string, string>} */
var propertyNameCache = undefined;

/** @const {!Array<string>} */
var vendorPrefixes = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];

/**
 * @export
 * @param {string} camelCase camel cased string
 * @return {string} title cased string
 */

function camelCaseToTitleCase(camelCase) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Checks the style if a prefixed version of a property exists and returns
 * it or returns an empty string.
 * @private
 * @param {!CSSStyleDeclaration} style
 * @param {string} titleCase the title case version of a css property name
 * @return {string} the prefixed property name or null.
 */
function getVendorJsPropertyName_(style, titleCase) {
  for (var i = 0; i < vendorPrefixes.length; i++) {
    var propertyName = vendorPrefixes[i] + titleCase;
    if (style[propertyName] !== undefined) {
      return propertyName;
    }
  }
  return '';
}

/**
 * Returns the possibly prefixed JavaScript property name of a style property
 * (ex. WebkitTransitionDuration) given a camelCase'd version of the property
 * (ex. transitionDuration).
 * @export
 * @param {!CSSStyleDeclaration} style
 * @param {string} camelCase the camel cased version of a css property name
 * @param {boolean=} opt_bypassCache bypass the memoized cache of property
 *   mapping
 * @return {string}
 */

function getVendorJsPropertyName(style, camelCase, opt_bypassCache) {
  if (!propertyNameCache) {
    propertyNameCache = Object.create(null);
  }
  var propertyName = propertyNameCache[camelCase];
  if (!propertyName || opt_bypassCache) {
    propertyName = camelCase;
    if (style[camelCase] === undefined) {
      var titleCase = camelCaseToTitleCase(camelCase);
      var prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);

      if (style[prefixedPropertyName] !== undefined) {
        propertyName = prefixedPropertyName;
      }
    }
    if (!opt_bypassCache) {
      propertyNameCache[camelCase] = propertyName;
    }
  }
  return propertyName;
}

/**
 * Sets the CSS style of the specified element with optional units, e.g. "px".
 * @param {Element} element
 * @param {string} property
 * @param {*} value
 * @param {string=} opt_units
 * @param {boolean=} opt_bypassCache
 */

function setStyle(element, property, value, opt_units, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (propertyName) {
    element.style[propertyName] = opt_units ? value + opt_units : value;
  }
}

/**
 * Returns the value of the CSS style of the specified element.
 * @param {!Element} element
 * @param {string} property
 * @param {boolean=} opt_bypassCache
 * @return {*}
 */

function getStyle(element, property, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (!propertyName) {
    return undefined;
  }
  return element.style[propertyName];
}

/**
 * Sets the CSS styles of the specified element. The styles
 * a specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, *>} styles
 */

function setStyles(element, styles) {
  for (var k in styles) {
    setStyle(element, k, styles[k]);
  }
}

/**
 * Shows or hides the specified element.
 * @param {!Element} element
 * @param {boolean=} opt_display
 */

function toggle(element, opt_display) {
  if (opt_display === undefined) {
    opt_display = !(element.style.display != 'none');
  }
  element.style.display = opt_display ? '' : 'none';
}

/**
 * Returns a pixel value.
 * @param {number} value
 * @return {string}
 */

function px(value) {
  return value + 'px';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function translateX(value) {
  if (typeof value == 'string') {
    return 'translateX(' + value + ')';
  }
  return 'translateX(' + px(value) + ')';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} x
 * @param {(number|string)=} opt_y
 * @return {string}
 */

function translate(x, opt_y) {
  if (typeof x == 'number') {
    x = px(x);
  }
  if (opt_y === undefined) {
    return 'translate(' + x + ')';
  }
  if (typeof opt_y == 'number') {
    opt_y = px(opt_y);
  }
  return 'translate(' + x + ',' + opt_y + ')';
}

/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function scale(value) {
  return 'scale(' + value + ')';
}

},{}],85:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Absolute time in milliseconds.
 * @typedef {number}
 */
var timeDef = undefined;

exports.timeDef = timeDef;
/**
 * Number between 0 and 1 that designates normalized time, as in "from start to
 * end".
 * @typedef {number}
 */
var normtimeDef = undefined;
exports.normtimeDef = normtimeDef;

},{}],86:[function(require,module,exports){
exports.__esModule = true;
exports.timerFor = timerFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/timer-impl.Timer}
 */

function timerFor(window) {
  return (/** @type {!./service/timer-impl.Timer} */_service.getExistingServiceForWindow(window, 'timer')
  );
}

;

},{"./service":56}],87:[function(require,module,exports){
exports.__esModule = true;
exports.all = all;
exports.withCurve = withCurve;
exports.setStyles = setStyles;
exports.numeric = numeric;
exports.spring = spring;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _curve = require('./curve');

var _style = require('./style');

var st = babelHelpers.interopRequireWildcard(_style);

/**
 * TransitionDef function that accepts normtime, typically between 0 and 1 and
 * performs an arbitrary animation action. Notice that sometimes normtime can
 * dip above 1 or below 0. This is an acceptable case for some curves. The
 * second argument is a boolean value that equals "true" for the completed
 * transition and "false" for ongoing.
 * @typedef {function(number, boolean):?}
 */
var TransitionDef = undefined;

exports.TransitionDef = TransitionDef;
/**
 * @see {TransitionDef} minus the second "completed transition"
 * argument.
 * @typedef {function(number):?}
 */
var TimeTransitionDef = undefined;

exports.TimeTransitionDef = TimeTransitionDef;
var NOOP = function (unusedTime) {
  return null;
};

exports.NOOP = NOOP;
/**
 * Returns a transition that combines a number of other transitions and
 * invokes them all in parallel.
 * @param {!Array<!TransitionDef>} transitions
 * @return {!TransitionDef<void>}
 */

function all(transitions) {
  return function (time, complete) {
    for (var i = 0; i < transitions.length; i++) {
      var tr = transitions[i];
      tr(time, complete);
    }
  };
}

/**
 * Returns the specified transition with the time curved via specified curve
 * function.
 * @param {!TransitionDef<RESULT>} transition
 * @param {!./curve.CurveDef|string} curve
 * @return {!TransitionDef<RESULT>}
 * @template RESULT
 */

function withCurve(transition, curve) {
  var curveFn = _curve.getCurve(curve);
  return function (time, complete) {
    return transition(complete ? 1 : curveFn(time), complete);
  };
}

/**
 * A transition that sets the CSS style of the specified element. The styles
 * a specified as a map from CSS property names to transition functions for
 * each of these properties.
 * @param {!Element} element
 * @param {!Object<string, !TransitionDef>} styles
 * @return {!TransitionDef<void>}
 */

function setStyles(element, styles) {
  return function (time, complete) {
    for (var k in styles) {
      st.setStyle(element, k, styles[k](time, complete));
    }
  };
}

/**
 * A basic numeric interpolation.
 * @param {number} start
 * @param {number} end
 * @return {!TimeTransitionDef<number>}
 */

function numeric(start, end) {
  return function (time) {
    return start + (end - start) * time;
  };
}

/**
 * Spring numeric interpolation.
 * @param {number} start
 * @param {number} end
 * @param {number} extended
 * @param {number} threshold
 * @return {!TimeTransitionDef<number>}
 */

function spring(start, end, extended, threshold) {
  if (end == extended) {
    return function (time) {
      return numeric(start, end)(time);
    };
  }
  return function (time) {
    if (time < threshold) {
      return start + (extended - start) * (time / threshold);
    }
    return extended + (end - extended) * ((time - threshold) / (1 - threshold));
  };
}

/**
 * Adds "px" units.
 * @param {!TimeTransitionDef<number>} transition
 * @return {!TimeTransitionDef<string>}
 */

function px(transition) {
  return function (time) {
    return transition(time) + 'px';
  };
}

/**
 * A transition for "translateX" of CSS "transform" property.
 * @param {!TimeTransitionDef<number|string>} transition
 * @return {!TimeTransitionDef<string>}
 */

function translateX(transition) {
  return function (time) {
    var res = transition(time);
    if (typeof res == 'string') {
      return 'translateX(' + res + ')';
    }
    return 'translateX(' + res + 'px)';
  };
}

/**
 * A transition for "translate(x, y)" of CSS "transform" property.
 * @param {!TimeTransitionDef<number|string>} transitionX
 * @param {!TimeTransitionDef<number|string>|undefined} opt_transitionY
 * @return {!TimeTransitionDef<string>}
 */

function translate(transitionX, opt_transitionY) {
  return function (time) {
    var x = transitionX(time);
    if (typeof x == 'number') {
      x = st.px(x);
    }
    if (!opt_transitionY) {
      return 'translate(' + x + ')';
    }

    var y = opt_transitionY(time);
    if (typeof y == 'number') {
      y = st.px(y);
    }
    return 'translate(' + x + ',' + y + ')';
  };
}

/**
 * A transition for "scale" of CSS "transform" property.
 * @param {!TimeTransitionDef<number|string>} transition
 * @return {!TimeTransitionDef<string>}
 */

function scale(transition) {
  return function (time) {
    return 'scale(' + transition(time) + ')';
  };
}

},{"./curve":17,"./style":84}],88:[function(require,module,exports){
exports.__esModule = true;
exports.isArray = isArray;
exports.toArray = toArray;
exports.isObject = isObject;
exports.isFiniteNumber = isFiniteNumber;
exports.isFormData = isFormData;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/* @const */
var toString_ = Object.prototype.toString;

/**
 * Returns the ECMA [[Class]] of a value
 * @param {*} value
 * @return {string}
 */
function toString(value) {
  return toString_.call(value);
}

/**
 * Determines if value is actually an Array.
 * @param {*} value
 * @return {boolean}
 */

function isArray(value) {
  return Array.isArray(value);
}

/**
 * Converts an array-like object to an array.
 * @param {?IArrayLike<T>|string} arrayLike
 * @return {!Array<T>}
 * @template T
 */

function toArray(arrayLike) {
  if (!arrayLike) {
    return [];
  }
  var array = new Array(arrayLike.length);
  for (var i = 0; i < arrayLike.length; i++) {
    array[i] = arrayLike[i];
  }
  return array;
}

/**
 * Determines if value is actually an Object.
 * @param {*} value
 * @return {boolean}
 */

function isObject(value) {
  return toString(value) === '[object Object]';
}

/**
 * Determines if value is of number type and finite.
 * NaN and Infinity are not considered a finite number.
 * String numbers are not considered numbers.
 * @param {*} value
 * @return {boolean}
 */

function isFiniteNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Determines if value is of FormData type.
 * @param {*} value
 * @return {boolean}
 */

function isFormData(value) {
  return toString(value) === '[object FormData]';
}

},{}],89:[function(require,module,exports){
exports.__esModule = true;
exports.urlReplacementsFor = urlReplacementsFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/url-replacements-impl.UrlReplacements}
 */

function urlReplacementsFor(window) {
  return (/** @type {!./service/url-replacements-impl.UrlReplacements} */_service.getExistingServiceForWindow(window, 'url-replace')
  );
}

;

},{"./service":56}],90:[function(require,module,exports){
exports.__esModule = true;
exports.parseUrl = parseUrl;
exports.addParamToUrl = addParamToUrl;
exports.addParamsToUrl = addParamsToUrl;
exports.serializeQueryString = serializeQueryString;
exports.assertHttpsUrl = assertHttpsUrl;
exports.assertAbsoluteHttpOrHttpsUrl = assertAbsoluteHttpOrHttpsUrl;
exports.parseQueryString = parseQueryString;
exports.removeFragment = removeFragment;
exports.isProxyOrigin = isProxyOrigin;
exports.getSourceUrl = getSourceUrl;
exports.getSourceOrigin = getSourceOrigin;
exports.resolveRelativeUrl = resolveRelativeUrl;
exports.resolveRelativeUrlFallback_ = resolveRelativeUrlFallback_;
exports.getCorsUrl = getCorsUrl;
exports.checkCorsUrl = checkCorsUrl;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _string = require('./string');

var _log = require('./log');

var _mode = require('./mode');

var _config = require('./config');

var _types = require('./types');

/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */
var a = undefined;

/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {Object<string, !Location>}
 */
var cache = undefined;

/** @private @const Matches amp_js_* paramters in query string. */
var AMP_JS_PARAMS_REGEX = /[?&]amp_js[^&]*/;

/** @const {string} */
var SOURCE_ORIGIN_PARAM = '__amp_source_origin';

exports.SOURCE_ORIGIN_PARAM = SOURCE_ORIGIN_PARAM;
/**
 * @typedef {({
 *   href: string,
 *   protocol: string,
 *   host: string,
 *   hostname: string,
 *   port: string,
 *   pathname: string,
 *   search: string,
 *   hash: string,
 *   origin: string
 * }|!Location)}
 */
var Location = undefined;

exports.Location = Location;
/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {string} url
 * @return {!Location}
 */

function parseUrl(url) {
  if (!a) {
    a = /** @type {!HTMLAnchorElement} */self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = Object.create(null));
  }

  var fromCache = cache[url];
  if (fromCache) {
    return fromCache;
  }
  a.href = url;
  // IE11 doesn't provide full URL components when parsing relative URLs.
  // Assigning to itself again does the trick.
  // TODO(lannka, #3449): Remove all the polyfills once we don't support IE11
  // and it passes tests in all browsers.
  if (!a.protocol) {
    a.href = a.href;
  }

  var info = {
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: null };

  // Some IE11 specific polyfills.
  // 1) IE11 strips out the leading '/' in the pathname.
  // Set below.
  if (info.pathname[0] !== '/') {
    info.pathname = '/' + info.pathname;
  }

  // 2) For URLs with implicit ports, IE11 parses to default ports while
  // other browsers leave the port field empty.
  if (info.protocol == 'http:' && info.port == 80 || info.protocol == 'https:' && info.port == 443) {
    info.port = '';
    info.host = info.hostname;
  }

  // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.
  if (a.origin && a.origin != 'null') {
    info.origin = a.origin;
  } else if (info.protocol == 'data:' || !info.host) {
    info.origin = info.href;
  } else {
    info.origin = info.protocol + '//' + info.host;
  }
  // Freeze during testing to avoid accidental mutation.
  cache[url] = _mode.getMode().test && Object.freeze ? Object.freeze(info) : info;
  return info;
}

/**
 * Appends the string just before the fragment part (or optionally
 * to the front of the query string) of the URL.
 * @param {string} url
 * @param {string} paramString
 * @param {boolean=} opt_addToFront
 * @return {string}
 */
function appendParamStringToUrl(url, paramString, opt_addToFront) {
  if (!paramString) {
    return url;
  }
  var mainAndFragment = url.split('#', 2);
  var mainAndQuery = mainAndFragment[0].split('?', 2);

  var newUrl = mainAndQuery[0] + (mainAndQuery[1] ? opt_addToFront ? '?' + paramString + '&' + mainAndQuery[1] : '?' + mainAndQuery[1] + '&' + paramString : '?' + paramString);
  newUrl += mainAndFragment[1] ? '#' + mainAndFragment[1] : '';
  return newUrl;
}
/**
 * Appends a query string field and value to a url. `key` and `value`
 * will be ran through `encodeURIComponent` before appending.
 * @param {string} url
 * @param {string} key
 * @param {string} value
 * @param {boolean=} opt_addToFront
 * @return {string}
 */

function addParamToUrl(url, key, value, opt_addToFront) {
  var field = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  return appendParamStringToUrl(url, field, opt_addToFront);
}

/**
 * Appends query string fields and values to a url. The `params` objects'
 * `key`s and `value`s will be transformed into query string keys/values.
 * @param {string} url
 * @param {!Object<string, string|!Array<string>>} params
 * @return {string}
 */

function addParamsToUrl(url, params) {
  return appendParamStringToUrl(url, serializeQueryString(params));
}

/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!Object<string, string|!Array<string>>} params
 * @return {string}
 */

function serializeQueryString(params) {
  var s = [];
  for (var k in params) {
    var v = params[k];
    if (v == null) {
      continue;
    } else if (_types.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        var sv = /** @type {string} */v[i];
        s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
      }
    } else {
      var sv = /** @type {string} */v;
      s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
    }
  }
  return s.join('&');
}

/**
 * Asserts that a given url is HTTPS or protocol relative. It's a user-level
 * assert.
 *
 * Provides an exception for localhost.
 *
 * @param {?string|undefined} urlString
 * @param {!Element|string} elementContext Element where the url was found.
 * @param {string=} sourceName Used for error messages.
 * @return {string}
 */

function assertHttpsUrl(urlString, elementContext) {
  var sourceName = arguments.length <= 2 || arguments[2] === undefined ? 'source' : arguments[2];

  _log.user().assert(urlString != null, '%s %s must be available', elementContext, sourceName);
  // (erwinm, #4560): type cast necessary until #4560 is fixed
  var url = parseUrl( /** @type {string} */urlString);
  _log.user().assert(url.protocol == 'https:' || /^(\/\/)/.test(urlString) || url.hostname == 'localhost' || _string.endsWith(url.hostname, '.localhost'), '%s %s must start with ' + '"https://" or "//" or be relative and served from ' + 'either https or from localhost. Invalid value: %s', elementContext, sourceName, urlString);
  return (/** @type {string} */urlString
  );
}

/**
 * Asserts that a given url is an absolute HTTP or HTTPS URL.
 * @param {string} urlString
 * @return {string}
 */

function assertAbsoluteHttpOrHttpsUrl(urlString) {
  _log.user().assert(/^https?\:/i.test(urlString), 'URL must start with "http://" or "https://". Invalid value: %s', urlString);
  return parseUrl(urlString).href;
}

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 * @param {string} queryString
 * @return {!Object<string>}
 */

function parseQueryString(queryString) {
  var params = Object.create(null);
  if (!queryString) {
    return params;
  }
  if (queryString.indexOf('?') == 0 || queryString.indexOf('#') == 0) {
    queryString = queryString.substr(1);
  }
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eqIndex = pair.indexOf('=');
    var _name = undefined;
    var value = undefined;
    if (eqIndex != -1) {
      _name = decodeURIComponent(pair.substring(0, eqIndex)).trim();
      value = decodeURIComponent(pair.substring(eqIndex + 1)).trim();
    } else {
      _name = decodeURIComponent(pair).trim();
      value = '';
    }
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Returns the URL without fragment. If URL doesn't contain fragment, the same
 * string is returned.
 * @param {string} url
 * @return {string}
 */

function removeFragment(url) {
  var index = url.indexOf('#');
  if (index == -1) {
    return url;
  }
  return url.substring(0, index);
}

/**
 * Returns whether the URL has the origin of a proxy.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */

function isProxyOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  var path = url.pathname.split('/');
  var prefix = path[1];
  // List of well known proxy hosts. New proxies must be added here.
  return url.origin == _config.urls.cdn || url.origin.indexOf('http://localhost:') == 0 && (prefix == 'c' || prefix == 'v');
}

/**
 * Removes parameters that start with amp js parameter pattern and returns the new
 * search string.
 * @param {string} urlSearch
 * @return {string}
 */
function removeAmpJsParams(urlSearch) {
  if (!urlSearch || urlSearch == '?') {
    return '';
  }
  var search = urlSearch.replace(AMP_JS_PARAMS_REGEX, '').replace(/^[?&]/, ''); // Removes first ? or &.
  return search ? '?' + search : '';
}

/**
 * Returns the source URL of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string}
 */

function getSourceUrl(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }

  // Not a proxy URL - return the URL itself.
  if (!isProxyOrigin(url)) {
    return url.href;
  }

  // A proxy URL.
  // Example path that is being matched here.
  // https://cdn.ampproject.org/c/s/www.origin.com/foo/
  // The /s/ is optional and signals a secure origin.
  var path = url.pathname.split('/');
  var prefix = path[1];
  _log.user().assert(prefix == 'c' || prefix == 'v', 'Unknown path prefix in url %s', url.href);
  var domainOrHttpsSignal = path[2];
  var origin = domainOrHttpsSignal == 's' ? 'https://' + decodeURIComponent(path[3]) : 'http://' + decodeURIComponent(domainOrHttpsSignal);
  // Sanity test that what we found looks like a domain.
  _log.user().assert(origin.indexOf('.') > 0, 'Expected a . in origin %s', origin);
  path.splice(1, domainOrHttpsSignal == 's' ? 3 : 2);
  return origin + path.join('/') + removeAmpJsParams(url.search) + (url.hash || '');
}

/**
 * Returns the source origin of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string} The source origin of the URL.
 */

function getSourceOrigin(url) {
  return parseUrl(getSourceUrl(url)).origin;
}

/**
 * Returns absolute URL resolved based on the relative URL and the base.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 */

function resolveRelativeUrl(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrl(baseUrl);
  }
  if (typeof URL == 'function') {
    return new URL(relativeUrlString, baseUrl.href).toString();
  }
  return resolveRelativeUrlFallback_(relativeUrlString, baseUrl);
}

/**
 * Fallback for URL resolver when URL class is not available.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 * @private Visible for testing.
 */

function resolveRelativeUrlFallback_(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrl(baseUrl);
  }
  relativeUrlString = relativeUrlString.replace(/\\/g, '/');
  var relativeUrl = parseUrl(relativeUrlString);

  // Absolute URL.
  if (relativeUrlString.toLowerCase().indexOf(relativeUrl.protocol) == 0) {
    return relativeUrl.href;
  }

  // Protocol-relative URL.
  if (relativeUrlString.indexOf('//') == 0) {
    return baseUrl.protocol + relativeUrlString;
  }

  // Absolute path.
  if (relativeUrlString.indexOf('/') == 0) {
    return baseUrl.origin + relativeUrlString;
  }

  // Relative path.
  var basePath = baseUrl.pathname.split('/');
  return baseUrl.origin + (basePath.length > 1 ? basePath.slice(0, basePath.length - 1).join('/') : '') + '/' + relativeUrlString;
}

/**
 * Add "__amp_source_origin" query parameter to the URL.
 * @param {!Window} win
 * @param {string} url
 * @return {string}
 */

function getCorsUrl(win, url) {
  checkCorsUrl(url);
  var sourceOrigin = getSourceOrigin(win.location.href);
  return addParamToUrl(url, SOURCE_ORIGIN_PARAM, sourceOrigin);
}

/**
 * Checks if the url have __amp_source_origin and throws if it does.
 * @param {string} url
 */

function checkCorsUrl(url) {
  var parsedUrl = parseUrl(url);
  var query = parseQueryString(parsedUrl.search);
  _log.user().assert(!(SOURCE_ORIGIN_PARAM in query), 'Source origin is not allowed in %s', url);
}

},{"./config":15,"./log":41,"./mode":43,"./string":82,"./types":88}],91:[function(require,module,exports){
exports.__esModule = true;
exports.userNotificationManagerFor = userNotificationManagerFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Factory for amp-user-notification
 */

var _elementService = require('./element-service');

/**
 * @param {!Window} window
 * @return {!Promise<!UserNotificationManager>}
 */

function userNotificationManagerFor(window) {
  return (/** @type {!Promise<!UserNotificationManager>} */_elementService.getElementService(window, 'userNotificationManager', 'amp-user-notification')
  );
}

},{"./element-service":24}],92:[function(require,module,exports){
exports.__esModule = true;
exports.filterSplice = filterSplice;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * A bit like Array#filter, but removes elements that filter false from the
 * array. Returns the filtered items.
 *
 * @param {!Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} filter
 * @return {!Array<T>}
 * @template T
 */

function filterSplice(array, filter) {
  var splice = [];
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (!filter(item, i, array)) {
      splice.push(item);
      array.splice(i, 1);
      i--;
    }
  }
  return splice;
}

},{}],93:[function(require,module,exports){
exports.__esModule = true;
exports.variantForOrNull = variantForOrNull;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _elementService = require('./element-service');

/**
 * Returns a promise for the experiment variants or a promise for null if it is
 * not available on the current page.
 * @param {!Window} win
 * @return {!Promise<?Object<string>>}
 */

function variantForOrNull(win) {
  return (/** @type {!Promise<?Object<string>>} */_elementService.getElementServiceIfAvailable(win, 'variant', 'amp-experiment')
  );
}

},{"./element-service":24}],94:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

/**
 * VideoInterface defines a common video API which any AMP component that plays
 * videos is expected to implement.
 *
 * AMP runtime uses this common API to provide consistent video experience and
 * analytics across all video players.
 *
 * Components implementing this interface must also extend
 * {@link ./base-element.BaseElement} and register with the
 * Video Manager {@link ./service/video-manager-impl.VideoManager} during
 * their `builtCallback`.
 *
 * @interface
 */

var VideoInterface = (function () {
  function VideoInterface() {
    babelHelpers.classCallCheck(this, VideoInterface);
  }

  /**
   * Attributes
   *
   * Components implementing the VideoInterface are expected to support
   * the following attributes.
   *
   * @constant {!Object<string, string>}
   */

  /**
   * Whether the component supports video playback in the current platform.
   * If false, component will be not treated as a video component.
   * @return {boolean}
   */

  VideoInterface.prototype.supportsPlatform = function supportsPlatform() {};

  /**
   * Plays the video..
   *
   * @param {boolean} unusedIsAutoplay Whether the call to the `play` method is
   * triggered by the autoplay functionality. Video players can use this hint
   * to make decisions such as not playing pre-roll video ads.
   */

  VideoInterface.prototype.play = function play(unusedIsAutoplay) {};

  /**
   * Pauses the video.
   */

  VideoInterface.prototype.pause = function pause() {};

  /**
   * Mutes the video.
   */

  VideoInterface.prototype.mute = function mute() {};

  /**
   * Unmutes the video.
   */

  VideoInterface.prototype.unmute = function unmute() {};

  /**
   * Makes the video UI controls visible.
   *
   * AMP will not call this method if `controls` attribute is not set.
   */

  VideoInterface.prototype.showControls = function showControls() {};

  /**
   * Hides the video UI controls.
   *
   * AMP will not call this method if `controls` attribute is not set.
   */

  VideoInterface.prototype.hideControls = function hideControls() {};

  /**
   * Automatically comes from {@link ./base-element.BaseElement}
   *
   * @return {!AmpElement}
   */

  /**
   * Automatically comes from {@link ./base-element.BaseElement}
   *
   * @return {boolean}
   */

  VideoInterface.prototype.isInViewport = function isInViewport() {};

  babelHelpers.createClass(VideoInterface, [{
    key: 'element',
    get: function () {}
  }]);
  return VideoInterface;
})();

exports.VideoInterface = VideoInterface;
var VideoAttributes = {
  /**
   * autoplay
   *
   * Whether the developer has configured autoplay on the component.
   * This is normally done by setting `autoplay` attribute on the component.
   *
   * AMP runtime manages autoplay behaviour itself using methods such as `play`,
   * `pause`, `showControls`, `hideControls`, `mute`, etc.. therefore components
   * should not propagate the autoplay attribute to the underlying player
   * implementation.
   *
   * When a video is requested to autoplay, AMP will automatically
   * mute and hide the controls for the video, when video is 75% visible in
   * the viewport, AMP will play the video and later pauses it when 25%
   * or more of the video exits the viewport. If an auto-playing video also has
   * controls, AMP will install a tap
   * handler on the video, and when an end-user taps the video, AMP will show
   * the controls.
   *
   */
  AUTOPLAY: 'autoplay',

  /**
   * controls
   *
   * Whether the developer has configured the component to show UI controls such
   * as play, pause, etc... buttons.
   * This is normally done by setting `controls` attribute on the component.
   *
   * AMP runtime makes certain assumptions based on the presence of this attribute
   * such as whether to allow end-users to interact with an
   * auto-playing video or not.
   */
  CONTROLS: 'controls'
};

exports.VideoAttributes = VideoAttributes;
/**
 * Events
 *
 * Components implementing the VideoInterface are expected to dispatch
 * the following DOM events.
 *
 * @constant {!Object<string, string>}
 */
var VideoEvents = {
  /**
   * canplay
   *
   * Fired when the video player can start playing the video.
   * Normally fired from `layoutCallback`.
   *
   * @event canplay
   */
  CANPLAY: 'canplay',

  /**
   * amp:video:visibility
   *
   * Fired when the video's visibility changes. Normally fired
   * from `viewportCallback`.
   *
   * @event amp:video:visibility
   * @property {boolean} visible Whether the video player is visible or not.
   */
  VISIBILITY: 'amp:video:visibility'
};
exports.VideoEvents = VideoEvents;

},{}],95:[function(require,module,exports){
exports.__esModule = true;
exports.videoManagerForDoc = videoManagerForDoc;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/video-manager-impl.VideoManager}
 */

function videoManagerForDoc(nodeOrDoc) {
  return (/** @type {!./service/video-manager-impl.VideoManager} */_service.getExistingServiceForDoc(nodeOrDoc, 'video-manager')
  );
}

;

},{"./service":56}],96:[function(require,module,exports){
exports.__esModule = true;
exports.viewerFor = viewerFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/viewer-impl.Viewer}
 */

function viewerFor(window) {
  return (/** @type {!./service/viewer-impl.Viewer} */_service.getExistingServiceForWindow(window, 'viewer')
  );
}

;

},{"./service":56}],97:[function(require,module,exports){
exports.__esModule = true;
exports.viewportFor = viewportFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/viewport-impl.Viewport}
 */

function viewportFor(window) {
  return (/** @type {!./service/viewport-impl.Viewport} */_service.getExistingServiceForWindow(window, 'viewport')
  );
}

;

},{"./service":56}],98:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

/**
 * Visibility state of the AMP document.
 * @enum {string}
 */
var VisibilityState = {
  /**
   * The AMP document is being pre-rendered before being shown.
   */
  PRERENDER: 'prerender',

  /**
   * The AMP document is currently active and visible.
   */
  VISIBLE: 'visible',

  /**
   * The AMP document is active but the browser tab or AMP app is not.
   */
  HIDDEN: 'hidden',

  /**
   * The AMP document is visible, but the user has started swiping away from
   * it. The runtime may stop active playback.
   */
  PAUSED: 'paused',

  /**
   * The AMP document is no longer active because the user swiped away or
   * closed the viewer. The document may become visible again later.
   */
  INACTIVE: 'inactive'
};
exports.VisibilityState = VisibilityState;

},{}],99:[function(require,module,exports){
exports.__esModule = true;
exports.vsyncFor = vsyncFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/vsync-impl.Vsync}
 */

function vsyncFor(window) {
  return (/** @type {!./service/vsync-impl.Vsync} */_service.getExistingServiceForWindow(window, 'vsync')
  );
}

;

},{"./service":56}],100:[function(require,module,exports){
(function (global){
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  };

  babelHelpers.get = function get(_x, _x2, _x3) {
    var _again = true;

    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;

      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    obj[key] = value;
  };
})(typeof global === "undefined" ? self : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],101:[function(require,module,exports){
exports.__esModule = true;
exports.cssEscape = cssEscape;
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */

/**
 * https://drafts.csswg.org/cssom/#serialize-an-identifier
 * @param {string} value
 * @return {string}
 */

function cssEscape(value) {
	if (arguments.length == 0) {
		throw new TypeError('`CSS.escape` requires an argument.');
	}
	var string = String(value);
	var length = string.length;
	var index = -1;
	var codeUnit;
	var result = '';
	var firstCodeUnit = string.charCodeAt(0);
	while (++index < length) {
		codeUnit = string.charCodeAt(index);
		// Note: there’s no need to special-case astral symbols, surrogate
		// pairs, or lone surrogates.

		// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
		// (U+FFFD).
		if (codeUnit == 0x0000) {
			result += '\uFFFD';
			continue;
		}

		if (
		// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
		// U+007F, […]
		codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F ||
		// If the character is the first character and is in the range [0-9]
		// (U+0030 to U+0039), […]
		index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
		// If the character is the second character and is in the range [0-9]
		// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
		index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D) {
			// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
			result += '\\' + codeUnit.toString(16) + ' ';
			continue;
		}

		if (
		// If the character is the first character and is a `-` (U+002D), and
		// there is no second character, […]
		index == 0 && length == 1 && codeUnit == 0x002D) {
			result += '\\' + string.charAt(index);
			continue;
		}

		// If the character is not handled by one of the above rules and is
		// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
		// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
		// U+005A), or [a-z] (U+0061 to U+007A), […]
		if (codeUnit >= 0x0080 || codeUnit == 0x002D || codeUnit == 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
			// the character itself
			result += string.charAt(index);
			continue;
		}

		// Otherwise, the escaped character.
		// https://drafts.csswg.org/cssom/#escape-a-character
		result += '\\' + string.charAt(index);
	}
	return result;
}

},{}],102:[function(require,module,exports){
exports.__esModule = true;
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/*
  This is a limited shim for ShadowDOM css styling.
  https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles

  The intention here is to support only the styling features which can be
  relatively simply implemented. The goal is to allow users to avoid the
  most obvious pitfalls and do so without compromising performance significantly.
  For ShadowDOM styling that's not covered here, a set of best practices
  can be provided that should allow users to accomplish more complex styling.

  The following is a list of specific ShadowDOM styling features and a brief
  discussion of the approach used to shim.

  Shimmed features:

  * :host, :host-context: ShadowDOM allows styling of the shadowRoot's host
  element using the :host rule. To shim this feature, the :host styles are
  reformatted and prefixed with a given scope name and promoted to a
  document level stylesheet.
  For example, given a scope name of .foo, a rule like this:

    :host {
        background: red;
      }
    }

  becomes:

    .foo {
      background: red;
    }

  * encapsultion: Styles defined within ShadowDOM, apply only to
  dom inside the ShadowDOM. Polymer uses one of two techniques to imlement
  this feature.

  By default, rules are prefixed with the host element tag name
  as a descendant selector. This ensures styling does not leak out of the 'top'
  of the element's ShadowDOM. For example,

  div {
      font-weight: bold;
    }

  becomes:

  x-foo div {
      font-weight: bold;
    }

  becomes:


  Alternatively, if WebComponents.ShadowCSS.strictStyling is set to true then
  selectors are scoped by adding an attribute selector suffix to each
  simple selector that contains the host element tag name. Each element
  in the element's ShadowDOM template is also given the scope attribute.
  Thus, these rules match only elements that have the scope attribute.
  For example, given a scope name of x-foo, a rule like this:

    div {
      font-weight: bold;
    }

  becomes:

    div[x-foo] {
      font-weight: bold;
    }

  Note that elements that are dynamically added to a scope must have the scope
  selector added to them manually.

  * upper/lower bound encapsulation: Styles which are defined outside a
  shadowRoot should not cross the ShadowDOM boundary and should not apply
  inside a shadowRoot.

  This styling behavior is not emulated. Some possible ways to do this that
  were rejected due to complexity and/or performance concerns include: (1) reset
  every possible property for every possible selector for a given scope name;
  (2) re-implement css in javascript.

  As an alternative, users should make sure to use selectors
  specific to the scope in which they are working.

  * ::distributed: This behavior is not emulated. It's often not necessary
  to style the contents of a specific insertion point and instead, descendants
  of the host element can be styled selectively. Users can also create an
  extra node around an insertion point and style that node's contents
  via descendent selectors. For example, with a shadowRoot like this:

    <style>
      ::content(div) {
        background: red;
      }
    </style>
    <content></content>

  could become:

    <style>
      / *@polyfill .content-container div * /
      ::content(div) {
        background: red;
      }
    </style>
    <div class="content-container">
      <content></content>
    </div>

  Note the use of @polyfill in the comment above a ShadowDOM specific style
  declaration. This is a directive to the styling shim to use the selector
  in comments in lieu of the next selector when running under polyfill.
*/

var ShadowCSS = {
  strictStyling: false,
  // change a selector like 'div' to 'name div'
  /** @this {ShadowCSS} */
  scopeRules: function (cssRules, scopeSelector, opt_transformer) {
    var cssText = '';
    if (cssRules) {
      Array.prototype.forEach.call(cssRules, function (rule) {
        if (rule.selectorText && rule.style && rule.style.cssText !== undefined) {
          cssText += this.scopeSelector(rule.selectorText, scopeSelector, this.strictStyling, opt_transformer) + ' {\n\t';
          cssText += this.propertiesFromRule(rule) + '\n}\n\n';
        } else if (rule.type === CSSRule.MEDIA_RULE) {
          cssText += '@media ' + rule.media.mediaText + ' {\n';
          cssText += this.scopeRules(rule.cssRules, scopeSelector);
          cssText += '\n}\n\n';
        } else {
          // KEYFRAMES_RULE in IE throws when we query cssText
          // when it contains a -webkit- property.
          // if this happens, we fallback to constructing the rule
          // from the CSSRuleSet
          // https://connect.microsoft.com/IE/feedbackdetail/view/955703/accessing-csstext-of-a-keyframe-rule-that-contains-a-webkit-property-via-cssom-generates-exception
          try {
            if (rule.cssText) {
              cssText += rule.cssText + '\n\n';
            }
          } catch (x) {
            if (rule.type === CSSRule.KEYFRAMES_RULE && rule.cssRules) {
              cssText += this.ieSafeCssTextFromKeyFrameRule(rule);
            }
          }
        }
      }, this);
    }
    return cssText;
  },
  /** @this {ShadowCSS} */
  ieSafeCssTextFromKeyFrameRule: function (rule) {
    var cssText = '@keyframes ' + rule.name + ' {';
    Array.prototype.forEach.call(rule.cssRules, function (rule) {
      cssText += ' ' + rule.keyText + ' {' + rule.style.cssText + '}';
    });
    cssText += ' }';
    return cssText;
  },
  /** @this {ShadowCSS} */
  scopeSelector: function (selector, scopeSelector, strict, opt_transformer) {
    var r = [],
        parts = selector.split(',');
    parts.forEach(function (p) {
      p = p.trim();
      if (opt_transformer) {
        p = opt_transformer(p);
      }
      if (this.selectorNeedsScoping(p, scopeSelector)) {
        p = strict && !p.match(polyfillHostNoCombinator) ? this.applyStrictSelectorScope(p, scopeSelector) : this.applySelectorScope(p, scopeSelector);
      }
      r.push(p);
    }, this);
    return r.join(', ');
  },
  /** @this {ShadowCSS} */
  selectorNeedsScoping: function (selector, scopeSelector) {
    if (Array.isArray(scopeSelector)) {
      return true;
    }
    var re = this.makeScopeMatcher(scopeSelector);
    return !selector.match(re);
  },
  /** @this {ShadowCSS} */
  makeScopeMatcher: function (scopeSelector) {
    scopeSelector = scopeSelector.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
    return new RegExp('^(' + scopeSelector + ')' + selectorReSuffix, 'm');
  },
  /** @this {ShadowCSS} */
  applySelectorScope: function (selector, selectorScope) {
    return Array.isArray(selectorScope) ? this.applySelectorScopeList(selector, selectorScope) : this.applySimpleSelectorScope(selector, selectorScope);
  },
  // apply an array of selectors
  /** @this {ShadowCSS} */
  applySelectorScopeList: function (selector, scopeSelectorList) {
    var r = [];
    for (var i = 0, s; s = scopeSelectorList[i]; i++) {
      r.push(this.applySimpleSelectorScope(selector, s));
    }
    return r.join(', ');
  },
  // scope via name and [is=name]
  /** @this {ShadowCSS} */
  applySimpleSelectorScope: function (selector, scopeSelector) {
    if (selector.match(polyfillHostRe)) {
      selector = selector.replace(polyfillHostNoCombinator, scopeSelector);
      return selector.replace(polyfillHostRe, scopeSelector + ' ');
    } else {
      return scopeSelector + ' ' + selector;
    }
  },
  // return a selector with [name] suffix on each simple selector
  // e.g. .foo.bar > .zot becomes .foo[name].bar[name] > .zot[name]
  /** @this {ShadowCSS} */
  applyStrictSelectorScope: function (selector, scopeSelector) {
    scopeSelector = scopeSelector.replace(/\[is=([^\]]*)\]/g, '$1');
    var splits = [' ', '>', '+', '~'],
        scoped = selector,
        attrName = '[' + scopeSelector + ']';
    splits.forEach(function (sep) {
      var parts = scoped.split(sep);
      scoped = parts.map(function (p) {
        // remove :host since it should be unnecessary
        var t = p.trim().replace(polyfillHostRe, '');
        if (t && splits.indexOf(t) < 0 && t.indexOf(attrName) < 0) {
          p = t.replace(/([^:]*)(:*)(.*)/, '$1' + attrName + '$2$3');
        }
        return p;
      }).join(sep);
    });
    return scoped;
  },
  /** @this {ShadowCSS} */
  propertiesFromRule: function (rule) {
    var cssText = rule.style.cssText;
    // TODO(sorvell): Safari cssom incorrectly removes quotes from the content
    // property. (https://bugs.webkit.org/show_bug.cgi?id=118045)
    // don't replace attr rules
    if (rule.style.content && !rule.style.content.match(/['"]+|attr/)) {
      cssText = cssText.replace(/content:[^;]*;/g, 'content: \'' + rule.style.content + '\';');
    }
    // TODO(sorvell): we can workaround this issue here, but we need a list
    // of troublesome properties to fix https://github.com/Polymer/platform/issues/53
    //
    // inherit rules can be omitted from cssText
    // TODO(sorvell): remove when Blink bug is fixed:
    // https://code.google.com/p/chromium/issues/detail?id=358273
    var style = rule.style;
    for (var i in style) {
      if (style[i] === 'initial') {
        cssText += i + ': initial; ';
      }
    }
    return cssText;
  }
};

exports.ShadowCSS = ShadowCSS;
var selectorRe = /([^{]*)({[\s\S]*?})/gim,
    cssCommentRe = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,

// TODO(sorvell): remove either content or comment
cssCommentNextSelectorRe = /\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,
    cssContentNextSelectorRe = /polyfill-next-selector[^}]*content\:[\s]*?['"](.*?)['"][;\s]*}([^{]*?){/gim,

// TODO(sorvell): remove either content or comment
cssCommentRuleRe = /\/\*\s@polyfill-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,
    cssContentRuleRe = /(polyfill-rule)[^}]*(content\:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim,

// TODO(sorvell): remove either content or comment
cssCommentUnscopedRuleRe = /\/\*\s@polyfill-unscoped-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,
    cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content\:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim,
    cssPseudoRe = /::(x-[^\s{,(]*)/gim,
    cssPartRe = /::part\(([^)]*)\)/gim,

// note: :host pre-processed to -shadowcsshost.
polyfillHost = '-shadowcsshost',

// note: :host-context pre-processed to -shadowcsshostcontext.
polyfillHostContext = '-shadowcsscontext',
    parenSuffix = ')(?:\\((' + '(?:\\([^)(]*\\)|[^)(]*)+?' + ')\\))?([^,{]*)';
var cssColonHostRe = new RegExp('(' + polyfillHost + parenSuffix, 'gim'),
    cssColonHostContextRe = new RegExp('(' + polyfillHostContext + parenSuffix, 'gim'),
    selectorReSuffix = '([>\\s~+\[.,{:][\\s\\S]*)?$',
    colonHostRe = /\:host/gim,
    colonHostContextRe = /\:host-context/gim,

/* host name without combinator */
polyfillHostNoCombinator = polyfillHost + '-no-combinator',
    polyfillHostRe = new RegExp(polyfillHost, 'gim'),
    polyfillHostContextRe = new RegExp(polyfillHostContext, 'gim'),
    shadowDOMSelectorsRe = [/>>>/g, /::shadow/g, /::content/g,
// Deprecated selectors
/\/deep\//g, // former >>>
/\/shadow\//g, // former ::shadow
/\/shadow-deep\//g, // former /deep/
/\^\^/g, // former /shadow/
/\^(?!=)/g // former /shadow-deep/
];

},{}]},{},[9])

//# sourceMappingURL=amp-shadow.js.map