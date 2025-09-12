import { CreateVideoField } from "@/src/shared/lib/type/CreateVideoField";
import { ImageUrlType } from "@/src/shared/lib/type/ImageUrlType";
import { useState } from "react";
import { videoScriptType } from "@/src/shared/lib/type/videoScriptType";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import { useGenImageScript } from "../model/hooks/useGenImageScript";
import { useGenVideoImage } from "../model/hooks/useGenVideoImage";
import { ScriptItem } from "./_component/ScriptItem";

export default function GenVideoImage({
  topic,
  topicDetail,
  language,
  imageUrl,
  videoStyle,
  videoScript,
  setImageUrl,
}: {
  topic: string;
  topicDetail: string;
  language: "English" | "Korean";
  imageUrl: ImageUrlType[];
  videoStyle: string;
  videoScript: videoScriptType | null;
  setImageUrl: (fieldName: CreateVideoField, fieldValue: ImageUrlType[]) => void;
}) {
  const [isDoneCreateImage, setIsDoneCreateImage] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [resVideoScript, setResVideoScript] = useState<any[]>([]);

  const { GenerateScript } = useGenImageScript({
    videoStyle,
    videoScript: videoScript as videoScriptType,
    language,
    topic,
    topicDetail,
    setResVideoScript,
    setIsDoneCreateImage,
    setLoading,
  });

  const { GenerateImage } = useGenVideoImage({
    resVideoScript,
    setLoading,
    imageUrl,
    setImageUrl,
    setIsDoneCreateImage,
  });

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Image Script</h2>
        <p className="text-sm text-gray-400">Generate image scripts from selected video style and script.</p>
      </header>

      <div className="flex w-full justify-between gap-2 mt-2">
        <LoadingButton loading={loading} Content="Generate Script" onClick={GenerateScript} />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Image Script Result</label>
        {resVideoScript?.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {resVideoScript?.map((item: any, index: number) => (
              <ScriptItem
                key={item.imagePrompt}
                item={item}
                index={index}
                isDone={isDoneCreateImage[index]}
                isLoading={loading}
                imageUrl={imageUrl}
                onGenerateImage={GenerateImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
