import { prisma } from "@/src/lib/prisma";

interface FinanceiroProps {
  searchParams: Promise<{
    mes?: string;
    ano?: string;
  }>;
}

const MESES = [
  { valor: 1, nome: "Janeiro" },
  { valor: 2, nome: "Fevereiro" },
  { valor: 3, nome: "Março" },
  { valor: 4, nome: "Abril" },
  { valor: 5, nome: "Maio" },
  { valor: 6, nome: "Junho" },
  { valor: 7, nome: "Julho" },
  { valor: 8, nome: "Agosto" },
  { valor: 9, nome: "Setembro" },
  { valor: 10, nome: "Outubro" },
  { valor: 11, nome: "Novembro" },
  { valor: 12, nome: "Dezembro" },
] as const;

function gerarAnosDisponiveis(anoAtual: number) {
  const anos: number[] = [];
  for (let i = anoAtual - 1; i <= anoAtual; i++) {
    anos.push(i);
  }
  return anos;
}

export default async function Financeiro({ searchParams }: FinanceiroProps) {
  const params = await searchParams;
  
  const hoje = new Date();

  const mesParam = Number(params.mes);

  const mesSelecionado =
    Number.isInteger(mesParam) && mesParam >= 1 && mesParam <= 12
      ? mesParam
      : hoje.getMonth() + 1;

  const anoParam = Number(params.ano);

  const anoSelecionado =
    Number.isInteger(anoParam) && anoParam >= 2000 && anoParam <= 2100
      ? anoParam
      : hoje.getFullYear();

  const inicioMes = new Date(anoSelecionado, mesSelecionado - 1, 1, 0, 0, 0);

  const inicioProximoMes = new Date(anoSelecionado, mesSelecionado, 1, 0, 0, 0);

  let pedidos: Array<{
    items: { quantidade: unknown; valorUnitario: unknown }[];
  }> = [];
  let erro: string | null = null;

  try {
    pedidos = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: inicioMes,
          lt: inicioProximoMes,
        },
      },
      select: {
        items: {
          select: {
            quantidade: true,
            valorUnitario: true,
          },
        },
      },
    });
  } catch (e) {
    erro = "Não foi possível carregar os dados financeiros. Tente novamente.";
  }

  const total = pedidos.reduce((acc, pedido) => {
    const totalPedido = pedido.items.reduce(
      (soma, item) =>
        soma + Number(item.quantidade) * Number(item.valorUnitario),
      0,
    );
    return acc + totalPedido;
  }, 0);

  const anosDisponiveis = gerarAnosDisponiveis(hoje.getFullYear());
  
  const nomeMesSelecionado = MESES.find(
    (m) => m.valor === mesSelecionado,
  )?.nome;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          Financeiro
        </span>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
          Resumo financeiro
        </h1>

        <p className="mt-2 text-gray-600">
          Consulte o valor total dos pedidos por mês.
        </p>
      </div>

      <form
        method="GET"
        className="mb-6 flex flex-wrap items-end gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div>
          <label
            htmlFor="mes"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Mês
          </label>
          <select
            id="mes"
            name="mes"
            defaultValue={mesSelecionado}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-500"
          >
            {MESES.map((mes) => (
              <option key={mes.valor} value={mes.valor}>
                {mes.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="ano"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Ano
          </label>
          <select
            id="ano"
            name="ano"
            defaultValue={anoSelecionado}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-500"
          >
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Filtrar
        </button>
      </form>

      {erro ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {erro}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total de {nomeMesSelecionado} {anoSelecionado}
          </p>

          <p className="mt-2 text-4xl font-bold text-gray-900">
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {pedidos.length} pedido(s) encontrado(s).
          </p>
        </div>
      )}
    </main>
  );
}
