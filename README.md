# InovaPanda – Front-end de E-commerce (React)

Interface moderna de e-commerce com foco em performance, acessibilidade e um visual dark inspirado em tons de bambu. O projeto usa React + React Router, Context API para autenticação e carrinho, e CSS puro com design tokens (variáveis CSS) para facilitar o tema.

# Status: em desenvolvimento.

Sumário

Destaques

Tecnologias

Estrutura de pastas

Começando

Configuração (.env)

Scripts

Estilo e Tema

Rotas

Estado e Contextos

Acessibilidade

Padrões de código

Build e Deploy

Roadmap

Como contribuir

Licença

# Destaques

🌗 Tema dark com tokens (cores, raio de borda, sombras, tipografia) centralizados em :root.

🧭 Navbar com wordmark “InovaPanda” (Inova branco, Panda verde, sem espaço) e barra de categorias.

🛒 Carrinho com badge de quantidade agregado.

👤 User menu acessível (fecha com click outside e Esc), fallback de iniciais quando não há avatar.

🧩 Componentes de vitrine: Hero, tiles, mini-banners, cartões de produto e ribbon.

🔎 Busca integrada à rota de produtos.

✨ Efeito “shiny” apenas em botões (não em textos), respeitando prefers-reduced-motion.

♿️ Boas práticas de A11y: aria-*, foco visível, contraste e redução de movimento.

# Tecnologias

React 18+

React Router (navegação SPA)

Context API (Auth e Cart)

CSS puro com variáveis (sem Tailwind/SCSS)

Tooling recomendado: Vite (dev/build) – funciona também com CRA, mas os comandos abaixo consideram Vite.

# Estrutura de pastas
´´´src/
  components/
    Navbar.jsx         # Wordmark, busca, categorias, menu do usuário
    Footer.jsx         # Marca, institucionais e meios de pagamento
    ...                # (demais componentes de vitrine/cartões)
  context/
    AuthContext.jsx    # login/logout, usuário/role
    CartContext.jsx    # itens do carrinho e totais
  pages/
    Home.jsx
    Produtos.jsx
    Carrinho.jsx
    Conta/
      Perfil.jsx
      Pedidos.jsx
    Admin/             # apenas se role === 'admin'
  assets/              # imagens e ícones
  main.jsx             # bootstrap do app
  App.jsx              # definição das rotas
styles/
  global.css           # **este arquivo** com todos os tokens e estilos´´´


Os nomes exatos de páginas podem variar conforme o seu projeto, mas as rotas abaixo são suportadas pela Navbar.

Começando
Pré-requisitos

Node.js 18+ (recomendado 20)

npm 9+ (ou pnpm/yarn, se preferir)

Instalação
# 1) Instale dependências
npm install

# 2) Ambiente de desenvolvimento
npm run dev

# 3) Build de produção
npm run build

# 4) Pré-visualização do build local
npm run preview


Abra o navegador em http://localhost:5173 (porta padrão do Vite).

Configuração (.env)

Crie um arquivo .env na raiz (ou .env.local) com as variáveis que seu back-end expõe. Sugestões usuais:

# URL base da API (ex.: Express, Nest, Rails, etc.)
VITE_API_URL=https://api.seudominio.com

# Chaves de storage (opcional)
VITE_AUTH_STORAGE_KEY=ip_auth
VITE_CART_STORAGE_KEY=ip_cart


No código, acesse com import.meta.env.VITE_API_URL.

Scripts
Script	Descrição
dev	Sobe o servidor de desenvolvimento (Vite).
build	Gera build de produção.
preview	Serve o build local para inspeção.

Se você estiver usando CRA, substitua por react-scripts start/build.

Estilo e Tema

Toda a identidade visual vive em styles/global.css:

Tokens em :root
--bg, --panel, --brand, --accent, --radius, --shadow, tamanhos de fonte etc.

Wordmark “InovaPanda”
O HTML usa algo como:

<Link className="brand wordmark" to="/" aria-label="Início InovaPanda">
  Inova<span>Panda</span>
</Link>


No CSS:

.brand.wordmark,
.brand.wordmark:visited { color: var(--text) !important; }
.brand.wordmark { gap: 0 !important; display:inline-flex; align-items:center; }
.brand.wordmark span { color: var(--brand) !important; }
.brand.wordmark:hover { text-decoration: none !important; }


Shiny APENAS em botões
O brilho é um ::after com animação controlada por --shine-speed:

:root { --shine-speed: 3.2s; }
.btn::after { /* overlay animado */ }
@media (prefers-reduced-motion: reduce) { .btn::after { animation: none; } }


Para acelerar/desacelerar, altere --shine-speed no :root.

Rotas

A Navbar já aponta para as principais rotas:

/ – Home

/produtos – Lista de produtos (aceita ?q= e ?category= na URL)

/carrinho – Carrinho

/login e /registrar

/conta/perfil e /conta/pedidos (área do usuário)

/admin – visível apenas se user.role === 'admin'

Ajuste o App.jsx conforme sua necessidade.

Estado e Contextos

AuthContext

expõe { user, isAuth, login, logout }

o menu do usuário mostra avatar ou as iniciais via initialsOf(nameOrEmail).

CartContext

expõe { items, addItem, removeItem, clear, ... }

a Navbar soma as quantidades:
const totalQty = useMemo(() => items.reduce((s, i) => s + (i.qty || 1), 0), [items]);

Persistência em localStorage é recomendada (chaves sugeridas na seção .env).

Acessibilidade

User dropdown fecha com clique fora e tecla Esc.

Inputs e botões com foco visível.

prefers-reduced-motion respeitado no brilho dos botões.

aria-label e funções semânticas usadas nas áreas de navegação e busca.

Imagens com alt (ou fallbacks quando ausentes).

Padrões de código

Componentes funcionais com hooks.

Semântica: usar tags semânticas (nav, main, etc.) quando possível.

CSS organizado por seções (tokens → layout → componentes → utilitários → responsivo).

Evite estilos inline quando puder reaproveitar classes.

Build e Deploy
Vercel / Netlify

Build command: npm run build

Output directory: dist

Configure as variáveis de ambiente (VITE_API_URL, etc.) no painel do provedor.

GitHub Pages (opcional)

Use um action que rode npm ci && npm run build e publique dist (com gh-pages ou ação nativa).

Roadmap

 Integração real com API (produtos, carrinho, checkout).

 Persistência completa de Auth/Cart em localStorage.

 Página de detalhes de produto.

 Testes unitários (Vitest/RTL) e2e (Playwright).

 Tema claro (alternável) reaproveitando os tokens.

Como contribuir

Faça um fork do repositório.

Crie sua branch: git checkout -b feat/minha-feature.

Faça commits descritivos.

Abra um PR explicando a motivação e screenshots quando possível.

Licença

Este projeto está licenciado sob a MIT License.
Você pode adaptar a licença conforme a política da sua organização.

Suporte

Achou um bug ou tem sugestão? Abra uma issue ou mande um PR. 💚
