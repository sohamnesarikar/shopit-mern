import { app } from "./app.js";
import { config } from "./config/config.js";
import { connectToDB } from "./config/database.js";

const PORT = config.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is listening on port ${PORT} in ${config.NODE_ENV} mode`,
      );
    });
  })
  .catch((error) => {
    console.log(`Something went wrong in database connection ${error.message}`);
  });
