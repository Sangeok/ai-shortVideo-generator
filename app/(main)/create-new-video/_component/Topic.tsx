"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { clsx } from "clsx";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";

import axios from "axios";

const suggestion = ["Historic Story", "Kids Story", "Movie Story", "AI Innovation"];

interface TopicProps {
  onHandleInputChange: (fieldName: string, fieldValue: string) => void;
}

export default function Topic({ onHandleInputChange }: TopicProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(0);
  const [script, setScript] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const GenerateScript = async () => {
    setLoading(true);
    setSelectedScriptIndex(null);
    try {
      const result = await axios.post("/api/generate-script", { topic: selectedTopic });
      console.log(result.data);
      setScript(result?.data?.scripts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-2">Project Title</h2>
      <Input
        placeholder="Enter Proejct Title..."
        onChange={(event) => onHandleInputChange("title", event?.target.value)}
      />
      <div className="mt-6">
        <h2>Video Topic</h2>
        <p className="text-sm text-gary-600">Select topic for you video</p>
        <Tabs defaultValue="Suggestions" className="w-full mt-2">
          <TabsList className="bg-zinc-800">
            <TabsTrigger value="Suggestions" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="My_Topics" className="data-[state=active]:bg-black data-[state=active]:text-white">
              My Topics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Suggestions">
            <div className="">
              {suggestion.map((suggestion, index) => (
                <Button
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                  }}
                  className={clsx(
                    "border border-zinc-700 hover:bg-zinc-800 cursor-pointer m-1",
                    selectedTopic === suggestion && "bg-gray-700"
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
                onChange={(event) => onHandleInputChange("topic", event.target.value)}
                className="mt-2"
                placeholder="Enter your own topic..."
              />
            </div>
          </TabsContent>
        </Tabs>

        {script?.length > 0 && (
          <div className="mt-4">
            <h2>Select the Script</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {script.map((script, index) => (
                <div
                  onClick={() => setSelectedScriptIndex(index)}
                  key={index}
                  className={clsx(
                    "p-3 border rounded-lg cursor-pointer",
                    selectedScriptIndex === index && "bg-zinc-700"
                  )}
                >
                  <h2 className="line-clamp-3 text-sm text-gray-500">{script.content}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {script?.length === 0 && (
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading}
          size={"sm"}
          onClick={GenerateScript}
        >
          {loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <SparklesIcon className="w-4 h-4 mr-2" />}
          Generate Script
        </Button>
      )}
    </div>
  );
}
