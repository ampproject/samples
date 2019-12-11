const serializer = require('serialize-to-js');

class Cart {

/** Constructor:
 * Retrieve the serialized cart from the express.js session, if it exists.
 * If it doesn't, create a new cart, serialize it, and add it to the session.
 * In any case, deserialize the cart so we can access it!
 */
    constructor(req) {
        // a new cart item must contain all of these properties
        this._itemPropertyNames = ['productId', 'categoryId', 'name', 'price', 'color', 'size', 'imgUrl', 'quantity'];

        this._shippingPercentage = 8; // 8% flat rate shipping

        // the cart in serialized form
        this.serializedCart = req.session.cart || serializer.serialize(this.createNew());

        // the cart as an object
        this.cart = serializer.deserialize(this.serializedCart);

        // cache the request
        this._req = req;
    }

// createNew() returns a default cart.
// Note that we store dollar values as strings so that the site can display them without preprocessing.
    createNew() {
        return {
            items: [],
            subtotal: 0,
            shipping: 0,
            total: 0,
            subtotalString: '0.00',
            shippingString: '0.00',
            totalString: '0.00',
            isEmpty: false
        };
    }

// Serialize our cart and copy our cart to the session.
    copyCartToSession() {
        this._serializedCart = serializer.serialize(this.cart);
        this._req.session.cart = this._serializedCart;
    }

/** addItem() expects an object that contains the product's proprties.
 * First, check to make sure they're there and sanitize them as they may have come from the client.
 * If the item's faulty, return false.
 * If the item's already in the cart, increment the quantity.
 * Otherwise, add a new item.
 */
    addItem(item) {
        const goodItem = this.checkItem(item);
        if (!goodItem)
            return false;

        let foundItem = this.findItem(goodItem);

        if (foundItem) {
            foundItem.quantity += goodItem.quantity;
        } else {
            this.cart.items.push(goodItem);
        }
        
        this.updateProperties();
    }

    removeItem(item) {
        const itemIndex = this.findItemIndex(item);

        if (itemIndex === false) {
            console.error("Cart.removeItem() couldn't find this item:", item);
            return false;
        }

//        const item = this.cart.items[itemIndex]; // this line is WRONG
        this.cart.items.splice(itemIndex, 1);

        this.updateProperties();
    }

    findItem(item) {
        var foundItem = this.cart.items.filter(function(elem) {
            return elem.productId == item.productId && elem.color == item.color && elem.size == item.size;
        });

        return foundItem[0] || false;
    }

// TODO: make sure the item has the properties we expect, and sanitize them all.
/* We expect any cart item to have the following properties:
 * productId, categoryId, name, price, color, size, imgUrl, quantity
 */
    checkItem(item) {
        item.priceString = item.price;   
        item.price = Number(item.price);
        item.quantity = Number(item.quantity);

        return item;
    }

// find the index of a given cart item. If we don't find it, return false.
    findItemIndex(item) {
        const cartItems = this.cart.items;

        for (let i = 0; i < cartItems.length; i++)
            if (cartItems[i].productId == item.productId && cartItems[i].color == item.color && cartItems[i].size == item.size)
                return i;

        return false;
    }

// Compute the properties of the cart: total, subtotal, and is it empty?
    updateProperties() {
        let subtotal = this.cart.items.reduce(
            (acc, cur) => acc + (cur.price * cur.quantity),
            0
        );

        this.cart.subtotal = this.round(subtotal, 2);

        this.cart.shipping = this.round(this.cart.subtotal * (this._shippingPercentage / 100), 2);
        this.cart.total = this.round(this.cart.subtotal + this.cart.shipping, 2);
        this.cart.isEmpty = this.cart.items.length === 0;

        this.cart.subtotalString = this.cart.subtotal.toFixed(2);
        this.cart.shippingString = this.cart.shipping.toFixed(2);
        this.cart.totalString = this.cart.total.toFixed(2);

        this.copyCartToSession();
    }

// Sometimes JavaScript does funny things with floating point arithmetic, so we like to always round
    round(num, places) {
        return Math.round(num * (10 ** places)) / (10 ** places);
    }

}

module.exports = Cart;