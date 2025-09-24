import { useState } from "react";
import { ScriptItem } from "./ScriptItem";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export function ScriptDisplay() {
  const videoScript = useCreateVideoStore(
    (state) => state.initialCreateVideoData.videoScript
  );
  const language = useCreateVideoStore(
    (state) => state.initialCreateVideoData.language
  );

  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(
    0
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelectVideoScript = (index: number) => {
    setSelectedScriptIndex(index);
    useCreateVideoStore
      .getState()
      .setCreateVideoDataByField("generateImageScript", videoScript[index]);
  };

  return (
    <div className="mt-4">
      <h2>Select the Script</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {videoScript.map((script, index) => (
          <ScriptItem
            key={index}
            script={script}
            index={index}
            language={language}
            isSelected={selectedScriptIndex === index}
            isHovered={hoveredIndex === index}
            onSelect={() => handleSelectVideoScript(index)}
            onHover={(isHovered) => setHoveredIndex(isHovered ? index : null)}
          />
        ))}
      </div>
    </div>
  );
}
