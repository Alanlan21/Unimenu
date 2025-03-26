import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  isDateString,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmail()
  confirmEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsString()
  gender: string;

}
