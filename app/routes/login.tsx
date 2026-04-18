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
    <div className="flex min-h-screen">
      {/* Video Side - 2/3 width */}
      <div className="hidden lg:block lg:w-2/3 relative overflow-hidden">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Form Side - 1/3 width */}
      <div className="w-full lg:w-1/3 bg-white flex flex-col justify-center px-8 sm:px-12 xl:px-16 shadow-2xl z-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 cursor-pointer">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5 cursor-pointer">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="Digite sua senha"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 mt-2 rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Acessar
            </button>
          </form>
          {message && (
            <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label
                className={`inline-block text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm border ${
                  message === "Acessado com sucesso!"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {message}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
