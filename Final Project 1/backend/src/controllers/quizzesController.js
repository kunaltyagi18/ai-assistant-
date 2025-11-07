// src/controllers/quizzesController.js
import Quiz from "../models/Quiz.js";
import { geminiModel } from "../utils/geminiClient.js";

// ✅ Get all quizzes for logged-in user
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create a new quiz using Gemini AI
export const createQuiz = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ success: false, message: "Text is required to generate a quiz." });
    }

    const prompt = `Create a multiple-choice quiz based on the following study material.
Provide 5 questions with 4 options each, and mark the correct answer:

${text}`;

    const result = await geminiModel.generateContent(prompt);
    const quizContent = result?.response?.text?.() || "No quiz generated.";

    const quiz = await Quiz.create({
      userId: req.user._id,
      quizText: quizContent,
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, message: "Quiz generated successfully", quiz });
  } catch (error) {
    console.error("❌ Quiz Generation Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate quiz", error: error.message });
  }
};

// ✅ Update an existing quiz
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    if (quiz.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    Object.assign(quiz, req.body);
    await quiz.save();

    res.status(200).json({ success: true, message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    if (quiz.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await quiz.deleteOne();
    res.status(200).json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
