import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    findAll(): Promise<PaymentMethod[]>;
}
