import { Button } from "@/src/shared/ui/atoms/Button/Button";
import { clsx } from "clsx";
import { FileVideo, Home, Search, WalletCards } from "lucide-react";
import Link from "next/link";

const MenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <Home />,
  },
  {
    title: "Create New Video",
    url: "/create-new-video",
    icon: <FileVideo />,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: <Search />,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: <WalletCards />,
  },
];

export default function MenuItem({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col gap-y-4 mt-8">
      {MenuItems.map((menu) => (
        <div
          key={menu.title}
          className={clsx("flex cursor-pointer hover:bg-zinc-700 rounded-md w-full px-5", {
            "bg-zinc-700": pathname === menu.url,
          })}
        >
          <Link href={menu.url} className="flex items-center">
            <Button className="">
              {menu.icon} {menu.title}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
