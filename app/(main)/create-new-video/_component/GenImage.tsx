import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";

export default function GenImage() {
  const [loading, setLoading] = useState<boolean>(false);

  const [style, setStyle] = useState<string>("");
  const [script, setScript] = useState<string>("");

  const [resScript, setResScript] = useState<any[]>([]);

  const [resImage, setResImage] = useState<any[]>([]);

  const GenerateScript = async () => {
    setLoading(true);
    setScript("");
    try {
      const result = await axios.post("/api/generate-videoScript", { style: style, script: script });
      console.log(result.data);
      setResScript(result?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateImage = async () => {
    // const imagePrompt = resScript[0].imagePrompt;
    const imagePrompt = resScript.map((item: any) => item.imagePrompt);

    setLoading(true);
    setResImage([]);
    try {
      const result = await axios.post("/api/generate-videoImage", { imagePrompt: imagePrompt });
      console.log(result.data);
      setResImage(result?.data);
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
        <h2>Generate Image</h2>
      </header>
      <div className="flex gap-2">
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
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Result</label>
        {resScript?.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {resScript?.map((item: any) => (
              <div key={item.imagePrompt} className="border border-gray-300 rounded-md p-2">
                {item.imagePrompt}
              </div>
            ))}
          </div>
        )}
      </div>

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

        {resScript.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
