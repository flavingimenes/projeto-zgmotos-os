import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteCustomer } from "@/src/lib/actions/costumer";
import DeleteCustomerButton from "@/src/components/DeleteCustomerButton";

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
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-black">
          <p>NOME: </p>
          {cliente.name}
        </h1>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-black">
            <strong>Empresa:</strong> {cliente.empresa || "Não informado"}
          </p>

          <p className="mt-2 text-black">
            <strong>Telefone:</strong> {cliente.phone || "Não informado"}
          </p>

          <p className="mt-2 text-black">
            <strong>Cidade:</strong> {cliente.city || "Não informado"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Cadastrado em: {cliente.createdAt.toLocaleDateString("pt-BR")}
          </p>
        </div>
        <Link
          href={`/clientes/${cliente.id}/editar`}
          className="mt-5 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 mr-4"
        >
          Editar cliente
        </Link>
        
        <DeleteCustomerButton 
          id={cliente.id} 
          name={cliente.name} 
        />
      </div>
    </main>
  );
}
