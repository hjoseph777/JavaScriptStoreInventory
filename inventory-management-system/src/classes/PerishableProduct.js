import Product from './Product.js';

class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate, discount = 0) {
        super(name, price, quantity, discount);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}, Discount: ${isNaN(this.discount) ? 'N/A' : (this.discount * 100).toFixed(0)}%`;
    }
}

export default PerishableProduct;