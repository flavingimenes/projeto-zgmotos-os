"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMotorcycle(
  customerId: string,
  formData: FormData
) {
  const nome = formData.get("nome")?.toString().trim() ?? "";
  const placa = formData.get("placa")?.toString().trim() ?? "";

  if (!nome || !placa) {
    throw new Error("Nome e placa são obrigatórios.");
  }

  await prisma.motorcycle.create({
    data: {
      nome,
      placa,
      customerId,
    },
  });

  revalidatePath(`/clientes/${customerId}`);
  revalidatePath("/pedidos");
}

export async function deleteMotorcycle(id: string, customerId: string) {
  await prisma.motorcycle.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/clientes/${customerId}`);
  revalidatePath("/pedidos");
}