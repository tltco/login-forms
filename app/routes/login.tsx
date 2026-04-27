import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { auth } from "../firebase";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Página de Login" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/principal");
    } catch {
      setMessage("Usuário não está cadastrado");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 mt-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Acessar
            </button>
          </form>
          {message && (
            <div className="mt-6 flex justify-center">
              <span className="inline-block text-sm font-semibold px-5 py-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                {message}
              </span>
            </div>
          )}
          <p className="mt-6 text-center text-sm text-slate-400">
            Não tem conta?{" "}
            <Link
              to="/cadastro"
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
