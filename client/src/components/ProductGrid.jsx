// src/components/ProductGrid.jsx
import ProductCard from './ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';

function keyFor(p, idx) {
  // ordem de preferência: Prisma(id) → Mongo(_id) → slug → fallback com índice
  return String(p.id ?? p._id ?? p.slug ?? `prod-${idx}-${p.name || 'item'}`);
}

export default function ProductGrid({ products = [] }) {
  const { addItem } = useCart();

  if (!products.length) {
    return (
      <div className="surface" style={{ padding: 16 }}>
        <p className="small">Nenhum produto encontrado com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map((p, idx) => (
        <ProductCard
          key={keyFor(p, idx)}
          product={p}
          onAdd={(prod) => addItem(prod, 1)}
        />
      ))}
    </div>
  );
}
