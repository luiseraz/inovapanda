import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section>
      <h2>Página não encontrada</h2>
      <p className="small">Ops! O que você procura não existe ou foi movido.</p>
      <Link className="btn" to="/">Voltar à página inicial</Link>
    </section>
  );
}
