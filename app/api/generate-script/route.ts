import { generateScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT_EN = `
    Write a two different script for 40 Seconds video on Topic:{topic},

    Do not add Scene description
    Do not add anything in Braces, Just return the plain story in text

    Give me response in JSON format and follow the schema
    {
    scripts: [
    {
    content:""
    }
    ]
    }
`;

const SCRIPT_PROMPT_KO = `
    Write a two different script for 40 Seconds video on Topic:{topic},

    Do not add Scene description
    Do not add anything in Braces, Just return the plain story in text

    Give me response in JSON format and follow the schema
    translatedContent is the translated script in {language}
    {
    scripts: [
    {
    content:"",
    translatedContent:""
    },
    ]
    }
`;

export async function POST(req: Request) {
  const { topic, language } = await req.json();
  console.log("topic");
  console.log(topic);
  console.log("language");
  console.log(language);

  let PROMPT;

  if (language === "English") {
    PROMPT = SCRIPT_PROMPT_EN.replace("{topic}", topic);
  } else {
    PROMPT = SCRIPT_PROMPT_KO.replace("{topic}", topic).replace("{language}", language);
  }

  const result = await generateScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
