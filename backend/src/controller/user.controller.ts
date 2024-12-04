import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service'; // Certifique-se de importar o AuthService
import { CreateUserDto } from '../dto/user.dto';
import { CreateLoginDto } from '../dto/login.dto';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Injeção do AuthService
  ) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const validatedUser = await this.userService.create(createUserDto);
    return validatedUser;
  }

  @Post('login')
  async login(@Body() loginDto: CreateLoginDto): Promise<any> {
    try {
      // Validate user
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );

      // Generate JWT using the login method instead of generateJwt
      return this.authService.login(user);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
