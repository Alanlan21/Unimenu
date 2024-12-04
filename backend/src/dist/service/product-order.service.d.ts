import { Repository } from 'typeorm';
import { ProductOrder } from '../entity/product-order.entity';
import { CreateProductOrderDto } from '../dto/product-order.dto';
export declare class ProductOrderService {
    private productOrderRepository;
    constructor(productOrderRepository: Repository<ProductOrder>);
    create(createProductOrderDto: CreateProductOrderDto): Promise<ProductOrder>;
    findAll(): Promise<ProductOrder[]>;
    findOne(id: number): Promise<ProductOrder>;
    update(id: number, updateData: Partial<ProductOrder>): Promise<ProductOrder>;
    remove(id: number): Promise<void>;
}
