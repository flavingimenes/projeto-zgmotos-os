import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

export default async function Produtos({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string }>;
}) {
  const { busca } = await searchParams;

  const produtos = await prisma.product.findMany({
    where: busca
      ? {
          nome: {
            contains: busca,
          },
        }
      : undefined,
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Produtos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Lista de produtos cadastrados
          </p>
        </div>

        {/* Busca */}
        <form className="mb-6 flex gap-2">
          <input
            type="text"
            name="busca"
            placeholder="Buscar produto pelo nome..."
            defaultValue={busca}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none text-black"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2 text-sm text-white"
          >
            Buscar
          </button>
        </form>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {produtos.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500">
                {busca
                  ? `Nenhum produto encontrado para "${busca}".`
                  : "Nenhum produto cadastrado."}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {produtos.map((produtos, index) => (
                <li key={produtos.id}>
                  <Link
                    href={`/produtos/${produtos.id}`}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {produtos.nome}
                      </p>
                      <p className="font-medium text-gray-900 flex gap-2">
                        <span>Valor:</span> 
                        {Number(produtos.preco).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        #{index + 1}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}