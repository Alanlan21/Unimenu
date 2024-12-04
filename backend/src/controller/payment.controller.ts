import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { CreatePaymentDto } from '../dto/payment.dto';
import { Payment } from '../entity/payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }
}
