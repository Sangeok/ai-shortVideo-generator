"use client";

import { useEffect } from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// interface RemotionCompositionProps {
//   videoData: {
//     captions: any;
//     ttsUrl: string;
//     imageUrl: any;
//   };
//   setDurationInFrames: (frames: number) => void;
// }

type Props = {
  videoData: {
    captions: any;
    ttsUrl: string;
    imageUrl: any;
  };
  // setDurationInFrames: (frames: number) => void;
};

export const RemotionComposition: React.FC<Props> = ({ videoData }) => {
  const { captions, ttsUrl, imageUrl } = videoData;
  const { fps } = useVideoConfig();
  const imageList = imageUrl.map((img: any) => img.imageUrl);
  const frame = useCurrentFrame();

  useEffect(() => {
    videoData && getDurationFrame();
  }, [videoData]);

  const getDurationFrame = () => {
    const wordsArr = captions?.results.channels[0].alternatives[0].words;

    const totalDuration = wordsArr[wordsArr.length - 1]?.end;
    const totalFrame = totalDuration * fps;
    // setDurationInFrames(totalFrame);
    return totalFrame;
  };

  const getCurrentCaption = () => {
    const wordsArr = captions?.results.channels[0].alternatives[0].words;

    const currentTime = frame / 30;
    const currentCaption = wordsArr?.find((word: any) => currentTime >= word.start && currentTime <= word.end);
    return currentCaption?.word || "";
  };
  return (
    <div>
      <AbsoluteFill>
        {imageList?.map((item: any, index: number) => {
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
            <div key={item}>
              <Sequence key={index} from={startTime} durationInFrames={duration}>
                <AbsoluteFill>
                  <Img
                    src={staticFile(item)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale(index)})` }}
                  />
                </AbsoluteFill>
              </Sequence>
            </div>
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
};
