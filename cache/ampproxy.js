'use strict';
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


var accessdb = require('./accessdb');
var consts = require('./consts');
var htmlparser = require('htmlparser2');
var http = require('http');
var readerIdService = require('./readeridservice');
var urlModule = require('url');
var util = require('./util');


/**
 * Transforms and proxies AMP document response. It does several key things:
 * 1. It verifies the access rights to this document.
 * 2. If access cannot be confirmed or denied, the preview version is rendered.
 * 3. Otherwise the full version is rendered.
 */
class AmpProxy {

  constructor() {
  }

  /**
   * Handles AMP proxy requests.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @param {!Metadata} metadata
   * @param {string} html
   */
  proxy(req, resp, origin, metadata, html) {
    console.log('Handle AMP proxy: ', req.path);

    const contentType = 'text/html';

    let accessSpec = util.getAccessSpec(metadata);
    console.log('---- access spec: ', accessSpec);

    // No access spec - no restrictions, serve as is.
    if (!accessSpec) {
      console.log('---- NO ACCESS SPEC');
      resp.writeHead(200, {'Content-Type': contentType});
      resp.write(html);
      resp.end();
      return;
    }

    // Client access control - proxy document as is and let the client deal
    // with it.
    if (accessSpec.type == 'client') {
      console.log('---- proxy with client access');
      resp.writeHead(200, {'Content-Type': contentType});
      this.proxyWithClientAccess_(req, html, metadata, accessSpec, resp);
      return;
    }

    // Server access control - proxy document while applying the immediate
    // rules.
    if (accessSpec.type == 'server') {
      console.log('---- proxy with server access');
      resp.writeHead(200, {'Content-Type': contentType});
      this.proxyWithServerAccess_(req, html, metadata, accessSpec, resp);
      return;
    }

    resp.writeHead(403);
    resp.end();
  }

  /**
   * Handles AMP "server access" requests. The response contains the publisher's
   * "accessData" and the content of each section enabled by the access
   * response.
   * @param {string} service
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @param {!Metadata} metadata
   * @param {string} html
   */
  serverService(service, req, resp, origin, metadata, html) {
    console.log('Handle AMP server access: ', req.path);

    const readerId = req.query['rid'];
    console.log('---- reader id: ', readerId);
    if (!readerId) {
      console.log('---- NO READER ID');
      resp.writeHead(400);
      resp.end();
      return;
    }

    const accessSpec = util.getAccessSpec(metadata);
    console.log('---- access spec: ', accessSpec);
    if (!accessSpec) {
      console.log('---- NO ACCESS SPEC');
      resp.writeHead(404);
      resp.end();
      return;
    }

    const sectionsLoaded = {};
    if (req.query['sections']) {
      req.query['sections'].split(',').forEach(function(section) {
        sectionsLoaded[section] = true;
      });
    }

    // Server access control - proxy document while applying the immediate
    // rules.
    if (accessSpec.type == 'server') {
      console.log('---- query and return server access response');
      // TODO(dvoytenko): store and use an optimistic response if/when allowed.
      const serviceUrl = service == 'ping' ? accessSpec.ping : accessSpec.rpc;
      this.fetchService_(serviceUrl, readerId).then(accessData => {
        accessData['isView'] = (service == 'ping');
        this.processServerService_(service, req, html, metadata, accessSpec,
            accessData, sectionsLoaded, resp);
      }, error => {
        console.log('---- Access RPC FAILED: ', error);
        resp.writeHead(500);
        resp.end();
      });
      return;
    }

    resp.writeHead(404);
    resp.end();
  }

  /**
   * @param {!Request} req
   * @param {string} html
   * @param {!Metadata} metadata
   * @param {!AccessSpec} accessSpec
   * @param {!http.ServerResponse} resp
   * @private
   */
  proxyWithServerAccess_(req, html, metadata, accessSpec, resp) {
    const that = this;
    let inAccessSection = 0;
    // TODO(dvoytenko): This is a rather week ID system. We can add some path
    // information instead or even require publishers to specify one.
    let accessIdCounter = 0;
    let parser = new htmlparser.Parser({
      onopentag: function(name, attrs) {
        if (inAccessSection) {
          inAccessSection++;
          return;
        }
        // This code is a server-side analogy of:
        // `[amp-access]:not([amp-access-on]) {display: none}`
        // The sections with "amp-access" are not sent to the client by
        // default, unless there's also "amp-access-on" specified.
        // The section tag itself is always sent with the calculated ID.
        let accessId = null;
        if (attrs && attrs['amp-access'] !== undefined &&
                attrs['amp-access-on'] === undefined) {
          accessId = 'A' + (++accessIdCounter);
          inAccessSection = 1;
        }
        resp.write('<');
        resp.write(name);
        if (attrs) {
          for (let k in attrs) {
            resp.write(' ');
            resp.write(k);
            if (attrs[k] !== '') {
              resp.write('="');
              resp.write(attrs[k]);
              resp.write('"');
            }
          }
        }
        if (accessId) {
          resp.write(' amp-access-id="');
          resp.write(accessId);
          resp.write('"');
        }
        resp.write('>');
      },
      onclosetag: function(name) {
        if (inAccessSection) {
          inAccessSection--;
        }
        if (inAccessSection) {
          return;
        }
        if (name == 'head') {
          // Inject amp-login extension.
          resp.write('<script async custom-element="amp-login"' +
              ' src="/client/amp-login.js"></script>');
          resp.write('<script async' +
              ' src="/client/amp-access.js"></script>');
        }
        resp.write('</');
        resp.write(name);
        resp.write('>');
      },
      ontext: function(text) {
        if (inAccessSection) {
          return;
        }
        resp.write(text);
      },
      oncomment: function(text) {
        if (inAccessSection) {
          return;
        }
        resp.write('<!--');
        resp.write(text);
        resp.write('-->');
      },
    }, {decodeEntities: false});
    parser.write(html);
    parser.end();
    resp.end();
  }

