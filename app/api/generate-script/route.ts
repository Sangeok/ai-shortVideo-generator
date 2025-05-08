import { generateScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT_Philosophy_EN = `
You are an expert in creating engaging YouTube Shorts scripts focused on philosophy. Your task is to craft compelling, motivational scripts that reinterpret famous philosophical quotes for modern audiences.
Write two different scripts for a 35-second video.
Topic: {philosophical quote}
Guidelines:
- Do not add scene descriptions
- Do not add anything in braces
- Do not include greetings or introductions
- Don't add 'Philosophical Quote' as a heading.
- you add the philosopher name in the script
- Each script should reinterpret the philosophical quote for contemporary viewers
- Connect the philosophical concept to current challenges or aspirations
- Craft a motivational message that inspires viewers to reflect and take action
- Script length should fit within 45 seconds (approximately 120-150 words)
- Keep language clear, concise, and impactful

Response format (JSON):
{
  "scripts": [
    {
      "content": "First script content here"
    },
    {
      "content": "Second script content here"
    }
  ]
}
`;

const SCRIPT_PROMPT_Philosophy_KO = `
You are an expert at creating engaging YouTube Shorts scripts based on philosophical quotes. When given a philosophical quote, you will create motivational content that reinterprets the wisdom for modern audiences.

Write two different scripts for a 35 second video.
Topic: {philosophical quote}
Guidelines:
- Do not add scene descriptions
- Do not add anything in braces
- Do not include greetings or introductions
- Do not add marks that is "*".
- Don't add 'Philosophical Quote' as a heading.
- you add the philosopher name in the script
- Each script should reinterpret the philosophical quote for contemporary viewers
- Connect the philosophical concept to current challenges or aspirations
- Craft a motivational message that inspires viewers to reflect and take action
- Script length should fit within 45 seconds (approximately 120-150 words)
- Keep language clear, concise, and impactful
- Translate each script to {language}

Response format (JSON):
{
  "scripts": [
    {
      "content": "First script content here",
      "translatedContent": "First script translated to {language}"
    },
    {
      "content": "Second script content here",
      "translatedContent": "Second script translated to {language}"
    }
  ]
}
`;

const SCRIPT_PROMPT_EN = `
Write two different scripts for a 50 second video.

Topic: {topic}

Guidelines:
- Do not add scene descriptions
- Do not add anything in braces
- Do not include greetings or introductions
- Do not add "Narrator:" or similar speaker indicators
- Return plain text stories
- Each script should be 50 seconds in length (approximately 100-125 words)

Response format (JSON):
{
  "scripts": [
    {
      "content": "First script content here"
    },
    {
      "content": "Second script content here"
    }
  ]
}
`;

const SCRIPT_PROMPT_KO = `
Write two different scripts for a 50 second video.

Topic: {topic}

Guidelines:
- Do not add scene descriptions
- Do not add anything in braces
- Do not add Narrator
- Do not include greetings or introductions
- Return plain text stories
- Each script should be 50 seconds in length (approximately 100-125 words)
- Translate each script to {language}

Response format (JSON):
{
  "scripts": [
    {
      "content": "First script content here",
      "translatedContent": "First script translated to {language}"
    },
    {
      "content": "Second script content here",
      "translatedContent": "Second script translated to {language}"
    }
  ]
}
`;

const SCRIPT_PROMPT_DarkPsychology_KO = `
You are a dual expert in psychological insights and YouTube Shorts scriptwriting. Your mission is to create captivating educational content that reveals psychological principles and human behavior patterns based on the dark psychology topic I provide.

Write two different scripts for 45 second videos about the following topic: {dark psychology concept}

# Script Structure Requirements
- Begin with a powerful hook that immediately grabs viewer attention (5-7 seconds)
- Explain the core psychological principle in simple, accessible language (20-30 seconds)
- End with a practical application or thought-provoking conclusion (5-7 seconds)
- Total length: 80-120 words per script (fits 45 second video)

# Content Guidelines
- Focus on providing practical knowledge for self-awareness, communication improvement, or understanding human interactions
- Translate complex psychological concepts into everyday language
- Include interesting or incentive examples
- Incorporate emotionally evocative scenarios that highlight psychological vulnerabilities
- Present controversial perspectives that challenge conventional thinking
- Include tension-building elements like real-life consequences of these psychological techniques
- Use strategic "shock value" information that remains educational while capturing immediate attention

# Style Guidelines
- Use clear, concise sentences with direct, conversational tone
- Address viewers directly to create engagement
- Employ short sentences and accessible vocabulary
- Include thought-provoking questions or challenges to increase viewer engagement
- Use visually descriptive language that creates mental images
- Maintain a balance between educational content and engaging delivery
- Do not add marks like "*", ":"

# Response Format (JSON):
{
  "scripts": [
    {
      "content": "First script content here",
      "translatedContent": "First script translated to {language}"
    },
    {
      "content": "Second script content here",
      "translatedContent": "Second script translated to {language}"
    }
  ]
}

Important Instructions:
- Do not add scene descriptions
- Do not add anything in braces
- Do not include greetings or introductions
- Do not add marks like "*"
- Don't add headings such as 'Dark Psychology Technique'
- Keep language clear, concise, and impactful
- Translate each script to {language}
`;

export async function POST(req: Request) {
  const { topic, language, topicDetail } = await req.json();
  console.log("topic");
  console.log(topic);

  console.log("topicDetail");
  console.log(topicDetail);

  let PROMPT;

  if (topic === "Philosophy") {
    if (language === "English") {
      PROMPT = SCRIPT_PROMPT_Philosophy_EN.replace(
        "{philosophical quote}",
        topicDetail
      );
    } else {
      PROMPT = SCRIPT_PROMPT_Philosophy_KO.replace(
        "{philosophical quote}",
        topicDetail
      ).replace("{language}", language);
    }
  } else if (topic === "Dark Psychology") {
    if (language === "English") {
      // PROMPT = SCRIPT_PROMPT_DarkPsychology_EN.replace("{dark psychology concept}", topicDetail);
    } else {
      PROMPT = SCRIPT_PROMPT_DarkPsychology_KO.replace(
        "{dark psychology concept}",
        topicDetail
      ).replace("{language}", language);
    }
  } else if (topic === "History") {
    if (language === "English") {
      PROMPT = SCRIPT_PROMPT_EN.replace("{topic}", topicDetail);
    } else {
      PROMPT = SCRIPT_PROMPT_KO.replace("{topic}", topicDetail).replace(
        "{language}",
        language
      );
    }
  }

  // if (language === "English") {
  //   PROMPT = SCRIPT_PROMPT_EN.replace("{topic}", topic);
  // } else {
  //   PROMPT = SCRIPT_PROMPT_KO.replace("{topic}", topic)
  //     .replace("{language}", language)
  // }

  const result = await generateScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  console.log("response");
  console.log(response);

  return NextResponse.json(JSON.parse(response));
}
