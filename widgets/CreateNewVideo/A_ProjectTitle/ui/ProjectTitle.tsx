import { Input } from "@/components/ui/input";
import { CreateVideoField } from "@/type/CreateVideoField";

interface ProjectTitleProps {
  title: string;
  setTitle: (fieldName: CreateVideoField, fieldValue: string) => void;
}

export default function ProjectTitle({ title, setTitle }: ProjectTitleProps) {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle("title", event.target.value);
  };

  return (
    <div className="border-b border-gray-200 pb-5">
      <h2 className="mb-4 text-xl">Project Title</h2>
      <Input
        placeholder="Enter Proejct Title..."
        value={title}
        onChange={(event) => handleTitleChange(event)}
      />
    </div>
  );
}
