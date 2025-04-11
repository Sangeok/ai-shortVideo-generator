import { CreateVideoField } from "@/type/CreateVideoField";
import { ImageUrlType } from "@/type/ImageUrlType";
import { videoScriptType } from "@/type/videoScriptType";
import { VideoStyleOptionsType } from "@/type/VideoStyleOptions";
import { create } from "zustand";

type CreateVideoType = {
  title: string;
  topic: string;
  videoScript: videoScriptType[];
  videoCaption: string;
  imageUrl: ImageUrlType[];
  language: "English" | "Korean";
  generateImage: {
    generateImageStyle: VideoStyleOptionsType;
    generateImageScript: videoScriptType | null;
  };
  ttsUrl: string;
  captions: string;
};

const initialCreateVideoData: CreateVideoType = {
  title: "",
  topic: "",
  videoScript: [],
  videoCaption: "",
  imageUrl: [],
  language: "English",
  generateImage: {
    generateImageStyle: "",
    generateImageScript: null,
  },
  ttsUrl: "",
  captions: "",
};

interface CreateVideoStore {
  initialCreateVideoData: CreateVideoType;
  setCreateVideoDataByField: (
    field: CreateVideoField,
    data: string | ImageUrlType[]
  ) => void;
  setGenerateImageDataByFied: (
    field1: string,
    data: VideoStyleOptionsType | videoScriptType
  ) => void;
  // setSelectedVideoScript: (field: string, data: string) => void;
  // setGenerateImageDataByField: (field: CreateVideoField, data: string) => void;
}

const useCreateVideoStore = create<CreateVideoStore>((set) => ({
  initialCreateVideoData: initialCreateVideoData,

  setCreateVideoDataByField: (
    field: CreateVideoField,
    data: string | ImageUrlType[]
  ) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        [field]: data,
      },
    })),

  setGenerateImageDataByFied: (
    field: string,
    data: VideoStyleOptionsType | videoScriptType
  ) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        generateImage: {
          ...state.initialCreateVideoData.generateImage,
          [field]: data,
        },
      },
    })),

  // setSelectedVideoScript: (field: string, data: string) =>
  //   set((state) => ({
  //     initialCreateVideoData: {
  //       ...state.initialCreateVideoData,
  //       generateImage: {
  //         ...state.initialCreateVideoData.generateImage,
  //         generateImageScript: {
  //           ...state.initialCreateVideoData,
  //         },
  //       },
  //     },
  //   })),
  //         ...state.initialCreateVideoData.generateImage,
  //         [field]: data,
  //       },
  //     },
  //   })),
}));

export default useCreateVideoStore;
