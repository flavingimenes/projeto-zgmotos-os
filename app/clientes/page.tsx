import Link from "next/link";
import { prisma } from "../../src/lib/prisma";
import formatarTelefone from "@/src/lib/utils/formatarTelefone";

export default async function Clientes({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string }>;
}) {
  const { busca } = await searchParams;

  const clientes = await prisma.customer.findMany({
    where: busca
      ? {
          name: {
            contains: busca,
          },
        }
      : undefined,
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Clientes
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Lista de clientes cadastrados
          </p>
        </div>

        {/* Busca */}
        <form className="mb-6 flex gap-2">
          <input
            type="text"
            name="busca"
            placeholder="Buscar cliente pelo nome..."
            defaultValue={busca}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none text-black"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2 text-sm text-white"
          >
            Buscar
          </button>
        </form>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {clientes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500">
                {busca
                  ? `Nenhum cliente encontrado para "${busca}".`
                  : "Nenhum cliente cadastrado."}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {clientes.map((cliente, index) => (
                <li key={cliente.id}>
                  <Link
                    href={`/clientes/${cliente.id}`}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{cliente.name}</p>

                  {cliente.empresa && (
                    <p className="mt-1 text-sm text-gray-500">
                      {cliente.empresa}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    {cliente.phone && (
                      <span>Telefone: {formatarTelefone(cliente.phone)}</span>
                    )}

                    {cliente.city && <span>📍 {cliente.city}</span>}
                  </div>
                </div>
              </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}