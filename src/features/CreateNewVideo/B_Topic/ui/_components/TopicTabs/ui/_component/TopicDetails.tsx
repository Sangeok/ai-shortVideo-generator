import { DetailsPlaceHolder } from "@/src/features/CreateNewVideo/B_Topic/constants/constants";
import { Textarea } from "@/src/shared/ui/atoms/Textarea";

interface TopicDetailsProps {
  topicDetail: string;
  topic: string;
  setTopicDetail: (fieldValue: string) => void;
}

export function TopicDetails({ topicDetail, topic, setTopicDetail }: TopicDetailsProps) {
  return (
    <div>
      <h2>Enter your own topic</h2>
      <Textarea
        value={topicDetail}
        onChange={(event) => {
          setTopicDetail(event.target.value);
        }}
        className="mt-2"
        placeholder={DetailsPlaceHolder[topic as keyof typeof DetailsPlaceHolder]}
      />
    </div>
  );
}
