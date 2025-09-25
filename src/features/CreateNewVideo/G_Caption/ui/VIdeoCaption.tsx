"use client";

import { downloadSRT } from "../lib/downloadSRT";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import { useGenCaption } from "../model/hooks/useGenCaption";
import { DownloadIcon } from "lucide-react";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";
import { Button } from "@/src/shared/ui/atoms/Button/Button";

export default function VideoCaption() {
  const language = useCreateVideoStore((state) => state.initialCreateVideoData.language);
  const ttsUrl = useCreateVideoStore((state) => state.initialCreateVideoData.ttsUrl);
  const setCaptions = useCreateVideoStore((state) => state.setCreateVideoDataByField);

  const { loading, srtContent, GenerateCaptions } = useGenCaption({
    ttsUrl,
    language,
    setCaptions,
  });

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Captions</h2>
        <p className="text-sm text-gray-400">Generate captions from TTS audio.</p>
      </header>

      <div className="flex w-full justify-between gap-2">
        <LoadingButton loading={loading} Content="Generate Captions" onClick={GenerateCaptions} className="mt-4" />

        {srtContent && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 cursor-pointer"
            size={"sm"}
            onClick={() => downloadSRT(srtContent)}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download SRT
          </Button>
        )}
      </div>
    </div>
  );
}
