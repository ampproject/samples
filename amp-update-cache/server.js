/**
 * Copyright 2015-2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const CacheRefresh = require('./cache-refresh');
const express = require('express');
const multer = require('multer'); // Use multer to parse muti-part forms.
const upload = multer();
const app = express();

app.use(express.static('public'));

app.post('/api/cache/generate-update-url', upload.array(), (req, res) => {
  const privateKey = req.body.privatekey;
  const url = req.body.url;
  const cacheRefresh = new CacheRefresh(privateKey);
  const signedRefreshUrl = cacheRefresh.createRefreshUrl(url);

  // Append CORS headers.
  const requestingOrigin = req.headers.origin;
  const requestingSourceOrigin = req.query.__amp_source_origin;
  res.header('Access-Control-Allow-Origin', requestingOrigin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
  res.setHeader('AMP-Access-Control-Allow-Source-Origin', requestingSourceOrigin);

  res.send({cacheRefreshUrl: signedRefreshUrl});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port', port,'!');
});

