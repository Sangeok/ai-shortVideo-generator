import { Button } from "@/src/shared/ui/atoms/Button";
import clsx from "clsx";
import { SparklesIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";

interface LoadingButtonProps {
  loading: boolean;
  Content: string;
  onClick: () => void;

  className?: string;
}

export const LoadingButton = ({
  loading,
  className,
  Content,
  onClick,
}: LoadingButtonProps) => {
  return (
    <Button
      className={clsx("bg-white text-black cursor-pointer", className)}
      disabled={loading}
      onClick={onClick}
      size={"sm"}
    >
      {loading ? (
        <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <SparklesIcon className="w-4 h-4 mr-2" />
      )}
      {Content}
    </Button>
  );
};
