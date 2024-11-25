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
exports.OwnerController = void 0;
const common_1 = require("@nestjs/common");
const owner_service_1 = require("./owner.service");
const owner_dto_1 = require("./dto/owner.dto");
let OwnerController = class OwnerController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    create(createOwnerDto) {
        return this.ownerService.create(createOwnerDto);
    }
    findAll() {
        return this.ownerService.findAll();
    }
    findOne(id) {
        return this.ownerService.findOne(+id);
    }
    update(id, updateData) {
        return this.ownerService.update(+id, updateData);
    }
    remove(id) {
        return this.ownerService.remove(+id);
    }
};
exports.OwnerController = OwnerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_dto_1.CreateOwnerDto]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "remove", null);
exports.OwnerController = OwnerController = __decorate([
    (0, common_1.Controller)('owners'),
    __metadata("design:paramtypes", [owner_service_1.OwnerService])
], OwnerController);
//# sourceMappingURL=owner.controller.js.map