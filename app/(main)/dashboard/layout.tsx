"use client";

import { useSidebar } from "@/app/context/SidebarContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="dashboard-layout flex">
      <nav
        className={`dashboard-sidebar ${
          isSidebarOpen ? "w-1/5" : "w-0 overflow-hidden"
        } bg-[#202225] h-screen transition-all duration-300`}
      >
        <header className="h-16 w-full bg-[#202225] p-4">
          <div className="flex w-full justify-center">
            <div className="flex flex-col items-center">
              <div className="text-white text-2xl font-bold">AVG</div>
              <h2 className="text-gray-400 text-sm mt-3">AI Short Video Generator</h2>
            </div>
          </div>
        </header>
      </nav>
      <main className={`${isSidebarOpen ? "w-4/5" : "w-full"} transition-all duration-300`}>{children}</main>
    </div>
  );
}
