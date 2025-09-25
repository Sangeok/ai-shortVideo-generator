import { generateScript } from "@/src/shared/lib/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `
    Translate the following text to {targetLanguage}:
    {text}

    Give me response in JSON format and follow the schema
    {
        translatedText: ""
    }
`;

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();

  const PROMPT = SCRIPT_PROMPT.replace("{text}", text).replace(
    "{targetLanguage}",
    targetLanguage
  );

  const result = await generateScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
