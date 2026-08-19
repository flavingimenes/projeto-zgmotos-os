export interface Item {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Moto {
  id: string;
  nome: string;
  placa: string;
}

export interface Cliente {
  id: string;
  name: string;
  empresa: string | null;
  motorcycles: Moto[];
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
}

export function criarItem(
    produto: Produto,
    quantidade: number
): Item {
    return {
        id: crypto.randomUUID(),
        productId: produto.id,
        productName: produto.nome,
        quantity: quantidade,
        unitPrice: produto.preco,
  };
}