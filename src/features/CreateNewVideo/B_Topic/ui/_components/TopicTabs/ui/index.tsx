// components/TopicTabs/index.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui/atoms/tabs";
import { MainTopicList } from "./_component/MainTopicList";
import { TopicDetails } from "./_component/TopicDetails";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export function TopicTabs() {
  const topic = useCreateVideoStore((state) => state.initialCreateVideoData.topic);
  const topicDetail = useCreateVideoStore((state) => state.initialCreateVideoData.topicDetail);

  const setVideoTopic = (fieldValue: string) => {
    useCreateVideoStore.getState().setCreateVideoDataByField("topic", fieldValue);
  };

  const setTopicDetail = (fieldValue: string) => {
    useCreateVideoStore.getState().setCreateVideoDataByField("topicDetail", fieldValue);
  };

  return (
    <Tabs defaultValue="MainTopics" className="w-full mt-2">
      <TabsList className="bg-zinc-800">
        <TabsTrigger value="MainTopics" className="data-[state=active]:bg-black data-[state=active]:text-white">
          Main Topics
        </TabsTrigger>
        <TabsTrigger value="Details" className="data-[state=active]:bg-black data-[state=active]:text-white">
          Details
        </TabsTrigger>
      </TabsList>
      <TabsContent value="MainTopics">
        <MainTopicList topic={topic} setVideoTopic={setVideoTopic} />
      </TabsContent>
      <TabsContent value="Details">
        <TopicDetails topicDetail={topicDetail} topic={topic} setTopicDetail={setTopicDetail} />
      </TabsContent>
    </Tabs>
  );
}
