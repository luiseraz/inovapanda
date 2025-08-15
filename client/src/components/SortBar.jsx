// src/components/SortBar.jsx
import { SORT_OPTIONS } from '../lib/constants';

export default function SortBar({ total = 0, sort = 'new', pageSize = 12, onSort, onPageSize }) {
  return (
    <div className="surface" style={{ padding: 12, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
      <span className="small">{total} resultado(s)</span>

      <div className="row" style={{ gap: 10 }}>
        <label className="row" style={{ gap: 8 }}>
          <span className="small">Ordenar:</span>
          <select className="input" value={sort} onChange={(e) => onSort?.(e.target.value)} style={{ height: 40, padding: '6px 10px' }}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>

        <label className="row" style={{ gap: 8 }}>
          <span className="small">Exibir:</span>
          <select className="input" value={pageSize} onChange={(e) => onPageSize?.(Number(e.target.value))} style={{ height: 40, padding: '6px 10px' }}>
            {[12, 24, 36, 48].map(n => <option key={n} value={n}>{n}/página</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}
