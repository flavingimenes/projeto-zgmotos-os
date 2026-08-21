import { prisma } from "@/src/lib/prisma";
import { createProduct } from "@/src/lib/actions/product";
import { Package, FileText } from "lucide-react";

export default async function Produtos() {
  const produtos = await prisma.product.findMany({
  orderBy: {
    id: "desc",
  },
});

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Produtos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Cadastre e gerencie seus produtos.
          </p>
        </div>

        <form
          action={createProduct}
          className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Cadastrar novo produto
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Preencha as informações abaixo para cadastrar um produto.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <div className="relative">
                <Package className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  name="name"
                  placeholder="Nome do produto/peça"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preço
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                  R$
                </span>

                <input
                  name="preco"
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descrição
                <span className="ml-1 font-normal text-gray-400">
                  (opcional)
                </span>
              </label>

              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  name="descricao"
                  placeholder="Descrição do produto"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Cadastrar produto
          </button>
        </form>

        <div className="mb-3">
          <h2 className="font-bold text-gray-900">
            Últimos produtos cadastrados:
          </h2>
        </div>

        {produtos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-medium text-gray-700">
              Nenhum produto cadastrado
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Os produtos cadastrados aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {produto.nome}
                    </p>

                    {produto.descricao && (
                      <p className="text-sm text-gray-500">
                        {produto.descricao}
                      </p>
                    )}
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

                <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Descrição
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {produto.descricao || "Não informado"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Valor
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {Number(produto.preco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}