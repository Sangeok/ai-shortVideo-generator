"use client";

import { useState } from "react";
import { CreateVideoField } from "@/src/shared/lib/type/CreateVideoField";
import { videoScriptType } from "@/src/shared/lib/type/videoScriptType";
import { useGenYoutubeScript } from "../model/hooks/useGenYoutubeScript";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import { TopicTabs } from "./_components/TopicTabs";
import { LanguageSelector } from "./_components/LanguageSelector";
import { ScriptDisplay } from "./_components/ScriptDisplay";

interface TopicProps {
  topic: string;
  topicDetail: string;
  language: "English" | "Korean";
  setVideoTopic: (fieldName: CreateVideoField, fieldValue: string) => void;
  setTopicDetail: (fieldName: CreateVideoField, fieldValue: string) => void;
  setSelectedVideoScript: (
    fieldName: string,
    fieldValue: videoScriptType
  ) => void;
  setVideoScript: (fieldName1: CreateVideoField, fieldValue: string) => void;
  setLanguage: (fieldName: CreateVideoField, fieldValue: string) => void;
  videoScript: videoScriptType[];
}

export default function Topic({
  topic,
  topicDetail,
  language,
  setVideoTopic,
  setTopicDetail,
  setVideoScript,
  setSelectedVideoScript,
  setLanguage,
  videoScript,
}: TopicProps) {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(
    0
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelectVideoScript = (index: number) => {
    setSelectedScriptIndex(index);
    setSelectedVideoScript("generateImageScript", videoScript[index]);
  };

  const { loading, GenerateScript } = useGenYoutubeScript({
    topic,
    language,
    topicDetail,
    setVideoScript,
    setSelectedScriptIndex,
  });

  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="mt-6">
        <h2 className="text-xl">Video Topic</h2>
        <p className="text-sm text-gray-400">Select topic for you video</p>
        <TopicTabs
          topic={topic}
          topicDetail={topicDetail}
          setVideoTopic={setVideoTopic}
          setTopicDetail={setTopicDetail}
        />

        <div className="mt-4 flex gap-8">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>

        {videoScript?.length > 0 && (
          <ScriptDisplay
            videoScript={videoScript}
            language={language}
            selectedScriptIndex={selectedScriptIndex}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            handleSelectVideoScript={handleSelectVideoScript}
          />
        )}
      </div>
      <LoadingButton
        loading={loading}
        onClick={GenerateScript}
        Content={
          videoScript?.length > 0 ? "Generate New Script" : "Generate Script"
        }
        className="mt-4"
      />
    </div>
  );
}
