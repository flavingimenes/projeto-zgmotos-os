"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Voltar"
      className="
        group mb-8 inline-flex items-center gap-2
        rounded-lg border border-gray-200
        bg-white px-4 py-2.5
        text-sm font-medium text-gray-600
        shadow-sm
        transition-all duration-200
        hover:border-gray-300
        hover:bg-gray-50
        hover:text-gray-900
        hover:shadow
        active:scale-[0.98]
        print:hidden
      "
    >
      <FaArrowLeft
        size={14}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />

      <span>Voltar</span>
    </button>
  );
}
