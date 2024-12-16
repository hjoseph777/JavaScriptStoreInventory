import Store from './classes/Store.js';
import PerishableProductProperties from './classes/PerishableProduct.js';
import ProductProperties from './classes/Product.js';

const store = new Store();

// Load inventory from local storage
window.addEventListener('load', async () => {
    const initialized = localStorage.getItem('initialized');

    if (!initialized) {
        // Clear local storage to force reload of sample data
        localStorage.clear();

        // Fetch sample inventory from sampleData.json
        try {
            const response = await fetch('inventory-management-system/data/sampleData.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const sampleInventory = await response.json();
            console.log('Sample Inventory Loaded:', sampleInventory);

            // Add sample inventory to local storage
            sampleInventory.forEach(item => {
                let product;
                if (item.expirationDate) {
                    product = new PerishableProductProperties(item.name, item.price, item.quantity, item.expirationDate, item.discount);
                } else {
                    product = new ProductProperties(item.name, item.price, item.quantity, item.discount);
                }
                store.addProduct(product);
            });
            saveInventory();
            localStorage.setItem('initialized', 'true');
        } catch (error) {
            console.error('Failed to fetch sample inventory:', error);
        }
    } else {
        const savedInventory = localStorage.getItem('inventory');
        if (savedInventory) {
            const data = JSON.parse(savedInventory);
            data.forEach(item => {
                let product;
                if (item.expirationDate) {
                    product = new PerishableProductProperties(item.name, item.price, item.quantity, item.expirationDate, item.discount);
                } else {
                    product = new ProductProperties(item.name, item.price, item.quantity, item.discount);
                }
                store.addProduct(product);
            });
        }
    }
    // Do not call updateSummary here to keep values zero initially
});

document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const expirationDate = document.getElementById('expirationDate').value;
    const discount = parseFloat(document.getElementById('discount').value) / 100;

    let product;
    if (expirationDate) {
        product = new PerishableProductProperties(name, price, quantity, expirationDate, discount);
    } else {
        product = new ProductProperties(name, price, quantity, discount);
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

document.getElementById('list-inventory').addEventListener('click', async () => {
    const inventoryList = document.getElementById('inventory-list');
    const button = document.getElementById('list-inventory');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.textContent = 'Loading...';
    document.getElementById('app').appendChild(loadingIndicator);

    if (button.textContent === 'View Inventory') {
        console.log('Displaying Inventory Grid');
        await displayInventoryGrid();
        button.textContent = 'Hide Inventory';
        updateSummary(); // Update summary when inventory is displayed
    } else {
        inventoryList.innerHTML = '';
        button.textContent = 'View Inventory';
        resetSummary(); // Reset summary when inventory is hidden
    }

    loadingIndicator.remove();
});

document.getElementById('search-button').addEventListener('click', () => {
    const searchName = document.getElementById('search-name').value.trim();
    if (searchName) {
        const product = store.inventory.find(product => product.name.toLowerCase() === searchName.toLowerCase());
        const inventoryList = document.getElementById('inventory-list');
        inventoryList.innerHTML = '';
        if (product) {
            const div = document.createElement('div');
            div.className = 'inventory-item';
            const span = document.createElement('span');
            span.textContent = product.toString();
            div.appendChild(span);
            inventoryList.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.className = 'inventory-item';
            div.textContent = 'Product not found';
            inventoryList.appendChild(div);
        }
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

async function displayInventoryGrid() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    store.inventory.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        
        const span = document.createElement('span');
        span.innerHTML = `
            <span class="dot ${product.expirationDate ? 'yellow-dot' : 'green-dot'}"></span>
            Product: ${product.name}, 
            Price: $${product.price.toFixed(2)}, 
            Quantity: ${product.quantity}, 
            ${product.expirationDate ? `Expiration Date: ${product.expirationDate}, ` : ''}
            Discount: ${(product.discount * 100).toFixed(0)}%
        `;
        
        const button = document.createElement('button');
        button.className = 'delete-button';
        button.textContent = 'Delete';
        button.addEventListener('click', () => {
            store.inventory.splice(index, 1);
            saveInventory();
            displayInventoryGrid();
            updateSummary();
        });
        
        div.appendChild(span);
        div.appendChild(button);
        inventoryList.appendChild(div);
    });
}

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(store.inventory));
}

function updateSummary() {
    const totalQuantity = store.inventory.reduce((sum, product) => sum + product.quantity, 0);
    const totalGrossPrice = store.inventory.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2);
    const totalPriceWithPerishableDiscount = store.inventory.reduce((sum, product) => sum + product.getTotalValue(), 0).toFixed(2);
    const totalNetPriceWithDiscount = (totalPriceWithPerishableDiscount * 0.85).toFixed(2);

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('price-Without-Discount').textContent = totalGrossPrice;
    document.getElementById('Total-Price-With-Perishable-Discount').textContent = totalPriceWithPerishableDiscount;
    document.getElementById('total-net-price-with-discount').textContent = totalNetPriceWithDiscount;
}

function resetSummary() {
    document.getElementById('total-quantity').textContent = '0';
    document.getElementById('price-Without-Discount').textContent = '0.00';
    document.getElementById('Total-Price-With-Perishable-Discount').textContent = '0.00';
    document.getElementById('total-net-price-with-discount').textContent = '0.00';
}