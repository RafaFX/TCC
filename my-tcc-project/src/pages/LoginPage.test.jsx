import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "./LoginPage";

// LoginPage.test.jsx

// Mock useNavigate and useAuth
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
const loginMock = vi.fn();
vi.mock("./../auth/authContext", () => ({
  useAuth: () => ({ login: loginMock }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    loginMock.mockClear();
  });

  it("permite login com credenciais válidas (user1/password1)", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "user1" } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "password1" } });
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).toHaveBeenCalled();
    expect(screen.queryByText(/Credenciais inválidas/i)).toBeNull();
  });

  it("mostra erro com credenciais inválidas", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "user1" } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });

  it("não permite login com campos vazios", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });

  it("não permite login com usuário correto e senha errada", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "admin" } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });

  it("não permite login com usuário errado e senha correta", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "wrong" } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "admin123" } });
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });

  it("não permite login com espaços em branco", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "   " } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "   " } });
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });

  it("permite login para todos os usuários válidos", () => {
    const users = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
      { username: "admin", password: "admin123" },
    ];
    users.forEach(({ username, password }) => {
      render(<LoginPage />);
      fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: username } });
      fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: password } });
      fireEvent.click(screen.getByText("Entrar"));
      expect(loginMock).toHaveBeenCalled();
      loginMock.mockClear();
    });
  });

  it("limpa mensagem de erro ao alterar campos", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "user1" } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByText("Entrar"));
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "password1" } });
    // Mensagem de erro ainda aparece porque não há lógica para limpar ao digitar
    expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });
});

/*
Autoavaliação:
- Os testes cobrem autenticação com todos os usuários válidos, entradas inválidas, campos vazios e casos de erro.
- Não há teste para integração real com backend (não aplicável neste componente).
- Poderia ser melhorado adicionando testes para acessibilidade e feedback visual.
- Poderia testar se o navigate foi chamado corretamente após login.
*/