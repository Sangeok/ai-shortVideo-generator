import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateVideoField } from "@/shared/lib/type/CreateVideoField";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (fieldName: CreateVideoField, fieldValue: string) => void;
}

export function LanguageSelector({
  language,
  setLanguage,
}: LanguageSelectorProps) {
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
