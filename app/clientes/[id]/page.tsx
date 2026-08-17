import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteCustomerButton from "@/src/components/DeleteCustomerButton";
import formatarTelefone from "@/src/lib/utils/formatarTelefone";

export default async function Cliente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cliente = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  if (!cliente) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Cliente
          </h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <p className="text-lg font-semibold text-gray-900">
              Nome: {cliente.name}
            </p>
          </div>

          <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
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
                Cidade
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {cliente.city || "Não informado"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Cadastrado em
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {cliente.createdAt.toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Ações
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/clientes/${cliente.id}/editar`}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Editar cliente
              </Link>

              <DeleteCustomerButton
                id={cliente.id}
                name={cliente.name}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}