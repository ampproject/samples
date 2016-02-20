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

var EVENTS = {};

/**
 * Counts an analytics event.
 */
exports.trackEvent = function(account, event) {
  if (!account || !event) {
    return false;
  }
  var data = EVENTS[account];
  if (!data) {
    data = {};
    EVENTS[account] = data;
  }
  var eventCount = data[event];
  if (!eventCount) {
    eventCount = 0;
  }
  return data[event] = eventCount + 1;
}

/**
 * Returns analytics for the given account.
 */
exports.forAccount = function(account) {
  return formatData(EVENTS[account]);
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
