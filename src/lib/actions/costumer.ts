"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCustomer(formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  const empresa = formData.get("empresa")?.toString() || null;
  const phone = formData.get("phone")?.toString() || null;
  const city = formData.get("city")?.toString() || null;

  await prisma.customer.create({
    data: {
      name,
      empresa,
      phone,
      city,
    },
  });

  revalidatePath("/clientes");

  redirect("/clientes");
}


export async function updateCustomer(
  id: string,
  formData: FormData
) {
  const name = formData.get("name")?.toString() ?? "";
  const empresa = formData.get("empresa")?.toString() || null;
  const phone = formData.get("phone")?.toString() || null;
  const city = formData.get("city")?.toString() || null;

  await prisma.customer.update({
    where: {
      id,
    },
    data: {
      name,
      empresa,
      phone,
      city,
    },
  });

  revalidatePath("/clientes");
  revalidatePath(`/clientes/${id}`);

  redirect(`/clientes/${id}`);
}


export async function deleteCustomer(id: string) {
  try {
    await prisma.customer.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      success: false,
      error:
        "Não é possível excluir este cliente porque ele possui pedidos cadastrados.",
    };
  }

  revalidatePath("/clientes");
  redirect("/clientes");
}