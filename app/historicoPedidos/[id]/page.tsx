import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { BotaoImprimir } from "@/src/components/Buttons/PrintButton";
import { metadataPedido } from "@/src/lib/metadata";
import { Metadata } from "next";
import Image from "next/image";

import wallLogo from "@/assets/Pictures/wallLogo-removebg.png"
import BackButton from "@/src/components/Buttons/BackButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const pedido = await prisma.order.findUnique({
    where: { id },
    select: {
      customer: {
        select: {
          name: true,
        },
      },
    },
  });

  return pedido
    ? metadataPedido(pedido.customer.name)
    : { title: "Pedido" };
}

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
      motorcycle: true,
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
    (acc, item) => acc + item.quantidade * Number(item.valorUnitario),
    0,
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6 print:bg-white print:p-0">
      <BackButton />
      <div className="mx-auto max-w-3xl print:max-w-none">
        <div className="mb-4 flex items-center justify-between print:hidden">
          <div>
            <h1 className="text-lg font-bold uppercase text-gray-900">
              Pedido #{pedido.id.slice(-6).toUpperCase()}
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              Visualização detalhada do pedido
            </p>
          </div>

          <BotaoImprimir />
        </div>

        <div className="mb-4 flex justify-center">
          <Image
            src={wallLogo}
            alt="Logo da empresa"
            width={200}
            height={50}
          />
        </div>

        <div
          className="
            pedido-impressao
            overflow-hidden
            rounded-sm
            border
            border-gray-300
            bg-white
            text-sm
            shadow-sm
          "
        >
          <div className="grid grid-cols-[1fr_130px] border-b border-gray-300">
            <div className="flex items-center gap-6 px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-sm border border-gray-400 text-[10px] ${
                    pedido.tipo === "PEDIDO" ? "bg-gray-800 text-white border-gray-800" : ""
                  }`}
                >
                  {pedido.tipo === "PEDIDO" ? "✓" : ""}
                </span>
                Pedido
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-sm border border-gray-400 text-[10px] ${
                    pedido.tipo === "ORCAMENTO" ? "bg-gray-800 text-white border-gray-800" : ""
                  }`}
                >
                  {pedido.tipo === "ORCAMENTO" ? "✓" : ""}
                </span>
                Orçamento
              </div>
            </div>

            <div className="border-l border-gray-300 px-3 py-2.5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Data</p>

              <p className="mt-0.5 text-sm font-semibold text-gray-800">
                {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-300 px-4 py-3">
            <div className="mb-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Cliente
              </p>

              <p className="border-b border-gray-200 pb-1 text-sm font-medium text-gray-800">
                {pedido.customer.name}
              </p>
            </div>

            {pedido.customer.empresa && (
              <div className="mb-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Empresa
                </p>

                <p className="border-b border-gray-200 pb-1 text-sm font-medium text-gray-800">
                  {pedido.customer.empresa}
                </p>
              </div>
            )}

            {pedido.motorcycle && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Moto
                  </p>

                  <p className="border-b border-gray-200 pb-1 text-sm font-medium text-gray-800">
                    {pedido.motorcycle.nome}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Placa
                  </p>

                  <p className="border-b border-gray-200 pb-1 text-sm font-medium text-gray-800">
                    {pedido.motorcycle.placa}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 border-b border-gray-300">
            <div className="border-r border-gray-300 px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Cidade
              </p>

              <p className="mt-0.5 text-sm font-medium text-gray-800">
                {pedido.customer.city || "-"}
              </p>
            </div>

            <div className="border-r border-gray-300 px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Cond. de Pagamento
              </p>

              <p className="mt-0.5 text-sm font-medium text-gray-800">{pedido.pagamento}</p>
            </div>

            <div className="px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Prazo de Entrega
              </p>

              <p className="mt-0.5 text-sm font-medium text-gray-800">
                {pedido.prazoEntrega
                  ? new Date(pedido.prazoEntrega).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[70px_1fr_110px_120px] bg-gray-800 text-white">
              <div className="border-r border-gray-600 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide">
                Quant.
              </div>

              <div className="border-r border-gray-600 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide">
                Discriminação
              </div>

              <div className="border-r border-gray-600 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide">
                Unit.
              </div>

              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide">Total</div>
            </div>

            {pedido.items.map((item) => {
              const valorUnitario = Number(item.valorUnitario);
              const subtotal = item.quantidade * valorUnitario;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[70px_1fr_110px_120px] border-b border-gray-200"
                >
                  <div className="border-r border-gray-200 px-3 py-2 text-sm text-gray-700">
                    {item.quantidade}
                  </div>

                  <div className="border-r border-gray-200 px-3 py-2 text-sm font-medium text-gray-800">
                    {item.product.nome}
                  </div>

                  <div className="border-r border-gray-200 px-3 py-2 text-sm text-gray-700">
                    {formatCurrency(valorUnitario)}
                  </div>

                  <div className="px-3 py-2 text-sm font-semibold text-gray-800">
                    {formatCurrency(subtotal)}
                  </div>
                </div>
              );
            })}

            {pedido.items.length < 8 &&
              Array.from({
                length: 8 - pedido.items.length,
              }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="grid h-7 grid-cols-[70px_1fr_110px_120px] border-b border-gray-200"
                >
                  <div className="border-r border-gray-200" />
                  <div className="border-r border-gray-200" />
                  <div className="border-r border-gray-200" />
                  <div />
                </div>
              ))}
          </div>

          <div className="flex justify-end border-t border-gray-300">
            <div className="flex">
              <div className="bg-gray-800 px-5 py-2.5 text-sm font-semibold uppercase text-white">
                Total R$
              </div>

              <div className="min-w-35 border-l border-gray-300 px-4 py-2.5 text-right text-base font-bold text-gray-800">
                {formatCurrency(total)}
              </div>
            </div>
          </div>

          {pedido.observacoes && (
            <div className="border-t border-gray-300 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Observações
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {pedido.observacoes}
              </p>
            </div>
          )}

          <div className="border-t border-gray-300 px-4 py-3">
            <p className="text-xs font-medium italic text-gray-600">
              Agradecemos a preferência.
            </p>

            <p className="mt-0.5 text-[11px] italic text-gray-400">
              Pedido registrado em{" "}
              {new Date(pedido.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}