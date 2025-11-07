// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import connectDB from "./config/db.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Ensure uploads folder exists
const uploadsPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,
  })
);

// ✅ Optional: development logger
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`📌 ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ✅ Serve static uploaded files
app.use("/uploads", express.static(uploadsPath));

// ✅ Import Routes
import geminiRoutes from "./routes/geminiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import quizzesRoutes from "./routes/quizzesRoutes.js";

// ✅ Mount Routes
app.use("/api/gemini", geminiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/quizzes", quizzesRoutes);

// ✅ Catch-all 404 route
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
