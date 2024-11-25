import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('pagamento') // Certifique-se que é 'pagamento'
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @Post()
    async createPayment(@Body() body: { amount: number, currency: string }) {
        const { amount, currency } = body;
        const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
        return paymentIntent; // Retorne o pagamento para o frontend
    }
}
