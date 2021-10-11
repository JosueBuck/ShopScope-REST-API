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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt.auth.guard");
const user_auth_guard_1 = require("../auth/guards/user.auth.guard");
const response_model_1 = require("../models/response.model");
const recipe_model_1 = require("./models/recipe.model");
const recipes_service_1 = require("./recipes.service");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async createRecipe(userId, recipeDto) {
        const response = await this.recipesService.createRecipe(recipeDto, userId);
        return response;
    }
    async updateRecipe(userId, updateRecipeDto) {
        const response = await this.recipesService.updateRecipe(userId, updateRecipeDto);
        return response;
    }
    async getSimplifiedUserRecipes(userId) {
        const response = await this.recipesService.getSimplifiedUserRecipesRequest(userId);
        return response;
    }
    async getLatestSimplifiedUserRecipes(userId) {
        const response = await this.recipesService.getLatestSimplifiedUserRecipes(userId);
        return response;
    }
    async getSimplifiedUserRecipesOfRecipeType(userId, recipeType) {
        const response = await this.recipesService.getSimplifiedUserRecipesOfRecipeType(recipeType.recipeType, userId);
        return response;
    }
    async getRecipe(recipeId) {
        const response = await this.recipesService.getRecipe(recipeId);
        return response;
    }
    async deleteRecipe(userId, recipeId) {
        const response = await this.recipesService.deleteRecipe(userId, recipeId);
        return response;
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    common_1.Post('createRecipe/:userId'),
    swagger_1.ApiCreatedResponse({
        description: 'Created',
        type: response_model_1.CreateRecipeResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipe_model_1.NewRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "createRecipe", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    common_1.Put('updateRecipe/:userId'),
    swagger_1.ApiOkResponse({
        description: 'OK',
        type: response_model_1.UpdateRecipeResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipe_model_1.UpdatedRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "updateRecipe", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    common_1.Get('getSimplifiedUserRecipes/:userId'),
    swagger_1.ApiOkResponse({
        description: 'OK',
        type: response_model_1.GetSimplifiedUserRecipesResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getSimplifiedUserRecipes", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    common_1.Get('getLatestSimplifiedUserRecipes/:userId'),
    swagger_1.ApiOkResponse({
        description: 'OK',
        type: response_model_1.GetSimplifiedUserRecipesResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getLatestSimplifiedUserRecipes", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    common_1.Get('getSimplifiedUserRecipesOfRecipeType/:userId'),
    swagger_1.ApiOkResponse({
        description: 'OK',
        type: response_model_1.getSimplifiedUserRecipesOfRecipeTypeResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param("userId")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipe_model_1.RecipeTypeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getSimplifiedUserRecipesOfRecipeType", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('getRecipe/:recipeId'),
    swagger_1.ApiOkResponse({
        description: 'OK',
        type: response_model_1.GetRecipeResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getRecipe", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    common_1.Delete('deleteRecipe/:userId/:recipeId'),
    swagger_1.ApiOkResponse({
        description: 'Deleted',
        type: response_model_1.DeleteRecipeResponse
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "deleteRecipe", null);
RecipesController = __decorate([
    swagger_1.ApiTags('recipes'),
    common_1.Controller('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map