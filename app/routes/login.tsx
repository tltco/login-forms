import video from "./video-runway.mp4";
import type { Route } from "./+types/login";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Into Wholesome App" },
    { name: "description", content: "Welcome to Wholesome App!" },
  ];
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
  };

  return;
  <>
    <div>
      <video src={video} autoPlay muted loop playsInline />
    </div>
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu usuário"
          id="username"
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          id="password"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </>;
}
