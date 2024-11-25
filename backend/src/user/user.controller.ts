import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { CreateLoginDto } from './dto/login.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const validatedUser = await this.userService.create(createUserDto);
    return validatedUser;
  }

  @Post('login')
  async login(@Body() loginDto: CreateLoginDto): Promise<any> {
    try {
      // Implemente a lógica de autenticação no userService
      const user = await this.userService.validateUser(loginDto.email, loginDto.password);
      
      // Retorne um token ou informações do usuário
      return {
        token: 'seu_token_jwt_aqui', // Você precisará implementar a geração de token
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      };
    } catch (error) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<User>): Promise<User> {
    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
