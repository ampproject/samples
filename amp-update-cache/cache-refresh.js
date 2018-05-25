/**
 * Copyright 2015-2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const jsrsasign = require('jsrsasign');
const {URL} = require('url');
const createCacheUrl = require('amp-toolbox-cache-url');
const Caches = require('amp-toolbox-cache-list');

class CacheRefresh {
  constructor(privateKey) {
    this._caches = new Caches();
    this._privateKey = privateKey;
    this._sig = new jsrsasign.Signature({'alg': 'SHA256withRSA'});
    this._sig.init(this._privateKey);    
  }

  createCacheUpdateUrls(originUrl) {
    return this._caches.list()
      .then(caches => {
        console.log(caches);
        return caches.map(cache => {
          const cacheUrl = createCacheUrl(cache.updateCacheApiDomainSuffix, originUrl);
          const refreshUrl = this.createRefreshUrl(cacheUrl);
          return {id: cache.id, name: cache.name, refreshUrl: refreshUrl}
        });
      });
  }

  /**
   * Generates a signed update-cache request URL from an the AMP Cache URL, as documented here:
   * https://developers.google.com/amp/cache/update-ping#update-cache-request
   *
   * @param {String} cacheUrl
   * @return {String}
   */
  createRefreshUrl(cacheUrl) {
    const url = new URL(cacheUrl);
    // API accepts timestamp as a UNIX Epoch in seconds.
    const timestamp = (Date.now() / 1000) | 0;

    // Create the Cache Refresh URL to be signed.
    url.pathname = '/update-cache' + url.pathname;
    url.searchParams.append('amp_action', 'flush');
    url.searchParams.append('amp_ts', timestamp);

    // Append the signature to the Cache Refresh Url.
    const urlSignature = this._createSignature(url.pathname + url.search);
    url.searchParams.append('amp_url_signature', urlSignature);
    return url.toString();
  };

  _createSignature(url) {
    const signed = this._sig.signString(url);
    // Signature is returned as hex. Convert to Base64Url.
    const base64UrlSigned = jsrsasign.hextob64u(signed);
    return base64UrlSigned;
  }  
}

module.exports = CacheRefresh;