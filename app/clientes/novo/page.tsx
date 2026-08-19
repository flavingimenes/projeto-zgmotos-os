import { prisma } from "@/src/lib/prisma";
import { createCustomer } from "@/src/lib/actions/costumer";
import formatarTelefone from "@/src/lib/utils/formatarTelefone";
import { MotoInputs } from "@/src/components/MotoInput";

export default async function Clientes() {
  const clientes = await prisma.customer.findMany({
    include: {
      motorcycles: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const MAX_LENGTH = 11;
  const MAX_PLATE = 8;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>

          <p className="mt-1 text-sm text-gray-500">
            Cadastre e gerencie seus clientes.
          </p>
        </div>

        <form
          action={createCustomer}
          className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Cadastrar novo cliente
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Preencha as informações abaixo para cadastrar um cliente.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                name="name"
                placeholder="Nome completo"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
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
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
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
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cidade
              </label>

              <select
                name="city"
                defaultValue=""
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-gray-400 focus:bg-white"
              >
                <option value="" disabled>
                  Selecione a cidade
                </option>

                <option value="Cuiabá">Cuiabá</option>
                <option value="Várzea Grande">Várzea Grande</option>
              </select>
            </div>

            <MotoInputs />
          </div>

          <button
            type="submit"
            className="mt-5 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Cadastrar cliente
          </button>
        </form>

        <div className="mb-3">
          <h2 className="font-bold text-gray-900">
            Ultimos clientes cadastrados:
          </h2>
        </div>

        <div className="space-y-4">
          {clientes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="font-medium text-gray-700">
                Nenhum cliente cadastrado
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Os clientes cadastrados aparecerão aqui.
              </p>
            </div>
          ) : (
            clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {cliente.name}
                    </p>

                    {cliente.empresa && (
                      <p className="text-sm text-gray-500">{cliente.empresa}</p>
                    )}
                  </div>

                  {cliente.city && (
                    <div className="text-left md:text-right">
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Cidade
                      </p>

                      <p className="text-sm font-medium text-gray-800">
                        {cliente.city}
                      </p>
                    </div>
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
                      Cadastrado em
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {cliente.createdAt.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Motos
                  </p>

                  {cliente.motorcycles.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Nenhuma moto cadastrada
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {cliente.motorcycles.map((moto) => (
                        <p
                          key={moto.id}
                          className="text-sm font-medium text-gray-800"
                        >
                          {moto.nome} - {moto.placa}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
