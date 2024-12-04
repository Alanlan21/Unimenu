import React from 'react';
import { CreditCard } from 'lucide-react';
import { StripeCardElement } from '@stripe/stripe-js';

interface PaymentFormProps {
  cardElement: StripeCardElement | null;
  isProcessing: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function PaymentForm({ isProcessing, error, onSubmit }: Readonly<PaymentFormProps>) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome do Titular
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
          placeholder="Nome como está no cartão"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dados do Cartão
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <div
            id="card-element"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-4 pl-12 bg-white focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
          </span>
        ) : (
          'Finalizar Pagamento'
        )}
      </button>
    </form>
  );
}
