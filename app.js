// ==========================================
// ONLINE SHOP - TASK 2
// ==========================================


// PART A: ARRAYS

// GLOBAL SCOPE:
// Products and cart are declared outside functions.
// This allows all three functions to access them.

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


// Create an empty shopping cart array.
const cart = [];


// Display the entire products array in the console.
console.log("========== PRODUCTS ARRAY ==========");
console.log(products);


// ==========================================
// PART B: FUNCTIONS
// ==========================================


// FUNCTION 1: addToCart()

// This function accepts a product name as a parameter.
// It searches for the product and checks if it is in stock.

function addToCart(productName) {

    // Find the product that matches the requested name.
    const product = products.find(function(item) {
        return item.productName === productName;
    });

    // Check whether the product exists.
    if (product === undefined) {

        console.log(productName + " was not found.");

    }

    // Check whether the product is available.
    else if (product.inStock === true) {

        // Add the product to the shopping cart.
        cart.push(product);

        console.log(product.productName + " was added to the cart.");

    }

    // Display an error if the product is out of stock.
    else {

        console.log(product.productName + " is currently out of stock.");

    }

}


// FUNCTION 2: viewCart()

// This function displays all products in the cart
// and calculates the total price.

function viewCart() {

    // FUNCTION SCOPE:
    // var makes totalPrice available throughout this function.
    var totalPrice = 0;

    console.log("========== SHOPPING CART ==========");

    // Loop through every product inside the cart.
    for (const item of cart) {

        console.log(
            item.productName + " - $" + item.price.toFixed(2)
        );

        // Add each product's price to the total.
        totalPrice += item.price;

    }

    // Display the total shopping cart price.
    console.log("Total Price: $" + totalPrice.toFixed(2));

}


// FUNCTION 3: filterByCategory()

// This function accepts a category and finds matching products.

function filterByCategory(category) {

    // Use filter() to create an array containing matching products.
    const filteredProducts = products.filter(function(item) {

        return item.category === category;

    });

    console.log("========== " + category.toUpperCase() + " PRODUCTS ==========");

    // Display each product that matches the selected category.
    for (const item of filteredProducts) {

        console.log(
            item.productName + " - $" + item.price.toFixed(2)
        );

    }

}


// ==========================================
// TESTING THE THREE FUNCTIONS
// ==========================================


// Test addToCart() with a product that does not exist.
addToCart("Wireless Headphones");

// Test addToCart() with an out-of-stock product.
addToCart("Winter Boots");

// Test addToCart() with products that are available.
addToCart("Running Shoes");
addToCart("Chocolate Bar");
addToCart("Potato Chips");


// Test viewCart() to display the cart and total price.
viewCart();


// Test filterByCategory() for footwear.
filterByCategory("Footwear");

// Test filterByCategory() for food items.
filterByCategory("Food item");


// ==========================================
// SCOPE DEMONSTRATION
// ==========================================


// BLOCK SCOPE:
// The message variable only exists inside this IF block.

if (cart.length > 0) {

    const message = "Your cart contains " + cart.length + " item(s).";

    console.log(message);

}


// Display the final cart array.
console.log("========== FINAL CART ARRAY ==========");
console.log(cart);
