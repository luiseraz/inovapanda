// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const CATS = ['Periféricos', 'Áudio', 'Smart Home', 'Gamer', 'Acessórios'];

function initialsOf(str = '') {
  return String(str)
    .split(' ')
    .map((s) => s?.[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}

function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) { if (!ref.current?.contains(e.target)) setOpen(false); }
    function onEsc(e) { if (e.key === 'Escape') setOpen(false); }
    if (open) {
      document.addEventListener('click', onClickOutside);
      document.addEventListener('keydown', onEsc);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const init = initialsOf(user?.name || user?.email || 'IP');

  return (
    <div className="user-menu" ref={ref}>
      <button
        className="user-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={user?.name || user?.email}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="" onError={(e) => { e.currentTarget.remove(); }} />
        ) : (
          <div className="avatar-fallback">{init || '🐼'}</div>
        )}
      </button>

      {open && (
        <div className="user-dropdown" role="menu">
          <div className="user-box">
            <div className="user-row">
              <div className="avatar-mini" style={{ overflow: 'hidden' }}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.parentElement.textContent = init || '🐼'; }}
                  />
                ) : (init || '🐼')}
              </div>
              <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                <strong style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'Minha conta'}
                </strong>
                <div className="small" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          <ul className="menu-list">
            <li><Link to="/conta/perfil" onClick={() => setOpen(false)}>Perfil</Link></li>
            <li><Link to="/conta/pedidos" onClick={() => setOpen(false)}>Meus pedidos</Link></li>
            {user?.role === 'admin' && (
              <>
                <li className="sep" />
                <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
              </>
            )}
            <li className="sep" />
            <li><button className="btn-link" onClick={() => { setOpen(false); onLogout?.(); }}>Sair</button></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, isAuth, logout } = useAuth();
  const { items } = useCart();
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const loc = useLocation();

  const totalQty = useMemo(() => items.reduce((s, i) => s + (i.qty || 1), 0), [items]);

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/produtos?q=${encodeURIComponent(query)}` : '/produtos');
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* Marca colada: Inova (branco) + Panda (verde) */}
        <Link
          to="/"
          className="brand wordmark"
          data-text="InovaPanda"
          aria-label="Início InovaPanda"
        >
          Inova<span>Panda</span>
        </Link>

        <form onSubmit={onSubmit} role="search" aria-label="Buscar produtos" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            className="search"
            type="search"
            placeholder="Buscar produtos inovadores…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        <Link className="btn btn-outline" to="/produtos">Produtos</Link>
        <Link className="btn btn-outline" to="/carrinho">Carrinho ({totalQty})</Link>

        {isAuth ? (
          <UserDropdown user={user} onLogout={logout} />
        ) : (
          <>
            {loc.pathname === '/login'
              ? <Link className="btn" to="/registrar">Criar conta</Link>
              : <Link className="btn" to="/login">Entrar</Link>}
          </>
        )}
      </div>

      <div className="catbar-wrap">
        <div className="catbar">
          {CATS.map((c) => (
            <Link key={c} to={`/produtos?category=${encodeURIComponent(c)}`}>{c}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
