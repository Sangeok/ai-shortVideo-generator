import { Openai } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text, voice } = await request.json();

    console.log("text");
    console.log(text);

    console.log("voice");
    console.log(voice);

    if (!text) {
      return NextResponse.json(
        { error: "텍스트가 필요합니다" },
        { status: 400 }
      );
    }

    // TTS-1 HD API 호출
    const mp3 = await Openai.audio.speech.create({
      model: "tts-1-hd",
      voice: voice,
      input: text,
    });

    // 응답 스트림을 바이너리 데이터로 변환
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // 적절한 헤더와 함께 오디오 데이터 반환
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("OpenAI TTS API 오류:", error);
    return NextResponse.json(
      { error: "음성 생성 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
