import { videoScriptType } from "@/type/videoScriptType";
import axios from "axios";
import { useState } from "react";

interface GenImageScriptProps {
  videoStyle: string;
  videoScript: videoScriptType;
  language: "English" | "Korean";
  topic: string;
  topicDetail: string;
  setResVideoScript: (videoScript: videoScriptType[]) => void;
  setIsDoneCreateImage: (isDoneCreateImage: Record<number, boolean>) => void;
  setLoading: (loading: boolean) => void;
}

export const useGenImageScript = ({
  videoStyle,
  videoScript,
  language,
  topic,
  topicDetail,
  setResVideoScript,
  setIsDoneCreateImage,
  setLoading,
}: GenImageScriptProps) => {
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [imageScript, setImageScript] = useState<string>("");

  const GenerateScript = async () => {
    setLoading(true);
    try {
      // 여기서 무조건 영어로 넘겨줘야 함.
      const result = await axios.post("/api/generate-imageScript", {
        style: videoStyle,
        script: videoScript?.content || "",
        language: language,
        topic,
        topicDetail,
      });
      console.log(result.data);
      setResVideoScript(result?.data);

      // 새 스크립트가 생성되면 이미지 생성 상태 초기화
      const initialImageStatus = Object.fromEntries(
        Array.from({ length: result?.data.length }, (_, i) => [i, false])
      );
      setIsDoneCreateImage(initialImageStatus);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { GenerateScript };
};
