import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock Firebase
const mockSignIn = vi.fn();
vi.mock("../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: (...args: any[]) => mockSignIn(...args),
  },
  db: {},
}));

import Login from "../routes/login";

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o formulário com campos de email e senha", () => {
    render(<Login />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Acessar" })).toBeInTheDocument();
  });

  it("deve renderizar o título 'Login'", () => {
    render(<Login />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("deve navegar para /principal com credenciais corretas", async () => {
    mockSignIn.mockResolvedValueOnce({});
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("E-mail"), "test@test.com");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Acessar" }));

    expect(mockSignIn).toHaveBeenCalledWith("test@test.com", "123456");
    expect(mockNavigate).toHaveBeenCalledWith("/principal");
  });

  it("deve exibir mensagem de erro com credenciais incorretas", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("auth/user-not-found"));
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("E-mail"), "wrong@email.com");
    await user.type(screen.getByLabelText("Senha"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: "Acessar" }));

    expect(
      screen.getByText("Usuário não está cadastrado")
    ).toBeInTheDocument();
  });

  it("não deve exibir mensagem antes do submit", () => {
    render(<Login />);

    expect(
      screen.queryByText("Usuário não está cadastrado")
    ).not.toBeInTheDocument();
  });

  it("deve ter link para a página de cadastro", () => {
    render(<Login />);

    const link = screen.getByRole("link", { name: "Cadastre-se" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/cadastro");
  });
});
