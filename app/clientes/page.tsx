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
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>

          <p className="mt-1 text-sm text-gray-500">
            Consulte e pesquise os clientes cadastrados.
          </p>
        </div>

        <form className="mb-8 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
          <input
            type="text"
            name="busca"
            placeholder="Buscar cliente pelo nome..."
            defaultValue={busca}
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Buscar
          </button>
        </form>

        <div className="mb-3">
          <h2 className="font-bold text-gray-900">
            Clientes cadastrados:
          </h2>
        </div>

        {clientes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
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
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <Link
                key={cliente.id}
                href={`/clientes/${cliente.id}`}
                className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="border-b border-gray-100 px-5 py-4">
                  <p className="text-lg font-semibold text-gray-900">
                    {cliente.name}
                  </p>

                  {cliente.empresa && (
                    <p className="text-sm text-gray-500">
                      {cliente.empresa}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Telefone
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {cliente.phone
                        ? formatarTelefone(cliente.phone)
                        : "Não informado"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Empresa
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {cliente.empresa || "Não informado"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Cidade
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {cliente.city || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                  <p className="text-sm font-medium text-gray-600">
                    Ver detalhes do cliente →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}