import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(amount: number, currency: string): Promise<{
        client_secret: string;
    }>;
}
