import express from "express";
import {
  forgotPassword,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(authMiddleware, logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

router.route("/me").get(authMiddleware, getUserProfile);
router.route("/me/update").put(authMiddleware, updateUserProfile);
router.route("/password/update").put(authMiddleware, updatePassword);

export default router;
