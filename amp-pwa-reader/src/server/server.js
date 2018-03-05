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
const path = require('path');
const pubBackend = require('/dist/server/Backend.js');

const app = express();
const pub = new pubBackend();

// Serve static JS and CSS files the easy way.
app.use(express.static('./dist'));
//app.use(express.static('*/.map'));

// When user requests main app, serve index.html
app.use('/', express.static('./dist/index.html'));
//app.use('/index.html', express.static('./dist/index.html'));

// When user requests an article, serve the AMP version of that article, with serviceworker injected.
// But if that article is requested with a query param, that means it's come from the service worker,
// and we should serve the PWA.

app.get('/' + pub.pathname + '/*', (req, res) => {
  console.log('req.params:');  console.log(req.params);
  console.log('req.query:'); console.log(req.query);
  if (req.query.pwa) {
    let options = { root: __dirname + '/dist/' };
    res.sendFile('index.html', options);

  } else {
    let categoryAndUrl = splitUrlCategory(req.params[0]);
    const ampUrl = pub.constructAMPUrl(categoryAndUrl.category, categoryAndUrl.url);

    console.log("ampUrl is " + ampUrl);
    request(ampUrl, function(error, response, body) {
      if (!error) {
        res.send(addServiceWorker(body));
      } else {
        res.json({error: 'An error occurred in the article route'});
      }      
    });

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
      res.json({error: 'An error occurred in /proxy route'});
    }
  });
});

// app.get('*')

// listen for requests :)
const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

// inject service worker HTML into an HTML document.
function addServiceWorker(html) {
  const swHeadHTML = fs.readFileSync('partials/sw_head.html', 'utf8');
  const swBodyHTML = fs.readFileSync('partials/sw_body.html', 'utf8');

  return html.replace('</head>', swHeadHTML + "\n$&")
             .replace(/<body.+?>/, "$&\n" + swBodyHTML)
  ;
}

// Split the category (the first element in the URL) from the rest.
function splitUrlCategory(srUrl) {
  let matches = srUrl.match(/(.+?)\/(.+)/);
  return {category: matches[1], url: matches[2]};
}