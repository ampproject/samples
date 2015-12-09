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
   * Returns a promise that yields AccessProfile indicating whether the user
   * is allowed to read this story.
   *
   * @param {string} origin
   * @param {!ReaderId} readerId
   * @param {!AccessSpec} accessSpec
   * @return {!Promise<!AccessProfile>}
   */
  getAccessProfile(origin, readerId, accessSpec) {
    return this.getAccessInfoViaCache_(origin, readerId, accessSpec).
        then(accessInfo => {
          console.log('------- access info: ', accessInfo);
          let hasAccess = false;
          if (accessInfo.subscriber) {
            hasAccess = true;
          } else if (accessInfo.quotaPerDay > 0) {
            hasAccess = true;
          }
          return {hasAccess: hasAccess};
        });
  }

  /**
   *
   * @param {string} origin
   * @param {!ReaderId} readerId
   * @param {!AccessSpec} accessSpec
   * @param {string} url
   */
  pingback(origin, readerId, accessSpec, url) {
    // TODO(dvoytenko): use URL
    this.getAccessInfoViaCache_(origin, readerId, accessSpec).
        then(accessInfo => {
          console.log('------- access info: ', accessInfo);
          if (accessInfo.quotaPerDay) {
            accessInfo.quotaPerDay--;
            console.log('------- new quota = ', accessInfo.quotaPerDay);
            this.saveAccessInfo_(origin, readerId, accessInfo);
          }
        });
  }

  /**
   * @param {string} origin
   * @param {string} readerId
   * @param {!AccessSpec} accessSpec
   * @param {string} authToken
   * @return {!Promise<!AccessInfo>}
   * @private
   */
  getAccessInfoViaCache_(origin, readerId, accessSpec) {
    let key = origin + ':' + readerId;
    let accessInfo = this.db_[key];

    if (accessInfo && accessInfo.reverifyAfter > Date.now()) {
      // We have access info and it's fresh.
      console.log('------ access info available');
      return Promise.resolve(accessInfo);
    }

    if (accessInfo) {
      console.log('------ access info expired');
      return this.getAccessInfo_(accessSpec, accessInfo.readerId);
    }

    console.log('------ no access info; anonymous request');
    // TODO(dvoytenko): save anonymous response
    return this.getAccessInfo_(accessSpec, null);
  }

  /**
   * Verifies "saveauth" request. To prevent malicious agents from just posting
   * us with successful login tokens, we immediately verify the received tokens
   * against the target publisher.
   *
   * @param {string} origin
   * @param {!ReaderId} readerId
   * @param {!AccessSpec} accessSpec
   * @param {string} authToken
   * @return {!Promise}
   */
  verifySaveAuth(origin, readerId, accessSpec, authToken) {
    return this.getAccessInfo_(accessSpec, authToken).then((accessInfo) => {
      this.saveAccessInfo_(origin, readerId, accessInfo);
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
    console.log('---- access rpc: ', url);
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
   * @param {!ReaderId} readerId
   * @param {!AccessInfo} accessInfo
   */
  saveAccessInfo_(origin, readerId, accessInfo) {
    if (!accessInfo.reverifyAfter) {
      accessInfo.reverifyAfter = Date.now() + 1000 * 60 * 60;  // 1hr
    }
    let key = origin + ':' + readerId;
    this.db_[key] = accessInfo;
    console.log('------ save access info:', origin, readerId, accessInfo);
  }
}

module.exports = new AccessDb();
