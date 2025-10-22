import { ValidationError } from "../errors/ValidationError.js";

const validateProduct = (req, res, next) => {
  // Ensure request has a timestamp (from earlier middleware or create one)
  if (!req.requestTime) {
    req.requestTime = new Date().toISOString();
    res.locals.requestTime = req.requestTime;
  }
  const now = req.requestTime;

  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price === undefined || !category || typeof inStock !== "boolean") {
    return next(new ValidationError("Missing or invalid product fields"));
  }

  if (typeof price !== "number" || price < 0) {
    return next(new ValidationError("Price must be a positive number"));
  }

  // Attach timestamps to incoming product data
  if (req.method === "POST") {
    req.body.createdAt = req.body.createdAt || now;
    req.body.updatedAt = now;
  } else if (req.method === "PUT" || req.method === "PATCH") {
    req.body.updatedAt = now;
  }

  next();
};

export default validateProduct;
