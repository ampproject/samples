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

var DISMISSED_NOTIFICATIONS = {};

/**
 * Returns true if the notification should be shown for the user
 * and notificationId
 */
exports.shouldShowNotification = function(notificationId, userId) {
	var user = DISMISSED_NOTIFICATIONS[userId];
	if (!user) {
		return true;
	}
	return !user[notificationId];
}

/**
 * Dismisses further notifications for the user and notificationId
 */
exports.dismissNotification = function(notificationId, userId) {
	var user = DISMISSED_NOTIFICATIONS[userId];
	if (!user) {
		user = {};
		DISMISSED_NOTIFICATIONS[userId] = user;
	}
	user[notificationId] = true;
};
