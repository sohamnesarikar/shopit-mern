import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [
        200,
        "Product name cannot be exceed more than 200 characters",
      ],
    },

    description: {
      type: String,
      required: [true, "Please enter product description"],
    },

    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },

    images: [
      {
        public_id: {
          type: String,
          required: false,
        },

        url: {
          type: String,
          required: false,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please select correct category",
      },
    },

    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },

    noOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        rating: {
          type: Number,
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", productSchema);
