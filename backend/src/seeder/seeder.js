import mongoose from "mongoose";
import { config } from "../config/config.js";
import { Product } from "../models/product.model.js";
import products from "./data.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(config.LOCAL_MONGO_URI);

    await Product.deleteMany();
    console.log("Products deleted successfully");

    await Product.insertMany(products);
    console.log("Products added successfully");

    process.exit(1);
  } catch (error) {
    console.log(`Something went wrong in seeder.js ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
