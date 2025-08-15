// src/components/UserMenu.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function initials(str = '') {
  return String(str)
    .split(' ')
    .map((s) => s?.[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}

export default function UserMenu() {
  const { isAuth, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('click', onClickOutside);
      document.addEventListener('keydown', onEsc);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  if (!isAuth) {
    return (
      <div className="row" style={{ gap: 8 }}>
        <Link className="btn btn-outline" to="/login">Entrar</Link>
        <Link className="btn" to="/registrar">Criar conta</Link>
      </div>
    );
  }

  const init = initials(user?.name || user?.email || 'IP');

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
              {/* avatar dentro do dropdown */}
              <div className="avatar-mini" style={{ overflow: 'hidden' }}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.parentElement.textContent = init || '🐼'; }}
                  />
                ) : (
                  init || '🐼'
                )}
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
            <li><button className="btn-link" onClick={() => { setOpen(false); logout(); }}>Sair</button></li>
          </ul>
        </div>
      )}
    </div>
  );
}
