import { CreateVideoField } from "@/src/shared/lib/type/CreateVideoField";
import { ImageUrlType } from "@/src/shared/lib/type/ImageUrlType";
import { useState } from "react";
import { videoScriptType } from "@/src/shared/lib/type/videoScriptType";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import { useGenImageScript } from "../model/hooks/useGenImageScript";
import { useGenVideoImage } from "../model/hooks/useGenVideoImage";
import { ScriptItem } from "./_component/ScriptItem";

export default function GenVideoImage({
  topic,
  topicDetail,
  language,
  imageUrl,
  videoStyle,
  videoScript,
  setImageUrl,
}: {
  topic: string;
  topicDetail: string;
  language: "English" | "Korean";
  imageUrl: ImageUrlType[];
  videoStyle: string;
  videoScript: videoScriptType | null;
  setImageUrl: (
    fieldName: CreateVideoField,
    fieldValue: ImageUrlType[]
  ) => void;
}) {
  console.log("imageUrl");
  console.log(imageUrl);

  const [isDoneCreateImage, setIsDoneCreateImage] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState<boolean>(false);

  const [resVideoScript, setResVideoScript] = useState<any[]>([]);

  const { GenerateScript } = useGenImageScript({
    videoStyle,
    videoScript: videoScript as videoScriptType,
    language,
    topic,
    topicDetail,
    setResVideoScript,
    setIsDoneCreateImage,
    setLoading,
  });

  const { GenerateImage } = useGenVideoImage({
    resVideoScript,
    setLoading,
    imageUrl,
    setImageUrl,
    setIsDoneCreateImage,
  });

  console.log("resVideoScript");
  console.log(resVideoScript);

  //   const handleDownloadImage = async (index: number) => {
  //     const imgItem = imageUrl.find((img) => img.imageId === index);
  //     if (!imgItem) return;

  //     // imageUrl이 절대경로인지 상대경로(파일명)인지 판별
  //     const isAbsoluteUrl = /^(http|https):\/\//.test(imgItem.imageUrl);
  //     const imageSrc = isAbsoluteUrl
  //       ? imgItem.imageUrl
  //       : `/generated-images/${imgItem.imageUrl}`;

  //     try {
  //       // 이미지 fetch 및 blob 변환
  //       const response = await fetch(imageSrc);
  //       const blob = await response.blob();
  //       // 이미지 객체 생성
  //       const img = new window.Image();
  //       img.crossOrigin = "anonymous";
  //       const url = URL.createObjectURL(blob);
  //       img.src = url;
  //       img.onload = () => {
  //         // 1080x1080 canvas 생성 및 draw
  //         const canvas = document.createElement("canvas");
  //         canvas.width = 1080;
  //         canvas.height = 1080;
  //         const ctx = canvas.getContext("2d");
  //         if (!ctx) return;
  //         ctx.drawImage(img, 0, 0, 1080, 1080);
  //         const dataUrl = canvas.toDataURL("image/png");
  //         // 다운로드 트리거
  //         const a = document.createElement("a");
  //         a.href = dataUrl;
  //         a.download = `생성된_이미지_${index + 1}.png`;
  //         document.body.appendChild(a);
  //         a.click();
  //         document.body.removeChild(a);
  //         URL.revokeObjectURL(url);
  //       };
  //     } catch (error) {
  //       console.error("이미지 다운로드 오류:", error);
  //     }
  //   };

  // const handleUploadImage = async (index: number) => {
  //   setLoading(true);
  //   const imgItem = imageUrl.find((img) => img.imageId === index);

  //   if (!imgItem) {
  //     alert("이미지를 찾을 수 없습니다.");
  //     return;
  //   }

  //   try {
  //     // 이미지 URL에서 Blob으로 변환
  //     const response = await fetch(imgItem.imageUrl);
  //     const blob = await response.blob();

  //     // Cloudinary에 업로드
  //     const formData = new FormData();
  //     formData.append("file", blob);
  //     formData.append(
  //       "upload_preset",
  //       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
  //     ); // Cloudinary upload preset 설정

  //     const cloudinaryResponse = await fetch(
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const cloudinaryData = await cloudinaryResponse.json();

  //     if (cloudinaryData.url) {
  //       const updatedImageUrl: ImageUrlType[] = imageUrl.map((item) =>
  //         item.imageId === index
  //           ? {
  //               imageId: index,
  //               imageUrl: imgItem.imageUrl,
  //               cloudinaryUrl: cloudinaryData.url,
  //             }
  //           : item
  //       );
  //       setImageUrl("imageUrl", updatedImageUrl);
  //     }

  //     console.log("cloudinaryData");
  //     console.log(cloudinaryData);

  //     // if (cloudinaryResponse.ok) {
  //     //   // Cloudinary 업로드 성공 후 URL 업데이트
  //     //   const updatedImageUrl: ImageUrlType[] = imageUrl.map((item) =>
  //     //     item.imageId === index
  //     //       ? {
  //     //           imageId: index,
  //     //           imageUrl: cloudinaryData.secure_url,
  //     //         }
  //     //       : item
  //     //   );

  //     //   setImageUrl("imageUrl", updatedImageUrl);
  //     // } else {
  //     //   throw new Error("Cloudinary 업로드에 실패했습니다.");
  //     // }
  //   } catch (error) {
  //     console.error("이미지 업로드 오류:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   const GenerateScript = async () => {
  //     setLoading(true);
  //     try {
  //       // 여기서 무조건 영어로 넘겨줘야 함.
  //       const result = await axios.post("/api/generate-imageScript", {
  //         style: videoStyle,
  //         script: videoScript?.content || "",
  //         language: language,
  //         topic,
  //         topicDetail,
  //       });
  //       console.log(result.data);
  //       setResVideoScript(result?.data);

  //       // 새 스크립트가 생성되면 이미지 생성 상태 초기화
  //       const initialImageStatus = Object.fromEntries(
  //         Array.from({ length: result?.data.length }, (_, i) => [i, false])
  //       );
  //       setIsDoneCreateImage(initialImageStatus);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // const GenerateImage = async (index: number) => {
  //   // const imagePrompt = resScript[0].imagePrompt;
  //   const imagePrompt = resVideoScript[index].imagePrompt;

  //   setLoading(true);
  //   try {
  //     const result = await axios.post("/api/generate-videoImage", {
  //       imagePrompt: imagePrompt,
  //     });
  //     console.log("result");
  //     console.log(result.data);
  //     console.log("imageUrl");
  //     console.log(result?.data.data.imageUrl);

  //     if (imageUrl.length > 0 && imageUrl[index]?.imageUrl) {
  //       const updatedImageUrl: ImageUrlType[] = imageUrl.map((item, i) =>
  //         item.imageId === index
  //           ? {
  //               imageId: index,
  //               imageUrl: result?.data.data.imageUrl,
  //               cloudinaryUrl: "",
  //             }
  //           : item
  //       );
  //       console.log("updatedImageUrl");
  //       console.log(updatedImageUrl);
  //       setImageUrl("imageUrl", updatedImageUrl);
  //     } else {
  //       const imageUrlData = {
  //         imageId: index,
  //         imageUrl: result?.data.data.imageUrl,
  //         cloudinaryUrl: "",
  //       };
  //       const updatedImageUrl: ImageUrlType[] = [...imageUrl, imageUrlData];
  //       setImageUrl("imageUrl", updatedImageUrl);
  //     }

  //     // 이미지 생성 완료 시 상태 업데이트
  //     if (imagePrompt && result?.status === 200) {
  //       setIsDoneCreateImage((prev) => ({
  //         ...prev,
  //         [index]: true,
  //       }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <header>
        <h2 className="text-xl">Generate Image Script</h2>
        <p className="text-sm text-gray-400">
          Generate image scripts from selected video style and script.
        </p>
      </header>

      {/* <div className="flex w-full justify-between gap-2">
        <Button
          className="bg-white text-black mt-4 cursor-pointer"
          disabled={loading}
          size={"sm"}
          onClick={GenerateScript}
        >
          {loading ? (
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <SparklesIcon className="w-4 h-4 mr-2" />
          )}
          Generate Script
        </Button>
      </div> */}

      <div className="flex w-full justify-between gap-2 mt-2">
        <LoadingButton
          loading={loading}
          Content="Generate Script"
          onClick={GenerateScript}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Image Script Result</label>
        {resVideoScript?.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {resVideoScript?.map((item: any, index: number) => (
              <ScriptItem
                key={item.imagePrompt}
                item={item}
                index={index}
                isDone={isDoneCreateImage[index]}
                isLoading={loading}
                imageUrl={imageUrl}
                onGenerateImage={GenerateImage}
              />
            ))}
          </div>
        )}
      </div>

      {/* <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="resScript">Image Script Result</label>
        {resVideoScript?.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {resVideoScript?.map((item: any, index: number) => (
              <div className="flex flex-col gap-1 mb-8" key={item.imagePrompt}>
                <div className="border border-gray-300 rounded-md p-2">
                  {item.imagePrompt}
                </div>
                <ImageGenerateButton
                  isDone={isDoneCreateImage[index]}
                  isLoading={loading}
                  onClick={() => GenerateImage(index)}
                />
                {imageUrl.some((img) => img.imageId === index) && (
                  <>
                    <Button
                      size="sm"
                      variant="default"
                      className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-black font-medium shadow-sm transition-colors cursor-pointer"
                      onClick={() => handleDownloadImage(index, imageUrl)}
                    >
                      <Download />
                      Image Download
                    </Button>
                     <Button
                      size="sm"
                      variant="default"
                      className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-black font-medium shadow-sm transition-colors cursor-pointer"
                      onClick={() => handleUploadImage(index)}
                    >
                      <Upload />
                      Upload Image
                    </Button> 
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}
