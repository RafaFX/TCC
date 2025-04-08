import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../auth/authContext"; // Importe o hook de autenticação
import '../styles/login.css';  // Importe o arquivo CSS aqui

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Acesso à função de login do contexto

  const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "admin", password: "admin123" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      login(); // Marca o usuário como autenticado
      navigate("/form"); // Redireciona para o formulário
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
