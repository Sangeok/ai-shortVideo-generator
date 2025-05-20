import { useRef } from "react";

export default function TTSPlayer({ ttsUrl }: { ttsUrl: string }) {
  const audioRef = useRef(null);

  return (
    <>
      {ttsUrl && (
        <div className="mt-4">
          <audio ref={audioRef} controls className="w-full mt-2">
            <source src={ttsUrl} type="audio/mpeg" />
            브라우저가 오디오 요소를 지원하지 않습니다.
          </audio>
        </div>
      )}
    </>
  );
}
