"use client";

import { useGenYoutubeScript } from "../model/hooks/useGenYoutubeScript";
import { LoadingButton } from "@/src/shared/ui/molecule/LoadingButton";
import { TopicTabs } from "./_components/TopicTabs/ui";
import { LanguageSelector } from "./_components/LanguageSelector";
import { ScriptDisplay } from "./_components/ScriptDisplay";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export default function Topic() {
  const { loading, GenerateScript } = useGenYoutubeScript();

  const videoScript = useCreateVideoStore(
    (state) => state.initialCreateVideoData.videoScript
  );

  const hasVideoScript = videoScript?.length > 0;

  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="mt-6">
        <h2 className="text-xl">Video Topic</h2>
        <p className="text-sm text-gray-400">Select topic for you video</p>
        <TopicTabs />

        <div className="mt-4 flex gap-8">
          <LanguageSelector />
        </div>

        {hasVideoScript && <ScriptDisplay />}
      </div>
      <LoadingButton
        loading={loading}
        onClick={GenerateScript}
        Content={hasVideoScript ? "Generate New Script" : "Generate Script"}
        className="mt-4"
      />
    </div>
  );
}
