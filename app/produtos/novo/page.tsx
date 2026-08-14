import { prisma } from "@/src/lib/prisma";
import { createProduct } from "@/src/lib/actions/product";

export default async function Produtos() {
  const produtos = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Produtos</h1>

        <form
          action={createProduct}
          className="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              placeholder="Nome do produto"
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-black outline-none transition focus:border-gray-500"
            />

            <input
              name="preco"
              type="text"
              inputMode="decimal"
              placeholder="Valor do produto"
              className="rounded-md border border-gray-300 px-3 py-2 text-black outline-none transition focus:border-gray-500"
            />

            <input
              name="descricao"
              placeholder="Descrição do produto (opcional)"
              className="rounded-md border border-gray-300 px-3 py-2 text-black outline-none transition focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Cadastrar
          </button>
        </form>

        <ul className="space-y-3">
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <p className="font-medium text-gray-900">{produto.nome}</p>

              <p className="font-medium text-gray-900">{produto.descricao}</p>

              {produto.preco && (
                <p className="text-sm text-gray-500">
                  {Number(produto.preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
