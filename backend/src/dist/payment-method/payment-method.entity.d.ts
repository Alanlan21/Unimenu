import { Payment } from '../payment/payment.entity';
export declare class PaymentMethod {
    id: number;
    name: string;
    payments: Payment[];
}
