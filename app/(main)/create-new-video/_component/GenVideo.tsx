"use client";

import { Button } from "@/components/ui/button";
import useCreateVideoStore from "@/store/useCreateVideoStore";
import axios from "axios";
import { DownloadIcon, Film, Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";

export default function GenVideo() {
  const { initialCreateVideoData, setCreateVideoDataByField } = useCreateVideoStore();
  const { ttsUrl, captions, imageUrl } = initialCreateVideoData;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const generateVideo = async () => {
    if (!ttsUrl || !captions || imageUrl.length === 0) {
      setError("TTS, captions, and images are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 오디오 Blob URL에서 데이터 가져오기
      const audioResponse = await fetch(ttsUrl);
      const audioBlob = await audioResponse.blob();

      // FormData 생성
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.mp3");
      formData.append("captions", captions);

      // 이미지 URL 추가
      imageUrl.forEach((img, index) => {
        formData.append(`imageUrls`, img.imageUrl);
      });

      // 비디오 생성 API 호출
      const response = await axios.post("/api/generate-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      // 응답이 Blob인 경우 URL 생성
      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);

      // 비디오 URL을 스토어에 저장 (선택사항)
      // setCreateVideoDataByField("videoUrl", url);
    } catch (err) {
      console.error("비디오 생성 오류:", err);
      setError("비디오 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `video_${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Video</h2>
        <p className="text-sm text-gray-400">Generate video from TTS, captions, and images.</p>
      </header>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="flex w-full justify-between gap-2">
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading || !ttsUrl || !captions || imageUrl.length === 0}
          size={"sm"}
          onClick={generateVideo}
        >
          {loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <Film className="w-4 h-4 mr-2" />}
          Generate Video
        </Button>

        {videoUrl && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 cursor-pointer"
            size={"sm"}
            onClick={downloadVideo}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Video
          </Button>
        )}
      </div>

      {videoUrl && (
        <div className="mt-4">
          <h3 className="text-lg mb-2">Video Preview</h3>
          <video controls className="w-full rounded-md border border-gray-300" src={videoUrl} />
        </div>
      )}
    </div>
  );
}
