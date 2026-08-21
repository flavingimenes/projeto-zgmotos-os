import { prisma } from "@/src/lib/prisma";
import { updateCustomer } from "@/src/lib/actions/costumer";
import { notFound } from "next/navigation";
import BackButton from "@/src/components/Buttons/BackButton";

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

  const MAX_LENGTH = 11;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <BackButton />
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Editar cliente
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Altere os dados do cliente cadastrado.
          </p>
        </div>

        <form
          action={update}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Informações do cliente
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Atualize as informações abaixo e salve as alterações.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                name="name"
                defaultValue={cliente.name}
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Empresa
                <span className="ml-1 font-normal text-gray-400">
                  (opcional)
                </span>
              </label>

              <input
                name="empresa"
                defaultValue={cliente.empresa ?? ""}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Telefone
                <span className="ml-1 font-normal text-gray-400">
                  (opcional)
                </span>
              </label>

              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={MAX_LENGTH}
                defaultValue={cliente.phone ?? ""}
                placeholder="(65) 99999-9999"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cidade
              </label>

              <select
                name="city"
                defaultValue={cliente.city ?? ""}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
              >
                <option value="" disabled>
                  Selecione a cidade
                </option>

                <option value="Cuiabá">Cuiabá</option>
                <option value="Várzea Grande">Várzea Grande</option>
              </select>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}