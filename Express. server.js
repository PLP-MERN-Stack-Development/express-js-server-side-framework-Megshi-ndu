const express = require('express');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// --- In-memory Data Store ---
let products = [
    {
        id: uuidv4(),
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        price: 1200,
        category: 'Electronics',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Mechanical Keyboard',
        description: 'Tactile and responsive typing experience',
        price: 150,
        category: 'Peripherals',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Wireless Mouse',
        description: 'Ergonomic design with long battery life',
        price: 75,
        category: 'Peripherals',
        inStock: false
    },
    {
        id: uuidv4(),
        name: 'Monitor 4K',
        description: 'Ultra HD display for stunning visuals',
        price: 450,
        category: 'Electronics',
        inStock: true
    }
];

// --- Task 1: Express.js Setup ---
// Basic "Hello World" route at the root endpoint
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Express.js REST API.');
});

// --- Task 2: RESTful API Routes for Products ---

// GET /api/products: List all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET /api/products/:id: Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// POST /api/products: Create a new product
app.post('/api/products', (req, res) => {
    const { name, description, price, category, inStock } = req.body;

    // Basic validation (will be enhanced in Task 3)
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const newProduct = {
        id: uuidv4(),
        name,
        description: description || '', // Default to empty string if not provided
        price,
        category,
        inStock: inStock !== undefined ? inStock : true // Default to true if not provided
    };

    products.push(newProduct);
    res.status(201).json(newProduct); // 201 Created
});

// PUT /api/products/:id: Update an existing product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, inStock } = req.body;

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    products[productIndex] = {
        ...products[productIndex],
        name: name !== undefined ? name : products[productIndex].name,
        description: description !== undefined ? description : products[productIndex].description,
        price: price !== undefined ? price : products[productIndex].price,
        category: category !== undefined ? category : products[productIndex].category,
        inStock: inStock !== undefined ? inStock : products[productIndex].inStock
    };

    res.json(products[productIndex]);
});

// DELETE /api/products/:id: Delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send(); // 204 No Content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('API Endpoints:');
    console.log(`  GET /`);
    console.log(`  GET /api/products`);
    console.log(`  GET /api/products/:id`);
    console.log(`  POST /api/products`);
    console.log(`  PUT /api/products/:id`);
    console.log(`  DELETE /api/products/:id`);
});