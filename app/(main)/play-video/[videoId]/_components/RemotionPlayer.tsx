"use client";

import { RemotionComposition } from "../../../../_components/RemotionComposition";
import { Player } from "@remotion/player";
import { useState } from "react";

export default function RemotionPlayer({ videoData }: { videoData: any }) {
  const [durationInFrames, setDurationInFrames] = useState<number>(100);

  return (
    <Player
      component={RemotionComposition}
      durationInFrames={Number(
        (
          videoData?.captions.results.channels[0].alternatives[0].words[
            videoData?.captions.results.channels[0].alternatives[0].words.length - 1
          ]?.end * 30
        ).toFixed(0)
      )}
      compositionWidth={720}
      compositionHeight={1280}
      fps={30}
      style={{ width: "25vw", height: "70vh" }}
      controls
      inputProps={{ videoData: videoData, setDurationInFrames: (frames: number) => setDurationInFrames(frames) }}
    />
  );
}
