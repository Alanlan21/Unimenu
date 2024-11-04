import { IsNotEmpty, IsNumber, IsString, IsDate, IsDateString } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    order_number: number;
  
    @IsNotEmpty()
    @IsDateString() // Usa um formato de data válido
    order_date: Date;
  
    @IsNotEmpty()
    @IsString()
    order_status: string;

  @IsNotEmpty()
  customer_id: number; // Referenciando o usuário
}
