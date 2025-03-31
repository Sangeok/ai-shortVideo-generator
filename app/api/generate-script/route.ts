import { generateScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `
    Write a two different script for 45 Seconds video on Topic:{topic},

    Do not add Scene description
    Do not add anything in Braces, Just return the plain story in text

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
  const { topic } = await req.json();
  console.log("topic");
  console.log(topic);

  const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);
  const result = await generateScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
