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
"use strict";

var url = require('url');

var VALID_ORIGINS = [/.*\.ampproject\.org/g];
var VALID_SOURCE_ORIGINS = [/localhost/, /rocky-sierra-1919\.herokuapp\.com/g];

/**
 * Enable CORS for all AMP API requests. More information here: 
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md 
 */
module.exports = function(req, res, next) {
  if (req.url.indexOf('/api/') > -1) {
    // check the origin
    var requestingOrigin = req.headers['origin'];
    console.log('---- requesting origin: ', requestingOrigin);
    if (isValidOrigin(requestingOrigin)) {
      // return the allowed requesting origin as required by the CORS spec
      res.setHeader('Access-Control-Allow-Origin', requestingOrigin);
    }

    // check the source origin
    var requestingSourceOrigin = req.query.__amp_source_origin;
    console.log('---- requesting source origin: ', requestingSourceOrigin);
    if (isValidSourceOrigin(requestingSourceOrigin)) {
      // The source origin that is allowed to read the authorization response 
      res.setHeader('AMP-Access-Control-Allow-Source-Origin', requestingSourceOrigin);
      // Allow the CORS response to contain the "AMP-Access-Control-Allow-Source-Origin" header.
      res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    } else {
      // the request is not authorized
      res.sendStatus(401).end();
      return;
    }
  }
  next();
};

/**
 * Check requesting origin. This has to be restricted to only allow 
 * the following origins:
 *
 * - *.ampproject.org
 * - The Publisher’s own origins
 */
function isValidOrigin(origin) {
  return matchesAnyOrigin(VALID_ORIGINS, origin) && isValidSourceOrigin(origin);
}

/**
 * Check requesting source origin. This has to be restricted to only
 * allow the Publisher's own origin.
 */
function isValidSourceOrigin(sourceOrigin) {
  return matchesAnyOrigin(VALID_SOURCE_ORIGINS, sourceOrigin);
}

/**
 * Returns true if any of the validOrigins patterns matches the given 
 * origin.
 */
function matchesAnyOrigin(validOrigins, origin) {
  if(!origin) {
    return false;
  }
  var host = url.parse(origin).hostname;
  for (var i = 0; i < validOrigins.length; i++) {
    var urlPattern = validOrigins[i];
    if (host.match(urlPattern)) {
      return true;
    }
  }
  return false;
}
