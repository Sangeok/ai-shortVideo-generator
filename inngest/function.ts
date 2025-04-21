import { NextResponse } from "next/server";
import { inngest } from "./client";
import { getServices } from "@remotion/cloudrun/client";
import { renderMediaOnCloudrun } from "@remotion/cloudrun/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const GenerateVideo = inngest.createFunction(
  { id: "generate-video" },
  { event: "generate-video" },
  async ({ event, step }) => {
    const { ttsFileUrl, imageUrl, captions } = event.data;

    console.log("ttsFileUrl");
    console.log(ttsFileUrl);

    console.log("imageUrl");
    console.log(imageUrl);

    console.log("captions");
    console.log(captions);
    const renderVideo = await step.run("render-video", async () => {
      //Render video
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
            ttsUrl: ttsFileUrl,
            imageUrl: imageUrl,
            captions: captions,
          },
        },
        codec: "h264",
      });
      if (result.type === "success") {
        console.log(result.bucketName);
        console.log(result.renderId);

        console.log(result?.publicUrl);
        return result?.publicUrl;
      }
    });

    return renderVideo;
  }
);
