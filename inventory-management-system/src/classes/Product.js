class ProductProperties {
    constructor(name, price, quantity) {
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid name');
        }
        if (isNaN(price) || price < 0) {
            throw new Error('Invalid price');
        }
        if (!Number.isInteger(quantity) || quantity < 0) {
            throw new Error('Invalid quantity');
        }
        this.name = name;
        this.price = parseFloat(price).toFixed(2); // Ensure price is a decimal with two places
        this.quantity = quantity;
    }

    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`;
    }
}

export default ProductProperties;