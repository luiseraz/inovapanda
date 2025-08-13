import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para proteger rotas que exigem autenticação
 * Redireciona para a página de login se o usuário não estiver autenticado
 */
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

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

  // Redirecionar para login se não estiver autenticado
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 