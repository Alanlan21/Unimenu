import { PaymentMethodService } from '../service/payment-method.service';
import { PaymentMethod } from '../entity/payment-method.entity';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    findAll(): Promise<PaymentMethod[]>;
}
