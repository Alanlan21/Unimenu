import { PaymentMethod } from '../entity/payment-method.entity';
import { Repository } from 'typeorm';
export declare class PaymentMethodService {
    private paymentMethodRepository;
    constructor(paymentMethodRepository: Repository<PaymentMethod>);
    findAll(): Promise<PaymentMethod[]>;
}
