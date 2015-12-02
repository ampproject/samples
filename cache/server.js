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


var http = require('http');
var postback = require('./postback');
var proxy = require('./proxy');
var util = require('./util');


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

    // Postback
    this.routes_.push({regexp: /^\/postback/,
        handler: postback.getPostbackHandler()});
    this.routes_.push({regexp: /^\/loginwait/,
        handler: postback.getLoginWaitHandler()});
    this.routes_.push({regexp: /^\/login/,
        handler: postback.getLoginHandler()});

    // Other
    this.routes_.push({regexp: /favicon.*/, handler: this.devnull_.bind(this)});

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
