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

var express = require('express');
var router = express.Router();
var privateKey =
`-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgGuSzXXydlcWrOpzmTyx/e1D/vNGZcfcgXrGq2eM6eX8YbA9OX+w
3+hHfUN88l4O5w+aQabc+/Edz90KOdqeIbAnGMCwnieIJj5Fdkvk+MtRRVzu5aVh
4p5nJSb/juG3trQn9L7bAKoA5iDpXIKSq1ViTPXJ/WrkDJ3UGjAzrGG1AgMBAAEC
gYAN7kHrP03x8z7LUdMLWCWBH2gZywkNO9IMu0OhMk9r+CYSc6tJjPdCFlfzcG/W
nGlxzNEpsb5yuCCeCF/7nrTP9oZ0qdx4LwM/9f21iSry2n5E9AVBztnPw5Kzuo6p
hyzN05eL4uuXnPv2y+t1quK0NRyru012KVNnfodJBcJEFQJBAMLmlvYmgP9Chxf2
ozxAYOHbIXWN4LVFKEhz9YabRgdLpe7xFGGRUjNxQe6fXoCAequJvmlb7gvUyXH2
JCPSRwMCQQCNS+rMFDq2/zIOxZAE2ynuhXymMKaodsXcf691cNh5W/k/N4DGIIJJ
M3uIcMdWS9IP/Z48nAOXtfrf1wW56BrnAkBwtgFfYG0BMWwGw68qzOA6PQtgfCgT
LGdbXxQCQBGDbpALWoe61NuAvGKwqKFyFtraENJ5A5zqYqgMq5fCz3wZAkAg/065
FCxWGijNjFPC3o/fVSs0AH6bLwmsIeGO8qiLRvBhVAvtuR/UCoLZ7USQIarP8zGm
A+VO47/P0H5U2SCXAkBY2ykmcZh+F1fMt3UFk48li6vWnHenRYKeJsPEQAm0ujgQ
v41z3Wnhg65zI8j1o+K9dc0qtgZ/Fsa8c7zTF8SC
-----END RSA PRIVATE KEY-----`;
var FIVE_MINUTES = 1000 * 60 * 5;
var PaywallAccess = require('../../models/amp-access');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');

/**
 # Authorization is configured via authorization property in the AMP Access
 # Configuration section. It is a credentialed CORS endpoint.
 #
 # This endpoint produces the authorization response that can be used in the
 # content markup expressions to show/hide different parts of content.
 */
router.get('/amp-authorization.json', function(req, res) {
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }

  var serverSide = req.query.type === 'server';

  var paywallAccess = PaywallAccess.getOrCreate(readerId);
  // check if there is a logged in user
  matchUserToReaderId(req, paywallAccess);

  // create the response based on the user
  var viewedUrl = req.query.url;
  var referrer = req.query.ref;
  // response can contain arbitrary json data
  var response;
  if (paywallAccess.isSubscriber()) {
    // all subscribers have access
    response = {
      'subscriber': true,
      'access': true
    };
  } else if (paywallAccess.hasAlreadyVisisted(viewedUrl)) {
    // user has seen the article already
    response = {
      'return': true,
      'access': true
    };
  } else if (paywallAccess.isFirstClickFree(referrer)) {
    // first-Click is free
    response = {
      'fcs': true,
      'access': true
    };
  } else {
    // metered access
    var hasAccess = paywallAccess.hasAccess(referrer, viewedUrl);
    // send an increased view count if user hasn't already seen the url
    // the actual view is counted in the pingback
    var views = paywallAccess.numViews;
    if (hasAccess && !paywallAccess.hasAlreadyVisisted()) {
      views++;
    }
    response = {
      'views': views,
      'maxViews': PaywallAccess.MAX_VIEWS,
      'access': hasAccess
    };
  }
  response.readerId = readerId;
  console.log('Authorization response:', readerId, response);

  if (serverSide) {
    var jwtResponse = {
      'aud': 'ampproject.org',
      'iss': req.get('host'),
      'exp': new Date().getTime() + FIVE_MINUTES,
      'amp_authdata': response
    };
    var encodedResponse = jwt.sign(jwtResponse, privateKey, { algorithm: 'RS256'});
    console.log(encodedResponse);
    res.set('Content-Type', 'text/plain');
    res.send(encodedResponse);
  } else {
    res.json(response);
  }
});

/**
 * Pingback is configured via pingback property in the AMP Access Configuration section.
 * It must be a credentialed CORS endpoint. Pingback must not produce a response.
 *
 * Use the pingback to:
 *
 * - count down meter when it is used.
 * - map AMP Reader ID to the user's identity via cookie.
 */
router.post('/amp-pingback', function(req, res) {
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }

  var paywallAccess = PaywallAccess.getOrCreate(readerId);
  var viewedUrl = req.query.url;
  var referrer = req.query.ref;
  // count the view in case of metering
  paywallAccess.registerView(referrer, viewedUrl);
  console.log("paywallAccess views: " + paywallAccess.numViews);
  console.log("FCF: ", referrer, paywallAccess.viewedUrlsByReferrer[referrer]);
  res.status(200).end();
});

/**
 * Retrieves a logged in user via cookie. If it exists it will store the
 * user with the Reader ID. This makes it possible to automatically
 * login paywall users if they are already logged into your site.
 */
function matchUserToReaderId(req, paywallAccess) {
  //retrieve the login cookie.
  var email = req.cookies.email;
  var user = User.findByEmail(email);
  if (user) {
    // map Reader ID to user
    paywallAccess.user = user;
  }
}

module.exports = router;
