import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/payment.dto';
export declare class PaymentService {
    private paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
}
