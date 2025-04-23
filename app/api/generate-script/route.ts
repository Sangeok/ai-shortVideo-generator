import { generateScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

// const SCRIPT_PROMPT_EN = `
//     Write a two different script for 45 Seconds video on Topic:{topic},
//     Speaker persona: {speakerPersona}

//     Do not add Scene description
//     Do not add anything in Braces, Just return the plain story in text

//     Give me response in JSON format and follow the schema
//     {
//     scripts: [
//     {
//     content:""
//     }
//     ]
//     }
// `;

// const SCRIPT_PROMPT_KO = `
//     Write a two different script for 45 Seconds video on Topic:{topic},
//     Speaker persona: {speakerPersona}

//     Do not add Scene description
//     Do not add anything in Braces, Just return the plain story in text

//     Give me response in JSON format and follow the schema
//     translatedContent is the translated script in {language}
//     {
//     scripts: [
//     {
//     content:"",
//     translatedContent:""
//     },
//     ]
//     }
// `;
const SCRIPT_PROMPT_EN = `
Write two different scripts for a 45-second video.

Topic: {topic}
Speaker persona: {speakerPersona}

Guidelines:
- Do not add scene descriptions
- Do not add anything in braces
- Do not include greetings or introductions
- Return plain text stories

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
Write two different scripts for a 45-second video.

Topic: {topic}
Speaker persona: {speakerPersona}

Guidelines:
- Do not add scene descriptions
- Do not add anything in braces
- Do not include greetings or introductions
- Return plain text stories
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

export async function POST(req: Request) {
  const { topic, language, speakerPersona } = await req.json();
  console.log("topic");
  console.log(topic);
  console.log("language");
  console.log(language);
  console.log("speakerPersona");
  console.log(speakerPersona);

  let PROMPT;

  if (language === "English") {
    PROMPT = SCRIPT_PROMPT_EN.replace("{topic}", topic).replace(
      "{speakerPersona}",
      speakerPersona
    );
  } else {
    PROMPT = SCRIPT_PROMPT_KO.replace("{topic}", topic)
      .replace("{language}", language)
      .replace("{speakerPersona}", speakerPersona);
  }

  const result = await generateScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
