import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

export async function POST(request: NextRequest) {
  try {
    // FormData 형식 요청 처리
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const language = formData.get("language") as string;

    const languageCode = language === "English" ? "en" : "ko";

    if (!audioFile) {
      return NextResponse.json(
        { error: "오디오 파일이 없습니다" },
        { status: 400 }
      );
    }

    // Deepgram 클라이언트 생성
    const deepgramClient = createClient(
      process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || ""
    );

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Deepgram으로 오디오 파일 직접 전송
    const { result, error } =
      await deepgramClient.listen.prerecorded.transcribeFile(buffer, {
        model: "2-general",
        language: languageCode,
        tier: "nova",
        smart_format: true,
      });

    if (error) throw error;

    // 결과 반환
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Error processing transcription" },
      { status: 500 }
    );
  }
}
