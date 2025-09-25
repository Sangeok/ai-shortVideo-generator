"use client";

import { useSidebar } from "@/app/providers/SidebarContext";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function ToggleSideBarButton() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="z-10 bg-parent text-white p-2 rounded-md hover:bg-[#36393f]"
    >
      {isSidebarOpen ? <PanelRightOpen /> : <PanelRightClose />}
    </button>
  );
}
