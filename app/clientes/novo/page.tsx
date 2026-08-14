import { prisma } from "@/src/lib/prisma";
import { createCustomer } from "@/src/lib/actions/costumer";
import formatarTelefone from "@/src/lib/utils/formatarTelefone";

export default async function Clientes() {
  const clientes = await prisma.customer.findMany();

  const MAX_LENGTH = 11;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>

          <p className="mt-1 text-sm text-gray-500">
            Cadastre e gerencie seus clientes.
          </p>
        </div>

        <form
          action={createCustomer}
          className="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                name="name"
                placeholder="Nome completo"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
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
                placeholder="Nome da empresa"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
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
                placeholder="(65) 99999-9999"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cidade
              </label>

              <select
                name="city"
                defaultValue=""
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              >
                <option value="" disabled>
                  Selecione a cidade
                </option>

                <option value="Cuiabá">Cuiabá</option>
                <option value="Várzea Grande">Várzea Grande</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-[0.98]"
          >
            Cadastrar cliente
          </button>
        </form>

        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Clientes cadastrados
          </h2>
        </div>

        <ul className="space-y-3">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
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

              <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-400">
                Cadastrado em: {cliente.createdAt.toLocaleString("pt-BR")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
