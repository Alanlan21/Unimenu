"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_order_entity_1 = require("./product-order.entity");
const product_order_service_1 = require("./product-order.service");
const product_order_controller_1 = require("./product-order.controller");
let ProductOrderModule = class ProductOrderModule {
};
exports.ProductOrderModule = ProductOrderModule;
exports.ProductOrderModule = ProductOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_order_entity_1.ProductOrder])],
        providers: [product_order_service_1.ProductOrderService],
        controllers: [product_order_controller_1.ProductOrderController],
        exports: [product_order_service_1.ProductOrderService],
    })
], ProductOrderModule);
//# sourceMappingURL=product-order.module.js.map