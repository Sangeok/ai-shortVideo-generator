"use client";

import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import { Button } from "@/src/shared/ui/atoms/Button";
import { WandSparkles } from "lucide-react";
import Link from "next/link";

import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

import ProjectTitle from "@/src/features/CreateNewVideo/A_ProjectTitle/ui/ProjectTitle";
import Topic from "@/src/features/CreateNewVideo/B_Topic/ui/Topic";
import VideoExplanation from "@/src/features/CreateNewVideo/C_Explanation/ui/VideoExplanation";
import VideoStyle from "@/src/features/CreateNewVideo/D_VIdeoStyle/ui/VideoStyle";
import GenVideoImage from "@/src/features/CreateNewVideo/E_VideoImage/ui/GenVideoImage";
import GenVideoTTS from "@/src/features/CreateNewVideo/F_VideoTTS/ui/GenVideoTTS";
import VideoCaption from "@/src/features/CreateNewVideo/G_Caption/ui/VIdeoCaption";
import Preview from "@/src/features/CreateNewVideo/Preview/ui/Preview";

export default function CreateNewVideo() {
  const { initialCreateVideoData, setCreateVideoDataByField, setTts } =
    useCreateVideoStore();

  const { title, generateImage, imageUrl, ttsUrl, language } =
    initialCreateVideoData;
  const { generateImageScript } = generateImage;

  return (
    <div>
      <ToggleSideBarButton />

      <h2 className="text-2xl font-bold mt-2 p-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-y-auto">
          {/* Project Title */}
          <ProjectTitle />

          {/* Topic & Script */}
          <Topic />

          {/* Gen Explanation */}
          <VideoExplanation />

          {/* Video Image Style */}
          <VideoStyle />
          <GenVideoImage />

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
