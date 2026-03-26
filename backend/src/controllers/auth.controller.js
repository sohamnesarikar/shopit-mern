import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    user,
  });
});
