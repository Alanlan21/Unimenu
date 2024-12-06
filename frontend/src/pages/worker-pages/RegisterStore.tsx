import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OwnerFormData {
  owner_nome: string;
  owner_email: string;
  owner_cpf: string;
  owner_rg: string;
  owner_orgao_emissor_rg: string;
  owner_dados_bancarios_banco: string;
  owner_dados_bancarios_agencia: string;
  owner_dados_bancarios_conta: string;
  owner_dados_bancarios_digito: string;
}

interface StoreFormData {
  name: string;
  CNPJ: string;
  email: string;
  phone: string;
  senha: string;
  horario_funcionamento: string;
}

export function RegisterStorePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'owner' | 'store'>('owner');
  const [ownerData, setOwnerData] = useState<OwnerFormData>({
    owner_nome: '',
    owner_email: '',
    owner_cpf: '',
    owner_rg: '',
    owner_orgao_emissor_rg: '',
    owner_dados_bancarios_banco: '',
    owner_dados_bancarios_agencia: '',
    owner_dados_bancarios_conta: '',
    owner_dados_bancarios_digito: ''
  });
  
  const [storeData, setStoreData] = useState<StoreFormData>({
    name: '',
    CNPJ: '',
    email: '',
    phone: '',
    senha: '',
    horario_funcionamento: ''
  });

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('store');
  };

  const handleStoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const requestData = {
      // Dados do proprietário renomeados para o padrão do back-end
      owner_nome: ownerData.owner_nome,
      owner_email: ownerData.owner_email,
      owner_cpf: ownerData.owner_cpf,
      owner_rg: ownerData.owner_rg,
      owner_orgao_emissor_rg: ownerData.owner_orgao_emissor_rg,
      owner_dados_bancarios_banco: ownerData.owner_dados_bancarios_banco,
      owner_dados_bancarios_agencia: ownerData.owner_dados_bancarios_agencia,
      owner_dados_bancarios_conta: ownerData.owner_dados_bancarios_conta,
      owner_dados_bancarios_digito: ownerData.owner_dados_bancarios_digito,
      // Dados da loja
      name: storeData.name,
      CNPJ: storeData.CNPJ,
      email: storeData.email,
      phone: storeData.phone,
      senha: storeData.senha,
      horario_funcionamento: storeData.horario_funcionamento,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/registerStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Envia os dados combinados
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Erro ao registrar estabelecimento.");
      }
  
      alert("Estabelecimento registrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao registrar o estabelecimento."
      );
    }
  };
  


  const inputClassName = "w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-primary bg-white text-gray-700 placeholder-gray-400";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1";

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#FF4500] text-center mb-6">
            {currentStep === 'owner' ? 'Registro do Proprietário' : 'Registro do Estabelecimento'}
          </h2>

          {currentStep === 'owner' ? (
            <form onSubmit={handleOwnerSubmit} className="space-y-4">
              <div>
                <label className={labelClassName}>Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Digite seu nome completo"
                  className={inputClassName}
                  value={ownerData.owner_nome}
                  onChange={(e) => setOwnerData({...ownerData, owner_nome: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  className={inputClassName}
                  value={ownerData.owner_email}
                  onChange={(e) => setOwnerData({...ownerData, owner_email: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>CPF</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  className={inputClassName}
                  value={ownerData.owner_cpf}
                  onChange={(e) => setOwnerData({...ownerData, owner_cpf: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>RG</label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000-0"
                  className={inputClassName}
                  value={ownerData.owner_rg}
                  onChange={(e) => setOwnerData({...ownerData, owner_rg: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>Órgão Emissor RG</label>
                <input
                  type="text"
                  required
                  placeholder="SSP"
                  className={inputClassName}
                  value={ownerData.owner_orgao_emissor_rg}
                  onChange={(e) => setOwnerData({...ownerData, owner_orgao_emissor_rg: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-[#FF4500] mb-4">Dados Bancários</h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>Banco</label>
                    <input
                      type="text"
                      required
                      className={inputClassName}
                      value={ownerData.owner_dados_bancarios_banco}
                      onChange={(e) => setOwnerData({...ownerData, owner_dados_bancarios_banco: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Agência</label>
                    <input
                      type="text"
                      required
                      className={inputClassName}
                      value={ownerData.owner_dados_bancarios_agencia}
                      onChange={(e) => setOwnerData({...ownerData, owner_dados_bancarios_agencia: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Conta</label>
                    <input
                      type="text"
                      required
                      className={inputClassName}
                      value={ownerData.owner_dados_bancarios_conta}
                      onChange={(e) => setOwnerData({...ownerData, owner_dados_bancarios_conta: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Dígito</label>
                    <input
                      type="text"
                      required
                      className={inputClassName}
                      value={ownerData.owner_dados_bancarios_digito}
                      onChange={(e) => setOwnerData({...ownerData, owner_dados_bancarios_digito: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF4500] text-white py-3 rounded-md hover:bg-[#FF5722] transition-colors mt-6"
              >
                Próximo
              </button>
            </form>
          ) : (
            <form onSubmit={handleStoreSubmit} className="space-y-4">
              <div>
                <label className={labelClassName}>Nome do Estabelecimento</label>
                <input
                  type="text"
                  required
                  placeholder="Nome da sua loja"
                  className={inputClassName}
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>CNPJ</label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000/0000-00"
                  className={inputClassName}
                  value={storeData.CNPJ}
                  onChange={(e) => setStoreData({...storeData, CNPJ: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>Email Comercial</label>
                <input
                  type="email"
                  required
                  placeholder="comercial@exemplo.com"
                  className={inputClassName}
                  value={storeData.email}
                  onChange={(e) => setStoreData({...storeData, email: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>Telefone</label>
                <input
                  type="tel"
                  required
                  placeholder="(00) 00000-0000"
                  className={inputClassName}
                  value={storeData.phone}
                  onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>Horário de Funcionamento</label>
                <input
                  type="text"
                  required
                  placeholder="09:00 - 18:00"
                  className={inputClassName}
                  value={storeData.horario_funcionamento}
                  onChange={(e) => setStoreData({...storeData, horario_funcionamento: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClassName}>Senha</label>
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  className={inputClassName}
                  value={storeData.senha}
                  onChange={(e) => setStoreData({...storeData, senha: e.target.value})}
                />
              </div>

              <div className="flex flex-col space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#FF4500] text-white py-3 rounded-md hover:bg-[#FF5722] transition-colors"
                >
                  Cadastrar
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('owner')}
                  className="text-[#FF4500] hover:text-[#FF5722] transition-colors text-center"
                >
                  ← Voltar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}