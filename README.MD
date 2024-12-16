# JavaScript Store Inventory

## Description
A simple inventory management system to manage perishable and non-perishable products.

![Inventory Management System](assets/images/inventorymanagement.png)

### Example

To add a product to the inventory, fill out the form with the product name, price, quantity, and expiration date (if applicable), and click "Add Product". The product will be added to the inventory and displayed in the list.

### Screenshots

## Project Structure

<pre>
JavaScriptStoreInventory/
├── index.html
├── inventory-management-system/
│   ├── data/
│   │   └── sampleData.json
│   ├── src/
│   │   ├── classes/
│   │   │   ├── PerishableProduct.js
│   │   │   └── Product.js
│   │   ├── index.js
│   └── styles/
│       └── styles.css
</pre>


### Basic Logic of the Code

1. **Initialization**:
   - On window load, the application checks if the inventory has been initialized in local storage.
   - If not initialized, it fetches sample data from `sampleData.json`, adds it to the store, and saves it to local storage.
   - If initialized, it loads the inventory from local storage.

2. **Adding Products**:
   - Users can add products using a form.
   - The form captures product details and adds the product to the store.
   - The inventory list is updated, and the new product is saved to local storage.

3. **Viewing Inventory**:
   - Users can view the inventory by clicking the "View Inventory" button.
   - A loading indicator is shown while the inventory is being loaded.
   - The inventory list is displayed, and a summary of the inventory is updated.

4. **Searching Products**:
   - Users can search for products by name.
   - The search results are displayed in the inventory list.

5. **Deleting Products**:
   - Each product in the inventory list has a delete button.
   - Clicking the delete button removes the product from the store and updates the inventory list and summary.

### Flowchart

```mermaid
flowchart TD
    A[Window Load] --> B{Initialized?}
    B -->|No| C[Fetch Sample Data]
    C --> D[Add Sample Data to Store]
    D --> E[Save Inventory to Local Storage]
    B -->|Yes| F[Load Inventory from Local Storage]
    E --> G[Display Inventory]
    F --> G[Display Inventory]

    H[Add Product Form Submit] --> I[Capture Product Details]
    I --> J[Add Product to Store]
    J --> K[Update Inventory List]
    K --> L[Save Inventory to Local Storage]
    L --> M[Show Confirmation]

    N[View Inventory Button Click] --> O[Show Loading Indicator]
    O --> P[Display Inventory Grid]
    P --> Q[Update Summary]
    Q --> R[Hide Loading Indicator]

    S[Search Button Click] --> T[Capture Search Name]
    T --> U[Find Product in Store]
    U --> V{Product Found?}
    V -->|Yes| W[Display Product]
    V -->|No| X[Display "Product Not Found"]

    Y[Delete Button Click] --> Z[Remove Product from Store]
    Z --> AA[Update Inventory List]
    AA --> AB[Save Inventory to Local Storage]
    AB --> AC[Update Summary]
```

This flowchart provides a visual representation of the basic logic of the code, showing the main actions and decision points in the application.



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

