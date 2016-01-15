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
var _ = require('underscore');
var urlModule = require('url');
var urlModule = require('url');

var PORT = 8002;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));
app.locals.delimiters = '<% %>';

app.use(require('./middlewares/amp-paywall-cors'));
app.use(require('./middlewares/logging'));

app.use(require('./controllers/article'));
app.use(require('./controllers/login'));

ClientAuth = require('./models/client-access');
User = require('./models/user');

var AUTH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 2; //2 hours
var ROOT = __dirname;
var ARCHIVE_ROOT = path.join(ROOT, 'archive');

var MAX_VIEWS = 3;

function cookieJoin(req, clientAuth) {
  //retrieve the cookie. If it's not null, add a reference to the user on CLIENT_ACCESS[readerId]
  var email = req.cookies.email;
  var user = User.findByEmail(email)
  if (email && user) {
    clientAuth.user = user;
  }
}

/** AUTHORIZATION CORS */
app.get('/amp-authorization.json', function(req, res) {
  console.log('Client access verification');
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }
  var viewedUrl = req.query.url;

  var clientAuth = ClientAuth.getOrCreate(readerId);
  console.log("viewedUrls: " + Object.keys(clientAuth.viewedUrls).length);

  cookieJoin(req, clientAuth);

  var response;
  console.log('client auth', clientAuth.user);
  if (clientAuth.user) {
    // Subscriber.
    response = {
      'access': true
    };
  } else {
    // Metered.
    var views = Object.keys(clientAuth.viewedUrls).length;

    // Count view if user hasn't already seen the url.
    if (!(viewedUrl in clientAuth.viewedUrls)) {
      views += 1;
    }

    response = {
      'views': views,
      'maxViews': MAX_VIEWS,
      'access': (views <= MAX_VIEWS)
    };
  }
  console.log('Authorization response:', readerId, response);
  res.json(response);
});

/** PINGBACK CORS */
app.post('/amp-pingback', function(req, res) {
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

  var clientAuth = ClientAuth.getOrCreate(readerId);
  cookieJoin(req, clientAuth);

  var views = Object.keys(clientAuth.viewedUrls).length;
  if (!clientAuth.user && views <= MAX_VIEWS) {
    // Metered.
    clientAuth.viewedUrls[viewedUrl] = true;
  }
  console.log('Pingback response:', readerId, {}, clientAuth);
  res.json({});
});

port = process.env.PORT || PORT;
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Publisher listening on: ', port);
  console.log('ROOT: ' + ROOT);
  console.log('ARCHIVE_ROOT: ' + ARCHIVE_ROOT);
});
