// import { generateImage } from "@/app/configs/AiModel";
// import { ImageOptions } from "@/lib/type";
// import { saveImage } from "@/lib/server-utils";
// import { ApiResponse } from "@/lib/type";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { imagePrompt } = await req.json();

//     console.log("imagePrompt");
//     console.log(imagePrompt);

//     if (!imagePrompt || imagePrompt.trim() === "") {
//       return NextResponse.json({ error: "이미지 프롬프트가 필요합니다." }, { status: 400 });
//     }

//     // Gemini 모델을 사용하여 이미지 생성
//     const result = await generateImage.sendMessage(imagePrompt);

//     const response = result.response;

//     let textResponse = null;
//     let imageData = null;
//     let mimeType = "image/png";

//     // 이미지 데이터 추출 (base64 형식)
//     if (
//       response &&
//       response.candidates &&
//       response.candidates.length > 0 &&
//       response.candidates[0].content &&
//       response.candidates[0].content.parts
//     ) {
//       const parts = response.candidates[0].content.parts;

//       for (const part of parts) {
//         if (part && "inlineData" in part && part.inlineData) {
//           // Get the image data
//           imageData = part.inlineData.data;
//           mimeType = part.inlineData.mimeType || "image/png";
//         } else if (part && "text" in part && part.text) {
//           // Store the text
//           textResponse = part.text;
//         }
//       }
//     }
//     if (!imageData) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "NO_IMAGE_GENERATED",
//             message: "No image was generated",
//           },
//         } as ApiResponse,
//         { status: 500 }
//       );
//     }

//     // Save the image and get metadata
//     const metadata = await saveImage(imageData, imagePrompt, mimeType);

//     console.log("metadata");
//     console.log(metadata);

//     // Return the image URL, description, and metadata as JSON
//     return NextResponse.json({
//       success: true,
//       data: {
//         imageUrl: metadata.url,
//         description: textResponse,
//         metadata,
//       },
//     } as ApiResponse);
//   } catch (error) {
//     console.error("Error generating image:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: {
//           code: "GENERATION_FAILED",
//           message: "Failed to generate image",
//           details: error instanceof Error ? error.message : String(error),
//         },
//       } as ApiResponse,
//       { status: 500 }
//     );
//   }
// }
import { imageGeneratorModel } from "@/app/configs/AiModel";
import { ImageOptions } from "@/lib/type";
import { saveImage } from "@/lib/server-utils";
import { ApiResponse } from "@/lib/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imagePrompt } = await req.json();

    console.log("imagePrompt");
    console.log(imagePrompt);

    // 프롬프트가 없는 경우 오류 반환
    if (!imagePrompt) {
      return NextResponse.json({ error: "이미지 프롬프트가 필요합니다." }, { status: 400 });
    }

    // 배열인지 확인
    const isArray = Array.isArray(imagePrompt);

    // 배열이 아니고 문자열이 비어있는 경우 오류 반환
    if (!isArray && imagePrompt.trim() === "") {
      return NextResponse.json({ error: "이미지 프롬프트가 필요합니다." }, { status: 400 });
    }

    // 프롬프트 배열 (단일 문자열인 경우 배열로 변환)
    const prompts = isArray ? imagePrompt : [imagePrompt];

    // 각 프롬프트에 대한 결과를 저장할 배열
    const results = [];

    // 각 프롬프트에 대해 이미지 생성 및 저장
    for (const prompt of prompts) {
      if (!prompt || prompt.trim() === "") {
        continue; // 빈 프롬프트는 건너뜀
      }

      // Gemini 모델을 사용하여 이미지 생성
      const result = await imageGeneratorModel.generateContent(prompt);
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
        // 이미지 생성에 실패한 경우에도 계속 진행하고 오류 정보 추가
        results.push({
          success: false,
          prompt,
          error: {
            code: "NO_IMAGE_GENERATED",
            message: "No image was generated for this prompt",
          },
        });
        continue;
      }

      // Save the image and get metadata
      const metadata = await saveImage(imageData, prompt, mimeType);

      console.log("metadata");
      console.log(metadata);

      // 결과 저장
      results.push({
        success: true,
        prompt,
        imageUrl: metadata.url,
        description: textResponse,
        metadata,
      });
    }

    // 결과가 없는 경우
    if (results.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NO_IMAGES_GENERATED",
            message: "No images were generated from the provided prompts",
          },
        } as ApiResponse,
        { status: 500 }
      );
    }

    // 단일 프롬프트인 경우 원래 형식으로 반환
    if (!isArray) {
      const result = results[0];
      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.error,
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          imageUrl: result.imageUrl,
          description: result.description,
          metadata: result.metadata,
        },
      } as ApiResponse);
    }

    // 배열인 경우 모든 결과 반환
    return NextResponse.json({
      success: true,
      data: {
        images: results,
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
