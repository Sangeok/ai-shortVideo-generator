import { generateScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const TRANSLATE_PROMPT = `
    Translate the following text into {language}:
    {text}

    Give me response in JSON format and follow the schema

    {
    scripts: [
    {
    content:"
    }
    ]
    }
`;

export async function POST(req: Request) {
  const { text, language } = await req.json();

  const PROMPT = TRANSLATE_PROMPT.replace("{text}", text).replace(
    "{language}",
    language
  );

  const result = await generateScript.sendMessage(PROMPT);

  const data = await result.json();

  console.log(data);

  return NextResponse.json(data);
}
