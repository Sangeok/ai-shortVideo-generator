"use client";

import useCreateVideoStore from "@/entities/Video/useCreateVideoStore";
import RemotionPlayer from "./_components/RemotionPlayer";
import VideoInfo from "./_components/VideoInfo";

export default function PlayVideo() {
  const { initialCreateVideoData } = useCreateVideoStore();
  const { captions, ttsUrl, imageUrl, title, generateImage, ttsFileUrl } =
    initialCreateVideoData;
  const { generateImageStyle } = generateImage;

  const videoData = {
    captions: captions,
    ttsUrl: ttsUrl,
    imageUrl: imageUrl,
    title: title,
    videoStyle: generateImageStyle,
    ttsFileUrl: ttsFileUrl,
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
