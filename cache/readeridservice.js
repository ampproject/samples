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
var http = require('http');
var util = require('./util');

/**
 * @typedef {string}
 */
let ReaderId;


/**
 */
class ReaderIdService {

  /**
   * Locates the ReaderId from the request.
   * @param {!Request} req
   * @return {?ReaderId}
   */
  getReaderId(req) {
    return util.getCookie(req.serverReq, consts.CACHE_TOKEN_COOKIE) || null;
  }

  /**
   * If not done yet, performs session redirect. Returns `true` if session
   * redirect is done.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @return {boolean}
   */
  sessionRedirect(req, resp) {
    // TODO(dvoytenko): make param value slightly more nonce-y.
    if (req.query['r'] === '1') {
      // The redirect has already been done.
      console.log('---- session redirect has already been done');
      return false;
    }

    let url = req.url.href;
    url += (url.indexOf('?') == -1 ? '?' : '&') + 'r=1';

    const cacheToken = 'CACHE' + Math.random();
    const cookieExpirationTime = new Date(Date.now() + 1000 * 60 * 60 * 2);

    console.log('----> session redirect to ', url, cacheToken);

    resp.writeHead(/* temp redirect */ 302, {
      'Location': url,
      'Set-Cookie': util.setCookie(consts.CACHE_TOKEN_COOKIE,
          cacheToken, cookieExpirationTime)
    });
    resp.end();
    return true;
  }

  /**
   * Looks for a cookie and if not available, sets it.
   * @param {!Request} req
   * @parma {!Object<string, string>} headers
   */
  ensureReaderIdFirstParty(req, headers) {
    let cacheToken = this.getReaderId(req);
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
}

module.exports = new ReaderIdService();
