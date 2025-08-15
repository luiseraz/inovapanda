// src/pages/HomePage.jsx
import BannerCarousel from '../components/BannerCarousel.jsx';
import CategoryTiles from '../components/CategoryTiles.jsx';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <BannerCarousel />

      <div className="benefits">
        <div className="benefit"><span>🐼</span> Curadoria InovaPanda</div>
        <div className="benefit"><span>🚚</span> Frete grátis acima de R$ 300</div>
        <div className="benefit"><span>🔒</span> Pagamento seguro</div>
        <div className="benefit"><span>⚡</span> Envio em 24h</div>
      </div>

      <CategoryTiles />

      {/* Novidades (ordenadas por createdAt desc) */}
      <FeaturedProducts title="Novidades da InovaPanda" limit={8} />

      {/* Faixas por categoria (exemplos) */}
      <FeaturedProducts title="Periféricos em alta" limit={4} params={{ category: 'Periféricos' }} />
      <FeaturedProducts title="Áudio em destaque"   limit={4} params={{ category: 'Áudio' }} />

      <div className="banners-2">
        <Link to="/produtos?category=Periféricos" className="mini-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop)' }}>
          <div><strong>Periféricos</strong><span>Teclados, mouses e mais</span></div>
        </Link>
        <Link to="/produtos?category=Áudio" className="mini-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop)' }}>
          <div><strong>Áudio</strong><span>Headsets e fones</span></div>
        </Link>
      </div>
    </div>
  );
}
