// components/TopicTabs/index.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateVideoField } from "@/shared/lib/type/CreateVideoField";
import { MainTopicList } from "./MainTopicList";
import { TopicDetails } from "./TopicDetails";

interface TopicTabsProps {
  topic: string;
  topicDetail: string;
  setVideoTopic: (fieldName: CreateVideoField, fieldValue: string) => void;
  setTopicDetail: (fieldName: CreateVideoField, fieldValue: string) => void;
}

export function TopicTabs({
  topic,
  topicDetail,
  setVideoTopic,
  setTopicDetail,
}: TopicTabsProps) {
  return (
    <Tabs defaultValue="MainTopics" className="w-full mt-2">
      <TabsList className="bg-zinc-800">
        <TabsTrigger
          value="MainTopics"
          className="data-[state=active]:bg-black data-[state=active]:text-white"
        >
          Main Topics
        </TabsTrigger>
        <TabsTrigger
          value="Details"
          className="data-[state=active]:bg-black data-[state=active]:text-white"
        >
          Details
        </TabsTrigger>
      </TabsList>
      <TabsContent value="MainTopics">
        <MainTopicList topic={topic} setVideoTopic={setVideoTopic} />
      </TabsContent>
      <TabsContent value="Details">
        <TopicDetails
          topicDetail={topicDetail}
          topic={topic}
          setTopicDetail={setTopicDetail}
        />
      </TabsContent>
    </Tabs>
  );
}
