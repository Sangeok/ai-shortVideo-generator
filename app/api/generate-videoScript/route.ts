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

const SCRIPT_PROMPT_EN = `Generate detailed image prompts in {style} style for a 45-second video script: {script}
Instructions:

Analyze the script and identify 5-6 key scenes.
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

const SCRIPT_PROMPT_KO = `Generate image prompt of {style} style with all details for each scene for 45 seconds video script: {script}

Instructions:
1. Analyze the script and identify 5-6 key scenes.
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
- Use only periods (.) and commas (,) in sentences. No other makrs allowed.

Follow the Following schema and return JSON data (Max 5-6 images):
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

const PHILOSOPHY_SCRIPT_PROMPT = `Generate detailed image prompts in {style} style for philosophical quotes: {quote}
Instructions:

1. First, analyze the quote and identify the philosopher who most likely said it. Look for:
   - Distinctive philosophical concepts or terminology
   - Writing style characteristic of specific philosophers
   - Historical context or references within the quote
   - If uncertain about the exact philosopher, determine the philosophical tradition or era

2. Based on your identification, create 4-5 detailed image prompts that include:
   - Detailed description of the identified philosopher (clothing, expression, posture, period features)
   - Environmental background (location, time, atmosphere, elements related to the philosopher's era or ideas)
   - Color tone and overall mood (appropriate to the quote's content)
   - Characteristic elements of the {style} style
   - Visual elements suggesting the philosopher is speaking (conversational posture, gestures, mouth shape)

Important notes:
- Do not include camera angle directions
- Focus on visual descriptions that are faithful to the quote's content and philosophical tradition
- Reflect the appropriate historical background and cultural context
- Ensure the core message of the quote is visually conveyed
- If the philosopher cannot be identified with certainty, create an archetypal philosopher figure that aligns with the quote's philosophical tradition (e.g., Ancient Greek, Enlightenment, Existentialist)
- All images must be in black and white
- The philosopher's physical appearance must be clearly depicted

Example output:
[
  {
    "identifiedPhilosopher": "Socrates",
    "reasonForIdentification": "The quote 'Know thyself' is famously attributed to Socrates and inscribed at the Temple of Apollo at Delphi, central to his philosophical method",
    "imagePrompt": "Between marble columns of the Athenian Academy, elderly Socrates with a long white beard, wearing a toga, raising his hand to emphasize a point while speaking to young disciples. Warm afternoon sunlight filters through columns, ancient Greek architecture visible in background. Rendered in sepia and gold tones in {style} style.",
    "quoteContent": "Scene of Socrates teaching his disciples the quote 'Know thyself'"
  }
]

Please return the results in the following JSON format:
[
  {
    "identifiedPhilosopher": "",
    "reasonForIdentification": "",
    "imagePrompt": "",
    "quoteContent": "",
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
  const { style, script, language, topic, topicDetail } = await req.json();

  console.log("topic");
  console.log(topic);

  console.log("topicDetail");
  console.log(topicDetail);

  console.log("videoStyle");
  console.log(style);

  console.log("videoScript");
  console.log(script);

  let PROMPT;

  if (topic === "Philosophy") {
    PROMPT = PHILOSOPHY_SCRIPT_PROMPT.replace("{style}", style)
      .replace("{script}", script)
      .replace("{quote}", topicDetail);
  } else if (topic === "History") {
    if (language === "English") {
      PROMPT = SCRIPT_PROMPT_EN.replace("{style}", style).replace("{script}", script);
    } else {
      PROMPT = SCRIPT_PROMPT_KO.replace("{style}", style).replace("{script}", script).replace("{language}", language);
    }
  }

  console.log("PROMPT");
  console.log(PROMPT);

  const result = await generateImageScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
