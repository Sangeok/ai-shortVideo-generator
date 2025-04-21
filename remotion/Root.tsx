// import React from "react";
// import { Composition } from "remotion";
// import { MyComposition } from "./Composition";
// import RemotionComposition from "@/app/_components/RemotionComposition";

// import { Composition } from "remotion";
// import { MyComposition } from "./Composition";

import { Composition } from "remotion";
import { RemotionComposition } from "../app/_components/RemotionComposition";
import useCreateVideoStore from "../store/useCreateVideoStore";

const videoData = {
  ttsUrl: "https://res.cloudinary.com/dzdnn0bue/video/upload/v1745214243/sy0pc2iix0zuft4wtgmm.mp3",
  captions: {
    metadata: {
      transaction_key: "deprecated",
      request_id: "8a5910f3-2b58-4257-96d5-9ddd47467d6d",
      sha256: "e1b71215352a0bfefe5daa3fc376f50246921c13ee9e5b5bfce41ae01cb4c742",
      created: "2025-04-21T05:25:30.100Z",
      duration: 15.167937,
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
                "Long ago, a brave knight faced a fearsome dragon to protect his kingdom. He journeyed far, his armor gleaming, and his spirit strong. The battle was fierce, fire against steel, but the knight's courage prevailed, saving the land from destruction.",
              confidence: 0.99965405,
              words: [
                {
                  word: "long",
                  start: 0.08,
                  end: 0.32,
                  confidence: 0.9987104,
                  punctuated_word: "Long",
                },
                {
                  word: "ago",
                  start: 0.32,
                  end: 0.82,
                  confidence: 0.99717945,
                  punctuated_word: "ago,",
                },
                {
                  word: "a",
                  start: 0.88,
                  end: 1.04,
                  confidence: 0.99965405,
                  punctuated_word: "a",
                },
                {
                  word: "brave",
                  start: 1.04,
                  end: 1.36,
                  confidence: 0.999835,
                  punctuated_word: "brave",
                },
                {
                  word: "knight",
                  start: 1.36,
                  end: 1.68,
                  confidence: 0.99633884,
                  punctuated_word: "knight",
                },
                {
                  word: "faced",
                  start: 1.68,
                  end: 1.92,
                  confidence: 0.9986358,
                  punctuated_word: "faced",
                },
                {
                  word: "a",
                  start: 1.92,
                  end: 2.08,
                  confidence: 0.9996257,
                  punctuated_word: "a",
                },
                {
                  word: "fearsome",
                  start: 2.08,
                  end: 2.56,
                  confidence: 0.99984276,
                  punctuated_word: "fearsome",
                },
                {
                  word: "dragon",
                  start: 2.56,
                  end: 3.04,
                  confidence: 0.99958605,
                  punctuated_word: "dragon",
                },
                {
                  word: "to",
                  start: 3.04,
                  end: 3.12,
                  confidence: 0.99968064,
                  punctuated_word: "to",
                },
                {
                  word: "protect",
                  start: 3.12,
                  end: 3.4399998,
                  confidence: 0.9999188,
                  punctuated_word: "protect",
                },
                {
                  word: "his",
                  start: 3.4399998,
                  end: 3.6799998,
                  confidence: 0.99990714,
                  punctuated_word: "his",
                },
                {
                  word: "kingdom",
                  start: 3.6799998,
                  end: 4.18,
                  confidence: 0.9995409,
                  punctuated_word: "kingdom.",
                },
                {
                  word: "he",
                  start: 4.3199997,
                  end: 4.56,
                  confidence: 0.9998234,
                  punctuated_word: "He",
                },
                {
                  word: "journeyed",
                  start: 4.56,
                  end: 5.04,
                  confidence: 0.99984264,
                  punctuated_word: "journeyed",
                },
                {
                  word: "far",
                  start: 5.04,
                  end: 5.52,
                  confidence: 0.9666995,
                  punctuated_word: "far,",
                },
                {
                  word: "his",
                  start: 5.52,
                  end: 5.7599998,
                  confidence: 0.9994048,
                  punctuated_word: "his",
                },
                {
                  word: "armor",
                  start: 5.7599998,
                  end: 6.16,
                  confidence: 0.99881697,
                  punctuated_word: "armor",
                },
                {
                  word: "gleaming",
                  start: 6.16,
                  end: 6.66,
                  confidence: 0.8454755,
                  punctuated_word: "gleaming,",
                },
                {
                  word: "and",
                  start: 6.72,
                  end: 6.96,
                  confidence: 0.99970466,
                  punctuated_word: "and",
                },
                {
                  word: "his",
                  start: 6.96,
                  end: 7.2799997,
                  confidence: 0.9999007,
                  punctuated_word: "his",
                },
                {
                  word: "spirit",
                  start: 7.2799997,
                  end: 7.68,
                  confidence: 0.9463075,
                  punctuated_word: "spirit",
                },
                {
                  word: "strong",
                  start: 7.68,
                  end: 8.18,
                  confidence: 0.9986944,
                  punctuated_word: "strong.",
                },
                {
                  word: "the",
                  start: 8.96,
                  end: 9.12,
                  confidence: 0.9995771,
                  punctuated_word: "The",
                },
                {
                  word: "battle",
                  start: 9.12,
                  end: 9.44,
                  confidence: 0.99987054,
                  punctuated_word: "battle",
                },
                {
                  word: "was",
                  start: 9.44,
                  end: 9.679999,
                  confidence: 0.99984574,
                  punctuated_word: "was",
                },
                {
                  word: "fierce",
                  start: 9.679999,
                  end: 10.179999,
                  confidence: 0.9448913,
                  punctuated_word: "fierce,",
                },
                {
                  word: "fire",
                  start: 10.32,
                  end: 10.639999,
                  confidence: 0.9992354,
                  punctuated_word: "fire",
                },
                {
                  word: "against",
                  start: 10.639999,
                  end: 11.12,
                  confidence: 0.99942565,
                  punctuated_word: "against",
                },
                {
                  word: "steel",
                  start: 11.12,
                  end: 11.599999,
                  confidence: 0.91793907,
                  punctuated_word: "steel,",
                },
                {
                  word: "but",
                  start: 11.599999,
                  end: 11.84,
                  confidence: 0.9997975,
                  punctuated_word: "but",
                },
                {
                  word: "the",
                  start: 11.84,
                  end: 11.92,
                  confidence: 0.99979883,
                  punctuated_word: "the",
                },
                {
                  word: "knight's",
                  start: 11.92,
                  end: 12.24,
                  confidence: 0.9615191,
                  punctuated_word: "knight's",
                },
                {
                  word: "courage",
                  start: 12.24,
                  end: 12.639999,
                  confidence: 0.9997373,
                  punctuated_word: "courage",
                },
                {
                  word: "prevailed",
                  start: 12.639999,
                  end: 13.139999,
                  confidence: 0.9625507,
                  punctuated_word: "prevailed,",
                },
                {
                  word: "saving",
                  start: 13.28,
                  end: 13.599999,
                  confidence: 0.9998294,
                  punctuated_word: "saving",
                },
                {
                  word: "the",
                  start: 13.599999,
                  end: 13.759999,
                  confidence: 0.9998996,
                  punctuated_word: "the",
                },
                {
                  word: "land",
                  start: 13.759999,
                  end: 14.08,
                  confidence: 0.9999262,
                  punctuated_word: "land",
                },
                {
                  word: "from",
                  start: 14.08,
                  end: 14.24,
                  confidence: 0.99990726,
                  punctuated_word: "from",
                },
                {
                  word: "destruction",
                  start: 14.24,
                  end: 14.74,
                  confidence: 0.9998051,
                  punctuated_word: "destruction.",
                },
              ],
              paragraphs: {
                transcript:
                  "\nLong ago, a brave knight faced a fearsome dragon to protect his kingdom. He journeyed far, his armor gleaming, and his spirit strong. The battle was fierce, fire against steel, but the knight's courage prevailed, saving the land from destruction.",
                paragraphs: [
                  {
                    sentences: [
                      {
                        text: "Long ago, a brave knight faced a fearsome dragon to protect his kingdom.",
                        start: 0.08,
                        end: 4.18,
                      },
                      {
                        text: "He journeyed far, his armor gleaming, and his spirit strong.",
                        start: 4.3199997,
                        end: 8.18,
                      },
                      {
                        text: "The battle was fierce, fire against steel, but the knight's courage prevailed, saving the land from destruction.",
                        start: 8.96,
                        end: 14.74,
                      },
                    ],
                    num_words: 40,
                    start: 0.08,
                    end: 14.74,
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
      cloudinaryUrl: "https://res.cloudinary.com/dzdnn0bue/image/upload/v1745213105/hw77ak0gdqwiobk1htfw.png",
      // imageUrl: "/generated-images/083f507097a934cfaee5bd9dbee6d87b.png",
    },
    {
      imageId: 1,
      imageUrl: "/Realistic.png",
      cloudinaryUrl: "https://res.cloudinary.com/dzdnn0bue/image/upload/v1745213116/turd1zze2i382btaozum.png",
      // imageUrl: "/generated-images/7b559170c0e8819a63b79bf21e58d630.png",
    },
    {
      imageId: 2,
      imageUrl: "/Realistic.png",
      cloudinaryUrl: "https://res.cloudinary.com/dzdnn0bue/image/upload/v1745214210/nyk0yawwuujhbxrk3btl.png",
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
        width={720}
        height={1280}
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
