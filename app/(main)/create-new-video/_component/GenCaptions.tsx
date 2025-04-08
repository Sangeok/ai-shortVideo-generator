"use client";

import { Button } from "@/components/ui/button";
import { CreateVideoField } from "@/type/CreateVideoField";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { SparklesIcon } from "lucide-react";
import { useState } from "react";

interface GenCaptionsProps {
  ttsUrl: string;
  captions: string;
  setCaptions: (fieldName: CreateVideoField, captions: string) => void;
}

export default function GenCaptions({ ttsUrl }: GenCaptionsProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const GenerateCaptions = async () => {
    if (!ttsUrl) {
      alert("Please generate TTS first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(ttsUrl);

      console.log(response);

      if (!response.ok) {
        throw new Error(
          `오디오 파일을 가져오는데 실패했습니다: ${response.status}`
        );
      }

      const blob = await response.blob();

      console.log(blob);

      // 3. 파일명 추출 또는 생성
      let fileName = "audio.mp3";
      try {
        const urlParts = ttsUrl.split("/");
        const lastPart = urlParts[urlParts.length - 1].split("?")[0];
        if (lastPart) fileName = lastPart;
      } catch (e) {
        console.warn("파일명을 추출할 수 없습니다. 기본값을 사용합니다.", e);
      }

      // 4. Blob을 File 객체로 변환
      const fileType = blob.type || "audio/mpeg";
      const audioFile = new File([blob], fileName, { type: fileType });

      // 5. FormData 생성 및 파일 추가
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append("language", "ko");

      const captionResponse = await axios.post("/api/generate-captions", {
        formData,
      });

      // Axios는 ok 속성이 없으므로 status 코드로 확인
      if (captionResponse.status < 200 || captionResponse.status >= 300) {
        throw new Error(`변환 요청이 실패했습니다: ${captionResponse.status}`);
      }

      //   const response = await fetch("/api/captions", {
      //     method: "POST",
      //     body: JSON.stringify({ ttsUrl }),
      //   });
      //   const data = await response.json();
      //   console.log(data);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Captions</h2>
        <p className="text-sm text-gray-400">
          Generate captions from TTS audio.
        </p>
      </header>

      <div className="flex w-full justify-between gap-2">
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading}
          size={"sm"}
          onClick={GenerateCaptions}
        >
          {loading ? (
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <SparklesIcon className="w-4 h-4 mr-2" />
          )}
          Generate Captions
        </Button>
      </div>
    </div>
  );
}
