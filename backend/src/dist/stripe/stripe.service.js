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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor(configService) {
        this.configService = configService;
        const secretKey = 'sk_test_51Q5UHjJvaS5rJye8xIac6JL2nGPKabVck3E3MSUS0NzM9VAcALxNgDNilvt7vlYYI51vXe04oP0PMusCMGdJzTwA00UM9QR7KT';
        if (!secretKey) {
            throw new Error('A chave secreta do Stripe não está definida.');
        }
        this.stripe = new stripe_1.default(secretKey, {
            apiVersion: '2025-02-24.acacia',
        });
    }
    async createPaymentIntent(amount, currency) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency,
        });
        return {
            client_secret: paymentIntent.client_secret,
        };
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map