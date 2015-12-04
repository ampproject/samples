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
var proxy = require('./proxy');
var urlModule = require('url');
var util = require('./util');


/**
 */
class SaveAuth {

  constructor() {
  }

  getHandler() {
    return this.saveAuth_.bind(this);
  }

  /**
   * Handles "saveauth" request. The amp-login-result.html calls "saveauth"
   * after the successful login operation.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  saveAuth_(req, resp) {
    let authToken = req.query['authtoken'];
    let url = req.query['url'];
    let cacheToken = util.getCookie(req.serverReq, consts.CACHE_TOKEN_COOKIE);
    console.log('Handle saveauth: ', authToken, cacheToken, url);

    if (!authToken || !url) {
      console.log('---- auth token and url must be specified -> 400');
      resp.writeHead(400);
      resp.end();
      return;
    }

    if (!cacheToken) {
      console.log('---- no cookie -> 400');
      resp.writeHead(400);
      resp.end();
      return;
    }

    let proxyUrl = proxy.getProxyUrl(url);
    console.log('---- proxy url: ', proxyUrl);
    if (!proxyUrl) {
      console.log('---- no proxy url -> 400');
      resp.writeHead(400);
      resp.end();
      return;
    }

    let origin = util.request(proxyUrl).host;
    console.log('---- origin: ', origin);

    proxy.getMetadata(proxyUrl).then((metadata) => {
      console.log('---- got metadata:', metadata);
      let accessSpec = util.getAccessSpec(metadata);
      console.log('---- access spec = ', accessSpec);
      if (!accessSpec) {
        return Promise.reject();
      }
      return accessSpec;
    }, (reason) => {
      console.log('---- failed to get metaddata:', reason);
      resp.writeHead(500);
      resp.end();
    }).then((accessSpec) => {
      return accessdb.verifySaveAuth(origin, cacheToken,
          accessSpec, authToken);
    }).then(() => {
      // TODO(dvoytenko): include request to reload.
      console.log('---- success!');
      resp.writeHead(200);
      resp.end();
    });
  }
}

module.exports = new SaveAuth();
