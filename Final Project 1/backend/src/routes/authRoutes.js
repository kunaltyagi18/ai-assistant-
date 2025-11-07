import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Register a new user
router.post("/signup", register);

// ✅ Login user
router.post("/login", login);

// ✅ Get logged-in user info (protected)
router.get("/me", protect, getMe);

export default router;
