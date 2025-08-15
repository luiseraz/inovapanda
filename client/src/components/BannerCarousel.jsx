import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_SLIDES } from '../lib/constants';

export default function BannerCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // autoplay com pausa no hover
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % HOME_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setI((p) => (p - 1 + HOME_SLIDES.length) % HOME_SLIDES.length);
  const next = () => setI((p) => (p + 1) % HOME_SLIDES.length);
  const s = HOME_SLIDES[i];

  return (
    <div
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Destaques InovaPanda"
    >
      <img className="hero-img" src={s.image} alt={s.title} />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="badge">InovaPanda • Importados oficiais</div>
        <h1 className="hero-title">{s.title}</h1>
        <p className="hero-text">{s.text}</p>
        <div className="row">
          <Link className="btn" to={s.cta.to}>{s.cta.label}</Link>
          <Link className="btn btn-outline" to="/produtos">Todos os produtos</Link>
        </div>
      </div>

      <button
        className="hero-arrow left"
        onClick={prev}
        aria-label="Slide anterior"
        type="button"
      >‹</button>

      <button
        className="hero-arrow right"
        onClick={next}
        aria-label="Próximo slide"
        type="button"
      >›</button>

      <div className="hero-dots" role="tablist" aria-label="Seleção de slides">
        {HOME_SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === i ? 'active' : ''}`}
            onClick={() => setI(idx)}
            aria-selected={idx === i}
            aria-label={`Ir para o slide ${idx + 1}`}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
