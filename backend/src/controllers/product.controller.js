import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// Get all products => /api/v1/products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
});

// Create new product => /api/v1/admin/products
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
});

// Get single product => /api/v1/products/:id
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    product,
  });
});

// delete product => /api/v1/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

// update product => /api/v1/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const body = req.body;
  const { id } = req?.params;

  const product = await Product.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    product,
  });
});
