# The ShadowReader

The ShadowReader is a demo of how to use PWA+AMP techniques with existing AMP documents to build a production-ready Progressive Web App in an efficient, time-saving way.

## Build instructions

Make sure you have node and npm installed, then install the dependencies:

    $ npm install

Then run the following to run the site:

    $ gulp

For a production build, call

    $ gulp dist

## Latest features

We've set up a server, which enables the following:

- If a new user navigates directly to a Shadow Reader article URL, the server shows the Guardian's AMP article, replacing the menu with one that contains links to the Shadow Reader. The service worker is warmed up with <amp-install-serviceworker>.  Subsquent navigations pull the user quickly into the PWA experience.  Since article content is rendered server-side, search engines that have trouble executing JavaScript can still crawl the site.

- We no longer need to proxy via a glitch app, as our server can add CORS headers.

- We cache YQL requests and articles.