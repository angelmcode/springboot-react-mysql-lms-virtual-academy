import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/AxiosConfig'; 

interface User {
  username: string;
  roles: string[]; 
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The "Mini ID Scanner" - Still perfect!
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
    const savedRoles = localStorage.getItem("user_roles"); 
    const savedName = localStorage.getItem("user_name");
    const savedToken = localStorage.getItem("jwt_token");
    
    if (savedRoles && savedName && savedToken && isTokenValid(savedToken)) {
      try {
        const parsedRoles = JSON.parse(savedRoles);
        setCurrentUser({ username: savedName, roles: parsedRoles });
      } catch (error) {
        console.error("Could not parse roles", error);
        localStorage.clear(); 
      }
    } else {
      setCurrentUser(null);
      localStorage.clear();
    }
    
    setIsLoading(false); 
  }, []);

  const login = (userData: User, token: string) => {
    setCurrentUser(userData);
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_name", userData.username);
    localStorage.setItem("user_roles", JSON.stringify(userData.roles));
  };

  // 🚨 NEW LOGOUT LOGIC 🚨
  const logout = async () => {
    try {
      // 1. Hit the "Kill Switch" on the backend to delete the DB token and clear the Cookie
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error("Error communicating logout to the server", error);
    } finally {
      // 2. Always wipe the frontend vault, even if the server is offline
      setCurrentUser(null);
      localStorage.clear();
      
      // 3. Force the browser back to the login page to clear memory
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