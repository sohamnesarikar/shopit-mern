import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProduct);

// admin routes
router
  .route("/admin/products")
  .post(authMiddleware, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .delete(authMiddleware, authorizeRoles("admin"), deleteProduct)
  .put(authMiddleware, authorizeRoles("admin"), updateProduct);

export default router;
