"use client";

import { useState } from "react";
import { useGenTranslatedScript } from "../model/hooks/useGenTranslatedScript";
import { useGenTTs } from "../model/hooks/useGenTTs";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import TTSPlayer from "./_components/TTSPlayer";
import { TitleTextArea } from "@/src/shared/ui/molecule/TitleTextArea";
import VoiceSelector from "./_components/VoiceSelector";
import TranslateSection from "./_components/TranslateSection";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export default function GenVideoTTS() {
  const [loading, setLoading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>("alloy");
  const [translateLanguage, setTranslateLanguage] = useState<string>("Korean");

  const language = useCreateVideoStore(
    (state) => state.initialCreateVideoData.language
  );
  const selectedVideoScript = useCreateVideoStore(
    (state) => state.initialCreateVideoData.generateImage.generateImageScript
  );
  const ttsUrl = useCreateVideoStore(
    (state) => state.initialCreateVideoData.ttsUrl
  );

  const setTts = useCreateVideoStore((state) => state.setTts);

  const { translatedVideoScript, TranslateScript } = useGenTranslatedScript({
    selectedVideoScript,
    translateLanguage,
    setLoading,
  });

  const { GenerateTTS } = useGenTTs({
    language,
    selectedVideoScript,
    voice,
    setTts,
    setLoading,
  });

  const ttsScript =
    (language === "English"
      ? selectedVideoScript?.content
      : selectedVideoScript?.translatedContent) || "";

  return (
    <div className="mt-5 border-b border-gray-200 pb-5">
      <h2 className="text-xl">Generate TTS</h2>
      <p className="text-sm text-gray-400">
        If you fine with the video style and script, click the button below to
        generate TTS.
      </p>

      <TitleTextArea
        title="Check the TTS Script"
        value={ttsScript}
        placeholder="Check the TTS Script..."
        disabled={true}
      />

      <VoiceSelector voice={voice} setVoice={setVoice} />

      <LoadingButton
        loading={loading}
        onClick={GenerateTTS}
        Content="Generate TTS"
        className="mt-8"
      />

      <TTSPlayer ttsUrl={ttsUrl} />

      <TranslateSection
        loading={loading}
        translatedVideoScript={translatedVideoScript}
        translateLanguage={translateLanguage}
        setTranslateLanguage={setTranslateLanguage}
        TranslateScript={TranslateScript}
      />
    </div>
  );
}
