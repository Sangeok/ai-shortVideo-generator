const { GoogleGenerativeAI } = require("@google/generative-ai");

import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const Openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const generateScript = model.startChat({
  generationConfig,
  history: [],
});

export const generateImageScript = model.startChat({
  generationConfig,
  history: [],
});
