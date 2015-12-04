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


var consts = require('./consts');
var fs = require('fs');
var http = require('http');
var pathModule = require('path');
var saveauth = require('./saveauth');
var proxy = require('./proxy');
var util = require('./util');

var ROOT = __dirname;
var CLIENT_ROOT = pathModule.join(ROOT, 'client');


/**
 * Starts the AMP Cache server on the specified port.
 * @param {number} port
 */
module.exports.start = function start(port) {
  let server = new Server(port);
  server.start();
}


class Server {
  constructor(port) {
    /** @const {number} */
    this.port = port;

    /**
     * @const @private {!Array<!{regexp: !RegExp,
     *    handler: function(!Request, !http.ServerResponse)}>}
     */
    this.routes_ = [];

    // AccessDB
    this.routes_.push({regexp: /^\/saveauth/,
        handler: saveauth.getHandler()});

    // Other
    this.routes_.push({regexp: /favicon.*/,
        handler: this.devnull_.bind(this)});

    // Local Client
    this.routes_.push({regexp: /^\/client\/.*/,
        handler: this.client_.bind(this)});

    // Proxy
    this.routes_.push({regexp: /^\/.*\/.*/, handler: proxy.getHandler()});
  }

  start() {
    http.createServer(this.onRequest_.bind(this)).listen(this.port);
    console.log('Cache started on port:', this.port);
  }

  /**
   * The main handler for all requests coming through this server.
   * @param {!http.ServerRequest} req
   * @parma {!http.ServerResponse} resp
   * @private
   */
  onRequest_(req, resp) {
    console.log('Serve: ', req.url, req.headers['host']);

    let request = util.request('http://' + req.headers['host'] + req.url);
    request.serverReq = req;

    let handler = this.findRoute_(request);
    if (!handler) {
      this.notfound_(request, resp);
      return;
    }

    handler(request, resp);
  }

  /**
   * @param {!Request} request
   * @return {?function(!Request, !http.ServerResponse)}
   * @private
   */
  findRoute_(request) {
    for (let i = 0; i < this.routes_.length; i++) {
      let route = this.routes_[i];
      if (route.regexp.test(request.path)) {
        return route.handler;
      }
    }
    return null;
  }

  /**
   * No real response, just send 204.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  devnull_(req, resp) {
    resp.writeHead(204);
    resp.end();
  }

  /**
   * Local client file.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  client_(req, resp) {
    console.log('Local client request: ', req.path);

    if (!req.path || req.path == '/' || req.path == '/client/') {
      this.notfound_(req, resp);
      return;
    }

    let filePath = pathModule.join(CLIENT_ROOT, req.path.substring(
        '/client/'.length));
    console.log('- file path: ', filePath);
    let stat = fs.statSync(filePath);

    let contentType = 'text/html';
    if (filePath.lastIndexOf('.js') + 3 == filePath.length) {
      contentType = 'text/javascript';
    }

    let headers = {
      'Content-Type': contentType,
      'Content-Length': stat.size
    };

    if (filePath.indexOf('amp-login.html') != -1) {
      // NOTE! This is our one and only chance to set a cookie reliably.
      let cacheToken = util.getCookie(req.serverReq, consts.CACHE_TOKEN_COOKIE);
      if (!cacheToken) {
        cacheToken = 'CACHE' + Math.random();
        let cookieExpirationTime = new Date(Date.now() + 1000 * 60 * 60 * 2);
        headers['Set-Cookie'] = util.setCookie(consts.CACHE_TOKEN_COOKIE,
            cacheToken, cookieExpirationTime);
        console.log('--- Set cookie: ', cacheToken);
      } else {
        console.log('--- Existing cookie: ', cacheToken);
      }
    }

    resp.writeHead(200, headers);

    let readStream = fs.createReadStream(filePath);
    readStream.pipe(resp);
  }

  /**
   * Not found - 404.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  notfound_(req, resp) {
    console.log('---- Not Found.');
    resp.writeHead(404);
    resp.end();
  }
}
