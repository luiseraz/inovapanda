// src/components/FeaturedProducts.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductGrid from './ProductGrid.jsx';

export default function FeaturedProducts({
  title = 'Destaques',
  params = {},          // ex.: { category: 'Periféricos' }
  limit = 8,            // quantos itens exibir
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [items, setItems]     = useState([]);

  useEffect(() => {
    const ctl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await api.get('/products', {
          params: {
            sort: 'new',       // padrão: novidades
            page: 1,
            pageSize: limit,
            ...params,         // pode sobrepor sort/category/etc
          },
          signal: ctl.signal,
        });
        setItems(data.products || []);
      } catch (e) {
        if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') return;
        console.error(e);
        setError('Não foi possível carregar os destaques.');
      } finally {
        setLoading(false);
      }
    })();

    return () => ctl.abort();
  }, [limit, JSON.stringify(params)]);

  if (loading) {
    return (
      <section className="section">
        <div className="section-header"><h3>{title}</h3></div>
        <div className="grid">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="card skeleton" style={{ height: 320 }} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="surface" style={{ padding: 16 }}>
          <p>{error}</p>
          <button className="btn" onClick={() => location.reload()}>Tentar novamente</button>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="section">
        <div className="section-header">
          <h3>{title}</h3>
          <Link className="btn btn-ghost" to="/produtos">Ver todos</Link>
        </div>
        <p className="small">Sem produtos para mostrar aqui ainda.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-header">
        <h3>{title}</h3>
        <Link className="btn btn-ghost" to="/produtos">Ver todos</Link>
      </div>
      <ProductGrid products={items} />
    </section>
  );
}
