const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const imageGeneratorModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp-image-generation",
});

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

export const generateScript = model.startChat({
  generationConfig,
  history: [],
});

export const generateImageScript = model.startChat({
  generationConfig,
  history: [],
});

export const generateImage = imageGeneratorModel.startChat({
  generationConfig: imageGenerationConfig,
  history: [],
});
// run();
