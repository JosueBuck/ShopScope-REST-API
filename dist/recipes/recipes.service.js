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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
let RecipesService = class RecipesService {
    constructor(userService, recipeModel) {
        this.userService = userService;
        this.recipeModel = recipeModel;
    }
    async createRecipe(recipe, userId) {
        const newRecipe = new this.recipeModel({
            name: recipe.name,
            recipeType: recipe.recipeType,
            cookingTime: recipe.cookingTime,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
        });
        await this.userService.addRecipeIdToUser(newRecipe.id, userId);
        try {
            await newRecipe.save();
            return { message: "Created", recipeId: newRecipe.id, userId: userId, statusCode: 201 };
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async updateRecipe(updatedRecipe) {
        let recipe = await this.findRecipeById(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;
        try {
            await recipe.save();
            return { message: "Updated", updatedRecipe: recipe, statusCode: 200 };
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async getSingleRecipe(recipeId) {
        const recipe = await this.findRecipeById(recipeId);
        return {
            id: recipe.id,
            name: recipe.name,
            recipeType: recipe.recipeType,
            cookingTime: recipe.cookingTime,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
        };
    }
    async findRecipeById(id) {
        let recipe;
        try {
            recipe = await this.recipeModel.findById(id).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Innvalid recipe id');
        }
        if (!recipe) {
            throw new common_1.NotFoundException('Could not find recipe');
        }
        return recipe;
    }
    async getAllRecipes() {
        const recipes = await this.recipeModel.find().exec();
        return recipes.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            recipeType: recipe.recipeType,
            cookingTime: recipe.cookingTime,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
        }));
    }
    async deleteRecipe(userId, recipeId) {
        await this.userService.findUserById(userId);
        await this.findRecipeById(recipeId);
        try {
            await this.recipeModel.deleteOne({ _id: recipeId }).exec();
            await this.userService.deleteUsersRecipeId(userId, recipeId);
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: "Deleted", recipeId, statusCode: 200 };
    }
};
RecipesService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('Recipe')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map