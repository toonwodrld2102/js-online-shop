// Shopping cart array
export const cart = [];


// CREATE AND UPDATE
// Add products to the shopping cart
export function addToCart(product) {

    // Check if the product already exists in the cart
    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {

        // Increase quantity if the product already exists
        existingProduct.quantity++;

    } else {

        // Add a new product with quantity of 1
        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }

    console.log(product.name + " added to cart.");

}


// READ
// Display the shopping cart
export function viewCart() {

    console.log("Shopping Cart:");

    cart.forEach(item => {

        console.log(
            item.name +
            " - Quantity: " +
            item.quantity +
            " - Price: $" +
            item.price
        );

    });

}


// DELETE
// Remove products from the shopping cart
export function removeFromCart(productName) {

    const productIndex = cart.findIndex(
        item => item.name === productName
    );

    if (productIndex !== -1) {

        cart.splice(productIndex, 1);

        console.log(productName + " removed from cart.");

    }

}


// Calculate the shopping cart total
export function calculateCartTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total;

}
