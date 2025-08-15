import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const from = new URLSearchParams(loc.search).get('from') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from);
    } catch (e) {
      alert('Credenciais inválidas.');
    }
  }

  return (
    <form className="auth" onSubmit={onSubmit}>
      <h2>Entrar</h2>
      <label>E-mail</label>
      <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Senha</label>
      <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn" type="submit" style={{ marginTop: 8 }}>Entrar</button>
      <p className="small" style={{ marginTop: 10 }}>
        Não tem conta? <Link to="/registrar">Criar conta</Link>
      </p>
    </form>
  );
}
