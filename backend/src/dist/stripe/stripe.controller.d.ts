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
    createCheckoutSession(body: {
        items: {
            name: string;
            amount: number;
            quantity: number;
        }[];
        orderId: number;
        successUrl: string;
        cancelUrl: string;
    }): Promise<{
        url: string;
        sessionId: string;
    }>;
}
