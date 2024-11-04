import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  paymentMethodId: number;
}
