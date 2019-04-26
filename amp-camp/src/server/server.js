const express = require('express');
const request = require('request');
const path = require('path');
const fs = require('fs');
const productApiManager = require('./ApiManager.js');
const mustache = require("mustache");
const formidableMiddleware = require('express-formidable');
const sessions = require("client-sessions");
const serializer = require('serialize-to-js');

const staticPageUrls = [
    '/',
    '/index.html',
    '/blog-listing.html',
    '/contact.html'
];

const app = express();

app.use(formidableMiddleware());
app.use(sessions({
    cookieName: 'session',
    secret: 'eommercedemoofamazigness',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
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

const apiManager = new productApiManager();

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
    console.log('App listening on port ' + listener.address().port);
});

//Intercepts urls for static pages, and calls 'renderPage' to inject the canonical tag
app.use("*", function(req, res, next) {

    let originalUrl = req.originalUrl;

    if(req.method === 'GET' && staticPageUrls.includes(originalUrl)) {
        let templateName = getTemplateForUrl(originalUrl);
        renderPage(req, res, templateName);
    } else {
        next();
    }
});

//serve static files
app.use(express.static(path.join(__dirname, '/../')));

//Product Listing Page
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

//Product Page
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

//API
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

    //If comes from the cache
    if (req.headers['amp-same-origin'] !== 'true') {
        //transfrom POST into GET and redirect to same url
        let queryString = 'productId=' + productId + '&categoryId=' + categoryId + '&name=' + name + '&price=' + price + '&color=' + color + '&size=' + size + '&quantity=' + quantity + '&origin=' + origin + '&imgUrl=' + imgUrl;
        res.header("AMP-Redirect-To", origin + "/api/add-to-cart?" + queryString);
    } else {
        updateShoppingCartOnSession(req, productId, categoryId, name, price, color, size, imgUrl, quantity);
        res.header("AMP-Redirect-To", origin + "/shopping-cart");
    }

    enableCors(req, res);
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
    let sort = req.query.sort;

    let categoryUrl = apiManager.getCategoryUrl(categoryId, sort);
    console.log("Calling Category Url: " + categoryUrl);

    const options = {
        url: categoryUrl
    };

    request(options, (error, response, body) => {
        if (!error) {
            res.send(apiManager.parseCategory(body));
        } else {
            res.json({ error: 'An error occurred in /api/categories' });
        }
    });
});

app.get('/api/product', function(req, res) {

    let productId = req.query.productId;
    let productUrl = apiManager.getProductUrl(productId);

    const options = {
        url: productUrl
    };

    request(options, (error, response, body) => {
        if (!error && body != 'Product not found' && !body.includes('An error has occurred')) {
            var productObj = apiManager.parseProduct(body);
            res.send(productObj);
        } else {
            res.json({ error: 'An error occurred in /api/product: ' + body });
        }
    });
});

// Wrap the shopping cart into an 'items' array, so it can be consumed with amp-list.
app.get('/api/cart-items', function(req, res) {
    let cart = getCartFromSession(req);

    let response = { items: [cart] };

    enableCors(req, res);
    res.send(response);
});

app.get('/api/cart-count', function(req, res) {
    let cart = getCartFromSession(req);

    let response = { items: [{ count: cart.cartItems.length }] };

    enableCors(req, res);
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

    enableCors(req, res);
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

// If the session contains a cart, then deserialize it and return that!
// Otherwise, create a new cart and add that to the session.
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

function enableCors(req, res) {

    //set to all for dev purposes only, change it by configuration to final domain
    let sourceOrigin = req.query.__amp_source_origin;
    let origin = req.get('origin') || sourceOrigin;

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "AMP-Access-Control-Allow-Source-Origin,AMP-Redirect-To");
    res.header("AMP-Access-Control-Allow-Source-Origin", sourceOrigin);
}

// Uses mustache to render the dynamic page. Injects canonical tag, based on the requested URL.
function renderPage(req, res, template, responseJsonObj) {
    if(!responseJsonObj) {
        responseJsonObj = {}
    }
    
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    responseJsonObj.CanonicalLink = fullUrl;

    mustache.tags = ['<%', '%>'];
    res.render(template, responseJsonObj);
}

//The root (home) uses index.html as template. In any other case, the url contains the name of the template.
function getTemplateForUrl(originalUrl) {
    return (originalUrl === '/') ? 'index' : originalUrl.substring(1, originalUrl.length).replace('.html', '');
}