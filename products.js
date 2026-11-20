// API URL
const API_URL = "https://dummyjson.com/products?limit=0";


// Function to retrieve products from the API
export async function loadProducts() {

    try {

        // Fetch products from the API
        const response = await fetch(API_URL);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("API request failed.");
        }

        // Convert the response into JSON
        const data = await response.json();

        // Return the products from the API
        return data.products.map(product => ({

            id: product.id,

            name: product.title,

            price: product.price,

            category: product.category,

            image: product.thumbnail,

            description: product.description,

            stock: product.stock,

            inStock: product.stock > 0

        }));

    } catch (error) {

        // Create a friendly error message
        const friendlyError = new Error(
            "Sorry! We could not load the products. Please try again later.",
            { cause: error }
        );

        console.error(friendlyError);

        // Return an empty array to prevent the application from crashing
        return [];

    }

}
