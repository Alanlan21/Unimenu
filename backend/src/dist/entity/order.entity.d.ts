import { User } from './user.entity';
import { Payment } from './payment.entity';
import { ProductOrder } from './product-order.entity';
export declare class Order {
    id: number;
    order_number: number;
    order_date: Date;
    status: string;
    user: User;
    payments: Payment[];
    productOrders: ProductOrder[];
}
