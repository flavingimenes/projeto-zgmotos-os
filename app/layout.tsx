import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar, type SidebarGroup } from "@/src/components/Sidebar";
import { SidebarWrapper } from "@/src/components/SidebarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZGMotos OS",
  description: "SaaS para gerenciamento",
};

const groups: SidebarGroup[] = [
  {
    label: "Menu",
    links: [
      {
        label: "Início",
        href: "/",
        icon: "house",
      },
    ],
  },

  {
    label: "Clientes",
    links: [
      {
        label: "Clientes",
        href: "/clientes",
        icon: "user",
      },
      {
        label: "Novo Cliente",
        href: "/clientes/novo",
        icon: "moreUser",
      },
    ],
  },

  {
    label: "Produtos",
    links: [
      {
        label: "Produtos",
        href: "/produtos",
        icon: "product",
      },
      {
        label: "Novo Produto",
        href: "/produtos/novo",
        icon: "newProduct",
      },
    ],
  },

  {
    label: "Pedidos",
    links: [
      {
        label: "Novo Pedido",
        href: "/pedidos",
        icon: "newOrder",
      },
      {
        label: "Histórico De Pedidos",
        href: "/historicoPedidos",
        icon: "orderHistory",
      },
    ],
  },

  {
    label: "Financeiro",
    links: [
      {
        label: "Faturamento",
        href: "/financeiro",
        icon: "money",
      },
    ],
  },

  {
    label: "Sistema",
    links: [
      {
        label: "Sobre",
        href: "/sobre",
        icon: "info",
      },
    ],
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className="flex p-4 min-h-screen">
          <div className="sticky top-4 h-fit">
            <SidebarWrapper groups={groups}/>
          </div>
          <main className="flex-1 p-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
