import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock Firebase
let authCallback: ((user: any) => void) | null = null;
const mockSignOut = vi.fn();
const mockGet = vi.fn();

vi.mock("../firebase", () => ({
  auth: {
    onAuthStateChanged: (cb: (user: any) => void) => {
      authCallback = cb;
      return vi.fn(); // unsubscribe
    },
    signOut: () => mockSignOut(),
  },
  db: {
    collection: () => ({
      doc: () => ({
        get: () => mockGet(),
      }),
    }),
  },
}));

import Principal from "../routes/principal";

describe("Principal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authCallback = null;
  });

  it("deve redirecionar para login quando não autenticado", async () => {
    render(<Principal />);

    // Simula usuário não autenticado
    if (authCallback) authCallback(null);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("deve exibir dados do usuário quando autenticado", async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        nome: "João",
        sobrenome: "Silva",
        dataNascimento: "2000-01-15",
      }),
    });

    render(<Principal />);

    // Simula usuário autenticado
    if (authCallback) authCallback({ uid: "test-uid-123" });

    await waitFor(() => {
      expect(screen.getByTestId("user-nome")).toHaveTextContent("João");
      expect(screen.getByTestId("user-sobrenome")).toHaveTextContent("Silva");
      expect(screen.getByTestId("user-data")).toHaveTextContent("2000-01-15");
    });
  });

  it("deve exibir 'Carregando...' enquanto carrega", () => {
    render(<Principal />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve fazer logout ao clicar no botão 'Sair'", async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        nome: "João",
        sobrenome: "Silva",
        dataNascimento: "2000-01-15",
      }),
    });
    mockSignOut.mockResolvedValueOnce(undefined);

    const user = userEvent.setup();
    render(<Principal />);

    if (authCallback) authCallback({ uid: "test-uid-123" });

    await waitFor(() => {
      expect(screen.getByTestId("user-nome")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Sair" }));

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
