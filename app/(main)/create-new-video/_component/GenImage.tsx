import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";

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
    <Button className={buttonStyle} disabled={isLoading} size={"sm"} onClick={onClick}>
      {buttonContent}
    </Button>
  );
}

export default function GenImage({ videoStyle, videoScript }: { videoStyle: string; videoScript: string }) {
  const [isDoneCreateImage, setIsDoneCreateImage] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // const [style, setStyle] = useState<string>("");
  // const [script, setScript] = useState<string>("");

  const [resVideoScript, setResVideoScript] = useState<any[]>([]);

  const [resImage, setResImage] = useState<any[]>([]);

  const GenerateScript = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-videoScript", { style: videoStyle, script: videoScript });
      console.log(result.data);
      setResVideoScript(result?.data);

      // 새 스크립트가 생성되면 이미지 생성 상태 초기화
      const initialImageStatus = Object.fromEntries(Array.from({ length: result?.data.length }, (_, i) => [i, false]));
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
    setResImage([]);
    try {
      const result = await axios.post("/api/generate-videoImage", { imagePrompt: imagePrompt });
      console.log(result.data);
      setResImage(result?.data);

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

  console.log("resImage");
  console.log(resImage);

  return (
    <div className="mt-5">
      <header>
        <h2>Generate Image Script</h2>
        <p className="text-sm text-gray-400">Generate images from selected video style and script.</p>
      </header>
      {/* <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="style">Style</label>
          <Input type="text" id="style" value={style} onChange={(e) => setStyle(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="script">Script</label>
          <Input
            type="text"
            id="script"
            placeholder="Enter your video content."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </div>
      </div> */}

      <div className="flex w-full justify-between gap-2">
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading}
          size={"sm"}
          onClick={GenerateScript}
        >
          {loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <SparklesIcon className="w-4 h-4 mr-2" />}
          Generate Script
        </Button>

        {/* {resVideoScript.length > 0 && (
          <Button
            className=" bg-white text-black mt-4 cursor-pointer"
            disabled={loading}
            size={"sm"}
            onClick={GenerateImage}
          >
            {loading ? (
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <SparklesIcon className="w-4 h-4 mr-2" />
            )}
            Generate Image
          </Button>
        )} */}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Image Script Result</label>
        {resVideoScript?.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {resVideoScript?.map((item: any, index: number) => (
              <div className="flex flex-col gap-2" key={item.imagePrompt}>
                <div className="border border-gray-300 rounded-md p-2">{item.imagePrompt}</div>
                <ImageGenerateButton
                  index={index}
                  isDone={isDoneCreateImage[index]}
                  isLoading={loading}
                  onClick={() => GenerateImage(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
