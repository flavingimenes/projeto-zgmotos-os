"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-gray-800 px-5 py-2.5 text-sm font-bold uppercase text-white transition hover:bg-gray-700"
    >
      Imprimir
    </button>
  );
}