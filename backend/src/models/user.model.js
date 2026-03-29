import crypto from "node:crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength: [50, "Your name cannot be exceed than 50 characters"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

//  Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJwtToken = function (id) {
  return jwt.sign({ id }, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_EXPIRE_TIME,
  });
};

// Generate password reset token
userSchema.methods.generateResetPasswordToken = function () {
  // Generate token
  const token = crypto.randomBytes(20).toString("hex");

  // hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // set token expire time
  this.resetPasswordExpire = Date.now() + 1000 * 60 * 30; // 30 minutes

  return token;
};

export const User = mongoose.model("User", userSchema);
