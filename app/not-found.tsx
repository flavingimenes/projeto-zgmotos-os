import Link from "next/link";
import { FaHouse, FaTriangleExclamation } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <FaTriangleExclamation className="text-xl text-gray-500" />
          </div>

          <h1 className="mt-2 text-7xl font-bold tracking-tight text-gray-900">
            404
          </h1>

          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Página não encontrada
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            A página que você está procurando não existe ou foi movida.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            <FaHouse className="text-sm" />
            Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  );
}