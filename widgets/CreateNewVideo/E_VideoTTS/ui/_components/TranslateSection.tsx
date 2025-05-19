"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TitleTextArea } from "@/shared/ui/molecule/TitleTextArea";
import { TRANSLATE_LANGUAGE_LIST } from "../../constants/constants";
import { LoadingButton } from "@/shared/ui/molecule/LoadingButton";

export default function TranslateSection({
  loading,
  translatedVideoScript,
  translateLanguage,
  setTranslateLanguage,
  TranslateScript,
}: {
  loading: boolean;
  translatedVideoScript: string;
  translateLanguage: string;
  setTranslateLanguage: (language: string) => void;
  TranslateScript: () => void;
}) {
  return (
    <div className="space-y-4 my-4">
      <TitleTextArea
        title="Translate the TTS Script"
        value={translatedVideoScript}
        placeholder="Translate the TTS Script..."
        disabled={true}
      />

      <div className="space-y-2">
        <h2 className="font-medium">Select the Translate Language</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={translateLanguage}
            onValueChange={(value) => setTranslateLanguage(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {TRANSLATE_LANGUAGE_LIST.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <LoadingButton
            loading={loading}
            onClick={TranslateScript}
            Content="Translate"
            className="bg-white text-black"
          />
        </div>
      </div>
    </div>
  );
}
