// Import functions from other JavaScript files

import { loadProducts } from "./products.js";

import {
    cart,
    addToCart,
    removeFromCart,
    calculateCartTotal,
    viewCart
} from "./cart.js";


// Store products retrieved from the API
let products = [];


// Get HTML elements
const productGrid = document.getElementById("product-grid");

const categoryFilters = document.getElementById("category-filters");

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

const errorMessage = document.getElementById("error-message");

const loadingMessage = document.getElementById("loading-message");


// Format prices
function formatPrice(price) {

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);

}


// Display products on the website
function renderProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.textContent = "No products are available.";

        return;

    }

    productList.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        const image = document.createElement("img");

        image.src = product.image;

        image.alt = product.name;

        image.loading = "lazy";

        const name = document.createElement("h3");

        name.textContent = product.name;

        const price = document.createElement("p");

        price.textContent = formatPrice(product.price);

        const category = document.createElement("p");

        category.textContent = "Category: " + product.category;

        const stock = document.createElement("p");

        stock.textContent = product.inStock
            ? "In Stock"
            : "Out of Stock";

        const addButton = document.createElement("button");

        addButton.textContent = "Add to Cart";

        addButton.disabled = !product.inStock;

        // CREATE: Add product to cart
        addButton.addEventListener("click", () => {

            try {

                addToCart(product);

                renderCart();

            } catch (error) {

                console.error(error);

                errorMessage.textContent =
                    "Unable to add this product to your cart.";

            }

        });

        productCard.appendChild(image);

        productCard.appendChild(name);

        productCard.appendChild(price);

        productCard.appendChild(category);

        productCard.appendChild(stock);

        productCard.appendChild(addButton);

        productGrid.appendChild(productCard);

    });

}


// Create category filter buttons
function renderCategoryFilters() {

    categoryFilters.innerHTML = "";

    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    // Display all products button
    const allButton = document.createElement("button");

    allButton.textContent = "All Products";

    allButton.addEventListener("click", () => {

        renderProducts(products);

    });

    categoryFilters.appendChild(allButton);


    // Create a button for each category
    categories.forEach(category => {

        const button = document.createElement("button");

        button.textContent = category;

        button.addEventListener("click", () => {

            const filteredProducts = products.filter(
                product => product.category === category
            );

            renderProducts(filteredProducts);

        });

        categoryFilters.appendChild(button);

    });

}


// READ, UPDATE, DELETE
// Display the shopping cart
function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is currently empty.";

    }

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const productName = document.createElement("h3");

        productName.textContent = item.name;

        const quantity = document.createElement("p");

        quantity.textContent = "Quantity: " + item.quantity;

        const price = document.createElement("p");

        price.textContent =
            "Price: " + formatPrice(item.price);

        const subtotal = document.createElement("p");

        subtotal.textContent =
            "Subtotal: " +
            formatPrice(item.price * item.quantity);

        // Create Remove button
        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        // DELETE: Remove product from cart
        removeButton.addEventListener("click", () => {

            removeFromCart(item.name);

            renderCart();

        });

        cartItem.appendChild(productName);

        cartItem.appendChild(quantity);

        cartItem.appendChild(price);

        cartItem.appendChild(subtotal);

        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);

    });


    // Update cart item count
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    // Calculate and display running cart total
    cartTotal.textContent =
        "Total: " + formatPrice(calculateCartTotal());

}


// LOAD PRODUCTS FROM API
async function startShop() {

    try {

        loadingMessage.textContent = "Loading products...";

        // WAIT for API products to load
        products = await loadProducts();

        // Hide loading message
        loadingMessage.textContent = "";

        if (products.length === 0) {

            errorMessage.textContent =
                "Products could not be loaded. Please refresh the page.";

            return;

        }

        errorMessage.textContent = "";

        // Display products
        renderProducts(products);

        // Display category buttons
        renderCategoryFilters();

        // Display shopping cart
        renderCart();

        console.log("Online Shop successfully loaded!");

        console.log("Products retrieved from API:", products);

        viewCart();

    } catch (error) {

        console.error("Application error:", error);

        loadingMessage.textContent = "";

        errorMessage.textContent =
            "Something went wrong while loading the Online Shop.";

    }

}


// Start the Online Shop
startShop();
