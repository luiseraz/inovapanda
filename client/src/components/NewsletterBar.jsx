import { useState } from 'react';

export default function NewsletterBar() {
  const [email, setEmail] = useState('');
  function submit(e) {
    e.preventDefault();
    if (!email) return;
    alert('Obrigado! Vamos te avisar das novidades.');
    setEmail('');
  }
  return (
    <div className="newsletter">
      <div className="newsletter-inner">
        <div>
          <strong style={{ fontSize: 18 }}>Receba ofertas e novidades</strong>
          <div className="small">Sem spam. Cancelamento a qualquer momento.</div>
        </div>
        <form onSubmit={submit} className="row" style={{ gap: 8 }}>
          <input className="input" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn">Assinar</button>
        </form>
      </div>
    </div>
  );
}
