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

const fetch = require('node-fetch');
const jsrsasign = require('jsrsasign');
const {URL} = require('url');
const mime = require('mime-types');
const punycode = require('punycode');

const CACHES_JSON_URL = 'https://cdn.ampproject.org/caches.json';

class CacheRefresh {
  constructor(privateKey) {
    this._caches = null;
    this._privateKey = privateKey;
    this._sig = new jsrsasign.Signature({'alg': 'SHA256withRSA'});
    this._sig.init(this._privateKey);    
  }

  createCacheUpdateUrls(originUrl) {
    return this._getCaches()
      .then(caches => {
        return caches.map(cache => {
          const cacheUrl = this.createCacheUrl(originUrl, cache);
          const refreshUrl = this.createRefreshUrl(cacheUrl);
          return {id: cache.id, name: cache.name, refreshUrl: refreshUrl}
        });
      });
  }

  /**
   * Translates an url from the origin to the AMP Cache URL format, as documented here:
   *  https://developers.google.com/amp/cache/overview
   *
   * @param {String} originUrl the URL to be transformed.
   * @param {Object} cache the cache Object containing the suffix configuration.
   * @return {String} the transformed URL.
   */
  createCacheUrl(originUrl, cache) {
    const url = new URL(originUrl);
    const originalHostname = url.hostname;
    let unicodeHostname = punycode.toUnicode(originalHostname);
    unicodeHostname = unicodeHostname.replace(/-/g, '--');
    unicodeHostname = unicodeHostname.replace(/\./g, '-');

    let pathSegment = this._getResourcePath(url.pathname);
    pathSegment += url.protocol === 'https:' ? '/s/' : '/';

    url.hostname = punycode.toASCII(unicodeHostname) + '.' + cache.updateCacheApiDomainSuffix;
    url.pathname = pathSegment + originalHostname + url.pathname;
    return url.toString();
  }

  _getResourcePath(pathname) {
    const mimetype = mime.lookup(pathname);
    if (!mimetype) {
      return '/c';
    }

    console.log(mimetype);
    if (mimetype.indexOf('image/') === 0) {
      return '/i';
    }

    if (mimetype.indexOf('font') >= 0) {
      return '/r';
    }

    // Default to document
    return '/c';
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

  /**
   * Fetches AMP Caches information, as documented here:
   * https://github.com/ampproject/amphtml/issues/7259
   */
  _getCaches() {
    if (this._caches) {
      return Promise.resolve(this._caches);
    }

    return fetch(CACHES_JSON_URL)
      .then(response => response.json())
      .then(json => {
        this._caches = json.caches;
        return this._caches;
      });
  }

  _createSignature(url) {
    const signed = this._sig.signString(url);
    // Signature is returned as hex. Convert to Base64Url.
    const base64UrlSigned = jsrsasign.hextob64u(signed);
    return base64UrlSigned;
  }  
}

module.exports = CacheRefresh;