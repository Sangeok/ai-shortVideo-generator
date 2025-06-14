"use client";

import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import { Button } from "@/shared/ui/atoms/Button";
import { WandSparkles } from "lucide-react";
import Link from "next/link";

import useCreateVideoStore from "@/entities/Video/useCreateVideoStore";

import ProjectTitle from "@/features/CreateNewVideo/A_ProjectTitle/ui/ProjectTitle";
import Topic from "@/features/CreateNewVideo/B_Topic/ui/Topic";
import VideoExplanation from "@/features/CreateNewVideo/C_Explanation/ui/VideoExplanation";
import VideoStyle from "@/features/CreateNewVideo/D_VIdeoStyle/ui/VideoStyle";
import GenVideoImage from "@/features/CreateNewVideo/E_VideoImage/ui/GenVideoImage";
import GenVideoTTS from "@/features/CreateNewVideo/F_VideoTTS/ui/GenVideoTTS";
import VideoCaption from "@/features/CreateNewVideo/G_Caption/ui/VIdeoCaption";
import Preview from "@/features/CreateNewVideo/Preview/ui/Preview";

export default function CreateNewVideo() {
  const {
    initialCreateVideoData,
    setCreateVideoDataByField,
    setTts,
    setGenerateImageDataByFied,
  } = useCreateVideoStore();

  const {
    title,
    topic,
    videoScript,
    generateImage,
    imageUrl,
    ttsUrl,
    language,
    topicDetail,
  } = initialCreateVideoData;
  const { generateImageStyle, generateImageScript } = generateImage;

  return (
    <div>
      <ToggleSideBarButton />

      <h2 className="text-2xl font-bold mt-2 p-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-y-auto">
          {/* Project Title */}
          <ProjectTitle title={title} setTitle={setCreateVideoDataByField} />

          {/* Topic & Script */}
          <Topic
            topic={topic}
            topicDetail={topicDetail}
            language={language}
            setVideoTopic={setCreateVideoDataByField}
            setTopicDetail={setCreateVideoDataByField}
            setVideoScript={setCreateVideoDataByField}
            setLanguage={setCreateVideoDataByField}
            setSelectedVideoScript={setGenerateImageDataByFied}
            videoScript={videoScript}
          />

          {/* Gen Explanation */}
          <VideoExplanation
            topic={topic}
            topicDetail={topicDetail}
            language={language}
          />

          {/* Video Image Style */}
          <VideoStyle
            videoStyle={generateImageStyle}
            setVideoStyle={setGenerateImageDataByFied}
          />
          <GenVideoImage
            topic={topic}
            topicDetail={topicDetail}
            language={language}
            imageUrl={imageUrl}
            videoStyle={generateImageStyle}
            videoScript={generateImageScript}
            setImageUrl={setCreateVideoDataByField}
          />

          {/* Gen TTS */}
          <GenVideoTTS
            language={language}
            selectedVideoScript={generateImageScript}
            ttsUrl={ttsUrl}
            setTts={setTts}
          />

          {/* Gen Captions */}
          <VideoCaption
            language={language}
            ttsUrl={ttsUrl}
            setCaptions={setCreateVideoDataByField}
          />
          <Link href={`/play-video/${title || "test"}`}>
            <Button className="bg-white text-black mt-5 w-full cursor-pointer">
              <WandSparkles /> Generate Video
            </Button>
          </Link>
        </div>
        <div>
          <Preview imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
}
