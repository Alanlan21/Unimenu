import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { MenuItem } from '../entity/menuItem.entity';
import { ProductOrder } from '../entity/product-order.entity';
import { CreateOrderDto } from '../dto/order.dto';
import { User } from '../entity/user.entity';
export declare class OrderService {
    private orderRepository;
    private menuItemRepository;
    private productOrderRepository;
    private userRepository;
    findByUser(userId: number): Promise<Order[]>;
    constructor(orderRepository: Repository<Order>, menuItemRepository: Repository<MenuItem>, productOrderRepository: Repository<ProductOrder>, userRepository: Repository<User>);
    addProductOrders(orderId: number, items: Array<{
        menuItemId: number;
        quantity: number;
    }>): Promise<ProductOrder[]>;
    getCurrentOrder(idUser: number): Promise<Order | null>;
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    addItemToOrder(idUser: number, menuItemId: number, quantidade: number): Promise<Order>;
    getOrderWithItems(orderId: number): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateData: Partial<Order>): Promise<Order>;
    remove(id: number): Promise<void>;
}
