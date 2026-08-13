import Link from "next/link";
import { prisma } from "../../src/lib/prisma";

export default async function Clientes() {
  const clientes = await prisma.customer.findMany();

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

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {clientes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500">
                Nenhum cliente cadastrado.
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
                    <div>
                      <p className="font-medium text-gray-900">
                        {cliente.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        #{index + 1}
                      </p>
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