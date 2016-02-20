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

var express = require('express');
var router = express.Router();

var Analytics = require('../../models/amp-analytics');

/**
 * Registers an event for the given account. 
 *
 * Example: /amp-analytics/ping?acccount=AN_ACCOUNT&event=AN_EVENT
 */
router.post('/', function(req, res) {
  // enable CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  // register the event
  var account = req.query.account;
  var event = req.query.event;
  if (!Analytics.trackEvent(account, event)) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

module.exports = router;
