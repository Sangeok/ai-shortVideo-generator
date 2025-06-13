import { videoScriptType } from "@/shared/lib/type/videoScriptType";
import { ScriptItem } from "./ScriptItem";

interface ScriptDisplayProps {
  videoScript: videoScriptType[];
  language: string;
  selectedScriptIndex: number | null;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  handleSelectVideoScript: (index: number) => void;
}

export function ScriptDisplay({
  videoScript,
  language,
  selectedScriptIndex,
  hoveredIndex,
  setHoveredIndex,
  handleSelectVideoScript,
}: ScriptDisplayProps) {
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
