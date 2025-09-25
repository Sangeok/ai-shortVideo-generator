import { generateImageScript } from "@/src/shared/lib/AiModel";
import { NextResponse } from "next/server";

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
Do not create any images related to subscription requests

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
- Do not create any images related to subscription requests

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
- Do not create any images related to subscription requests

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

const PSYCHOLOGY_SCRIPT_PROMPT_KO = `Generate image prompt of {style} style with all details for each scene for 45 seconds video script: {script}

Instructions:

1. Analyze the script and identify 5-6 key scenes based on emotional transitions, plot developments, or significant moments.
2. For each scene, create a detailed image prompt that includes:
   - Environmental background (dark background required: pitch-black night settings, deep shadows, oppressive darkness, moonless skies, fog-covered environments, abandoned dark interiors, minimal light sources, silhouette-focused compositions, underground locations, etc.)
   - Detailed descriptions of main characters/objects (appearance, expressions, poses, partially obscured by shadows)
   - Color tone or atmosphere (dark tones, low saturation, high contrast, limited color palette with dominant blacks and deep blues/purples, chiaroscuro lighting, negative space, vignette effects, desaturated colors, etc.)
   - Characteristics of the {style} style (specific elements that make this style recognizable)

Important notes:
- Generate specific image prompts that accurately reflect the storyline and emotional tone
- All image backgrounds must be depicted as extremely dark (pitch-black night scenes, heavy shadows, dark foggy environments, near-complete darkness with minimal light sources, etc.)
- Emphasize dramatic lighting with single light sources against overwhelming darkness
- Use negative space and shadows to create psychological tension
- Consider noir-inspired lighting techniques with strong contrast between light and dark
- Focus on silhouettes and partially obscured elements to enhance mystery and darkness
- Limit the use of bright colors to only small, focal elements if necessary
- Even with bright elements, the overall background and atmosphere must maintain a deeply oppressive dark tone
- Do not create any images related to subscription requests
- Keep each image prompt between 30-100 words for optimal results
- Do not include camera angle directions or technical filming instructions
- If language is {language}, return translated script using {language} in translatedSceneContent
- If no language parameter is provided, default to English with empty translatedSceneContent
- Do not mention what language is being used in the response

Follow the Following schema and return JSON data (generate exactly 5-6 images):
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
        "imagePrompt": "Pitch-black midnight beach, abyss-like ocean merging with the night sky, heavy shadows engulfing the sand, barely visible palm trees as silhouettes against the darkness, a solitary figure holding a surfboard visible only by the faint moonlight cutting across their face, rendered in watercolor style with deep blacks and minimal highlights only on essential elements",
        "sceneContent": "The protagonist Minji is standing on the beach, holding a surfboard while looking at the ocean",
        "translatedSceneContent": "주인공 민지가 해변에서 서핑보드를 들고 바다를 바라보고 있다"
    }
]

If the script is too short or ambiguous for generating 4-5 meaningful scenes, create at least 3 distinct image prompts focusing on the most important elements available.`;

const WHATIF_SCRIPT_PROMPT_EN = `Generate detailed image prompts in {style} style for a 45-second video script: {script}
*Instructions:
- Analyze the script and identify 5-6 key scenes.
- For each scene, create a detailed image prompt that includes:
  - Environmental background (location, time, weather, etc.)
  - Detailed descriptions of main characters/objects
  - Color tone or atmosphere
  - Characteristics of the {style} style

Important notes:
- Do not include camera angle directions
- Focus on visual descriptions that are faithful to the storyline
- Do not create any images related to subscription requests
- Focus on visual descriptions that are faithful to the storyline

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
`;

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
  } else if (topic === "Dark Psychology") {
    PROMPT = PSYCHOLOGY_SCRIPT_PROMPT_KO.replace("{style}", style).replace(
      "{script}",
      script
    );
  } else if (topic === "History") {
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
  } else if (topic === "What If") {
    PROMPT = WHATIF_SCRIPT_PROMPT_EN.replace("{style}", style).replace(
      "{script}",
      script
    );
  }

  console.log("PROMPT");
  console.log(PROMPT);

  const result = await generateImageScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  console.log("response");
  console.log(response);

  return NextResponse.json(JSON.parse(response));
}
