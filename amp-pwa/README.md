# Create React App with AMP

A simple React-based [progressive web app](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/) that displays [Accelerated Mobile Page (AMP)](https://ampproject.org) content. Built on [create-react-app](https://github.com/facebookincubator/create-react-app) for minimal build configuration.

To see it in action, go to http://choumx.github.io/amp-pwa.

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [User Guide](#user-guide)
  - [Quick Start](#quick-start)
  - [`npm start|test|run build`](#npm-starttestrun-build)
  - [`node server.js`](#node-serverjs)
- [Changes to `create-react-app`](#changes-to-create-react-app)
  - [New dependencies](#new-dependencies)
  - [New files](#new-files)
- [Limitations](#limitations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## User Guide

### Quick Start

```sh
git clone git@github.com:choumx/amp-pwa.git
cd amp-pwa
npm install
npm start
```

In a **separate terminal**, start the development API server:
```sh
node server.js
```

### `npm start|test|run build`

This project uses the same development workflow as [`create-react-app`](https://github.com/facebookincubator/create-react-app#npm-start):

- `npm start` runs the app in development mode.
- `npm test` runs the test watcher in an interactive mode.
- `npm run build` builds the app for production to the `build` folder.

See `create-react-app`'s [documentation](https://github.com/facebookincubator/create-react-app#npm-start) for more detail.

### `node server.js`

The web server initiated by `npm start` only serves the app's static content. To serve the AMP content to be displayed by the app, there's a separate Express server in `server.js`.

For more information on how the web server and API server interact, check out [Using create-react-app with a server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development).

## Changes to `create-react-app`

This project adds modern web features to `create-react-app`:

* **Accelerated mobile page (AMP) content:** Displays fast-loading AMP documents within the app shell via Shadow DOM.
* **Progressive web:** A service worker enables progressive enhancement of AMP content with precaching, offline functionality and an app shell.

### New dependencies

Compared to `create-react-app`, this project adds a small number of new dependencies:

- `sw-precache` generates a production-ready service worker for precaching and other progressive enhancements.
- `express` is used to run the development API server, `server.js`.
- `bootstrap` and `react-bootstrap` can be easily removed for your choice of UI framework.

### New files

```
amp-pwa/
  content/
  manifest.webmanifest
  server.js
  service-worker.tmpl
  sw-precache-config.json
```

- `content/` contains sample AMP documents displayed by the app.
- `manifest.webmanifest` contains app metadata for native support in Chrome on Android.
- `service-worker.tmpl` is a customized service worker template for `sw-precache`.
- `sw-precache-config.json` instructs `sw-precache` which assets to precache and which resources to cache at runtime.

## Limitations

- Service workers are [not yet supported by all browsers](http://caniuse.com/#feat=serviceworkers).

