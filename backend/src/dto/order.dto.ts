import { IsNotEmpty, IsNumber, IsString, IsDate, IsDateString } from 'class-validator';
export class CreateOrderDto {
  order_number: number;
  order_date: Date;
  status: string;
  user_id: number; // Aqui você deve incluir o user_id
}

