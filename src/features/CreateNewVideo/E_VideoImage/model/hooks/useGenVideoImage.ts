import { CreateVideoField } from "@/src/shared/lib/type/CreateVideoField";
import { ImageUrlType } from "@/src/shared/lib/type/ImageUrlType";
import axios from "axios";
import React from "react";

export const useGenVideoImage = ({
  resVideoScript,
  setLoading,
  imageUrl,
  setImageUrl,
  setIsDoneCreateImage,
}: {
  resVideoScript: any[];
  setLoading: (loading: boolean) => void;
  imageUrl: ImageUrlType[];
  setImageUrl: (fieldName: CreateVideoField, fieldValue: ImageUrlType[]) => void;
  setIsDoneCreateImage: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) => {
  const GenerateImage = async (index: number) => {
    const imagePrompt = resVideoScript[index].imagePrompt;

    setLoading(true);
    try {
      const result = await axios.post("/api/generate-image", {
        imagePrompt: imagePrompt,
      });

      console.log("result", result);

      if (imageUrl.length > 0 && imageUrl[index]?.imageUrl) {
        const updatedImageUrl: ImageUrlType[] = imageUrl.map((item, i) =>
          item.imageId === index
            ? {
                imageId: index,
                imageUrl: result?.data.data.imageUrl,
                cloudinaryUrl: "",
              }
            : item
        );
        setImageUrl("imageUrl", updatedImageUrl);
      } else {
        const imageUrlData = {
          imageId: index,
          imageUrl: result?.data.data.imageUrl,
          cloudinaryUrl: "",
        };
        const updatedImageUrl: ImageUrlType[] = [...imageUrl, imageUrlData];
        setImageUrl("imageUrl", updatedImageUrl);
      }

      // 이미지 생성 완료 시 상태 업데이트
      if (imagePrompt && result?.status === 200) {
        setIsDoneCreateImage((prev) => ({
          ...prev,
          [index]: true,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { GenerateImage };
};
