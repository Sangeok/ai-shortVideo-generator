import { CreateVideoField } from "@/src/shared/lib/type/CreateVideoField";
import { ImageUrlType } from "@/src/shared/lib/type/ImageUrlType";
import { videoScriptType } from "@/src/shared/lib/type/videoScriptType";
import { VideoStyleOptionsType } from "@/src/shared/lib/type/VideoStyleOptions";
import { create } from "zustand";

type CreateVideoType = {
  title: string;
  topic: string;
  topicDetail: string;
  videoScript: videoScriptType[]; // 생성된 2개의 youtube script
  videoCaption: string;
  imageUrl: ImageUrlType[];
  language: "English" | "Korean";
  generateImage: {
    generateImageStyle: VideoStyleOptionsType;
    generateImageScript: videoScriptType | null; // 생성된 2개의 youtube script 중 하나
  };
  ttsUrl: string;
  captions: string;
  ttsFileUrl: string;
};

const initialCreateVideoData: CreateVideoType = {
  title: "",
  topic: "",
  topicDetail: "",
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
  ttsFileUrl: "",
};

interface CreateVideoStore {
  initialCreateVideoData: CreateVideoType;
  setCreateVideoDataByField: (
    field: CreateVideoField,
    data: string | ImageUrlType[] | any
  ) => void;
  setGenerateImageDataByFied: (
    field1: string,
    data: VideoStyleOptionsType | videoScriptType
  ) => void;
  setTts: (data1: string, data2: string) => void;
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

  setTts: (data1: string, data2: string) =>
    set((state) => ({
      initialCreateVideoData: {
        ...state.initialCreateVideoData,
        ttsUrl: data1,
        ttsFileUrl: data2,
      },
    })),
}));

export default useCreateVideoStore;
