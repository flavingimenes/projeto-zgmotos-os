import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import DeleteOrderButton from "@/src/components/DeleteOrderButton";

export default async function HistoricoPedidos({
  searchParams,
}: {
  searchParams: Promise<{
    busca?: string;
    data?: string;
  }>;
}) {
  const { busca, data } = await searchParams;

  const pedidos = await prisma.order.findMany({
    where: {
      ...(busca
        ? {
            customer: {
              OR: [
                {
                  name: {
                    contains: busca,
                  },
                },
                {
                  empresa: {
                    contains: busca,
                  },
                },
              ],
            },
          }
        : {}),

      ...(data
        ? {
            createdAt: {
              gte: new Date(`${data}T00:00:00`),
              lt: new Date(`${data}T23:59:59.999`),
            },
          }
        : {}),
    },

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

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Histórico de pedidos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Consulte e filtre os pedidos cadastrados.
          </p>
        </div>

        <form className="mb-8 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row">
          <input
            type="text"
            name="busca"
            placeholder="Buscar por nome ou empresa..."
            defaultValue={busca}
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
          />

          <input
            type="date"
            name="data"
            defaultValue={data}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Buscar
          </button>
        </form>

        <div>
          {pedidos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="font-medium text-gray-700">
                {busca || data
                  ? "Nenhum pedido encontrado"
                  : "Nenhum pedido cadastrado"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {busca || data
                  ? "Tente alterar os filtros e realizar uma nova busca."
                  : "Os pedidos cadastrados aparecerão aqui."}
              </p>
            </div>
          ) : (
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
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          Total
                        </p>

                        <p className="text-xl font-bold text-gray-900">
                          {total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
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
                              
                              {Number(item.valorUnitario).toLocaleString(
                                "pt-BR",
                                {
                                  style: "currency",
                                  currency: "BRL",
                                },
                              )}
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
                          {new Date(
                            pedido.prazoEntrega,
                          ).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    )}

                    <Link
                      href={`/historicoPedidos/${pedido.id}`}
                      className="inline-block m-3 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-800 hover:bg-gray-800 hover:text-white"
                    >
                      Ver pedido
                    </Link>

                    <DeleteOrderButton 
                      id={pedido.id}
                      nome={pedido.customer.name}
                      />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}