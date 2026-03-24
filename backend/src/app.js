import express from "express";
import qs from "qs";
import productRoutes from "./routes/product.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());

app.set("query parser", (str) => qs.parse(str));

// routes
app.use("/api/v1", productRoutes);

// error middleware
app.use(errorMiddleware);
