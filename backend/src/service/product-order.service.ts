import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrder } from '../entity/product-order.entity';
import { CreateProductOrderDto } from '../dto/product-order.dto';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
  ) {}

  async create(
    createProductOrderDto: CreateProductOrderDto,
  ): Promise<ProductOrder> {
    const productOrder = new ProductOrder();
    productOrder.quantity = createProductOrderDto.quantity;
    productOrder.menuItemId = createProductOrderDto.menuItemId; // Usando o número diretamente
    productOrder.orderId = createProductOrderDto.orderId; // Usando o número diretamente

    // Log the created entity before saving
    console.log('Product order entity before save:', productOrder);

    return await this.productOrderRepository.save(productOrder); // Salva a entidade no banco de dados
  }

  async findAll(): Promise<ProductOrder[]> {
    return await this.productOrderRepository.find({
      relations: ['menuItem', 'order'],
    });
  }

  async findOne(id: number): Promise<ProductOrder> {
    const productOrder = await this.productOrderRepository.findOne({
      where: { id },
      relations: ['menuItem', 'order'],
    });

    if (!productOrder) {
      throw new NotFoundException(`Product order with ID ${id} not found`);
    }

    return productOrder;
  }

  async update(
    id: number,
    updateData: Partial<ProductOrder>,
  ): Promise<ProductOrder> {
    await this.productOrderRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productOrderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product order with ID ${id} not found`);
    }
  }
}
