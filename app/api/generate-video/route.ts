import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(req: Request) {
  try {
    const { ttsFileUrl, imageUrl, captions } = await req.json();

    const result = await inngest.send({
      name: "generate-video",
      data: {
        ttsFileUrl,
        imageUrl,
        captions,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
