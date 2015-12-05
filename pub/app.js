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

var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var urlModule = require('url');

var PORT = 8002;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ROOT = __dirname;
var ARCHIVE_ROOT = path.join(ROOT, 'archive');

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: ROOT});
});

/*
app.get('/info', function(req, res) {
  var d = new Date();
  var dateStr = '' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds();
  res.cookie('LastInfo', dateStr, {
    maxAge: 1000 * 60 * 60 * 2  // 2hr
  });
  res.sendFile('info.html', {root: ROOT});
});
*/

/* STATICS */
app.get('/archive/img/*', function(req, res) {
  var base = path.parse(req.path).base;
  console.log('GET archive image: ', base);
  res.sendFile(base, {root: path.join(ARCHIVE_ROOT, 'img')});
});
app.get('/archive/video/*', function(req, res) {
  var base = path.parse(req.path).base;
  console.log('GET archive video: ', base);
  res.sendFile(base, {root: path.join(ARCHIVE_ROOT, 'video')});
});
app.get('/archive/*', function(req, res) {
  var base = path.parse(req.path).base;
  console.log('GET archive: ', base);
  res.sendFile(base, {root: ARCHIVE_ROOT});
});


/* LOGIN SUPPORT */
app.get('/login', function(req, res) {
  res.sendFile('login.html', {root: ROOT});
});

app.post('/login-submit', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var returnUrl = req.body.returnurl;
  console.log('POST: ', email, returnUrl);

  var authToken = '1234567';

  // Set cookies
  res.cookie('Auth', email, {
    maxAge: 1000 * 60 * 60 * 2  // 2hr
  });
  res.cookie('AuthToken', authToken, {
    maxAge: 1000 * 60 * 60 * 2  // 2hr
  });

  // Redirect
  res.redirect('/login-done?return=' + encodeURIComponent(
      returnUrl + '#authtoken=' + encodeURIComponent(authToken)));
});

app.get('/login-done', function(req, res) {
  res.sendFile('login-done.html', {root: ROOT});
});


/* ACCESS RPC */
app.get('/access', function(req, res) {
  console.log('Access verification');
  var authToken = req.query.authtoken;
  if (!authToken) {
    res.status(400).end();
    return;
  }

  if (authToken == '1234567') {
    res.json({
      'authToken': authToken,
      categories: {
        'default': {}
      }
    });
    return;
  }

  // Not found.
  res.status(404).end();
});


var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Publisher listening on: ', port);
  console.log('ROOT: ' + ROOT);
  console.log('ARCHIVE_ROOT: ' + ARCHIVE_ROOT);
});
