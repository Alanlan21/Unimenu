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
        const secretKey = process.env.STRIPE_SECRET_KEY || this.configService.get('STRIPE_SECRET_KEY');
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
    async createCheckoutSession(items, orderId) {
        try {
            for (const item of items) {
                if (!item.name || typeof item.name !== 'string') {
                    throw new Error('Nome do item é obrigatório e deve ser uma string.');
                }
                if (!item.amount || item.amount <= 0) {
                    throw new Error(`Valor do item "${item.name}" é inválido. Deve ser maior que 0.`);
                }
                if (!item.quantity || item.quantity <= 0) {
                    throw new Error(`Quantidade do item "${item.name}" é inválida. Deve ser maior que 0.`);
                }
            }
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';
            const successUrl = `${frontendUrl}/redirect/success`;
            const cancelUrl = `${frontendUrl}/redirect/cancel`;
            console.log('Criando Checkout Session com URLs:', { successUrl, cancelUrl });
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: items.map(item => ({
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.amount,
                    },
                    quantity: item.quantity,
                })),
                mode: 'payment',
                success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
                cancel_url: `${cancelUrl}?order_id=${orderId}`,
                metadata: {
                    order_id: orderId.toString(),
                },
            });
            return {
                url: session.url,
                sessionId: session.id,
            };
        }
        catch (error) {
            console.error('Erro ao criar Checkout Session no Stripe:', error.response?.data || error.message);
            throw error;
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map