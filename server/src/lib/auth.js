// server/src/middleware/auth.js
import { verifyJwt } from '../lib/jwt.js';

export function authRequired(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Token ausente' });

  try {
    const payload = verifyJwt(token);
    req.user = payload; // { id, email, role, name? }
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido/expirado' });
  }
}
