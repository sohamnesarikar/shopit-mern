import dotenv from "dotenv";

dotenv.config();

const _config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  LOCAL_MONGO_URI: process.env.LOCAL_MONGO_URI,
  MONGO_URI: process.env.MONGO_URI,
};

export const config = Object.freeze(_config);
