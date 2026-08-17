import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { PrintButton } from "@/src/components/PrintButton";

export default async function PedidoHistorico({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pedido = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!pedido) {
    notFound();
  }

  const total = pedido.items.reduce(
    (acc, item) =>
      acc + item.quantidade * Number(item.valorUnitario),
    0,
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold uppercase text-gray-900">
              Pedido #{pedido.id.slice(-6).toUpperCase()}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Visualização detalhada do pedido
            </p>
          </div>

          <PrintButton />
        </div>


        <div className="overflow-hidden border-2 border-gray-800 bg-white">
          <div className="grid border-b-2 border-gray-800 md:grid-cols-[1fr_180px]">
            <div className="flex flex-wrap items-center gap-8 p-4">
              <div className="flex items-center gap-2 text-lg font-bold uppercase">
                <span
                  className={`flex h-5 w-5 items-center justify-center border-2 border-gray-800 text-xs ${
                    pedido.tipo === "PEDIDO" ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  {pedido.tipo === "PEDIDO" ? "✓" : ""}
                </span>

                Pedido
              </div>

              <div className="flex items-center gap-2 text-lg font-bold uppercase">
                <span
                  className={`flex h-5 w-5 items-center justify-center border-2 border-gray-800 text-xs ${
                    pedido.tipo === "ORCAMENTO"
                      ? "bg-gray-800 text-white"
                      : ""
                  }`}
                >
                  {pedido.tipo === "ORCAMENTO" ? "✓" : ""}
                </span>

                Orçamento
              </div>
            </div>

            <div className="border-t-2 border-gray-800 p-3 text-center md:border-l-2 md:border-t-0">
              <p className="text-xs font-bold uppercase text-gray-500">
                Data
              </p>

              <p className="mt-1 text-lg font-semibold">
                {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="border-b-2 border-gray-800 p-4">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase text-gray-500">
                Cliente
              </p>

              <p className="border-b border-gray-800 pb-1 text-base font-semibold">
                {pedido.customer.name}
              </p>
            </div>

            {pedido.customer.empresa && (
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Empresa
                </p>

                <p className="border-b border-gray-800 pb-1 text-base font-semibold">
                  {pedido.customer.empresa}
                </p>
              </div>
            )}
          </div>

          <div className="grid border-b-2 border-gray-800 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-b-2 border-gray-800 p-4 sm:border-r-2 lg:border-b-0">
              <p className="text-xs font-bold uppercase text-gray-500">
                Cidade
              </p>

              <p className="mt-1 font-semibold">
                {pedido.customer.city || "-"}
              </p>
            </div>

            <div className="border-b-2 border-gray-800 p-4 lg:border-b-0 lg:border-r-2">
              <p className="text-xs font-bold uppercase text-gray-500">
                Cond. de Pagamento
              </p>

              <p className="mt-1 font-semibold">
                {pedido.pagamento}
              </p>
            </div>

            <div className="p-4">
              <p className="text-xs font-bold uppercase text-gray-500">
                Prazo de Entrega
              </p>

              <p className="mt-1 font-semibold">
                {pedido.prazoEntrega
                  ? new Date(
                      pedido.prazoEntrega,
                    ).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-162.5">
              <div className="grid grid-cols-[90px_1fr_140px_150px] bg-gray-800 text-white">
                <div className="border-r border-gray-500 px-3 py-3 text-sm font-bold uppercase">
                  Quant.
                </div>

                <div className="border-r border-gray-500 px-3 py-3 text-sm font-bold uppercase">
                  Discriminação
                </div>

                <div className="border-r border-gray-500 px-3 py-3 text-sm font-bold uppercase">
                  Unit.
                </div>

                <div className="px-3 py-3 text-sm font-bold uppercase">
                  Total
                </div>
              </div>

              {pedido.items.map((item) => {
                const valorUnitario = Number(item.valorUnitario);
                const subtotal = item.quantidade * valorUnitario;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[90px_1fr_140px_150px] border-b border-gray-800"
                  >
                    <div className="border-r border-gray-800 px-3 py-3 text-sm">
                      {item.quantidade}
                    </div>

                    <div className="border-r border-gray-800 px-3 py-3 text-sm font-medium">
                      {item.product.nome}
                    </div>

                    <div className="border-r border-gray-800 px-3 py-3 text-sm">
                      {formatCurrency(valorUnitario)}
                    </div>

                    <div className="px-3 py-3 text-sm font-semibold">
                      {formatCurrency(subtotal)}
                    </div>
                  </div>
                );
              })}

              {pedido.items.length < 10 &&
                Array.from({
                  length: 10 - pedido.items.length,
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="grid h-10 grid-cols-[90px_1fr_140px_150px] border-b border-gray-800"
                  >
                    <div className="border-r border-gray-800" />
                    <div className="border-r border-gray-800" />
                    <div className="border-r border-gray-800" />
                    <div />
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex">
              <div className="bg-gray-800 px-7 py-4 text-base font-bold uppercase text-white">
                Total R$
              </div>

              <div className="min-w-47.5 border-l-2 border-gray-800 px-5 py-4 text-right text-xl font-bold">
                {formatCurrency(total)}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-800 p-4">
            <p className="text-sm font-semibold italic text-gray-700">
              Agradecemos a preferência.
            </p>

            <p className="mt-1 text-xs italic text-gray-500">
              Pedido registrado em{" "}
              {new Date(pedido.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }

          main {
            padding: 0 !important;
            background: white !important;
          }

          main > div > div:first-child {
            display: none !important;
          }

          main > div {
            max-width: none !important;
          }

          section,
          .bg-white {
            box-shadow: none !important;
          }

          @page {
            size: A4;
            margin: 10mm;
          }
        }
      `}</style>
    </main>
  );
}