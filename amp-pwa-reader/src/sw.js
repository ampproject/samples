'use strict';

importScripts('/workbox.js');
const workboxSW = new WorkboxSW();

// Static precaching of images
workboxSW.precache([]);

// Register main route for all navigation links to pages
workboxSW.router.registerNavigationRoute('index.html', {
  whitelist: [/./],
  blacklist: [/img\/.*/, /\.(js|css)/]
});

// Cache AMP libraries
workboxSW.router.registerRoute('https://cdn.ampproject.org/(.*)', workboxSW.strategies.staleWhileRevalidate());

// Cache a number of YQL queries, but only for 5 minutes
/*

TODO: Re-enable when workbox fix is deployed..

workboxSW.router.registerRoute(
  'https://query.yahooapis.com/v1/public/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'feeds',
    cacheExpiration: {
      maxEntries: 20,
      maxAgeSeconds: 5 * 60
    },
    cacheableResponse: {statuses: [ 0, 200 ]}
  })
);

*/

// Cache a number of images
workboxSW.router.registerRoute(
  'https://i.guim.co.uk/img/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'images',
    cacheExpiration: {
      maxEntries: 10,
      maxAgeSeconds: 7 * 24 * 60 * 60
    },
    cacheableResponse: {statuses: [ 0, 200 ]}
  })
);

// Make sure new versions of the Service Worker activate immediately
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});
