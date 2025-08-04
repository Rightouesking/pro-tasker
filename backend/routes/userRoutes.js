// Authentication routes (register/login)//
import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
const router = express.Router();
// POST /api/users/register - Create a new user
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
});
// POST /api/users/login - Authenticate a user and return a token
router.post("/login", async (req, res) => {
  try {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid password or email" });
  }
  const correctPw = await user.isCorrectPassword(req.body.password);
  if (!correctPw) {
    return res.status(401).json({ message: "Invalid password or email" });
  }
  const token = signToken(user);
  res.json({ token, user });
} catch (error) {
  res.status(500).json ({ message: "Server error during login attempt" });
}
});
export default router;

// import express from "express";
// import { registerUser, loginUser, getCurrentUser } from "../controllers/userController.js";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/me", protect, getCurrentUser);

// export default router;

// import express from 'express';
// import {
//   registerUser,
//   loginUser,
//   getCurrentUser,
// } from '../controllers/userController.js';
// import protect from '../middleware/authMiddleware.js';

// const router = express.Router();

// // @route   POST /api/users/register
// // @desc    Register a new user
// router.post('/register', registerUser);

// // @route   POST /api/users/login
// // @desc    Login a user
// router.post('/login', loginUser);

// // @route   GET /api/users/me
// // @desc    Get current user info (requires token)
// router.get('/me', protect, getCurrentUser);

// export default router;
