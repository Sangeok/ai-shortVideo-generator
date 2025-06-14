import { Textarea } from "@/shared/ui/atoms/Textarea";

export const TitleTextArea = ({
  title,
  value,
  placeholder,
  disabled,
}: {
  title: string;
  value: string;
  placeholder: string;
  disabled: boolean;
}) => {
  return (
    <div className="mt-5">
      <h2>{title}</h2>
      <Textarea
        value={value}
        disabled={disabled}
        className="mt-2"
        placeholder={placeholder}
      />
    </div>
  );
};
