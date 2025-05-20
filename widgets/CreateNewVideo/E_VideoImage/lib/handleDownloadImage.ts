import { ImageUrlType } from "@/type/ImageUrlType";

export const handleDownloadImage = async (
  index: number,
  imageUrl: ImageUrlType[]
) => {
  const imgItem = imageUrl.find((img) => img.imageId === index);
  if (!imgItem) return;

  // imageUrl이 절대경로인지 상대경로(파일명)인지 판별
  const isAbsoluteUrl = /^(http|https):\/\//.test(imgItem.imageUrl);
  const imageSrc = isAbsoluteUrl
    ? imgItem.imageUrl
    : `/generated-images/${imgItem.imageUrl}`;

  try {
    // 이미지 fetch 및 blob 변환
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    // 이미지 객체 생성
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    const url = URL.createObjectURL(blob);
    img.src = url;
    img.onload = () => {
      // 1080x1080 canvas 생성 및 draw
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 1080, 1080);
      const dataUrl = canvas.toDataURL("image/png");
      // 다운로드 트리거
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `생성된_이미지_${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  } catch (error) {
    console.error("이미지 다운로드 오류:", error);
  }
};
