class Cart {

/** Constructor:
 * Retrieve the serialized cart from the express.js session, if it exists.
 * If it doesn't, create a new cart and add it to the session.
 * Deserialize the cart so we can use it!
 */
    constructor(req) {
        this._itemProps = ['productId', 'categoryId', 'name', 'price', 'color', 'size', 'imgUrl', 'quantity'];

        this.serializedCart = req.session.cart || this.create();
        this.cart = serializer.deserialize(this.serializedCart);
    }

    create() {
        return {
            items: [],
            subtotal: 0,
            shipping: 30,
            total: 0,
            isEmpty: false;
        };
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
            this.cart.push(goodItem);
        }
        
        this.updateProperties();
    }

    removeItem(item) {
        const itemIndex = this.findItemIndex(item);

        if (!itemIndex)
            return false;

        const item = this.cart.items[itemIndex];
        this.cart.items.splice(itemIndex, 1);

        this.updateProperties();
    }

    findItem(item) {
        var foundItem = this.cart.items.filter(function(elem) {
            return elem.productId == item.productId && elem.color == item.color && elem.size == item.size;
        });

        return foundItem[0] || false;
    }

    // make sure the item has the properties we expect, and sanitize them all.
/* We expect any cart item to have the followig properties:
 * productId, categoryId, name, price, color, size, imgUrl, quantity
 */
    checkItem(item) {
        return item;
/*        
        let cleanItem = {};

        const price = Number(item.price);
        if (price > 0)
            cleanItem.price = price;
        else
            return false;

        const categoryId = Number(item.categoryId);
        if (categoryId > 0)
            cleanItem.categoryId = categoryId;
        else
            return false;
*/            
    }

// find the index of a given cart item
    findItemIndex(item) {
        const cartItems = this.cart.items;

        for (let i = 0; i < items.length)
            if (cartItems[i].productId == item.productId && cartItems[i].color == item.color && cartItems[i].size == item.size)
                return i;

        return false;
    }

// Compute the properties of the cart: total, subtotal, and is it empty?
    updateProperties() {
        const items = this.cart.items;

        for (let i = 0; i < items.length) {
            this.cart.subTotal += items[i].price * items[i].quantity;
        }

        this.cart.total = this.cart.subTotal + this.cart.shipping;
        this.cart.isEmpty = !!items.length;
    }

}