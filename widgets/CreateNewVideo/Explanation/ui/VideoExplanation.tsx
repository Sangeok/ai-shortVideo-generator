import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/shared/ui/molecule/LoadingButton";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { SparklesIcon } from "lucide-react";
import { useState } from "react";

interface VideoExplanationProps {
  topic: string;
  topicDetail: string;
  language: "English" | "Korean";
}

export default function VideoExplanation({
  topic,
  topicDetail,
  language,
}: VideoExplanationProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");

  const GenerateExplanation = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/generate-explanation", {
        topic,
        topicDetail,
        language,
      });

      setExplanation(response.data.explanation);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <h2 className="text-xl">Generate Explanation</h2>
      <p className="text-sm text-gray-400">
        If you fine with the video topic and script, click the button below to
        generate explanation.
      </p>

      <LoadingButton
        loading={loading}
        Content="Generate Explanation"
        onClick={GenerateExplanation}
        className="mt-8"
      />

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resExplanation">Explanation Result</label>
        <Textarea
          value={explanation}
          disabled={true}
          className="mt-2"
          placeholder="Check the Explanation..."
        />
      </div>
    </div>
  );
}
