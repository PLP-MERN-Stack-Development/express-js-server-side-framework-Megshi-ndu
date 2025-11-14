// Base custom error class
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Not Found Error
class NotFoundError extends CustomError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// Validation Error
class ValidationError extends CustomError {
  constructor(message = 'Validation failed', details = null) {
    super(message, 400);
    this.details = details;
  }
}

// Authentication Error
class AuthenticationError extends CustomError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

// Authorization Error
class AuthorizationError extends CustomError {
  constructor(message = 'Access denied') {
    super(message, 403);
  }
}

// Conflict Error (for duplicate resources, etc.)
class ConflictError extends CustomError {
  constructor(message = 'Resource conflict') {
    super(message, 409);
  }
}

module.exports = {
  CustomError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  ConflictError
};