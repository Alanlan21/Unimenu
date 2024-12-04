import { Controller, Get } from '@nestjs/common';
import { PaymentMethodService } from '../service/payment-method.service';
import { PaymentMethod } from '../entity/payment-method.entity';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.findAll();
  }
}
