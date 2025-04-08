import clsx from "clsx";
import Image from "next/image";
import { VideoStyleOptions } from "@/constants/VideoStyleOptions";

interface VideoStyleProps {
  videoStyle: string;
  setVideoStyle: (fieldName: string, fieldValue: string) => void;
}

export default function VideoStyle({
  videoStyle,
  setVideoStyle,
}: VideoStyleProps) {
  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <h2 className="text-xl">Video Styles</h2>
      <p className="text-sm text-gray-400">Select Video Style</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3">
        {VideoStyleOptions?.map((option, index) => (
          <div
            className="relative"
            onClick={() => {
              setVideoStyle("generateImageStyle", option.name);
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
                videoStyle === option.name && "border-2 border-gray-300"
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
