# Loja InovaPanda

InovaPanda é uma loja online de gadgets e produtos tecnológicos inovadores.

## Funcionalidades Implementadas

- ✅ Autenticação de usuários (cadastro, login, perfil)
- ✅ Proteção de rotas privadas
- ✅ Rotas administrativas
- ✅ Gerenciamento de perfil de usuário

## Próximos Passos

- [ ] Cadastro e gestão de produtos
- [ ] Carrinho de compras
- [ ] Processamento de pagamentos
- [ ] Gestão de pedidos
- [ ] Avaliações de produtos
- [ ] Sistema de busca avançada

## Tecnologias Utilizadas

### Backend
- Node.js com Express
- MongoDB
- JWT para autenticação
- Bcrypt para criptografia de senhas

### Frontend
- React
- React Router
- Bootstrap / React Bootstrap
- Axios para requisições HTTP
- Context API para gerenciamento de estado

## Como Executar o Projeto

### Requisitos
- Node.js (v14+)
- MongoDB (local ou MongoDB Atlas)

### Configuração do Backend

1. Instale as dependências do servidor:
   ```
   cd server
   npm install
   ```

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na pasta `server` com o seguinte conteúdo:
   ```
   PORT=5000
   MONGO_URI=sua_string_de_conexao_mongodb
   JWT_SECRET=seu_segredo_jwt
   ```

3. Inicie o servidor:
   ```
   npm start
   ```

### Configuração do Frontend

1. Instale as dependências do cliente:
   ```
   cd client
   npm install
   ```

2. Inicie o cliente:
   ```
   npm start
   ```

3. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

```
loja-inovapanda/
├── client/                  # Frontend React
│   ├── public/              # Arquivos públicos
│   └── src/                 # Código-fonte do frontend
│       ├── components/      # Componentes React
│       ├── context/         # Context API
│       ├── pages/           # Páginas da aplicação
│       └── services/        # Serviços de API
│
└── server/                  # Backend Node.js
    ├── controllers/         # Controladores
    ├── middleware/          # Middlewares
    ├── models/              # Modelos do MongoDB
    ├── routes/              # Rotas da API
    └── utils/               # Utilitários
```