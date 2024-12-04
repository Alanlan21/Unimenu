import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entity/payment.entity';
import { PaymentService } from '../service/payment.service';
import { PaymentController } from '../controller/payment.controller';
import { OrderModule } from 'src/module/order.module';
import { PaymentMethodModule } from 'src/module/payment-method.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    OrderModule,
    PaymentMethodModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
