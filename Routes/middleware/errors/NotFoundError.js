export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    // attach ISO timestamp when the error is created
    this.timestamp = new Date().toISOString();
    if (Error.captureStackTrace) Error.captureStackTrace(this, NotFoundError);
  }

  // optional: ensure error serializes with timestamp
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}
