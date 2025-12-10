export default function AboutPage() {
  return (
    <div className="p-4 mt-3 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        Sobre o desenvolvedor
      </h1>

      <p className="text-lg text-slate-600 mb-2">
        Olá! Meu nome é Patrick, sou desenvolvedor de sistemas full-stack
      </p>

      <p className="text-lg text-slate-600 mb-2">
        Este projeto foi desenvolvido como parte de um desafio técnico, com o
        objetivo de demonstrar conhecimentos em React, TypeScript, Zustand,
        consumo de APIs REST (GIPHY), gerenciamento de estado global, rotas e
        estilização com Tailwind CSS.
      </p>

      <p className="text-lg text-slate-600 mb-4">
        A aplicação permite visualizar GIFs em alta, pesquisar por termos,
        navegar por categorias e gerenciar uma lista de favoritos persistida em
        localStorage.
      </p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-1">
          Tecnologias utilizadas:
        </h2>
        <ul className="list-disc list-inside text-lg text-slate-600 space-y-1">
          <li>React + TypeScript</li>
          <li>Vite</li>
          <li>Zustand (estado global)</li>
          <li>Axios (requisições HTTP)</li>
          <li>React Router</li>
          <li>Tailwind CSS</li>
          <li>API do GIPHY</li>
        </ul>
      </div>
    </div>
  );
}
