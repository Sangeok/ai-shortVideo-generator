"use client";

import { RemotionComposition } from "../../../../_components/RemotionComposition";
import { Player } from "@remotion/player";
import { useState } from "react";

export default function RemotionPlayer({ videoData }: { videoData: any }) {
  const [durationInFrames, setDurationInFrames] = useState<number>(100);

  return (
    <Player
      component={RemotionComposition}
      durationInFrames={Number(durationInFrames.toFixed(0)) + 100}
      compositionWidth={720}
      compositionHeight={1280}
      fps={30}
      style={{ width: "25vw", height: "70vh" }}
      controls
      inputProps={{ videoData: videoData, setDurationInFrames: (frames: number) => setDurationInFrames(frames) }}
    />
  );
}
