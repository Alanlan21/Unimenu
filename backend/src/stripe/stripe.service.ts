import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { DotenvConfigOptions } from 'dotenv';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        const secretKey = process.env.STRIPE_SECRET_KEY || this.configService.get<string>('STRIPE_SECRET_KEY');
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
    
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';
    
        const successUrl = `${frontendUrl}/redirect/success`;
        const cancelUrl = `${frontendUrl}/redirect/cancel`;
    
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
