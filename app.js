// Online Shop - Task 4


// Import products and shopping cart functions

import { products } from "./products.js";

import {
    cart,
    addToCart,
    viewCart
} from "./cart.js";


// Update shopping cart counter

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    const cartDisplay = document.getElementById("cart-display");

    cartCount.textContent = cart.length;

    cartDisplay.textContent = cart.length;

}


// Filter products by category

function filterByCategory(category) {

    if (category === "All") {

        renderProducts(products);

    } else {

        const filteredProducts = products.filter(function(product) {

            return product.category === category;

        });

        renderProducts(filteredProducts);

    }

}


// Create category filter buttons

function renderCategoryButtons() {

    const filterContainer = document.getElementById("category-filters");

    filterContainer.innerHTML = "";

    const categories = ["All", ...new Set(products.map(function(product) {

        return product.category;

    }))];


    categories.forEach(function(category) {

        const button = document.createElement("button");

        button.textContent = category;

        button.addEventListener("click", function() {

            filterByCategory(category);

        });

        filterContainer.appendChild(button);

    });

}


// Create product cards dynamically

function renderProducts(productsToDisplay) {

    const productGrid = document.getElementById("product-grid");

    const errorMessage = document.getElementById("error-message");

    // Clear existing products

    productGrid.innerHTML = "";

    errorMessage.textContent = "";


    // Loop through products

    productsToDisplay.forEach(function(product) {

        // Create product card

        const card = document.createElement("div");

        card.className = "product-card";


        // Product name

        const name = document.createElement("h3");

        name.textContent = product.productName;


        // Product category

        const category = document.createElement("p");

        category.textContent = "Category: " + product.category;


        // Product price

        const price = document.createElement("p");

        price.textContent = "Price: $" + product.price.toFixed(2);


        // Create Add to Cart button

        const button = document.createElement("button");

        button.textContent = "Add to Cart";


        // Attach event listener

        button.addEventListener("click", function() {

            // Clear previous error messages

            errorMessage.textContent = "";


            try {

                // Attempt to add the product to the cart

                addToCart(product.productName);

            }

            catch (error) {

                // Display a user-friendly error message

                if (error.message === "PRODUCT_NOT_FOUND") {

                    errorMessage.textContent =
                        "Sorry, this product could not be found.";

                }

                else if (error.message === "OUT_OF_STOCK") {

                    errorMessage.textContent =
                        "Sorry, this product is currently out of stock.";

                }

                else {

                    errorMessage.textContent =
                        "Something went wrong. Please try again.";

                }

            }

            finally {

                // Always update the cart counter

                updateCartCount();

            }

        });


        // Add product information to card

        card.appendChild(name);

        card.appendChild(category);

        card.appendChild(price);

        card.appendChild(button);


        // Add card to product grid

        productGrid.appendChild(card);

    });

}


// Start the online shop

renderCategoryButtons();

renderProducts(products);

updateCartCount();
