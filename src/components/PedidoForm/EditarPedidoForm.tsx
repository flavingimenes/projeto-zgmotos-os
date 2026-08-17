"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { updateOrder } from "@/src/lib/actions/order";

interface Produto {
  id: string;
  nome: string;
  preco: number;
}

interface ItemPedido {
  id: string;
  productId: string;
  productNome: string;
  quantidade: number;
  valorUnitario: number;
}

interface Pedido {
  id: string;
  tipo: "PEDIDO" | "ORCAMENTO";
  pagamento: string;
  prazoEntrega: string;
  customer: {
    name: string;
    empresa: string | null;
  };
  items: ItemPedido[];
}

interface EditarPedidoFormProps {
  pedido: Pedido;
  produtos: Produto[];
}

export default function EditarPedidoForm({
  pedido,
  produtos,
}: EditarPedidoFormProps) {
  const [items, setItems] = useState<ItemPedido[]>(pedido.items);

  const [buscaProduto, setBuscaProduto] = useState("");
  const [listaAberta, setListaAberta] = useState(false);

  const comboboxRef = useRef<HTMLDivElement>(null);

  const produtosFiltrados = useMemo(() => {
    const busca = buscaProduto.trim().toLowerCase();

    if (!busca) {
      return produtos;
    }

    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(busca),
    );
  }, [buscaProduto, produtos]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setListaAberta(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function selecionarProduto(produto: Produto) {
    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        productId: produto.id,
        productNome: produto.nome,
        quantidade: 1,
        valorUnitario: produto.preco,
      },
    ]);

    setBuscaProduto("");
    setListaAberta(false);
  }

  function removerProduto(id: string) {
    setItems((current) =>
      current.filter((item) => item.id !== id),
    );
  }

  function alterarProduto(id: string, productId: string) {
    const produto = produtos.find(
      (produto) => produto.id === productId,
    );

    if (!produto) {
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              productId: produto.id,
              productNome: produto.nome,
              valorUnitario: produto.preco,
            }
          : item,
      ),
    );
  }

  function alterarQuantidade(
    id: string,
    quantidade: number,
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade,
            }
          : item,
      ),
    );
  }

  function alterarValor(
    id: string,
    valorUnitario: number,
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              valorUnitario,
            }
          : item,
      ),
    );
  }

  const total = items.reduce(
    (acc, item) =>
      acc + item.quantidade * item.valorUnitario,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-900">
          Editar pedido
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Altere os dados e os produtos do pedido.
        </p>

        <form
          action={updateOrder.bind(null, pedido.id)}
          className="mt-6 rounded-lg border border-gray-200 bg-white p-5"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cliente
              </label>

              <input
                value={pedido.customer.name}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600 outline-none"
              />
            </div>

            {pedido.customer.empresa && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Empresa
                </label>

                <input
                  value={pedido.customer.empresa}
                  disabled
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600 outline-none"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tipo
              </label>

              <select
                name="tipo"
                defaultValue={pedido.tipo}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-gray-500"
              >
                <option value="PEDIDO">Pedido</option>
                <option value="ORCAMENTO">Orçamento</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Pagamento
              </label>

              <input
                name="pagamento"
                defaultValue={pedido.pagamento}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Prazo de entrega
              </label>

              <input
                type="date"
                name="prazoEntrega"
                defaultValue={pedido.prazoEntrega}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-gray-500"
              />
            </div>

            <div ref={comboboxRef} className="relative">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Adicionar produto
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
                      >
                        <button
                          type="button"
                          onClick={() =>
                            selecionarProduto(produto)
                          }
                          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-black hover:bg-gray-100"
                        >
                          <span className="truncate">
                            {produto.nome}
                          </span>

                          <span className="whitespace-nowrap text-gray-500">
                            {produto.preco.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              },
                            )}
                          </span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Produtos do pedido
                </label>

                <span className="text-xs text-gray-500">
                  {items.length}{" "}
                  {items.length === 1
                    ? "produto"
                    : "produtos"}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                  <p className="text-sm text-gray-500">
                    Nenhum produto adicionado ao pedido.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="grid gap-3 md:grid-cols-[1fr_100px_140px_auto]">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Produto
                          </label>

                          <select
                            name="productId"
                            value={item.productId}
                            onChange={(e) =>
                              alterarProduto(
                                item.id,
                                e.target.value,
                              )
                            }
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-gray-500"
                          >
                            {produtos.map((produto) => (
                              <option
                                key={produto.id}
                                value={produto.id}
                              >
                                {produto.nome}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Quantidade
                          </label>

                          <input
                            type="number"
                            name="quantidade"
                            min="1"
                            value={item.quantidade}
                            onChange={(e) =>
                              alterarQuantidade(
                                item.id,
                                Number(e.target.value),
                              )
                            }
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-gray-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Valor unitário
                          </label>

                          <input
                            type="number"
                            name="valorUnitario"
                            min="0"
                            step="0.01"
                            value={item.valorUnitario}
                            onChange={(e) =>
                              alterarValor(
                                item.id,
                                Number(e.target.value),
                              )
                            }
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-gray-500"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() =>
                              removerProduto(item.id)
                            }
                            className="w-full rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 md:w-auto"
                          >
                            Remover
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-gray-200 pt-3 text-right">
                        <span className="text-xs text-gray-500">
                          Subtotal:{" "}
                        </span>

                        <span className="font-semibold text-gray-800">
                          {(
                            item.quantidade *
                            item.valorUnitario
                          ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Total do pedido
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-5 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </main>
  );
}