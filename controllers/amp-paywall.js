var express = require('express')
  , router = express.Router()

var MAX_VIEWS = 3;
var MAX_FIRST_CLICK_FREE_VIEWS = 3;

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
      || clientAuth.viewedUrlsByReferrer[referrer] < 3;
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
  var user = User.findByEmail(email)
  if (email && user) {
    clientAuth.user = user;
  }
}

module.exports = router
