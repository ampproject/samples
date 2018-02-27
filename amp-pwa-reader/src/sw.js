'use strict';

importScripts('/workbox.js');
const workboxSW = new WorkboxSW({
  clientsClaim: true,
  skipWaiting: true
});

// Static precaching of images
workboxSW.precache([]);

// Register main route for all navigation links to pages
workboxSW.router.registerNavigationRoute('index.html', {
  whitelist: [/./],
  blacklist: [/img\/.*/, /\.(js|css)/]
});

// Cache external libraries and fonts
workboxSW.router.registerRoute('https://cdn.ampproject.org/(.*)', workboxSW.strategies.staleWhileRevalidate());
workboxSW.router.registerRoute('https://cdn.polyfill.io/(.*)', workboxSW.strategies.staleWhileRevalidate());
workboxSW.router.registerRoute('https://pasteup.guim.co.uk/fonts/(.*)', workboxSW.strategies.cacheFirst());

// Cache a number of YQL queries, but only for the offline scenario
workboxSW.router.registerRoute(
  'https://query.yahooapis.com/v1/public/(.*)',
  new workboxSW.strategies.networkFirst()
);

// Cache a number of images
workboxSW.router.registerRoute(
  'https://i.guim.co.uk/img/(.*)',
  new workboxSW.strategies.cacheFirst({
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
