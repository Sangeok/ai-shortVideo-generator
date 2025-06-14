"use client";

import { useState } from "react";
import { CreateVideoField } from "@/shared/lib/type/CreateVideoField";
import { videoScriptType } from "@/shared/lib/type/videoScriptType";
import { useGenYoutubeScript } from "../model/hooks/useGenYoutubeScript";
import { LoadingButton } from "@/shared/ui/molecule/LoadingButton";
import { TopicTabs } from "./_components/TopicTabs";
import { LanguageSelector } from "./_components/LanguageSelector";
import { ScriptDisplay } from "./_components/ScriptDisplay";

interface TopicProps {
  topic: string;
  topicDetail: string;
  language: "English" | "Korean";
  setVideoTopic: (fieldName: CreateVideoField, fieldValue: string) => void;
  setTopicDetail: (fieldName: CreateVideoField, fieldValue: string) => void;
  setSelectedVideoScript: (
    fieldName: string,
    fieldValue: videoScriptType
  ) => void;
  setVideoScript: (fieldName1: CreateVideoField, fieldValue: string) => void;
  setLanguage: (fieldName: CreateVideoField, fieldValue: string) => void;
  videoScript: videoScriptType[];
}

export default function Topic({
  topic,
  topicDetail,
  language,
  setVideoTopic,
  setTopicDetail,
  setVideoScript,
  setSelectedVideoScript,
  setLanguage,
  videoScript,
}: TopicProps) {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(
    0
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelectVideoScript = (index: number) => {
    setSelectedScriptIndex(index);
    setSelectedVideoScript("generateImageScript", videoScript[index]);
  };

  const { loading, GenerateScript } = useGenYoutubeScript({
    topic,
    language,
    topicDetail,
    setVideoScript,
    setSelectedScriptIndex,
  });
  // const [loading, setLoading] = useState<boolean>(false);

  // const GenerateScript = async () => {
  //   setLoading(true);
  //   setSelectedScriptIndex(null);
  //   try {
  //     const result = await axios.post("/api/generate-youtubeScript", {
  //       topic,
  //       language,
  //       topicDetail,
  //       // speakerPersona,
  //     });
  //     console.log(result.data);
  //     setVideoScript("videoScript", result?.data?.scripts);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="mt-6">
        <h2 className="text-xl">Video Topic</h2>
        <p className="text-sm text-gray-400">Select topic for you video</p>
        <TopicTabs
          topic={topic}
          topicDetail={topicDetail}
          setVideoTopic={setVideoTopic}
          setTopicDetail={setTopicDetail}
        />
        {/* <Tabs defaultValue="MainTopics" className="w-full mt-2">
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
            <div className="">
              {MainTopic.map((mainTopicItem, index) => (
                <Button
                  onClick={() => {
                    setVideoTopic("topic", mainTopicItem);
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
          </TabsContent>
          <TabsContent value="Details">
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
          </TabsContent>
        </Tabs> */}

        <div className="mt-4 flex gap-8">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>

        {/* <div className="mt-4 flex gap-8">
          <div>
            <h2>Select the Language</h2>
            <Select
              value={language}
              onValueChange={(value) => setLanguage("language", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div> */}

        {/* {videoScript?.length > 0 && (
          <div className="mt-4">
            <h2>Select the Script</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {videoScript.map((script: any, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    onClick={() => handleSelectVideoScript(index)}
                    className={clsx(
                      "p-3 border rounded-lg cursor-pointer",
                      selectedScriptIndex === index && "bg-zinc-700"
                    )}
                  >
                    <h2 className="line-clamp-3 text-sm text-gray-500">
                      {language === "English"
                        ? script.content
                        : script.translatedContent}
                    </h2>
                  </div>

                  {hoveredIndex === index && (
                    <div className="absolute z-50 p-3 bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg text-sm text-white max-h-60 overflow-y-auto left-0 right-0 top-full mt-1 w-full">
                      {language === "English"
                        ? script.content
                        : script.translatedContent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}
        {videoScript?.length > 0 && (
          <ScriptDisplay
            videoScript={videoScript}
            language={language}
            selectedScriptIndex={selectedScriptIndex}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            handleSelectVideoScript={handleSelectVideoScript}
          />
        )}
      </div>
      <LoadingButton
        loading={loading}
        onClick={GenerateScript}
        Content={
          videoScript?.length > 0 ? "Generate New Script" : "Generate Script"
        }
        className="mt-4"
      />
      {/* <Button
        className="bg-white text-black mt-4 cursor-pointer"
        disabled={loading}
        size={"sm"}
        onClick={GenerateScript}
      >
        {loading ? (
          <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <SparklesIcon className="w-4 h-4 mr-2" />
        )}
        {videoScript?.length > 0 ? "Generate New Script" : "Generate Script"}
      </Button> */}
    </div>
  );
}
