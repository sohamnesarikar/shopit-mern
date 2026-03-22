import { app } from "./app.js";
import { config } from "./config/config.js";
import { connectToDB } from "./config/database.js";

// Handle Uncaught exceptions => sync error handling
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);
});

const PORT = config.PORT || 3000;

let server;

connectToDB()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(
        `Server is listening on port ${PORT} in ${config.NODE_ENV} mode`,
      );
    });
  })
  .catch((error) => {
    console.log(`Something went wrong in database connection ${error.message}`);
  });

// Handle Unhandled Promise rejections => async error handling
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  if (server) {
    console.log(`Shutting down server due to unhandled promise rejection`);
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
