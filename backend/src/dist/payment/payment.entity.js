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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../order/order.entity");
const payment_method_entity_1 = require("../payment-method/payment-method.entity");
let Payment = class Payment {
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Payment.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, order => order.payments),
    __metadata("design:type", order_entity_1.Order)
], Payment.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_method_entity_1.PaymentMethod, paymentMethod => paymentMethod.payments),
    __metadata("design:type", payment_method_entity_1.PaymentMethod)
], Payment.prototype, "paymentMethod", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)()
], Payment);
//# sourceMappingURL=payment.entity.js.map