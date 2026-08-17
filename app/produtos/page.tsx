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
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Produtos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Consulte e pesquise os produtos cadastrados.
          </p>
        </div>

        {/* Busca */}
        <form className="mb-8 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
          <input
            type="text"
            name="busca"
            placeholder="Buscar produto pelo nome..."
            defaultValue={busca}
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Buscar
          </button>
        </form>

        {/* Título da lista */}
        <div className="mb-3">
          <h2 className="font-bold text-gray-900">
            Produtos cadastrados:
          </h2>
        </div>

        {/* Produtos */}
        {produtos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-medium text-gray-700">
              {busca
                ? "Nenhum produto encontrado"
                : "Nenhum produto cadastrado"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {busca
                ? "Tente alterar o termo da busca."
                : "Os produtos cadastrados aparecerão aqui."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {produtos.map((produto) => (
              <Link
                key={produto.id}
                href={`/produtos/${produto.id}`}
                className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Cabeçalho do produto */}
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {produto.nome}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Valor
                    </p>

                    <p className="text-xl font-bold text-gray-900">
                      {Number(produto.preco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>

                {/* Informações */}
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Descrição
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {produto.descricao || "Não informado"}
                  </p>
                </div>

                {/* Rodapé */}
                <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                  <p className="text-sm font-medium text-gray-600">
                    Ver detalhes do produto →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}