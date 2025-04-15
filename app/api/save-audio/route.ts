// /app/api/save-audio/route.ts 파일 생성
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // FormData 파싱
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json({ error: "오디오 파일이 없습니다" }, { status: 400 });
    }

    // 저장 경로 설정
    const publicDir = path.join(process.cwd(), "public");

    // 고유한 파일명 생성
    const uniqueFileName = `tts-audio-${crypto.randomUUID()}.mp3`;
    const filePath = path.join(publicDir, uniqueFileName);

    // 파일 데이터 추출 및 저장
    const arrayBuffer = await audioFile.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));

    // 상대 경로 반환 (public 폴더 기준)
    const relativePath = `${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      filePath: relativePath,
    });
  } catch (error) {
    console.error("오디오 저장 오류:", error);
    return NextResponse.json({ error: "오디오 파일 저장 중 오류가 발생했습니다" }, { status: 500 });
  }
}
