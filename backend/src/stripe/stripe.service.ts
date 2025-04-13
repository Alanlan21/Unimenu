import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        const secretKey = 'sk_test_51Q5UHjJvaS5rJye8xIac6JL2nGPKabVck3E3MSUS0NzM9VAcALxNgDNilvt7vlYYI51vXe04oP0PMusCMGdJzTwA00UM9QR7KT';
        if (!secretKey) {
            throw new Error('A chave secreta do Stripe não está definida.');
        }

        this.stripe = new Stripe(secretKey, {
            apiVersion: '2025-02-24.acacia',
        });
    }

    async createPaymentIntent(amount: number, currency: string) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency,
        });
        return {
            client_secret: paymentIntent.client_secret,
        };
    }

    async createCheckoutSession(
        items: { name: string; amount: number; quantity: number }[],
        orderId: number,
        successUrl: string,
        cancelUrl: string,
      ) {
        try {
          for (const item of items) {
            if (!item.name || typeof item.name !== 'string') {
              throw new Error('Nome do item é obrigatório e deve ser uma string.');
            }
            if (!item.amount || item.amount <= 0) {
              throw new Error(`Valor do item "${item.name}" é inválido. Deve ser maior que 0.`);
            }
            if (!item.quantity || item.quantity <= 0) {
              throw new Error(`Quantidade do item "${item.name}" é inválida. Deve ser maior que 0.`);
            }
          }
      
          console.log('Criando Checkout Session com URLs:', { successUrl, cancelUrl });
      
          const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
              price_data: {
                currency: 'brl',
                product_data: {
                  name: item.name,
                },
                unit_amount: item.amount,
              },
              quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
            cancel_url: `${cancelUrl}?order_id=${orderId}`,
            metadata: {
              order_id: orderId.toString(),
            },
          });
      
          console.log('Checkout Session criada:', {
            sessionId: session.id,
            success_url: session.success_url,
            cancel_url: session.cancel_url,
            url: session.url,
          });
      
          return {
            url: session.url,
            sessionId: session.id,
          };
        } catch (error) {
          console.error('Erro ao criar Checkout Session no Stripe:', error.response?.data || error.message);
          throw error;
        }
      }
    }
