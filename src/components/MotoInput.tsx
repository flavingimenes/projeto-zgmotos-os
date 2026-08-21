"use client";

import { IdCard } from "lucide-react";
import { RiMotorbikeLine } from "react-icons/ri";

const MAX_PLATE = 8;

export function MotoInputs() {
  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Nome da moto
          <span className="ml-1 font-normal text-gray-400">
            (opcional)
          </span>
        </label>

        <div className="relative">
          <RiMotorbikeLine className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            name="motoNome"
            placeholder="Ex: Honda CG 160"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Placa da moto
          <span className="ml-1 font-normal text-gray-400">
            (opcional)
          </span>
        </label>

        <div className="relative">
          <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            name="motoPlaca"
            maxLength={MAX_PLATE}
            placeholder="ABC-1D23"
            onChange={(e) => {
              let valor = e.target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");

              if (valor.length > 3) {
                valor = valor.slice(0, 3) + "-" + valor.slice(3);
              }

              e.target.value = valor.slice(0, MAX_PLATE);
            }}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>
    </>
  );
}