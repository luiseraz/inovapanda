// src/pages/account/ProfilePage.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProfilePage() {
  const { isAuth, setAuthUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ name: '', avatar: '' });
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '' });

  useEffect(() => {
    if (!isAuth) return;
    const ctl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/auth/me', { signal: ctl.signal });
        setMe(data.user);
        setForm({ name: data.user?.name || '', avatar: data.user?.avatar || '' });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctl.abort();
  }, [isAuth]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function onChangePwd(e) {
    const { name, value } = e.target;
    setPwd((f) => ({ ...f, [name]: value }));
  }

  async function onSave(e) {
    e.preventDefault();
    setMsg('');
    try {
      const { data } = await api.put('/auth/me', form);
      setMe(data.user);               // atualiza página
      setAuthUser(data.user);         // <- atualiza Navbar / contexto
      setMsg('Perfil atualizado.');
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Falha ao atualizar perfil.');
    }
  }

  async function onChangePassword(e) {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/auth/change-password', pwd);
      setMsg('Senha alterada com sucesso.');
      setPwd({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Falha ao alterar a senha.');
    }
  }

  if (loading) return <div className="card skeleton" style={{ height: 320 }} />;

  return (
    <section className="section">
      <div className="section-header"><h3>Perfil</h3></div>

      {msg && <div className="badge" style={{ borderColor:'#4e684e', background:'#4e684e22', color:'#fff' }}>{msg}</div>}

      <form className="surface col" style={{ padding:16, gap:12 }} onSubmit={onSave}>
        <div className="row" style={{ gap:12 }}>
          <div className="col" style={{ flex:1 }}>
            <label>Nome</label>
            <input className="input" name="name" value={form.name} onChange={onChange} />
          </div>
          <div className="col" style={{ flex:1 }}>
            <label>Email (somente leitura)</label>
            <input className="input" value={me?.email || ''} disabled />
          </div>
        </div>

        <div className="row" style={{ gap:12 }}>
          <div className="col" style={{ flex:1 }}>
            <label>Avatar (URL)</label>
            <input className="input" name="avatar" value={form.avatar} onChange={onChange} placeholder="https://…" />
          </div>
          <div className="col" style={{ width:120, alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:86, height:86, borderRadius:999, overflow:'hidden', border:'1px solid var(--border)', background:'#0f1614' }}>
              {form.avatar
                ? <img src={form.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                : <div style={{ display:'grid', placeItems:'center', height:'100%', color:'var(--muted)' }}>sem foto</div>}
            </div>
          </div>
        </div>

        <div className="row" style={{ gap:10, justifyContent:'flex-end' }}>
          <button className="btn" type="submit">Salvar</button>
        </div>
      </form>

      <div className="surface col" style={{ padding:16, gap:12, marginTop:12 }}>
        <h4 style={{ margin:0 }}>Alterar senha</h4>
        <form className="col" style={{ gap:12 }} onSubmit={onChangePassword}>
          <div className="row" style={{ gap:12 }}>
            <div className="col" style={{ flex:1 }}>
              <label>Senha atual</label>
              <input className="input" type="password" name="currentPassword" value={pwd.currentPassword} onChange={onChangePwd} required />
            </div>
            <div className="col" style={{ flex:1 }}>
              <label>Nova senha</label>
              <input className="input" type="password" name="newPassword" value={pwd.newPassword} onChange={onChangePwd} required />
            </div>
          </div>
          <div className="row" style={{ gap:10, justifyContent:'flex-end' }}>
            <button className="btn btn-outline" type="reset" onClick={()=>setPwd({ currentPassword:'', newPassword:'' })}>Limpar</button>
            <button className="btn" type="submit">Salvar senha</button>
          </div>
        </form>
      </div>
    </section>
  );
}
