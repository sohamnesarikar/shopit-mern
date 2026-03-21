import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(createProduct);
router
  .route("/products/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
