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

var Analytics = require('../../models/amp-analytics');

/**
 * Shows analytics for this sample.
 */
router.get('/', function(req, res) {
  var host = req.get('host');
  // http works only on localhost
  var protocol = host.startsWith('localhost') ? 'http' : 'https';
  var analytics = Analytics.forAccount('amp-publisher-sample');
  res.render('amp-analytics/demo', {
      data: analytics,
      host: protocol + '://' + host
  });
});

module.exports = router;
