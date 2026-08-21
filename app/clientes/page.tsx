
import BuscarClientes from "@/src/components/Busca/BuscarClientes";
import { prisma } from "../../src/lib/prisma";

export default async function Clientes(){
  const clientes = await prisma.customer.findMany({
    include: {
      motorcycles: true,
    },
    orderBy: {
      name: "asc"
    }
  });
  

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Consulte e pesquise os clientes cadastrados.
            </p>
          </div>
        </div>

        <BuscarClientes clientes={clientes} />
      </div>
    </main>
  );
}