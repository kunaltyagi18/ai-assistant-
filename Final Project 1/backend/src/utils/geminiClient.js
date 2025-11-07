// src/utils/geminiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// ✅ Named export
export const geminiModel = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
