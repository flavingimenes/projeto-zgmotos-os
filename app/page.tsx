import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

import { FiUsers } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";

function saudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

const acoesRapidas = [
  {
    titulo: "Novo pedido",
    descricao: "Registre um pedido ou orçamento para um cliente.",
    href: "/pedidos",
  },
  {
    titulo: "Clientes",
    descricao: "Consulte, edite ou cadastre clientes da oficina.",
    href: "/clientes",
  },
  {
    titulo: "Produtos",
    descricao: "Gerencie o catálogo de peças e serviços.",
    href: "/produtos",
  },
  {
    titulo: "Histórico de pedidos",
    descricao: "Veja e filtre tudo o que já foi registrado.",
    href: "/historicoPedidos",
  },
];

export default async function Home() {
  const [totalClientes, totalProdutos, totalPedidos] = await Promise.all([
    prisma.customer.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {saudacao()}! 
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Bem-vindo ao ZGMotos OS. Gerencie pedidos, orçamentos, clientes e
            produtos da sua oficina em um só lugar.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Clientes cadastrados
              
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 flex gap-4 items-center">
              <FiUsers /> {totalClientes} 
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Produtos no catálogo
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 flex gap-4 items-center">
              <GoGear /> {totalProdutos}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Pedidos registrados
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 flex gap-4 items-center">
              <BsBoxSeam /> {totalPedidos}
            </p>
          </div>
        </div>

        <h2 className="mb-3 font-bold text-gray-900">O que você precisa fazer agora?</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {acoesRapidas.map((acao) => (
            <Link
              key={acao.href}
              href={acao.href}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-gray-900">
                {acao.titulo}
              </p>
              <p className="mt-1 text-sm text-gray-500">{acao.descricao}</p>
              <p className="mt-3 text-sm font-medium text-gray-600 underline">
                Acessar 
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}