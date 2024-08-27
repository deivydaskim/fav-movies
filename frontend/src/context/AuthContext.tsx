import { createContext, useState, ReactNode, useEffect } from 'react';
import { getAuthToken, setAuthToken, clearAuthToken } from '../utils/auth';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string, token: string) => {
    setUser(username);
    setAuthToken(token);
  };

  const logout = () => {
    setUser(null);
    clearAuthToken();
  };

  const initializeLogoutTimer = () => {
    const expirationTime = localStorage.getItem('expiration_time');
    if (expirationTime) {
      const timeLeft =
        new Date(expirationTime).getTime() - new Date().getTime();

      if (timeLeft > 0) {
        return setTimeout(logout, timeLeft);
      }
    }
    // If token is expired or no expiration time found, log out immediately
    logout();
  };

  const isAuthenticated = () => {
    return !!getAuthToken();
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      initializeLogoutTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
