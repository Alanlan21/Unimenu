import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { MenuItem } from '../entity/menuItem.entity';
import { ProductOrder } from '../entity/product-order.entity';
import { UserModule } from 'src/module/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, MenuItem, ProductOrder]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule],
})
export class OrderModule {}
