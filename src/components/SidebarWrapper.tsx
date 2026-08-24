"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarGroup } from "./Sidebar";

export function SidebarWrapper({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <div className="sticky top-4 h-fit">
      <Sidebar groups={groups} />
    </div>
  );
}