// Online Shop - Task 2

// Global scope: Products and cart can be used throughout the program.
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

        category: "Food",

        inStock: true

    },

    {

        productName: "Potato Chips",

        price: 3.49,

        category: "Food",

        inStock: true

    }

];


// Empty cart array
const cart = [];

// Log the entire products array
console.log("Products Array:");
console.log(products);


// Function to add a product to the cart
function addToCart(productName) {
    const product = products.find(function(item) {
        return item.productName === productName;
    });

    if (product === undefined) {
        console.log(productName + " was not found.");
    } else if (product.inStock) {
        cart.push(product);
        console.log(product.productName + " was added to the cart.");
    } else {
        console.log(product.productName + " is currently out of stock.");
    }
}


// Function to view the cart
function viewCart() {
    let totalPrice = 0;

    console.log("Shopping Cart:");

    for (const item of cart) {
        console.log(item.productName + " - $" + item.price.toFixed(2));
        totalPrice += item.price;
    }

    console.log("Total Price: $" + totalPrice.toFixed(2));
}


// Function to filter products by category
function filterByCategory(category) {
    const filteredProducts = products.filter(function(item) {
        return item.category === category;
    });

    console.log("Products in the " + category + " category:");

    for (const item of filteredProducts) {
        console.log(item.productName + " - $" + item.price.toFixed(2));
    }
}


// Test the addToCart function
addToCart("Wireless Headphones");
addToCart("Winter Boots");
addToCart("Chocolate Bar");
addToCart("Laptop");

// Test the viewCart function
viewCart();

// Test the filterByCategory function
filterByCategory("Footwear");
filterByCategory("Food");


// Block scope example
if (cart.length > 0) {
    const message = "The cart contains " + cart.length + " item(s).";
    console.log(message);
}
