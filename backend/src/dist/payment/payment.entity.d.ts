import { Order } from '../order/order.entity';
import { PaymentMethod } from '../payment-method/payment-method.entity';
export declare class Payment {
    id: number;
    value: number;
    order: Order;
    paymentMethod: PaymentMethod;
}
