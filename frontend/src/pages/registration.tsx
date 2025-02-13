import React, { useState } from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  Calendar,
  UserCircle,
} from "lucide-react";

export default function Register() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    phone: "",
    birthDate: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manipula as mudanças nos campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Processa o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar cadastro");
      }

      window.location.href = "/login";
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao realizar cadastro"
      );
    } finally {
      setLoading(false);
    }
  };

  // Renderiza o componente de registro
  return (
    <div className="h-full bg-[#FFF5E6] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Login */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="flex justify-center">
            <img
              src="/unimenu_logo.png"
              alt="Unimenu Logo"
              className="w-32 mb-8"
            />
          </div>
          <h2 className="text-3xl font-bold text-[#FF6B00] text-center mb-6">
            Já tem conta?
            <br />
            Faça Login!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Entre com sua conta para aproveitar todos os recursos.
          </p>
          <button
          onClick={() => (window.location.href = "/login")} 
          className="w-full mb-6 px-6 py-3 border-2 border-[#FF6B00] text-[#FF6B00] rounded-full hover:bg-[#FF6B00] hover:text-white transition-colors">
            Fazer Login
          </button>
          <div className="text-center">
            <p className="text-gray-400 mb-4">ou entre com</p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-[#4285F4] text-white px-6 py-3 rounded-full hover:bg-[#3367D6] transition-colors">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sua conta Google
              </button>
              {/* <button className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                <Apple className="w-5 h-5" />
                Sua conta Apple
              </button> */}
            </div>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="md:w-1/2 bg-[#FF6B00] p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Faça seu Cadastro
          </h2>
          <p className="text-white mb-6">Só basta alguns minutinhos!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome completo *"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Digite seu CPF *"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                placeholder="Confirme o email *"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(xx) 9xxxx-xxxx"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha *"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme a senha *"
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-white text-gray-800 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              >
                <option value="">Gênero *</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#FF6B00] py-3 rounded-full font-bold hover:bg-gray-100 transition-colors mt-6"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-white text-sm text-center mt-6">
            Ao clicar em Cadastrar, você concorda com nossos{" "}
            <a href="/terms" className="underline">
              Termos
            </a>
            ,{" "}
            <a href="/privacy" className="underline">
              Política de Privacidade
            </a>{" "}
            e{" "}
            <a href="/cookies" className="underline">
              Política de Cookies
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );

}
