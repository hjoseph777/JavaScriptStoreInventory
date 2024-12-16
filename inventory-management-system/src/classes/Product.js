class ProductProperties {
    constructor(name, price, quantity, discount = 0) {
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
        this.price = parseFloat(price); // Ensure price is a number
        this.quantity = quantity;
        this.discount = discount;
    }

    getTotalValue() {
        return this.price * this.quantity * (1 - this.discount);
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Discount: ${isNaN(this.discount) ? 'N/A' : (this.discount * 100).toFixed(0)}%`;
    }
}

export default ProductProperties;