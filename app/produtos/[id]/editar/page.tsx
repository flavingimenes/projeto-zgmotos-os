import { prisma } from "@/src/lib/prisma";
import { updateProduct } from "@/src/lib/actions/product";
import { notFound } from "next/navigation";

export default async function EditarProduto({
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

  const update = updateProduct.bind(null, produto.id);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900">
          Editar produto
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Altere os dados do produto.
        </p>

        <form
          action={update}
          className="mt-6 rounded-lg border border-gray-200 bg-white p-5"
        >
          <div className="space-y-4">

            {/* Nome */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                name="nome"
                defaultValue={produto.nome}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descrição
              </label>

              <textarea
                name="descricao"
                defaultValue={produto.descricao ?? ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            {/* Preço */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preço
              </label>

              <input
                name="preco"
                type="text"
                inputMode="decimal"
                defaultValue={produto.preco.toString().replace(".", ",")}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

          </div>

          <button
            type="submit"
            className="mt-5 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </main>
  );
}