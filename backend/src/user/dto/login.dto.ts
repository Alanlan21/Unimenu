import { IsArray, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
