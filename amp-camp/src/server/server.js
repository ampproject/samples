const express = require('express');
const request = require('request');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const formidableMiddleware = require('express-formidable');
const sessions = require('client-sessions');
const ampCors = require('@ampproject/toolbox-cors');
const ApiManager = require('./ApiManager.js');
const Cart = require('./Cart.js');

const apiManager = new ApiManager();

/* CONSTANTS */

const ampCacheDuration = 86400 * 7;      // 7 days

// Constants for the user session. All times in ms.
const sessionInfo = {
    duration: 86400 * 7 * 1000,          // 1 week
    activeDuration: 3600 * 1000,         // 1 hour to extend if expiresIn < activeDuration
    cookieName: 'session',
    secret: 'woo-hoo-for-amp-ecomm!'
};

const defaultPort = 8080;                // use this port locally unless something else is set in the environment

// Use these filters on product listing page if nothing else is specified in the URL
const defaultProductFilters = {
    gender: 'women',
    category: 'shirts'
}

const defaultCategoryID = 'women-shirts'; // everyone needs women's shirts!

// a simple in-memory response cache
const cache = new Map();

/** LIST OF STATIC URLS FOR STATIC PAGES **/

const staticPageUrls = [
    '/',
    '/index.html',
    '/blog-listing.html',
    '/contact.html'
];


/** THE EXPRESS.JS SERVER **/

const app = express();

app.set('view engine', 'html');
app.set('views', __dirname + '/../');

app.use(formidableMiddleware());

// verifyOrigin:false is only there so this will work on localhost.
// It should be removed in production.
app.use(ampCors({
    verifyOrigin: false
}));

app.use(sessions({
    duration: sessionInfo.duration,
    activeDuration: sessionInfo.activeDuration,
    cookieName: sessionInfo.cookieName,
    secret: sessionInfo.secret
}));

app.engine('html', function(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        mustache.tags = ['[%', '%]'];

        if (err)
            return callback(err);        

        let rendered = mustache.render(content.toString(), options);
        return callback(null, rendered);
    });
});

const port = process.env.PORT || defaultPort;
const listener = app.listen(port, () => {
    console.log('App listening on port ' + listener.address().port);
});


/***********************************************************
 ***     HANDLERS FOR STATIC PAGES AND STATIC FILES      ***
 ***********************************************************/

// Cache HTML responses
app.use(function(req, res, next) {
  if (req.method != 'GET' || !req.accepts('text/html')) {
    return next();
  }

  res.set('Cache-Control', 'max-age=' + ampCacheDuration);

  let key = req.originalUrl;

  // Check if there's a cached response
  let cachedBody = cache.get(key);
  if (cachedBody) {
    // console.log('[cache hit]', key);
    res.send(cachedBody);
    return;
  } 
  next();
});

// Intercepts all requests:
// If the request is for a static page, calls 'renderPage', passing the page's template,
// so the 'canonical' tag can be inserted, before rendering the page.
// Otherwise, calls next(), so another handler can process the request.
app.use(function(req, res, next) {
    let originalUrl = req.originalUrl;

    if(req.method === 'GET' && staticPageUrls.includes(originalUrl)) {
      let templateName = getTemplateForUrl(originalUrl);
      renderPage(req, res, templateName);
      return;
    }

    next();
});

app.use(express.static(path.join(__dirname, '/../')));



/***********************************************************
 ***             HANDLERS FOR DYNAMIC PAGES              ***
 ***********************************************************/

//TODO: what if there's an error?
app.get('/product-listing', function(req, res) {
    let gender = apiManager.isValidParam('gender', req.query.gender) ?
                 req.query.gender : defaultProductFilters.gender;

    let category = apiManager.isValidParam('category', req.query.category) ?
                   req.query.category : defaultProductFilters.category;

    let responseObj = {
        productsCategory: category,
        productsGender: gender
    };

    responseObj.shirtSelected = category == 'shirts';
    responseObj.shortSelected = !responseObj.shirtSelected;
    responseObj.womenSelected = gender == 'women';

    renderPage(req, res, 'product-listing', responseObj);
});


app.get('/product-details', function(req, res) {
    let categoryId = req.query.categoryId;
    let productId = req.query.productId;
    let productUrl = apiManager.getProductUrl(productId);

    const options = {
        url: productUrl
    };

    request(options, (error, response, body) => {
        if (!error && !apiManager.isResponseError(body)) {
            var productObj = apiManager.fixProductData(body);
            productObj.CategoryId = categoryId;
            renderPage(req, res, 'product-details', productObj);

        } else {
            renderPage(req, res, 'product-not-found');
        }
    });
});


/* The shopping cart page contains two dynamic components:
 * 1. The contents of the cart itself. We retrieve the JSON.
 *    Note that the cart JSON includes the isEmpty flag, the products in the cart, and more.
 * 2. Related products. For now, these are inspired by the first item in the cart.
 *    Also, for now, we don't have those in this template. TODO: include them!
 */

app.get('/shopping-cart', function(req, res) {
    const cart = new Cart(req);
    renderPage(req, res, 'cart-details', cart.cart);
});



/***********************************************************
 ***             HANDLERS FOR API ENDPOPINTS             ***
 ***********************************************************/

