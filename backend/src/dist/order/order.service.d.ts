import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from '../menuItem/menuItem.entity';
import { ProductOrder } from '../product-order/product-order.entity';
export declare class OrderService {
    private orderRepository;
    private menuItemRepository;
    private productOrderRepository;
    constructor(orderRepository: Repository<Order>, menuItemRepository: Repository<MenuItem>, productOrderRepository: Repository<ProductOrder>);
    getCurrentOrder(idUser: number): Promise<Order | null>;
    createOrder(idUser: number): Promise<Order>;
    addItemToOrder(idUser: number, menuItemId: number, quantidade: number): Promise<Order>;
    getOrderWithItems(orderId: number): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateData: Partial<Order>): Promise<Order>;
    remove(id: number): Promise<void>;
}
