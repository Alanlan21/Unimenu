import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  // Estado para armazenar credenciais do usuário
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para lidar com o login do Google
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      // Obtém os dados do usuário do Google
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      // Envia os dados para seu backend
      const response = await fetch(
        "http://192.168.2.100:3000/users/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: tokenResponse.access_token,
            userData: userInfo.data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na autenticação com Google");
      }

      const data = await response.json();
      localStorage.setItem("userToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Google login error:", error);
      setError("Erro ao fazer login com Google");
    }
  };

  // Hook para configurar o login do Google
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError("Erro ao fazer login com Google"),
  });

  // Função para atualizar o estado das credenciais
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para processar o envio do formulário de login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://192.168.2.100:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Erro do backend:", errorData);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      localStorage.setItem("userToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#FFF5E6] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Sign Up */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="flex justify-center">
            <img
              src="/unimenu_logo.png"
              alt="Unimenu Logo"
              className="w-55 mb-63 h11"
            />
          </div>
          <h2 className="text-3xl font-bold text-[#FF6B00] text-center mb-6">
            Bem-vindo(a)
            <br />
            ao UNIMENU!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Novo aqui? Cadastre-se agora mesmo.
          </p>
          <button
            onClick={() => (window.location.href = "/register")}
            className="w-full mb-6 px-6 py-3 border-2 border-[#FF6B00] text-[#FF6B00] rounded-full hover:bg-[#FF6B00] hover:text-white transition-colors"
          >
            Cadastre-se
          </button>
          <div className="text-center">
            <p className="text-gray-400 mb-4">ou cadastre-se com</p>
            <div className="space-y-3">
              <button
                onClick={() => googleLogin()}
                className="w-full flex items-center justify-center gap-2 bg-[#4285F4] text-white px-6 py-3 rounded-full hover:bg-[#3367D6] transition-colors"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sua conta Google
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Login */}
        <div className="md:w-1/2 bg-[#FF6B00] p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8">Faça seu Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Usuário, email, celular, matrícula..."
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Senha"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <div className="text-right">
              <a href="/forgot-password" className="text-white hover:underline">
                Esqueci minha senha
              </a>
            </div>
            <button
              type="submit"
              id="login-button"
              disabled={loading}
              className="w-full bg-white text-[#FF6B00] py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full text-center">
                {error}
              </div>
            )}
          </form>

          <div className="mt-8">
            <div className="text-center text-white mb-4">ou</div>
            <div className="space-y-3">
              <button
                onClick={() => googleLogin()}
                className="w-full flex items-center justify-center gap-2 bg-[#4285F4] text-white px-6 py-3 rounded-full hover:bg-[#3367D6] transition-colors"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Use sua conta do Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-orange-5 text-white px-6 py-3 rounded-full hover:bg-amber-950 transition-colors">
                Login para funcionários
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
