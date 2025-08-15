import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div>
          <Link
            to="/"
            className="brand wordmark"
            data-text="InovaPanda"
            style={{ fontSize: 20, display: 'inline-flex' }}
          >
            Inova<span>Panda</span>
          </Link>
          <p className="small" style={{ marginTop: 8, maxWidth: 420 }}>
            Tecnologia importada com curadoria local. Produtos modernos, preço justo e envio rápido.
          </p>
          <div className="row" style={{ gap: 8, marginTop: 10 }}>
            <span className="badge">Visa</span>
            <span className="badge">Mastercard</span>
            <span className="badge">Pix</span>
            <span className="badge">Boleto</span>
          </div>
        </div>

        <div>
          <strong>Institucional</strong>
          <ul>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><a href="#">Sobre a InovaPanda</a></li>
            <li><a href="#">Política de privacidade</a></li>
            <li><a href="#">Trocas e devoluções</a></li>
          </ul>
        </div>

        <div>
          <strong>Atendimento</strong>
          <ul>
            <li>Seg–Sex 9h–18h</li>
            <li><a href="mailto:contato@inovapanda.com">contato@inovapanda.com</a></li>
            <li><a href="#">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="inner container">
        © {new Date().getFullYear()} InovaPanda — conectando você ao futuro 🚀
      </div>
    </footer>
  );
}
