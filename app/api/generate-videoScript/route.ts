import { generateImageScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT_EN = `Generate image prompt of {style} style with all details for each scene for 30 seconds video script: {script}

- Just Give specificing image prompt depends on the story line
- do not give camera angle image prompt
- Follow the Following schema and return JSON data (Max 4-5 images)
- [
    {
        imagePrompt: "",
        sceneContent: "<Script Content>"
    }
]`;

const SCRIPT_PROMPT_KO = `Generate image prompt of {style} style with all details for each scene for 30 seconds video script: {script}

- Just Give specificing image prompt depends on the story line
- do not give camera angle image prompt
- Follow the Following schema and return JSON data (Max 4-5 images)
- If language is {language}, return translated script using {language} in translatedSceneContent
- Do not give what is language in the response
- [
    {
        imagePrompt: "",  
        sceneContent: "<Script Content>",
        translatedSceneContent: "<Translated Script Content>"
    }
]`;

export async function POST(req: Request) {
  const { style, script, language } = await req.json();

  console.log("videoStyle");
  console.log(style);

  console.log("videoScript");
  console.log(script);

  let PROMPT;
  if (language === "English") {
    PROMPT = SCRIPT_PROMPT_EN.replace("{style}", style).replace(
      "{script}",
      script
    );
  } else {
    PROMPT = SCRIPT_PROMPT_KO.replace("{style}", style)
      .replace("{script}", script)
      .replace("{language}", language);
  }

  const result = await generateImageScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
