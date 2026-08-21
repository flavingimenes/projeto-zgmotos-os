import Link from "next/link";
import {
  FaUser,
  FaMotorcycle,
  FaBoxOpen,
  FaFileInvoice,
  FaClockRotateLeft,
  FaPrint,
  FaGithub,
} from "react-icons/fa6";

const funcionalidades = [
  {
    icon: FaUser,
    titulo: "Clientes",
    descricao:
      "Cadastro, edição, exclusão e consulta das informações dos clientes.",
  },
  {
    icon: FaMotorcycle,
    titulo: "Motocicletas",
    descricao:
      "Cada cliente pode ter várias motos cadastradas, mantendo os veículos organizados.",
  },
  {
    icon: FaBoxOpen,
    titulo: "Produtos e serviços",
    descricao:
      "Catálogo de produtos e serviços com seus respectivos valores para uso nos pedidos.",
  },
  {
    icon: FaFileInvoice,
    titulo: "Pedidos e orçamentos",
    descricao:
      "Montagem de pedidos com múltiplos itens e cálculo automático do valor total.",
  },
  {
    icon: FaClockRotateLeft,
    titulo: "Histórico",
    descricao:
      "Consulta dos pedidos já registrados, com possibilidade de edição e exclusão.",
  },
  {
    icon: FaPrint,
    titulo: "Impressão",
    descricao:
      "Emissão de uma ficha pronta para impressão, mantendo o formato utilizado pela oficina.",
  },
];

const tecnologias = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "SQLite",
];

export default function Sobre() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <div className="space-y-10">

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              Sobre o projeto
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ZGMotosOS
            </h1>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              Um sistema web desenvolvido para modernizar a gestão de pedidos e
              orçamentos de uma oficina de motos, substituindo a antiga ficha
              física por um processo mais organizado e digital.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://github.com/flavingimenes/projeto-zgmotos-os"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                <FaGithub />
                Ver no GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Como surgiu</h2>

            <div className="mt-4 space-y-4 text-gray-600 leading-7">
              <p>
                O Moto OS nasceu a partir de uma necessidade real de uma oficina
                de motos: digitalizar o processo de registro de pedidos e
                orçamentos que antes era feito em fichas de papel.
              </p>

              <p>
                A ideia foi transformar esse processo em uma aplicação web,
                centralizando clientes, motocicletas, produtos, serviços e
                pedidos em um único lugar.
              </p>

              <p>
                Além de resolver um problema prático, o projeto também foi
                desenvolvido como uma forma de colocar em prática conceitos de
                desenvolvimento web e construir uma aplicação completa, desde a
                interface até a persistência dos dados.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Propósito
            </p>

            <p className="mt-3 text-xl font-semibold leading-8 text-gray-900">
              Tornar a rotina da oficina mais organizada, simples e digital.
            </p>
          </div>
        </section>

        <section>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              O que o sistema oferece
            </h2>

            <p className="mt-2 text-gray-600">
              As principais funcionalidades desenvolvidas para centralizar a
              rotina da oficina.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {funcionalidades.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.titulo}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                    <Icon />
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    {item.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Tecnologias utilizadas
          </h2>

          <p className="mt-2 text-gray-600">
            O projeto foi construído utilizando tecnologias modernas do
            ecossistema JavaScript/TypeScript.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tecnologias.map((tecnologia) => (
              <span
                key={tecnologia}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700"
              >
                {tecnologia}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            Mais do que um projeto de estudo
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-gray-600">
            O Moto OS foi criado como um projeto de estudo, mas com um problema
            real como ponto de partida. Isso permitiu desenvolver uma aplicação
            pensando não apenas em código, mas também em organização,
            experiência de uso e nas necessidades de quem realmente utilizaria o
            sistema no dia a dia.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-6">
          <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>ZGMotosOS — sistema de gestão para oficina de motocicletas.</p>

            <p>Projeto pessoal em desenvolvimento contínuo.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
