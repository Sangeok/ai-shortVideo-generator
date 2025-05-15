import { Textarea } from "@/components/ui/textarea";

interface ExplanationResultProps {
  explanation: string;
}

export default function ExplanationResult({
  explanation,
}: ExplanationResultProps) {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <label htmlFor="resExplanation">Explanation Result</label>
      <Textarea
        value={explanation}
        disabled={true}
        className="mt-2"
        placeholder="Check the Explanation..."
      />
    </div>
  );
}
