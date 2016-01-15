var express = require('express')
  , router = express.Router()

var MAX_VIEWS = 3;

ClientAuth = require('../models/client-access');
User = require('../models/user');

/** AUTHORIZATION CORS */
router.get('/amp-authorization.json', function(req, res) {
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

function cookieJoin(req, clientAuth) {
  //retrieve the cookie. If it's not null, add a reference to the user on CLIENT_ACCESS[readerId]
  var email = req.cookies.email;
  var user = User.findByEmail(email)
  if (email && user) {
    clientAuth.user = user;
  }
}

module.exports = router
