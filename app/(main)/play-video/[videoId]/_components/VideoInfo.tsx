import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowBigLeftDash, DownloadIcon } from "lucide-react";
import Link from "next/link";

export default function VideoInfo({ videoData }: { videoData: any }) {
  const { captions, ttsFileUrl, imageUrl, title, videoStyle } = videoData;

  const script = captions?.results?.channels[0]?.alternatives[0]?.transcript;

  const handleGenerateVideo = async () => {
    const response = await axios.post("/api/generate-video", {
      ttsFileUrl,
      imageUrl,
      captions,
    });

    console.log("kkkkkkkkkk");
    console.log(response);
  };

  return (
    <div className="flex flex-col p-5 rounded-xl border">
      <Link href="/dashboard">
        <h2 className="flex gap-2 items-center">
          <ArrowBigLeftDash />
          Back To Dashboard
        </h2>
      </Link>
      <div className="flex flex-col gap-3">
        <h2 className="mt-5">Project Name : {title}</h2>
        <p>Video Style : {videoStyle}</p>
        <p className="text-gray-500">Script : {script}</p>
        <Button className="bg-white text-black" onClick={handleGenerateVideo}>
          <DownloadIcon />
          Export & Download
        </Button>
      </div>
    </div>
  );
}
