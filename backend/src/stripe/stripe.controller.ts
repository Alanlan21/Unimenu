import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('pagamento')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    // Endpoint usado pela versão web
    @Post()
    async createPayment(
        @Body() body: { amount: number; currency: string }
    ) {
        const { amount, currency } = body;
        const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
        return paymentIntent; // Retorna { client_secret }
    }

    // Novo endpoint pra versão mobile
    @Post('checkout')
    async createCheckoutSession(
        @Body() body: {
            items: { name: string; amount: number; quantity: number }[];
            orderId: number;
            successUrl: string;
            cancelUrl: string;
        }
    ) {
        const { items, orderId, successUrl, cancelUrl } = body;
        const session = await this.stripeService.createCheckoutSession(
            items,
            orderId,
        );
        return session; // Retorna { url, sessionId }
    }
}
