import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
      },
    ],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
