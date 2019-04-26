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
    this.cardLimit = 15; // load no more than this many article cards at once
  }

  fetch(category, attempts = 0) {

    let rssUrl = shadowReader.backend.getRSSUrl(category);
    let feedUrl = '/feed?q=' + rssUrl;

    return fetch(feedUrl)
      .then(response => response.json() )
      .then(json => {

        // sadly, the Guardian's RSS feeds seem to be having intermittent failures right now,
        // so rerequest if that happens
        if(!json.rss && attempts < 10) {
          return this.fetch(category, (attempts || 0) + 1);
        }

        var entries = (json.rss.channel && json.rss.channel.item) || [];
        entries = entries.slice(0, this.cardLimit);

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