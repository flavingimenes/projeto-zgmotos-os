"use client";

import { useState } from "react";
import { deleteCustomer } from "@/src/lib/actions/costumer";

interface DeleteCustomerButtonProps {
  id: string;
  name: string;
}

export default function DeleteCustomerButton({
  id,
  name,
}: DeleteCustomerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão que abre o modal */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Excluir cliente
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Excluir cliente
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tem certeza que deseja excluir{" "}
              <span className="font-medium text-gray-900">
                {name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>

              <form action={deleteCustomer.bind(null, id)}>
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Excluir
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}