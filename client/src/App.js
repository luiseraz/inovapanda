import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexto de Autenticação
import { AuthProvider } from './context/AuthContext';

// Componentes de Proteção de Rotas
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

// Componentes do Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Páginas Públicas
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Páginas Protegidas (Usuário)
import ProfilePage from './pages/user/ProfilePage';
import OrderHistoryPage from './pages/user/OrderHistoryPage';
import CheckoutPage from './pages/user/CheckoutPage';
import OrderSuccessPage from './pages/user/OrderSuccessPage';
import OrderDetailPage from './pages/user/OrderDetailPage';

// Páginas de Administrador
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AdminUsersPage from './pages/admin/UsersPage';
import AdminOrdersPage from './pages/admin/OrdersPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Toaster position="top-center" />
          <Header />
          <main className="flex-grow container-custom mx-auto py-4 px-4 sm:px-6">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rotas Protegidas do Usuário */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/success" element={<OrderSuccessPage />} />
                <Route path="/order/:id" element={<OrderDetailPage />} />
              </Route>

              {/* Rotas Protegidas do Admin */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
              </Route>

              {/* Rota 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 