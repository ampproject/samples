# The ShadowReader

The ShadowReader is a demo of how to use PWA+AMP techniques with existing AMP documents to build a production-ready Progressive Web App in an efficient, time-saving way.

## Build instructions

Make sure you have node and npm installed, then install the dependencies:

    $ npm install

Then run the following to run the site:

    $ gulp

For a production build, call

    $ gulp dist

## Caveats

As this is a purely client-side demo using third-party AMP pages from the Guardian that we have limited control over, there are a few gotchas with the demo:

- Search engines that don't understand JS won't be able to crawl the site (use hybrid rendering to address).
- The navigation is a giant hack that fetches the Guardian's RSS feeds through YQL. That adds lots of latency (two server hops, 200kb of data). In a production environment, you'd of course fetch lightweight JSON from somewhere directly.
- AMP pages are proxied through a [Glitch app](https://glitch.com/edit/#!/seed-octagon) to add CORS headers, also adding load latency. In production, you'd allow CORS access to your AMP pages to wherever your PWA lives.