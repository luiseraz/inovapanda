import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorHandler, notFound } from './middleware/error.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

export const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));

// atalho para não dar 404 feio no GET /
app.get('/', (req, res) => res.redirect('/api/health'));
app.get('/api/health', (req, res) => res.json({ ok: true, message: 'InovaPanda API OK (SQLite)' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);
