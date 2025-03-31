import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ProjectTitleProps {
  onHandleInputChange: (fieldName: string, fieldValue: string) => void;
}

export default function ProjectTitle({
  onHandleInputChange,
}: ProjectTitleProps) {
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onHandleInputChange("title", event.target.value);
  };

  return (
    <div>
      <h2 className="mb-2">Project Title</h2>
      <Input
        placeholder="Enter Proejct Title..."
        value={title}
        onChange={(event) => handleTitleChange(event)}
      />
    </div>
  );
}
