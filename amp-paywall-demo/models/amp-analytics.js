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

var EVENTS = {};
var USER_CHANGE_LISTENERS = {};
var GLOBAL_ANALYTICS = '__all_users__';

/**
 * Counts an analytics event.
 */
exports.trackEvent = function(account, event, user) {
  console.log('track ' + account + ';' + event + ';' + user);
  if (!account || !event) {
    return false;
  }
  trackUserEvent(account, event, GLOBAL_ANALYTICS);
  if (user) {
    trackUserEvent(account, event, user);
  }
  return true;
}

function trackUserEvent(account, event, user) {
  var accountData = get(EVENTS, account);
  var userData = get(accountData, user);
  inc(userData, event);
  notifyListeners(user, userData);
}

function get(obj, prop) {
  var value = obj[prop];
  if (!value) {
    value = {};
    obj[prop] = value;
  }
  return value;
}

function inc(data, event) {
  var eventCount = data[event];
  if (!eventCount) {
    eventCount = 0;
  }
  return data[event] = eventCount + 1;
}

/**
 * Returns analytics for the given user and account.
 */
exports.forUser = function(account, user) {
  var accountData = EVENTS[account];
  if (!accountData) {
    return '';
  }
  return formatData(accountData[user]);
}

/**
 * Returns analytics for the given account.
 */
exports.forAccount = function(account) {
  return module.exports.forUser(account, GLOBAL_ANALYTICS);
}

/**
 * Add user analytics change listener.
 */
exports.addUserListener = function(userId, callback) {
  var listeners = USER_CHANGE_LISTENERS[userId];
  if (!listeners) {
    listeners = [];
    USER_CHANGE_LISTENERS[userId] = listeners;
  }
  listeners.push(callback);
}

/**
 * Remove user analytics change listener.
 **/
exports.removeUserListener = function(userId, callback) {
  var listeners = USER_CHANGE_LISTENERS[userId];
  if (!listeners) {
    console.log('error: no listener registered for user ' + user);
    return;
  }
  var index = listeners.indexOf(callback);
  if (index == -1) {
    return;
  }
  listeners.splice(index, 1);
}

function notifyListeners(user, data) {
  var listeners = USER_CHANGE_LISTENERS[user]
  if(!listeners) {
    console.log('no listeners for user events ' + user);
    return;
  }
  console.log('notify listeners for user events ' + user);
  var formattedData = formatData(data);
  listeners.forEach(function(listener) {
    listener(formattedData);
  });
}

/**
 * Make our analytics data mustache compatible.
 */
function formatData(object) {
  var result = [];
  for (var prop in object) {
    if (object.hasOwnProperty(prop)){
      result.push({
        'key' : prop,
        'value' : object[prop]
      });
    }
  }
  return result;
}
