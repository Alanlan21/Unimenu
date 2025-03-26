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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../service/user.service");
const login_dto_1 = require("./dto/login.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(loginDto) {
        console.log('Backend - Login recebido:', loginDto);
        console.log('Backend - Origem:', this.httpContext?.getRequest()?.headers.origin);
        try {
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);
            console.log('Backend - Usuário validado:', user);
            const result = await this.authService.login(user);
            console.log('Backend - Login sucesso:', result);
            return result;
        }
        catch (error) {
            console.log('Backend - Login falhou:', error.message);
            throw new common_1.HttpException(error.message || 'Erro de autenticação', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getCurrentUser(req) {
        const userId = req.user.id;
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new common_1.HttpException('Usuário não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map