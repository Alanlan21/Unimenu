import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/order.dto';
import { Order } from '../entity/order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    addItemToOrder(idCliente: number, body: {
        menuItemId: number;
        quantidade: number;
    }): Promise<Order>;
    addProductOrders(orderId: number, data: {
        items: Array<{
            menuItemId: number;
            quantity: number;
        }>;
    }): Promise<import("../entity/product-order.entity").ProductOrder[]>;
    create(createOrderDto: CreateOrderDto & {
        idCliente: number;
    }): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    findByUser(userId: number): Promise<Order[]>;
    update(id: number, updateData: Partial<Order>): Promise<Order>;
    remove(id: number): Promise<void>;
}
