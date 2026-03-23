import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  username: string;
  roles: string[]; 
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean; // <-- 1. Add this to the type
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // 2. Start as 'true' because we haven't checked the "vault" yet
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRoles = localStorage.getItem("user_roles"); 
    const savedName = localStorage.getItem("user_name");
    
    if (savedRoles && savedName) {
      try {
        const parsedRoles = JSON.parse(savedRoles);
        setCurrentUser({ username: savedName, roles: parsedRoles });
      } catch (error) {
        console.error("Could not parse roles", error);
        localStorage.clear(); // Clean up if data is corrupted
      }
    }
    
    // 3. CRITICAL: We are done checking localStorage, turn off the loading screen
    setIsLoading(false); 
  }, []);

  const login = (userData: User, token: string) => {
    setCurrentUser(userData);
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_name", userData.username);
    localStorage.setItem("user_roles", JSON.stringify(userData.roles));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.clear();
  };

  // 4. Pass isLoading into the Provider
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