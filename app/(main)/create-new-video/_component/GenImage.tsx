import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateVideoField } from "@/type/CreateVideoField";
import { ImageUrlType } from "@/type/ImageUrlType";
import axios from "axios";
import { Download, Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// 이미지 생성 버튼 컴포넌트
function ImageGenerateButton({
  index,
  isDone,
  isLoading,
  onClick,
}: {
  index: number;
  isDone: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  let buttonStyle = "mt-4 cursor-pointer ";
  buttonStyle += isDone ? "bg-green-500" : "bg-white text-black";

  let buttonContent;
  if (isLoading) {
    buttonContent = <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />;
  } else if (isDone) {
    buttonContent = (
      <>
        <SparklesIcon className="w-4 h-4 mr-2" />
        Generate New Image
      </>
    );
  } else {
    buttonContent = (
      <>
        <SparklesIcon className="w-4 h-4 mr-2" />
        Generate Image
      </>
    );
  }

  return (
    <Button
      className={buttonStyle}
      disabled={isLoading}
      size={"sm"}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  );
}

export default function GenImage({
  imageUrl,
  videoStyle,
  videoScript,
  setImageUrl,
}: {
  imageUrl: ImageUrlType[];
  videoStyle: string;
  videoScript: string;
  setImageUrl: (
    fieldName: CreateVideoField,
    fieldValue: ImageUrlType[]
  ) => void;
}) {
  console.log("imageUrl");
  console.log(imageUrl);

  const [isDoneCreateImage, setIsDoneCreateImage] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState<boolean>(false);

  // const [style, setStyle] = useState<string>("");
  // const [script, setScript] = useState<string>("");

  const [resVideoScript, setResVideoScript] = useState<any[]>([]);

  console.log("resVideoScript");
  console.log(resVideoScript);

  const handleDownloadImage = (index: number) => {
    const imgItem = imageUrl.find((img) => img.imageId === index);
    if (imgItem) {
      const a = document.createElement("a");
      a.href = imgItem.imageUrl;
      a.download = `생성된_이미지_${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const GenerateScript = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-videoScript", {
        style: videoStyle,
        script: videoScript,
      });
      console.log(result.data);
      setResVideoScript(result?.data);

      // 새 스크립트가 생성되면 이미지 생성 상태 초기화
      const initialImageStatus = Object.fromEntries(
        Array.from({ length: result?.data.length }, (_, i) => [i, false])
      );
      setIsDoneCreateImage(initialImageStatus);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateImage = async (index: number) => {
    // const imagePrompt = resScript[0].imagePrompt;
    const imagePrompt = resVideoScript[index].imagePrompt;

    setLoading(true);
    try {
      const result = await axios.post("/api/generate-videoImage", {
        imagePrompt: imagePrompt,
      });
      console.log("result");
      console.log(result.data);
      console.log("imageUrl");
      console.log(result?.data.data.imageUrl);

      if (imageUrl.length > 0 && imageUrl[index]?.imageUrl) {
        const updatedImageUrl: ImageUrlType[] = imageUrl.map((item, i) =>
          item.imageId === index
            ? {
                imageId: index,
                imageUrl: result?.data.data.imageUrl,
              }
            : item
        );
        console.log("updatedImageUrl");
        console.log(updatedImageUrl);
        setImageUrl("imageUrl", updatedImageUrl);
      } else {
        const imageUrlData = {
          imageId: index,
          imageUrl: result?.data.data.imageUrl,
        };
        const updatedImageUrl: ImageUrlType[] = [...imageUrl, imageUrlData];
        setImageUrl("imageUrl", updatedImageUrl);
      }

      // 이미지 생성 완료 시 상태 업데이트
      if (imagePrompt && result?.status === 200) {
        setIsDoneCreateImage((prev) => ({
          ...prev,
          [index]: true,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Image Script</h2>
        <p className="text-sm text-gray-400">
          Generate image scripts from selected video style and script.
        </p>
      </header>

      <div className="flex w-full justify-between gap-2">
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading}
          size={"sm"}
          onClick={GenerateScript}
        >
          {loading ? (
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <SparklesIcon className="w-4 h-4 mr-2" />
          )}
          Generate Script
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Image Script Result</label>
        {resVideoScript?.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {resVideoScript?.map((item: any, index: number) => (
              <div className="flex flex-col gap-1 mb-8" key={item.imagePrompt}>
                <div className="border border-gray-300 rounded-md p-2">
                  {item.imagePrompt}
                </div>
                <ImageGenerateButton
                  index={index}
                  isDone={isDoneCreateImage[index]}
                  isLoading={loading}
                  onClick={() => GenerateImage(index)}
                />
                {imageUrl.some((img) => img.imageId === index) && (
                  <Button
                    size="sm"
                    variant="default"
                    className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-black font-medium shadow-sm transition-colors"
                    onClick={() => handleDownloadImage(index)}
                  >
                    <Download />
                    Image Download
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
