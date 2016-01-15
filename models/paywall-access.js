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
"use strict";

var MAX_FIRST_CLICK_FREE_VIEWS = 3;
var MAX_VIEWS = 3;

var READER_ID_TO_MAPPING = {};

class PaywallAccess {

  constructor() {
      this.numViews = 0;
      this.viewedUrls = {};
      this.viewedUrlsByReferrer = {};
      this.user = null;
  }

  isFirstClickFree(referrer, url) {
    if (!referrer) {
      return false;
    }  

    // if (!(referrer in FCF_REFERRERS()) {
    //   return false
    // }

    return !this.viewedUrlsByReferrer[referrer] 
      || this.viewedUrlsByReferrer[referrer] < MAX_FIRST_CLICK_FREE_VIEWS;
  }

  registerView(referrer, url) {
    if (!this.isAuthorized(referrer, url)) {
      return;
    }

    this.viewedUrls[url] = true;

    if (this.isFirstClickFree(referrer, url)) {
      if (this.viewedUrlsByReferrer[referrer]) {
        this.viewedUrlsByReferrer[referrer]++;
      } else {
        this.viewedUrlsByReferrer[referrer] = 1;      
      }
    } else if (!this.user) {
      this.numViews++;
    }
  }

  isAuthorized(referrer, url) {
    return this.user 
      || this.viewedUrls[url] 
      || this.isFirstClickFree(referrer, url) 
      || this.numViews < MAX_VIEWS;
  }

}

exports.MAX_VIEWS = MAX_VIEWS;

exports.getOrCreate = function(readerId) {
  var clientAuth = READER_ID_TO_MAPPING[readerId];
  if (!clientAuth) {
    clientAuth = new PaywallAccess();
    READER_ID_TO_MAPPING[readerId] = clientAuth;
  }
  return clientAuth;
};

exports.findByReaderId = function(readerId) {
  return READER_ID_TO_MAPPING[readerId];
};

exports.deleteByReaderId = function(readerId) {
  delete READER_ID_TO_MAPPING[readerId];
};
