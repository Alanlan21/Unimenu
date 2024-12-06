import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginStorePage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/loginStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          senha: credentials.password,
        }),
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao fazer login.");
      }

      localStorage.setItem("storeToken", data.accessToken);
      localStorage.setItem("storeId", data.storeId);

      navigate("/home");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-8 bg-gray-50 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Login
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="seuemail@exemplo.com"
              required
              className="w-full px-3 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
              className="w-full px-3 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <button
            type="submit"
            id="submit"
            className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Autenticando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a
              href="/register"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
