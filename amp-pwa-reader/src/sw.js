'use strict';

importScripts('/workbox.js');
const workboxSW = new WorkboxSW();

// Static precaching of images
workboxSW.precache([]);

workboxSW.router.registerNavigationRoute('index.html');
workboxSW.router.registerRoute('https://cdn.ampproject.org/(.*)', workboxSW.strategies.staleWhileRevalidate());

// Runtime caching
workboxSW.router.registerRoute(
  'https://i.guim.co.uk/img/media/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'images',
    cacheExpiration: {
      maxEntries: 10,
      maxAgeSeconds: 7 * 24 * 60 * 60
    },
    cacheableResponse: {statuses: [ 0, 200 ]}
  })
);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // immediately claim the currently connected clients
  self.clients.claim();
});
