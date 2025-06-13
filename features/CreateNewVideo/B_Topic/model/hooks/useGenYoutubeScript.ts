import { CreateVideoField } from "@/shared/lib/type/CreateVideoField";
import axios from "axios";
import { useState } from "react";

export const useGenYoutubeScript = ({
  topic,
  language,
  topicDetail,
  setVideoScript,
  setSelectedScriptIndex,
}: {
  topic: string;
  language: string;
  topicDetail: string;
  setVideoScript: (fieldName: CreateVideoField, fieldValue: string) => void;
  setSelectedScriptIndex: (index: number | null) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const GenerateScript = async () => {
    setLoading(true);
    setSelectedScriptIndex(null);
    try {
      const result = await axios.post("/api/generate-youtubeScript", {
        topic,
        language,
        topicDetail,
      });
      console.log(result.data);
      setVideoScript("videoScript", result?.data?.scripts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, GenerateScript };
};
