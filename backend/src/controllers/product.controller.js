import { Product } from "../models/product.model.js";

// Get all products => /api/v1/products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
};

// Create new product => /api/v1/admin/products
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
};

// Get single product => /api/v1/products/:id
export const getProduct = async (req, res) => {
  const { id } = req?.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    product,
  });
};

// delete product => /api/v1/products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req?.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product deleted successfully",
  });
};

// update product => /api/v1/products/:id
export const updateProduct = async (req, res) => {
  const body = req.body;
  const { id } = req?.params;

  const product = await Product.findByIdAndUpdate(id, body, { new: true });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product deleted successfully",
  });
};
