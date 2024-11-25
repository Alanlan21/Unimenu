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
exports.MenuItemController = void 0;
const common_1 = require("@nestjs/common");
const menuItem_service_1 = require("./menuItem.service");
const menuItem_dto_1 = require("./dto/menuItem.dto");
let MenuItemController = class MenuItemController {
    constructor(menuItemService) {
        this.menuItemService = menuItemService;
    }
    async create(createMenuItemDto) {
        return await this.menuItemService.create(createMenuItemDto);
    }
    async findAll() {
        return await this.menuItemService.findAll();
    }
    async findOne(id) {
        return await this.menuItemService.findOne(id);
    }
    async update(id, updateData) {
        return await this.menuItemService.update(id, updateData);
    }
    async remove(id) {
        return await this.menuItemService.remove(id);
    }
};
exports.MenuItemController = MenuItemController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menuItem_dto_1.CreateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "remove", null);
exports.MenuItemController = MenuItemController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [menuItem_service_1.MenuItemService])
], MenuItemController);
//# sourceMappingURL=menuItem.controller.js.map