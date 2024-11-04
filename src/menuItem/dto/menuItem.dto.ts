import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMenuItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  storeId: number;

}
