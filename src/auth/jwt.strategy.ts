import { Injectable } from '@nestjs/common';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'suaChaveSecretaAqui', // Use a mesma chave secreta do JwtModule
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findOneByEmail(payload.email);
    return user; // Retorna o usuário, que pode ser acessado na requisição
  }
}
