"use client";

import { useSidebar } from "@/app/context/SidebarContext";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function Dashboard() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div>
      {/* 사이드바 토글 버튼 */}
      <button onClick={toggleSidebar} className="z-10 bg-parent text-white p-2 rounded-md hover:bg-[#36393f]">
        {isSidebarOpen ? <PanelRightOpen /> : <PanelRightClose />}
      </button>
      Dashboard
    </div>
  );
}
