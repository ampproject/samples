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

/* All routes related to amp-access */
var express = require('express');
var router = express.Router();

var MAX_VIEWS = 3;
var MAX_FIRST_CLICK_FREE_VIEWS = 3;

var ClientAuth = require('../models/client-access');
var User = require('../models/user');

/** 
 * AUTHORIZATION CORS 
 */
router.get('/amp-authorization.json', function(req, res) {
  console.log('Client access verification');
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }
  var viewedUrl = req.query.url;

  var referrer = req.query.ref;

  var clientAuth = ClientAuth.getOrCreate(readerId);
  console.log("viewedUrls: " + Object.keys(clientAuth.viewedUrls).length);

  cookieJoin(req, clientAuth);

  var response;
  console.log('client auth', clientAuth.user);

  if (clientAuth.user) {
    // Subscriber.
    response = {
      'access': true,
      'subscriber': true
    };
  } else {
    // Metered.
    var hasAccess = isAuthorized(clientAuth, referrer, viewedUrl);

    var views = clientAuth.numViews;
    // Count view if user hasn't already seen the url.
    if (hasAccess && !clientAuth.viewedUrls[viewedUrl]) {
      views += 1;
    }

    response = {
      'views': views,
      'maxViews': MAX_VIEWS,
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

  var referrer = req.query.ref;

  var clientAuth = ClientAuth.getOrCreate(readerId);
  cookieJoin(req, clientAuth);

  registerView(clientAuth, referrer, viewedUrl);

  console.log('Pingback response:', readerId, {}, clientAuth);
  console.log("clientAuth: " + clientAuth.numViews);
  console.log("FCF: ", referrer, clientAuth.viewedUrlsByReferrer[referrer]);
  res.json({});
});


function isFirstClickFree(clientAuth, referrer, url) {
  if (!referrer) {
    return false;
  }  

  // if (!(referrer in FCF_REFERRERS()) {
  //   return false
  // }

  return !clientAuth.viewedUrlsByReferrer[referrer] 
      || clientAuth.viewedUrlsByReferrer[referrer] < MAX_FIRST_CLICK_FREE_VIEWS;
}

function registerView(clientAuth, referrer, url) {
  if (!isAuthorized(clientAuth, referrer, url)) {
    return;
  }

  clientAuth.viewedUrls[url] = true;

  if (isFirstClickFree(clientAuth, referrer, url)) {
    if (clientAuth.viewedUrlsByReferrer[referrer]) {
      clientAuth.viewedUrlsByReferrer[referrer]++;
    } else {
      clientAuth.viewedUrlsByReferrer[referrer] = 1;      
    }
  } else if (!clientAuth.user) {
    clientAuth.numViews++;
  }

}

function isAuthorized(clientAuth, referrer, url) {
  return clientAuth.user 
      || clientAuth.viewedUrls[url] 
      || isFirstClickFree(clientAuth, referrer, url) 
      || clientAuth.numViews < MAX_VIEWS;
}

function cookieJoin(req, clientAuth) {
  //retrieve the cookie. If it's not null, add a reference to the user on CLIENT_ACCESS[readerId]
  var email = req.cookies.email;
  var user = User.findByEmail(email);
  if (email && user) {
    clientAuth.user = user;
  }
}

module.exports = router;
