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
exports.MenuItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menuItem_entity_1 = require("../entity/menuItem.entity");
const store_entity_1 = require("../entity/store.entity");
let MenuItemService = class MenuItemService {
    constructor(menuItemRepository, storeRepository) {
        this.menuItemRepository = menuItemRepository;
        this.storeRepository = storeRepository;
    }
    async create(createMenuItemDto) {
        const store = await this.storeRepository.findOne({
            where: { id: createMenuItemDto.storeId },
        });
        if (!store) {
            throw new Error('Store not found');
        }
        const menuItem = this.menuItemRepository.create({
            ...createMenuItemDto,
            store: store,
        });
        return await this.menuItemRepository.save(menuItem);
    }
    async findByStore(storeId) {
        const store = await this.storeRepository.findOneBy({ id: storeId });
        if (!store) {
            throw new common_1.NotFoundException('Store not found');
        }
        return this.menuItemRepository.find({
            where: { store: { id: storeId } },
            relations: ['store'],
        });
    }
    async findAll() {
        return await this.menuItemRepository.find();
    }
    async findOne(id) {
        const menuItem = this.menuItemRepository.findOne({
            where: { id },
        });
        relations: ['store', 'productOrders'];
        if (!menuItem) {
            throw new Error('Item não foi encontrado');
        }
        return menuItem;
    }
    async update(id, updateData) {
        await this.menuItemRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.menuItemRepository.delete(id);
    }
};
exports.MenuItemService = MenuItemService;
exports.MenuItemService = MenuItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menuItem_entity_1.MenuItem)),
    __param(1, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuItemService);
//# sourceMappingURL=menuItem.service.js.map