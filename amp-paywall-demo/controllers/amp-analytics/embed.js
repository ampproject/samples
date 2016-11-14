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
var hogan = require("hogan.js");

var router = express.Router();

var Analytics = require('../../models/amp-analytics');

var analyticsTemplate = hogan.compile(`
    <table>
    <tr>
      <th>Event</th>
      <th>Count</th>
    </tr>
    {{#data}}
    <tr>
      <td>{{key}}</td><td>{{value}}</td>
    </tr>
    {{/data}}
    {{^data}}
    No data available.
    {{/data}}
    </table>`.replace(/\n/g, ''));

router.get('/listen', function(req, res){
  var account = req.query.account;
  var user = req.query.user;
  if (!account || !user) {
    res.sendStatus(400);
  }
  console.log('new connection for user ' + user);
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  var onNewAnalyticsData = function(userData) {
    var content = analyticsTemplate.render({data: userData});
    console.log('received user event ' + content);
    res.write('data: ' + content + '\n\n');
  };

  var userData = Analytics.forUser(account, user);
  onNewAnalyticsData(userData);

  Analytics.addUserListener(user, onNewAnalyticsData);
  req.on("close", function() {
    Analytics.removeUserListener(user, onNewAnalyticsData);
  });
});

/**
 * Lists all available analytics data for the given account.
 *
 * Example: /amp-analytics/view?acccount=AN_ACCOUNT
 */
router.get('/', function(req, res) {
  var account = req.query.account;
  var user = req.query.user;
  var analytics = Analytics.forUser(account, user);
  res.render('amp-analytics/embed', {
      account: account,
      user: user,
      data: analytics
  });
});

module.exports = router;
