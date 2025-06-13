import { clsx } from "clsx";
import { videoScriptType } from "@/shared/lib/type/videoScriptType";

interface ScriptItemProps {
  script: videoScriptType;
  index: number;
  language: string;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (isHovered: boolean) => void;
}

export function ScriptItem({
  script,
  language,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: ScriptItemProps) {
  const content =
    language === "English" ? script.content : script.translatedContent;

  return (
    <div
      className="relative"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        onClick={onSelect}
        className={clsx(
          "p-3 border rounded-lg cursor-pointer",
          isSelected && "bg-zinc-700"
        )}
      >
        <h2 className="line-clamp-3 text-sm text-gray-500">{content}</h2>
      </div>

      {isHovered && (
        <div className="absolute z-50 p-3 bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg text-sm text-white max-h-60 overflow-y-auto left-0 right-0 top-full mt-1 w-full">
          {content}
        </div>
      )}
    </div>
  );
}
