"use client";

import useCreateVideoStore from "@/store/useCreateVideoStore";
import RemotionPlayer from "./_components/RemotionPlayer";
import VideoInfo from "./_components/VideoInfo";

export default function PlayVideo() {
  const { initialCreateVideoData } = useCreateVideoStore();
  const { captions, ttsUrl, imageUrl, title, generateImage } = initialCreateVideoData;
  const { generateImageStyle } = generateImage;

  const videoData = {
    captions: captions,
    ttsUrl: ttsUrl,
    imageUrl: imageUrl,
    title: title,
    videoStyle: generateImageStyle,
  };

  return (
    <div className="flex w-full h-full justify-center items-center gap-30">
      <div>
        <RemotionPlayer videoData={videoData} />
      </div>
      <div>
        <VideoInfo videoData={videoData} />
      </div>
    </div>
  );
}
