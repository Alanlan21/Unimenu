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
exports.PaymentMethodController = void 0;
const common_1 = require("@nestjs/common");
const payment_method_service_1 = require("./payment-method.service");
let PaymentMethodController = class PaymentMethodController {
    constructor(paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }
    async findAll() {
        return this.paymentMethodService.findAll();
    }
};
exports.PaymentMethodController = PaymentMethodController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "findAll", null);
exports.PaymentMethodController = PaymentMethodController = __decorate([
    (0, common_1.Controller)('payment-methods'),
    __metadata("design:paramtypes", [payment_method_service_1.PaymentMethodService])
], PaymentMethodController);
//# sourceMappingURL=payment-method.controller.js.map