import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(authMiddleware, logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").post(resetPassword);

export default router;
