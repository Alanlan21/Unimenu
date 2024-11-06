import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from '../menuItem/menuItem.entity';
import { ProductOrder } from '../product-order/product-order.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
  ) {}

  // Método para obter o pedido em andamento do cliente
  async getCurrentOrder(idUser: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { user: { id: idUser } },
      relations: ['productOrders', 'productOrders.menuItem'],
    });
  }

  // Método para criar um novo pedido em andamento
  async createOrder(idUser: number): Promise<Order> {
    const newOrder = this.orderRepository.create({
      user: { id: idUser },
      status: 'in_progress',
      productOrders: [],
    });
    return this.orderRepository.save(newOrder);
  }

 // Método para adicionar um item ao pedido
async addItemToOrder(idUser: number, menuItemId: number, quantidade: number) {
  let order = await this.getCurrentOrder(idUser);
  if (!order) {
      order = await this.createOrder(idUser);
  }

  // Recupera o item do menu e verifica a disponibilidade
  const menuItem = await this.menuItemRepository.findOne({ where: { id: menuItemId } });
  if (!menuItem) throw new NotFoundException(`Menu item com ID ${menuItemId} não encontrado`);

  // Cria uma nova entrada em ProductOrder e associa ao pedido
  const productOrder = this.productOrderRepository.create({
      menuItem,
      quantity: quantidade, // Aqui você deve usar o nome da variável passada como parâmetro
      order,
  });

    // Salva a entrada em ProductOrder e retorna o pedido atualizado
    await this.productOrderRepository.save(productOrder);
    return this.getOrderWithItems(order.id);
  }

  // Método para obter o pedido com os itens
  async getOrderWithItems(orderId: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['productOrders', 'productOrders.menuItem'],
    });
  }

  // Método para listar todos os pedidos
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['user'] });
  }

  // Método para buscar um pedido por ID
  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'productOrders', 'productOrders.menuItem'],
    });
  }

  // Método para atualizar o pedido
  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Método para remover o pedido
  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
