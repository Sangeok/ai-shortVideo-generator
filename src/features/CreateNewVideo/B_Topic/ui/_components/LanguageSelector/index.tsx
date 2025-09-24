import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export function LanguageSelector() {
  const language = useCreateVideoStore(
    (state) => state.initialCreateVideoData.language
  );

  const setLanguage = useCreateVideoStore(
    (state) => state.setCreateVideoDataByField
  );

  return (
    <div>
      <h2>Select the Language</h2>
      <Select
        value={language}
        onValueChange={(value) => setLanguage("language", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent className="bg-white text-black">
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Korean">Korean</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
