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
var User = require('../../models/user');
var PaywallAccess = require('../../models/amp-access');

var AUTH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 2; //2 hours

/**
 * The link to the Login Page is configured via the login property in the
 * AMP Access Configuration section.
 *
 * Login Page is simply a normal Web page with no special constraints, other
 * than it should function well as a browser dialog.
 */
router.get('/', function(req, res) {
  console.log('Serve /login');
  res.render('amp-access/login', {
    returnUrl: req.query.return,
    readerId: req.query.rid
  });
});

/**
 * A simple login flow. The important thing is to map the user
 * to it's AMP Reader ID.
 */
router.post('/submit', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var returnUrl = req.body.returnurl;
  var readerId = req.body.rid;
  console.log('POST: ', email, returnUrl, readerId);

  var user = User.findByEmail(email);
  if (!user || user.password != password) {
    console.log('Login failed: ', user);
    res.redirect('/?rid=' + readerId + "&return=" + returnUrl);
    return;
  }
  console.log('Login success: ', user);

  // map the user to the AMP Reader ID
  var paywallAccess = PaywallAccess.getOrCreate(readerId);
  paywallAccess.user = user;

  // set user as logged in via cookie
  res.cookie('email', user.email, {
    maxAge: AUTH_COOKIE_MAX_AGE  // 2hr
  });

  res.redirect(returnUrl + '#success=true');
});

router.get('/reset', function(req, res) {
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }
  res.clearCookie('email');
  PaywallAccess.deleteByReaderId(readerId);
  res.redirect("/");
});

/**
 * Simple user logout.
 */
router.get('/logout', function(req, res) {
  var email = req.cookies.email;
  if (email) {
  	PaywallAccess.deleteByEmail(email);
  	res.clearCookie('email');
  }
  res.redirect(req.header('Referer') || '/');
});

module.exports = router;
