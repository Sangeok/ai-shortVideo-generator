import { NextResponse } from "next/server";
import { Runware } from "@runware/sdk-js";

const runware = new Runware({
  apiKey: process.env.NEXT_PUBLIC_RUNWARE as string,
});

export async function POST(req: Request) {
  try {
    const { imagePrompt } = await req.json();

    if (!imagePrompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const images = await runware.requestImages({
      // 생성할 이미지에 대한 설명
      positivePrompt: imagePrompt,

      // 사용할 모델 식별자
      model: "runware:100@1",

      // 생성할 이미지 크기
      width: 1024,
      height: 1024,

      // 생성할 이미지 개수
      numberResults: 1,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          imageUrl: images?.[0]?.imageURL,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("이미지 생성 오류:", error);
    return NextResponse.json({ error: "이미지 생성 실패" }, { status: 500 });
  }
}
