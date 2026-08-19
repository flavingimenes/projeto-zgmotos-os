import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar, type SidebarLink} from "@/src/components/Sidebar"

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

const sidebarLinks: SidebarLink[] = [
  { label: "Início", href: "/", icon: "house" },
  { label: "Clientes", href: "/clientes", icon: "user" },
  { label: "Novo Cliente", href: "/clientes/novo", icon: "moreUser" },
  { label: "Produtos", href: "/produtos", icon: "product" },
  { label: "Novo Produto", href: "/produtos/novo", icon: "newProduct" },
  { label: "Novo Pedido", href: "/pedidos", icon: "newOrder" },
  { label: "Histórico De Pedidos", href: "/historicoPedidos", icon: "orderHistory" },
  { label: "Sobre", href: "/sobre", icon: "info" },
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
            <Sidebar links={sidebarLinks}
            />
          </div>
          <main className="flex-1 p-1">{children}</main>
        </div>
        
      </body>
    </html>
  );
}
