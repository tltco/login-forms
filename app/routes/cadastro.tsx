import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { auth, db } from "../firebase";

export function meta() {
  return [
    { title: "Cadastro" },
    { name: "description", content: "Página de Cadastro" },
  ];
}

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user!.uid;

      await db.collection("users").doc(uid).set({
        nome,
        sobrenome,
        dataNascimento,
      });

      setIsSuccess(true);
      setMessage("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setIsSuccess(false);
      setMessage("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
            Cadastro
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sobrenome"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Sobrenome
              </label>
              <input
                type="text"
                id="sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                className="block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="Digite seu sobrenome"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dataNascimento"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 mt-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Cadastrar
            </button>
          </form>
          {message && (
            <div className="mt-6 flex justify-center">
              <span
                className={`inline-block text-sm font-semibold px-5 py-2.5 rounded-full border ${
                  isSuccess
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {message}
              </span>
            </div>
          )}
          <p className="mt-6 text-center text-sm text-slate-400">
            Já tem conta?{" "}
            <Link
              to="/"
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
