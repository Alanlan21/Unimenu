import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
<<<<<<< HEAD
import { MenuItem } from 'src/menuItem/menuItem.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, MenuItem, ProductOrder])],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
