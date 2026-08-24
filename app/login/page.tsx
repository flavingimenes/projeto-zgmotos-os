"use client";

import { useActionState } from "react";
import { login } from "@/src/lib/actions/auth";

const initialState = {
  success: false,
  error: "",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-4 p-6"
      >
        <h1 className="text-xl font-bold">ZGMotos OS</h1>

        <input
          name="usuario"
          placeholder="Usuário"
          className="rounded border p-2"
          required
        />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          className="rounded border p-2"
          required
        />

        {state.error && (
          <p className="text-sm text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}