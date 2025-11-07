// src/controllers/geminiController.js
import { geminiModel } from "../utils/geminiClient.js"; // use your geminiClient.js

export const getGeminiResponse = async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ success: false, message: "Prompt is required" });
  }

  try {
    // Call Gemini AI
    const result = await geminiModel.generateContent(prompt);
    
    // Extract text
    const answer = result.response?.text() || "";

    console.log("Prompt:", prompt);
    console.log("Answer:", answer);

    res.status(200).json({ success: true, answer });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: "Failed to get response from Gemini API", error: error.message });
  }
};
