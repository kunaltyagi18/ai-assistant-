import express from "express";
import { getGeminiResponse } from "../controllers/geminiController.js";
import { protect } from "../middleware/authMiddleware.js"; // optional

const router = express.Router();

// ✅ Ask a question to Gemini AI
// Optional: protect route so only logged-in users can query
router.post("/ask", protect, getGeminiResponse);

export default router;
