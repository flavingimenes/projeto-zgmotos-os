import { prisma } from "../../src/lib/prisma";
export default async function TestePage() {
  const clientes = await prisma.customer.findMany();
  return (
    <ul>
      {clientes.map((cliente) => (
        <li key={cliente.id}>{cliente.name}</li>
        
      ))}
    </ul>
  );
}
