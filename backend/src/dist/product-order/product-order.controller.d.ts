import { ProductOrderService } from './product-order.service';
import { ProductOrder } from './product-order.entity';
import { CreateProductOrderDto } from './dto/product-order.dto';
export declare class ProductOrderController {
    private readonly productOrderService;
    constructor(productOrderService: ProductOrderService);
    create(createProductOrderDto: CreateProductOrderDto): Promise<ProductOrder>;
    findAll(): Promise<ProductOrder[]>;
    findOne(id: number): Promise<ProductOrder>;
    update(id: number, updateData: Partial<ProductOrder>): Promise<ProductOrder>;
    remove(id: number): Promise<void>;
}
