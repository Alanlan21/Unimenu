import { PaymentService } from '../service/payment.service';
import { CreatePaymentDto } from '../dto/payment.dto';
import { Payment } from '../entity/payment.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
}
