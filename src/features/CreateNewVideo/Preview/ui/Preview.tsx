"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";
import DontHaveImagePreview from "./_component/DontHaveImagePreview";

export default function Preview() {
  const imageUrl = useCreateVideoStore(
    (state) => state.initialCreateVideoData.imageUrl
  );
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

  const hasImage = imageUrl?.length > 0;
  const canTurnOverImage = imageUrl.length >= 2;

  return (
    <div>
      <h2 className="text-xl font-semibold">Preview</h2>
      {!hasImage && <DontHaveImagePreview />}
      {hasImage && (
        <div className="relative mt-1">
          <Image
            src={imageUrl[currentImageIndex].imageUrl}
            alt={`preview-image-${currentImageIndex}`}
            width={1000}
            height={300}
            className="w-full h-[68vh] object-cover rounded-xl"
          />

          {canTurnOverImage && (
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
      )}
    </div>
  );
}
