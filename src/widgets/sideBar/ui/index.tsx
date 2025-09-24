"use client";

import { useSidebar } from "@/app/providers/SidebarContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./_component/MenuItem";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { isSidebarOpen } = useSidebar();

  return (
    <div className="dashboard-layout flex z-10">
      <nav
        className={`dashboard-sidebar ${
          isSidebarOpen ? "w-1/5" : "w-0 overflow-hidden"
        } bg-[#202225] h-screen transition-all duration-300`}
      >
        {/* Header */}
        <header className="h-16 w-full bg-[#202225] p-4">
          <div className="flex gap-y-4 flex-col w-full justify-center">
            <div className="flex flex-col items-center">
              <div className="text-white text-2xl font-bold">AVG</div>
              <h2 className="text-gray-400 text-sm mt-3">
                AI Short Video Generator
              </h2>
            </div>
            <div className="mx-5 mt-1">
              <Link href="/create-new-video">
                <Button className="cursor-pointer w-full bg-white text-black">
                  + Create New Video
                </Button>
              </Link>
            </div>

            {/* Menu Items */}
            <MenuItem pathname={pathname || ""} />
          </div>
        </header>
      </nav>
      <main
        className={`${
          isSidebarOpen ? "w-4/5" : "w-full"
        } transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}
