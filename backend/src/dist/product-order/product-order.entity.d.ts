import { Order } from '../order/order.entity';
import { MenuItem } from '../menuItem/menuItem.entity';
export declare class ProductOrder {
    id: number;
    quantity: number;
    menuItem: MenuItem;
    order: Order;
}
