"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/Pictures/LogoOficina.png";

import { FaHouse } from "react-icons/fa6";
import {
  FaUserAlt,
  FaUserPlus,
  FaBox,
  FaBoxOpen,
  FaCartPlus,
  FaClipboardList,
  FaInfoCircle,
} from "react-icons/fa";

export interface SidebarLink {
  label: string;
  href: string;
  icon?: keyof typeof icons;
}

interface SidebarProps {
  links: SidebarLink[];
}

const icons = {
  house: FaHouse,
  user: FaUserAlt,
  moreUser: FaUserPlus,
  product: FaBox,
  newProduct: FaBoxOpen,
  newOrder: FaCartPlus,
  orderHistory: FaClipboardList,
  info: FaInfoCircle,
};

export function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="print:hidden">
      <Image
        className="m-auto"
        src={Logo}
        alt="Logo da empresa"
        width={150}
        height={100}
      />
      <nav className="flex flex-col gap-4 p-2">
        {links.map((link) => {
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
              href={link.href}
              key={link.href}
              className={`rounded-md p-2 flex gap-2 items-center ${
                isActive && isActive
                  ? "bg-blue-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                {Icon && <Icon className="w-5 h-5" />}
              </span>

              <div>{link.label}</div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
