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

/* All routes realated to login/logout */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ClientAuth = require('../models/client-access');

var LOGIN_TRANSITIVES = false;
var AUTH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 2; //2 hours

router.get('/login', function(req, res) {
  console.log('Serve /login');
  res.render('login', {});
});

router.post('/login-submit', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var returnUrl = req.body.returnurl;
  var readerId = req.body.rid;
  console.log('POST: ', email, returnUrl, readerId);

  var user = User.findByEmail(email);
  if (!user || user.password != password) {
    console.log('Login failed: ', user);
    res.redirect('/login?rid=' + readerId + "&return=" + returnUrl);
    return;    
  }

  // Login
  var clientAuth = ClientAuth.getOrCreate(readerId);
  clientAuth.user = user;  

  console.log('Logged in: ', ClientAuth.findByReaderId[readerId]);

  // Set cookies
  res.cookie('email', user.email, {
    maxAge: AUTH_COOKIE_MAX_AGE  // 2hr
  });

  // Redirect
  if (LOGIN_TRANSITIVES) {
    res.redirect('/login-done?return=' + encodeURIComponent(returnUrl + '#success=true'));
  } else {
    res.redirect(returnUrl + '#success=true');
  }
});

router.get('/login-done', function(req, res) {
  res.render('login-done', {});
});

router.get('/reset', function(req, res) {
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }
  res.clearCookie('email');
  ClientAuth.deleteByReaderId(readerId);
  res.redirect("/");
});

router.get('/logout', function(req, res) {
  res.clearCookie('email');
  res.redirect("/");  
});

module.exports = router;
