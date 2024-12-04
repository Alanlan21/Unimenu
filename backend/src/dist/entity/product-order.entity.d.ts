import { Order } from './order.entity';
import { MenuItem } from './menuItem.entity';
export declare class ProductOrder {
    id: number;
    quantity: number;
    menuItemId: number;
    orderId: number;
    menuItem: MenuItem;
    order: Order;
}
