import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    addItemToOrder(idCliente: number, body: {
        menuItemId: number;
        quantidade: number;
    }): Promise<Order>;
    create(createOrderDto: CreateOrderDto & {
        idCliente: number;
    }): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateData: Partial<Order>): Promise<Order>;
    remove(id: number): Promise<void>;
}
