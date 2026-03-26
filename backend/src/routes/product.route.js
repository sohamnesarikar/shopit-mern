import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/products").get(authMiddleware, getProducts);
router.route("/products/:id").get(getProduct);

// admin routes
router.route("/admin/products").post(createProduct);
router.route("/admin/products/:id").delete(deleteProduct).put(updateProduct);

export default router;
