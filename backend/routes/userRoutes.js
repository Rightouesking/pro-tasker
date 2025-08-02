import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Login a user
router.post('/login', loginUser);

// @route   GET /api/users/me
// @desc    Get current user info (requires token)
router.get('/me', protect, getCurrentUser);

export default router;
