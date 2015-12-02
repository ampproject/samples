'use strict';
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


/**
 * NOTE!!! Everything here must move to appropriate place in AMP Viewer and
 * AMP Runtime.
 *
 * @param {string} postbackOrigin
 * @param {!http.ServerResponse} resp
 */
module.exports.includeViewerCode = function includeViewerCode(
    postbackOrigin, documentUrl, resp) {
  console.log('---- include viewer code');
  let loginToken = 'LOGIN' + Math.random();
  let postbackUrl = 'http://' + postbackOrigin + '/postback';
  let loginUrl = 'http://' + postbackOrigin + '/login' +
      '?logintoken=' + encodeURIComponent(loginToken) +
      '&url=' + encodeURIComponent(documentUrl);
  let loginWaitUrl = 'http://' + postbackOrigin + '/loginwait' +
      '?logintoken=' + encodeURIComponent(loginToken) +
      '&url=' + encodeURIComponent(documentUrl);
  resp.write('<script>' +
      'var el = document.querySelector("[on=\'tap1:paywall.login\']");' +
      'console.log("LOGIN EL:", el);' +
      'if (el) {' +
      'el.onclick = function() {' +
      '  window.open(' + JSON.stringify(loginUrl) + ', "_blank");' +

      ' console.log("wait at", ' + JSON.stringify(loginWaitUrl) + ');' +

      // TODO: wait repeatedly.
      ' var req = new XMLHttpRequest();' +
      ' req.addEventListener("load", function() {' +
      '   console.log("login wait response: ", this.responseText.trim());' +
      '   window.location.replace(this.responseText);' +
      ' });' +
      ' req.open("GET", ' + JSON.stringify(loginWaitUrl) + ');' +
      ' req.send();' +
      '};' +
      '}' +
      '</script>');
};
