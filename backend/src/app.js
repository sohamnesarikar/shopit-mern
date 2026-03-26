import express from "express";
import cookieParser from "cookie-parser";
import qs from "qs";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.set("query parser", (str) => qs.parse(str));

// routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

// error middleware
app.use(errorMiddleware);
