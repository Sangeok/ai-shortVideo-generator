import { LoadingButton } from "@/shared/ui/molecule/LoadingButton";
import ExplanationResult from "./_component/ExplanationResult";
import { useGenExplanation } from "../model/hooks/useGenExplanation";

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
  const { loading, explanation, GenerateExplanation } = useGenExplanation({
    topic,
    topicDetail,
    language,
  });

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

      <ExplanationResult explanation={explanation} />
    </div>
  );
}
