// import React from "react";
// import { Composition } from "remotion";
// import { MyComposition } from "./Composition";
// import RemotionComposition from "@/app/_components/RemotionComposition";

// import { Composition } from "remotion";
// import { MyComposition } from "./Composition";

import { Composition } from "remotion";
import { RemotionComposition } from "../app/_components/RemotionComposition";
import useCreateVideoStore from "@/store/useCreateVideoStore";

const videoData = {
  ttsUrl: "http://res.cloudinary.com/dzdnn0bue/video/upload/v1745150370/mizvnkvck2qngtgw3wzq.mp3",
  captions: {
    metadata: {
      transaction_key: "deprecated",
      request_id: "ba6f42c3-401d-4e42-8870-570d34a2dfdf",
      sha256: "1d9c39222f7c02afaf0e2936e53825d700d901cc589d8e259ca8d180f2103522",
      created: "2025-04-13T10:48:14.560Z",
      duration: 25.559938,
      channels: 1,
      models: ["1abfe86b-e047-4eed-858a-35e5625b41ee"],
      model_info: {
        "1abfe86b-e047-4eed-858a-35e5625b41ee": {
          name: "2-general-nova",
          version: "2024-01-06.5664",
          arch: "nova-2",
        },
      },
    },
    results: {
      channels: [
        {
          alternatives: [
            {
              transcript:
                "Long ago, in ancient Greece lived a brave warrior named Achilles. His mother dipped him in the River Styx to make him invulnerable, but she held him by his heel. In the Trojan War, Achilles fought valiantly, leading his Myrmidons to victory. However, Paris, prince of Troy, shot an arrow that struck Achilles in his vulnerable heel, leading to the hero's demise. Thus, the Achilles' heel became a symbol of weakness.",
              confidence: 0.99953747,
              words: [
                {
                  word: "long",
                  start: 0.08,
                  end: 0.32,
                  confidence: 0.9983777,
                  punctuated_word: "Long",
                },
                {
                  word: "ago",
                  start: 0.32,
                  end: 0.71999997,
                  confidence: 0.9124038,
                  punctuated_word: "ago,",
                },
                {
                  word: "in",
                  start: 0.71999997,
                  end: 0.96,
                  confidence: 0.99676406,
                  punctuated_word: "in",
                },
                {
                  word: "ancient",
                  start: 0.96,
                  end: 1.28,
                  confidence: 0.9719087,
                  punctuated_word: "ancient",
                },
                {
                  word: "greece",
                  start: 1.28,
                  end: 1.78,
                  confidence: 0.9998952,
                  punctuated_word: "Greece",
                },
              ],
              paragraphs: {
                transcript:
                  "\nLong ago, in ancient Greece lived a brave warrior named Achilles. His mother dipped him in the River Styx to make him invulnerable, but she held him by his heel. In the Trojan War, Achilles fought valiantly, leading his Myrmidons to victory. However, Paris, prince of Troy, shot an arrow that struck Achilles in his vulnerable heel, leading to the hero's demise. Thus, the Achilles' heel became a symbol of weakness.",
                paragraphs: [
                  {
                    sentences: [
                      {
                        text: "Long ago, in ancient Greece lived a brave warrior named Achilles.",
                        start: 0.08,
                        end: 3.86,
                      },
                      {
                        text: "His mother dipped him in the River Styx to make him invulnerable, but she held him by his heel.",
                        start: 4.16,
                        end: 8.98,
                      },
                      {
                        text: "In the Trojan War, Achilles fought valiantly, leading his Myrmidons to victory.",
                        start: 9.679999,
                        end: 14.099999,
                      },
                      {
                        text: "However, Paris, prince of Troy, shot an arrow that struck Achilles in his vulnerable heel, leading to the hero's demise.",
                        start: 14.6449995,
                        end: 21.625,
                      },
                      {
                        text: "Thus, the Achilles' heel became a symbol of weakness.",
                        start: 22.164999,
                        end: 25.224998,
                      },
                    ],
                    num_words: 71,
                    start: 0.08,
                    end: 25.224998,
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
  imageUrl: [
    {
      imageId: 0,
      imageUrl: "/Realistic.png",
      cloudinaryUrl: "https://res.cloudinary.com/dzdnn0bue/image/upload/v1745147134/w0wlrrvuloiqw5t3teou.png",
      // imageUrl: "/generated-images/083f507097a934cfaee5bd9dbee6d87b.png",
    },
    {
      imageId: 1,
      imageUrl: "/Realistic.png",
      cloudinaryUrl: "https://res.cloudinary.com/dzdnn0bue/image/upload/v1745148409/buwntddaowrqe3nczrun.png",
      // imageUrl: "/generated-images/7b559170c0e8819a63b79bf21e58d630.png",
    },
    {
      imageId: 2,
      imageUrl: "/Realistic.png",
      cloudinaryUrl: "https://res.cloudinary.com/dzdnn0bue/image/upload/v1745149164/yysbwnsuhcu6z7xoig14.png",
    },
  ],
};

export const RemotionRoot = () => {
  const { initialCreateVideoData } = useCreateVideoStore();
  const { captions, ttsUrl, imageUrl, title, generateImage } = initialCreateVideoData;
  const { generateImageStyle } = generateImage;

  // const videoData = {
  //   captions,
  //   ttsUrl,
  //   imageUrl,
  // };

  return (
    <>
      <Composition
        id="Empty"
        component={RemotionComposition}
        durationInFrames={Number(
          (
            videoData?.captions.results.channels[0].alternatives[0].words[
              videoData?.captions.results.channels[0].alternatives[0].words.length - 1
            ]?.end * 30
          ).toFixed(0)
        )}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ videoData }}
      />
    </>
  );
};

// export const RemotionRoot = () => {
//   return (
//     <>
//       <Composition id="Empty" component={MyComposition} durationInFrames={60} fps={30} width={1280} height={720} />
//     </>
//   );
// };
