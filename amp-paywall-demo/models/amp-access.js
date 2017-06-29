/** @license
 * Copyright 2015 - present The AMP HTML Authors. All Rights Reserved.
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

"use strict";

var url = require('url');
var MAX_FIRST_CLICK_FREE_VIEWS = 3;
var MAX_VIEWS = 3;

var READER_ID_TO_MAPPING = {};
var FIRST_CLICK_FREE_DOMAINS = ['google.com'];
var FIRST_CLICK_FREE_TEST_PATH = 'fcf';

/**
 * A simple paywall implementation. It understands AMP Reader Ids
 * and users. Supported features are:
 *
 * - Metered paywall
 * - First-click-free
 * - Subscriptions
 * - Users can view articles repeatedly
 */
class PaywallAccess {

  constructor() {
      this.numViews = 0;
      this.viewedUrls = {};
      this.viewedUrlsByReferrer = {};
      this.user = null;
  }

  /**
   * Returns true if the user is a subscriber.
   */
  isSubscriber() {
    if (!this.user) {
      return false;
    }
    return this.user.subscriber;
  }

  /**
   * Determines based on the request referrer whether
   * First-Click-Free is supported.
   */
  isFirstClickFree(referrer) {
    var host = url.parse(referrer);
    if(FIRST_CLICK_FREE_DOMAINS.indexOf(host) == -1 &&
      // for testing
      referrer.indexOf(FIRST_CLICK_FREE_TEST_PATH) == -1) {
        return false;
    }
    return !this.viewedUrlsByReferrer[host] ||
      this.viewedUrlsByReferrer[host] < MAX_FIRST_CLICK_FREE_VIEWS;
  }

  /**
   * Registers a viewed article. Counts views per referrer.
   */
  registerView(referrer, viewedUrl) {
    if (!this.hasAccess(referrer, viewedUrl)) {
      return;
    }

    if (this.isFirstClickFree(referrer)) {
      var host = url.parse(referrer);
      if (this.viewedUrlsByReferrer[host]) {
        this.viewedUrlsByReferrer[host]++;
      } else {
        this.viewedUrlsByReferrer[host] = 1;
      }
    } else if (!this.user && !this.viewedUrls[viewedUrl]) {
      this.numViews++;
    }
    this.viewedUrls[viewedUrl] = true;
  }

  /**
   * Returns true if the user has access to the given URL.
   */
  hasAccess(referrer, url) {
    return this.isSubscriber() ||
      this.hasAlreadyVisisted(url) ||
      this.isFirstClickFree(referrer) ||
      this.numViews < MAX_VIEWS;
  }

  /**
   * Returns true if the user has already viewed this article.
   */
  hasAlreadyVisisted(url) {
    return this.viewedUrls[url];
  }
}

/**
 * The maximum number of views per non-subscriber.
 */
exports.MAX_VIEWS = MAX_VIEWS;

/**
 * Returns an existing paywall access for known
 * Reader IDs or creates a new one otherwise.
 */
exports.getOrCreate = function(readerId) {
  var clientAuth = READER_ID_TO_MAPPING[readerId];
  if (!clientAuth) {
    clientAuth = new PaywallAccess();
    READER_ID_TO_MAPPING[readerId] = clientAuth;
  }
  return clientAuth;
};

/**
 * Returns paywall access for the given Reader ID.
 */
exports.findByReaderId = function(readerId) {
  return READER_ID_TO_MAPPING[readerId];
};

/**
 * Deletes paywall access for the given Reader ID.
 */
exports.deleteByReaderId = function(readerId) {
  delete READER_ID_TO_MAPPING[readerId];
};

/**
 * Deletes paywall access for the given email address.
 */
exports.deleteByEmail = function(email) {
  // very inefficient - don't try this at home
  for (var readerId in READER_ID_TO_MAPPING) {
    var user = READER_ID_TO_MAPPING[readerId].user;
    if (user && user.email == email) {
      this.deleteByReaderId(readerId);
    }
  }
};
