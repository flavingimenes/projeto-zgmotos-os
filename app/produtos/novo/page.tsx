import { prisma } from "@/src/lib/prisma";
import { createProduct } from "@/src/lib/actions/product";

export default async function Produtos() {
  const produtos = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          Produtos
        </h1>

        <form
          action={createProduct}
          className="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                name="name"
                placeholder="Nome do produto/peça"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preço
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                  R$
                </span>

                <input
                  name="preco"
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descrição
              </label>

              <input
                name="descricao"
                placeholder="Opcional"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-[0.98]"
          >
            Cadastrar produto
          </button>
        </form>

        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Ultimos produtos cadastrados:
          </h2>
        </div>

        <ul className="space-y-3">
          {[...produtos].reverse().map((produto) => (
            <li
              key={produto.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {produto.nome}
                  </p>

                  {produto.descricao && (
                    <p className="mt-1 text-sm text-gray-500">
                      {produto.descricao}
                    </p>
                  )}
                </div>

                {produto.preco && (
                  <p className="whitespace-nowrap font-semibold text-gray-900">
                    {Number(produto.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}