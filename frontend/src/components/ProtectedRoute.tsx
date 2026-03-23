import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth(); // <--- 1. Grab isLoading

  // 2. THE "HOLD ON" CHECK
  // If we are still reading the vault, stay on this page and do nothing!
  if (isLoading) {
    return <div className="bg-zinc-950 min-h-screen" />; 
  }

  // SCENARIO 1: Now that loading is false, if there's still no user, they truly aren't logged in.
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // SCENARIO 2: Check for role overlap
  const hasAccess = currentUser.roles.some(role => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/" replace />; 
  }

  // SCENARIO 3: Access Granted.
  return children;
};

export default ProtectedRoute;