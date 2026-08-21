"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateOrderInput {
  customerId: string;
  motorcycleId?: string;
  tipo: "PEDIDO" | "ORCAMENTO";
  pagamento: string;
  prazoEntrega?: string;
  observacoes?: string;
  items: {
    productId: string;
    quantidade: number;
    valorUnitario: number;
  }[];
}

export async function createOrder(input: CreateOrderInput) {
  if (input.items.length === 0) {
    throw new Error("O pedido precisa ter pelo menos um item.");
  }

  await prisma.order.create({
    data: {
      customerId: input.customerId,
      motorcycleId: input.motorcycleId || null,
      tipo: input.tipo,
      pagamento: input.pagamento,
      prazoEntrega: input.prazoEntrega
        ? new Date(input.prazoEntrega)
        : null,
      observacoes: input.observacoes || null,

      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
        })),
      },
    },
  });

    revalidatePath("/pedidos");

  return {
    success: true,
  };
}

interface UpdateOrderInput {
  customerId: string;
  motorcycleId?: string;
  tipo: "PEDIDO" | "ORCAMENTO";
  pagamento: string;
  prazoEntrega?: string;
  observacoes?: string;
  items: {
    productId: string;
    quantidade: number;
    valorUnitario: number;
  }[];
}

export async function updateOrder(id: string, input: UpdateOrderInput) {
  if (input.items.length === 0) {
    throw new Error("O pedido precisa ter pelo menos um item.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id },
      data: {
        customerId: input.customerId,
        motorcycleId: input.motorcycleId || null,
        tipo: input.tipo,
        pagamento: input.pagamento,
        prazoEntrega: input.prazoEntrega
          ? new Date(input.prazoEntrega)
          : null,
        observacoes: input.observacoes || null,
      },
    });

    await tx.orderItem.deleteMany({
      where: { orderId: id },
    });

    await tx.orderItem.createMany({
      data: input.items.map((item) => ({
        orderId: id,
        productId: item.productId,
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
      })),
    });
  });

  revalidatePath("/historicoPedidos");
  revalidatePath(`/historicoPedidos/${id}`);

  redirect(`/historicoPedidos/${id}`);
}

export async function deleteOrder(id: string) {
  await prisma.order.delete({
    where: {
      id,
    },
  });

  revalidatePath("/historicoPedidos");
}