import video from "./video-runway.mp4";
import type { Route } from "./+types/login";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Página de Login" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "eduardo.lino@pucpr.br" && password === "123456") {
      setMessage("Acessado com sucesso!");
    } else {
      setMessage("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      />
      <div className="absolute inset-0 bg-black/60 z-10 transition-opacity"></div>
      
      <div className="relative z-20 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1.5 cursor-pointer">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1.5 cursor-pointer">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 mt-2 rounded-xl shadow-lg text-sm font-bold text-gray-900 bg-white hover:bg-gray-100 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all duration-200 active:scale-95"
          >
            Acessar
          </button>
        </form>
        {message && (
          <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label
              className={`inline-block text-sm font-semibold px-5 py-2.5 rounded-full backdrop-blur-md shadow-sm ${
                message === "Acessado com sucesso!"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}
            >
              {message}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
