# amp-script-tutorial

## About

This repository contains the code you'll use to do the [&lt;amp-script&gt; tutorial](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript-tutorial/)!

This tutorial presents a form containing a password input. We want your password to follow certain rules, and so the user can't submit the form until those rules have been followed. In the tutorial, you begin with HTML that enforces the rules using &lt;amp-form&gt;'s `pattern` attribute. You then transform that into a more user-friendly experience which uses &lt;amp-script&gt;.

This repo contains two subdirectories:
* `starter_code`: the code you start with
* `finished_code`: what you'll end up with after you complete the tutorial

Note that this code doesn't include a server, so if you actually submit the form, you'll get an error in the Console. This exercise is left for the reader 😎

## Setup

If your computer is already running a local server, you don't need to set anything up at all! You can just type the relevant URL into your browser. Depending on where you've put this code and how you've set up your server, that URL will look something like this:

`http://localhost/amp-script-tutorial/starter_code/index.html`

Alternately, you can set up a simple local server using something like [serve](https://www.npmjs.com/package/serve), the node.js-based static content server.

Assuming you've installed [node](https://nodejs.org/), you can simply go to your command line, enter the directory where your code lives, and type:

`npx serve`

You can then access your website here:

`http://localhost:5000/`
