# JavaScript Store Inventory

## Description
A simple inventory management system to manage perishable and non-perishable products.

## ![Inventory Management System](screenshots/inventory.png)

### Example

To add a product to the inventory, fill out the form with the product name, price, quantity, and expiration date (if applicable), and click "Add Product". The product will be added to the inventory and displayed in the list.

### Screenshots

## Project Structure

<pre>
JavaScriptStoreInventory/
├── inventory-management-system/
│   ├── src/
│   │   ├── classes/
│   │   │   ├── Store.js
│   │   │   ├── Product.js
│   │   │   └── PerishableProduct.js
│   │   ├── index.js
│   ├── styles/
│   │   └── styles.css
├── index.html
├── package.json
├── README.md
</pre>

styles.css
-The CSS file for styling the application, including layout, colors, and responsive design

index.js
-The main JavaScript file that initializes the application, handles form submissions, updates the inventory list, and manages local storage.

PerishableProduct.js
-The PerishableProductProperties class extends the ProductProperties class to include an expiration date for perishable products. It overrides the toString method to include the expiration date in the string representation.

Store.js
-The Store class manages the inventory of products. It provides methods to add, remove, search, and list products, as well as calculate the total value of the inventory.

-index.html: The main HTML file for the application.

-classes: The directory containing the JavaScript classes (Store.js, Product.js, PerishableProduct.js).

Features
-Add perishable and non-perishable products to the inventory.
-View the inventory list.
-Remove products from the inventory.
-Search for products in the inventory.
-Display total quantity and total cost of items in the inventory.
-Persist inventory data using local storage.

