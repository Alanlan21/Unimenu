import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  rg: string;

  @IsNotEmpty()
  @IsString()
  orgao_emissor_rg: string;

  @IsNotEmpty()
  @IsString()
  dados_bancarios_banco: string;

  @IsNotEmpty()
  @IsString()
  dados_bancarios_agencia: string;

  @IsNotEmpty()
  @IsString()
  dados_bancarios_conta: string;

  @IsNotEmpty()
  @IsString()
  dados_bancarios_digito: string;
}
