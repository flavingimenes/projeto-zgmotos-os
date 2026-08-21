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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setError("");
    setLoading(true);

    try {
      const result = await deleteCustomer(id);

      if (result?.success === false) {
        setError(result.error);
        setLoading(false);
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar excluir o cliente.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Excluir cliente
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Excluir cliente
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tem certeza que deseja excluir{" "}
              <span className="font-medium text-gray-900">{name}</span>?
            </p>

            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setOpen(false);
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}