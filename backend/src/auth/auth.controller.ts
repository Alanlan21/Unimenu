import { 
  Controller, 
  Post, 
  Body, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
