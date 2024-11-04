import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrder } from './product-order.entity';
import { ProductOrderService } from './product-order.service';
import { ProductOrderController } from './product-order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrder])],
  providers: [ProductOrderService],
  controllers: [ProductOrderController],
  exports: [ProductOrderService],
})
export class ProductOrderModule {}
