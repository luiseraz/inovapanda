import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminGuard({ children }) {
  const { isAuth, user } = useAuth();
  const loc = useLocation();

  if (!isAuth) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}
