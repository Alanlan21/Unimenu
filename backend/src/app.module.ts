import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user.module';
import { MenuItemModule } from './module/menuItem.module';
import { StoreModule } from './module/store.module';
import { OwnerModule } from './module/owner.module';
import { OrderModule } from './module/order.module';
import { PaymentMethodModule } from './module/payment-method.module';
import { PaymentModule } from './module/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentMethodController } from './controller/payment-method.controller';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductOrderModule } from './module/product-order.module';

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
      logging: true,
    }),
    AuthModule,
    UserModule,
    MenuItemModule,
    StoreModule,
    OwnerModule,
    OrderModule,
    PaymentMethodModule,
    PaymentModule,
    StripeModule,
    ProductOrderModule,
  ],
  controllers: [PaymentMethodController, StripeController],
  providers: [StripeService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SK');
    Logger.log(`Stripe Secret Key: ${stripeSecretKey}`);
  }
}

// ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => {
//         const isMySQL = !!configService.get<string>('DB_HOST');
//         return isMySQL
//           ? {
//               type: 'mysql',
//               host: configService.get<string>(''),
//               port: parseInt(configService.get<string>('DB_PORT'), 10) || 3306,
//               username: configService.get<string>('DB_USERNAME'),
//               password: configService.get<string>('DB_PASSWORD'),
//               database: configService.get<string>('DB_NAME'),
//               autoLoadEntities: true,
//               synchronize: true,
// }
// : {
//     type: 'sqlite',
//     database: configService.get<string>('SQLITE_DB_PATH') || ':memory:',
//     autoLoadEntities: true,
//     synchronize: true,
//   };
