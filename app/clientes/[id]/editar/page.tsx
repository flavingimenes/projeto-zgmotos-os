import { prisma } from "@/src/lib/prisma";
import { updateCustomer } from "@/src/lib/actions/costumer";
import { notFound } from "next/navigation";
import { title } from "process";

export default async function EditarCliente({
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

  const update = updateCustomer.bind(null, cliente.id);

  const MAX_LENGHT = 11;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900">
          Editar cliente
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Altere os dados do cliente.
        </p>

        <form
          action={update}
          className="mt-6 rounded-lg border border-gray-200 bg-white p-5"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                name="name"
                defaultValue={cliente.name}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Empresa
              </label>

              <input
                name="empresa"
                defaultValue={cliente.empresa ?? ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Telefone
              </label>

              <input
                name="phone"
                maxLength={MAX_LENGHT}
                defaultValue={cliente.phone ?? ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cidade
              </label>

              <input
                name="city"
                defaultValue={cliente.city ?? ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </main>
  );
}