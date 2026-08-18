"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/Pictures/LogoOficina.png"

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarProps {
  links: SidebarLink[];
}

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
      <nav className="flex flex-col gap-4 p-5">
        {links.map((link) => {
          const isNovo = link.href.endsWith("/novo");

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
              className={`rounded-md p-2 ${
                isActive && 
                   isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}