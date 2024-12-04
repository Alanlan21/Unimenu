"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./module/user.module");
const menuItem_module_1 = require("./module/menuItem.module");
const store_module_1 = require("./module/store.module");
const owner_module_1 = require("./module/owner.module");
const order_module_1 = require("./module/order.module");
const payment_method_module_1 = require("./module/payment-method.module");
const payment_module_1 = require("./module/payment.module");
const stripe_module_1 = require("./stripe/stripe.module");
const payment_method_controller_1 = require("./controller/payment-method.controller");
const stripe_controller_1 = require("./stripe/stripe.controller");
const stripe_service_1 = require("./stripe/stripe.service");
const config_1 = require("@nestjs/config");
const product_order_module_1 = require("./module/product-order.module");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
        const stripeSecretKey = this.configService.get('STRIPE_SK');
        common_1.Logger.log(`Stripe Secret Key: ${stripeSecretKey}`);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
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
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            menuItem_module_1.MenuItemModule,
            store_module_1.StoreModule,
            owner_module_1.OwnerModule,
            order_module_1.OrderModule,
            payment_method_module_1.PaymentMethodModule,
            payment_module_1.PaymentModule,
            stripe_module_1.StripeModule,
            product_order_module_1.ProductOrderModule,
        ],
        controllers: [payment_method_controller_1.PaymentMethodController, stripe_controller_1.StripeController],
        providers: [stripe_service_1.StripeService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map