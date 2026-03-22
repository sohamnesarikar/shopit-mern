class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    // Create stack property
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
