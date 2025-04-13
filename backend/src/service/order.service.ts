import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { MenuItem } from '../entity/menuItem.entity';
import { ProductOrder } from '../entity/product-order.entity';
import { CreateOrderDto } from '../dto/order.dto';
import { EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class OrderService {
  findByUser(userId: number): Order[] | PromiseLike<Order[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
    @InjectRepository(User) // Adicione a injeção do repositório User
    private userRepository: Repository<User>,
  ) {}

  async addProductOrders(
    orderId: number,
    items: Array<{ menuItemId: number; quantity: number }>,
  ): Promise<ProductOrder[]> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const productOrders = await Promise.all(
      items.map(async (item) => {
        const productOrder = new ProductOrder();
        productOrder.order = order;
        productOrder.menuItem = await this.menuItemRepository.findOne({
          where: { id: item.menuItemId },
        });
        productOrder.quantity = item.quantity;
        return this.productOrderRepository.save(productOrder);
      }),
    );

    return productOrders;
  }
  // Método para obter o pedido em andamento do cliente
  async getCurrentOrder(idUser: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { user: { id: idUser } },
      relations: ['productOrders', 'productOrders.menuItem'],
    });
  }

  // Método para criar um novo pedido em andamento
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Order();
    order.order_number = createOrderDto.order_number;
    order.order_date = createOrderDto.order_date;
    order.status = createOrderDto.status;
    order.user = user; // Associa o usuário ao pedido

    return this.orderRepository.save(order);
  }

  // Método para adicionar um item ao pedido
  async addItemToOrder(idUser: number, menuItemId: number, quantidade: number) {
    let order = await this.getCurrentOrder(idUser);
    if (!order) {
      // Criar o pedido diretamente com o ID do usuário
      const createOrderDto = {
        user_id: idUser,
        order_number: Date.now(), // Exemplo para gerar um número de pedido único
        order_date: new Date(),
        status: 'in_progress',
      };
      order = await this.createOrder(createOrderDto);
    }

    // Recupera o item do menu e verifica a disponibilidade
    const menuItem = await this.menuItemRepository.findOne({
      where: { id: menuItemId },
    });
    if (!menuItem)
      throw new NotFoundException(
        `Menu item com ID ${menuItemId} não encontrado`,
      );

    // Cria uma nova entrada em ProductOrder e associa ao pedido
    const productOrder = this.productOrderRepository.create({
      menuItem,
      quantity: quantidade,
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
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'productOrders', 'productOrders.menuItem'],
    });
    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return order;
  }

  // Método para atualizar o pedido
  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    console.log(`Atualizando pedido ${id} com dados:`, updateData);
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    Object.assign(order, updateData);
    const updatedOrder = await this.orderRepository.save(order);
    console.log(`Pedido ${id} atualizado:`, updatedOrder);
    return updatedOrder;
  }

  // Método para remover o pedido
  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
