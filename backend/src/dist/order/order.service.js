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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const menuItem_entity_1 = require("../menuItem/menuItem.entity");
const product_order_entity_1 = require("../product-order/product-order.entity");
let OrderService = class OrderService {
    constructor(orderRepository, menuItemRepository, productOrderRepository) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
        this.productOrderRepository = productOrderRepository;
    }
    async getCurrentOrder(idUser) {
        return this.orderRepository.findOne({
            where: { user: { id: idUser } },
            relations: ['productOrders', 'productOrders.menuItem'],
        });
    }
    async createOrder(idUser) {
        const newOrder = this.orderRepository.create({
            user: { id: idUser },
            status: 'in_progress',
            productOrders: [],
        });
        return this.orderRepository.save(newOrder);
    }
    async addItemToOrder(idUser, menuItemId, quantidade) {
        let order = await this.getCurrentOrder(idUser);
        if (!order) {
            order = await this.createOrder(idUser);
        }
        const menuItem = await this.menuItemRepository.findOne({ where: { id: menuItemId } });
        if (!menuItem)
            throw new common_1.NotFoundException(`Menu item com ID ${menuItemId} não encontrado`);
        const productOrder = this.productOrderRepository.create({
            menuItem,
            quantity: quantidade,
            order,
        });
        await this.productOrderRepository.save(productOrder);
        return this.getOrderWithItems(order.id);
    }
    async getOrderWithItems(orderId) {
        return this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['productOrders', 'productOrders.menuItem'],
        });
    }
    async findAll() {
        return this.orderRepository.find({ relations: ['user'] });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'productOrders', 'productOrders.menuItem'],
        });
        if (!order) {
            throw new common_1.NotFoundException("Pedido não encontrado");
        }
        return order;
    }
    async update(id, updateData) {
        await this.orderRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.orderRepository.delete(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(menuItem_entity_1.MenuItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_order_entity_1.ProductOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map