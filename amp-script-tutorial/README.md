# amp-script-tutorial

## About

This repository contains the code you'll use to do the ["Use JavaScript in AMP" tutorial](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript-tutorial/)!

This tutorial presents a form containing a password input. Any password entered in this input must meet certain criteria, and so the form won't allow the user to submit until it does. In the tutorial, you begin with HTML that enforces the rules using &lt;amp-form&gt;'s `pattern` attribute. You then transform that into a more user-friendly experience which uses &lt;amp-script&gt;.

This repo contains two subdirectories:
* `starter_code`: the code you start with
* `finished_code`: what you'll end up with after you complete the tutorial

For simplicity's sake, this code doesn't include a web service to handle form submissions. If you actually submit the form, you'll get an error in the Console. To fix this, you'd need to set up a server that can host web services. (If you're using [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) is a popular way to do so.) You'd then need to create a service that handles form submissions and point the `<form>`'s `action-xhr` attribute there.

## Setup

If your computer is already running a local webserver, you don't need to set anything up at all! Instead, you can type the relevant URL into your browser. Depending on where you've put this code and how you've set up your server, that URL will look something like this:

`http://localhost/amp-script-tutorial/starter_code/index.html`

Alternately, you can set up a quick local server using something like [serve](https://www.npmjs.com/package/serve), the Node.js-based static content server.

Assuming you've installed [Node.js](https://nodejs.org/), go to your command line, enter the directory where your code lives, and type:

`npx serve`

You can then access your website here:

`http://localhost:5000/`
