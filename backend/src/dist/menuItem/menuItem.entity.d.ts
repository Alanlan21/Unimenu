import { ProductOrder } from '../product-order/product-order.entity';
import { Store } from '../store/store.entity';
export declare class MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    store: Store;
    productOrders: ProductOrder[];
}
