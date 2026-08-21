"use client";

import formatarTelefone from "@/src/lib/utils/formatarTelefone";
import Link from "next/link";
import { useState } from "react";

import { FaUser } from "react-icons/fa";

interface Moto {
  id: string;
  nome: string;
  placa: string;
}

interface Cliente {
  id: string;
  name: string;
  empresa: string | null;
  phone: string | null;
  city: string | null;
  motorcycles: Moto[];
}

interface Props {
  clientes: Cliente[];
}

export default function BuscarClientes({ clientes }: Props) {
  const [busca, setBusca] = useState("");

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(busca.toLowerCase())
  );

  const clientesfiltrados = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main>
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
            placeholder="Buscar cliente pelo nome..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

        <div className="mb-5">
        <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-black text-white">
          {clientesFiltrados.length}{" "}
          {clientesFiltrados.length === 1 ? "cliente registrado" : "clientes registrados"}
        </span>
      </div>

      {clientesFiltrados.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"
              />
            </svg>
          </div>

          <p className="font-medium text-gray-700">
            {busca
              ? "Nenhum cliente encontrado"
              : "Nenhum cliente cadastrado"}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {busca
              ? "Tente alterar o termo da busca."
              : "Os clientes cadastrados aparecerão aqui."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {clientesFiltrados.map((cliente) => (
            <Link
              key={cliente.id}
              href={`/clientes/${cliente.id}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  <FaUser />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-gray-900">
                    {cliente.name}
                  </p>

                  {cliente.empresa && (
                    <p className="truncate text-sm text-gray-500">
                      {cliente.empresa}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 px-5 py-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>

                  <p className="text-sm font-medium text-gray-800">
                    {cliente.phone
                      ? formatarTelefone(cliente.phone)
                      : "Não informado"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <p className="text-sm font-medium text-gray-800">
                    {cliente.city || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 px-5 py-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Motos
                </p>

                {cliente.motorcycles.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Nenhuma moto cadastrada
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-700">
                      {cliente.motorcycles[0].nome} ·{" "}
                      {cliente.motorcycles[0].placa}
                    </span>

                    {cliente.motorcycles.length > 1 && (
                      <span className="text-xs font-medium text-gray-500">
                        +{cliente.motorcycles.length - 1} cadastradas
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                <p className="text-sm font-medium text-gray-600">
                  Ver detalhes do cliente
                </p>

                <svg
                  className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
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
    </main>
  );
}