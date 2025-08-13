const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Importação das rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Carregamento das variáveis de ambiente
dotenv.config();

// Inicialização do app Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configuração de middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());

// Limitador de requisições para prevenção de ataques
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por janela
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API da loja InovaPanda 🐼' });
});

// Configuração das rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ocorreu um erro no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Conexão com o MongoDB e inicialização do servidor
const MONGODB_URI = process.env.MONGODB_URI || "";

// String de conexão local como fallback
const MONGODB_LOCAL = "mongodb://localhost:27017/inovapanda";

async function connectToMongoDB() {
  try {
    console.log('🔍 Tentando conectar ao MongoDB Atlas...');
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Conexão com MongoDB Atlas estabelecida com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB Atlas:', error.message);
    
    if (error.message.includes('whitelist')) {
      console.error('\n🔍 SOLUÇÃO: Adicione seu IP à whitelist do MongoDB Atlas');
      console.error('   1. Acesse: https://cloud.mongodb.com');
      console.error('   2. Vá em Network Access → + ADD IP ADDRESS');
      console.error('   3. Clique em "ADD CURRENT IP ADDRESS"');
      console.error('   4. Ou use: 0.0.0.0/0 (apenas para desenvolvimento)');
    }
    
    // Tentar conectar ao MongoDB local
    try {
      console.log('\n🔄 Tentando conectar ao MongoDB local...');
      
      await mongoose.connect(MONGODB_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      
      console.log('✅ Conexão com MongoDB Local estabelecida com sucesso!');
      console.log('⚠️  Usando banco local como fallback');
      return true;
      
    } catch (localError) {
      console.error('❌ Falha na conexão com MongoDB Local:', localError.message);
      console.error('\n🔍 Para resolver o problema do Atlas:');
      console.error('   1. Acesse: https://cloud.mongodb.com');
      console.error('   2. Vá em Network Access → + ADD IP ADDRESS');
      console.error('   3. Clique em "ADD CURRENT IP ADDRESS"');
      return false;
    }
  }
}

// Inicializar servidor após conexão com MongoDB
connectToMongoDB().then(success => {
  if (success) {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } else {
    console.error('❌ Falha ao conectar ao MongoDB. Servidor não iniciado.');
    process.exit(1);
  }
});

// Exportação do app para testes
module.exports = app; 
