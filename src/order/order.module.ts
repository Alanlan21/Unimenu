import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MenuItem } from 'src/menuItem/menuItem.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, MenuItem, ProductOrder])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
