import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/order.dto';
import { Order } from '../entity/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Método para adicionar um item ao pedido
  @Post(':id_cliente/add-item')
  async addItemToOrder(
    @Param('id_cliente') idCliente: number,
    @Body() body: { menuItemId: number; quantidade: number },
  ) {
    const { menuItemId, quantidade } = body;
    return this.orderService.addItemToOrder(idCliente, menuItemId, quantidade);
  }

  @Post(':id/product-orders')
  async addProductOrders(
    @Param('id') orderId: number,
    @Body() data: { items: Array<{ menuItemId: number; quantity: number }> },
  ) {
    return this.orderService.addProductOrders(orderId, data.items);
  }

  // Método para criar um novo pedido
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto & { idCliente: number },
  ): Promise<Order> {
    // Aqui você pode usar idCliente para associar o pedido ao cliente
    return this.orderService.createOrder(createOrderDto);
  }

  // Método para listar todos os pedidos
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Método para buscar um pedido por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: number): Promise<Order[]> {
    return this.orderService.findByUser(userId);
  }

  // Método para atualizar um pedido
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Order>,
  ): Promise<Order> {
    return this.orderService.update(id, updateData);
  }

  // Método para remover um pedido
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}
