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

Write two different scripts for a 40 second video.
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
Conclude with the call to action: "마지막까지 봤다면 구독 부탁드립니다." (For Korean) or "If you watched until the end, hit the subscribe button" (For English)

# Script Length Requirements
For English scripts: 120-150 words
For Korean scripts: 80-120 words or 225-300 characters

# Punctuation Rules:
- ONLY use these punctuation marks: ".", ",", "!", "?", "..."
- DO NOT use any other punctuation or special characters including:
  * No asterisks (*)
  * No dashes (-)
  * No colons (:)
  * No semicolons (;)
  * No parentheses ()
  * No quotation marks ("")
  * No brackets []
  * No braces {}

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
- Conclude with the call to action: "If you watched until the end, hit the subscribe button"

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
- Conclude with the call to action: "마지막까지 봤다면 구독 부탁드립니다."

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
Create a YouTube Shorts script about the {dark psychology concept} you choose from the list below.
Write two different scripts.
The script should explain how this psychological effect influences human behavior in human relationships. Write in a conversational, engaging style that would capture viewer attention in the first few seconds.

IMPORTANT: The script must be precisely 40-45 seconds in length when read aloud. This is approximately 100-120 words for English or 500-700 characters for Korean. Please time yourself reading the script to ensure it fits exactly within the 40-45 second timeframe.

Format guidelines:
- Use only these punctuation marks: ".", ",", "!", "?", "..."
- Keep sentences short and impactful
- Avoid academic jargon - explain complex concepts in simple terms
- Don't use paragraph breaks
- Write with a quick-paced delivery in mind
- Explicitly mention the name of the selected psychological concept at least once in the script
- Naturally incorporate the selected psychological concept into the script without using any special formatting or symbols

# TEXT FORMATTING RULES:
- STRICTLY PROHIBITED: Do not use asterisks (*) anywhere in the script for emphasis or any other purpose
- Never use any special characters or symbols for emphasis
- Emphasis should be created through word choice and sentence structure only

# Punctuation Rules:
- ONLY use these punctuation marks: ".", ",", "!", "?", "..."
- DO NOT use any other punctuation or special characters including:
  * No asterisks (*)
  * No dashes (-)
  * No colons (:)
  * No semicolons (;)
  * No parentheses ()
  * No quotation marks ("")
  * No brackets []
  * No braces {}

# Text Emphasis Guidelines:
- Instead of using asterisks for emphasis, use strong word choices and sentence structure
- Focus on word selection to convey intensity rather than typographical emphasis
- Use question marks and exclamation points (sparingly) to create emphasis

Examples of CORRECT ways to emphasize without asterisks:
- Instead of "this is *very* important", write "this is extremely important"
- Instead of "people *always* do this", write "people invariably do this"
- Instead of "I *need* you to listen", write "I absolutely need you to listen"

Structure the script to follow this flow:
1. Start with an attention-grabbing claim or question about human behavior in relationships
2. Explain how people typically think about this aspect of psychology
3. Reveal the psychological effect by its name (e.g., "this is called Gaslighting") and explain how it actually works
4. Provide 1-2 relationship examples that demonstrate this effect
5. Explain why this happens (the underlying mechanism)
6. Suggest 1-2 ways to apply this psychological principle to your advantage (methods that can be used for persuasion, negotiation, or influence)
7. End with an insightful observation about why understanding this principle is important
8. Conclude with the call to action: "마지막까지 봤다면 구독 부탁드립니다." (For Korean) or "If you watched until the end, hit the subscribe button" (For English)

Important Instructions:
- Do not add scene descriptions
- Do not include braces or curly brackets {} anywhere in the script
- Do not include asterisks (*) anywhere in the script for emphasis or any other purpose
- Do not include the name of the concept in braces or with any special formatting
- You MUST mention the name of the psychological concept explicitly at least once in the script
- Do not include greetings or introductions
- Use ONLY these punctuation marks: ".", ",", "!", "?", "..."
- Do not use any other punctuation marks or special characters such as "{}", "*", "'", "-", ":", ";", "()", etc.
- Don't add headings such as 'Psychology Technique'
- Keep language clear, concise, and impactful
- Translate each script to {language} (for English, use "English"; for Korean, use "Korean")
- Do not include the language name in parentheses like "(Korean)" or "(English)" anywhere in the script or at the end of the script
- Do not add any language identifiers or markers to the translated content
- When you see {dark psychology concept} in this prompt, replace it with the actual concept you choose from the list when processing the prompt, but do not include any braces in your final script
- The methods you suggest should be practical and specific, clearly explaining how they can be applied in particular situations
- Always end the script with a subscription call-to-action ("마지막까지 봤다면 구독을 눌러달라" for Korean or "If you watched until the end, hit the subscribe button" for English)
- Include this call-to-action within the 40-45 second time limit

Examples of CORRECT ways to mention the concept:
- "This is what we know as Gaslighting. It is an influence tactic."
- "Gaslighting happens when someone makes you doubt your own reality."
- "This influence technique is called Gaslighting."
- "What you are experiencing is Gaslighting. It happens when..."

Examples of applying psychological principles:
- "To use Inception Persuasion when suggesting ideas in meetings, first mention that the other person probably had a similar thought. This makes them feel the suggestion is their own idea and they'll be more likely to accept it."
- "To leverage the Scarcity Effect when selling an important product, clearly mention limited quantities or limited time availability. This significantly increases people's desire to purchase."
- "During negotiations, utilize Confirmation Bias by first presenting information that aligns with the other person's existing beliefs. This makes them more open to your subsequent proposals."

