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
var consts = require('./common/consts');

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

var AUTH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 2; //2 hours
var ROOT = __dirname;
var ARCHIVE_ROOT = path.join(ROOT, 'archive');

var MAX_VIEWS = 3;

var ARTICLES = [];
for (var i = 0; i <= 10; i++) {
  ARTICLES.push({id: i, title: 'Article ' + i});
}

var CLIENT_ACCESS = {};
var USERS = {};

USERS['subscriber@example.com'] = {
  email: 'subscriber@example.com',
  password: '123456',
  subscriber: true
};

function cookieJoin(req, clientAuth) {
  //retrieve the cookie. If it's not null, add a reference to the user on CLIENT_ACCESS[readerId]
  var email = req.cookies.email;
  console.log("email: " + email);
  if (email && USERS[email]) {
    clientAuth.user = USERS[email];
  }
}

function getOrCreateClientAuth(readerId) {
  console.log("getOrCreateClientAuth");
  var clientAuth = CLIENT_ACCESS[readerId];
  if (!clientAuth) {
    clientAuth = {
      viewedUrls: {}            
    };
    CLIENT_ACCESS[readerId] = clientAuth;
  }
  return clientAuth;
}

/** Logging middleware */
app.use(function(request, response, next) {
  console.log(request.method + ":" + request.url);
  next();
});

/** CORS middleware for AMP callbacks */
app.use(function(req, res, next) {
  if (req.url.startsWith('/amp-')) {
    // In practice, Origin should be restricted to a few well-known domains.
    var requestingOrigin = req.header('Origin');
    console.log('---- requesting origin: ', requestingOrigin);
    if (requestingOrigin) {
      res.setHeader('Access-Control-Allow-Origin', requestingOrigin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

/** Sample Article */
app.get('/', function(req, res) {
  res.locals = { articles: ARTICLES } ;
  res.render('list', {
  });
});

/** Sample Article */
app.get('/c/:id.html', function(req, res) {
  id = req.params.id;
  if (!id) {
    res.sendStatus(404);
    return;
  }

  host = req.get('host');
  protocol = host.startsWith('localhost') ? 'http' : 'https';
  res.locals = { 
    'host': protocol + '://' + req.get('host'),
    'id': id,
    'title': ARTICLES[id].title
  };
  res.render('index', {});
});

/** LOGIN ENDPOINT */
app.get('/login', function(req, res) {
  console.log('Serve /login');
  res.render('login', {root: ROOT});
});

app.post('/login-submit', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var returnUrl = req.body.returnurl;
  var readerId = req.body.rid;
  console.log('POST: ', email, returnUrl, readerId);

  var user = USERS[email];
  if (!user || user.password != password) {
    res.redirect('/login?rid=' + readerId + "&return=" + returnUrl);
    return;    
  }

  // Login
  var clientAuth = getOrCreateClientAuth(readerId);
  clientAuth.user = user;  

  console.log('Logged in: ', CLIENT_ACCESS[readerId]);

  // Set cookies
  res.cookie('email', user.email, {
    maxAge: AUTH_COOKIE_MAX_AGE  // 2hr
  });

  // Redirect
  if (consts.LOGIN_TRANSITIVES) {
    res.redirect('/login-done?return=' +
        encodeURIComponent(returnUrl + '#success=true'));
  } else {
    res.redirect(returnUrl + '#success=true');
  }
});

app.get('/login-done', function(req, res) {
  res.render('login-done', {root: ROOT});
});

/** AUTHORIZATION CORS */
app.get('/amp-authorization.json', function(req, res) {
  console.log('Client access verification');
  var readerId = req.query.rid;
  if (!readerId) {
    res.sendStatus(400);
    return;
  }
  var viewedUrl = req.query.url;

  var clientAuth = getOrCreateClientAuth(readerId);
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

  var clientAuth = getOrCreateClientAuth(readerId);
  cookieJoin(req, clientAuth);


  if (!clientAuth.user) {
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
