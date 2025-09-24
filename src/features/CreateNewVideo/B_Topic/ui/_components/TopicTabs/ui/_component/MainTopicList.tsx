import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { MainTopic } from "../../../../../constants/constants";

interface MainTopicListProps {
  topic: string;
  setVideoTopic: (fieldValue: string) => void;
}

export function MainTopicList({ topic, setVideoTopic }: MainTopicListProps) {
  return (
    <div>
      {MainTopic.map((mainTopicItem, index) => (
        <Button
          onClick={() => {
            setVideoTopic(mainTopicItem);
          }}
          className={clsx(
            "border border-zinc-700 hover:bg-zinc-800 cursor-pointer m-1",
            topic === mainTopicItem && "bg-gray-700"
          )}
          key={index}
        >
          {mainTopicItem}
        </Button>
      ))}
    </div>
  );
}
