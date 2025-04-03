import { Input } from "@/components/ui/input";
import { CreateVideoField } from "@/type/CreateVideoField";

interface ProjectTitleProps {
  title: string;
  setTitle: (fieldName: CreateVideoField, fieldValue: string) => void;
  onHandleInputChange: (
    fieldName: CreateVideoField,
    fieldValue: string
  ) => void;
}

export default function ProjectTitle({
  title,
  setTitle,
  onHandleInputChange,
}: ProjectTitleProps) {
  // const [title, setTitle] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle("title", event.target.value);

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
