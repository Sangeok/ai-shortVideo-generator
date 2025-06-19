const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const imageGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  responseModalities: ["Text", "Image"],
};

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

const imageGeneratorModel_ID = "gemini-2.0-flash-exp";

export const imageGeneratorModel = genAI.getGenerativeModel({
  model: imageGeneratorModel_ID,
  generationConfig: imageGenerationConfig,
});

export const Openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// const imageGeneratorModel = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash-exp",
// });

export const generateScript = model.startChat({
  generationConfig,
  history: [],
});

export const generateImageScript = model.startChat({
  generationConfig,
  history: [],
});

// export const generateImage = imageGeneratorModel.startChat({
//   generationConfig: imageGenerationConfig,
//   history: [],
// });
// run();
