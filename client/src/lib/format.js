// Utilitários de formatação/ajuda para a InovaPanda

/** Formata número como moeda (pt-BR) */
export function formatPrice(value, currency = 'BRL') {
  const n = Number(value || 0);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(n);
}

/** Atalho específico para BRL */
export const toBRL = (value) => formatPrice(value, 'BRL');

/** Converte "R$ 1.234,56" -> 1234.56 */
export function parseCurrency(str = '') {
  const s = String(str).replace(/[^\d,-]+/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

/** Calcula parcelamento: retorna { count, value } */
export function formatInstallments(total, max = 12, minPerInstallment = 80) {
  const t = Number(total || 0);
  if (t <= 0) return { count: 1, value: 0 };

  const ideal = Math.floor(t / minPerInstallment);
  const count = clamp(Math.max(2, ideal), 2, max);
  return { count, value: t / count };
}

/** % de desconto (ex.: 20) */
export function percentOff(oldPrice, newPrice) {
  const a = Number(oldPrice), b = Number(newPrice);
  if (!a || !b || b >= a) return 0;
  return Math.round(((a - b) / a) * 100);
}

/** Slug amigável (com acentos) */
export function slugify(str = '') {
  return String(str)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** Clamp simples */
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/** Junta classes condicionais */
export const cn = (...args) => args.filter(Boolean).join(' ');

/** Corta texto e adiciona reticências */
export function truncate(text = '', max = 80) {
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}
