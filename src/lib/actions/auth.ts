"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  prevState: {
    success: boolean;
    error: string;
  },
  formData: FormData
) {
  const usuario = formData.get("usuario")?.toString() ?? "";
  const senha = formData.get("senha")?.toString() ?? "";

  const usuarioOk = usuario === process.env.LOGIN_USER;

  const passHash = Buffer.from(
    process.env.LOGIN_PASS_HASH_B64!,
    "base64"
  ).toString("utf-8");

  const senhaOk = await bcrypt.compare(senha, passHash);

  if (!usuarioOk || !senhaOk) {
    return {
      success: false,
      error: "Usuário ou senha inválidos.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("sessao", process.env.SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("usuario", usuario, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  redirect("/");
}

export async function getUsuarioLogado() {
  const cookieStore = await cookies();
  const usuario = cookieStore.get("usuario")?.value;

  return usuario;
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("sessao");

  redirect("/login");
}