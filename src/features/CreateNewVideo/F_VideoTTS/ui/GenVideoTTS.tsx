"use client";

import { useState } from "react";
import { videoScriptType } from "@/src/shared/lib/type/videoScriptType";
import { useGenTranslatedScript } from "../model/hooks/useGenTranslatedScript";
import { useGenTTs } from "../model/hooks/useGenTTs";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import TTSPlayer from "./_components/TTSPlayer";
import { TitleTextArea } from "@/src/shared/ui/molecule/TitleTextArea";
import VoiceSelector from "./_components/VoiceSelector";
import TranslateSection from "./_components/TranslateSection";

interface GenTTSProps {
  language: "English" | "Korean";
  selectedVideoScript: videoScriptType | null;
  ttsUrl: string;
  setTts: (data1: string, data2: string) => void;
}

export default function GenVideoTTS({
  language,
  selectedVideoScript,
  ttsUrl,
  setTts,
}: GenTTSProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>("alloy");
  const [translateLanguage, setTranslateLanguage] = useState<string>("Korean");

  const { translatedVideoScript, TranslateScript } = useGenTranslatedScript({
    selectedVideoScript,
    translateLanguage,
    setLoading,
  });

  const { GenerateTTS } = useGenTTs({
    language,
    selectedVideoScript,
    voice,
    setTts,
    setLoading,
  });

  //   const [translatedVideoScript, setTranslatedVideoScript] =
  //     useState<string>("");

  //   const TranslateScript = async () => {
  //     const response = await axios.post("/api/generate-translatedScript", {
  //       text: selectedVideoScript?.content,
  //       targetLanguage: translateLanguage,
  //     });

  //     console.log("translated script");
  //     console.log(response.data);

  //     setTranslatedVideoScript(response.data.translatedText);
  //   };

  //   const GenerateTTS = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post(
  //         "/api/generate-voice",
  //         {
  //           text:
  //             language === "English"
  //               ? selectedVideoScript?.content
  //               : selectedVideoScript?.translatedContent,
  //           voice: voice,
  //         },
  //         {
  //           responseType: "blob",
  //         }
  //       );

  //       console.log(response.data);

  //       const audioBlob = response.data;
  //       const url = URL.createObjectURL(audioBlob);

  //       //cloudinaryUrl을 사용 시
  //       // Cloudinary에 오디오 파일 업로드
  //       //   const cloudinaryUrl = await uploadToCloudinary(audioBlob);
  //       //   setTts(url, cloudinaryUrl);

  //       //cloudinaryUrl을 미 사용 시
  //       setTts(url, "");
  //     } catch (error) {
  //       console.error("TTS 생성 중 오류:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Cloudinary에 오디오 파일 업로드하는 함수
  //   const uploadToCloudinary = async (audioBlob: Blob) => {
  //     try {
  //       // Cloudinary에 업로드
  //       const formData = new FormData();
  //       formData.append("file", audioBlob, "audio.mp3");
  //       formData.append(
  //         "upload_preset",
  //         process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
  //       ); // Cloudinary upload preset 설정
  //       formData.append("resource_type", "video"); // 오디오 파일은 Cloudinary에서 "video" 리소스 타입으로 처리됨

  //       const cloudinaryResponse = await fetch(
  //         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       const cloudinaryData = await cloudinaryResponse.json();

  //       if (cloudinaryData.url) {
  //         console.log("Cloudinary 업로드 성공:", cloudinaryData);
  //         return cloudinaryData.url;
  //       } else {
  //         throw new Error("Cloudinary 업로드에 실패했습니다.");
  //       }
  //     } catch (error) {
  //       console.error("Cloudinary 업로드 오류:", error);
  //       return null;
  //     }
  //   };

  console.log("selectedVideoScript");
  console.log(selectedVideoScript);

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <h2 className="text-xl">Generate TTS</h2>
      <p className="text-sm text-gray-400">
        If you fine with the video style and script, click the button below to
        generate TTS.
      </p>

      <TitleTextArea
        title="Check the TTS Script"
        value={
          language === "English"
            ? selectedVideoScript?.content || ""
            : selectedVideoScript?.translatedContent || ""
        }
        placeholder="Check the TTS Script..."
        disabled={true}
      />

      <VoiceSelector voice={voice} setVoice={setVoice} />

      <LoadingButton
        loading={loading}
        onClick={GenerateTTS}
        Content="Generate TTS"
        className="mt-8"
      />

      <TTSPlayer ttsUrl={ttsUrl} />

      {/* <TitleTextArea
        title="Translate the TTS Script"
        value={translatedVideoScript}
        placeholder="Translate the TTS Script..."
        disabled={true}
      /> */}

      <TranslateSection
        loading={loading}
        translatedVideoScript={translatedVideoScript}
        translateLanguage={translateLanguage}
        setTranslateLanguage={setTranslateLanguage}
        TranslateScript={TranslateScript}
      />
    </div>
  );
}
