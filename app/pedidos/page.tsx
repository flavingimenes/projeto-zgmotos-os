import { PedidoForm } from "@/src/components/PedidoForm/PedidoForm";
import { prisma } from "@/src/lib/prisma";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default async function Pedidos() {
  const [clientes, produtos, pedidos] = await Promise.all([
    prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        empresa: true,
        motorcycles: {
          select: {
            id: true,
            nome: true,
            placa: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
      },
      orderBy: {
        nome: "asc",
      },
    }),
    prisma.order.findMany({
      include: {
        customer: true,
        motorcycle: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const produtosFormatados = produtos.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    preco: Number(produto.preco),
  }));

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>

          <p className="mt-1 text-sm text-gray-500">
            Cadastre um novo pedido e consulte os pedidos recentes.
          </p>
        </div>

        <PedidoForm clientes={clientes} produtos={produtosFormatados} />

        <div className="mt-8 mb-3">
          <h2 className="font-bold text-gray-900">Últimos pedidos feitos:</h2>
        </div>

        <div className="space-y-4">
          {pedidos.map((pedido) => {
            const total = pedido.items.reduce(
              (acc, item) =>
                acc + item.quantidade * Number(item.valorUnitario),
              0,
            );

            return (
              <div
                key={pedido.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {pedido.customer.name}
                    </p>

                    {pedido.customer.empresa && (
                      <p className="text-sm text-gray-500">
                        {pedido.customer.empresa}
                      </p>
                    )}

                    {pedido.motorcycle && (
                      <p className="text-sm text-gray-500">
                        Moto: {pedido.motorcycle.nome} -{" "}
                        {pedido.motorcycle.placa}
                      </p>
                    )}
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Total
                    </p>

                    <p className="text-xl font-bold text-gray-900">
                      {formatBRL(total)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Tipo
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {pedido.tipo}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Pagamento
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {pedido.pagamento}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Cidade
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {pedido.customer.city}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Criado em
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {new Date(pedido.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4">
                  <p className="mb-3 text-sm font-semibold text-gray-900">
                    Produtos
                  </p>

                  <div className="space-y-2">
                    {pedido.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm"
                      >
                        <div>
                          <span className="font-medium text-gray-800">
                            {item.quantidade}x
                          </span>{" "}
                          <span className="text-gray-600">
                            {item.product.nome}
                          </span>
                        </div>

                        <span className="font-medium text-gray-800">
                          {formatBRL(Number(item.valorUnitario))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {pedido.prazoEntrega && (
                  <div className="border-t border-gray-100 px-5 py-3">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        Prazo de entrega:
                      </span>{" "}
                      {new Date(pedido.prazoEntrega).toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                  </div>
                )}

                {pedido.observacoes && (
                  <div className="border-t border-gray-100 px-5 py-3">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        Observações:
                      </span>{" "}
                      {pedido.observacoes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}