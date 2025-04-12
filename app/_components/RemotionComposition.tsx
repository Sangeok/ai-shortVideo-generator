"use client";

import { useEffect } from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

interface RemotionCompositionProps {
  videoData: {
    captions: any;
    ttsUrl: string;
    imageUrl: any;
  };
  setDurationInFrames: (frames: number) => void;
}

export default function RemotionComposition({ videoData, setDurationInFrames }: RemotionCompositionProps) {
  const { captions, ttsUrl, imageUrl } = videoData;
  const { fps } = useVideoConfig();
  const imageList = imageUrl.map((img: any) => img.imageUrl);
  const frame = useCurrentFrame();

  useEffect(() => {
    videoData && getDurationFrame();
  }, [videoData]);

  const wordsArr = captions.results.channels[0].alternatives[0].words;
  console.log("wordsArr");
  console.log(wordsArr);

  const getDurationFrame = () => {
    const totalDuration = wordsArr[wordsArr.length - 1]?.end;
    console.log("totalDuration");
    console.log(totalDuration);
    const totalFrame = totalDuration * fps;
    setDurationInFrames(totalFrame);
    return totalFrame;
  };

  const getCurrentCaption = () => {
    const currentTime = frame / 30;
    const currentCaption = wordsArr?.find((word: any) => currentTime >= word.start && currentTime <= word.end);
    return currentCaption?.word || "";
  };
  return (
    <div>
      <AbsoluteFill>
        {imageList.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList?.length;
          const duration = getDurationFrame();

          const scale = (index: number) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

          return (
            <>
              <Sequence key={index} from={startTime} durationInFrames={duration}>
                <AbsoluteFill>
                  <Img
                    src={item}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale(index)})` }}
                  />
                </AbsoluteFill>
              </Sequence>
            </>
          );
        })}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            bottom: 10,
            top: undefined,
            fontSize: 50,
            color: "white",
            height: 150,
            textAlign: "center",
          }}
        >
          <h2>{getCurrentCaption()}</h2>
        </AbsoluteFill>
        {ttsUrl && <Audio src={ttsUrl} />}
      </AbsoluteFill>
    </div>
  );
}
