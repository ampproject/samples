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

class FeedReader {

  constructor() {

  }

  fetch(category) {

    let rssUrl = shadowReader.backend.getRSSUrl(category);
    let yqlQuery = 'select * from feed where url = \'' + encodeURIComponent(rssUrl) + '\'';
    let yqlUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + yqlQuery + '&format=json';

    return fetch(yqlUrl)
      .then(response => response.json() )
      .then(rss => {

        var entries = rss.query.results.item;
        return entries.map(entry => {
          return {
            title: shadowReader.backend.getRSSTitle(entry),
            description: shadowReader.backend.getRSSDescription(entry),
            link: entry.link,
            image: shadowReader.backend.getRSSImage(entry)
          };
        });

      });

  }

}