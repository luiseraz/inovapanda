import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../lib/constants';
import { cn } from '../lib/format';

export default function CategoryTiles() {
  const navigate = useNavigate();

  return (
    <div className="tiles">
      {CATEGORIES.map((c, idx) => {
        const delay = `animate-delay-${(idx % 3) + 1}`;
        return (
          <button
            key={c.name}
            className={cn('tile', 'animate-up', delay)}
            onClick={() => navigate(`/produtos?category=${encodeURIComponent(c.name)}`)}
            type="button"
          >
            <img src={c.image} alt={c.name} loading="lazy" />
            <span>{c.name}</span>
          </button>
        );
      })}
    </div>
  );
}
