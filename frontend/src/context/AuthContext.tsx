import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/AxiosConfig'; 

interface User {
  username: string;
  roles: string[];
  permissions: string[]; // ✅ Awesome, you added this!
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The "Mini ID Scanner"
const isTokenValid = (token: string) => {
  try {
    const payloadString = atob(token.split('.')[1]);
    const payload = JSON.parse(payloadString);
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false; 
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedRoles = localStorage.getItem("user_roles"); 
      const savedName = localStorage.getItem("user_name");
      const savedToken = localStorage.getItem("jwt_token"); 
      const savedPermissions = localStorage.getItem("user_permissions"); // ✅ NEW: Grab permissions
      
      // ✅ NEW: Check that savedPermissions also exists
      if (savedRoles && savedName && savedToken && savedPermissions) {
        
        // 1. If the token is expired, try to refresh it
        if (!isTokenValid(savedToken)) {
          try {
            console.log("Access token expired on load. Attempting background refresh...");
            const response = await api.post('/api/auth/refresh');
            
            const newAccessToken = response.data.accessToken as string;
            
            if (newAccessToken) {
              localStorage.setItem("jwt_token", newAccessToken); 
              
              // Note: If you update your backend /refresh to return fresh roles/permissions,
              // you would update localStorage and your parsed variables here!
              
            } else {
              throw new Error("No token returned from refresh endpoint.");
            }

          } catch (error) {
            console.error("Refresh token expired or invalid. User must log in again.");
            setCurrentUser(null);
            localStorage.clear();
            setIsLoading(false);
            return; 
          }
        }

        // 2. Set the user state
        try {
          const parsedRoles = JSON.parse(savedRoles);
          const parsedPermissions = JSON.parse(savedPermissions); // ✅ NEW: Parse permissions
          
          // ✅ NEW: Include permissions to satisfy TypeScript and React State
          setCurrentUser({ 
            username: savedName, 
            roles: parsedRoles, 
            permissions: parsedPermissions 
          }); 
        } catch (error) {
          console.error("Could not parse roles or permissions", error);
          localStorage.clear(); 
          setCurrentUser(null);
        }

      } else {
        setCurrentUser(null);
        localStorage.clear();
      }
      
      setIsLoading(false); 
    };

    initializeAuth();
  }, []);

  const login = (userData: User, token: string) => {
    setCurrentUser(userData);
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_name", userData.username);
    localStorage.setItem("user_roles", JSON.stringify(userData.roles));
    localStorage.setItem("user_permissions", JSON.stringify(userData.permissions)); // ✅ NEW: Save permissions on login
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error("Error communicating logout to the server", error);
    } finally {
      setCurrentUser(null);
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};