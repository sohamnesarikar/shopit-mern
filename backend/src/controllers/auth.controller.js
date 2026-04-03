import crypto from "node:crypto";
import { config } from "../config/config.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { resetPasswordTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

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

// forgot password => /api/v1/password/forgot
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const token = user.generateResetPasswordToken();

  await user.save();

  const resetUrl = `${config.FRONTEND_URI}/forgot-password/${token}`;

  const htmlTemplate = resetPasswordTemplate(user?.name, resetUrl);

  const options = {
    email: user.email,
    subject: "NexCart Password Recovery",
    html: htmlTemplate,
  };

  try {
    await sendEmail(options);
    res
      .status(200)
      .json({ success: true, message: `Email send to: ${user?.name}` });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    throw new ApiError(500, err?.message);
  }
});

// reset password => /api/v1/password/reset
export const resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  const { newPassword, confirmPassword } = req.body;

  const hashedResetPasswordToken = crypto
    .createHash("SHA256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedResetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Password reset token is invalid or has been expired",
    );
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Password does not match");
  }

  user.password = newPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});

// Get current user profile  =>  /api/v1/me
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const currentUser = req.user?._id;
  const user = await User.findById(currentUser);

  res.status(200).json({ success: true, user });
});

// Update Password  =>  /api/v1/password/update
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, password } = req.body;
  const userId = req.user?._id;

  const user = await User.findById(userId).select("+password");

  // check current password is correct
  const isCorrectPassword = await user.comparePassword(currentPassword);

  if (!isCorrectPassword) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = password;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password update successfully" });
});

// Update User Profile  =>  /api/v1/me/update
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user?._id;

  const newData = { name, email };

  const user = await User.findByIdAndUpdate(userId, newData, {
    returnDocument: "after",
  });

  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully", user });
});

// Get all Users - ADMIN  =>  /api/v1/admin/users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

// Get User Details - ADMIN  =>  /api/v1/admin/users/:id
export const getUserDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, `User not found with id: ${id}`);
  }

  res.status(200).json({ success: true, user });
});
