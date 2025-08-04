import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables from .env
dotenv.config();

// Define the JWT secret with fallback (only used if .env is missing)
const secret = process.env.JWT_SECRET || "devfallbacksecret";
const expiration = "500h";

// Create JWT token
export function signToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
