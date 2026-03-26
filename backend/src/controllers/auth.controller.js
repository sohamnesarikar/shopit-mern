import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// register user => /api/v1/register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    user,
  });
});

// login user => /api/v1/login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please enter email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email and password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email and password");
  }

  const token = user.getJwtToken(user._id);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days
  });

  res.status(200).json({
    success: true,
    token,
  });
});

// logut user => /api/v1/logout
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("accessToken", null, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
