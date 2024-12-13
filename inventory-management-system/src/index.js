import Store from './classes/Store.js';
import PerishableProductProperties from './classes/PerishableProduct.js';
import ProductProperties from './classes/Product.js';

const store = new Store();

// Sample inventory data
const sampleInventory = [
    new PerishableProductProperties('Milk', 1.50, 10, '2024-12-31'),
    new PerishableProductProperties('Yogurt', 0.99, 20, '2024-11-15'),
    new ProductProperties('Bread', 2.50, 15),
    new ProductProperties('Butter', 3.00, 5)
];

// Load inventory from local storage
window.addEventListener('load', () => {
    const savedInventory = localStorage.getItem('inventory');
    const initialized = localStorage.getItem('initialized');

    if (!initialized) {
        // Add sample inventory to local storage
        sampleInventory.forEach(product => store.addProduct(product));
        saveInventory();
        localStorage.setItem('initialized', 'true');
    } else if (savedInventory) {
        const data = JSON.parse(savedInventory);
        data.forEach(item => {
            let product;
            if (item.expirationDate) {
                product = new PerishableProductProperties(item.name, item.price, item.quantity, item.expirationDate);
            } else {
                product = new ProductProperties(item.name, item.price, item.quantity);
            }
            store.addProduct(product);
        });
    }
    updateInventoryList();
    updateSummary();
});

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
    saveInventory();
    clearForm();
    showConfirmation();
    displayInventoryGrid(); // Ensure the inventory list is displayed after adding a product
    document.getElementById('list-inventory').textContent = 'Hide Inventory'; // Update button text
    updateSummary();
});

document.getElementById('list-inventory').addEventListener('click', () => {
    const inventoryList = document.getElementById('inventory-list');
    const button = document.getElementById('list-inventory');
    if (button.textContent === 'View Inventory') {
        displayInventoryGrid();
        button.textContent = 'Hide Inventory';
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
    updateSummary();
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

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(store.inventory));
}

function updateSummary() {
    const totalQuantity = store.inventory.reduce((sum, product) => sum + product.quantity, 0);
    const totalCost = store.inventory.reduce((sum, product) => sum + product.getTotalValue(), 0).toFixed(2);

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('total-cost').textContent = totalCost;
}