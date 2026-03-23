import { config } from "../config/config.js";
import ApiError from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
  };

  // Handle Invalid mongoose id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ApiError(404, message);
  }

  // Handle validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ApiError(400, message);
  }

  if (config.NODE_ENV === "DEVELOPEMENT") {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }

  if (config.NODE_ENV === "PRODUCTION") {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
