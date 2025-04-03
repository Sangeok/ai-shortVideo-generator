import { CreateVideoField } from "@/type/CreateVideoField";
import { VideoStyleOptions } from "@/type/VideoStyleOptions";
import { create } from "zustand";

type CreateVideoType = {
  title: string;
  imageScript: string;
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
  imageScript: "",
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
  setGenerateImageDataTwoFields: (
    field1: CreateVideoField,
    field2: CreateVideoField,
    data: string | VideoStyleOptions
  ) => void;
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

  setGenerateImageDataTwoFields: (
    field1: CreateVideoField,
    field2: CreateVideoField,
    data: string | VideoStyleOptions
  ) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        [field1]: data,
        generateImage: {
          ...state.initialCreateVideoData.generateImage,
          [field2]: data,
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
