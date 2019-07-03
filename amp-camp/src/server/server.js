const express = require('express');
const request = require('request');
const path = require('path');
const fs = require('fs');
const productApiManager = require('./ApiManager.js');
const mustache = require("mustache");
const formidableMiddleware = require('express-formidable');
const sessions = require("client-sessions");
const serializer = require('serialize-to-js');
const ampCors = require('amp-toolbox-cors');
const AmpOptimizer = require('amp-toolbox-optimizer');
const apiManager = new productApiManager();

/* CONSTANTS */
const ampCacheDuration = 86400 * 7;

// a simple in-memory response cache
const cache = new Map();

const ampOptimizer = AmpOptimizer.create();

/** LIST OF STATIC URLS FOR STATIC PAGES **/

const staticPageUrls = [
    '/',
    '/index.html',
    '/blog-listing.html',
    '/contact.html'
];


/** EXPRESS AND MUSTACHE CONFIGURATION **/

const app = express();

app.use(formidableMiddleware());
app.use(sessions({
    cookieName: 'session',
    secret: 'eommercedemoofamazigness',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}));

//Configure amp-toolbox-cors for CORS.
app.use(ampCors({
  verifyOrigin: false
}));

app.engine('html', function(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        if (err)
            return callback(err)
        var rendered = mustache.to_html(content.toString(), options);
        return callback(null, rendered)
    });
});
app.set('view engine', 'html');
app.set('views', __dirname + '/../');

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
    console.log('App listening on port ' + listener.address().port);
});

/** HANDLERS FOR STATIC PAGES AND STATIC FILES **/

// Optimize and cache HTML responses
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
    res.send(cachedBody)
    return
  } 
  // Replace response.send with our own method to be able to intercept html responses
  // before sending it to the client. This way we can use AMP Optimizer and cache the 
  // repsonse. 
  //
  // See https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer
  const originalSend = res.send;
  // res.send = function() {
  //   ampOptimizer.transformHtml(arguments[0]).then(transformed => {
  //     // console.log('[cache miss]', key);
  //     // rewrite body to optimized AMP version
  //     arguments[0] = transformed;
  //     // Cache the response in memory. In our demo case we can safely assume 
  //     // that all pages fit into memory. 
  //     cache.set(key, transformed);
  //     // Pass the optimized version to the original send method.
  //     originalSend.apply(this, arguments);
  //   });
  // }
  next()
});

//Intercepts all requests:
//If the request is for a static page, calls 'renderPage', passing the page's template, so the 'canonical' tag can be inserted, before rendering the page.
//Otherwise, calls next(), so another handler can process the request.
app.use(function(req, res, next) {

    let originalUrl = req.originalUrl;

    if(req.method === 'GET' && staticPageUrls.includes(originalUrl)) {
      let templateName = getTemplateForUrl(originalUrl);
      renderPage(req, res, templateName);
      return;
    }
    next();
});

//Serves static files
app.use(express.static(path.join(__dirname, '/../')));


/** HANDLERS FOR DYNAMIC PAGES **/

app.get('/product-listing', function(req, res) {
    // defaults to women shirts
    let resProductsGender = 'women';
    let resProductsCategory = 'shirts';
    let resShirtSelected = true;
    let resShortSelected = false;

    let productsGender = req.query.gender || resProductsGender;
    let productsCategory = req.query.category || resProductsCategory;
    let listingUrl = apiManager.getCategoryUrl(productsGender + '-' + productsCategory);

    if (!listingUrl.match('categoryId=undefined')) {
        resProductsCategory = productsCategory;
        resProductsGender = productsGender;
        if (!resProductsGender.match('women')) {
            resProductsGender = 'men';
        }
        if (!resProductsCategory.match('shirt')) {
            resShirtSelected = false;
            resShortSelected = true;
        }
    }
    
    let responseObj = {
        productsCategory: resProductsCategory,
        productsGender: resProductsGender
    };

    if (resShirtSelected) {
        responseObj.shirtSelected = true;
    } else if (resShortSelected) {
        responseObj.shortSelected = true;
    }

    if (resProductsGender == 'women') {
        responseObj.womenSelected = true;
    }

    //res.render('product-listing', responseObj);
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
        if (!error && body != 'Product not found' && !body.includes('An error has occurred')) {
            var productObj = apiManager.parseProduct(body);
            productObj.CategoryId = categoryId;
            renderPage(req, res, 'product-details', productObj);
        } else {
            renderPage(req, res, 'product-not-found');
        }
    });
});

app.get('/shopping-cart', function(req, res) {

    //get related products for the cart page: items belonging to the category of the first item in the cart, excluding the item.
    let shoppingCart = req.session.shoppingCart;
    let relatedProductsObj = new Object();

    if (shoppingCart) {
        shoppingCart = serializer.deserialize(shoppingCart);
        let cartItems = shoppingCart.cartItems;
        if(cartItems.length > 0) {
            let firstCartItem = cartItems[0];
            relatedProductsObj.Main_Id = firstCartItem.productId;
            relatedProductsObj.CategoryId = firstCartItem.categoryId;
        }
    }

    renderPage(req, res, 'cart-details', relatedProductsObj);
});


/** API **/

