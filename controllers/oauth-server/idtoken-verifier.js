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

const fetch = require('node-fetch');
const VALIDATION_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=';

exports.verify = function(idToken) {
  return new Promise((resolve, reject) => {
    fetch(VALIDATION_ENDPOINT + idToken)
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      })
  }); 
}