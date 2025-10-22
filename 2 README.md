🛒 Express.js Product API

A fully functional RESTful API built using Express.js, showcasing best practices such as:

Middleware (logging, authentication, validation)

Error handling

Filtering, pagination, and search

Route organization and modular structure

⚙️ Setup Instructions
1️⃣ Prerequisites

Node.js v18+

npm

(Optional) Postman, Insomnia, or curl for testing

2️⃣ Clone or create the project
git clone https://github.com/your-username/express-products-api.git
cd express-products-api

3️⃣ Install dependencies
npm install

4️⃣ Create .env file

Add the following to your .env file:

PORT=3000
API_KEY=12345

5️⃣ Run the server
npm start


or (for auto-reloading during development)

npm run dev

6️⃣ Verify server is running

Visit in your browser or Postman:

http://localhost:3000/


You should see:

Hello World from Express.js API 🚀

📚 API Documentation

All routes are prefixed with:

/api/products

🔑 Authentication

All API requests must include the following header:

x-api-key: 12345

🧾 Endpoints Summary
Method	Endpoint	Description
GET	/api/products	List all products (supports filtering, pagination, search)
GET	/api/products/:id	Get a product by ID
POST	/api/products	Create a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product
GET	/api/products/stats/by-category	Get count of products by category
🧩 Product Object Schema

Each product includes:

Field	Type	Description
id	String	Unique product identifier
name	String	Product name
description	String	Product description
price	Number	Product price
category	String	Product category
inStock	Boolean	Availability flag
🧪 Example Requests & Responses
➕ Create a Product

POST /api/products

Headers:

Content-Type: application/json
x-api-key: 12345


Body:

{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 1500,
  "category": "Electronics",
  "inStock": true
}


Response:

{
  "id": "3d2fbb10-1d44-4cf0-9e0a-2e2d3f234e1f",
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 1500,
  "category": "Electronics",
  "inStock": true
}

📋 Get All Products

GET /api/products

Query Parameters:

Param	Description	Example
category	Filter by category	/api/products?category=Electronics
search	Search by name	/api/products?search=laptop
page	Pagination page number	/api/products?page=2
limit	Number of results per page	/api/products?limit=5

Response:

{
  "total": 10,
  "page": 1,
  "limit": 5,
  "data": [
    {
      "id": "3d2fbb10-1d44-4cf0-9e0a-2e2d3f234e1f",
      "name": "Laptop",
      "description": "High performance laptop",
      "price": 1500,
      "category": "Electronics",
      "inStock": true
    }
  ]
}

🔍 Get a Product by ID

GET /api/products/:id

Example:

/api/products/3d2fbb10-1d44-4cf0-9e0a-2e2d3f234e1f


Response:

{
  "id": "3d2fbb10-1d44-4cf0-9e0a-2e2d3f234e1f",
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 1500,
  "category": "Electronics",
  "inStock": true
}

✏️ Update a Product

PUT /api/products/:id

Body:

{
  "price": 1200,
  "inStock": false
}


Response:

{
  "id": "3d2fbb10-1d44-4cf0-9e0a-2e2d3f234e1f",
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 1200,
  "category": "Electronics",
  "inStock": false
}

❌ Delete a Product

DELETE /api/products/:id

Response:

{
  "message": "Product deleted successfully",
  "product": {
    "id": "3d2fbb10-1d44-4cf0-9e0a-2e2d3f234e1f",
    "name": "Laptop"
  }
}

📊 Get Product Statistics by Category

GET /api/products/stats/by-category

Response:

{
  "Electronics": 3,
  "Clothing": 5,
  "Books": 2
}

⚙️ Middleware Summary
Middleware	Purpose
logger	Logs request method, URL, and timestamp
auth	Validates x-api-key header
validateProduct	Ensures required product fields are valid
errorHandler	Handles all errors gracefully with proper status codes
⚠️ Error Handling
Error Type	HTTP Code	Example Message
ValidationError	400	"Missing or invalid product fields"
NotFoundError	404	"Product not found"
Unauthorized	401	"Invalid or missing API key"
Internal Server Error	500	"Something went wrong"
🧠 Example curl Commands

Create a Product

curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "x-api-key: 12345" \
-d '{"name":"Phone","description":"Smartphone","price":999,"category":"Electronics","inStock":true}'


Get All Products

curl -X GET http://localhost:3000/api/products -H "x-api-key: 12345"


Delete a Product

curl -X DELETE http://localhost:3000/api/products/<id> -H "x-api-key: 12345"

🏁 Summary

This API demonstrates:

A well-structured Express.js REST API

Modular middleware and routes

Secure API key authentication

Robust error handling

Flexible filtering, pagination, and search

You can easily extend it with database integration (e.g., MongoDB, PostgreSQL) later.