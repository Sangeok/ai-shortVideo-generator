import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { VideoStyleOptions } from "@/constants/VideoStyleOptions";

interface VideoStyleProps {
  onHandleInputChange: (fieldName: string, fieldValue: string) => void;
}

// export const options = [
//   {
//     name: "Realistic",
//     image: "/Realistic.png",
//   },
//   {
//     name: "Cinematic",
//     image: "/Cinematic.png",
//   },
//   {
//     name: "Cartoon",
//     image: "/Cartoon.png",
//   },
//   {
//     name: "Cyberpunk",
//     image: "/Cyberpunk.jpg",
//   },
// ] as const;

export default function VideoStyle({ onHandleInputChange }: VideoStyleProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  return (
    <div className="mt-5">
      <h2>Video Styles</h2>
      <p className="text-sm text-gray-400">Select Video Style</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3">
        {VideoStyleOptions?.map((option, index) => (
          <div
            className="relative"
            onClick={() => {
              setSelectedStyle(option.name);
              onHandleInputChange("videoStyle", option.name);
            }}
            key={index}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={500}
              height={120}
              className={clsx(
                "object-cover hover:border border-gray-300 cursor-pointer",
                selectedStyle === option.name && "border-2 border-gray-300"
              )}
            />
            <h2 className="absolute bottom-1 text-center w-full text-white">
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
