import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard'; 

@Module({
  imports: [
    UserModule, // Importando o módulo de usuário
    PassportModule,
    JwtModule.register({
      secret: 'suaChaveSecretaAqui', // Substitua por uma variável de ambiente em produção
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // Removido o UserService
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard], // Exportando o AuthService e o JwtAuthGuard
})
export class AuthModule {}
