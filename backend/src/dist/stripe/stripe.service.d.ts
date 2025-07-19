import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(amount: number, currency: string): Promise<{
        client_secret: string;
    }>;
    createCheckoutSession(items: {
        name: string;
        amount: number;
        quantity: number;
    }[], orderId: number): Promise<{
        url: string;
        sessionId: string;
    }>;
}
