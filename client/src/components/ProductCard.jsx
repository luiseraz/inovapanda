// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { toBRL, formatInstallments, percentOff } from '../lib/format';

export default function ProductCard({ product, onAdd }) {
  if (!product) return null;

  const {
    id,
    _id,
    slug,
    name,
    price = 0,
    compareAtPrice,
    image,
    brand,
    category,
    stock,
  } = product;

  // URL do detalhe: usa slug; se não existir, usa id/_id
  const detailHref = slug
    ? `/produto/${slug}`
    : `/produto/${id ?? _id}`;

  // desconto e parcelamento
  const off = compareAtPrice ? percentOff(compareAtPrice, price) : 0;
  const { count, value } = formatInstallments(price);

  const outOfStock = typeof stock === 'number' ? stock <= 0 : false;
  const imgSrc = image || 'https://placehold.co/800x800/png?text=InovaPanda';

  return (
    <div className="card animate-up">
      <div className="media">
        {off > 0 && <span className="ribbon">-{off}%</span>}
        <img
          className="thumb"
          src={imgSrc}
          alt={name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x800/png?text=InovaPanda'; }}
        />
      </div>

      <div className="body">
        <h3 className="title">
          <Link to={detailHref}>{name}</Link>
        </h3>

        <p className="small" style={{ marginTop: -2 }}>
          {[brand, category].filter(Boolean).join(' • ') || '—'}
        </p>

        <div className="price-block">
          <span className="price-now">{toBRL(price)}</span>
          {compareAtPrice ? <span className="price-old">{toBRL(compareAtPrice)}</span> : null}
        </div>

        <div className="installment">
          em até {count}x de {toBRL(value)} sem juros
        </div>

        <div className="actions">
          <Link className="btn btn-outline" to={detailHref}>Detalhes</Link>
          <button
            className={`btn${outOfStock ? ' btn-ghost' : ''}`}
            onClick={() => !outOfStock && onAdd?.(product)}
            disabled={outOfStock}
            title={outOfStock ? 'Indisponível' : 'Adicionar ao carrinho'}
          >
            {outOfStock ? 'Indisponível' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}
