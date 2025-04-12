"use client";

import { Button } from "@/components/ui/button";
import { CreateVideoField } from "@/type/CreateVideoField";
import { convertToSRT } from "@/utils/convertToSRT";
import axios from "axios";
import { DownloadIcon, Loader2Icon } from "lucide-react";
import { SparklesIcon } from "lucide-react";
import { useState } from "react";

interface GenCaptionsProps {
  language: "English" | "Korean";
  ttsUrl: string;
  captions: string;
  setCaptions: (fieldName: CreateVideoField, captions: string) => void;
}

export default function GenCaptions({ language, ttsUrl, captions, setCaptions }: GenCaptionsProps) {
  console.log("captions");
  console.log(captions);

  const [loading, setLoading] = useState<boolean>(false);
  const [srtContent, setSrtContent] = useState<string>("");

  const GenerateCaptions = async () => {
    if (!ttsUrl) {
      alert("Please generate TTS first.");
      return;
    }

    setLoading(true);
    try {
      // 1. Blob URL에서 오디오 파일 가져오기
      const response = await fetch(ttsUrl);

      if (!response.ok) {
        throw new Error(`오디오 파일을 가져오는데 실패했습니다: ${response.status}`);
      }

      const blob = await response.blob();

      // 2. 파일명 생성
      const fileName = "audio.mp3";

      // 3. Blob을 File 객체로 변환
      const fileType = blob.type || "audio/mpeg";
      const audioFile = new File([blob], fileName, { type: fileType });

      // 4. FormData 생성 및 파일 추가
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append("language", language);

      // 5. FormData를 서버로 전송
      const captionResponse = await axios.post("/api/generate-captions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (captionResponse.status < 200 || captionResponse.status >= 300) {
        throw new Error(`변환 요청이 실패했습니다: ${captionResponse.status}`);
      }

      // 6. 결과 처리
      const result = captionResponse.data;
      const transcription = result.results?.channels[0]?.alternatives[0]?.transcript || "";

      console.log("잘 왔나");
      console.log(result);
      console.log(transcription);

      const generatedSrtContent = convertToSRT(result);
      setSrtContent(generatedSrtContent);
      setCaptions("captions", result);

      // 7. 자막 설정
      // setCaptions(CreateVideoField.CAPTIONS, transcription);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadSRT = () => {
    if (!srtContent) {
      alert("먼저 자막을 생성해주세요.");
      return;
    }

    // Blob 객체 생성
    const blob = new Blob([srtContent], { type: "text/plain;charset=utf-8" });

    // 다운로드 URL 생성
    const url = URL.createObjectURL(blob);

    // 다운로드 링크 생성
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "captions.srt"; // 파일명 설정

    // 링크를 DOM에 추가하고 클릭 이벤트 발생시켜 다운로드
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 링크 제거 및 URL 해제
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Captions</h2>
        <p className="text-sm text-gray-400">Generate captions from TTS audio.</p>
      </header>

      <div className="flex w-full justify-between gap-2">
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading}
          size={"sm"}
          onClick={GenerateCaptions}
        >
          {loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <SparklesIcon className="w-4 h-4 mr-2" />}
          Generate Captions
        </Button>

        {srtContent && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 cursor-pointer"
            size={"sm"}
            onClick={downloadSRT}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download SRT
          </Button>
        )}
      </div>
    </div>
  );
}
