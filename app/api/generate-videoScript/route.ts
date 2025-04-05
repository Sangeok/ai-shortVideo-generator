import { generateImageScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `Generate image prompt of {style} style with all details for each scene for 30 seconds video script: {script}

- Just Give specificing image prompt depends on the story line
- do not give camera angle image prompt
- Follow the Following schema and return JSON data (Max 4-5 images)
- [
    {
        imagePrompt: "",
        sceneContent: "<Script Content>"
    }
]`;

export async function POST(req: Request) {
  const { style, script } = await req.json();

  console.log("videoStyle");
  console.log(style);

  console.log("videoScript");
  console.log(script);

  const PROMPT = SCRIPT_PROMPT.replace("{style}", style).replace("{script}", script);
  const result = await generateImageScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
