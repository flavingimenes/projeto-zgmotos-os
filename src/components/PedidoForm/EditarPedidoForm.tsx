"use client";

import { useState } from "react";
import { updateOrder } from "../../lib/actions/order";
import { criarItem, type Item, type Produto, type Cliente } from "./itens";
import { useRouter } from "next/navigation";

interface PedidoExistente {
  id: string;
  tipo: "PEDIDO" | "ORCAMENTO";
  pagamento: string;
  prazoEntrega?: string | null;
  observacoes?: string | null;
  customerId: string;
  motorcycleId?: string | null;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantidade: number;
    valorUnitario: number;
  }[];
}

interface EditarPedidoFormProps {
  clientes: Cliente[];
  produtos: Produto[];
  pedido: PedidoExistente;
}

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function EditarPedidoForm({
  clientes,
  produtos,
  pedido,
}: EditarPedidoFormProps) {
  const clienteDoPedido =
    clientes.find((c) => c.id === pedido.customerId) ?? null;

  const [itens, setItens] = useState<Item[]>(() =>
    pedido.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantidade,
      unitPrice: item.valorUnitario,
    })),
  );

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null,
  );
  const [quantidade, setQuantidade] = useState(1);
  const [buscaProduto, setBuscaProduto] = useState("");
  const [listaAberta, setListaAberta] = useState(false);

  const [motoId, setMotoId] = useState(pedido.motorcycleId ?? "");

  const [tipo, setTipo] = useState<"" | "PEDIDO" | "ORCAMENTO">(pedido.tipo);
  const [pagamento, setPagamento] = useState(pedido.pagamento);
  const [prazoEntrega, setPrazoEntrega] = useState(pedido.prazoEntrega ?? "");
  const [observacoes, setObservacoes] = useState(pedido.observacoes ?? "");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(buscaProduto.trim().toLowerCase()),
  );

  function selecionarProduto(produto: Produto) {
    setProdutoSelecionado(produto);
    setBuscaProduto(produto.nome);
    setListaAberta(false);
  }

  function removerItem(id: string) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id: string, novaQuantidade: number) {
    const quantidadeValida = Math.max(
      1,
      Number.isFinite(novaQuantidade) ? novaQuantidade : 1,
    );

    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === id ? { ...item, quantity: quantidadeValida } : item,
      ),
    );
  }

  function adicionarItem() {
    if (!produtoSelecionado) return;
    if (!Number.isFinite(quantidade) || quantidade < 1) return;

    const novoItem = criarItem(produtoSelecionado, quantidade);

    setItens((itensAtuais) => [...itensAtuais, novoItem]);

    setProdutoSelecionado(null);
    setQuantidade(1);
    setBuscaProduto("");
  }

  const total = itens.reduce(
    (soma, item) => soma + item.quantity * item.unitPrice,
    0,
  );

  async function handleSalvar() {
    setErro(null);

    if (!tipo) {
      setErro("Selecione o tipo do pedido.");
      return;
    }

    if (!pagamento) {
      setErro("Selecione a condição de pagamento.");
      return;
    }

    if (itens.length === 0) {
      setErro("Adicione ao menos um item ao pedido.");
      return;
    }

    setSalvando(true);

    try {
      await updateOrder(pedido.id, {
        customerId: pedido.customerId,
        motorcycleId: motoId || undefined,
        tipo,
        pagamento,
        prazoEntrega: prazoEntrega || undefined,
        observacoes: observacoes || undefined,
        items: itens.map((item) => ({
          productId: item.productId,
          quantidade: item.quantity,
          valorUnitario: item.unitPrice,
        })),
      });

    } catch (error) {
      console.error(error);
      setErro("Não foi possível salvar o pedido. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Cliente — somente exibição, não editável */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Cliente
            </label>

            <div className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-gray-700">
              {clienteDoPedido
                ? clienteDoPedido.empresa
                  ? `${clienteDoPedido.name} - ${clienteDoPedido.empresa}`
                  : clienteDoPedido.name
                : "Cliente não encontrado"}
            </div>
          </div>

          {/* Moto do cliente — editável */}
          {clienteDoPedido && clienteDoPedido.motorcycles.length > 0 && (
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Moto do cliente
                <span className="ml-1 font-normal text-gray-400">
                  (opcional)
                </span>
              </label>

              <select
                value={motoId}
                onChange={(e) => setMotoId(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-gray-500"
              >
                <option value="">Nenhuma</option>
                {clienteDoPedido.motorcycles.map((moto) => (
                  <option key={moto.id} value={moto.id}>
                    {moto.nome} - {moto.placa}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 sm:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Itens do pedido
            </h2>

            <div className="grid gap-4 sm:grid-cols-[1fr_120px_auto]">
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Produto
                </label>

                <input
                  type="text"
                  role="combobox"
                  aria-expanded={listaAberta}
                  aria-controls="lista-produtos"
                  autoComplete="off"
                  value={buscaProduto}
                  onChange={(e) => {
                    setBuscaProduto(e.target.value);
                    setProdutoSelecionado(null);
                    setListaAberta(true);
                  }}
                  onFocus={() => setListaAberta(true)}
                  placeholder="Buscar produto..."
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />

                {listaAberta && (
                  <ul
                    id="lista-produtos"
                    role="listbox"
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {produtosFiltrados.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        Nenhum produto encontrado
                      </li>
                    ) : (
                      produtosFiltrados.map((produto) => (
                        <li
                          key={produto.id}
                          role="option"
                          aria-selected={produtoSelecionado?.id === produto.id}
                        >
                          <button
                            type="button"
                            onClick={() => selecionarProduto(produto)}
                            className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-black hover:bg-gray-100"
                          >
                            <span className="truncate">{produto.nome}</span>
                            <span className="whitespace-nowrap text-gray-500">
                              {formatBRL(produto.preco)}
                            </span>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Quantidade
                </label>

                <input
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={(e) =>
                    setQuantidade(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={adicionarItem}
                  disabled={!produtoSelecionado}
                  className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
                >
                  Adicionar item
                </button>
              </div>
            </div>

            {itens.length > 0 && (
              <div className="mt-4 space-y-2">
                {itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <span className="min-w-0 truncate font-medium text-gray-800">
                      {item.productName}
                    </span>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          alterarQuantidade(item.id, Number(e.target.value))
                        }
                        className="w-20 rounded-md border border-gray-300 px-2 py-1 text-black"
                      />

                      <span className="whitespace-nowrap text-sm text-gray-700">
                        {formatBRL(item.quantity * item.unitPrice)}
                      </span>

                      <button
                        type="button"
                        onClick={() => removerItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}

                <p className="pt-2 text-right text-sm font-semibold text-gray-900">
                  Total: {formatBRL(total)}
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Condição de pagamento
              </label>

              <select
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black"
              >
                <option value="">Selecione</option>
                <option value="A_VISTA">À vista</option>
                <option value="PIX">Pix</option>
                <option value="CARTAO">Cartão</option>
                <option value="BOLETO">Boleto</option>
                <option value="PARCELADO">Parcelado</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tipo
              </label>

              <select
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value as "" | "PEDIDO" | "ORCAMENTO")
                }
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black"
              >
                <option value="">Selecione</option>
                <option value="PEDIDO">Pedido</option>
                <option value="ORCAMENTO">Orçamento</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Prazo de entrega
              </label>

              <input
                type="date"
                value={prazoEntrega}
                onChange={(e) => setPrazoEntrega(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Observações
              <span className="ml-1 font-normal text-gray-400">
                (opcional)
              </span>
            </label>

            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              placeholder="Alguma observação sobre o pedido..."
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        {erro && (
          <p className="mt-4 text-sm font-medium text-red-600">{erro}</p>
        )}

        <button
          type="button"
          onClick={handleSalvar}
          disabled={salvando}
          className="mt-5 w-full rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
        >
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  );
}