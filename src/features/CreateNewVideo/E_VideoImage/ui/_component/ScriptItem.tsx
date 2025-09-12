import { ImageUrlType } from "@/src/shared/lib/type/ImageUrlType";
import ImageGenerateButton from "./ImageGenerateButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useImageDownload } from "../../model/hooks/useImageDownload";

interface ScriptItemProps {
  item: any;
  index: number;
  isDone: boolean;
  isLoading: boolean;
  imageUrl: ImageUrlType[];
  onGenerateImage: (index: number) => Promise<void>;
}

export function ScriptItem({ item, index, isDone, isLoading, imageUrl, onGenerateImage }: ScriptItemProps) {
  const { handleDownload } = useImageDownload();

  return (
    <div className="flex flex-col gap-1 mb-8" key={item.imagePrompt}>
      <div className="border border-gray-300 rounded-md p-2">{item.imagePrompt}</div>
      <ImageGenerateButton isDone={isDone} isLoading={isLoading} onClick={() => onGenerateImage(index)} />
      {imageUrl.some((img) => img.imageId === index) && (
        <>
          <Button
            size="sm"
            variant="default"
            className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-black font-medium shadow-sm transition-colors cursor-pointer"
            onClick={() => handleDownload(index, imageUrl)}
          >
            <Download />
            Image Download
          </Button>
          {/* <Button
                size="sm"
                variant="default"
                className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-black font-medium shadow-sm transition-colors cursor-pointer"
                onClick={() => handleUploadImage(index)}
            >
                <Upload />
                Upload Image
            </Button> */}
        </>
      )}
    </div>
  );
}
