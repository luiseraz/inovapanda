// src/components/FilterSidebar.jsx
import { useEffect, useState } from 'react';
import { CATEGORIES } from '../lib/constants';

export default function FilterSidebar({ initial = {}, onApply, onClear }) {
  const [category, setCategory] = useState(initial.category || '');
  const [brand, setBrand] = useState(initial.brand || '');
  const [min, setMin] = useState(initial.min || '');
  const [max, setMax] = useState(initial.max || '');
  const [inStock, setInStock] = useState(Boolean(initial.inStock));

  useEffect(() => {
    setCategory(initial.category || '');
    setBrand(initial.brand || '');
    setMin(initial.min || '');
    setMax(initial.max || '');
    setInStock(Boolean(initial.inStock));
  }, [initial.category, initial.brand, initial.min, initial.max, initial.inStock]);

  function apply() {
    onApply?.({
      category: category || undefined,
      brand: brand || undefined,
      min: min || undefined,
      max: max || undefined,
      inStock: inStock ? true : undefined,
    });
  }

  return (
    <aside className="surface" style={{ padding: 14, position: 'sticky', top: 84, minWidth: 260, width: 260 }}>
      <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 16 }}>Filtros</h3>

      <div className="col" style={{ gap: 10 }}>
        <div className="col">
          <label>Categoria</label>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div className="col">
          <label>Marca</label>
          <input className="input" placeholder="Ex.: Inova, Panda…" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>

        <div className="row" style={{ gap: 10 }}>
          <div className="col" style={{ flex: 1 }}>
            <label>Preço mín.</label>
            <input className="input" type="number" min="0" step="0.01" value={min} onChange={(e) => setMin(e.target.value)} />
          </div>
          <div className="col" style={{ flex: 1 }}>
            <label>Preço máx.</label>
            <input className="input" type="number" min="0" step="0.01" value={max} onChange={(e) => setMax(e.target.value)} />
          </div>
        </div>

        <label className="row" style={{ gap: 8 }}>
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          <span>Somente disponíveis</span>
        </label>

        <div className="row" style={{ gap: 10 }}>
          <button className="btn" onClick={apply}>Aplicar</button>
          <button className="btn btn-outline" onClick={() => onClear?.()}>Limpar</button>
        </div>
      </div>
    </aside>
  );
}
