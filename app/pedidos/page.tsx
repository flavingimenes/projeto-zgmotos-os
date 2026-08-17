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

  const pedidos = await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const produtosFormatados = produtos.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    preco: Number(produto.preco),
  }));

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">PEDIDOS</h1>
      <p className="text-gray-600 mt-2">Novo Pedido</p>

      <PedidoForm 
        clientes={clientes} 
        produtos={produtosFormatados} />

      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Ultimos pedidos feitos:
        </h2>
      </div>

      <ul className="space-y-3">
        {pedidos.map((pedido) => {
          const total = pedido.items.reduce(
            (acc, item) => acc + item.quantidade * Number(item.valorUnitario),
            0,
          );

          return (
            <li
              key={pedido.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Tipo: {pedido.tipo}</p>

                <p className="font-medium text-gray-900">
                  Pagamento: {pedido.pagamento}
                </p>

                <p className="font-medium text-gray-900">
                  Criado em:{" "}
                  {new Date(pedido.createdAt).toLocaleString("pt-BR")}
                </p>

                <p className="text-sm text-gray-600">
                  Cliente: {pedido.customer.name}
                </p>

                <p className="text-sm text-gray-600">
                  Cidade: {pedido.customer.city}
                </p>

                {pedido.customer.empresa && (
                  <p className="text-sm text-gray-600">
                    Empresa: {pedido.customer.empresa}
                  </p>
                )}

                <div className="mt-3">
                  <p className="font-medium text-gray-900">Produtos:</p>

                  <ul className="mt-1 space-y-1">
                    {pedido.items.map((item) => (
                      <li key={item.id} className="text-sm text-gray-600">
                        {item.quantidade}x {item.product.nome} —{" "}
                        {Number(item.valorUnitario).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="font-semibold text-gray-900">
                  Total:{" "}
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                {pedido.prazoEntrega && (
                  <p className="text-sm text-gray-600">
                    Prazo de entrega:{" "}
                    {new Date(pedido.prazoEntrega).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
