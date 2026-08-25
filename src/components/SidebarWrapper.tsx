"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarGroup } from "./Sidebar";

interface SidebarWrapperProps {
  groups: SidebarGroup[];
  usuario?: string;
}

export function SidebarWrapper({
  groups,
  usuario,
}: SidebarWrapperProps) {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <div className="sticky top-4 h-fit">
      <Sidebar
        groups={groups}
        usuario={usuario}
      />
    </div>
  );
}