import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteProductButton from "@/src/components/DeleteProductButton";

export default async function Produto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const produto = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!produto) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Produto
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Consulte as informações do produto cadastrado.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {produto.nome}
              </p>
            </div>

            <div className="text-left md:text-right">
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

          <div className="grid gap-5 px-5 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Descrição
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {produto.descricao || "Não informado"}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Ações
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/produtos/${produto.id}/editar`}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Editar produto
              </Link>

              <DeleteProductButton
                id={produto.id}
                nome={produto.nome}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}