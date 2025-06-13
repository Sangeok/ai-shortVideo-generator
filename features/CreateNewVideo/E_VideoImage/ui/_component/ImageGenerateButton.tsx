import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { SparklesIcon } from "lucide-react";

export default function ImageGenerateButton({
  isDone,
  isLoading,
  onClick,
}: {
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
