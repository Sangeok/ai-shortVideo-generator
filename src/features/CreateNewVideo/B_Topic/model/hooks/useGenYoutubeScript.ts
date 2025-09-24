"use client";

import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";
import axios from "axios";
import { useState } from "react";

export const useGenYoutubeScript = () => {
  const topic = useCreateVideoStore(
    (state) => state.initialCreateVideoData.topic
  );
  const topicDetail = useCreateVideoStore(
    (state) => state.initialCreateVideoData.topicDetail
  );
  const language = useCreateVideoStore(
    (state) => state.initialCreateVideoData.language
  );

  const setVideoScript = useCreateVideoStore(
    (state) => state.setCreateVideoDataByField
  );

  const [loading, setLoading] = useState<boolean>(false);

  const GenerateScript = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-youtubeScript", {
        topic,
        language,
        topicDetail,
      });
      setVideoScript("videoScript", result?.data?.scripts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, GenerateScript };
};
