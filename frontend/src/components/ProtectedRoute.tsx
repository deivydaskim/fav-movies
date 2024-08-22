import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
