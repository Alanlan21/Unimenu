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
exports.ProductOrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_order_entity_1 = require("./product-order.entity");
let ProductOrderService = class ProductOrderService {
    constructor(productOrderRepository) {
        this.productOrderRepository = productOrderRepository;
    }
    async create(createProductOrderDto) {
        const productOrder = this.productOrderRepository.create(createProductOrderDto);
        return await this.productOrderRepository.save(productOrder);
    }
    async findAll() {
        return await this.productOrderRepository.find();
    }
    async findOne(id) {
        return await this.productOrderRepository.findOne({ where: { id } });
    }
    async update(id, updateData) {
        await this.productOrderRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.productOrderRepository.delete(id);
    }
};
exports.ProductOrderService = ProductOrderService;
exports.ProductOrderService = ProductOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_order_entity_1.ProductOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductOrderService);
//# sourceMappingURL=product-order.service.js.map