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

// This file contains an Express server that does two things:
//
// 1. During development, provide data APIs for the web app to consume
//
//     The development webpack-dev-server initiated via `npm start` can only serve
//     static files from the root project directory. This server provides two APIs
//     for dynamic data: listing AMP docs and retrieving contents of a single AMP doc.
//
//     For development, run `npm start`.
//     Then, in a **separate terminal shell**, run `node server.js`.
//
// 2. Testing the production build
//
//     `npm run build` builds the web app for production into the build/ folder.
//     This server also serves the content of that folder via express.static.
//
//     To test the prod build, run `npm run build && node server.js` and the navigate
//     to http://localhost:4000 on your web browser.

var express = require('express');
var path = require('path');
var pjson = require('./package.json');

// This port number must match that of `proxy` in `package.json`, which is used
// to redirect requests from the development server to the APIs in this file.
// See https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development
var port = pjson.proxy ? parseInt(pjson.proxy.split(':')[2]) : 4000;

var app = express();

var docs = [
  {
    "title": "16 Top Spots for Hiking",
    "section": "Top Spots",
    "kicker": "Don't forget your walking stick",
    "author": "Demetria T. Edwards",
    "date": "Sep 24, 2016 10:04 AM",
    "image": "/content/hero/21.jpeg",
    "url": "/content/21.amp.html"
  },
  {
    "title": "Vancouver in 48 Hours",
    "section": "48 Hours",
    "kicker": "A Marvel in British Columbia",
    "author": "Todd M. Smallwood",
    "date": "Sep 22, 2016 5:04 AM",
    "image": "/content/hero/6.jpeg",
    "url": "/content/6.amp.html"
  },
  {
    "title": "18 Top Spots for Backpacking",
    "section": "Top Spots",
    "kicker": "Pack your backpack",
    "author": "Demetria T. Edwards",
    "date": "Sep 20, 2016 7:06 AM",
    "image": "/content/hero/29.jpeg",
    "url": "/content/29.amp.html"
  },
  {
    "title": "Bucket List: New Zealand",
    "section": "Bucket List Adventures",
    "kicker": "This majestic land is offers everything from volcanic terrain to lush pastures",
    "author": "Nolan C. Sundquist",
    "date": "Sep 18, 2016 7:02 AM",
    "image": "/content/hero/12.jpeg",
    "url": "/content/12.amp.html"
  },
  {
    "title": "Bucket List: Sweden",
    "section": "Bucket List Adventures",
    "kicker": "Go Nordic and be amazed",
    "author": "Nolan C. Sundquist",
    "date": "Sep 16, 2016 1:37 PM",
    "image": "/content/hero/20.jpeg",
    "url": "/content/20.amp.html"
  },
  {
    "title": "Bucket List: Scotland",
    "section": "Bucket List Adventures",
    "kicker": "Venture into the highlands and see some truly remarkable sights",
    "author": "Nolan C. Sundquist",
    "date": "Sep 16, 2016 7:21 AM",
    "image": "/content/hero/17.jpeg",
    "url": "/content/17.amp.html"
  },
  {
    "title": "Bucket List: Grand Canyon",
    "section": "Bucket List Adventures",
    "kicker": "How to spend days exploring this US national treasure",
    "author": "Carol R. Wright",
    "date": "Sep 16, 2016 2:34 AM",
    "image": "/content/hero/16.jpeg",
    "url": "/content/16.amp.html"
  },
  {
    "title": "Bucket List: UK Countryside",
    "section": "Bucket List Adventures",
    "kicker": "Get outside the cities to relax in the idyllic heartland of the country",
    "author": "Shannon W. Marshall",
    "date": "Sep 14, 2016 9:25 AM",
    "image": "/content/hero/15.jpeg",
    "url": "/content/15.amp.html"
  },
  {
    "title": "Paris in 48 Hours",
    "section": "48 Hours",
    "kicker": "The City of Lights",
    "author": "Joan P. Cypert",
    "date": "Sep 13, 2016 2:14 PM",
    "image": "/content/hero/3.jpeg",
    "url": "/content/3.amp.html"
  },
  {
    "title": "Bucket List: Banff",
    "section": "Bucket List Adventures",
    "kicker": "Don't miss all that this scenic spot in Alberta's Rockies can offer",
    "author": "Shannon W. Marshall",
    "date": "Sep 13, 2016 1:56 PM",
    "image": "/content/hero/14.jpeg",
    "url": "/content/14.amp.html"
  },
  {
    "title": "Bucket List: Romania",
    "section": "Bucket List Adventures",
    "kicker": "Some of the most scenic spots on earth",
    "author": "Nolan C. Sundquist",
    "date": "Sep 12, 2016 6:19 AM",
    "image": "/content/hero/19.jpeg",
    "url": "/content/19.amp.html"
  },
  {
    "title": "Hamburg in 48 Hours",
    "section": "48 Hours",
    "kicker": "Gateway to the World",
    "author": "Joan P. Cypert",
    "date": "Sep 10, 2016 10:15 PM",
    "image": "/content/hero/1.jpeg",
    "url": "/content/1.amp.html"
  },
  {
    "title": "Chicago in 48 Hours",
    "section": "48 Hours",
    "kicker": "The Windy City",
    "author": "Joan P. Cypert",
    "date": "Sep 7, 2016 9:14 AM",
    "image": "/content/hero/7.jpeg",
    "url": "/content/7.amp.html"
  },
  {
    "title": "Montreal in 48 Hours",
    "section": "48 Hours",
    "kicker": "The City of Saints",
    "author": "Joan P. Cypert",
    "date": "Sep 7, 2016 4:39 AM",
    "image": "/content/hero/4.jpeg",
    "url": "/content/4.amp.html"
  },
  {
    "title": "Melbourne in 48 Hours",
    "section": "48 Hours",
    "kicker": "Australia's Second City",
    "author": "Todd M. Smallwood",
    "date": "Sep 6, 2016 4:37 PM",
    "image": "/content/hero/2.jpeg",
    "url": "/content/2.amp.html"
  },
  {
    "title": "14 Top Spots for a Music-Loving Adventurer",
    "section": "Top Spots",
    "kicker": "From EDM to sitars",
    "author": "Russell D. Hogan",
    "date": "Sep 6, 2016 5:50 AM",
    "image": "/content/hero/28.jpeg",
    "url": "/content/28.amp.html"
  },
  {
    "title": "8 Top Spots to Experience America's Heartland",
    "section": "Top Spots",
    "kicker": "Sooie!",
    "author": "Russell D. Hogan",
    "date": "Sep 4, 2016 5:45 PM",
    "image": "/content/hero/22.jpeg",
    "url": "/content/22.amp.html"
  },
  {
    "title": "San Francisco in 48 Hours",
    "section": "48 Hours",
    "kicker": "The City By the Bay",
    "author": "Joan P. Cypert",
    "date": "Sep 4, 2016 11:41 AM",
    "image": "/content/hero/9.jpeg",
    "url": "/content/9.amp.html"
  },
  {
    "title": "11 Top Spots for Woodsy Splendor",
    "section": "Top Spots",
    "kicker": "Pitch your tent",
    "author": "Russell D. Hogan",
    "date": "Sep 3, 2016 1:16 PM",
    "image": "/content/hero/27.jpeg",
    "url": "/content/27.amp.html"
  },
  {
    "title": "New York City in 48 Hours",
    "section": "48 Hours",
    "kicker": "The Big Apple",
    "author": "Joan P. Cypert",
    "date": "Sep 2, 2016 3:51 PM",
    "image": "/content/hero/11.jpeg",
    "url": "/content/11.amp.html"
  },
  {
    "title": "Seattle in 48 Hours",
    "section": "48 Hours",
    "kicker": "The Emerald City",
    "author": "Todd M. Smallwood",
    "date": "Aug 29, 2016 1:46 PM",
    "image": "/content/hero/5.jpeg",
    "url": "/content/5.amp.html"
  },
  {
    "title": "23 Top Spots to Just Relax",
    "section": "Top Spots",
    "kicker": "Ahhhhhh...",
    "author": "Demetria T. Edwards",
    "date": "Aug 28, 2016 2:18 PM",
    "image": "/content/hero/23.jpeg",
    "url": "/content/23.amp.html"
  },
  {
    "title": "15 Top Spots for Underwater Adventuring",
    "section": "Top Spots",
    "kicker": "Grab your snorkel",
    "author": "Demetria T. Edwards",
    "date": "Aug 28, 2016 12:18 PM",
    "image": "/content/hero/26.jpeg",
    "url": "/content/26.amp.html"
  },
  {
    "title": "Bucket List: Yosemite",
    "section": "Bucket List Adventures",
    "kicker": "From Mariposa Grove to Glacier Point, beautiful waterfalls and rock formations await you",
    "author": "Carol R. Wright",
    "date": "Aug 28, 2016 11:12 AM",
    "image": "/content/hero/13.jpeg",
    "url": "/content/13.amp.html"
  },
  {
    "title": "Bucket List: Switzerland",
    "section": "Bucket List Adventures",
    "kicker": "From gorgeous lakes to the beautiful Alps",
    "author": "Nolan C. Sundquist",
    "date": "Aug 26, 2016 4:10 PM",
    "image": "/content/hero/18.jpeg",
    "url": "/content/18.amp.html"
  },
  {
    "title": "Kuala Lumpur in 48 Hours",
    "section": "48 Hours",
    "kicker": "The Garden City of Lights",
    "author": "Todd M. Smallwood",
    "date": "Aug 25, 2016 4:47 PM",
    "image": "/content/hero/10.jpeg",
    "url": "/content/10.amp.html"
  },
  {
    "title": "12 Top Spots for Surfing",
    "section": "Top Spots",
    "kicker": "Hang Ten!",
    "author": "Demetria T. Edwards",
    "date": "Aug 23, 2016 3:07 PM",
    "image": "/content/hero/25.jpeg",
    "url": "/content/25.amp.html"
  },
  {
    "title": "17 Top Spots for Incredible Wildlife",
    "section": "Top Spots",
    "kicker": "W-hoot knew?",
    "author": "Demetria T. Edwards",
    "date": "Aug 23, 2016 8:41 AM",
    "image": "/content/hero/30.jpeg",
    "url": "/content/30.amp.html"
  },
  {
    "title": "Kyoto in 48 Hours",
    "section": "48 Hours",
    "kicker": "Japan's Former Thousand-Year Capital",
    "author": "Todd M. Smallwood",
    "date": "Aug 22, 2016 11:26 PM",
    "image": "/content/hero/8.jpeg",
    "url": "/content/8.amp.html"
  },
  {
    "title": "11 Top Spots for Incredible Photography",
    "section": "Top Spots",
    "kicker": "Say cheese!",
    "author": "Russell D. Hogan",
    "date": "Aug 21, 2016 10:57 AM",
    "image": "/content/hero/24.jpeg",
    "url": "/content/24.amp.html"
  }
];

// Returns a list of AMP document metadata to display on the app shell.
app.get('/documents', function(req, res) {
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

// Returns the HTML content of a single AMP document.
app.get('/content/:document', function(req, res) {
  res.sendFile(path.join(__dirname, 'content', req.params.document));
});

// Returns the hero image of AMP document.
app.get('/content/hero/:document', function(req, res) {
  res.sendFile(path.join(__dirname, 'content', 'hero', req.params.document));
});


// When testing the production build (via `npm run build`), simply serve the compiled html and js in the `build` dir.
app.use(express.static('build'));

app.listen(port, function() {
  console.log();
  console.log('The API server is running at:');
  console.log('  ' + 'http://localhost:' + port + '/');
  console.log();
})
