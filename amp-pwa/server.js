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

// Returns a list of AMP document metadata to display on the app shell.
app.get('/documents', function(req, res) {
  var docs = [
    {
      "title": "AMP by Example",
      "subtitle": "AMP by Example gives a hands-on introduction to Accelerated Mobile Pages based on code and live samples.",
      "url": "/content/ampbyexample.amp.html"
    },
    {
      "title": "Hello World",
      "subtitle": "An AMP HTML tutorial - learn the different building blocks of an AMP HTML file.",
      "url": "/content/hello_world.amp.html"
    },
    {
      "title": "How to publish AMPs",
      "subtitle": "There are a few things you need to watch out for when publishing Accelerated Mobile Pages (AMP).",
      "url": "/content/how_to_publish_amps.amp.html"
    },
    {
      "title": "Housing",
      "subtitle": "This sample showcases how to build a housing page in AMP HTML.",
      "url": "/content/housing.amp.html"
    },
    {
      "title": "Live Blog",
      "subtitle": "This is a sample template for implementing live blogs in AMP.",
      "url": "/content/blog.amp.html"
    },
    {
      "title": "News Article",
      "subtitle": "This is a sample template for a news article in AMP.",
      "url": "/content/news_article.amp.html"
    },
    {
      "title": "Product Listing",
      "subtitle": "This sample showcases how to build a product listing page in AMP HTML.",
      "url": "/content/product_listing.amp.html"
    },
    {
      "title": "Product",
      "subtitle": "This sample showcases how to build a product page in AMP HTML.",
      "url": "/content/product.amp.html"
    },
    {
      "title": "Recipe",
      "subtitle": "This is a sample recipe AMP article demonstrating how to express machine-readable recipe data using JSON+LD.",
      "url": "/content/recipe.amp.html"
    }
  ];
  res.header('Content-Type', 'application/json');
  res.json(docs);
});

// Returns the HTML content of a single AMP document.
app.get('/content/:document', function(req, res) {
  res.sendFile(path.join(__dirname, 'content', req.params.document));
});

// When testing the production build (via `npm run build`), simply serve the compiled html and js in the `build` dir.
app.use(express.static('build'));

app.listen(port, function() {
  console.log();
  console.log('The API server is running at:');
  console.log('  ' + 'http://localhost:' + port + '/');
  console.log();
})