import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Request, 
  HttpException, 
  HttpStatus, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../service/user.service'; // Ajuste o caminho conforme sua estrutura
import { LoginDto } from './dto/login.dto'; // Mantive como LoginDto conforme seu código
import { User } from '../entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService, // Adicionei o UserService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email, 
        loginDto.password
      );
      
      return this.authService.login(user);
    } catch (error) {
      // Log do erro no servidor
      console.error('Login error:', error);

      // Lança uma exceção HTTP com detalhes
      throw new HttpException(
        error.message || 'Erro de autenticação', 
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Request() req): Promise<User> {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
