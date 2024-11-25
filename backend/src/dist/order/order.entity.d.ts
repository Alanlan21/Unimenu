import { User } from '../user/user.entity';
import { Payment } from '../payment/payment.entity';
import { ProductOrder } from '../product-order/product-order.entity';
export declare class Order {
    id: number;
    order_number: number;
    order_date: Date;
    status: string;
    user: User;
    payments: Payment[];
    productOrders: ProductOrder[];
}
