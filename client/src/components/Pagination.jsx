// src/components/Pagination.jsx
export default function Pagination({ page = 1, pageSize = 12, total = 0, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  const go = (p) => onChange?.(Math.min(Math.max(1, p), pages));

  return (
    <nav className="row" aria-label="Paginação" style={{ justifyContent: 'center', gap: 8, marginTop: 14 }}>
      <button className="btn btn-outline" onClick={() => go(page - 1)} disabled={page <= 1}>← Anterior</button>
      <span className="badge">Página {page} de {pages}</span>
      <button className="btn btn-outline" onClick={() => go(page + 1)} disabled={page >= pages}>Próxima →</button>
    </nav>
  );
}
