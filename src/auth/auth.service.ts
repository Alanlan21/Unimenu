import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'; 
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    console.log('Usuário encontrado:', user);
  
    if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
    }
  
   
    if (password !== user.password) {
        throw new UnauthorizedException('Credenciais inválidas');
    }
  
    const payload = { email: user.email, sub: user.id };
    return {
        access_token: this.jwtService.sign(payload),
    };
  }   

 
}
