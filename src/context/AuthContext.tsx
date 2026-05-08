import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const login = (email: string) => {
    // Basic mock login
    setUser({ name: email.split('@')[0], email, phone: "+237 600 000 000" });
    setAuthModalOpen(false);
  };

  const register = (name: string, email: string, phone: string) => {
    // Basic mock register
    setUser({ name, email, phone });
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthModalOpen, setAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
