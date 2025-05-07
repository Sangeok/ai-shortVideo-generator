import { generateScript } from "@/app/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

const SCRIPT_PROMPT = `
You are a video content explanation specialist. Your role is to create clear and engaging explanations based on provided video topics and details.

Input Variables:
- {topic}: The main subject of the video (e.g., "History", "Philosophy", "Science")
- {topicDetail}: Additional details about the topic (e.g., "Trojan War", "Plato's quotes", "Quantum Physics")
- {language}: The language to write the explanation in (e.g., "English", "Korean", "Japanese")

Explanation Guidelines:
- Length: Write between 150-200 words
- Tone: Informative yet engaging style that draws viewers in
- Audience: General viewers interested in the topic but without expert knowledge
- Structure: Begin with a captivating introduction, present key insights, and conclude with the value viewers will gain
- Style: Use vivid language and thought-provoking questions when appropriate
- Explanation should be in {language}

Response Format:
Provide your response in JSON format. Follow this schema:
{
    "explanation": "Your video topic explanation goes here."
}

Example Responses:

For topic "History" and topicDetail "Trojan War":
{
    "explanation": "This video explores the legendary Trojan War, one of history's most famous conflicts that blends myth with potential historical reality. You'll discover the captivating story of the beautiful Helen, the mighty warrior Achilles, and the cunning Odysseus with his wooden horse strategy. Beyond the epic tales recounted by Homer, we examine archaeological evidence from Troy in modern-day Turkey and discuss how this ancient conflict continues to influence literature, art, and storytelling today. Whether the war happened exactly as described in classical texts remains debated, but its cultural impact is undeniable. By the end of this video, you'll understand how this ancient story continues to resonate with fundamental human themes of honor, love, and the devastating consequences of conflict."
}

For topic "Philosophy" and topicDetail "Plato's quotes":
{
    "explanation": "This video delves into the profound wisdom of Plato's most influential quotes. We explore his timeless observation that 'Justice is having and doing what is one's own.' Are you truly living according to your own purpose, or are you pursuing someone else's path? We examine how Plato's cave allegory reveals the difference between illusion and reality in our modern lives, and why his assertion that 'Knowledge becomes evil if the aim be not virtuous' challenges us to consider the ethical dimensions of our learning. These philosophical gems remain surprisingly relevant in today's world, offering guidance on everything from politics to personal development. By the end of this video, you'll discover how Plato's ancient wisdom can transform your perspective on life's most fundamental questions."
}
Key Improvements Made
Enhanced Example Responses: Created more engaging, topic-specific examples that better demonstrate the expected quality and style of explanations.
More Detailed Style Guidelines: Added suggestions to use vivid language and thought-provoking questions when appropriate.
Improved Structure Guidelines: Enhanced the guidance on how to structure the explanation with a captivating introduction, key insights, and value proposition.
Diverse Topic Examples: Provided examples across different domains (history and philosophy) to show versatility in explanation styles.
Engagement Elements: Incorporated elements that directly address the viewer (using "you'll discover," "you'll understand") to create a more engaging tone.
The revised prompt maintains all the effective elements from the previous version while significantly improving the example responses to better guide the generation of compelling video explanations.
`;

export async function POST(request: NextRequest) {
  const { topic, topicDetail, language } = await request.json();

  const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic)
    .replace("{topicDetail}", topicDetail)
    .replace("{language}", language);

  const result = await generateScript.sendMessage(PROMPT);

  const response = result?.response?.text();

  return NextResponse.json(JSON.parse(response));
}
