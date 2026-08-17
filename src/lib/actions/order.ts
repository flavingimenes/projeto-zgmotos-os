"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateOrderInput {
  customerId: string;
  tipo: "PEDIDO" | "ORCAMENTO";
  pagamento: string;
  prazoEntrega?: string;
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
      tipo: input.tipo,
      pagamento: input.pagamento,
      prazoEntrega: input.prazoEntrega
        ? new Date(input.prazoEntrega)
        : null,

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

export async function updateOrder(
  id: string,
  formData: FormData
) {
  const tipo = formData.get("tipo");

  const pagamento = formData.get("pagamento");

  const prazoEntrega = formData.get("prazoEntrega");

  const productIds = formData.getAll("productId");

  const quantidades = formData.getAll("quantidade");

  const valores = formData.getAll("valorUnitario");

  if (
    tipo !== "PEDIDO" &&
    tipo !== "ORCAMENTO"
  ) {
    throw new Error("Tipo de pedido inválido.");
  }

  if (typeof pagamento !== "string") {
    throw new Error("Forma de pagamento inválida.");
  }

  if (typeof prazoEntrega !== "string") {
    throw new Error("Prazo de entrega inválido.");
  }

  if (productIds.length === 0) {
    throw new Error("O pedido precisa ter pelo menos um produto.");
  }

  if (
    productIds.length !== quantidades.length ||
    productIds.length !== valores.length
  ) {
    throw new Error("Os dados dos produtos estão incompletos.");
  }

  const items = productIds.map((productId, index) => {
    const quantidade = Number(quantidades[index]);

    const valorUnitario = Number(valores[index]);

    if (typeof productId !== "string") {
      throw new Error("Produto inválido.");
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      throw new Error("Quantidade inválida.");
    }

    if (!Number.isFinite(valorUnitario) || valorUnitario < 0) {
      throw new Error("Valor unitário inválido.");
    }

    return {
      productId,
      quantidade,
      valorUnitario,
    };
  });

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: {
        id,
      },

      data: {
        tipo,
        pagamento,
        prazoEntrega: prazoEntrega
          ? new Date(prazoEntrega)
          : null,
      },
    });

    await tx.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    await tx.orderItem.createMany({
      data: items.map((item) => ({
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