import { ImageUrlType } from "@/src/shared/lib/type/ImageUrlType";
import { useState } from "react";

export const useImageDownload = () => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = (index: number, imageUrl: ImageUrlType[]) => {
    const imgItem = imageUrl.find((img) => img.imageId === index);
    if (!imgItem) return;

    setDownloading(true);
    setError(null);

    // 새로운 Image 객체를 메모리에 생성
    const img = new Image();

    img.crossOrigin = "anonymous";

    // 이미지 로딩이 완료되었을 때 실행될 로직
    img.onload = () => {
      // 보이지 않는 Canvas 엘리먼트를 생성
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;

      // Canvas의 2D 컨텍스트를 가져옴
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Could not get canvas context");
        setDownloading(false);
        return;
      }

      // 원본 이미지를 Canvas에 원하는 크기(1080x1080)로 그림
      // drawImage(image, dx, dy, dWidth, dHeight)
      ctx.drawImage(img, 0, 0, 1080, 1080);

      // Canvas의 내용을 Blob 데이터로 변환 (이미지 파일 데이터)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Canvas to Blob conversion failed");
            setDownloading(false);
            return;
          }

          // 이전과 동일하게 Blob URL을 생성하여 다운로드를 실행
          const localUrl = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = localUrl;
          link.setAttribute("download", `생성된 이미지_${index + 1}`);
          document.body.appendChild(link);

          link.click();

          // 리소스 정리
          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(localUrl);

          setDownloading(false);
        },
        "image/png",
        0.95
      );
    };

    // 이미지 로딩 실패 시 에러 처리
    img.onerror = () => {
      setError("Failed to load image. Check CORS policy or image URL.");
      setDownloading(false);
    };

    // 위에서 설정한 로직들이 실행되도록 이미지 소스를 할당
    img.src = imgItem.imageUrl;
  };

  return { handleDownload, downloading, error };
};
