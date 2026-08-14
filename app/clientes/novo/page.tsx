import { prisma } from "@/src/lib/prisma";
import { createCustomer } from "@/src/lib/actions/costumer";

export default async function Clientes() {
  const clientes = await prisma.customer.findMany();
  const MAX_LENGHT = 11;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Clientes</h1>

        <form
          action={createCustomer}
          className="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              placeholder="Nome"
              required
              className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:black text-black"
            />

            <input
              name="empresa"
              placeholder="Empresa (opcional)"
              className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-gray-500 text-black"
            />

            <input
              name="phone"
              maxLength={MAX_LENGHT}
              placeholder="Telefone (opcional)"
              className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-gray-500 text-black"
            />

            <select
              name="city"
              defaultValue=""
              className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-gray-500 text-black"
            >
              <option value="" disabled>
                Selecione a cidade
              </option>

              <option value="Várzea Grande">Várzea Grande</option>
              <option value="Cuiabá">Cuiabá</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Cadastrar
          </button>
        </form>

        <ul className="space-y-3">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <p className="font-medium text-gray-900">{cliente.name}</p>

              {cliente.empresa && (
                <p className="text-sm text-gray-500">{cliente.empresa}</p>
              )}

              {cliente.phone && (
                <p className="text-sm text-gray-500">{cliente.phone}</p>
              )}

              {cliente.city && (
                <p className="text-sm text-gray-500">{cliente.city}</p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Cadastrado em: {cliente.createdAt.toLocaleString("pt-BR")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
