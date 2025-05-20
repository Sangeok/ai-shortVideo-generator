"use client";

import Preview from "@/app/(main)/create-new-video/_component/Preview";
import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import { Button } from "@/shared/ui/atoms/Button";
import { WandSparkles } from "lucide-react";
import Link from "next/link";

import useCreateVideoStore from "@/store/useCreateVideoStore";

import ProjectTitle from "@/widgets/CreateNewVideo/A_ProjectTitle/ui/ProjectTitle";
import Topic from "@/widgets/CreateNewVideo/B_Topic/ui/Topic";
import VideoExplanation from "@/widgets/CreateNewVideo/C_Explanation/ui/VideoExplanation";
import VideoStyle from "@/widgets/CreateNewVideo/D_VIdeoStyle/ui/VideoStyle";
import GenVideoImage from "@/widgets/CreateNewVideo/E_VideoImage/ui/GenVideoImage";
import GenVideoTTS from "@/widgets/CreateNewVideo/F_VideoTTS/ui/GenVideoTTS";
import VideoCaption from "@/widgets/CreateNewVideo/G_Caption/ui/VIdeoCaption";

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
    captions,
    ttsFileUrl,
    language,
    topicDetail,
  } = initialCreateVideoData;
  const { generateImageStyle, generateImageScript } = generateImage;

  console.log("ttsFileUrl");
  console.log(ttsFileUrl);

  return (
    <div>
      <ToggleSideBarButton />

      <h2 className="text-2xl font-bold mt-2 p-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-y-auto">
          {/* Project Title */}
          {/* <ProjectTitle title={title} setTitle={setCreateVideoDataByField} /> */}
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
          {/* <GenExplanation
            topic={topic}
            topicDetail={topicDetail}
            language={language}
          /> */}

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
          {/* <GenImage
            topic={topic}
            topicDetail={topicDetail}
            language={language}
            imageUrl={imageUrl}
            videoStyle={generateImageStyle}
            videoScript={generateImageScript}
            setImageUrl={setCreateVideoDataByField}
          /> */}
          {/* Gen TTS */}
          <GenVideoTTS
            language={language}
            selectedVideoScript={generateImageScript}
            ttsUrl={ttsUrl}
            setTts={setTts}
          />
          {/* <GenTTS
            language={language}
              selectedVideoScript={generateImageScript}
              setSelectedVideoScript={setGenerateImageDataByFied}
              ttsUrl={ttsUrl}
              setTts={setTts}
          /> */}
          {/* Gen Captions */}
          <VideoCaption
            language={language}
            ttsUrl={ttsUrl}
            setCaptions={setCreateVideoDataByField}
          />
          {/* <GenCaptions
            language={language}
            ttsUrl={ttsUrl}
            captions={captions}
            setCaptions={setCreateVideoDataByField}
          /> */}
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
