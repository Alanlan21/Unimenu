import { Controller, Get } from '@nestjs/common';
//import { AppService } from './app.service';

@Controller('api')
export class AppController {
    @Get('stripe-public-key')
    getStripePublicKey() {
        return { publicKey: process.env.STRIPE_PK }; // Retorna a chave pública
    }

  
}

