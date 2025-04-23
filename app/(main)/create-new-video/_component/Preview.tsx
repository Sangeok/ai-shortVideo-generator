"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageUrlType } from "@/type/ImageUrlType";

interface PreviewProps {
  imageUrl: ImageUrlType[];
}

export default function Preview({ imageUrl }: PreviewProps) {
  console.log("imageUrl");
  console.log(imageUrl);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 변경될 때 index 초기화
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [imageUrl]);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrl.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrl.length - 1 : prev - 1
    );
  };

  if (imageUrl?.length === 0) {
    return (
      <div className="mt-1 w-full h-[68vh] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-center p-4">
        If you want to see the preview, please generate the script first.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Preview</h2>
      {imageUrl?.length > 0 ? (
        <div className="relative mt-1">
          <Image
            src={"/generated-images/" + imageUrl[currentImageIndex].imageUrl}
            alt={`preview-image-${currentImageIndex}`}
            width={1000}
            height={300}
            className="w-full h-[68vh] object-cover rounded-xl"
          />

          {imageUrl.length >= 2 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {imageUrl.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mt-1 w-full h-[68vh] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-center p-4">
          If you want to see the preview, please generate the script first.
        </div>
      )}
    </div>
  );
}
