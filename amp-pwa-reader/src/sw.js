'use strict';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {

  // Make sure new versions of the Service Worker activate immediately
  workbox.skipWaiting();
  workbox.clientsClaim();

  // Static precaching of images, HTML, and CSS
  workbox.precaching.precacheAndRoute([]);

  // Register main route for all navigation links to pages
  workbox.routing.registerNavigationRoute('/index.html', {
    whitelist: [
      new RegExp('/./')
    ],
    blacklist: [
      new RegExp('/img\/.*/, /\.(js|css)/')
    ]
  });

  // Cache external libraries and fonts
  workbox.routing.registerRoute(
    new RegExp('https://cdn.ampproject.org/(.*)'),
    workbox.strategies.staleWhileRevalidate()
  );
  workbox.routing.registerRoute(
    new RegExp('https://cdn.polyfill.io/(.*)'),
    workbox.strategies.staleWhileRevalidate()
  );
  workbox.routing.registerRoute(
    new RegExp('https://pasteup.guim.co.uk/fonts/(.*)'),
    workbox.strategies.cacheFirst()
  );

  // Cache a number of YQL queries, but only for the offline scenario
  workbox.routing.registerRoute(
    new RegExp('https://query.yahooapis.com/v1/public/(.*)'),
    workbox.strategies.networkFirst()
  );

  // Cache a number of images
  workbox.routing.registerRoute(
    new RegExp('https://i.guim.co.uk/img/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 10,
          maxAgeSeconds: 7 * 24 * 60 * 60
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [ 0, 200 ]
        })
      ]
    })
  );

} else {
  console.log('Workbox didn\'t load 😬');
}
