"use client";

interface MotoEditInputProps {
  action: (formData: FormData) => void | Promise<void>;
}

const MAX_PLATE = 8;

export default function MotoEditInput({
  action,
}: MotoEditInputProps) {
  return (
    <form
      action={action}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
    >
      <input
        name="nome"
        placeholder="Nome da moto"
        required
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-gray-500"
      />

      <input
        name="placa"
        placeholder="ABC-1D23"
        maxLength={MAX_PLATE}
        required
        onChange={(e) => {
          let valor = e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

          valor = valor.slice(0, 7);

          if (valor.length > 3) {
            valor =
              valor.slice(0, 3) +
              "-" +
              valor.slice(3);
          }

          e.target.value = valor;
        }}
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
      />

      <button
        type="submit"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Cadastrar moto
      </button>
    </form>
  );
}