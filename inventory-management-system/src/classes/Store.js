import ProductProperties from './Product.js';
import PerishableProductProperties from './PerishableProduct.js';

class Store {
    constructor() {
        this.inventory = [];
    }

    addProduct(product) {
        if (!(product instanceof ProductProperties || product instanceof PerishableProductProperties)) {
            throw new Error('Invalid product');
        }
        this.inventory.push(product);
    }

    removeProduct(productName) {
        this.inventory = this.inventory.filter(product => product.name !== productName);
    }

    searchProduct(productName) {
        return this.inventory.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
    }

    getInventoryValue() {
        return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
    }

    listInventory() {
        return this.inventory.map(product => product.toString()).join('\n');
    }
}

export default Store;
