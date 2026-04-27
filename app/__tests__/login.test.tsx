import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Login from "../routes/login";

// Mock do arquivo de vídeo
vi.mock("../routes/video-runway.mp4", () => ({
  default: "mocked-video.mp4",
}));

// Mock do módulo de tipos do react-router
vi.mock("../routes/+types/login", () => ({}));

describe("Login Component", () => {
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

  it("deve exibir mensagem de sucesso com credenciais corretas", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("E-mail"), "eduardo.lino@pucpr.br");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Acessar" }));

    expect(screen.getByText("Acessado com sucesso!")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro com credenciais incorretas", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("E-mail"), "wrong@email.com");
    await user.type(screen.getByLabelText("Senha"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: "Acessar" }));

    expect(screen.getByText("Usuário ou senha incorretos!")).toBeInTheDocument();
  });

  it("deve exibir erro quando apenas o email está correto", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("E-mail"), "eduardo.lino@pucpr.br");
    await user.type(screen.getByLabelText("Senha"), "senhaerrada");
    await user.click(screen.getByRole("button", { name: "Acessar" }));

    expect(screen.getByText("Usuário ou senha incorretos!")).toBeInTheDocument();
  });

  it("deve exibir erro quando apenas a senha está correta", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("E-mail"), "outro@email.com");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Acessar" }));

    expect(screen.getByText("Usuário ou senha incorretos!")).toBeInTheDocument();
  });

  it("não deve exibir mensagem antes do submit", () => {
    render(<Login />);

    expect(screen.queryByText("Acessado com sucesso!")).not.toBeInTheDocument();
    expect(screen.queryByText("Usuário ou senha incorretos!")).not.toBeInTheDocument();
  });

  it("deve atualizar o valor do campo email ao digitar", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText("E-mail");
    await user.type(emailInput, "test@test.com");

    expect(emailInput).toHaveValue("test@test.com");
  });
});
