# Giphy Challange — React + TypeScript + Zustand

Aplicação web desenvolvida como **desafio técnico front-end**, com foco em **arquitetura limpa, boa experiência do usuário (UX)** e **boas práticas modernas em React**.

O projeto consome a **API do GIPHY** para exibir GIFs em alta, por busca e por categorias, permitindo ao usuário gerenciar favoritos persistidos em `localStorage`.

---

## 🎯 Objetivos do Projeto

- Demonstrar domínio de **React + TypeScript**
- Aplicar **gerenciamento de estado global** com Zustand
- Consumir APIs REST de forma organizada e escalável
- Construir um layout moderno estilo **dashboard**
- Implementar melhorias contínuas de UX/UI
- Manter separação clara entre **UI, estado e serviços**

---

## 🚀 Funcionalidades

### ✅ Home
- Lista de GIFs *trending* da API do GIPHY
- Busca por termo
- Grid fluida e responsiva
- Favoritar/desfavoritar GIFs
- Visualização em tela cheia do GIF ao clicar
- Botão para copiar o link do GIF e compartilhar

### ✅ Favoritos
- Lista de GIFs favoritados
- Persistência automática em `localStorage`
- Reutilização completa do grid e cards

### ✅ Categorias
- Lista de categorias da API do GIPHY
- Busca de GIFs por categoria
- Destaque visual da categoria selecionada
- Paginação incremental automatica ao chegar ao fim da pagina

### ✅ Sobre
- Informações sobre o desenvolvedor
- Descrição do propósito do desafio

---

## 🆕 Melhorias de UX/UI Implementadas

### 🎨 Layout de Dashboard
- **Topbar fixa ocupando 100% da largura**
- **Sidebar posicionada abaixo da Topbar**
- Layout inspirado em dashboards modernos (Notion, Linear, Vercel)

### 📊 Status Bar Global
- Barra de status abaixo da Topbar exibindo:
  - Quantidade de GIFs carregados
  - Quantidade de favoritos
  - Estado de carregamento
  - Indicação de erro
- Atualização automática via Zustand

### 🖼️ Grid de GIFs Fluida
- Grid responsiva utilizando `CSS Grid` com `auto-fill`
- Adaptação automática ao tamanho da tela
- Melhor aproveitamento de espaço em telas grandes e pequenas

### ✨ Microinterações e Animações
- Hover suave nos cards de GIF
- Elevação e sombra animada nos cards
- Botão de favorito sobreposto à imagem
- Sidebar com animações leves de deslocamento

### 🧭 Sidebar com Ícones
- Ícones modernos usando `lucide-react`
- Destaque visual claro para rota ativa
- Feedback imediato ao passar o mouse

### 🏷️ Branding no Header
- Logo da aplicação no Topbar
- Identificação do desenvolvedor em formato de badge

---

## 🧠 Decisões de Arquitetura

- **Zustand** escolhido por simplicidade e baixo boilerplate
- Estado global responsável por:
  - Dados da API
  - Estado de loading e erro
  - Sincronização com `localStorage`
- Camada de serviços (`/services`) isolando chamadas HTTP
- Componentes reutilizáveis e desacoplados
- Layout base com `<Outlet />` do React Router
- Status global visível em todas as páginas

---

## 📂 Estrutura do Projeto

```
src/
  components/
    GifCard.tsx
    GifGrid.tsx
    SearchBar.tsx
    LoadingSpinner.tsx
    StatusBar.tsx
  layout/
    Sidebar.tsx
    Topbar.tsx
    MainLayout.tsx
  pages/
    HomePage.tsx
    FavoritesPage.tsx
    CategoriesPage.tsx
    AboutPage.tsx
  services/
    giphyApi.ts
  store/
    useGifsStore.ts
    useFavoritesStore.ts
  App.tsx
  main.tsx
```

---

## 🛠 Tecnologias Utilizadas

- **React 18**
- **TypeScript**
- **Vite**
- **Zustand**
- **Axios**
- **React Router DOM**
- **Tailwind CSS**
- **Lucide React (ícones)**
- **API do GIPHY**

---

## 📦 Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/giphy-dashboard.git
cd giphy-dashboard
```

### 2️⃣ Instalar dependências

_*Necessário Node 22_

```bash
npm install
```

### 3️⃣ Configurar variável de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_GIPHY_API_KEY=SUA_CHAVE_AQUI
```

Crie sua chave em: https://developers.giphy.com/

### 4️⃣ Executar o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

## 🧱 Build para Produção

```bash
npm run build
npm run preview
```

---

## 🧪 Testes

O projeto usa **Vitest** + **React Testing Library**.

```bash
npm test
```

- Inclui testes para a store (`useGifsStore`) cobrindo estados de loading/sucesso/erro.
- Cobertura básica de componentes críticos (`GifCard` e `GifGrid`).

---

## 👨‍💻 Desenvolvedor

**Patrick Deitós Cremonese**

Projeto desenvolvido para fins de aprendizado, demonstração técnica e avaliação de boas práticas em front-end moderno.

---

## 📄 Licença

Projeto livre para fins educacionais.
