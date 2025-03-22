import { generateImage } from "@/app/configs/AiModel";
import { ImageOptions } from "@/lib/type";
import { saveImage } from "@/lib/server-utils";
import { ApiResponse } from "@/lib/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imagePrompt } = await req.json();

    console.log("imagePrompt");
    console.log(imagePrompt);

    if (!imagePrompt || imagePrompt.trim() === "") {
      return NextResponse.json({ error: "이미지 프롬프트가 필요합니다." }, { status: 400 });
    }

    // Gemini 모델을 사용하여 이미지 생성
    const result = await generateImage.sendMessage(imagePrompt);

    const response = result.response;

    let textResponse = null;
    let imageData = null;
    let mimeType = "image/png";

    // 이미지 데이터 추출 (base64 형식)
    if (
      response &&
      response.candidates &&
      response.candidates.length > 0 &&
      response.candidates[0].content &&
      response.candidates[0].content.parts
    ) {
      const parts = response.candidates[0].content.parts;

      for (const part of parts) {
        if (part && "inlineData" in part && part.inlineData) {
          // Get the image data
          imageData = part.inlineData.data;
          mimeType = part.inlineData.mimeType || "image/png";
        } else if (part && "text" in part && part.text) {
          // Store the text
          textResponse = part.text;
        }
      }
    }
    if (!imageData) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NO_IMAGE_GENERATED",
            message: "No image was generated",
          },
        } as ApiResponse,
        { status: 500 }
      );
    }

    // Save the image and get metadata
    const metadata = await saveImage(imageData, imagePrompt, mimeType);

    console.log("metadata");
    console.log(metadata);

    // Return the image URL, description, and metadata as JSON
    return NextResponse.json({
      success: true,
      data: {
        imageUrl: metadata.url,
        description: textResponse,
        metadata,
      },
    } as ApiResponse);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "GENERATION_FAILED",
          message: "Failed to generate image",
          details: error instanceof Error ? error.message : String(error),
        },
      } as ApiResponse,
      { status: 500 }
    );
  }
}
