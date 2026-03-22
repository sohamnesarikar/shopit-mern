import { config } from "../config/config.js";

export const errorMiddleware = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
  };

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
