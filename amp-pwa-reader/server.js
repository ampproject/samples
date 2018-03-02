/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
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

const express = require('express');
const request = require('request');
const fs = require('fs');
const app = express();
const pubBackend = require('./src/js/Backend.js');

const pub = new pubBackend();
//app.locals.pub = pub;  // Do we actually need to do that?

// Serve static JS and CSS files the easy way. When user requests main app, serve index.html
app.use(express.static('dist'));
app.use('/', express.static('./dist/index.html'));

// When user requests an article, serve the AMP version of that article, with serviceworker injected.
// But if that article is requested with a query param, that means it's come from the service worker,
// and we should serve the PWA.

app.get('/' + pub.pathname + ':articlePath', (req, res) => {
//  const pub = app.locals.pub;
  const ampUrl = pub.constructAMPUrl(req.params.articlePath);

  if (req.query.pwa) {
    request(ampUrl, function(error, response, body) {
      if (!error) {
        res.send(addServiceWorker(body));
      } else {
        res.json({error: 'An error occurred'});
      }      
    });

  } else {
    res.send(fs.readFileSync(req.url)); 
  }  

});

// This is used when the PWA requests a new article.
app.get('/proxy', (req, res) => {
  const options = {
    url: req.query.url,
    headers: {
      'origin': 'http://glitch.com'
    }
  };
  
  request(options, (error, response, body) => {
    if (!error) {
      res.send(body);
    } else {
      res.json({error: 'An error occurred'});
    }
  });
});

// listen for requests :)
const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

// inject service worker HTML into an HTML document.
function addServiceWorker(html) {
  const swHeadHTML = fs.readFileSync('./sw_head.html');
  const swBodyHTML = fs.readFileSync('./sw_body.html');

  return html.replace('</head>', swHeadHTML + "\n</head>")
             .replace('<body>', "<body>\n" + swBodyHTML)
  ;
}