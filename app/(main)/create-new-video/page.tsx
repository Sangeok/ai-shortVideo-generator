"use client";

import ToggleSideBarButton from "@/app/_components/ToggleSideBarButton";
import Topic from "./_component/Topic";
import { useState } from "react";
import VideoStyle from "./_component/VideoStyle";

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
      <div className="grid grid-cols-1 md:grid-cols-3 p-4">
        <div className="col-span-2 p-7 border rounded-xl">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />
          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          {/* Voice */}

          {/* Captions */}
        </div>
        <div></div>
      </div>
    </div>
  );
}
