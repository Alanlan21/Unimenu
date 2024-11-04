import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto); // Cria a instância do pedido
    return await this.orderRepository.save(order); // Salva no banco de dados
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['customer_id'] }); // Incluir relacionamento se necessário
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({ where: { id }, relations: ['customer_id'] });
  }

  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
