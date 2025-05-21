"use client";

import Preview from "@/app/(main)/create-new-video/_component/Preview";
import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import { Button } from "@/shared/ui/atoms/Button";
import { ArrowLeftToLine, ArrowRightToLine, WandSparkles } from "lucide-react";
import Link from "next/link";

import useCreateVideoStore from "@/store/useCreateVideoStore";

import ProjectTitle from "@/widgets/CreateNewVideo/A_ProjectTitle/ui/ProjectTitle";
import Topic from "@/widgets/CreateNewVideo/B_Topic/ui/Topic";
import VideoExplanation from "@/widgets/CreateNewVideo/C_Explanation/ui/VideoExplanation";
import VideoStyle from "@/widgets/CreateNewVideo/D_VIdeoStyle/ui/VideoStyle";
import GenVideoImage from "@/widgets/CreateNewVideo/E_VideoImage/ui/GenVideoImage";
import GenVideoTTS from "@/widgets/CreateNewVideo/F_VideoTTS/ui/GenVideoTTS";
import VideoCaption from "@/widgets/CreateNewVideo/G_Caption/ui/VIdeoCaption";

import { Box, StepLabel } from "@mui/material";
import { Stepper } from "@mui/material";
import { Step } from "@mui/material";
import { useState } from "react";
import { steps } from "../constants/constants";
import VideoMakeResult from "@/widgets/CreateNewVideo/H_VideoMakeResult/ui/VideoMakeResult";

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

  const [activeStep, setActiveStep] = useState<number>(0);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <ProjectTitle title={title} setTitle={setCreateVideoDataByField} />
        );
      case 1:
        return (
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
        );
      case 2:
        return (
          <VideoExplanation
            topic={topic}
            topicDetail={topicDetail}
            language={language}
          />
        );
      case 3:
        return (
          <VideoStyle
            videoStyle={generateImageStyle}
            setVideoStyle={setGenerateImageDataByFied}
          />
        );
      case 4:
        return (
          <GenVideoImage
            topic={topic}
            topicDetail={topicDetail}
            language={language}
            imageUrl={imageUrl}
            videoStyle={generateImageStyle}
            videoScript={generateImageScript}
            setImageUrl={setCreateVideoDataByField}
          />
        );
      case 5:
        return (
          <GenVideoTTS
            language={language}
            selectedVideoScript={generateImageScript}
            ttsUrl={ttsUrl}
            setTts={setTts}
          />
        );
      case 6:
        return (
          <VideoCaption
            language={language}
            ttsUrl={ttsUrl}
            setCaptions={setCreateVideoDataByField}
          />
        );
      case 7:
        return <VideoMakeResult />;
      default:
        return null;
    }
  };

  const handleStepChange = (StepState: string) => {
    if (StepState === "Prev") {
      if (activeStep > 0) {
        setActiveStep(activeStep - 1);
      } else return;
    } else if (StepState === "Next") {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else return;
    }
  };

  return (
    <div>
      {/* <ToggleSideBarButton /> */}

      <h2 className="text-2xl font-bold mt-2 p-4">Create New Video</h2>

      <Box sx={{ width: "100%", scale: "0.9", marginY: "6px" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] flex flex-col justify-between overflow-y-auto">
          {renderStep()}
          <div className="flex justify-between">
            <Button
              onClick={() => handleStepChange("Prev")}
              className="bg-white text-black mt-2 cursor-pointer"
            >
              <ArrowLeftToLine /> Prev
            </Button>
            <Button
              onClick={() => handleStepChange("Next")}
              className="bg-white text-black mt-2 cursor-pointer"
            >
              Next <ArrowRightToLine />
            </Button>
          </div>
        </div>
        <div>
          <Preview imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
}
