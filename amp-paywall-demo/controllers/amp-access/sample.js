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

var express = require('express');
var router = express.Router();

var ARTICLES = [];

// add some sample articles
for (var i = 0; i < 10; i++) {
  ARTICLES.push({id: i, title: 'Article ' + (i + 1)});
}

/**
 * List all Articles
 **/
router.get('/', function(req, res) {
  res.render('amp-access/list', {
    title: 'Select an article to get started',
    fcf: false,
    articles: ARTICLES
  });
});

/**
 * Test page for first-click-free
 **/
router.get('/fcf', function(req, res) {
  res.render('amp-access/list', {
    title: 'First-Click-Free Test Links',
    fcf: true,
    articles: ARTICLES
  });
});

/**
 * View a single Article
 **/
router.get(['/((\\d+))', '/server/((\\d+))'], function(req, res) {
  var id = parseInt(req.params[0]);
  if (!ARTICLES[id]) {
    res.sendStatus(404);
    return;
  }
  var host = req.get('host');
  // http works only on localhost
  var protocol = host.startsWith('localhost') ? 'http' : 'https';
  res.render('amp-access/article', {
    host: protocol + '://' + host,
    serverMode: req.originalUrl.indexOf('/server/') >= 0,
    id: id,
    title: ARTICLES[id].title,
    prev: prevArticleId(id),
    next: nextArticleId(id)
  });
});

router.get('/washingtonpost/((\\d+))', function(req, res) {
  var id = parseInt(req.params[0]);
  var host = req.get('host');
  // http works only on localhost
  var protocol = host.startsWith('localhost') ? 'http' : 'https';
  res.render("amp-access/washingtonpost/" + id, {
    host: protocol + '://' + host
  });
});

function prevArticleId(id) {
  var prevId = id - 1;
  return prevId >= 0 ? String(prevId) : false;
}

function nextArticleId(id) {
  var nextId = id + 1;
  return nextId < ARTICLES.length ? nextId : false;
}

module.exports = router;
