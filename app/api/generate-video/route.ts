import { NextResponse } from "next/server";
import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";

export async function POST(req: Request) {
  try {
    const { ttsFileUrl, imageUrl, captions } = await req.json();

    const imageUrlArr = imageUrl
      .map((item: any) => {
        // 디버깅용 로그
        console.log("API에서 처리 중인 아이템:", item);

        // 객체 형태인 경우
        if (item && typeof item === "object" && "imageUrl" in item) {
          // Remotion의 staticFile 함수는 일반적으로 /로 시작하지 않는 경로를 예상합니다.
          const path = item.imageUrl;
          return typeof path === "string" ? (path.startsWith("/") ? path.substring(1) : path) : null;
        }

        // 문자열인 경우
        if (typeof item === "string") {
          return item.startsWith("/") ? item.substring(1) : item;
        }

        return null;
      })
      .filter(Boolean); // null, undefined 제거

    console.log("API에서 최종 처리된 imageUrlArr:", imageUrlArr);

    const services = await getServices({
      region: "us-east1",
      compatibleOnly: true,
    });

    const serviceName = services[0].serviceName;

    console.log("serviceName");
    console.log(serviceName);

    const serveUrl = process.env.GCP_SERVE_URL;
    if (!serveUrl) {
      throw new Error("GCP_SERVE_URL is not defined");
    }

    const result = await renderMediaOnCloudrun({
      serviceName,
      region: "us-east1",
      serveUrl: serveUrl,
      composition: "Empty",
      inputProps: {
        videoData: {
          ttsFileUrl: ttsFileUrl,
          imageUrl: imageUrlArr,
          captions: captions,
        },
      },
      codec: "h264",
    });

    if (result.type === "success") {
      console.log(result.bucketName);
      console.log(result.renderId);

      console.log(result?.publicUrl);
      return NextResponse.json(result?.publicUrl);
    }
    return null;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate video" }, { status: 500 });
  }
}
