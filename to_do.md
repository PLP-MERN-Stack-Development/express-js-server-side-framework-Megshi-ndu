Express.js RESTful API Development Todo

Task 1: Express.js Setup
 Initialize Node.js project with package.json
 Install Express.js and required dependencies
 Create basic Express server listening on port 3000
 Implement "Hello World" route at root endpoint

Task 2: RESTful API Routes
 Create products resource structure
 Implement GET /api/products (list all products)
 Implement GET /api/products/:id (get specific product)
 Implement POST /api/products (create new product)
 Implement PUT /api/products/:id (update product)
 Implement DELETE /api/products/:id (delete product)

Task 3: Middleware Implementation
 Create custom logger middleware
 Implement JSON body parsing middleware
 Create authentication middleware (API key check)
 Add validation middleware for product routes

Task 4: Error Handling
 Implement global error handling middleware
 Create custom error classes
 Add proper error responses with HTTP status codes
 Handle asynchronous errors with try/catch
 
Task 5: Advanced Features
 Implement query parameters for category filtering
 Add pagination support for product listing
 Create search endpoint for product names
 Implement product statistics route
 Test all functionality and create documentation