import express from "express";
import { v4 as uuidv4 } from "uuid";
import validateProduct from "../middleware/validateProduct.js";
import { NotFoundError } from "../errors/NotFoundError.js";

const router = express.Router();

// Mock product data
let products = [];

// GET /api/products - List all products (with filtering, pagination, search)
router.get("/", (req, res) => {
  let { category, search, page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page,
    limit,
    data: paginated,
    timestamp: req.requestTime || new Date().toISOString(),
  });
});

// GET /api/products/stats - Product statistics by category
// Place before the :id route so "stats" does not get treated as an id
router.get("/stats/by-category", (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ stats, timestamp: req.requestTime || new Date().toISOString() });
});

// GET /api/products/:id
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json({ product, timestamp: req.requestTime || new Date().toISOString() });
});

// POST /api/products
router.post("/", validateProduct, (req, res) => {
  const now = req.requestTime || new Date().toISOString();
  const newProduct = { id: uuidv4(), createdAt: now, updatedAt: now, ...req.body };
  products.push(newProduct);
  res.status(201).json({ product: newProduct, timestamp: now });
});

// PUT /api/products/:id
router.put("/:id", validateProduct, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  const now = req.requestTime || new Date().toISOString();
  products[index] = { ...products[index], ...req.body, updatedAt: now };
  res.json({ product: products[index], timestamp: now });
});

// DELETE /api/products/:id
router.delete("/:id", (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  const deleted = products.splice(index, 1);
  res.json({ message: "Product deleted successfully", product: deleted[0], timestamp: req.requestTime || new Date().toISOString() });
});

export default router;
