import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createPayment(body: {
        amount: number;
        currency: string;
    }): Promise<{
        client_secret: string;
    }>;
}
