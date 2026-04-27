import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";

export function meta() {
  return [
    { title: "Principal" },
    { name: "description", content: "Página Principal" },
  ];
}

interface UserData {
  nome: string;
  sobrenome: string;
  dataNascimento: string;
}

export default function Principal() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const doc = await db.collection("users").doc(user.uid).get();
        if (doc.exists) {
          setUserData(doc.data() as UserData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-lg animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
            Bem-vindo!
          </h1>
          {userData && (
            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-slate-400 mb-1">Nome</p>
                <p className="text-lg font-semibold text-white" data-testid="user-nome">
                  {userData.nome}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-slate-400 mb-1">Sobrenome</p>
                <p className="text-lg font-semibold text-white" data-testid="user-sobrenome">
                  {userData.sobrenome}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-slate-400 mb-1">Data de Nascimento</p>
                <p className="text-lg font-semibold text-white" data-testid="user-data">
                  {userData.dataNascimento}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full py-3.5 px-4 mt-8 rounded-xl text-sm font-bold text-white bg-red-600/80 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
