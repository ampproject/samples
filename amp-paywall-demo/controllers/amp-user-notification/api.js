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
var UserNotification = require("../../models/user-notifications");

/**
 * AMP will make a CORS GET request to this URL to determine whether 
 * the notification should be shown. The AMP runtime will append the elementId and 
 * ampUserId query string fields to the href provided on the data-show-if-href
 * attribute. 
 */
router.get('/show', function(req, res){
	var userId = req.query.ampUserId;
	var notificationId = req.query.elementId;
	var showNotification = UserNotification.shouldShowNotification(notificationId, userId);
	res.json({ "showNotification": showNotification});
});

/**
 * AMP will make a CORS POST request to this URL transmitting the elementId 
 * and ampUserId only when the user dismisses the notification.
 */
router.post('/dismiss', function(req, res){
	var userId = req.body.ampUserId;
	var notificationId = req.body.elementId;
	UserNotification.dismissNotification(notificationId, userId);
	res.json({});
});

module.exports = router;