"use client";

import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";
import axios from "axios";
import { useState } from "react";

interface GenImageScriptProps {
  setIsDoneCreateImage: (isDoneCreateImage: Record<number, boolean>) => void;
  setLoading: (loading: boolean) => void;
}

export const useGenImageScript = ({
  setIsDoneCreateImage,
  setLoading,
}: GenImageScriptProps) => {
  const [resVideoScript, setResVideoScript] = useState<any[]>([]);

  const topic = useCreateVideoStore(
    (state) => state.initialCreateVideoData.topic
  );
  const topicDetail = useCreateVideoStore(
    (state) => state.initialCreateVideoData.topicDetail
  );
  const language = useCreateVideoStore(
    (state) => state.initialCreateVideoData.language
  );
  const videoStyle = useCreateVideoStore(
    (state) => state.initialCreateVideoData.generateImage.generateImageStyle
  );
  const videoScript = useCreateVideoStore(
    (state) => state.initialCreateVideoData.generateImage.generateImageScript
  );

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

  return { resVideoScript, GenerateScript };
};
