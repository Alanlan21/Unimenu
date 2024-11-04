import { Controller, Get } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.findAll();
  }
}
