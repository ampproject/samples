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
var util = require('./util');


/**
 * Postback protocol handles postback from the publisher. Publisher sends
 * postback when login operation succeeds.
 *
 * Postback handles two requests `/postback?logintoken=&authtoken=` and
 * `/loginwait?logintoken=&url=`:
 * - `/login` - the request to login for the specified document. The reader
 *   will be redirected to publisher's login page.
 * - `/postback` - the request from publisher to confirm that login has
 *   succeeded. The publisher sends their opaque `authtoken`.
 * - `/loginwait` - the long-polling request from the AMP Viewer/Runtime
 *   to be notified that the AMP document can be reloaded with new access
 *   parameters.
 */
class Postback {

  constructor() {
    /**
     * @private {!Object<string, !{url: string, resp: !http.ServerResponse}>}
     */
    this.waiting_ = {};

    /**
     * @private {!Object<string, {origin: string,
     *     cacheToken: string, accessSpec: !AccessSpec}>}
     */
    this.verifications_ = {};
  }

  getPostbackHandler() {
    return this.postback_.bind(this);
  }

  getLoginHandler() {
    return this.login_.bind(this);
  }

  getLoginWaitHandler() {
    return this.loginwait_.bind(this);
  }

  /**
   * Handles "postback" request. The publisher calls "postback" after the
   * successful login operation.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  postback_(req, resp) {
    let loginToken = req.query['logintoken'];
    let authToken = req.query['authtoken'];
    console.log('Handle postback: ', loginToken, authToken);

    if (!loginToken || !authToken) {
      console.log('---- login and auth tokens must be specified -> 400');
      resp.writeHead(400);
      resp.end();
      return;
    }

    resp.writeHead(200);
    resp.end();

    let verificationPromise;
    let verification = this.verifications_[loginToken];
    if (verification) {
      verificationPromise = accessdb.verifyPostback(
          verification.origin, verification.cacheToken,
          verification.accessSpec, authToken);
    } else {
      verificationPromise = Promise.reject('No verification info');
    }

    verificationPromise.then(() => {
      this.postbackSuccess_(loginToken, authToken);
    }, (reason) => {
      console.log('---- postback verification failed: ', reason);
    });
  }

  /**
   * @param {string} loginToken
   * @param {string} authToken
   * @private
   */
  postbackSuccess_(loginToken, authToken) {
    console.log('---- postback successful');
    let waiting = this.waiting_[loginToken];
    if (!waiting) {
      return;
    }

    console.log('---- found waiting request for ', loginToken, waiting.url);

    // In real world use JSON.
    waiting.resp.writeHead(200, {'Content-Type': 'text/plain'});
    waiting.resp.write(waiting.url);
    waiting.resp.end();
  }

  /**
   * Handles "login" request. The main result is that it will redirect the
   * user to the final login URL.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  login_(req, resp) {
    let loginToken = req.query['logintoken'];
    let url = req.query['url'];
    if (url && url[0] == '/') {
      url = 'http:/' + url;
    }
    console.log('Handle login: ', loginToken, url);

    if (!loginToken || !url) {
      console.log('---- login token and url must be specified -> 400');
      resp.writeHead(400);
      resp.end();
      return;
    }

    let cacheToken = util.getCookie(req.serverReq, consts.CACHE_TOKEN_COOKIE);
    console.log('---- cache token: ', cacheToken);
    if (!cacheToken || cacheToken == 'undefined') {
      cacheToken = 'CACHE' + Math.random();
    }
    let cookieExpirationTime = new Date(Date.now() + 1000 * 60 * 60 * 2);

    // In practice this should be very fast since the document is already in
    // cache.
    // TODOSPEC: But what if the `amp-access` has already been removed?
    let postbackHost = req.serverReq.headers['host'];
    proxy.getMetadata(url).then((metadata) => {
      console.log('---- got metadata:', metadata);
      let accessSpec = util.getAccessSpec(metadata);
      console.log('---- access spec = ', accessSpec);
      if (!accessSpec) {
        return Promise.reject();
      }

      this.verifications_[loginToken] = {
        origin: util.request(url).host,
        cacheToken: cacheToken,
        accessSpec: accessSpec
      };

      let postbackUrl = 'http://' + postbackHost + '/postback';
      let loginUrl = accessSpec.login +
          '?logintoken=' + encodeURIComponent(loginToken) +
          '&postback=' + encodeURIComponent(postbackUrl);
      console.log('---- loginUrl: ', loginUrl);
      resp.writeHead(302, {
        'Location': loginUrl,
        // NOTE! This is our one and only chance to set a cookie.
        'Set-Cookie': util.setCookie(consts.CACHE_TOKEN_COOKIE, cacheToken,
            cookieExpirationTime)
      });
      resp.end();
    }, (reason) => {
      console.log('---- failed to get metaddata:', reason);
      resp.writeHead(500);
      resp.end();
    });
  }

  /**
   * Handles "login wait" request. This is a long-polling request when the
   * AMP Runtime/Viewer can wait for the login to succeed.
   * @param {!Request} req
   * @parma {!http.ServerResponse} response
   * @private
   */
  loginwait_(req, resp) {
    let loginToken = req.query['logintoken'];
    let url = req.query['url'];
    console.log('Handle loginwait: ', loginToken, url);

    if (!loginToken || !url) {
      console.log('---- login token and url must be specified -> 400');
      resp.writeHead(400);
      resp.end();
      return;
    }

    // Wait for the postback.
    console.log('---- scheduled callback');
    this.waiting_[loginToken] = {
      url: url,
      resp: resp
    };
  }

}

module.exports = new Postback();
