import { Navigate } from 'react-router';
import type { ReactNode } from 'react'; // ✅ Added 'type'
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requiredPermission: string; // ✅ Changed from allowedRoles
  children: ReactNode;
}

const ProtectedRoute = ({ requiredPermission, children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  // 1. THE "HOLD ON" CHECK
  if (isLoading) {
    return <div className="bg-zinc-950 min-h-screen" />; 
  }

  // 2. No user logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. ✅ NEW: Check for the specific permission (safely using ?.)
  const hasAccess = currentUser.permissions?.includes(requiredPermission);

  if (!hasAccess) {
    return <Navigate to="/" replace />; 
  }

  // 4. Access Granted.
  return <>{children}</>;
};

export default ProtectedRoute;