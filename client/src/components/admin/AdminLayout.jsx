import { Link, NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
      <aside className="surface" style={{ padding: 14, position: 'sticky', top: 84, height: 'fit-content' }}>
        <h3 style={{ marginTop: 0 }}>Admin • InovaPanda</h3>
        <nav className="col" style={{ gap: 8 }}>
          <NavLink className="btn btn-outline" to="/admin/produtos">Produtos</NavLink>
          <NavLink className="btn btn-outline" to="/admin/produtos/novo">Adicionar produto</NavLink>
          <Link className="btn btn-ghost" to="/">Voltar à loja</Link>
        </nav>
      </aside>
      <div className="col" style={{ gap: 12 }}>
        <Outlet />
      </div>
    </div>
  );
}
