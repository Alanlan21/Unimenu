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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("../entity/store.entity");
const owner_entity_1 = require("../entity/owner.entity");
let StoreService = class StoreService {
    search(query) {
        throw new Error('Method not implemented.');
    }
    constructor(storeRepository, ownerRepository) {
        this.storeRepository = storeRepository;
        this.ownerRepository = ownerRepository;
    }
    async create(createStoreDto) {
        const owner = await this.ownerRepository.findOne({
            where: { id: createStoreDto.ownerId },
        });
        if (!owner) {
            throw new common_1.NotFoundException('Proprietário não encontrado');
        }
        const store = this.storeRepository.create({
            ...createStoreDto,
            owner,
        });
        return await this.storeRepository.save(store);
    }
    async findAll() {
        return await this.storeRepository.find();
    }
    async findOne(id) {
        const store = await this.storeRepository.findOne({
            where: { id },
        });
        relations: ['menuItems', 'owner'];
        if (!store) {
            throw new common_1.NotFoundException('Restaurante não encontrado');
        }
        return store;
    }
    async update(id, updateData) {
        await this.storeRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.storeRepository.delete(id);
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_1.InjectRepository)(owner_entity_1.Owner)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StoreService);
//# sourceMappingURL=store.service.js.map