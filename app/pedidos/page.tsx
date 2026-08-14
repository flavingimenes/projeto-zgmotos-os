import { PedidoForm } from "@/src/components/PedidoForm/PedidoForm";
import { prisma } from "@/src/lib/prisma";

export default async function Pedidos() {
  const clientes = await prisma.customer.findMany({
    select: {
        id: true,
        name: true,
        empresa: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const produtos = await prisma.product.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
      preco: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  const produtosFormatados = produtos.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    preco: Number(produto.preco),
  }))

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">PEDIDOS</h1>
      <p className="text-gray-600 mt-2">
       Novo Pedido
      </p>

    <PedidoForm 
      clientes={clientes}
      produtos={produtosFormatados}/>
    </main>
  );
}
