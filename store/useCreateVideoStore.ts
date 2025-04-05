import { CreateVideoField } from "@/type/CreateVideoField";
import { videoScriptType } from "@/type/videoScriptType";
import { VideoStyleOptions } from "@/type/VideoStyleOptions";
import { create } from "zustand";

type CreateVideoType = {
  title: string;
  topic: string;
  videoScript: videoScriptType[];
  videoStyle: VideoStyleOptions;
  videoCaption: string;
  imageUrl: string;
  generateImage: {
    generateImageStyle: VideoStyleOptions;
    generateImageScript: string;
  };
};

const initialCreateVideoData: CreateVideoType = {
  title: "",
  topic: "",
  videoScript: [],
  videoStyle: "",
  videoCaption: "",
  imageUrl: "",
  generateImage: {
    generateImageStyle: "",
    generateImageScript: "",
  },
};

interface CreateVideoStore {
  initialCreateVideoData: CreateVideoType;
  setCreateVideoDataByField: (field: CreateVideoField, data: string) => void;
  setGenerateImageDataByFied: (field1: string, data: string | VideoStyleOptions) => void;
  setGenerateImageDataByField: (field: CreateVideoField, data: string) => void;
}

const useCreateVideoStore = create<CreateVideoStore>((set) => ({
  initialCreateVideoData: initialCreateVideoData,

  setCreateVideoDataByField: (field: CreateVideoField, data: string) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        [field]: data,
      },
    })),

  setGenerateImageDataByFied: (field: string, data: string | VideoStyleOptions) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        generateImage: {
          ...state.initialCreateVideoData.generateImage,
          [field]: data,
        },
      },
    })),

  setGenerateImageDataByField: (field: CreateVideoField, data: string) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        generateImage: {
          ...state.initialCreateVideoData.generateImage,
          [field]: data,
        },
      },
    })),
}));

export default useCreateVideoStore;
