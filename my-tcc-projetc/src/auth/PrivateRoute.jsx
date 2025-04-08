import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

// Componente de rota privada que verifica a autenticação
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Usa o contexto de autenticação

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redireciona para login se não autenticado
  }

  return element; // Caso esteja autenticado, exibe o componente da rota
};

export default PrivateRoute;
