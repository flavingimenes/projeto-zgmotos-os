"use server";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

interface CreateOrderInput {
  customerId: string;
  tipo: "PEDIDO" | "ORCAMENTO";
  pagamento: string;
  prazoEntrega?: string;
  items: { 
    productId: string; 
    quantidade: number; 
    valorUnitario: number 
  }[];
}

export async function createOrder(input: CreateOrderInput) {
    if (input.items.length === 0) {
        throw new Error("O pedido precisa ter pelo menos um item;");
    }

  const order = await prisma.order.create({
    data: {
      customerId: input.customerId,
      tipo: input.tipo,
      pagamento: input.pagamento,
      prazoEntrega: input.prazoEntrega ? new Date(input.prazoEntrega) : null,
      items: {
        create: input.items.map((item) => ({
            productId: item.productId,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
        })),
      }
    },
  });
  
  redirect(`/pedidos/${order.id}`);
}
