export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    // attach ISO timestamp when the error is created
    this.timestamp = new Date().toISOString();
    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}
