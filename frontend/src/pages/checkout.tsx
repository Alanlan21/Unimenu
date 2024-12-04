// src/pages/Checkout.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '../components/checkout/PaymentForm';
import { SuccessModal } from '../components/checkout/SuccessModal';
import { StripeState } from '../types/stripe';
import { useCart } from '../hooks/useCart';
import Header from '../components/Header';
import { orderApi } from '../services/orderApi';

const stripePromise = loadStripe('pk_test_51Q5UHjJvaS5rJye8xiZaLT1WvrfLeEy9IWeSoVuLC1pHSbQvIlN8BpR7bRr9twD5HQ0c1TcWCcC3cTixSMJTsDst00t9tO7X0E');

export default function Checkout() {
  const [total, setTotal] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const totalFromUrl = params.get('total');
    if (totalFromUrl) {
      setTotal(parseFloat(totalFromUrl));
    }
  }, [location]);

  const [stripeState, setStripeState] = useState<StripeState>({
    stripe: null,
    elements: null,
    cardElement: null,
  });
  const [error, setError] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      if (stripeInstance) {
        const elements = stripeInstance.elements();
        const card = elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              fontFamily: '"Inter", sans-serif',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
            },
          },
        });
        card.mount('#card-element');
        setStripeState({
          stripe: stripeInstance,
          elements,
          cardElement: card,
        });
      }
    };

    initializeStripe();

    return () => {
      if (stripeState.cardElement) {
        stripeState.cardElement.unmount();
      }
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const { stripe, cardElement } = stripeState;
    if (!stripe || !cardElement || isProcessing) return;
  
    setIsProcessing(true);
    setError('');
  
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('Usuário não autenticado');
      }
      const user = JSON.parse(userStr);
  
      // Get cart items from useCart
      const cartItems = useCart.getState().items;
      if (!cartItems.length) {
        throw new Error('Carrinho vazio');
      }
  
      // Create order with cart items
      const order = await orderApi.createOrder(user.id, cartItems);
      if (!order?.id) {
        throw new Error('Erro ao criar pedido');
      }
  
      // Create payment intent
      const amountInCents = Math.round(total * 100);
      const paymentIntent = await orderApi.createPaymentIntent(amountInCents, order.id);
  
      // Confirm payment with Stripe
      const { error: paymentError } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );
  
      if (paymentError) {
        throw new Error(paymentError.message);
      }
  
      // Update order status and cleanup
      await orderApi.updateOrderStatus(order.id, 'paid');
      clearCart();
      setIsSuccessModalOpen(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Brand */}
            <div className="md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-8 flex flex-col justify-center items-center text-white">
              <img
                src="/unimenu_logo.png"
                alt="Unimenu Logo"
                className="w-32 mb-8"
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-lg mb-2">Total a Pagar</p>
                  <p className="text-3xl font-bold">R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Right side - Payment Form */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Finalizar Compra</h1>
              <PaymentForm
                cardElement={stripeState.cardElement}
                isProcessing={isProcessing}
                error={error}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
}
