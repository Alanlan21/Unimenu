import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from '../entity/payment-method.entity';
import { PaymentMethodService } from '../service/payment-method.service';
import { PaymentMethodController } from '../controller/payment-method.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService, TypeOrmModule],
})
export class PaymentMethodModule {}
