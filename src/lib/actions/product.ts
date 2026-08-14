"use server";

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const nome = formData.get("name")?.toString() ?? "";
  const descricao = formData.get("descricao")?.toString() || null;
  const preco = formData.get("preco")?.toString().replace(",", ".") ?? "0";

  await prisma.product.create({
    data: {
      nome,
      descricao,
      preco: new Prisma.Decimal(preco),
    },
  });

  revalidatePath("/produtos");

  redirect("/produtos");
}


export async function updateProduct(
  id: string,
  formData: FormData
) {
  const nome = formData.get("nome")?.toString() ?? "";
  const descricao = formData.get("descricao")?.toString() || null;

  const precoString = formData.get("preco")?.toString() || "0";
  const preco = precoString.replace(",", ".");

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      nome,
      descricao,
      preco,
    },
  });

  revalidatePath("/produtos");
  revalidatePath(`/produtos/${id}`);

  redirect(`/produtos/${id}`);
}


export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/produtos");
  redirect("/produtos");
}