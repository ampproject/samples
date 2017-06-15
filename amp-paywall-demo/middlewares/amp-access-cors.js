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

var url = require('url');

var VALID_AMP_ORIGINS = [/.*\.ampproject\.org/g, /cdn\.edgeamp\.org/g, /amp\.cloudflare\.com/g, /cdn\.ampcache\.org/g];
var VALID_SOURCE_ORIGINS = [/ampbyexample\.com/g, /amp-by-example-staging\.appspot\.com/g,
    /rocky-sierra-1919\.herokuapp\.com/g, /limitless-tundra-65881\.herokuapp\.com/g];

/**
 * Enable CORS for all AMP API requests. More information here:
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md
 */
module.exports = function(req, res, next) {
  // Enable CORS only for API requests
  if (req.url.indexOf('/api/') > -1) {
    // Verify the origin (AMP and publisher domain)
    var requestingOrigin = req.headers.origin;
    if (!isValidOrigin(req, requestingOrigin)) {
      console.log('invalid origin: ' + requestingOrigin);
      // The request is not authorized
      res.sendStatus(401);
      return;
    }
    // Verify the source origin (publisher domain)
    var requestingSourceOrigin = req.query.__amp_source_origin;
    if (!isValidSourceOrigin(req, requestingSourceOrigin)) {
      console.log('invalid source origin: ' + requestingSourceOrigin);
      // The request is not authorized
      res.sendStatus(401);
      return;
    }
    console.log('---- valid requesting origins');
    // Return the allowed requesting origin
    res.header('Access-Control-Allow-Origin', requestingOrigin);
    // Allow CORS credentials
    res.header('Access-Control-Allow-Credentials', 'true');
    // Allow the CORS response to contain the "AMP-Access-Control-Allow-Source-Origin" header.
    res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    // The source origin that is allowed to read the authorization response
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', requestingSourceOrigin);
  }
  next();
};

/**
 * Check requesting origin. This has to be restricted to only allow
 * the following origins:
 *
 * - *.ampproject.org
 * - The Publisher’s own origins
 *
 */
function isValidOrigin(req, origin) {
  if (!origin) {
    // if origin not set verify the request host
    origin = req.protocol + '://' + req.hostname;
  }
  console.log('---- verifying origin: ', origin);
  return matchesAnyOrigin(VALID_AMP_ORIGINS, origin) || isValidSourceOrigin(req, origin);
}

/**
 * Check requesting source origin. This has to be restricted to only
 * allow the Publisher's own origin.
 */
function isValidSourceOrigin(req, sourceOrigin) {
  console.log('---- verifying source origin: ', sourceOrigin);
  if (req.hostname == 'localhost' && req.app.get('env') == 'development') {
    console.log('no origin check in dev mode');
    return true;
  }
  return matchesAnyOrigin(VALID_SOURCE_ORIGINS, sourceOrigin);
}

/**
 * Returns true if any of the validOrigins patterns matches the given
 * origin.
 */
function matchesAnyOrigin(validOrigins, origin) {
  if (!origin) {
    return false;
  }
  var host = url.parse(origin).hostname;
  if (!host) {
    return false;
  }
  for (var i = 0; i < validOrigins.length; i++) {
    var urlPattern = validOrigins[i];
    if (host.match(urlPattern)) {
      return true;
    }
  }
  return false;
}

