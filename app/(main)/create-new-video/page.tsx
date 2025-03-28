"use client";

import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import Topic from "./_component/Topic";
import { useState } from "react";
import VideoStyle from "./_component/VideoStyle";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import Preview from "./_component/Preview";
import GenImage from "./_component/GenImage";

export default function CreateNewVideo() {
  const [formData, setFormData] = useState<any>({});

  const onHandleInputChange = (fieldName: any, fieldValue: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));

    console.log(formData);
  };

  return (
    <div>
      <ToggleSideBarButton />

      <h2 className="text-2xl font-bold mt-2 p-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-y-auto">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />
          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <GenImage />
          <Button className="bg-white text-black mt-5 w-full cursor-pointer">
            <WandSparkles /> Generate Video Prompt
          </Button>
        </div>
        <div>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
}
