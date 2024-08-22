import { createContext, useState, ReactNode } from 'react';
import { getAuthToken } from '../utils/auth';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string, token: string) => {
    setUser(username);
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
  };

  const isAuthenticated = () => {
    return user !== null || getAuthToken() !== null;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