/*
 * If we get a POST request to /add-to-cart, it's time for first step in our adding-to-cart process.
 * Ideally, the request will come with cookies, in which case we just read the session cookie,
 * make the cart mutation, and return.
 * If it doesn't come with cookies, then this might be a new user. Or we might be on the AMP cache
 * on a browser that's blocking third-party cookies.
 * AMP adds the AMP-Same-Origin header to requests from the origin (i.e., not from cache).
 * So, if that header is missing, we're on the cache, and cookies might be blocked.
 * In this case, we put the parameters from the POST into a query string.
 * We build a new URL from the origin domain and that query string.
 * Then we use the AMP-Redirect-To header to ask AMP to redirect to that URL.
 * This creates a GET request which we receive from the origin! Now, we can read the session cookie
 * and make the change.
 * Then we do one final AMP-Redirect to our origin site, minus the query string,
 * so that the user doesn't have to deal with that query string. Voila!
 * 
*/
app.post('/api/add-to-cart', function(req, res) {

    // If the request comes from the cache, and we have no session cookie, 
    // transform the POST request into a GET URL, and redirect to that URL.
    if (req.headers['amp-same-origin'] !== 'true' && !('cart' in req.session)) {
        const origin = req.get('origin');
        let params = [];

        for (let[key, value] of Object.entries(req.fields))
            params.push(key + '=' + value);

        let queryString = params.join('&');
        res.header("AMP-Redirect-To", origin + "/api/add-to-cart?" + queryString);

    // Otherwise, just make the mutation.
    // We don't have to redirect to the shopping cart page, but for now we do, for convenience.
    // We just don't redirect to the origin.
    // TODO: do something in the case that somehow the __amp_source_origin header is missing.

    } else {
        const cart = new Cart(req);
        cart.addItem(req.fields);
        res.header("AMP-Redirect-To", req.query.__amp_source_origin + '/shopping-cart');
    }

    // <amp-form> requires a JSON response
    res.json({});
});

/*
 * Note that this is the GET case.
 * The front end makes mutation requests via POST.
 * If we get here, it means we're in the middle of the process of redirecting from cache to origin.
 * Our job is to make the mutation, then redirect to the shopping cart page,
 * without the query string, of course.
 */
app.get('/api/add-to-cart', function(req, res) {
    const cart = new Cart(req);
    cart.addItem(req.query);

    res.redirect('/shopping-cart');
});


app.get('/api/categories', function(req, res) {
    let categoryId = req.query.categoryId;
    let ampList = req.query.ampList;
    let sort = req.query.sort;

    let apiUrl = apiManager.getCategoryUrl(categoryId, sort);

    const options = {
        url: apiUrl
    };

    request(options, (error, response, body) => {
        if (!error && !apiManager.isResponseError(body)) {
            res.send (apiManager.fixCategoryData(body, ampList));
        } else {
            res.json ({ error: 'An error occurred in /api/categories' });
        }
    });
});


app.get('/api/product', function(req, res) {
    let productId = req.query.productId;
    let ampList = req.query.ampList;
    let productUrl = apiManager.getProductUrl(productId);

    const options = {
        url: productUrl
    };

    request(options, (error, response, body) => {
        if (!error && !apiManager.isResponseError(body)) {
            const productData = apiManager.fixProductData(body, ampList);
            res.send({items: productData});

        } else {
            res.json({ error: 'An error occurred in /api/product: ' + body });
        }
    });
});

// Retrieve the shopping cart from session, and wrap it into an 'items' array, which is the format expected by amp-list.
app.get('/api/cart-items', function(req, res) {
    const cart = new Cart(req);
    let response = { items: [cart.cart] };

    res.send(response);
});

app.get('/api/cart-count', function(req, res) {
    let cart = new Cart(req);
    let response = { items: [{ count: cart.cart.items.length }] };

    res.send(response);
});

app.post('/api/delete-cart-item', function(req, res) {
    let cart = new Cart(req);

    const item = {
        productId: req.fields.productId,
        color: req.fields.color,
        size: req.fields.size
    };
    cart.removeItem(item);

    let json = cart.cart;

    res.send(json);
});

/*
 * For now, Related Products is simply other products in the same category.
 * So we get a list of products from the category API,
 * then call a method that enhances that list so it's suitable.
 */
app.get('/api/related-products', function(req, res) {
    let categoryId = req.query.categoryId || defaultCategoryID;
    let productId = req.query.productId;

    let categoryUrl = apiManager.getCategoryUrl(categoryId);

    let relatedProductsResponse = { items: [] };

    const options = {
        url: categoryUrl
    };

    request(options, (error, response, body) => {
        if (!error && !apiManager.isResponseError(body)) {
            let relatedProducts = apiManager.getRelatedProducts(productId, body);
            relatedProductsResponse.items.push(relatedProducts);
            res.send(relatedProductsResponse);
        } else {
            res.json({ error: 'An error occurred in /api/related-products' });
            console.error(error);
        }
    });
});


/** HELPERS **/

/**
 * renderPage() receives an HTML template. We use it for server-side rendering.
 * To render a dynamic page, send this a JSON object. If that isn't passed, we'll create an empty one.
 * Mustache wants the full URL of the page, so we create that for it!
 */
function renderPage(req, res, template, mustacheJson={}) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    mustacheJson.CanonicalLink = fullUrl;

    res.render(template, mustacheJson);
}

//The root (home) uses index.html as template. In any other case, the url contains the name of the template.
function getTemplateForUrl(originalUrl) {
    return (originalUrl === '/') ? 'index' : originalUrl.substring(1, originalUrl.length).replace('.html', '');
}
