import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProduct } from "@/src/lib/actions/product";
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
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-black">
          <p>PRODUTO: </p>
          {produto.nome}
        </h1>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
          <p className="mt-2 text-black">
            <strong>Descrição:</strong> {produto.descricao || "Não informado"}
          </p>

          <p className="mt-2 text-black">
            <strong>Valor:</strong>{" "}
            {Number(produto.preco).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <Link
          href={`/produtos/${produto.id}/editar`}
          className="mt-5 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 mr-4"
        >
          Editar produto
        </Link>

        <DeleteProductButton id={produto.id} nome={produto.nome} />
      </div>
    </main>
  );
}
