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

(window.AMP = window.AMP || []).push(function(AMP) {

function log(s) {
  console.error(s);
}

function inherits(childCtor, parentCtor) {
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;

  childCtor.base = function(me, methodName, var_args) {
    var args = new Array(arguments.length - 2);
    for (var i = 2; i < arguments.length; i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
}


function AmpLogin(element) {
  AmpLogin.base(this, 'constructor', element);
}
inherits(AmpLogin, AMP.BaseElement);


AmpLogin.prototype.isLayoutSupported = function() {
  return true;
};

AmpLogin.prototype.buildCallback = function() {
  this.element.onclick = this.startLogin_.bind(this);
};

AmpLogin.prototype.startLogin_ = function() {
  log('Open login dialog');
  var w = Math.floor(Math.min(700, screen.width * 0.9));
  var h = Math.floor(Math.min(450, screen.height * 0.9));
  var x = Math.floor((screen.width - w) / 2);
  var y = Math.floor((screen.height - h) / 2);
  log('w = ' + w + ', h = ' + h + ', x = ' + x + ', y = ' + y);

  var loginUrl = '/client/amp-login.html';

  // TODO: read it from URL.
  var targetBase = 'http://pub.localhost:8002';
  var targetUrl = targetBase + this.element.getAttribute('href');
  loginUrl += '?redirect=' + encodeURIComponent(targetUrl);
  log('Login URL: ' + loginUrl);

  try {
    this.loginDialog = window.open(loginUrl,
      '_blank',
      'height=' + h + ',width=' + w +
      ',left=' + x + ',top=' + y);
    log('Login dialog: ' + this.loginDialog + '; ' +
        (this.loginDialog == window));
  } catch (e) {
    log('Failed to open login dialog: ' + e);
    return;
  }

  this.loginDialog.onbeforeunload = function() {
    log('Login dialog window unloaded!');
    // log('- href: ' + this.loginDialog.location.hash);
  }

  var origin = location.protocol + '//' + location.host;

  this.heartbeatInterval = setInterval(function() {
    log('Heartbeat: ' + this.loginDialog.closed);
    if (this.loginDialog.closed) {
      this.loginDone_(false);
    } else {
      this.loginDialog.postMessage({type: 'heartbeat'}, origin);
    }
  }.bind(this), 1000);

  window.addEventListener('message', function(e) {
    if (e.origin != origin) {
      return;
    }
    log('Got window message from ' + e.origin + ': ' +
        JSON.stringify(e.data));
    if (e.data && e.data.type == 'login-ok') {
      this.loginDone_(true, e.data.authToken);
    }
  }.bind(this));
};


AmpLogin.prototype.loginDone_ = function(success, authToken) {
  log('Login done: ' + success);
  if (this.heartbeatInterval) {
    clearInterval(this.heartbeatInterval);
  }
  if (this.loginDialog) {
    try {
      this.loginDialog.close();
    } catch (e) {
      log('Failed to close dialog: ' + e);
    }
    this.loginDialog = null;
  }

  if (success && !this.saved) {
    this.saved = true;
    saveAuthToken(authToken, function() {
      log('Save auth successfull! Reload!');
      window.location.reload(true);
    }, function(error) {
      log('Save auth failed: ' + error);
    });
  }
};


function saveAuthToken(authToken, callback, errback) {
  var postUrl = '/saveauth?authtoken=' + encodeURIComponent(authToken) +
      '&url=' + encodeURIComponent(location.href);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', postUrl);
  xhr.onreadystatechange = () => {
    if (xhr.readyState < /* STATUS_RECEIVED */ 2) {
      return;
    }
    if (xhr.status < 100 || xhr.status > 599) {
      xhr.onreadystatechange = null;
      errback(new Error('Unknown HTTP status: ' + xhr.status));
      return;
    }
    if (xhr.readyState == /* COMPLETE */ 4) {
      if (xhr.status == 200 || xhr.status == 204) {
        callback();
      } else {
        errback(new Error('HTTP error: ' + xhr.status));
      }
    }
  };
  xhr.onerror = () => {
    errback(new Error('Network failure'));
  };
  xhr.onabort = () => {
    errback(new Error('Request aborted'));
  };
  xhr.send();
}




AMP.registerElement('amp-login', AmpLogin);
});
