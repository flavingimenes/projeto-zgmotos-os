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

  const clientes = await prisma.customer.findMany({
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
    customerId: pedido.customerId,       // <- adicionar
    motorcycleId: pedido.motorcycleId,   // <- adicionar (se existir no model Order)
    items: pedido.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.product.nome,    // <- atenção ao nome do campo (ver abaixo)
      quantidade: item.quantidade,
      valorUnitario: Number(item.valorUnitario),
    })),
  }}
  produtos={produtos.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    preco: Number(produto.preco),
  }))}
  clientes={clientes}
/>
  );
}