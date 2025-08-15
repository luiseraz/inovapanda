import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (e) {
      alert('Erro ao registrar (e-mail pode já estar em uso).');
    }
  }

  return (
    <form className="auth" onSubmit={onSubmit}>
      <h2>Criar conta</h2>
      <label>Nome</label>
      <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
      <label>E-mail</label>
      <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Senha</label>
      <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn" type="submit" style={{ marginTop: 8 }}>Criar</button>
    </form>
  );
}
