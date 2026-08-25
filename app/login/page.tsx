"use client";

import { useActionState } from "react";
import { login } from "@/src/lib/actions/auth";
import Image from "next/image";
import newLogo from "@/assets/Pictures/newLogo.jpeg";

const initialState = {
  success: false,
  error: "",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="fixed inset-0 flex h-dvh items-center justify-center overflow-hidden bg-gray-100 px-4">
      <form
        action={formAction}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-xl sm:px-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src={newLogo}
            alt="ZGMotos"
            width={350}
            height={100}
            priority
            className="h-auto object-contain"
          />

          <p className="mt-6 text-sm text-gray-500">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="usuario"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Usuário
            </label>

            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder="Digite seu usuário"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
            />
          </div>

          {state.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-center text-sm font-medium text-red-600">
                {state.error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-gray-900 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-900/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400">ZGMotos OS</p>
        </div>
      </form>
    </main>
  );
}