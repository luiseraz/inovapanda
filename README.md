# InovaPanda · Front‑end de E‑commerce (React)

Interface moderna com foco em **performance**, **acessibilidade** e um visual **dark** inspirado em tons de bambu 🌿. Construída com **React + React Router**, **Context API** (Auth & Cart) e **CSS puro** com *design tokens*.

<p align="left">
  <a href="https://react.dev" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-18+-61dafb?logo=react&logoColor=222&labelColor=000"></a>
  <a href="https://vitejs.dev" target="_blank"><img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=ffd"></a>
  <a href="https://reactrouter.com" target="_blank"><img alt="React Router" src="https://img.shields.io/badge/React%20Router-6+-ca4245?logo=reactrouter"></a>
  <img alt="A11y" src="https://img.shields.io/badge/A11y-Focus%20%26%20prefers--reduced--motion-0f766e">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-10b981">
</p>

> **Status:** 🚧 Em desenvolvimento

---

## 📚 Sumário

* [✨ Destaques](#-destaques)
* [🧰 Tecnologias](#-tecnologias)
* [📁 Estrutura de pastas](#-estrutura-de-pastas)
* [🚀 Começando](#-começando)
* [🔧 Variáveis de ambiente](#-variáveis-de-ambiente)
* [🗄️ Banco de dados (opcional)](#️-banco-de-dados-opcional)
* [📜 Scripts](#-scripts)
* [🎨 Estilo e Tema](#-estilo-e-tema)
* [🧭 Rotas](#-rotas)
* [🧠 Estado e Contextos](#-estado-e-contextos)
* [♿ Acessibilidade](#-acessibilidade)
* [🧹 Padrões de código](#-padrões-de-código)
* [🧪 Testes (sugestão)](#-testes-sugestão)
* [📦 Build & Deploy](#-build--deploy)
* [🗺️ Roadmap](#️-roadmap)
* [🤝 Como contribuir](#-como-contribuir)
* [🔧 Dicas Git](#-dicas-git)
* [📄 Licença](#-licença)

---

## ✨ Destaques

* 🎛️ **Tema dark** com *design tokens* em `:root` (cores, raio, sombras, tipografia).
* 🧭 **Navbar** com wordmark **Inova**(branco)**Panda**(verde) e barra de categorias.
* 🛒 **Carrinho** com *badge* de quantidade agregada.
* 👤 **Menu do usuário** acessível (fecha com *click outside* e `Esc`), *fallback* de iniciais sem avatar.
* 🧩 **Vitrine**: hero, tiles, mini-banners, cartões de produto e *ribbon*.
* 🔎 **Busca** integrada à rota de produtos (`/produtos?q=...`).
* ✨ **Efeito shiny** animado **apenas em botões** (respeita `prefers-reduced-motion`).
* ♿ Boas práticas de **A11y** (`aria-*`, foco visível, contraste, redução de movimento).

---

## 🧰 Tecnologias

* **React 18+**
* **React Router 6+**
* **Context API** (Auth e Cart)
* **Vite** (dev/build/preview)
* **CSS puro** com variáveis (sem Tailwind/SCSS)

> **Requisitos**: Node.js **18+** (recomendado **20+**) e npm **9+** (ou **pnpm/yarn**).

---

## 📁 Estrutura de pastas

```text
inovapanda/
├─ client/
│  ├─ public/
│  └─ src/
│     ├─ components/
│     │  ├─ Navbar.jsx          # Wordmark, busca, categorias, menu do usuário
│     │  └─ Footer.jsx          # Marca, institucionais e meios de pagamento
│     ├─ context/
│     │  ├─ AuthContext.jsx     # login/logout, usuário/role, storage
│     │  └─ CartContext.jsx     # itens do carrinho e totais
│     ├─ pages/
│     │  ├─ HomePage.jsx
│     │  ├─ ProductsPage.jsx
│     │  ├─ ProductDetailPage.jsx
│     │  ├─ CartPage.jsx
│     │  ├─ LoginPage.jsx / RegisterPage.jsx
│     │  └─ admin/              # rotas protegidas (role === 'admin')
│     ├─ styles/
│     │  └─ global.css          # tokens + estilos globais
│     ├─ App.jsx                # definição das rotas
│     └─ main.jsx               # bootstrap do app
└─ server/ (opcional nesta stack)
   ├─ src/ controllers, routes, lib/
   └─ prisma/ schema.prisma
```

---

## 🚀 Começando

### 1) Clonar o repositório

```bash
git clone https://github.com/luiseraz/inovapanda.git
cd inovapanda
```

### 2) Front-end (Vite)

```bash
cd client
npm install
cp .env.example .env   # se existir; senão crie conforme a seção "Variáveis de ambiente"
npm run dev            # http://localhost:5173
```

### 3) Back-end (Express/Prisma) — **opcional**

```bash
cd ../server
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev            # http://localhost:4000
```

---

## 🔧 Variáveis de ambiente

**client/.env**

```env
# URL base da API (Express/Nest/Rails/etc.)
VITE_API_URL=http://localhost:4000

# Chaves de storage (opcionais)
VITE_AUTH_STORAGE_KEY=ip_auth
VITE_CART_STORAGE_KEY=ip_cart
```

> Acesse no código via `import.meta.env.VITE_API_URL`.

**server/.env**

```env
# SQLite (caminho relativo à pasta server/prisma)
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="uma_chave_bem_secreta"

# Porta do servidor
PORT=4000
```

---

## 🗄️ Banco de dados (opcional)

Modelo principal:

* **User**: `id`, `name?`, `email` (único), `passwordHash`, `role` (`user|admin`), *timestamps*
* **Product**: `id`, `name`, `slug` (único), `description?`, `price`, `compareAtPrice?`, `image?`, `brand?`, `category?`, `stock`, *timestamps*

Comandos úteis (na pasta `server/`):

```bash
# gerar client após alterar schema
npx prisma generate

# criar/rodar migrações (modo dev)
npx prisma migrate dev --name <descricao>

# visualizar o banco local
npx prisma studio
```

---

## 📜 Scripts

**Client (`client/`)**

|    Script | Descrição                          |
| --------: | ---------------------------------- |
|     `dev` | Servidor de desenvolvimento (Vite) |
|   `build` | Build de produção (gera `dist/`)   |
| `preview` | Servir o build local para inspeção |

**Server (`server/`)**

|     Script | Descrição                                |
| ---------: | ---------------------------------------- |
|      `dev` | Nodemon (desenvolvimento)                |
|    `start` | Node (produção)                          |
| `prisma:*` | Comandos de geração/migração (ver acima) |

---

## 🧭 Rotas

* `/` — Home
* `/produtos` — Lista (aceita `?q=` e `?category=`)
* `/produto/:slug` — Detalhe do produto
* `/carrinho` — Carrinho
* `/login` e `/registrar`
* `/conta/perfil` e `/conta/pedidos` — Área do usuário
* `/admin` — Apenas se `user.role === 'admin'` (via `AdminGuard`)

---

## 🧠 Estado e Contextos

**AuthContext**

* expõe `{ user, isAuth, login, logout }`
* Menu do usuário mostra avatar ou iniciais (`initialsOf(nameOrEmail)`).

**CartContext**

* expõe `{ items, addItem, removeItem, clear, ... }`
* Total na navbar:

```jsx
const totalQty = useMemo(
  () => items.reduce((s, i) => s + (i.qty || 1), 0),
  [items]
);
```

> Recomenda-se persistência em `localStorage` (use as chaves do `.env`).

---

## ♿ Acessibilidade

* Dropdown do usuário fecha com clique fora e tecla `Esc`.
* Foco visível em inputs e botões.
* `prefers-reduced-motion` honrado nas animações de brilho.
* Uso de `aria-label` e semântica em navegação e busca.
* Imagens com `alt` adequado (ou fallbacks).

---

## 🧹 Padrões de código

* Componentes funcionais com Hooks.
* Semântica HTML (`nav`, `main`, etc.).
* CSS organizado por seções (*tokens → layout → componentes → util → responsivo*).
* Evitar estilos inline quando puder reaproveitar classes.

> **Sugestão:** adotar ESLint + Prettier e *aliases* de import se útil para o projeto.

---

## 🧪 Testes (sugestão)

* **Unitários**: Vitest + React Testing Library
* **E2E**: Playwright ou Cypress

> Quando configurado, scripts típicos: `test`, `test:watch`, `e2e`.

---

## 📦 Build & Deploy

**Vercel / Netlify**

* *Client*

  * Build: `npm run build`
  * Output: `dist/`
  * Variáveis: `VITE_API_URL`, etc.
* *Server*: configure como app Node (deploy separado do front).

**GitHub Pages (client)**

* Action executando `npm ci && npm run build` e publicando `client/dist/` (via `gh-pages` ou ação nativa).

---

## 🗺️ Roadmap

* Integração real com API (produtos, carrinho, checkout)
* Persistência completa de Auth/Cart em `localStorage`
* Página de detalhes de produto aprimorada
* Testes unitários (Vitest/RTL) e E2E (Playwright)
* Tema claro (toggle) reaproveitando tokens

---

## 🤝 Como contribuir

1. Faça um fork do repositório
2. Crie a branch: `git checkout -b feat/minha-feature`
3. Faça commits descritivos (*feat, fix, chore*, etc.)
4. Abra um PR com motivação e **screenshots** quando possível

> Dica: siga o padrão [Conventional Commits](https://www.conventionalcommits.org/) se fizer sentido para o time.

---

## 🔧 Dicas Git

**Erro:** `rejected: fetch first` ao `git push` — o remoto tem commits que você não tem localmente.

```bash
# opção 1: rebase (mantém histórico linear)
git pull --rebase origin main
git push -u origin main

# opção 2: merge
git pull origin main
git push -u origin main
```

---

## 📄 Licença

Este projeto está sob a **MIT License**. Sinta-se livre para adaptar conforme a política da sua organização.
