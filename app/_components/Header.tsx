import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="p-4 flex items.center justify-between">
      <div className="flex items-center ">
        <h2 className="text-2xl font-bold">AVG</h2>
      </div>
      <div className="flex items-center ">
        <Button className="bg-white text-black">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
