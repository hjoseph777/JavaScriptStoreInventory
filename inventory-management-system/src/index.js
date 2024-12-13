import Store from './classes/Store.js';
import PerishableProductProperties from './classes/PerishableProduct.js';
import ProductProperties from './classes/Product.js';

const store = new Store();

document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const expirationDate = document.getElementById('expirationDate').value;

    let product;
    if (expirationDate) {
        product = new PerishableProductProperties(name, price, quantity, expirationDate);
    } else {
        product = new ProductProperties(name, price, quantity);
    }

    store.addProduct(product);
    updateInventoryList();
    clearForm();
    showConfirmation();
});

document.getElementById('list-inventory').addEventListener('click', () => {
    const inventoryList = document.getElementById('inventory-list');
    const button = document.getElementById('list-inventory');
    if (button.textContent === 'View Inventory') {
        fetch('scripts/sampleData.json')
            .then(response => response.json())
            .then(data => {
                store.inventory = []; // Clear existing inventory
                data.forEach(item => {
                    let product;
                    if (item.expirationDate) {
                        product = new PerishableProductProperties(item.name, item.price, item.quantity, item.expirationDate);
                    } else {
                        product = new ProductProperties(item.name, item.price, item.quantity);
                    }
                    store.addProduct(product);
                });
                displayInventoryGrid();
                button.textContent = 'Hide Inventory';
            })
            .catch(error => console.error('Error loading inventory:', error));
    } else {
        inventoryList.innerHTML = '';
        button.textContent = 'View Inventory';
    }
});

function updateInventoryList() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    store.inventory.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.toString();
        inventoryList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('product-form').reset();
}

function showConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.textContent = 'Product added successfully!';
    confirmation.style.color = 'green';
    document.getElementById('app').appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 2000);
}

function displayInventoryGrid() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    store.inventory.forEach(product => {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.textContent = product.toString();
        inventoryList.appendChild(div);
    });
}

// Example usage:
const milk = new PerishableProductProperties('Milk', 1.50, 10, '2024-12-31');
const yogurt = new PerishableProductProperties('Yogurt', 0.99, 20, '2024-11-15');

store.addProduct(milk);
store.addProduct(yogurt);

updateInventoryList();