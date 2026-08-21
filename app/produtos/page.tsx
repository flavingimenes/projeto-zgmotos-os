import BuscaProdutos from "@/src/components/Busca/BuscarProdutos";
import { prisma } from "@/src/lib/prisma";


export default async function Produtos() {
  const produtos = await prisma.product.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  const produtosFormatados = produtos.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: Number(produto.preco),
  }));

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Produtos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Consulte e pesquise os produtos cadastrados.
          </p>
        </div>

        <BuscaProdutos produtos={produtosFormatados} />
      </div>
    </main>
  );
}