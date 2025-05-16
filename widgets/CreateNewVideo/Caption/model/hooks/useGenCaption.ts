import axios from "axios";
import { useState } from "react";
import { convertToSRT } from "../../lib/convertToSRT";
import { CreateVideoField } from "@/type/CreateVideoField";

export const useGenCaption = ({
  ttsUrl,
  language,
  setCaptions,
}: {
  ttsUrl: string;
  language: "English" | "Korean";
  setCaptions: (fieldName: CreateVideoField, captions: string) => void;
}) => {
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
        throw new Error(
          `오디오 파일을 가져오는데 실패했습니다: ${response.status}`
        );
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
      const captionResponse = await axios.post(
        "/api/generate-captions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (captionResponse.status < 200 || captionResponse.status >= 300) {
        throw new Error(`변환 요청이 실패했습니다: ${captionResponse.status}`);
      }

      // 6. 결과 처리
      const result = captionResponse.data;
      const transcription =
        result.results?.channels[0]?.alternatives[0]?.transcript || "";

      console.log("잘 왔나");
      console.log(result);
      console.log(transcription);

      const generatedSrtContent = convertToSRT(result, language);
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

  return { loading, srtContent, GenerateCaptions };
};
