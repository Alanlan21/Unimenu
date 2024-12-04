import { Order } from './order.entity';
import { PaymentMethod } from './payment-method.entity';
export declare class Payment {
    id: number;
    value: number;
    order: Order;
    paymentMethod: PaymentMethod;
}
