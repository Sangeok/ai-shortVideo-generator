import { videoScriptType } from "@/shared/lib/type/videoScriptType";
import axios from "axios";
import { useState } from "react";

export const useGenTTs = ({
  language,
  selectedVideoScript,
  voice,
  setTts,
  setLoading,
}: {
  language: "English" | "Korean";
  selectedVideoScript: videoScriptType | null;
  voice: string;
  setTts: (data1: string, data2: string) => void;
  setLoading: (loading: boolean) => void;
}) => {
  const GenerateTTS = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/generate-voice",
        {
          text:
            language === "English"
              ? selectedVideoScript?.content
              : selectedVideoScript?.translatedContent,
          voice: voice,
        },
        {
          responseType: "blob",
        }
      );

      console.log(response.data);

      const audioBlob = response.data;
      const url = URL.createObjectURL(audioBlob);

      //cloudinaryUrl을 사용 시
      // Cloudinary에 오디오 파일 업로드
      //   const cloudinaryUrl = await uploadToCloudinary(audioBlob);
      //   setTts(url, cloudinaryUrl);

      //cloudinaryUrl을 미 사용 시
      setTts(url, "");
    } catch (error) {
      console.error("TTS 생성 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return { GenerateTTS };
};
