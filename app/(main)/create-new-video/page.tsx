"use client";

import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import Topic from "./_component/Topic";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import Preview from "./_component/Preview";
import GenImage from "./_component/GenImage";
import ProjectTitle from "./_component/ProjectTitle";
import useCreateVideoStore from "@/store/useCreateVideoStore";
import GenTTS from "./_component/GenTTS";
import VideoStyle from "./_component/VideoStyle";
import GenCaptions from "./_component/GenCaptions";
import Link from "next/link";
import axios from "axios";

export default function CreateNewVideo() {
  const { initialCreateVideoData, setCreateVideoDataByField, setTts, setGenerateImageDataByFied } =
    useCreateVideoStore();

  const { title, topic, videoScript, generateImage, imageUrl, ttsUrl, captions, language } = initialCreateVideoData;
  const { generateImageStyle, generateImageScript } = generateImage;

  // const onHandleInputChange = (fieldName: string, fieldValue: string) => {
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     [fieldName]: fieldValue,
  //   }));

  //   console.log(formData);
  // };

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
            language={language}
            setVideoTopic={setCreateVideoDataByField}
            setVideoScript={setCreateVideoDataByField}
            setLanguage={setCreateVideoDataByField}
            setSelectedVideoScript={setGenerateImageDataByFied}
            videoScript={videoScript}
          />
          {/* Video Image Style */}
          <VideoStyle videoStyle={generateImageStyle} setVideoStyle={setGenerateImageDataByFied} />
          <GenImage
            language={language}
            imageUrl={imageUrl}
            videoStyle={generateImageStyle}
            videoScript={generateImageScript}
            setImageUrl={setCreateVideoDataByField}
          />
          {/* Gen TTS */}
          <GenTTS
            language={language}
            selectedVideoScript={generateImageScript}
            setSelectedVideoScript={setGenerateImageDataByFied}
            ttsUrl={ttsUrl}
            setTts={setTts}
          />
          {/* Gen Captions */}
          <GenCaptions
            language={language}
            ttsUrl={ttsUrl}
            captions={captions}
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
