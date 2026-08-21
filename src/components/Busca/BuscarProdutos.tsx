"use client";

import Link from "next/link";
import { useState } from "react";

interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
}

interface Props {
  produtos: Produto[];
}

export default function BuscaProdutos({ produtos }: Props) {
  const [busca, setBusca] = useState("");

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto pelo nome..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="mb-5">
        <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-black text-white">
          {produtosFiltrados.length}{" "}
          {produtosFiltrados.length === 1 ? "produto registrado" : "produtos registrado"}
        </span>
      </div>

      {produtosFiltrados.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="font-medium text-gray-700">
            {busca
              ? "Nenhum produto encontrado"
              : "Nenhum produto cadastrado"}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {busca
              ? "Tente alterar o termo da busca."
              : "Os produtos cadastrados aparecerão aqui."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <Link
              key={produto.id}
              href={`/produtos/${produto.id}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>

                  <p className="truncate text-lg font-semibold text-gray-900">
                    {produto.nome}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Valor
                  </p>

                  <p className="text-xl font-bold text-green-600">
                    {Number(produto.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>

              <div className="px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Descrição
                </p>

                <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                  {produto.descricao || "Não informado"}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                <p className="text-sm font-medium text-gray-600">
                  Ver detalhes do produto
                </p>

                <svg
                  className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}