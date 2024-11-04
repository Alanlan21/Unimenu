import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductOrderDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  productId: number; // ID do produto associado

  @IsNotEmpty()
  orderId: number; // ID do pedido associado
}
