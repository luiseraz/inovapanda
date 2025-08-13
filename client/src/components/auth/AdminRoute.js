import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para proteger rotas que exigem permissão de administrador
 * Redireciona para a página inicial se o usuário não for administrador
 */
const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const isAdmin = user && user.role === 'admin';

  // Mostrar indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Redirecionar para home se não for administrador
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute; 