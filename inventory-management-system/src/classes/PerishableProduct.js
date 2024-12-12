import ProductProperties from './Product.js';

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        if (!expirationDate || isNaN(Date.parse(expirationDate))) {
            throw new Error('Invalid expiration date');
        }
        this.expirationDate = expirationDate;
    }

    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

export default PerishableProductProperties;