"use client";

import { useState } from "react";
import Image from "next/image";
import { options } from "./VideoStyle";

interface PreviewProps {
  formData: any;
}

export default function Preview({ formData }: PreviewProps) {
  const selectVideoStyle = formData && options.find((option) => option.name === formData?.videoStyle);

  return (
    <div>
      <h2 className="text-xl font-semibold">Preview</h2>
      {selectVideoStyle?.image ? (
        <Image
          src={selectVideoStyle.image}
          alt="selectVideoStyle"
          width={1000}
          height={300}
          className="w-full h-[68vh] object-cover rounded-xl mt-1"
        />
      ) : (
        <div className="mt-1 w-full h-[68vh] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-center p-4">
          If you want to see the preview, please generate the script first.
        </div>
      )}
    </div>
  );
}