The tone should be slightly provocative but insightful, similar to channels that share "psychology secrets" or "influence techniques" in short-form content.

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
`;

const SCRIPT_PROMPT_DarkPsychology_EN = `
Create a YouTube Shorts script about the {dark psychology concept} you choose from the list below.
Write two different scripts.
The script should explain how this psychological effect influences human behavior in human relationships. Write in a conversational, engaging style that would capture viewer attention in the first few seconds.

IMPORTANT: The script must be precisely 40-45 seconds in length when read aloud. This is approximately 100-120 words for English. Please time yourself reading the script to ensure it fits exactly within the 40-45 second timeframe.

Format guidelines:
- Use only these punctuation marks: ".", ",", "!", "?", "..."
- Keep sentences short and impactful
- Avoid academic jargon - explain complex concepts in simple terms
- Don't use paragraph breaks
- Write with a quick-paced delivery in mind
- Explicitly mention the name of the selected psychological concept at least once in the script
- Naturally incorporate the selected psychological concept into the script without using any special formatting or symbols

# TEXT FORMATTING RULES:
- STRICTLY PROHIBITED: Do not use asterisks (*) anywhere in the script for emphasis or any other purpose
- Never use any special characters or symbols for emphasis
- Emphasis should be created through word choice and sentence structure only

# Punctuation Rules:
- ONLY use these punctuation marks: ".", ",", "!", "?", "..."
- DO NOT use any other punctuation or special characters including:
  * No asterisks (*)
  * No dashes (-)
  * No colons (:)
  * No semicolons (;)
  * No parentheses ()
  * No quotation marks ("")
  * No brackets []
  * No braces {}

# Text Emphasis Guidelines:
- Instead of using asterisks for emphasis, use strong word choices and sentence structure
- Focus on word selection to convey intensity rather than typographical emphasis
- Use question marks and exclamation points (sparingly) to create emphasis

Examples of CORRECT ways to emphasize without asterisks:
- Instead of "this is *very* important", write "this is extremely important"
- Instead of "people *always* do this", write "people invariably do this"
- Instead of "I *need* you to listen", write "I absolutely need you to listen"

Structure the script to follow this flow:
1. Start with an attention-grabbing claim or question about human behavior in relationships
2. Explain how people typically think about this aspect of psychology
3. Reveal the psychological effect by its name (e.g., "this is called Gaslighting") and explain how it actually works
4. Provide 1-2 relationship examples that demonstrate this effect
5. Explain why this happens (the underlying mechanism)
6. Suggest 1-2 ways to apply this psychological principle to your advantage (methods that can be used for persuasion, negotiation, or influence)
7. End with an insightful observation about why understanding this principle is important
8. Conclude with the call to action: "If you watched until the end, hit the subscribe button".

Important Instructions:
- Do not add scene descriptions
- Do not include braces or curly brackets {} anywhere in the script
- Do not include asterisks (*) anywhere in the script for emphasis or any other purpose
- Do not include the name of the concept in braces or with any special formatting
- You MUST mention the name of the psychological concept explicitly at least once in the script
- Do not include greetings or introductions
- Use ONLY these punctuation marks: ".", ",", "!", "?", "..."
- Do not use any other punctuation marks or special characters such as "{}", "*", "'", "-", ":", ";", "()", etc.
- Don't add headings such as 'Psychology Technique'
- Keep language clear, concise, and impactful
- Do not include the language name in parentheses like "(Korean)" or "(English)" anywhere in the script or at the end of the script
- Do not add any language identifiers or markers to the translated content
- When you see {dark psychology concept} in this prompt, replace it with the actual concept you choose from the list when processing the prompt, but do not include any braces in your final script
- The methods you suggest should be practical and specific, clearly explaining how they can be applied in particular situations
- Always end the script with a subscription call-to-action ("If you watched until the end, hit the subscribe button" for English)
- Include this call-to-action within the 40-45 second time limit

Examples of CORRECT ways to mention the concept:
- "This is what we know as Gaslighting. It is an influence tactic."
- "Gaslighting happens when someone makes you doubt your own reality."
- "This influence technique is called Gaslighting."
- "What you are experiencing is Gaslighting. It happens when..."

Examples of applying psychological principles:
- "To use Inception Persuasion when suggesting ideas in meetings, first mention that the other person probably had a similar thought. This makes them feel the suggestion is their own idea and they'll be more likely to accept it."
- "To leverage the Scarcity Effect when selling an important product, clearly mention limited quantities or limited time availability. This significantly increases people's desire to purchase."
- "During negotiations, utilize Confirmation Bias by first presenting information that aligns with the other person's existing beliefs. This makes them more open to your subsequent proposals."

The tone should be slightly provocative but insightful, similar to channels that share "psychology secrets" or "influence techniques" in short-form content.

Please time yourself reading the final script aloud to verify it can be delivered within exactly 40-45 seconds before submitting.

# Response Format (JSON):
{
  "scripts": [
    {
      "content": "First script content here",
    },
    {
      "content": "Second script content here",
    }
  ]
}
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
      PROMPT = SCRIPT_PROMPT_DarkPsychology_EN.replace("{dark psychology concept}", topicDetail).replace(
        "{language}",
        language
      );
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
