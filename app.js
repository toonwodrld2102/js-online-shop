// Online Shop - Task 3

// Product array containing all available products

const products = [
    {
        productName: "Running Shoes",
        price: 79.99,
        category: "Footwear",
        inStock: true
    },

    {
        productName: "Winter Boots",
        price: 99.99,
        category: "Footwear",
        inStock: false
    },

    {
        productName: "Chocolate Bar",
        price: 2.99,
        category: "Food item",
        inStock: true
    },

    {
        productName: "Potato Chips",
        price: 3.49,
        category: "Food item",
        inStock: true
    }
];


// Shopping cart array

const cart = [];


// PART 1: Add products to the shopping cart

function addToCart(productName) {

    const product = products.find(function(item) {
        return item.productName === productName;
    });

    if (!product) {
        console.log("Product not found.");
        return;
    }

    if (!product.inStock) {
        console.log(productName + " is currently out of stock.");
        return;
    }

    cart.push(product);

    updateCartCount();

    console.log(productName + " was added to your cart.");

}


// PART 2: Update the shopping cart counter

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    const cartDisplay = document.getElementById("cart-display");

    cartCount.textContent = cart.length;

    cartDisplay.textContent = cart.length;

}


// PART 3: View shopping cart

function viewCart() {

    console.log("Your Shopping Cart:");

    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {

        console.log(cart[i].productName + " - $" + cart[i].price);

        totalPrice += cart[i].price;

    }

    console.log("Total Price: $" + totalPrice.toFixed(2));

}


// PART 4: Filter products by category

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


// PART 5: Create category filter buttons

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


// PART 6: Dynamically create product cards

function renderProducts(productsToDisplay) {

    const productGrid = document.getElementById("product-grid");

    // Clear existing product cards

    productGrid.innerHTML = "";

    // Loop through each product

    productsToDisplay.forEach(function(product) {

        // Create a new product card

        const card = document.createElement("div");

        card.className = "product-card";

        // Create product name

        const name = document.createElement("h3");

        name.textContent = product.productName;

        // Create product category

        const category = document.createElement("p");

        category.textContent = "Category: " + product.category;

        // Create product price

        const price = document.createElement("p");

        price.textContent = "Price: $" + product.price.toFixed(2);

        // Create Add to Cart button

        const button = document.createElement("button");

        button.textContent = "Add to Cart";

        // Disable button if product is out of stock

        if (!product.inStock) {

            button.textContent = "Out of Stock";

            button.disabled = true;

        } else {

            // Attach click event listener

            button.addEventListener("click", function() {

                addToCart(product.productName);

            });

        }

        // Add product information to the card

        card.appendChild(name);

        card.appendChild(category);

        card.appendChild(price);

        card.appendChild(button);

        // Add completed card to the product grid

        productGrid.appendChild(card);

    });

}


// PART 7: Start the online shop

renderCategoryButtons();

renderProducts(products);

updateCartCount();
