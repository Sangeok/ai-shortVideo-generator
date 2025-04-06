import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VideoStyleOptions } from "@/type/VideoStyleOptions";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";

interface GenTTSProps {
  selectedVideoScript: string;
  setSelectedVideoScript: (field: string, data: string) => void;
}

export default function GenTTS({ selectedVideoScript, setSelectedVideoScript }: GenTTSProps) {
  const [loading, setLoading] = useState<boolean>(false);

  console.log("selectedVideoScript");
  console.log(selectedVideoScript);

  return (
    <div className="mt-5">
      <h2>Generate TTS</h2>
      <p className="text-sm text-gray-400">
        If you fine with the video style and script, click the button below to generate TTS.
      </p>

      <div className="mt-5">
        <h2>Check the TTS Script</h2>
        <Textarea
          value={selectedVideoScript}
          onChange={(event) => {
            setSelectedVideoScript("generateImageScript", event.target.value);
          }}
          className="mt-2"
          placeholder="Check the TTS Script..."
        />
      </div>

      {/* openai tts 연결 */}
      <Button
        className="bg-white text-black mt-4 cursor-pointer"
        disabled={loading}
        size={"sm"}
        // onClick={GenerateScript}
      >
        {loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <SparklesIcon className="w-4 h-4 mr-2" />}
        Generate TTS
      </Button>
    </div>
  );
}
