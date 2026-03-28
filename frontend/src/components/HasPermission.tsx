import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface HasPermissionProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode; // Optional: What to show if they DON'T have permission
}

const HasPermission = ({ permission, children, fallback = null }: HasPermissionProps) => {
  const { currentUser } = useAuth();

  // If no user is logged in, or they don't have the permission, show the fallback
  if (!currentUser || !currentUser.permissions.includes(permission)) {
    return <>{fallback}</>;
  }

  // If they have the permission, render the children!
  return <>{children}</>;
};

export default HasPermission;