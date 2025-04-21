import { inngest } from "@/inngest/client";
import { serve } from "inngest/next";
import { helloWorld } from "../../../inngest/function";
import { GenerateVideo } from "../../../inngest/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    GenerateVideo,
    /* your functions will be passed here later! */
  ],
});
