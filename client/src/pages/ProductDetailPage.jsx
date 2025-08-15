// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toBRL, formatInstallments } from '../lib/format';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetailPage() {
  const { slug } = useParams(); // pode ser slug ou id
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [prod, setProd] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError('');            // limpa erro antigo
        setProd(null);           // evita piscar dados antigos

        const { data } = await api.get(`/products/${slug}`, { signal: ctl.signal });
        setProd(data.product);
      } catch (e) {
        // Ignora cancelamentos (StrictMode / troca rápida de rota)
        if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') return;

        // 404 real da API
        if (e?.response?.status === 404) setError('Produto não encontrado.');
        else setError('Não foi possível carregar o produto.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => ctl.abort();
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <div className="card skeleton" style={{ height: 420 }} />
      </div>
    );
  }
  if (error || !prod) {
    return (
      <div className="container">
        <div className="surface" style={{ padding: 16 }}>
          <p>{error || 'Produto não encontrado.'}</p>
          <Link className="btn btn-outline" to="/produtos">Voltar para a lista</Link>
        </div>
      </div>
    );
  }

  const { count, value } = formatInstallments(prod.price || 0);

  return (
    <div className="container">
      <div className="row" style={{ alignItems: 'stretch', gap: 18 }}>
        <div className="surface" style={{ flex: 1, padding: 12 }}>
          <img
            src={prod.image || 'https://placehold.co/1200x1200/png?text=InovaPanda'}
            alt={prod.name}
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 12 }}
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x1200/png?text=InovaPanda'; }}
          />
        </div>

        <div className="col" style={{ flex: 1, gap: 12 }}>
          <div className="surface" style={{ padding: 16 }}>
            <h1 style={{ marginTop: 0 }}>{prod.name}</h1>
            <p className="small" style={{ marginTop: -8, color: '#aab3b0' }}>
              {[prod.brand, prod.category].filter(Boolean).join(' • ')}
            </p>

            <div className="row" style={{ gap: 10, alignItems: 'baseline', marginTop: 8 }}>
              <strong className="price-now" style={{ fontSize: 24 }}>{toBRL(prod.price)}</strong>
              {prod.compareAtPrice ? <span className="price-old">{toBRL(prod.compareAtPrice)}</span> : null}
            </div>
            <div className="small">em até {count}x de {toBRL(value)} sem juros</div>

            <div className="row" style={{ gap: 10, marginTop: 12 }}>
              <button className="btn" onClick={() => addItem(prod, 1)}>Adicionar ao carrinho</button>
              <Link className="btn btn-outline" to="/carrinho">Ir para o carrinho</Link>
            </div>
          </div>

          <div className="surface" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Descrição</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{prod.description || 'Produto sem descrição.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
