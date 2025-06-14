import { Textarea } from "@/components/ui/textarea";
import { CreateVideoField } from "@/shared/lib/type/CreateVideoField";
import { DetailsPlaceHolder } from "../../../constants/constants";

interface TopicDetailsProps {
  topicDetail: string;
  topic: string;
  setTopicDetail: (fieldName: CreateVideoField, fieldValue: string) => void;
}

export function TopicDetails({
  topicDetail,
  topic,
  setTopicDetail,
}: TopicDetailsProps) {
  return (
    <div>
      <h2>Enter your own topic</h2>
      <Textarea
        value={topicDetail}
        onChange={(event) => {
          setTopicDetail("topicDetail", event.target.value);
        }}
        className="mt-2"
        placeholder={
          DetailsPlaceHolder[topic as keyof typeof DetailsPlaceHolder]
        }
      />
    </div>
  );
}
