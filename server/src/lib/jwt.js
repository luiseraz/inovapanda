// server/src/lib/jwt.js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change-me-dev-secret';

export function signJwt(payload, opts = {}) {
  // 7 dias por padrão
  return jwt.sign(payload, SECRET, { expiresIn: '7d', ...opts });
}

export function verifyJwt(token) {
  return jwt.verify(token, SECRET);
}
