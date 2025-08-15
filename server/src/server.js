import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: false,
}));
app.use(express.json()); // <-- IMPORTANTÍSSIMO pro body chegar

app.get('/', (_, res) => res.status(200).send('InovaPanda API'));
app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// erro padrão
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API InovaPanda (SQLite) em http://localhost:${PORT}`);
});
