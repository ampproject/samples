class ApiManager {

    constructor() {

        this.apiUrlEndpoint = 'https://campmor.ampify.wompmobile.com/campmor';
        this.apiCategoriesEndpoint = this.apiUrlEndpoint + '/fetchCategories';
        this.apiProductEndpoint = this.apiUrlEndpoint + '/fetchProduct';
        this.MAX_RELATED_PRODUCTS = 11;


        var apiUrlValues = [
            ['men-shirts', '200368502'],
            ['men-shorts', '200368503'],
            ['women-shirts', '200368507'],
            ['women-shorts', '200368509'],
            ['high-low', 'priceHtoL'],
            ['low-high', 'priceLtoH']
        ];
        this.apiUrlMap = new Map(apiUrlValues);

    }

    //Example url: https://campmor.ampify.wompmobile.com/campmor/fetchCategories?categoryId=200368507&sortBy=priceLtoH
    getCategoryUrl(categoryId, sort) {
        var apiUrlParams = 'categoryId=' + this.apiUrlMap.get(categoryId) + (sort != undefined ? '&sortBy=' + this.apiUrlMap.get(sort) : '');
        return this.apiCategoriesEndpoint + '?' + apiUrlParams;
    }

    //Returns all items from the category sent as parameter, with he exception of the one with productId == to the first param.
    getRelatedProducts(productId, apiCategoryResponse) {
        let parsedCategory = this.parseCategory(apiCategoryResponse);
        let relatedCategoryItems = parsedCategory.items;

        //only return up to this.MAX_RELATED_PRODUCTS
        if(relatedCategoryItems.length > this.MAX_RELATED_PRODUCTS) {
            relatedCategoryItems.splice(this.MAX_RELATED_PRODUCTS, relatedCategoryItems.length - this.MAX_RELATED_PRODUCTS);
        }

        //remove the item currently being shown
        for(var i = 0; i < relatedCategoryItems.length; i++){
            if(relatedCategoryItems[i].productId === productId) {
                relatedCategoryItems.splice(i, 1);
                break;
            }
        }

        parsedCategory.items = relatedCategoryItems;
        return parsedCategory;
    }

    parseCategory(apiCategoryResponse, ampList) {

        let prodCategory = JSON.parse(apiCategoryResponse);
        let prodListing = prodCategory.matchingProducts;
        let productCount = 0;

        var parsedCategory = {
            items: []
        };

        for (var prod of prodListing) {
            let originalProd = prod.Value;
            let parsedProd = new Object();
            parsedProd.productId = originalProd.Main_Id;
            parsedProd.name = originalProd.Product_Title.replace(/ - Women's| - Men's/g,'');
            parsedProd.description = originalProd.Product_Title;                  // Missing field in Campmor API
            parsedProd.price = this.normalizePrice(originalProd.Discount_Price);  // Using Discount_Price, since it's the one associated to each product size on the Product API.
            parsedProd.image = originalProd.Photo;
            parsedProd.category = originalProd.Main_Id;                           // Missing field in Campmor API */

            parsedCategory.items.push(parsedProd);
            productCount++;
        }
        parsedCategory.productCount = productCount;

        return ampList ? {items: parsedCategory} : parsedCategory;
    }

    //Example url: https://campmoramp.ampify.wompmobile.com/campmor/fetchProduct/31893
    getProductUrl(productId) {
        return this.apiProductEndpoint + '/' + productId;
    }

    parseProduct(apiProductResponse) {

        var productObj = JSON.parse(apiProductResponse);

        this.enhanceProductRatings(productObj);
        this.enhanceProductColors(productObj);
        this.enhanceProductSizes(productObj);
        this.enhanceProductQuantity(productObj);

        return productObj;
    }

    /* Transforms product ratings into an array of stars to be rendered on the template with mustache.*/
    enhanceProductRatings(productObj) {
        var roundedRating = parseInt(productObj.RoundedRating);        
        var reviewFullStars = new Array();
        var reviewEmptyStars = new Array();

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
        var all_Colors_Array = productObj.All_Colors;

        for(var i = 0; i < all_Colors_Array.length; i++){
            let avaliable_Sizes_Array = all_Colors_Array[i].Avaliable_Sizes;

            let lastAvailable;

            for(var j = 0; j < avaliable_Sizes_Array.length; j++) {
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

    createCart(clientId) {

        let shoppingCart = {
            clientId: clientId,
            cartItems: [],
            subtotal: 0,
            shipping: 30,
            total: 0,
            isEmpty: true,
            addItem : function(item) {

                //check if item exists in cart before pushing
                var foundItem = this.cartItems.filter(function(elem){
                    return(elem.productId == item.productId && elem.color == item.color && elem.size == item.size);
                });

                if(foundItem.length > 0) {
                    foundItem[0].quantity += item.quantity;
                } else {
                    this.cartItems.push(item);    
                }
                
                this.subtotal = this.subtotal + (item.price * item.quantity);
                this.total = this.subtotal + this.shipping;
                this.isEmpty = false;
            },
            removeItem: function(productId, color, size) {

                for (var i = 0; i < this.cartItems.length; i++) {
                    if (this.cartItems[i].productId === productId && this.cartItems[i].color === color && this.cartItems[i].size === size) {

                        let cartItem = this.cartItems[i];
                        //update totals
                        this.subtotal = this.subtotal - (cartItem.price * cartItem.quantity);
                        this.total = this.subtotal + this.shipping;

                        //remove item
                        this.cartItems.splice(i, 1);

                        if(this.cartItems.length == 0) {
                            this.isEmpty = true;
                        }
                    }
                }
            }
        };

        return shoppingCart;
    }

/*** HELPERS ***/

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
}

module.exports = ApiManager;