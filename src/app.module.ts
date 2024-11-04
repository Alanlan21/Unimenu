import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MenuItemModule } from './menuItem/menuItem.module';
import { StoreModule } from './store/store.module';
import { OwnerModule } from './owner/owner.module';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { PaymentMethodController } from './payment-method/payment-method.controller';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentModule } from './payment/payment.module';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'unimenu',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MenuItemModule,
    StoreModule,
    OwnerModule,
    OrderModule,
    PaymentMethodModule,
    PaymentModule,
    StripeModule
    
     
  ],
  controllers: [PaymentMethodController, StripeController],
  providers: [StripeService]
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SK');
    Logger.log(`Stripe Secret Key: ${stripeSecretKey}`);
} 
  }
