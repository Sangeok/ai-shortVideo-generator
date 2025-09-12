import { saveImage } from "@/src/shared/lib/server-utils";
import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_TOKEN);

export async function POST(req: Request) {
  try {
    const { imagePrompt } = await req.json();

    if (!imagePrompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // FLUX.1-schnell 모델 사용
    const response = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: imagePrompt,
      parameters: {
        guidance_scale: 7.5,
        num_inference_steps: 5,
        width: 1024,
        height: 1024,
      },
    });

    // 파일 저장 방식으로 변경
    const arrayBuffer = await (response as unknown as Blob).arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // 이미지를 파일 시스템에 저장
    const metadata = await saveImage(base64, imagePrompt, "image/jpeg");

    // 공개 URL 반환
    const imageUrl = `${metadata.url}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          imageUrl: imageUrl,
          metadata: metadata,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("이미지 생성 오류:", error);
    return NextResponse.json({ error: "이미지 생성 실패" }, { status: 500 });
  }
}
