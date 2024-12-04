import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';
import { CreatePaymentDto } from '../dto/payment.dto';
import { Order } from '../entity/order.entity';
import { PaymentMethod } from '../entity/payment-method.entity';
export declare class PaymentService {
    private paymentRepository;
    private orderRepository;
    private paymentMethodRepository;
    constructor(paymentRepository: Repository<Payment>, orderRepository: Repository<Order>, paymentMethodRepository: Repository<PaymentMethod>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
}
