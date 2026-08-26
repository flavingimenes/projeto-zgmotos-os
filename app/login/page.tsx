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
    <main className="fixed inset-0 flex h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 px-4">
      <form
        action={formAction}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-2xl shadow-gray-900/10 sm:px-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-1 rounded-xl">
            <Image
              src={newLogo}
              alt="ZGMotos"
              width={350}
              height={100}
              priority
              className="h-auto object-contain"
            />
          </div>

          <h1 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
            Acesso ao sistema
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Entre com suas credenciais para continuar
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

            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-4.5 w-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </span>
              <input
                id="usuario"
                name="usuario"
                type="text"
                placeholder="Digite seu usuário"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-4.5 w-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </span>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
              />
            </div>
          </div>

          {state.error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p className="text-sm font-medium text-red-600">
                {state.error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-900/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending && (
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-5">
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <p className="text-xs font-medium tracking-wide text-gray-400">
            Zero Grau Motos · Sistema Interno
          </p>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
        </div>
      </form>
    </main>
  );
}