  /**
   * @param {string} service
   * @param {!Request} req
   * @param {string} html
   * @param {!Metadata} metadata
   * @param {!AccessSpec} accessSpec
   * @param {!JSON} accessData
   * @param {!Object<string, boolean>} sectionsLoaded
   * @param {!http.ServerResponse} resp
   * @private
   */
  processServerService_(service, req, html, metadata, accessSpec, accessData,
      sectionsLoaded, resp) {
    console.log('---- return server access response for ', accessData,
        sectionsLoaded);
    resp.writeHead(200, {'Content-Type': 'application/json'});

    const result = {};
    result['accessData'] = accessData;
    result['sections'] = {};

    // This is symmetric to the processing in the proxyWithServerAccess_. It's
    // important that the resulting IDs match.
    const that = this;
    let accessIdCounter = 0;
    let inAccessSection = 0;
    let outputting = false;
    let buffer = '';
    let accessId = null;
    let parser = new htmlparser.Parser({
      onopentag: function(name, attrs) {
        if (!inAccessSection) {
          if (attrs && attrs['amp-access'] !== undefined) {
            accessId = 'A' + (++accessIdCounter);
            inAccessSection = 1;
            if (sectionsLoaded[accessId]) {
              console.log('---- section: ', accessId, 'already loaded');
            } else {
              console.log('---- section: ', accessId, attrs['amp-access'],
                  that.checkExpr_(attrs['amp-access'], accessData));
              if (that.checkExpr_(attrs['amp-access'], accessData)) {
                outputting = true;
              }
            }
          }
        } else {
          inAccessSection++;
        }
        if (inAccessSection <= 1 || !outputting) {
          // Don't output the node itself - it's already on the client.
          return;
        }
        buffer += '<' + name;
        if (attrs) {
          for (let k in attrs) {
            buffer += ' ' + k;
            if (attrs[k] !== '') {
              buffer += '="' + attrs[k] + '"';
            }
          }
        }
        buffer += '>';
      },
      onclosetag: function(name) {
        if (inAccessSection) {
          inAccessSection--;
          if (inAccessSection == 0 && outputting) {
            result['sections'][accessId] = buffer;
            outputting = false;
            buffer = '';
          }
        }
        if (!outputting) {
          return;
        }
        buffer += '</' + name + '>';
      },
      ontext: function(text) {
        if (!outputting) {
          return;
        }
        buffer += text;
      },
      oncomment: function(text) {
        if (!outputting) {
          return;
        }
        buffer += '<!--' + text + '-->';
      },
    }, {decodeEntities: false});
    parser.write(html);
    parser.end();

    console.log('------ result: ', result.accessData,
        Object.keys(result.sections));
    resp.write(JSON.stringify(result));
    resp.end();
  }

  /**
   * @param {string} serviceUrl
   * @param {string} readerId
   * @return {!Promise<!JSON>}
   * @private
   */
  fetchService_(serviceUrl, readerId) {
    // TODO(dvoytenko): Instead of RPC - use the value resolved via origin
    // of the document.
    const pubId = urlModule.parse(serviceUrl).host;
    // TODO(dvoytenko): This is either an exact replica of code in amp-access
    // or amp-access has to pass the publisher-specific reader ID here.
    const pubReaderId = 'SHA_' + pubId + ':' + readerId;
    const url = serviceUrl + '?rid=' + encodeURIComponent(pubReaderId);
    console.log('---- access rpc: ', url);
    return util.fetchJson(url);
  }

  /**
   * @param {!Request} req
   * @param {string} html
   * @param {!Metadata} metadata
   * @param {!AccessSpec} accessSpec
   * @param {!http.ServerResponse} resp
   * @private
   */
  proxyWithClientAccess_(req, html, metadata, accessSpec, resp) {
    let index = html.indexOf('</head>');
    if (index == -1) {
      index = html.indexOf('</HEAD>');
    }
    if (index != -1) {
      resp.write(html.substring(0, index));
    } else {
      resp.write(html);
    }
    resp.write('<script async custom-element="amp-login"' +
        ' src="/client/amp-login.js"></script>');
    resp.write('<script async' +
        ' src="/client/amp-access.js"></script>');
    if (index != -1) {
      resp.write(html.substring(index));
    }
    resp.end();
  }

  /**
   * @param {string} expr
   * @param {!JSON} accessData
   * @return {boolean}
   * @private
   */
  checkExpr_(expr, accessData) {
    // TODO(dvoytenko): proper expression evaluator
    const hasAccess = accessData.access;
    if (expr == 'access = true') {
      return hasAccess;
    }
    if (expr == 'access = false') {
      return !hasAccess;
    }
    if (expr == 'isView and views <= maxViews' ||
            expr == 'isView and views &lt;= maxViews') {
      return (accessData.isView && accessData.views <= accessData.maxViews);
    }
    return false;
  }
}

module.exports = new AmpProxy();
