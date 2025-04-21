import { generateImageScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

// const SCRIPT_PROMPT_EN = `Generate image prompt of {style} style with all details for each scene for 30 seconds video script: {script}

// - Just Give specificing image prompt depends on the story line
// - do not give camera angle image prompt
// - Follow the Following schema and return JSON data (Max 4-5 images)
// - [
//     {
//         imagePrompt: "",
//         sceneContent: "<Script Content>"
//     }
// ]`;

const SCRIPT_PROMPT_EN = `Generate detailed image prompts in {style} style for a 40-second video script: {script}
Instructions:

Analyze the script and identify 4-5 key scenes.
For each scene, create a detailed image prompt that includes:

Environmental background (location, time, weather, etc.)
Detailed descriptions of main characters/objects
Color tone or atmosphere
Characteristics of the {style} style



Important notes:

Do not include camera angle directions
Focus on visual descriptions that are faithful to the storyline

Example output:
[
{
"imagePrompt": "Bright sunlight shining on a beach, blue ocean, fine sand, palm trees, a young woman with a happy expression preparing for surfing, rendered in {style} style",
"sceneContent": "The protagonist Minji is standing on the beach, holding a surfboard while looking at the ocean"
}
]
Please return the results in the following JSON format:
[
{
"imagePrompt": "",
"sceneContent": ""
}
]`;

const SCRIPT_PROMPT_KO = `Generate image prompt of {style} style with all details for each scene for 40 seconds video script: {script}

Instructions:
1. Analyze the script and identify 4-5 key scenes.
2. For each scene, create a detailed image prompt that includes:
   - Environmental background (location, time, weather, etc.)
   - Detailed descriptions of main characters/objects
   - Color tone or atmosphere
   - Characteristics of the {style} style

Important notes:
- Just give specific image prompt depends on the story line
- Do not include camera angle directions
- If language is {language}, return translated script using {language} in translatedSceneContent
- Do not mention what language is being used in the response

Follow the Following schema and return JSON data (Max 4-5 images):
[
    {
        "imagePrompt": "",
        "sceneContent": "<Script Content>",
        "translatedSceneContent": "<Translated Script Content>"
    }
]

Example output:
[
    {
        "imagePrompt": "Bright sunlight shining on a beach, blue ocean, fine sand, palm trees, a young woman with a happy expression preparing for surfing, rendered in watercolor style",
        "sceneContent": "The protagonist Minji is standing on the beach, holding a surfboard while looking at the ocean",
        "translatedSceneContent": "주인공 민지가 해변에서 서핑보드를 들고 바다를 바라보고 있다"
    }
]`;

// const SCRIPT_PROMPT_KO = `Generate image prompt of {style} style with all details for each scene for 30 seconds video script: {script}

// Instructions:
// 1. Analyze the script and identify 4-5 key scenes.
// 2. For each scene, create a detailed image prompt that includes:
//    - Environmental background (location, time, weather, etc.)
//    - Detailed descriptions of main characters/objects
//    - Color tone or atmosphere
//    - Characteristics of the {style} style

// Important notes:
// - Just give specific image prompt depends on the story line
// - Do not include camera angle directions
// - If language is {language}, return translated script using {language} in translatedSceneContent
// - Do not mention what language is being used in the response

// Follow the Following schema and return JSON data (Max 4-5 images):
// [
//     {
//         "imagePrompt": "",
//         "sceneContent": "<Script Content>",
//         "translatedSceneContent": "<Translated Script Content>"
//     }
// ]

// Example output:
// [
//     {
//         "imagePrompt": "Bright sunlight shining on a beach, blue ocean, fine sand, palm trees, a young woman with a happy expression preparing for surfing, rendered in watercolor style",
//         "sceneContent": "The protagonist Minji is standing on the beach, holding a surfboard while looking at the ocean",
//         "translatedSceneContent": "주인공 민지가 해변에서 서핑보드를 들고 바다를 바라보고 있다"
//     }
// ]`;

export async function POST(req: Request) {
  const { style, script, language } = await req.json();

  console.log("videoStyle");
  console.log(style);

  console.log("videoScript");
  console.log(script);

  let PROMPT;
  if (language === "English") {
    PROMPT = SCRIPT_PROMPT_EN.replace("{style}", style).replace("{script}", script);
  } else {
    PROMPT = SCRIPT_PROMPT_KO.replace("{style}", style).replace("{script}", script).replace("{language}", language);
  }

  const result = await generateImageScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
