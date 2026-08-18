"use client";

export function BotaoImprimir() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md bg-black px-4 py-2 text-white print:hidden"
    >
      Imprimir
    </button>
  );
}