import express from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizzesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all quizzes for logged-in user
router.get("/", protect, getAllQuizzes);

// ✅ Get a single quiz by ID
router.get("/:id", protect, getQuizById);

// ✅ Create a new quiz
router.post("/", protect, createQuiz);

// ✅ Update an existing quiz
router.put("/:id", protect, updateQuiz);

// ✅ Delete a quiz
router.delete("/:id", protect, deleteQuiz);

export default router;
