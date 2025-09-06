/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../components/Header";
import { User, Store, Clock, Phone, Mail } from "lucide-react";

export function StoreAccountPage() {
  const [owner, setOwner] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para os campos editáveis
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeHours, setStoreHours] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeEmail, setStoreEmail] = useState("");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const storeId = localStorage.getItem("storeId");
        const response = await Axios.get(
          `http://192.168.2.100:3000/owners/account/${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOwner(response.data.ownerName);
        setOwner(response.data.ownerEmail);
        setStore(response.data);
        setOwnerName(response.data.ownerName);
        setOwnerEmail(response.data.ownerEmail);
        setStoreName(response.data.storeName);
        setStoreHours(response.data.storeHours);
        setStorePhone(response.data.storePhone);
        setStoreEmail(response.data.storeEmail);
      } catch (error) {
        console.error("Erro ao buscar detalhes da conta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Função para salvar as alterações no backend
  const handleSaveChanges = async () => {
    try {
      const storeId = localStorage.getItem("storeId");
      await Axios.patch(
        `http://192.168.2.100:3000/owners/account/${storeId}`,
        {
          ownerName: ownerName,
          ownerEmail: ownerEmail,
          storeName: storeName,
          storeHours: storeHours,
          storePhone: storePhone,
          storeEmail: storeEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-primary-light/10">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-primary-light/20 rounded-lg shadow-card p-6">
          <h1 className="text-2xl font-bold text-primary-dark mb-6">
            Minha Conta
          </h1>

          <div className="space-y-6">
            {/* Informações Pessoais */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-primary-dark flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Informações Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-dark/80">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-primary/20 bg-primary-light/20
                             shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-dark/80">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-primary/20 bg-primary-light/20
                             shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    value={ownerEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </section>

            {/* Informações do Estabelecimento */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-primary-dark flex items-center">
                <Store className="w-5 h-5 mr-2 text-primary" />
                Informações do Estabelecimento
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-dark/80">
                    Nome do Estabelecimento
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-primary/20 bg-primary-light/20
                             shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-dark/80 items-center">
                      <Clock className="w-4 h-4 mr-1 text-primary" />
                      Horário de Funcionamento
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-primary/20 bg-primary-light/20
                               shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                      value={storeHours}
                      onChange={(e) => setStoreHours(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-dark/80 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-primary" />
                      Telefone
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-primary/20 bg-primary-light/20
                               shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                      value={storePhone}
                      onChange={(e) => setStorePhone(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-dark/80 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-primary" />
                    Email Comercial
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-primary/20 bg-primary-light/20
                             shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </section>

            <div className="pt-4">
              {isEditing ? (
                <button
                  onClick={handleSaveChanges}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  Salvar Alterações
                </button>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  Editar Informações
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
