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
const common_1 = require("@nestjs/common");
const user_model_1 = require("./models/user.model");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async deleteUser(userId) {
        const response = await this.userService.deleteUser(userId);
        return response;
    }
    async getUserRecipesIds(userId) {
        const result = await this.userService.getUserRecipesIds(userId);
        return result;
    }
    async getUsersLatestRecipesIds(userId) {
        const response = await this.userService.getUsersLatestRecipes(userId);
        return response;
    }
    async getUserListsIds(userId) {
        const response = await this.userService.getUserListsIds(userId);
        return response;
    }
    async getUserWeek(userId) {
        const response = await this.userService.getUserWeek(userId);
        return response;
    }
    async addRecipeToDay(userId, userDayRecipe) {
        const response = await this.userService.addRecipeToDay(userId, userDayRecipe);
        return response;
    }
    async removeRecipeFromDay(userId, userDayRecipe) {
        const response = await this.userService.removeRecipeFromDay(userId, userDayRecipe);
        return response;
    }
    async removeAllRecipesFromWeek(userId) {
        const response = await this.userService.removeAllRecipesFromWeek(userId);
        return response;
    }
};
__decorate([
    common_1.Delete('deleteUser/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Get('getUserRecipesIds/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserRecipesIds", null);
__decorate([
    common_1.Get('getUsersLatestRecipesIds/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersLatestRecipesIds", null);
__decorate([
    common_1.Get('getUserListsIds/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserListsIds", null);
__decorate([
    common_1.Get('getUserWeek/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserWeek", null);
__decorate([
    common_1.Put('addRecipeToDay/:userId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserDayRecipeDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addRecipeToDay", null);
__decorate([
    common_1.Delete('removeRecipeFromDay/:userId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserDayRecipeDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeRecipeFromDay", null);
__decorate([
    common_1.Delete('removeAllRecipesFromWeek/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeAllRecipesFromWeek", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map