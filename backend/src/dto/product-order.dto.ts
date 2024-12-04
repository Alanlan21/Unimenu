import { IsNumber } from "class-validator";

// product-order.dto.ts
export class CreateProductOrderDto {
  @IsNumber()
  menuItemId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  orderId: number;
}
