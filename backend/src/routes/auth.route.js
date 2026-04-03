import express from "express";
import {
  forgotPassword,
  getAllUsers,
  getUserDetails,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(authMiddleware, logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

router.route("/me").get(authMiddleware, getUserProfile);
router.route("/me/update").put(authMiddleware, updateUserProfile);
router.route("/password/update").put(authMiddleware, updatePassword);

router
  .route("/admin/users")
  .get(authMiddleware, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(authMiddleware, authorizeRoles("admin"), getUserDetails);

export default router;
