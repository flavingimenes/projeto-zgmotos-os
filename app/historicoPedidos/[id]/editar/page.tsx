import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import EditarPedidoForm from "@/src/components/PedidoForm/EditarPedidoForm";

export default async function EditarPedido({
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

  const produtos = await prisma.product.findMany({
    select: {
      id: true,
      nome: true,
      preco: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <EditarPedidoForm
      pedido={{
        id: pedido.id,
        tipo: pedido.tipo,
        pagamento: pedido.pagamento,
        prazoEntrega: pedido.prazoEntrega
          ? pedido.prazoEntrega.toISOString().split("T")[0]
          : "",
        customer: {
          name: pedido.customer.name,
          empresa: pedido.customer.empresa,
        },
        items: pedido.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          productNome: item.product.nome,
          quantidade: item.quantidade,
          valorUnitario: Number(item.valorUnitario),
        })),
      }}
      produtos={produtos.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
      }))}
    />
  );
}