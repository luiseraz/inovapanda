// server/src/controllers/auth.controller.js
import { prisma } from '../lib/prisma.js';
import { comparePassword, hashPassword } from '../lib/hash.js';
import { signJwt } from '../lib/jwt.js';

const normalizeEmail = (e) => String(e || '').trim().toLowerCase();

/** POST /api/auth/login  { email, password } */
export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Informe email e senha.' });
  }

  const user = await prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
  if (!user) return res.status(400).json({ message: 'Credenciais inválidas.' });

  const ok = await comparePassword(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Credenciais inválidas.' });

  const token = signJwt({ id: user.id, email: user.email, role: user.role, name: user.name });
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar ?? null },
  });
}

/** POST /api/auth/register  { name?, email, password } */
export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Informe email e senha.' });

  const e = normalizeEmail(email);
  const exists = await prisma.user.findUnique({ where: { email: e } });
  if (exists) return res.status(400).json({ message: 'Email já cadastrado.' });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name: name || null, email: e, password: hashed, role: 'user' },
  });

  const token = signJwt({ id: user.id, email: user.email, role: user.role, name: user.name });
  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar ?? null },
  });
}

/** GET /api/auth/me  (authRequired) */
export async function me(req, res) {
  const u = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true, avatar: true },
  });
  if (!u) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json({ user: u });
}

/** PUT /api/auth/me  (authRequired)  { name?, avatar? } */
export async function updateMe(req, res) {
  const { name, avatar } = req.body || {};
  const data = {
    name: name !== undefined ? (name || null) : undefined,
    avatar: avatar !== undefined ? (avatar || null) : undefined,
  };

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data,
    select: { id: true, name: true, email: true, role: true, avatar: true },
  });

  res.json({ user });
}

/** POST /api/auth/change-password  (authRequired)  { currentPassword, newPassword } */
export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Informe a senha atual e a nova senha.' });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

  const ok = await comparePassword(currentPassword, user.password);
  if (!ok) return res.status(400).json({ message: 'Senha atual incorreta.' });

  const hashed = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  res.json({ ok: true });
}
