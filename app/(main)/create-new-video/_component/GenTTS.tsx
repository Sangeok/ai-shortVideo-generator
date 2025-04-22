"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Info, Loader2Icon, SparklesIcon } from "lucide-react";
import { useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateVideoField } from "@/type/CreateVideoField";
import { videoScriptType } from "@/type/videoScriptType";
import { saveTtsAudioToPublic } from "@/lib/client-utils";

interface GenTTSProps {
  language: "English" | "Korean";
  selectedVideoScript: videoScriptType | null;
  setSelectedVideoScript: (field: string, data: videoScriptType) => void;
  ttsUrl: string;
  setTts: (data1: string, data2: string) => void;
  // setTtsUrl: (field: CreateVideoField, data: string) => void;
}

export default function GenTTS({ language, selectedVideoScript, setSelectedVideoScript, ttsUrl, setTts }: GenTTSProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const audioRef = useRef(null);
  // const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState<string>("alloy");
  const [translateLanguage, setTranslateLanguage] = useState<string>("Korean");

  const GenerateTTS = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/generate-voide",
        {
          // text: "안녕하세요. 12월 3일 비상 계엄을 선포함에 따라 나라가 뒤숭숭해졌습니다. 이에 대해 대통령이 발표한 입장을 전하고자 합니다. 대통령은 다음과 같이 말했습니다.",
          text: language === "English" ? selectedVideoScript?.content : selectedVideoScript?.translatedContent,
          voice: voice,
        },
        {
          responseType: "blob",
        }
      );

      console.log(response.data);

      const audioBlob = response.data;
      const url = URL.createObjectURL(audioBlob);
      const result = await saveTtsAudioToPublic(url);

      // Cloudinary에 오디오 파일 업로드
      const cloudinaryUrl = await uploadToCloudinary(audioBlob);

      console.log("cloudinaryUrl");
      console.log(cloudinaryUrl);
      // cloudinaryUrl.url
      // setAudioUrl(url);
      setTts(url, cloudinaryUrl);
    } catch (error) {
      console.error("TTS 생성 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cloudinary에 오디오 파일 업로드하는 함수
  const uploadToCloudinary = async (audioBlob: Blob) => {
    try {
      // Cloudinary에 업로드
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.mp3");
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""); // Cloudinary upload preset 설정
      formData.append("resource_type", "video"); // 오디오 파일은 Cloudinary에서 "video" 리소스 타입으로 처리됨

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();

      if (cloudinaryData.url) {
        console.log("Cloudinary 업로드 성공:", cloudinaryData);
        return cloudinaryData.url;
      } else {
        throw new Error("Cloudinary 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Cloudinary 업로드 오류:", error);
      return null;
    }
  };

  console.log("selectedVideoScript");
  console.log(selectedVideoScript);

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <h2 className="text-xl">Generate TTS</h2>
      <p className="text-sm text-gray-400">
        If you fine with the video style and script, click the button below to generate TTS.
      </p>

      <div className="mt-5">
        <h2>Check the TTS Script</h2>
        <Textarea
          value={language === "English" ? selectedVideoScript?.content : selectedVideoScript?.translatedContent}
          disabled={true}
          // onChange={(event) => {
          //   setSelectedVideoScript("generateImageScript", event.target.value);
          // }}
          className="mt-2"
          placeholder="Check the TTS Script..."
        />
      </div>

      <div className="mt-5">
        <div className="flex gap-2 items-center">
          <h2>Select the Voice</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={20} className="cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white text-black max-w-sm">
              <div className="space-y-2 p-1">
                <p>
                  <strong>alloy:</strong> 중성적이고 균형 잡힌 음성입니다. 전문적이고 중립적인 톤을 가지고 있어 다양한
                  상황에 적합합니다.
                </p>
                <p>
                  <strong>echo:</strong> 깊고 차분한 음성입니다. 더 깊은 음역대로 안정감 있는 느낌을 줍니다.
                </p>
                <p>
                  <strong>fable:</strong> 따뜻하고 친근한 음성입니다. 부드러운 톤으로 이야기나 콘텐츠 낭독에 적합합니다.
                </p>
                <p>
                  <strong>onyx:</strong> 강력하고 권위 있는 음성입니다. 확신에 찬 톤으로 발표나 공식적인 내용에
                  어울립니다.
                </p>
                <p>
                  <strong>nova:</strong> 친근하고 명확한 음성입니다. 선명하고 활기찬 느낌으로 교육 콘텐츠나 안내에
                  효과적입니다.
                </p>
                <p>
                  <strong>shimmer:</strong> 밝고 긍정적인 음성입니다. 경쾌하고 유쾌한 톤으로 밝은 분위기를 만듭니다.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <Select value={voice} onValueChange={(value) => setVoice(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectGroup>
              <SelectLabel>Voices</SelectLabel>
              <SelectItem value="alloy">Alloy</SelectItem>
              <SelectItem value="echo">Echo</SelectItem>
              <SelectItem value="fable">Fable</SelectItem>
              <SelectItem value="onyx">Onyx</SelectItem>
              <SelectItem value="nova">Nova</SelectItem>
              <SelectItem value="shimmer">Shimmer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* openai tts 연결 */}
      <Button className="bg-white text-black mt-8 cursor-pointer" disabled={loading} size={"sm"} onClick={GenerateTTS}>
        {loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <SparklesIcon className="w-4 h-4 mr-2" />}
        Generate TTS
      </Button>

      {ttsUrl && (
        <div className="mt-4">
          <audio ref={audioRef} controls className="w-full mt-2">
            <source src={ttsUrl} type="audio/mpeg" />
            브라우저가 오디오 요소를 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  );
}
