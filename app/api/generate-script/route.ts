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
Create a YouTube Shorts script about the {dark psychology concept}. 
Write two different scripts. 
The script should explain how this psychological effect influences human behavior in human relationships. Write in a conversational, engaging style that would capture viewer attention in the first few seconds.

IMPORTANT: The script must be precisely 40-45 seconds in length when read aloud. This is approximately 100-120 words for English or 500-700 characters for Korean. Please time yourself reading the script to ensure it fits exactly within the 40-45 second timeframe.

Format guidelines:
- Use minimal punctuation (similar to spoken language)
- Keep sentences short and impactful
- Avoid academic jargon - explain complex concepts in simple terms
- Don't use paragraph breaks
- Write with a quick-paced delivery in mind

Structure the script to follow this flow:
1. Start with an attention-grabbing claim or question about human behavior
2. Explain how people typically think about this aspect of psychology
3. Reveal the psychological effect and how it actually works
4. Provide 1-2 relationship examples that demonstrate this effect
5. Explain why this happens (the underlying mechanism)
6. End with an insightful observation that makes people reflect on their own behavior

Examples of psychological effects you can choose from:
- Approval Addiction (seeking validation from others)
- Inception Persuasion (planting ideas so others think they're their own)
- Social Proof (following what others do)
- Cognitive Dissonance (mental discomfort from contradictory beliefs)
- Dunning-Kruger Effect (overestimating abilities when knowledge is limited)
- Confirmation Bias (seeking information that confirms existing beliefs)
- Scarcity Effect (valuing things more when they're limited)
- Hedonic Adaptation (getting used to positive or negative changes)
- Spotlight Effect (overestimating how much others notice about us)
- Sunk Cost Fallacy (continuing something due to previous investment)

The tone should be slightly provocative but insightful, similar to channels that share "psychology secrets" or "mind hacks" in short-form content.

Please time yourself reading the final script aloud to verify it can be delivered within exactly 40-45 seconds before submitting.

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
- Use marks only ".", "!", "?", ",", "...".
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

  console.log("language");
  console.log(language);

  let PROMPT;

  if (topic === "Philosophy") {
    if (language === "English") {
      PROMPT = SCRIPT_PROMPT_Philosophy_EN.replace("{philosophical quote}", topicDetail);
    } else {
      PROMPT = SCRIPT_PROMPT_Philosophy_KO.replace("{philosophical quote}", topicDetail).replace(
        "{language}",
        language
      );
    }
  } else if (topic === "Dark Psychology") {
    if (language === "English") {
      // PROMPT = SCRIPT_PROMPT_DarkPsychology_EN.replace("{dark psychology concept}", topicDetail);
    } else {
      PROMPT = SCRIPT_PROMPT_DarkPsychology_KO.replace("{dark psychology concept}", topicDetail).replace(
        "{language}",
        language
      );
    }
  } else if (topic === "History") {
    if (language === "English") {
      PROMPT = SCRIPT_PROMPT_EN.replace("{topic}", topicDetail);
    } else {
      PROMPT = SCRIPT_PROMPT_KO.replace("{topic}", topicDetail).replace("{language}", language);
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
