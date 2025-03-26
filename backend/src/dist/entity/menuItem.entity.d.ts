import { ProductOrder } from './product-order.entity';
import { Store } from './store.entity';
export declare class MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    category: string;
    store: Store;
    productOrders: ProductOrder[];
}
