import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import { NotFoundError } from "./errors/NotFoundError.js";
import { ValidationError } from "./errors/ValidationError.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// Timestamp middleware: attach ISO timestamp to request and res.locals
app.use((req, res, next) => {
  const now = new Date();
  req.requestTime = now.toISOString();
  res.locals.requestTime = req.requestTime;
  next();
});
app.use(logger);
app.use(auth);

// Routes
app.use("/api/products", productRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send(`Hello World from Express.js API 🚀 - ${req.requestTime}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[${req.requestTime || new Date().toISOString()}]`, err.stack);
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message, timestamp: req.requestTime || new Date().toISOString() });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message, timestamp: req.requestTime || new Date().toISOString() });
  }
  res.status(500).json({ error: "Internal Server Error", timestamp: req.requestTime || new Date().toISOString() });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", timestamp: req.requestTime || new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT} - ${new Date().toISOString()}`);
});
