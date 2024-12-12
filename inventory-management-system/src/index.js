import PerishableProductProperties from './classes/PerishableProduct.js';

// Example usage:
const milk = new PerishableProductProperties('Milk', 1.50, 10, '2024-12-31');
const yogurt = new PerishableProductProperties('Yogurt', 0.99, 20, '2024-11-15');

console.log(milk.toString());
console.log('Total Value:', milk.getTotalValue());

console.log(yogurt.toString());
console.log('Total Value:', yogurt.getTotalValue());