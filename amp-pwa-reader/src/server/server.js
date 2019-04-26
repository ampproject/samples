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
const memCache = require('memory-cache');
const pubBackend = require('./Backend.js');
const enforce = require('express-sslify');
const helmet = require('helmet');
const xmlParser = require('xml2json');

const ENVIRONMENT_PRODUCTION = 'production';

const app = express();
const pub = new pubBackend();

app.use(helmet());

if (app.get('env') === ENVIRONMENT_PRODUCTION) {
    app.use((req, res, next) => {
        enforce.HTTPS({ trustProtoHeader: true })(req, res, next);
    });
}

// how long (in seconds) to cache requests for main feed and for any article
const cacheDurations = {feed: 600, article: 3600};

const staticFilesMiddleware = express.static('dist');
app.use(staticFilesMiddleware);

// Here, we cache the feed, and we convert it to JSON.
app.get('/feed', cache(cacheDurations.feed), function(req, res, next) {
  const options = {
    url: req.query.q
  };


  request(options, (error, response, body) => {
    if (!error) {
      res.send(xmlParser.toJson(body));
    } else {
      res.json({error: 'An error occurred in /feed route'});
    }
  });
});

// This is used when the PWA requests a new article.
// We proxy this request so that we can cache it.
app.get('/article', cache(cacheDurations.article), function(req, res, next) {
  const options = {
    url: req.query.url
  };

  request(options, (error, response, body) => {
    if (!error) {
      res.send(body);
    } else {
      res.json({error: 'An error occurred in /article route'});
    }
  });
});


// This is used when the user requests an article. Serve the AMP version of that article,
// injecting our service worker and replacing the Guardian's menu with one that works for Shadow Reader.
// TODO: Enhance this to serve categories' cards along with the article so that they're preloaded.
app.get('/' + pub.pathname + '/*', (req, res) => {
  let isSectionUrl = !req.params[0].match(/\/./);

// If this URL is for a section, not an article, then return the Shadow Reader instead.
  if (isSectionUrl) {
    res.sendFile(path.join(__dirname, '../index.html'));

  } else {

// Build the AMP URL from the Shadow Reader URL, and request the AMP.
    let categoryAndUrl = getCategoryAndArticleURL(req.params[0]);
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


// listen for requests :)
const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});



/** HELPERS **/

// Cache with memory-cache. A tip of the pin to https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
// Essentially, we wrap res.send() in a function that first puts the result in the cache.
function cache(seconds) {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedBody = memCache.get(key);

    if (cachedBody) {
      console.log('** cache hit: ' + key);
      res.send(cachedBody);

    } else {
      console.log('** cache miss: ' + key);
      res.justSend = res.send;
      res.send = (body) => {
        memCache.put(key, body, seconds * 1000);
        res.justSend(body);
      };

      next();
    }
  }
}

// Inject service worker HTML into an HTML document.
function addServiceWorker(html) {
  const swHeadHTML = fs.readFileSync(path.join(__dirname, 'partials/sw_head.html'), 'utf8');
  const swBodyHTML = fs.readFileSync(path.join(__dirname, 'partials/sw_body.html'), 'utf8');

  return html.replace('</head>', swHeadHTML + "\n$&")
             .replace(/<body.+?>/, "$&\n" + swBodyHTML)
  ;
}

// Replace the sidebar with one that works for the Shadow Reader.
// TODO: replace URLs in the nav links as well.
function replaceSidebar(html) {
  const template = fs.readFileSync(path.join(__dirname, 'partials/sidebar_link.html'), 'utf8');
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
function getCategoryAndArticleURL(srUrl) {
  let matches = srUrl.match(/(.+?)\/(.+)/);
  return {category: matches[1], url: matches[2]};
}