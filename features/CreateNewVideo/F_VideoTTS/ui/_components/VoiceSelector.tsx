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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { TTS_VOICE_EXPLAIN, TTS_VOICE_LIST } from "../../constants/constants";

interface VoiceSelectorProps {
  voice: string;
  setVoice: (voice: string) => void;
}

export default function VoiceSelector({ voice, setVoice }: VoiceSelectorProps) {
  return (
    <div className="mt-5">
      <div className="flex gap-2 items-center">
        <h2>Select the Voice</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info size={20} className="cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-white text-black max-w-sm">
            <div className="space-y-2 p-1">
              {TTS_VOICE_EXPLAIN.map((voice) => (
                <p key={voice.name}>
                  <strong>{voice.name}:</strong> {voice.explain}
                </p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      <Select value={voice} onValueChange={(value) => setVoice(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent className="bg-white text-black">
          <SelectGroup>
            <SelectLabel>Voices</SelectLabel>
            {TTS_VOICE_LIST.map((voice) => (
              <SelectItem key={voice.value} value={voice.value}>
                {voice.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
