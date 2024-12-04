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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../entity/payment.entity");
const order_entity_1 = require("../entity/order.entity");
const payment_method_entity_1 = require("../entity/payment-method.entity");
let PaymentService = class PaymentService {
    constructor(paymentRepository, orderRepository, paymentMethodRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.paymentMethodRepository = paymentMethodRepository;
    }
    async create(createPaymentDto) {
        const order = await this.orderRepository.findOne({
            where: { id: createPaymentDto.orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const paymentMethod = await this.paymentMethodRepository.findOne({
            where: { id: createPaymentDto.paymentMethodId },
        });
        if (!paymentMethod) {
            throw new common_1.NotFoundException('Payment Method not found');
        }
        const payment = this.paymentRepository.create({
            value: createPaymentDto.value,
            order: order,
            paymentMethod: paymentMethod,
        });
        return await this.paymentRepository.save(payment);
    }
    async findAll() {
        return await this.paymentRepository.find({
            relations: ['order', 'paymentMethod'],
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(payment_method_entity_1.PaymentMethod)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map