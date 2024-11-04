import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrder } from './product-order.entity';
import { CreateProductOrderDto } from './dto/product-order.dto';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
  ) {}

  async create(createProductOrderDto: CreateProductOrderDto): Promise<ProductOrder> {
    const productOrder = this.productOrderRepository.create(createProductOrderDto);
    return await this.productOrderRepository.save(productOrder);
  }

  async findAll(): Promise<ProductOrder[]> {
    return await this.productOrderRepository.find();
  }

  async findOne(id: number): Promise<ProductOrder> {
    return await this.productOrderRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<ProductOrder>): Promise<ProductOrder> {
    await this.productOrderRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productOrderRepository.delete(id);
  }
}
