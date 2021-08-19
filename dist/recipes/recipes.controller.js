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
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const recipe_model_1 = require("./models/recipe.model");
const recipes_service_1 = require("./recipes.service");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async createRecipe(recipeDto, userId) {
        const result = await this.recipesService.createRecipe(recipeDto, userId);
        return result;
    }
    async updateRecipe(userId, updateRecipeDto) {
        const result = await this.recipesService.updateRecipe(userId, updateRecipeDto);
        return result;
    }
    async getSimplifiedUserRecipesInfo(userId) {
        const result = await this.recipesService.getSimplifiedUserRecipesInfo(userId);
        return result;
    }
    async getUsersLatestRecipesIds(userId) {
        const response = await this.recipesService.getUsersLatestRecipesIds(userId);
        return response;
    }
    async getSingleRecipe(recipeId) {
        const result = await this.recipesService.getSingleRecipe(recipeId);
        return result;
    }
    async getUserRecipesOfRecipeType(userId, recipeType) {
        const result = await this.recipesService.getUserRecipesOfRecipeType(recipeType.recipeType, userId);
        return result;
    }
    async deleteRecipe(userId, recipeId) {
        const result = await this.recipesService.deleteRecipe(userId, recipeId);
        return result;
    }
};
__decorate([
    common_1.Post('createRecipe/:userId'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_model_1.NewRecipeDto, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "createRecipe", null);
__decorate([
    common_1.Put('updateRecipe/:userId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipe_model_1.UpdatedRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "updateRecipe", null);
__decorate([
    common_1.Get('getSimplifiedUserRecipesInfo/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getSimplifiedUserRecipesInfo", null);
__decorate([
    common_1.Get('getUsersLatestRecipesIds/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getUsersLatestRecipesIds", null);
__decorate([
    common_1.Get('getSingleRecipe/:recipeId'),
    __param(0, common_1.Param('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getSingleRecipe", null);
__decorate([
    common_1.Get('getUserRecipesOfRecipeType/:userId'),
    __param(0, common_1.Param("userId")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipe_model_1.RecipeTypeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getUserRecipesOfRecipeType", null);
__decorate([
    common_1.Delete('deleteRecipe/:userId/:recipeId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "deleteRecipe", null);
RecipesController = __decorate([
    common_1.Controller('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map