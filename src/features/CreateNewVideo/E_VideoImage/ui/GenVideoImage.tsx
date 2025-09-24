import { useState } from "react";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import { useGenImageScript } from "../model/hooks/useGenImageScript";
import { useGenVideoImage } from "../model/hooks/useGenVideoImage";
import { ScriptItem } from "./_component/ScriptItem";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export default function GenVideoImage() {
  const imageUrl = useCreateVideoStore(
    (state) => state.initialCreateVideoData.imageUrl
  );

  const [isDoneCreateImage, setIsDoneCreateImage] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState<boolean>(false);

  const { resVideoScript, GenerateScript } = useGenImageScript({
    setIsDoneCreateImage,
    setLoading,
  });

  const { GenerateImage } = useGenVideoImage({
    resVideoScript,
    setLoading,
    imageUrl,
    setIsDoneCreateImage,
  });

  const hasVideoScript = resVideoScript?.length > 0;

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Image Script</h2>
        <p className="text-sm text-gray-400">
          Generate image scripts from selected video style and script.
        </p>
      </header>

      <div className="flex w-full justify-between gap-2 mt-2">
        <LoadingButton
          loading={loading}
          Content="Generate Script"
          onClick={GenerateScript}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Image Script Result</label>
        {hasVideoScript && (
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
