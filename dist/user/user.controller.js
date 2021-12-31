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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt.auth.guard");
const user_auth_guard_1 = require("../auth/guards/user.auth.guard");
const response_model_1 = require("../models/response.model");
const user_model_1 = require("./models/user.model");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(loginData) {
        const response = await this.userService.loginUser(loginData);
        return response;
    }
    async register(registerData) {
        const response = await this.userService.registerUser(registerData);
        return response;
    }
    async deleteUser(userId) {
        const response = await this.userService.deleteUser(userId);
        return response;
    }
    async updateUserInformations(userId, updatedUser) {
        const response = await this.userService.updateUserInformations(userId, updatedUser);
        ;
        return response;
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created',
        type: response_model_1.LoginResponse,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Wrong username or password'
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Wrong username or password'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.LoginDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    openapi.ApiOperation({ description: "Add jwt token to response, so the user doesnt need to login again" }),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created',
        type: response_model_1.RegisterResponse,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'User with this name already exists'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.RegisterDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Delete)('deleteUser/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.DeleteUserResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | No user with this id.'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Put)('updateUserInformations/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.UpdateUserInformationsResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | No user with this id.'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UpdatedUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInformations", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map