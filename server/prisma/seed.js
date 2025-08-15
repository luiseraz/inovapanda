// server/prisma/seed.js
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

/** Garante diretório do SQLite (evita "Unable to open the database file") */
function ensureSqliteDir() {
  const url = process.env.DATABASE_URL || 'file:./dev.db';
  if (!url.startsWith('file:')) return;
  // caminho relativo ao schema.prisma (pasta prisma)
  const rel = url.replace('file:', '');
  // __dirname de ESM:
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // base = pasta prisma
  const baseDir = __dirname;
  const dbPath = path.resolve(baseDir, rel);
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('[seed] Criado diretório do SQLite:', dir);
  }
}

/** slug simples com acentos */
function slugify(str = '') {
  return String(str)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** ajuda a criar datas "recentes" */
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function main() {
  ensureSqliteDir();

  console.log('⏳ Limpando dados anteriores...');
  // ordem: dependentes por último (se tiver relacionamentos)
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({}); // opcional: limpa usuários (mantém apenas admin criado abaixo)

  console.log('👤 Criando usuário admin...');
  // Hash de "admin123" (bcryptjs, 10 rounds)
  const ADMIN_HASH = '$2a$10$zOeNeiM3VdO3p0N4wR9KzO4Wgq1kA8b3tXn9l3d7S8mQy9q8bJ1bW';

  await prisma.user.upsert({
    where: { email: 'admin@inovapanda.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@inovapanda.com',
      password: ADMIN_HASH,
      role: 'admin',
    },
  });

  console.log('🛍️ Inserindo produtos...');
  const items = [
    {
      name: 'Mouse Sem Fio Inova Glide',
      description:
        'Mouse sem fio com alta precisão, design ergonômico e bateria de longa duração. Conectividade 2.4GHz.',
      price: 129.9,
      compareAtPrice: 169.9,
      image:
        'https://images.unsplash.com/photo-1587825140400-9b16b946ca47?q=80&w=1200&auto=format&fit=crop',
      brand: 'Inova',
      category: 'Periféricos',
      stock: 24,
      createdAt: daysAgo(2),
    },
    {
      name: 'Teclado Mecânico Panda Switch',
      description:
        'Teclado mecânico compacto com switches táteis estilo “panda”, iluminação RGB e keycaps PBT.',
      price: 349.9,
      compareAtPrice: 429.9,
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop',
      brand: 'PandaLab',
      category: 'Periféricos',
      stock: 15,
      createdAt: daysAgo(5),
    },
    {
      name: 'Headset Imersivo InovaPanda X',
      description:
        'Headset over-ear com drivers de 50mm, isolamento acústico e microfone com redução de ruído.',
      price: 499.9,
      compareAtPrice: 599.0,
      image:
        'https://images.unsplash.com/photo-1518441902113-c1d3b2a4a3a8?q=80&w=1600&auto=format&fit=crop',
      brand: 'InovaPanda',
      category: 'Áudio',
      stock: 12,
      createdAt: daysAgo(1),
    },
    {
      name: 'Smart Hub Wi-Fi Casa Conectada',
      description:
        'Centraliza seus dispositivos smart home. Compatível com Alexa/Google, automações e cenários.',
      price: 289.9,
      compareAtPrice: 329.9,
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
      brand: 'Aurora',
      category: 'Smart Home',
      stock: 30,
      createdAt: daysAgo(7),
    },
    {
      name: 'Mousepad XL InovaPanda Neoprene',
      description:
        'Superfície microtexturizada, base emborrachada e costura reforçada. Cobertura total do setup.',
      price: 99.9,
      compareAtPrice: 129.9,
      image:
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1600&auto=format&fit=crop',
      brand: 'InovaPanda',
      category: 'Acessórios',
      stock: 60,
      createdAt: daysAgo(4),
    },
    {
      name: 'Microfone Condensador USB Wave',
      description:
        'Captação cardioide limpa para streams e calls. Plug-and-play, arm-flex compatível.',
      price: 379.9,
      compareAtPrice: 449.9,
      image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop',
      brand: 'Wave',
      category: 'Áudio',
      stock: 18,
      createdAt: daysAgo(3),
    },
    {
      name: 'Combo Gamer (Teclado + Mouse + Headset)',
      description:
        'Kit essencial gamer com iluminação RGB, 6 botões programáveis e áudio com graves reforçados.',
      price: 699.0,
      compareAtPrice: 849.0,
      image:
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop',
      brand: 'PandaLab',
      category: 'Gamer',
      stock: 10,
      createdAt: daysAgo(6),
    },
    {
      name: 'Dock USB-C Pro 8-em-1',
      description:
        'Expansão completa para notebooks: HDMI 4K, USB 3.0, PD 100W, leitor SD/microSD e Ethernet.',
      price: 259.9,
      compareAtPrice: 319.9,
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop',
      brand: 'Inova',
      category: 'Acessórios',
      stock: 22,
      createdAt: daysAgo(8),
    },
  ];

  for (const p of items) {
    const slug = slugify(p.name);
    await prisma.product.upsert({
      where: { slug },
      update: {
        // permite re-seed atualizando preços/estoque/imagem/etc
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        image: p.image ?? null,
        brand: p.brand ?? null,
        category: p.category ?? null,
        stock: p.stock ?? 0,
      },
      create: {
        slug,
        name: p.name,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        image: p.image ?? null,
        brand: p.brand ?? null,
        category: p.category ?? null,
        stock: p.stock ?? 0,
        createdAt: p.createdAt ?? new Date(),
      },
    });
  }

  const count = await prisma.product.count();
  console.log(`✅ Seed finalizado. Produtos: ${count}. Admin: admin@inovapanda.com / admin123`);
}

main()
  .catch((e) => {
    console.error('❌ Seed falhou:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
