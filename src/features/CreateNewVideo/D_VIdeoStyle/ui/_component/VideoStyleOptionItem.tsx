import { videoScriptType } from "@/src/shared/lib/type/videoScriptType";
import { VideoStyleOptions } from "../../constants/constants";
import { VideoStyleOptionsType } from "@/src/shared/lib/type/VideoStyleOptions";
import Image from "next/image";
import clsx from "clsx";

export default function VideoStyleOptionItem({
  videoStyle,
  setVideoStyle,
}: {
  videoStyle: string;
  setVideoStyle: (
    field: string,
    data: VideoStyleOptionsType | videoScriptType
  ) => void;
}) {
  return (
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
  );
}
