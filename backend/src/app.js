import express from "express";
import productRoutes from "./routes/product.route.js";

export const app = express();

app.use("/api/v1", productRoutes);
