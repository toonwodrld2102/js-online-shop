// Online Shop - Shopping Cart Logic

// Import products from products.js

import { products } from "./products.js";


// Create the shopping cart array

export const cart = [];


// Add products to the shopping cart

export function addToCart(productName) {

    // Find the selected product

    const product = products.find(function(item) {

        return item.productName === productName;

    });


    // Check if the product exists

    if (!product) {

        throw new Error("PRODUCT_NOT_FOUND");

    }


    // Check if the product is in stock

    if (!product.inStock) {

        throw new Error("OUT_OF_STOCK");

    }


    // Add the product to the shopping cart

    cart.push(product);

    return product;

}


// Calculate the shopping cart total

export function calculateCartTotal() {

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total += cart[i].price;

    }

    return total.toFixed(2);

}


// View shopping cart

export function viewCart() {

    console.log("Your Shopping Cart:");

    for (let i = 0; i < cart.length; i++) {

        console.log(
            cart[i].productName + " - $" + cart[i].price
        );

    }

    console.log("Total Price: $" + calculateCartTotal());

}
