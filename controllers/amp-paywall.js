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

var express = require('express');
var router = express.Router();

var PaywallAccess = require('../models/paywall-access');
var User = require('../models/user');

/** 
 * AUTHORIZATION CORS 
 */
router.get('/amp-authorization.json', function(req, res) {
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }
  var viewedUrl = req.query.url;
  var referrer = req.query.ref;

  var paywallAccess = PaywallAccess.getOrCreate(readerId);
  cookieJoin(req, paywallAccess);

  var response;
  if (paywallAccess.user) {
    // Subscriber.
    response = {
      'access': true,
      'subscriber': true
    };
  } else if (paywallAccess.viewedUrls[viewedUrl]) {
    // User has seen the article already
    response = {
      'return': true,
      'access': true
    };
  } else if (paywallAccess.isFirstClickFree(referrer)) {
    // First-Click is free
    response = {
      'fcs': true,
      'access': true
    };
  } else {
    // Metered.
    var hasAccess = paywallAccess.isAuthorized(referrer, viewedUrl);
    // Count view if user hasn't already seen the url.
    var views = paywallAccess.numViews;
    if (hasAccess && !paywallAccess.viewedUrls[viewedUrl]) {
      views += 1;
    }

    response = {
      'views': views,
      'maxViews': PaywallAccess.MAX_VIEWS,
      'access': hasAccess
    };
  }
  console.log('Authorization response:', readerId, response);
  res.json(response);
});

/** 
 * PINGBACK CORS 
 */
router.post('/amp-pingback', function(req, res) {
  console.log('Client access pingback');
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }

  var viewedUrl = req.query.url;
  if (!viewedUrl) {
    res.sendStatus(400);
    return;
  }

  var paywallAccess = PaywallAccess.getOrCreate(readerId);
  cookieJoin(req, paywallAccess);

  var referrer = req.query.ref;
  paywallAccess.registerView(referrer, viewedUrl);

  console.log('Pingback response:', readerId, {}, paywallAccess);
  console.log("paywallAccess: " + paywallAccess.numViews);
  console.log("FCF: ", referrer, paywallAccess.viewedUrlsByReferrer[referrer]);
  res.json({});
});

function cookieJoin(req, paywallAccess) {
  //retrieve the cookie. If it's not null, add a reference to the user on 
  //CLIENT_ACCESS[readerId]
  var email = req.cookies.email;
  var user = User.findByEmail(email);
  if (email && user) {
    paywallAccess.user = user;
  }
}

module.exports = router;
