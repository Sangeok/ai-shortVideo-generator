import { LoadingButton } from "@/shared/ui/molecule/LoadingButton";
import ExplanationResult from "@/widgets/CreateNewVideo/B_Explanation/ui/_component/ExplanationResult";
import axios from "axios";
import { useState } from "react";

interface GenExplanationProps {
  topic: string;
  topicDetail: string;
  language: "English" | "Korean";
}

export default function GenExplanation({
  topic,
  topicDetail,
  language,
}: GenExplanationProps) {
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

      {/* <Button
        className="bg-white text-black mt-8 cursor-pointer"
        size={"sm"}
        onClick={GenerateExplanation}
        disabled={loading}
      >
        {loading ? (
          <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <SparklesIcon className="w-4 h-4 mr-2" />
        )}
        Generate Explanation
      </Button> */}

      <ExplanationResult explanation={explanation} />

      {/* <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resExplanation">Explanation Result</label>
        <Textarea
          value={explanation}
          disabled={true}
          className="mt-2"
          placeholder="Check the Explanation..."
        />
      </div> */}
    </div>
  );
}
