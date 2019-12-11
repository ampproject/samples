class ApiManager {

    constructor() {
        this._validParams = {
            gender: ['men', 'women'],
            category: ['shirts', 'shorts'],
            sortOrder: ['high-low', 'low-high']
        };

        this._category2Param = {
            'men-shirts': '200368502',
            'men-shorts': '200368503',
            'women-shirts': '200368507',
            'women-shorts': '200368509'
        };

        this._sortOrder2Param = {
            'high-low': 'priceHtoL',
            'low-high': 'priceLtoH'         
        };

        this._defaultSortOrder = 'high-low';

        this._errors = {
            nonexistentAPIParam: "Error: The API doesn't support this parameter key or value",
            invalidArgument: "Error: A value passed to this function or method just didn't make sense"
        };

        this._paramKeys = {
            category: 'categoryId',
            sortOrder: 'sortBy',
            page: 'page'
        }

        this._maxRelatedProducts = 11;
        this._apiUrlEndpoint = 'https://campmor.ampify.wompmobile.com/campmor';

        this._apiCategoryEndpoint = this._apiUrlEndpoint + '/fetchCategories';
        this._apiProductEndpoint = this._apiUrlEndpoint + '/fetchProduct';
    }


/***********************************************************
 ***               API DATA PARSING METHODS              ***
 ***********************************************************/

/*
 * These methods are used to parse data from the Campmor API provided by WompMobile. 
 * The API actually gets called in server.js, since that's where express.js lives. 
 */

/*** getRelatedProducts()
 * Getting related products is simple for now.
 * Pass this method data from the category API.
 * Then, we make sure the list isn't too long.
 * And we make sure the currently displayed product isn't included.
 */
    getRelatedProducts(productId, apiCategoryResponse) {
        let fixedCategory = this.fixCategoryData(apiCategoryResponse);
        let relatedCategoryItems = fixedCategory.items;

        if(relatedCategoryItems.length > this._maxRelatedProducts) {
            relatedCategoryItems.splice(this._maxRelatedProducts, relatedCategoryItems.length - this._maxRelatedProducts);
        }

        //remove the item currently being shown
        for(var i = 0; i < relatedCategoryItems.length; i++){
            if(relatedCategoryItems[i].productId === productId) {
                relatedCategoryItems.splice(i, 1);
                break;
            }
        }

        fixedCategory.items = relatedCategoryItems;
        return fixedCategory;
    }


    // Check for a couple of basic error messages in an API response
    isResponseError(response) {
        return response.includes('Product not found') || response.includes('An error has occurred');
    }


/***********************************************************
 ***                    HELPER METHODS                   ***
 ***********************************************************/

/*** getCategoryUrl()
 * Given a category parameter and a sort order parameter from the query string,
 * convert those into the URL expected by the API.
 * Currently the filters object is expected to contain a gender (men/women) and a category (shirts/shorts).
 * There are other genders and clothing types, but our API doesn't support those at this time.
 * Sample: https://campmor.ampify.wompmobile.com/campmor/fetchCategories?categoryId=200368507&sortBy=priceLtoH
 */
    getCategoryUrl(category, sortOrder) {
        let params = [];
        let categoryAPIParam = this._category2Param[category];
        let sortOrderAPIParam = this._sortOrder2Param[sortOrder] || this._defaultSortOrder;
        
        if (!categoryAPIParam || !sortOrderAPIParam)
            throw(this._errors.nonexistentAPIParam);

        let queryString = `${this._paramKeys.category}=${categoryAPIParam}&${this._paramKeys.sortOrder}=${sortOrderAPIParam}&${this._paramKeys.page}=1`;
        return this._apiCategoryEndpoint + '?' + queryString;
    }

// Generate an API Url of the sort https://campmoramp.ampify.wompmobile.com/campmor/fetchProduct/31893
    getProductUrl(productId) {
        return this._apiProductEndpoint + '/' + productId;
    }

// Determine whether a given value is among the values the API accepts for a given param
    isValidParam(key, value) {
        if (key in this._validParams)
            return this._validParams[key].includes(value);
        else
            throw error(this.invalidArgument);
    }

/**
 * The price given to us by the API may be a number or a string. It may have one decimal point or two.
 * Normalize prices by converting each to a number.
 * Then, for integers, convert that number to a string with no decimal places.
 * Otherwise, convert it to a string with two decimal places.
 */
    normalizePrice(price) {
        let numPrice = Number(price);
        let decimalPlaces = Number.isInteger(numPrice) ? 0 : 2;
        return numPrice.toFixed(decimalPlaces);
    }

/**
 * 
 * Take a response from the Category API and fix up the data so that it matches our use case.
 * "ampList" is a Boolean indicating whether or not the data returned is to be used by an <amp-list>.
 */
    fixCategoryData(apiCategoryResponse, ampList) {
        let prodCategory = JSON.parse(apiCategoryResponse);
        let prodListing = prodCategory.matchingProducts;
        let productCount = 0;

        var fixedCategory = {
            items: []
        };

        for (var prod of prodListing) {
            let originalProd = prod.Value;
            let parsedProd = {};
            parsedProd.productId = originalProd.Main_Id;
            parsedProd.name = originalProd.Product_Title.replace(/ - Women's| - Men's/g,'');
            parsedProd.description = originalProd.Product_Title;                  // Missing field in Campmor API
            parsedProd.price = this.normalizePrice(originalProd.Discount_Price);  // Using Discount_Price, since it's the one associated to each product size on the Product API.
            parsedProd.image = originalProd.Photo;
            parsedProd.category = originalProd.Main_Id;                           // Missing field in Campmor API */

            fixedCategory.items.push(parsedProd);
            productCount++;
        }
        fixedCategory.productCount = productCount;

        return ampList ? {items: fixedCategory} : fixedCategory;
    }

/* Take a response from the Prooduct API, and call various helper methods
 * to make it work for our use case.
 */
    fixProductData(apiProductResponse) {
        var productObj = JSON.parse(apiProductResponse);

        this.enhanceProductRatings(productObj);
        this.enhanceProductColors(productObj);
        this.enhanceProductSizes(productObj);
        this.enhanceProductQuantity(productObj);

        return productObj;
    }


/***********************************************************
 ***           API RESULT ENHANCER METHODS               ***
 ***********************************************************/

 /* When the API returns results that aren't too our liking, we can make them... better! */
//TODO: make this more consistent

    /* Transforms product ratings into an array of stars to be rendered on the template with mustache.*/
    enhanceProductRatings(productObj) {
        var roundedRating = parseInt(productObj.RoundedRating);        
        var reviewFullStars = [];
        var reviewEmptyStars = [];

        // If there are no reviews, make some up!
        if (!productObj.ReviewCount) {
            productObj.ReviewCount =  Math.floor(Math.random() * Math.floor(20));
            roundedRating = Math.floor(Math.random() * Math.floor(4)) + 1;
        }

        for (var i = 0; i < 5; i++) {
            if (i < roundedRating) {
                reviewFullStars.push(1);
            } else {
                reviewEmptyStars.push(1);
            }
        }

        productObj.ReviewFullStars = reviewFullStars;
        productObj.ReviewEmptyStars = reviewEmptyStars;
        productObj.ReviewCount = productObj.ReviewCount || 0;
    }

    enhanceProductColors(productObj) {
        productObj.DefaultColor = productObj.All_Colors[0].ColorName;
        productObj.All_Colors[0].defaultColour = true;
        productObj.UniqueColor = productObj.All_Colors.length === 1;
    }

    enhanceProductSizes(productObj) {
        let all_Colors_Array = productObj.All_Colors;

        for(let i = 0; i < all_Colors_Array.length; i++){
            let avaliable_Sizes_Array = all_Colors_Array[i].Avaliable_Sizes;

            let lastAvailable;

            for(let j = 0; j < avaliable_Sizes_Array.length; j++) {
                if(avaliable_Sizes_Array[j].available) {

                    //Default size (color level): The first available size for a given color.
                    if(!all_Colors_Array[i].DefaultSize) {
                        all_Colors_Array[i].DefaultSize = avaliable_Sizes_Array[j].SizeName;
                    }

                    //Default size (product level): The first 'available' size of the first color.
                    if(i == 0 && !productObj.DefaultSize) {
                        let defaultSize = avaliable_Sizes_Array[j];
                        
                        productObj.DefaultSize = defaultSize.SizeName;
                        productObj.DefaultPrice = defaultSize.Discount_Price;

                        avaliable_Sizes_Array[j].default = true;
                    }

                    //Create a stock "per color-size", based on the stock "per color" that comes with the API.
                    avaliable_Sizes_Array[j].Stock = this.generateStockPerProductSize(j, parseInt(all_Colors_Array[i].Stock));

                    //The last available size of each color (used to avoid adding a comma when rendering amp-state).
                    lastAvailable = avaliable_Sizes_Array[j];
                }
            }

            lastAvailable.Last = true;
        }
    }

    generateStockPerProductSize(sizeIndex, productColorStock) {
        let stockPerProductSize;

        if(sizeIndex % 2 === 0) {
            stockPerProductSize = (productColorStock * 3 / 2) + sizeIndex;
        } else {
            stockPerProductSize = (productColorStock * 2 / 3) + sizeIndex;
        }

        return Math.round(stockPerProductSize);
    }

    //If the stock of the default color is "1", don't allow the user to change the quantity on the selector.
    enhanceProductQuantity(productObj) {
        productObj.DefaultQuantityDisabled = (productObj.All_Colors[0].Avaliable_Sizes[0].Stock == 1);
    }

    createCartItem(productId, categoryId, name, price, color, size, imgUrl, quantity) {
        let cartProduct = new Object();
        cartProduct.productId = productId;
        cartProduct.categoryId = categoryId;
        cartProduct.name = name;
        cartProduct.price = parseInt(price);
        cartProduct.color = color;
        cartProduct.size = size;
        cartProduct.imgUrl = imgUrl;
        cartProduct.quantity = parseInt(quantity);

        return cartProduct;
    }


}

module.exports = ApiManager;