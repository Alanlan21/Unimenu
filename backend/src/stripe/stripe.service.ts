// src/services/stripe.service.ts
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
            client_secret: paymentIntent.client_secret, // Retorne o client_secret
        };
    }
}
