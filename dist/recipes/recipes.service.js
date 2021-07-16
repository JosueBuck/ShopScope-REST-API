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
let RecipesService = class RecipesService {
    constructor(recipeModel) {
        this.recipeModel = recipeModel;
    }
    async createRecipe(recipe) {
        const newRecipe = new this.recipeModel({
            name: recipe.name,
            recipeType: recipe.recipeType,
            cookingTime: recipe.cookingTime,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
        });
        console.log(newRecipe);
        await newRecipe.save();
    }
    async updateRecipe(updatedRecipe) {
        let recipe = await this.findRecipe(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;
        recipe.save();
        return recipe;
    }
    async getSingleRecipe(recipeId) {
        const recipe = await this.findRecipe(recipeId);
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
    async findRecipe(id) {
        let recipe;
        try {
            recipe = await this.recipeModel.findById(id).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Could not find recipe');
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
    async deleteRecipe(recipeId) {
        await this.recipeModel.deleteOne({ _id: recipeId }).exec();
        return recipeId;
    }
};
RecipesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Recipe')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map