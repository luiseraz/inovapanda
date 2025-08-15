import { prisma } from '../lib/prisma.js';

// helpers
function slugify(str = '') {
  return String(str)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
const isNum = (s) => /^\d+$/.test(String(s || ''));
const whereFrom = (param) => (isNum(param) ? { id: Number(param) } : { slug: String(param) });
const toNum = (v) => (v === undefined || v === null || v === '' ? undefined : Number(v));
const toInt = (v) => (v === undefined || v === null || v === '' ? undefined : parseInt(v, 10));

/**
 * GET /api/products  (com filtros + paginação)
 */
export async function list(req, res) {
  const { q, category, brand, min, max, sort } = req.query;
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const pageSize = Math.min(48, Math.max(1, parseInt(req.query.pageSize || '12', 10)));
  const skip = (page - 1) * pageSize;

  const where = {
    AND: [
      q ? {
        OR: [
          { name:        { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { brand:       { contains: q, mode: 'insensitive' } },
          { category:    { contains: q, mode: 'insensitive' } },
        ]
      } : {},
      category ? { category } : {},
      brand ? { brand } : {},
      (min || max) ? { price: { gte: toNum(min), lte: toNum(max) } } : {},
      req.query.inStock === 'true' ? { stock: { gt: 0 } } : {},
    ]
  };

  const orderBy =
    sort === 'price-asc'  ? { price: 'asc' }  :
    sort === 'price-desc' ? { price: 'desc' } :
    sort === 'new'        ? { createdAt: 'desc' } :
                            { createdAt: 'desc' };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({ where, orderBy, skip, take: pageSize }),
  ]);

  res.json({ products, total, page, pageSize });
}

/**
 * GET /api/products/:slug (aceita slug OU id)
 */
export async function getBySlugOrId(req, res) {
  const param = req.params.slug;
  const where = whereFrom(param);
  const product = await prisma.product.findUnique({ where });
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json({ product });
}

/**
 * POST /api/products  (admin)  {name, price, ...}
 */
export async function create(req, res) {
  const {
    name, slug, description, price, compareAtPrice,
    image, brand, category, stock,
  } = req.body || {};

  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Campos obrigatórios: name, price' });
  }

  const data = {
    name: String(name),
    slug: String(slug || slugify(name)),
    description: description ? String(description) : null,
    price: Number(price),
    compareAtPrice: toNum(compareAtPrice),
    image: image ? String(image) : null,
    brand: brand ? String(brand) : null,
    category: category ? String(category) : null,
    stock: toInt(stock) ?? 0,
  };

  try {
    const product = await prisma.product.create({ data });
    res.status(201).json({ product });
  } catch (e) {
    // slug único
    if (e?.code === 'P2002') {
      return res.status(400).json({ message: 'Slug já existe. Escolha outro.' });
    }
    throw e;
  }
}

/**
 * PUT /api/products/:idOrSlug  (admin)
 */
export async function update(req, res) {
  const idOrSlug = req.params.slug;
  const where = whereFrom(idOrSlug);

  const exists = await prisma.product.findUnique({ where });
  if (!exists) return res.status(404).json({ message: 'Produto não encontrado' });

  const {
    name, slug, description, price, compareAtPrice,
    image, brand, category, stock,
  } = req.body || {};

  const data = {
    // só atualiza se veio no body (undefined não altera)
    name: name !== undefined ? String(name) : undefined,
    slug: slug !== undefined ? String(slug || slugify(name || exists.name)) : undefined,
    description: description !== undefined ? (description ? String(description) : null) : undefined,
    price: price !== undefined ? Number(price) : undefined,
    compareAtPrice: compareAtPrice !== undefined ? toNum(compareAtPrice) : undefined,
    image: image !== undefined ? (image ? String(image) : null) : undefined,
    brand: brand !== undefined ? (brand ? String(brand) : null) : undefined,
    category: category !== undefined ? (category ? String(category) : null) : undefined,
    stock: stock !== undefined ? (toInt(stock) ?? 0) : undefined,
  };

  try {
    const product = await prisma.product.update({ where, data });
    res.json({ product });
  } catch (e) {
    if (e?.code === 'P2002') {
      return res.status(400).json({ message: 'Slug já existe. Escolha outro.' });
    }
    throw e;
  }
}

/**
 * DELETE /api/products/:idOrSlug  (admin)
 */
export async function remove(req, res) {
  const idOrSlug = req.params.slug;
  const where = whereFrom(idOrSlug);

  const exists = await prisma.product.findUnique({ where });
  if (!exists) return res.status(404).json({ message: 'Produto não encontrado' });

  await prisma.product.delete({ where });
  res.json({ ok: true });
}
