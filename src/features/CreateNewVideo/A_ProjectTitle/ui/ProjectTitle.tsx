import { Input } from "@/components/ui/input";
import useCreateVideoStore from "@/src/entities/Video/useCreateVideoStore";

export default function ProjectTitle() {
  const title = useCreateVideoStore(
    (state) => state.initialCreateVideoData.title
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    useCreateVideoStore
      .getState()
      .setCreateVideoDataByField("title", event.target.value);
  };

  return (
    <div className="border-b border-gray-200 pb-5">
      <h2 className="mb-4 text-xl">Project Title</h2>
      <Input
        placeholder="Enter Proejct Title..."
        value={title}
        onChange={(e) => handleTitleChange(e)}
      />
    </div>
  );
}
