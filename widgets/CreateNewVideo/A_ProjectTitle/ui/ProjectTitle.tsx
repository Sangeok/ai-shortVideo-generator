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
    <div>
      <h2 className="text-xl">Project Title</h2>
      <p className="text-sm text-gray-400 mt-1">
        Enter the title of your project.
      </p>
      <Input
        placeholder="Enter Project Title..."
        value={title}
        onChange={(event) => handleTitleChange(event)}
        className="mt-4"
      />
    </div>
  );
}
