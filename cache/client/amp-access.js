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
  // TODO(dvoytenko): This is most likely to become the part of the runtime or
  // a separate extension.

  // Install styles. Default is that any "amp-access" section that is not
  // whitelisted using "amp-access-on" is set to display:none. This
  // is equivalent to removing the node from DOM or not sending it over from
  // cache. The section is shown by setting the same "amp-access-on"
  // attribute.
  // Notice, that only "display:none" is used. This is important since the
  // CSS display of the section could be any allowed display value.
  (function() {
    var style = document.createElement('style');
    style.textContent = (
      '[amp-access]:not([amp-access-on]) {display: none};' +
      '');
    document.head.appendChild(style);
  })();

  var STORAGE_ID = 'amp-access';

  function ClientAuth() {
    var accessStruct;
    var accessStructVal = window.localStorage.getItem(STORAGE_ID);
    if (accessStructVal) {
      accessStruct = JSON.parse(accessStructVal);
    } else {
      accessStruct = {
        readerId: 'aaaaaa-aaa'.replace(/a/g, function() {
          var r = Math.round(Math.random() * 16) % 16;
          return r.toString(16);
        })
      };
      window.localStorage.setItem(STORAGE_ID, JSON.stringify(accessStruct));
    }
    this.accessStruct_ = accessStruct;
    this.readerId_ = accessStruct.readerId;
    console.log('Reader ID: ', this.readerId_);

    this.accessMeta_ = getAccessMeta();
    console.log('access meta:', this.accessMeta_);

    this.setupLoginLinks_();
  }

  ClientAuth.prototype.getPubId_ = function() {
    // TODO(dvoytenko): This is likely not a good idea. Instead, we just need
    // to parse the URL format. Additionally, we can allow customization via
    // "AMP-Access" meta.
    return parseUrl(this.accessMeta_.authorization).host;
  };

  ClientAuth.prototype.start = function() {
    document.body.classList.toggle('amp-access-loading', true);

    if (this.accessMeta_.type == 'server') {
      this.startServer();
      return;
    }

    console.log('Client auth');

    this.fetchCors_().then(function(accessData) {
      this.makeAccessDecision_(accessData);
    }.bind(this), function(error) {
      console.error('Access request failed: ', error);
      document.body.classList.toggle('amp-access-loading', false);
    });
  };

  ClientAuth.prototype.startServer = function() {
    console.log('Server auth');

    // TODO(dvoytenko): apply optimistic data
    // TODO(dvoytenko): implement autologin

    this.fetchServer_().then(this.mergeServer_.bind(this), function(error) {
      console.error('Server access request failed: ', error);
      document.body.classList.toggle('amp-access-loading', false);
    });
  };


  /**
   * Handlers the access response from AMP Cache. The result contains the
   * publisher's access data as well as content of sections enabled by this
   * access data.
   * @param {!{accessData: !JSON, sections: !Object<string, string>}} response
   */
  ClientAuth.prototype.mergeServer_ = function(response) {
    console.log('Merge server response: ', response);

    // Merge the content arriving from the server.
    if (response.sections) {
      for (var k in response.sections) {
        var container = document.querySelector('[amp-access-id="' + k + '"]');
        if (!container) {
          console.error('Cannot find section: ', k);
          continue;
        }
        container.innerHTML = response.sections[k];
      }
    }

    // Common steps to complete access response.
    this.makeAccessDecision_(response.accessData);
    this.setupLoginLinks_();
  };

  ClientAuth.prototype.makeAccessDecision_ = function(accessData) {
    console.log('Access data: ', accessData);
    var elements = document.querySelectorAll('[amp-access]');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].tagName == 'META') {
        continue;
      }
      this.applyAccess_(elements[i], accessData);
    }
    document.body.classList.toggle('amp-access-loading', false);
  };

  ClientAuth.prototype.applyAccess_ = function(element, accessData) {
    var expr = element.getAttribute('amp-access');
    var on = this.checkExpr_(expr, accessData);

    var promise = Promise.resolve(element);

    if (on) {
      // TODO(dvoytenko): this is more of a "alert/dialog/popup" functionality.
      // Possibly we can reuse something from upcoming live alerts.
      // Currently the conventions are:
      // 1. A descendant with a "close" attribute is a closing element: the
      //    element will be removed if it's clicked.
      // 2. A descendant "template" element with the "amp-access-template" will
      //    be rendered using `accessData` response object.

      var closeButton = element.querySelector('[close]');
      if (closeButton) {
        closeButton.onclick = function(element) {
          console.log('Close element: ', element);
          element.parentElement.removeChild(element);
        }.bind(this, element);
      }

      var templateElement = element.querySelector(
          'template[amp-access-template]');
      if (templateElement) {
        promise = this.applyTemplate_(templateElement, accessData);
      }
    }

    promise.then(function() {
      // Sets the correct and final access state. See CSS definitions above
      // for more details.
      if (on) {
        element.setAttribute('amp-access-on', '');
      } else {
        element.removeAttribute('amp-access-on');
      }
    });
  };

  ClientAuth.prototype.applyTemplate_ = function(templateElement, accessData) {
    return templates().then(function(templates) {
      return templates.renderTemplate(templateElement, accessData);
    }).then(function(result) {
      if (templateElement.parentElement) {
        templateElement.parentElement.replaceChild(result, templateElement);
      }
    });
  };

  ClientAuth.prototype.checkExpr_ = function(expr, accessData) {
    // TODO(dvoytenko): proper expression evaluator
    const hasAccess = accessData.access;
    if (expr == 'access = true') {
      return hasAccess;
    }
    if (expr == 'access = false') {
      return !hasAccess;
    }
    if (expr == 'views <= maxViews') {
      return (accessData.views <= accessData.maxViews);
    }
    return false;
  };


  ClientAuth.prototype.getPubReaderId_ = function() {
    // TODO(dvoytenko): hash(readerId,pubId)
    return 'SHA_' + this.getPubId_() + ':' + this.readerId_;
  };

  ClientAuth.prototype.fetchCors_ = function() {
    var url = parseUrl(this.accessMeta_.authorization);
    var urlString = url.href + '?rid=' + encodeURIComponent(
        this.getPubReaderId_());
    console.log('Authorization URL: ', urlString);
    return fetch(urlString, {credentials: 'include'}).then(function(response) {
      return response.json();
    });
  };

  ClientAuth.prototype.fetchServer_ = function() {
    var urlString = '/serveraccess' +
        '?rid=' + encodeURIComponent(this.readerId_) +
        '&url=' + encodeURIComponent(window.location.href);
    console.log('Access content: ', urlString);
    return fetch(urlString).then(function(response) {
      return response.json();
    });
  };

  ClientAuth.prototype.setupLoginLinks_ = function() {
    var links = document.querySelectorAll('a[on="tap1:amp-access.login"]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].onclick) {
        continue;
      }
      console.log('- instrument link:', links[i]);
      links[i].onclick = this.lauchLoginDialog_.bind(this);
    }
  };

  ClientAuth.prototype.lauchLoginDialog_ = function() {
    this.loginFlow_ = new LoginFlow(this.getPubReaderId_(), this.accessMeta_);
    this.loginFlow_.start();
  };


  var LoginFlow = function(readerId, meta) {
    /** @private {string} */
    this.readerId = readerId;
    /** @private {!{login: string}} */
    this.meta = meta;
    /** @private {?Window} */
    this.loginDialog = null;
    /** @private {?number} */
    this.heartbeatInterval = null;
    /** @private {boolean} */
    this.complete = false;
  }

  LoginFlow.prototype.start = function() {
    console.log('Open login dialog');
    var w = Math.floor(Math.min(700, screen.width * 0.9));
    var h = Math.floor(Math.min(450, screen.height * 0.9));
    var x = Math.floor((screen.width - w) / 2);
    var y = Math.floor((screen.height - h) / 2);
    console.log('w = ' + w + ', h = ' + h + ', x = ' + x + ', y = ' + y);

    var loginUrl = '/client/amp-login.html';

    var targetUrl = this.meta.login;
    loginUrl += '?redirect=' + encodeURIComponent(targetUrl);
    loginUrl += '&rid=' + encodeURIComponent(this.readerId);
    console.log('Login URL: ' + loginUrl);

    try {
      this.loginDialog = window.open(loginUrl,
        '_blank',
        'height=' + h + ',width=' + w +
        ',left=' + x + ',top=' + y);
      console.log('Login dialog: ' + this.loginDialog + '; ' +
          (this.loginDialog == window));
    } catch (e) {
      console.log('Failed to open login dialog: ' + e);
      return;
    }

    this.loginDialog.onbeforeunload = function() {
      console.log('Login dialog window unloaded!');
      // console.log('- href: ' + this.loginDialog.location.hash);
    }

    var origin = location.protocol + '//' + location.host;

    this.heartbeatInterval = setInterval(function() {
      console.log('Heartbeat: ' + this.loginDialog.closed);
      if (this.loginDialog.closed) {
        this.loginDone_(false);
      } else {
        this.loginDialog.postMessage({type: 'heartbeat'}, origin);
      }
    }.bind(this), 3000);

    window.addEventListener('message', function(e) {
      if (e.origin != origin) {
        return;
      }
      console.log('Got window message from ' + e.origin + ': ' +
          JSON.stringify(e.data));
      if (e.data && e.data.type == 'login-ok') {
        this.loginDone_(true, e.data.response);
      }
    }.bind(this));
  };

  LoginFlow.prototype.loginDone_ = function(complete, response) {
    console.log('Login done: ', complete, response);
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    if (this.loginDialog) {
      try {
        this.loginDialog.close();
      } catch (e) {
        console.error('Failed to close dialog: ', e);
      }
      this.loginDialog = null;
    }

    if (complete && !this.complete) {
      this.complete = true;

      // TODO(dvoytenko): reload is not necessary - simply re-apply access.
      console.log('Save auth successfull! Reload!');
      window.location.reload(true);
    }
  };


  function getAccessMeta() {
    var el = document.querySelector(
        'meta[name=amp-access],meta[http-equiv=amp-access]');
    if (!el) {
      throw new Error('No access metadata');
    }
    var meta = el.getAttribute('content');
    var access = {};
    // TODO: What if URLs contain semicolons?
    var params = meta.split(';');
    params.forEach(function(param) {
      if (!param) {
        return;
      }
      var index = param.indexOf('=');
      if (index <= 0) {
        return;
      }
      access[param.substring(0, index).trim()] =
          param.substring(index + 1).trim();
    });
    return access;
  }

  function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      href: a.href,
      protocol: a.protocol,
      host: a.host,
      hostname: a.hostname,
      port: a.port == '0' ? '' : a.port,
      pathname: a.pathname,
      search: a.search,
      hash: a.hash
    };
  }

  function templates() {
    // TODO(dvoytenko): can be removed once the runtime is fixed.
    var interval;
    return new Promise(function(resolve, reject) {
      interval = setInterval(function() {
        if (window.services.templates) {
          clearInterval(interval);
          resolve(window.services.templates.obj);
        }
      }, 100);
    });
  }

  var clientAuth_ = new ClientAuth();
  clientAuth_.start();
});
