// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Base
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Páginas públicas
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Conta (usuário logado)
import AccountLayout from './pages/account/AccountLayout.jsx';
import ProfilePage from './pages/account/ProfilePage.jsx';
import OrdersPage from './pages/account/OrdersPage.jsx';
import { useAuth } from './context/AuthContext.jsx';

// Admin
import AdminGuard from './components/admin/AdminGuard.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminProductsPage from './pages/admin/AdminProductPage.jsx';
import AdminProductFormPage from './pages/admin/AdminProductFormPage.jsx';

// Wrapper simples para exigir login (não exige admin)
function RequireAuth({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="container">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produto/:slug" element={<ProductDetailPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />

          {/* Conta (usuário autenticado) */}
          <Route
            path="/conta"
            element={
              <RequireAuth>
                <AccountLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="perfil" replace />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="pedidos" element={<OrdersPage />} />
          </Route>

          {/* Admin (protegidas) */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<AdminProductsPage />} />
            <Route path="produtos" element={<AdminProductsPage />} />
            <Route path="produtos/novo" element={<AdminProductFormPage />} />
            <Route path="produtos/:idOrSlug/editar" element={<AdminProductFormPage />} />
          </Route>

          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
