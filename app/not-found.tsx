// app/not-found.tsx

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-gray-600">
        Página não encontrada.
      </p>

      <a
        href="/"
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
      >
        Voltar para o início
      </a>
    </div>
  );
}