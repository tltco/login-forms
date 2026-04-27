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
const mockCreateUser = vi.fn();
const mockDocSet = vi.fn();
vi.mock("../firebase", () => ({
  auth: {
    createUserWithEmailAndPassword: (...args: any[]) =>
      mockCreateUser(...args),
  },
  db: {
    collection: () => ({
      doc: () => ({
        set: (...args: any[]) => mockDocSet(...args),
      }),
    }),
  },
}));

import Cadastro from "../routes/cadastro";

describe("Cadastro Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar todos os 5 campos e o botão de cadastro", () => {
    render(<Cadastro />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Sobrenome")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de Nascimento")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cadastrar" })
    ).toBeInTheDocument();
  });

  it("deve renderizar o título 'Cadastro'", () => {
    render(<Cadastro />);

    expect(
      screen.getByRole("heading", { name: "Cadastro" })
    ).toBeInTheDocument();
  });

  it("deve cadastrar com sucesso e exibir mensagem", async () => {
    mockCreateUser.mockResolvedValueOnce({
      user: { uid: "test-uid-123" },
    });
    mockDocSet.mockResolvedValueOnce({});

    const user = userEvent.setup();
    render(<Cadastro />);

    await user.type(screen.getByLabelText("E-mail"), "novo@email.com");
    await user.type(screen.getByLabelText("Senha"), "senha123");
    await user.type(screen.getByLabelText("Nome"), "João");
    await user.type(screen.getByLabelText("Sobrenome"), "Silva");
    await user.type(screen.getByLabelText("Data de Nascimento"), "2000-01-15");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(mockCreateUser).toHaveBeenCalledWith("novo@email.com", "senha123");
    expect(mockDocSet).toHaveBeenCalledWith({
      nome: "João",
      sobrenome: "Silva",
      dataNascimento: "2000-01-15",
    });
    expect(
      screen.getByText("Cadastro realizado com sucesso!")
    ).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando o cadastro falha", async () => {
    mockCreateUser.mockRejectedValueOnce(
      new Error("auth/email-already-in-use")
    );

    const user = userEvent.setup();
    render(<Cadastro />);

    await user.type(screen.getByLabelText("E-mail"), "existe@email.com");
    await user.type(screen.getByLabelText("Senha"), "senha123");
    await user.type(screen.getByLabelText("Nome"), "Maria");
    await user.type(screen.getByLabelText("Sobrenome"), "Santos");
    await user.type(screen.getByLabelText("Data de Nascimento"), "1995-06-20");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(
      screen.getByText("Erro ao cadastrar. Tente novamente.")
    ).toBeInTheDocument();
  });

  it("deve ter link para a página de login", () => {
    render(<Cadastro />);

    const link = screen.getByRole("link", { name: "Faça login" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
