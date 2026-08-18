import type { Metadata } from "next";

export function metadataPedido(nomeCliente: string): Metadata {
  return {
    title: `Pedido de ${nomeCliente}`,
  };
}