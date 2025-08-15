import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

export default function AdminProductsPage() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const q = params.get('q') || '';
  const page = Number(params.get('page') || 1);

  function update(patch) {
    const merged = { q, page, ...patch };
    Object.keys(merged).forEach(k => (merged[k] === '' || merged[k] == null) && delete merged[k]);
    setParams(merged, { replace: true });
  }

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get('/products', { params: { q, page, pageSize: 20, sort: 'new' } });
      setItems(data.products || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, page]);

  async function onDelete(p) {
    if (!confirm(`Excluir "${p.name}"?`)) return;
    await api.delete(`/products/${p.id ?? p.slug ?? p._id}`);
    await load();
  }

  return (
    <section className="section">
      <div className="section-header">
        <h3>Produtos ({total})</h3>
        <Link className="btn" to="/admin/produtos/novo">Adicionar</Link>
      </div>

      <div className="surface" style={{ padding: 12, marginBottom: 12 }}>
        <form onSubmit={(e) => { e.preventDefault(); update({ q: e.target.q.value, page: 1 }); }}>
          <input name="q" className="input" placeholder="Buscar por nome, marca, categoria…" defaultValue={q} />
        </form>
      </div>

      {loading ? (
        <div className="card skeleton" style={{ height: 320 }} />
      ) : (
        <div className="surface" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--panel-2)' }}>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>Nome</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>Preço</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>Estoque</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>Categoria</th>
                <th style={{ width: 220, padding: 10, borderBottom: '1px solid var(--border)' }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id ?? p.slug ?? p._id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={p.image || 'https://placehold.co/80x80/png'} alt="" style={{ width: 46, height: 46, objectFit: 'cover', borderRadius: 8 }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{p.name}</div>
                        <div className="small" style={{ opacity: .8 }}>{p.brand || '—'} • {p.category || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 10 }}>R$ {Number(p.price).toFixed(2)}</td>
                  <td style={{ padding: 10 }}>{p.stock ?? 0}</td>
                  <td style={{ padding: 10 }}>{p.category || '—'}</td>
                  <td style={{ padding: 10 }}>
                    <div className="row" style={{ gap: 8 }}>
                      <Link className="btn btn-outline" to={`/admin/produtos/${p.id ?? p.slug ?? p._id}/editar`}>Editar</Link>
                      <button className="btn btn-danger" onClick={() => onDelete(p)}>Excluir</button>
                      <Link className="btn btn-ghost" to={`/produto/${p.slug ?? (p.id ?? p._id)}`}>Ver</Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan={5} style={{ padding: 16 }} className="small">Nenhum produto encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
