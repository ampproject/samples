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
const serveStatic = require('serve-static');
const pubBackend = require('./Backend.js');

const app = express();
const pub = new pubBackend();

const staticFilesMiddleware = serveStatic(path.resolve('..'));
app.use(staticFilesMiddleware);

// When user requests an article, serve the AMP version of that article,
// injecting our service worker and replacing the Guardian's menu with one that works for Shadow Reader.

app.get('/' + pub.pathname + '/*', (req, res) => {
  let isSectionUrl = !req.params[0].match(/\/./);

// If this is URL is for a section, not an article, then return the Shadow Reader instead.
  if (isSectionUrl) {
    let options = { root: '../' };
    res.sendFile('index.html', options);

  } else {

// Build the AMP URL from the Shadow Reader URL, and request the AMP.
    let categoryAndUrl = splitUrlCategory(req.params[0]);
    const ampUrl = pub.constructAMPUrl(categoryAndUrl.category, categoryAndUrl.url);

    request(ampUrl, function(error, response, body) {
      if (!error) {
        res.send(addServiceWorker(replaceSidebar(body)));
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


// listen for requests :)
const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});



/** HELPERS **/

// Inject service worker HTML into an HTML document.
function addServiceWorker(html) {
  const swHeadHTML = fs.readFileSync('partials/sw_head.html', 'utf8');
  const swBodyHTML = fs.readFileSync('partials/sw_body.html', 'utf8');

  return html.replace('</head>', swHeadHTML + "\n$&")
             .replace(/<body.+?>/, "$&\n" + swBodyHTML)
  ;
}

// Replace the sidebar with one that works for the Shadow Reader.
function replaceSidebar(html) {
  const template = fs.readFileSync('partials/sidebar.html', 'utf8');
  const basePath = '/' + pub.pathname + '/';
  let newSidebarHTML = '';

// Create one link for each Shadow Reader category.
  for (let path in pub.categories) {
    newSidebarHTML += template.replace('%href%', basePath + path)
                              .replace('%title%', pub.categories[path]);
  }

  return html.replace(/(<amp-sidebar[^]+?>)[^]+<\/amp-sidebar>/, "$1\n" + newSidebarHTML + "\n</amp-sidebar>");
}

// Split the category (the first element in the URL) from the rest.
function splitUrlCategory(srUrl) {
  let matches = srUrl.match(/(.+?)\/(.+)/);
  return {category: matches[1], url: matches[2]};
}