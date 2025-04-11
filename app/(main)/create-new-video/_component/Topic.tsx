"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { clsx } from "clsx";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";

import axios from "axios";
import { CreateVideoField } from "@/type/CreateVideoField";
import { videoScriptType } from "@/type/videoScriptType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const suggestion = [
  "Historic Story",
  "Kids Story",
  "Movie Story",
  "AI Innovation",
] as const;

interface TopicProps {
  topic: string;
  language: "English" | "Korean";
  setVideoTopic: (fieldName: CreateVideoField, fieldValue: string) => void;
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
  language,
  setVideoTopic,
  setVideoScript,
  setSelectedVideoScript,
  setLanguage,
  videoScript,
}: TopicProps) {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(
    0
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelectVideoScript = (index: number) => {
    console.log("videoScript[index]");
    console.log(videoScript[index]);

    setSelectedScriptIndex(index);
    setSelectedVideoScript("generateImageScript", videoScript[index]);
  };

  console.log("videoScript");
  console.log(videoScript);

  const GenerateScript = async () => {
    setLoading(true);
    setSelectedScriptIndex(null);
    try {
      const result = await axios.post("/api/generate-script", {
        topic,
        language,
      });
      console.log(result.data);
      setVideoScript("videoScript", result?.data?.scripts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setVideoTopic("topic", "");
    }
  };

  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="mt-6">
        <h2 className="text-xl">Video Topic</h2>
        <p className="text-sm text-gray-400">Select topic for you video</p>
        <Tabs defaultValue="Suggestions" className="w-full mt-2">
          <TabsList className="bg-zinc-800">
            <TabsTrigger
              value="Suggestions"
              onChange={() => setVideoTopic("topic", "")}
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Suggestions
            </TabsTrigger>
            <TabsTrigger
              value="My_Topics"
              onChange={() => setVideoTopic("topic", "")}
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              My Topics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Suggestions">
            <div className="">
              {suggestion.map((suggestion, index) => (
                <Button
                  onClick={() => {
                    setVideoTopic("topic", suggestion);
                  }}
                  className={clsx(
                    "border border-zinc-700 hover:bg-zinc-800 cursor-pointer m-1",
                    topic === suggestion && "bg-gray-700"
                  )}
                  key={index}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="My_Topics">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                onChange={(event) => {
                  setVideoTopic("topic", event.target.value);
                }}
                className="mt-2"
                placeholder="Enter your own topic..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
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

        {videoScript?.length > 0 && (
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
        )}
      </div>
      <Button
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
      </Button>
    </div>
  );
}
