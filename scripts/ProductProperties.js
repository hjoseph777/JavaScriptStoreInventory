class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }
}

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

// Fetch sample data from JSON file
fetch('scripts/sampleData.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const product = new PerishableProductProperties(item.name, item.price, item.quantity, item.expirationDate);
            console.log(product.toString());
            console.log('Total Value:', product.getTotalValue());
        });
    })
    .catch(error => console.error('Error loading sample data:', error));