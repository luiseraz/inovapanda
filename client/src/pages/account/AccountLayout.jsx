import { NavLink, Outlet } from 'react-router-dom';

export default function AccountLayout() {
  return (
    <div className="container" style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:16 }}>
      <aside className="surface" style={{ padding:14, position:'sticky', top:84, height:'fit-content' }}>
        <h3 style={{ marginTop:0 }}>Minha conta</h3>
        <nav className="col" style={{ gap:8 }}>
          <NavLink className="btn btn-outline" to="/conta/perfil">Perfil</NavLink>
          <NavLink className="btn btn-outline" to="/conta/pedidos">Meus pedidos</NavLink>
        </nav>
      </aside>
      <div className="col" style={{ gap:12 }}>
        <Outlet />
      </div>
    </div>
  );
}
