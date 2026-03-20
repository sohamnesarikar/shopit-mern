import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDB = async () => {
  let MONGO_URI = "";

  if (config.NODE_ENV === "developement") {
    MONGO_URI = config.LOCAL_MONGO_URI;
  }

  if (config.NODE_ENV === "production") {
    MONGO_URI = config.MONGO_URI;
  }

  try {
    const dbConnection = await mongoose.connect(MONGO_URI);
    console.log(
      `Database connected successfully with host: ${dbConnection.connection.host}`,
    );
  } catch (err) {
    console.log(`Database connection failed ${err.message}`);
    process.exit(1);
  }
};
