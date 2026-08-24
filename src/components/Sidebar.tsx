"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/Pictures/LogoOficina.png";

import { FaHouse, FaSackDollar } from "react-icons/fa6";
import {
  FaUserAlt,
  FaUserPlus,
  FaBox,
  FaBoxOpen,
  FaCartPlus,
  FaClipboardList,
  FaInfoCircle,
} from "react-icons/fa";

const icons = {
  house: FaHouse,
  user: FaUserAlt,
  moreUser: FaUserPlus,
  product: FaBox,
  newProduct: FaBoxOpen,
  newOrder: FaCartPlus,
  orderHistory: FaClipboardList,
  money: FaSackDollar,
  info: FaInfoCircle,
};

export interface SidebarLink {
  label: string;
  href: string;
  icon?: keyof typeof icons;
}

export interface SidebarGroup {
  label: string;
  links: SidebarLink[];
}

interface SidebarProps {
  groups: SidebarGroup[];
}

export function Sidebar({ groups }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="print:hidden">
      <Image
        className="mx-auto"
        src={Logo}
        alt="Logo da empresa"
        width={180}
        height={100}
      />

      <nav className="px-3 py-3">
        {groups.map((group, groupIndex) => (
          <div key={group.label}>
            {groupIndex > 0 && (
              <div className="my-3 h-px bg-gray-200" />
            )}

            <p className="mb-2 px-2 text-[11px] font-sf uppercase tracking-wide text-gray-500">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.links.map((link) => {
                const isNovo = link.href.endsWith("/novo");
                const Icon = link.icon ? icons[link.icon] : null;

                const isActive = isNovo
                  ? pathname === link.href
                  : link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      (pathname.startsWith(`${link.href}/`) &&
                        !pathname.endsWith("/novo"));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-md px-2 py-2 font-sfRegular transition ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>

                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}