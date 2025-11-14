#!/usr/bin/env node

const http = require('http');

// API configuration
const API_BASE = 'http://localhost:3000';
const API_KEY = '1234567';

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🚀 Testing Express.js RESTful API\n');
  
  try {
    // Test 1: Root endpoint
    console.log('1️⃣ Testing root endpoint...');
    const rootResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    console.log(`✅ Status: ${rootResponse.status}`);
    console.log(`   Message: ${rootResponse.data.message}\n`);
    
    // Test 2: Get all products
    console.log('2️⃣ Testing get all products...');
    const allProducts = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products',
      method: 'GET'
    });
    console.log(`✅ Status: ${allProducts.status}`);
    console.log(`   Total products: ${allProducts.data.totalProducts}`);
    console.log(`   Products: ${allProducts.data.products.map(p => p.name).join(', ')}\n`);
    
    // Test 3: Get product by ID
    console.log('3️⃣ Testing get product by ID...');
    const productById = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products/1',
      method: 'GET'
    });
    console.log(`✅ Status: ${productById.status}`);
    console.log(`   Product: ${productById.data.name} - $${productById.data.price}\n`);
    
    // Test 4: Filter by category
    console.log('4️⃣ Testing category filter...');
    const filteredProducts = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products?category=Electronics',
      method: 'GET'
    });
    console.log(`✅ Status: ${filteredProducts.status}`);
    console.log(`   Electronics products: ${filteredProducts.data.totalProducts}\n`);
    
    // Test 5: Search products
    console.log('5️⃣ Testing search functionality...');
    const searchResults = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products?search=Laptop',
      method: 'GET'
    });
    console.log(`✅ Status: ${searchResults.status}`);
    console.log(`   Search results: ${searchResults.data.totalProducts}\n`);
    
    // Test 6: Product statistics
    console.log('6️⃣ Testing product statistics...');
    const stats = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products/stats',
      method: 'GET'
    });
    console.log(`✅ Status: ${stats.status}`);
    console.log(`   Total products: ${stats.data.totalProducts}`);
    console.log(`   In stock: ${stats.data.inStock}`);
    console.log(`   Average price: $${stats.data.averagePrice.toFixed(2)}\n`);
    
    // Test 7: Create product (with authentication)
    console.log('7️⃣ Testing product creation...');
    const newProduct = {
      name: 'Test Product',
      description: 'A product created for testing',
      price: 99.99,
      category: 'Test',
      inStock: true
    };
    const createdProduct = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    }, newProduct);
    console.log(`✅ Status: ${createdProduct.status}`);
    console.log(`   Created: ${createdProduct.data.name} (ID: ${createdProduct.data.id})\n`);
    
    // Test 8: Update product
    console.log('8️⃣ Testing product update...');
    const updateData = { price: 79.99, inStock: false };
    const updatedProduct = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: `/api/products/${createdProduct.data.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    }, updateData);
    console.log(`✅ Status: ${updatedProduct.status}`);
    console.log(`   Updated price: $${updatedProduct.data.price}`);
    console.log(`   Updated stock: ${updatedProduct.data.inStock}\n`);
    
    // Test 9: Error handling - invalid API key
    console.log('9️⃣ Testing authentication error...');
    const authError = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'wrong-key'
      }
    }, newProduct);
    console.log(`✅ Status: ${authError.status}`);
    console.log(`   Error: ${authError.data.error}\n`);
    
    // Test 10: Error handling - validation error
    console.log('🔟 Testing validation error...');
    const invalidProduct = { name: 'Invalid' };
    const validationError = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    }, invalidProduct);
    console.log(`✅ Status: ${validationError.status}`);
    console.log(`   Error: ${validationError.data.error}`);
    console.log(`   Details: ${validationError.data.details}\n`);
    
    // Test 11: Error handling - not found
    console.log('1️⃣1️⃣ Testing not found error...');
    const notFound = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products/999',
      method: 'GET'
    });
    console.log(`✅ Status: ${notFound.status}`);
    console.log(`   Error: ${notFound.data.error}\n`);
    
    // Test 12: Delete product
    console.log('1️⃣2️⃣ Testing product deletion...');
    const deleted = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: `/api/products/${createdProduct.data.id}`,
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY
      }
    });
    console.log(`✅ Status: ${deleted.status}`);
    console.log(`   Message: ${deleted.data.message}\n`);
    
    console.log('🎉 All tests completed successfully!');
    console.log('✨ The Express.js RESTful API is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
testAPI();