import React, { createContext, useContext, useState } from "react";

// Cria o contexto de autenticação
const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para autenticar
  const login = () => {
    setIsAuthenticated(true);
  };

  // Função para deslogar
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
