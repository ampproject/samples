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
var uuid = require('uuid');
var router = express.Router();
var GA_HOST = "https://www.google-analytics.com";
var EXPIRES = 60 * 60 * 24 * 365; //1 year

/**
 * Adds the uid parameter to the google-analytics request
 * and redirects to google-analytics.
 *
 * More info on UserID for google-analytics here:
 *   - https://support.google.com/analytics/answer/3123662
 *   - https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#uid
 *
 * Example: /collect?cid=1234
 */
router.post('/', function(req, res) {
  // Enable CORS.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Check for the userId cookie.
  var uid = req.cookies.userId;

  if (!uid) {
    // Create a new userId if one doesn't exist.
    uid = uuid.v4();
    console.log("Generated new userId: " + uid);

    // The desktop website should be modified to use the value of the
    // userId cookie as the userId in GA.
    res.cookie('userId', uid, { maxAge: EXPIRES, httpOnly: true });
  }

  console.log("Redirecting to Google Analytics with UID: " + uid);

  // Replace the cid in the request with the one from our domain.
  var location = GA_HOST + req.originalUrl + "&uid=" + uid;

  // Redirect the request to google-analytics.
  res.setHeader("Location", location);
  res.sendStatus(302);
});

module.exports = router;
