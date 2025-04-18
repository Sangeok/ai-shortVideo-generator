import { NextResponse } from "next/server";
import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";

export async function POST(req: Request) {
  try {
    const { ttsFileUrl, imageUrl, captions } = await req.json();

    const imageUrlArr = imageUrl.map((item: any) => {
      const fileName = item.imageUrl.startsWith("/") ? item.imageUrl.substring(1) : item.imageUrl;

      return fileName;
    });

    console.log(imageUrlArr);

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
