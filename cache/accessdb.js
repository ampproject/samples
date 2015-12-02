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
var util = require('./util');


/**
 * - authToken - auth token on the publisher's side.
 * - reverifyAfter - the access info is only valid until this time expires.
 * - maxViews - if publisher desires to meter, they can send a maximum number
 *     of views in this field.
 * - views - views so far.
 *
 * @typedef {{
 *   authToken: string,
 *   reverifyAfter: time,
 *   maxViews: (number|undefined),
 *   views: (number|undefined)
 * }}
 */
const AccessInfo = {};


/**
 * This class represents a service with two main responsibilities:
 * 1. Access publisher's RPCs to retrieve/verify access info;
 * 2. Cache this data for speedy access.
 */
class AccessDb {

  constructor() {
    /** @private @const {!Object<string, !AccessInfo>} */
    this.db_ = {};
  }

  /**
   * Returns a promise that yields boolean indicating whether the user
   * is allowed to read this story.
   *
   * @param {string} origin
   * @param {string} cacheToken
   * @param {!AccessSpec} accessSpec
   * @return {!Promise<boolean>}
   */
  hasAccess(origin, cacheToken, accessSpec) {
    let key = origin + ':' + cacheToken;
    let accessInfo = this.db_[key];

    if (accessInfo && accessInfo.reverifyAfter < Date.now()) {
      // We have access info and it's fresh.
      console.log('------ access info available');
      // TODOSPEC: even though we optimistically allowing access, we
      // immediately follow up with a non-blocking verification. Is this
      // a good idea?
      this.verifyAccess_(origin, cacheToken, accessSpec,
                accessInfo.authToken);
      return Promise.resolve(this.hasAccess_(accessInfo));
    }

    if (accessInfo) {
      console.log('------ access info expired');
      return this.verifyAccess_(origin, cacheToken, accessSpec,
          accessInfo.authToken);
    }

    console.log('------ no access info');
    return Promise.resolve(false);
  }

  /**
   * Verifies "postback" request. To prevent malicious agents from just posting
   * us with successful login tokens, we immediately verify the received tokens
   * against the target publisher.
   *
   * @param {string} origin
   * @param {string} cacheToken
   * @param {!AccessSpec} accessSpec
   * @param {string} authToken
   * @return {!Promise}
   */
  verifyPostback(origin, cacheToken, accessSpec, authToken) {
    return this.verifyAccess_(origin, cacheToken, accessSpec, authToken);
  }

  /**
   * @param {!AccessInfo} accessInfo
   * @return {boolean}
   * @private
   */
  hasAccess_(accessInfo) {
    // TODOSPEC: viewing the same story 10 times should not constitute
    // more than one "view".
    if (accessInfo.maxViews !== undefined) {
      if (!accessInfo.views) {
        accessInfo.views = 0;
      }
      if (accessInfo.views > accessInfo.maxViews) {
        return false;
      }
    }
    return true;
  }

  /**
   * @param {string} origin
   * @param {string} cacheToken
   * @param {!AccessSpec} accessSpec
   * @param {string} authToken
   * @return {!Promise<boolean>}
   * @private
   */
  verifyAccess_(origin, cacheToken, accessSpec, authToken) {
    return this.getAccessInfo_(accessSpec, authToken).then((accessInfo) => {
      this.saveAccessInfo_(origin, cacheToken, accessInfo);
      return this.hasAccess_(accessInfo);
    });
  }

  /**
   * @param {!AccessSpec} accessSpec
   * @param {string} authToken
   * @return {!Promise<!AccessInfo>}
   * @private
   */
  getAccessInfo_(accessSpec, authToken) {
    var url = accessSpec.rpc + '?authtoken=' + encodeURIComponent(authToken);
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        console.log('---- RPC response: ', res.statusCode);
        if (res.statusCode != 200) {
          reject(new Error('RPC failed with status ' + res.statusCode +
              ' - ' + res.statusMessage));
        } else {
          util.consumeString(res, 'utf8').then(resolve, reject);
        }
      }).on('error', reject);
    }).then((content) => {
      console.log('---- parse JSON');
      return JSON.parse(content);
    }).catch((reason) => {
      console.log('---- RPC failed:', e);
    });
  }

  /**
   * @param {string} origin
   * @param {string} cacheToken
   * @param {!AccessInfo} accessInfo
   */
  saveAccessInfo_(origin, cacheToken, accessInfo) {
    if (!accessInfo.reverifyAfter) {
      accessInfo.reverifyAfter = Date.now() + 1000 * 60 * 60;  // 1hr
    }
    let key = origin + ':' + cacheToken;
    this.db_[key] = accessInfo;
    console.log('------ save access info:', origin, cacheToken, accessInfo);
  }
}

module.exports = new AccessDb();
