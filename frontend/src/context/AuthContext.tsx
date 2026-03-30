import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/AxiosConfig'; 

interface User {
  username: string;
  roles: string[];
  permissions: string[];
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  // ✅ NEW: Helper function to target ONLY auth data, leaving 'theme' alone!
  const clearAuthData = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_roles");
    localStorage.removeItem("user_permissions");
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedRoles = localStorage.getItem("user_roles"); 
      const savedName = localStorage.getItem("user_name");
      const savedToken = localStorage.getItem("jwt_token"); 
      const savedPermissions = localStorage.getItem("user_permissions"); 
      
      if (savedRoles && savedName && savedToken && savedPermissions) {
        
        if (!isTokenValid(savedToken)) {
          try {
            console.log("Access token expired on load. Attempting background refresh...");
            const response = await api.post('/api/auth/refresh');
            
            const newAccessToken = response.data.accessToken as string;
            
            if (newAccessToken) {
              localStorage.setItem("jwt_token", newAccessToken); 
            } else {
              throw new Error("No token returned from refresh endpoint.");
            }

          } catch (error) {
            console.error("Refresh token expired or invalid. User must log in again.");
            setCurrentUser(null);
            clearAuthData(); // ✅ Replaced clear()
            setIsLoading(false);
            return; 
          }
        }

        try {
          const parsedRoles = JSON.parse(savedRoles);
          const parsedPermissions = JSON.parse(savedPermissions); 
          
          setCurrentUser({ 
            username: savedName, 
            roles: parsedRoles, 
            permissions: parsedPermissions 
          }); 
        } catch (error) {
          console.error("Could not parse roles or permissions", error);
          clearAuthData(); // ✅ Replaced clear()
          setCurrentUser(null);
        }

      } else {
        setCurrentUser(null);
        clearAuthData(); // ✅ Replaced clear()
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
    localStorage.setItem("user_permissions", JSON.stringify(userData.permissions)); 
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error("Error communicating logout to the server", error);
    } finally {
      setCurrentUser(null);
      clearAuthData(); // ✅ Replaced clear()
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