app.post('/api/add-to-cart', function(req, res) {

    let productId = req.fields.productId;
    let categoryId = req.fields.categoryId;
    let name = req.fields.name;
    let price = req.fields.price;
    let color = req.fields.color;
    let size = req.fields.size;
    let imgUrl = req.fields.imgUrl;
    let origin = req.get('origin');
    let quantity = req.fields.quantity;
    let cannonicalUrl = 'https://' + req.get('host');
    //If comes from the cache
    if (req.headers['amp-same-origin'] !== 'true') {
        //transfrom POST into GET and redirect to same url
        let queryString = 'productId=' + productId + '&categoryId=' + categoryId + '&name=' + name + '&price=' + price + '&color=' + color + '&size=' + size + '&quantity=' + quantity + '&origin=' + origin + '&imgUrl=' + imgUrl;
        res.header("AMP-Redirect-To", cannonicalUrl + "/api/add-to-cart?" + queryString);
    } else {
        updateShoppingCartOnSession(req, productId, categoryId, name, price, color, size, imgUrl, quantity);
        res.header("AMP-Redirect-To", origin + "/shopping-cart");
    }

    //amp-form requires json response
    res.json({});
});

app.get('/api/add-to-cart', function(req, res) {
    let productId = req.query.productId;
    let categoryId = req.query.categoryId;
    let name = req.query.name;
    let price = req.query.price;
    let color = req.query.color;
    let size = req.query.size;
    let imgUrl = req.query.imgUrl;
    let quantity = req.query.quantity;

    updateShoppingCartOnSession(req, productId, categoryId, name, price, color, size, imgUrl, quantity);
    res.redirect('/shopping-cart');
});

app.get('/api/categories', function(req, res) {

    let categoryId = req.query.categoryId;
    let ampList = req.query.ampList;
    let sort = req.query.sort;

    let categoryUrl = apiManager.getCategoryUrl(categoryId, sort);
    console.log("Calling Category Url: " + categoryUrl);

    const options = {
        url: categoryUrl
    };

    request(options, (error, response, body) => {
        if (!error) {
            res.send (apiManager.parseCategory (body, ampList));
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
        if (!error && body != 'Product not found' && !body.includes('An error has occurred')) {
            res.send(apiManager.parseProduct(body, ampList));
        } else {
            res.json({ error: 'An error occurred in /api/product: ' + body });
        }
    });
});

// Retrieve the shopping cart from session, and wrap it into an 'items' array, which is the format expected by amp-list.
app.get('/api/cart-items', function(req, res) {
    let cart = getCartFromSession(req);

    let response = { items: [cart] };

    res.send(response);
});

app.get('/api/cart-count', function(req, res) {
    let cart = getCartFromSession(req);

    let response = { items: [{ count: cart.cartItems.length }] };

    res.send(response);
});

app.post('/api/delete-cart-item', function(req, res) {

    let productId = req.fields.productId;
    let color = req.fields.color;
    let size = req.fields.size;

    let shoppingCartResponse = { items: [] };

    let shoppingCart = req.session.shoppingCart;

    if (shoppingCart) {
        shoppingCart = serializer.deserialize(shoppingCart);
        shoppingCart.removeItem(productId, color, size);
        req.session.shoppingCart = serializer.serialize(shoppingCart);
        shoppingCartResponse.items.push(shoppingCart);
    }

    res.send(shoppingCartResponse);
});

app.get('/api/related-products', function(req, res) {
    let categoryId = req.query.categoryId;
    let productId = req.query.productId;

    let categoryUrl = apiManager.getCategoryUrl(categoryId);

    //the response will be a 1 element items array, to be able to combine amp-list with amp-mustache
    //see: https://github.com/ampproject/amphtml/issues/4405#issuecomment-379696849
    let relatedProductsResponse = { items: [] };

    const options = {
        url: categoryUrl
    };

    request(options, (error, response, body) => {
        if (!error) {
            let relatedProducts = apiManager.getRelatedProducts(productId, body);
            relatedProductsResponse.items.push(relatedProducts);
            res.send(relatedProductsResponse);
        } else {
            res.json({ error: 'An error occurred in /api/related-products' });
            console.log(error);
        }
    });
});

/** HELPERS **/

// If the session contains a cart, then deserialize it and return that!
// Otherwise, create a new cart, add that to the session and return the cart object.
function getCartFromSession(req) {
    let sessionCart = req.session.shoppingCart;

    if (sessionCart) {
        return serializer.deserialize(sessionCart);
    } else {
        let newCart = apiManager.createCart();
        req.session.shoppingCart = serializer.serialize(newCart);
        return newCart;
    }
}

//Create a cart new item. If the cart exists in the session, add it there.
//Otherwise, create a new cart and add the recently created item to the session.
function updateShoppingCartOnSession(req, productId, categoryId, name, price, color, size, imgUrl, quantity) {
    let cartProduct = apiManager.createCartItem(productId, categoryId, name, price, color, size, imgUrl, quantity);
    let shoppingCartJson = req.session.shoppingCart;
    let shoppingCartObj;

    if (shoppingCartJson) {
        shoppingCartObj = serializer.deserialize(shoppingCartJson);
    } else {
        shoppingCartObj = apiManager.createCart();
    }

    shoppingCartObj.addItem(cartProduct);
    req.session.shoppingCart = serializer.serialize(shoppingCartObj);
}

//Receives a template for a page to render. If it's a dynamic page, will receive a JSON object, otherwise, will create and empty one.
//Declares the tags that will be used by mustache, and defines the 'CanonicalLink' variable, so it can be injected int the canonical tag.
function renderPage(req, res, template, responseJsonObj={}) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    responseJsonObj.CanonicalLink = fullUrl;

    mustache.tags = ['<%', '%>'];
    res.render(template, responseJsonObj);
}

//The root (home) uses index.html as template. In any other case, the url contains the name of the template.
function getTemplateForUrl(originalUrl) {
    return (originalUrl === '/') ? 'index' : originalUrl.substring(1, originalUrl.length).replace('.html', '');
}
