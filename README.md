# InovaPanda · Front-end de E-commerce (React)

Interface moderna de e-commerce com foco em **performance**, **acessibilidade** e um visual **dark** inspirado em tons de bambu 🌿.  
O front usa **React + React Router**, **Context API** (Auth & Cart) e **CSS puro** com *design tokens*.

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

- [✨ Destaques](#-destaques)
- [🧰 Tecnologias](#-tecnologias)
- [📁 Estrutura de pastas](#-estrutura-de-pastas)
- [🚀 Começando](#-começando)
- [🔧 Configuração de ambiente](#-configuração-de-ambiente)
- [📜 Scripts](#-scripts)
- [🎨 Estilo e Tema](#-estilo-e-tema)
- [🧭 Rotas](#-rotas)
- [🧠 Estado e Contextos](#-estado-e-contextos)
- [♿ Acessibilidade](#-acessibilidade)
- [🧹 Padrões de código](#-padrões-de-código)
- [📦 Build e Deploy](#-build-e-deploy)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Como contribuir](#-como-contribuir)
- [📄 Licença](#-licença)

---

## ✨ Destaques

- 🎛️ **Tema dark** com *design tokens* centralizados em `:root` (cores, raio, sombras, tipografia).
- 🧭 **Navbar** com wordmark **Inova**(branco)**Panda**(verde) e barra de categorias.
- 🛒 **Carrinho** com badge de quantidade agregado.
- 👤 **Menu do usuário** acessível (fecha com *click outside* e `Esc`), *fallback* de iniciais se não houver avatar.
- 🧩 **Vitrine**: Hero, tiles, mini-banners, cartões de produto e *ribbon*.
- 🔎 **Busca** integrada à rota de produtos (`/produtos?q=...`).
- ✨ **Shiny** animado **apenas nos botões** (respeita `prefers-reduced-motion`).
- ♿ Boas práticas de **A11y** (*aria-*, foco visível, contraste, redução de movimento).

---

## 🧰 Tecnologias

- **React 18+**
- **React Router 6+**
- **Context API** (Auth e Cart)
- **Vite** (dev/build/preview)
- **CSS puro** com variáveis (sem Tailwind/SCSS)

---

## 📁 Estrutura de pastas

```tree
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
│     │  └─ global.css          # tokens + estilos globais (este arquivo)
│     ├─ App.jsx                # definição das rotas
│     └─ main.jsx               # bootstrap do app
└─ server/ (opcional nesta stack)
   ├─ src/ controllers, routes, lib/
   └─ prisma/ schema.prisma```

# 🚀 Começando (rápido)
Pré-requisitos

Node.js 18+ (recomendado 20+)

npm 9+ (ou pnpm / yarn)

1) Clonar
git clone https://github.com/luiseraz/inovapanda.git
cd inovapanda

2) Frontend (Vite)
cd client
npm install
cp .env.example .env   # se existir; senão crie .env conforme seção abaixo
npm run dev
# http://localhost:5173

3) Backend (Express/Prisma) — opcional
cd ../server
npm install
cp .env.example .env   # ou crie conforme seção abaixo
npx prisma generate
npx prisma migrate dev --name init
npm run dev
# http://localhost:4000

🔧 Variáveis de ambiente
client/.env
# URL base da API (Express/Nest/Rails/etc.)
VITE_API_URL=http://localhost:4000

# Chaves de storage (opcionais)
VITE_AUTH_STORAGE_KEY=ip_auth
VITE_CART_STORAGE_KEY=ip_cart


Acessar no código via import.meta.env.VITE_API_URL.

server/.env
# SQLite (caminho relativo à pasta server/prisma)
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="uma_chave_bem_secreta"

# Porta do servidor
PORT=4000

🗄️ Banco de dados (Prisma/SQLite)

Modelo principal:

User (id, name?, email único, password hash, role user|admin, timestamps)

Product (id, name, slug único, descrição?, price, compareAtPrice?, image?, brand?, category?, stock, timestamps)

Comandos úteis
# gerar client após alterar schema
npx prisma generate

# criar/rodar migrações (modo dev)
npx prisma migrate dev --name <descricao>

# visualizar o banco local
npx prisma studio

📜 Scripts
Client (client/)
Script	Descrição
dev	Servidor de desenvolvimento (Vite)
build	Build de produção (gera dist/)
preview	Servir o build local para inspeção
Server (server/)
Script	Descrição
dev	Nodemon (desenvolvimento)
start	Node (produção)
prisma:*	Comandos de geração/migração (vide acima)
🎨 Estilo e tema

Tokens no :root (global.css): --bg, --panel, --brand, --accent, --radius, --shadow, --fs-hero, etc.

Wordmark “InovaPanda”: HTML com Inova (branco) + Panda (verde, sem espaço)

<Link className="brand wordmark" to="/" aria-label="Início InovaPanda">
  Inova<span>Panda</span>
</Link>

.brand.wordmark,
.brand.wordmark:visited { color: var(--text) !important; }
.brand.wordmark { gap: 0 !important; display:inline-flex; align-items:center; }
.brand.wordmark span { color: var(--brand) !important; }
.brand.wordmark:hover { text-decoration: none !important; }


Efeito “shiny” somente em botões
Implementado com ::after animado e variável --shine-speed (padrão 3.2s).
Respeita @media (prefers-reduced-motion: reduce).

🧭 Rotas de frontend

/ — Home

/produtos — Lista (aceita ?q= e ?category=)

/produto/:slug — Detalhe do produto

/carrinho — Carrinho

/login e /registrar

/conta/perfil e /conta/pedidos — Área do usuário

/admin — Apenas se user.role === 'admin' (via AdminGuard)

🔐 Autenticação & Carrinho

AuthContext

expõe { user, isAuth, login, logout }

Menu do usuário mostra avatar ou iniciais (initialsOf(nameOrEmail)).

CartContext

expõe { items, addItem, removeItem, clear, ... }

Total na navbar:

const totalQty = useMemo(
  () => items.reduce((s, i) => s + (i.qty || 1), 0),
  [items]
);


Recomenda-se persistência em localStorage (use as chaves do .env).

🧩 Componentes principais

Navbar: marca + busca + categorias + carrinho + usuário

Footer: marca, institucionais, atendimento e badges de pagamento

Hero / Banners / Tiles: destaque de campanhas e categorias

Card de produto: imagem, preço atual, preço de comparação, ribbon “Destaque”

♿ Acessibilidade

Dropdown do usuário fecha com clique fora e tecla Esc

Foco visível em inputs e botões

prefers-reduced-motion honrado nas animações de brilho

Uso de aria-label e semântica nas áreas de navegação e busca

Imagens com alt (ou fallbacks)

🧹 Padrões de código

Componentes funcionais com Hooks

Semântica HTML (nav, main, etc.)

CSS organizado por seções (tokens → layout → componentes → util → responsivo)

Evitar estilos inline quando puder reaproveitar classes

🧪 Testes (sugestão)

Unitários: Vitest + React Testing Library

E2E: Playwright ou Cypress

🚢 Build & Deploy
Vercel / Netlify

Client

Build: npm run build

Output: dist/

Variáveis: VITE_API_URL, etc.

Server: configure como app Node (separe o deploy do backend)

GitHub Pages (client)

Action que rode npm ci && npm run build e publique client/dist/
(com gh-pages ou ação nativa)

🌿 Roadmap

 Integração real com API (produtos, carrinho, checkout)

 Persistência completa de Auth/Cart em localStorage

 Página de detalhes de produto aprimorada

 Testes unitários (Vitest/RTL) e E2E (Playwright)

 Tema claro (toggle) reaproveitando tokens

🤝 Contribuindo

Faça um fork do repositório

Crie a branch: git checkout -b feat/minha-feature

Faça commits descritivos

Abra um PR com motivação e screenshots quando possível

🔧 Dicas Git (erros comuns)

“rejected: fetch first” ao git push
O remoto tem commits que você não tem localmente:

git pull --rebase origin main   # traz e rebaseia
git push -u origin main


Se preferir merge:

git pull origin main
git push -u origin main

📄 Licença

Este projeto está sob a MIT License.
Sinta-se livre para adaptar conforme a política da sua organização.
