import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key is required");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.use(express.json());
app.use(cors());

app.post("/api/generate", async (req, res) => {
  try {
    if (!req.is("application/json")) {
      return res.status(400).json({ error: "Invalid content type" });
    }

    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input message is required" });
    }

    if (typeof input !== "string" || input.trim() === "") {
      return res.status(400).json({ error: "Input must be a non-empty string" });
    }

    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(input);

    return res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
