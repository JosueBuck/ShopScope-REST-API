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
const response_model_1 = require("../models/response.model");
let RecipesService = class RecipesService {
    constructor(recipeModel, userRecipesModel) {
        this.recipeModel = recipeModel;
        this.userRecipesModel = userRecipesModel;
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
        await this.addRecipeToUserRecipes(newRecipe, userId);
        try {
            await newRecipe.save();
            return { message: 'Created', updatedData: newRecipe, statusCode: 201 };
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async addRecipeToUserRecipes(recipe, userId) {
        const recipeInfo = {
            _id: recipe.id,
            recipeName: recipe.name,
            recipeType: recipe.recipeType
        };
        const userRecipes = await this.getSimplifiedUserRecipesByUserId(userId);
        userRecipes.recipes.push(recipeInfo);
        try {
            await userRecipes.save();
            return userRecipes.recipes;
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async getSimplifiedUserRecipesInfoRequest(userId) {
        const userRecipesIds = await this.getSimplifiedUserRecipesInfo(userId);
        return { message: 'OK', updatedData: userRecipesIds, statusCode: 200 };
    }
    async getSimplifiedUserRecipesInfo(userId) {
        const userRecipes = await this.getSimplifiedUserRecipesByUserId(userId);
        const userRecipeIds = userRecipes.recipes;
        return userRecipeIds;
    }
    async getUsersLatestRecipesIds(userId) {
        const userRecipes = await this.getSimplifiedUserRecipesByUserId(userId);
        const recipes = userRecipes.recipes;
        const latestRecipes = recipes.slice(-4);
        return { message: 'OK', updatedData: latestRecipes, statusCode: 200 };
    }
    async getSimplifiedUserRecipesByUserId(userId) {
        let userRecipes;
        try {
            userRecipes = await this.userRecipesModel.findOne({ userId: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        if (!userRecipes) {
            throw new common_1.NotFoundException('Could not find user recipes');
        }
        return userRecipes;
    }
    async updateRecipe(userId, updatedRecipe) {
        let recipe = await this.findRecipeById(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;
        const userRecipes = await this.getSimplifiedUserRecipesByUserId(userId);
        userRecipes.recipes.map((recipeInfo) => {
            if (recipeInfo._id == recipe.id) {
                recipeInfo.recipeName = updatedRecipe.name;
                recipeInfo.recipeType = updatedRecipe.recipeType;
            }
        });
        try {
            await userRecipes.save();
            await recipe.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Updated', updatedData: recipe, statusCode: 200 };
    }
    async getSingleRecipe(recipeId) {
        const recipe = await this.findRecipeById(recipeId);
        return { message: 'OK', updatedData: recipe, statusCode: 200 };
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
        let recipes = await this.recipeModel.find().exec();
        ;
        return recipes;
    }
    async getUserRecipesOfRecipeType(recipeType, userId) {
        const userRecipesIds = await this.getSimplifiedUserRecipesInfo(userId);
        const filteredRecipes = await this.recipeModel.find({
            $and: [
                { _id: { $in: userRecipesIds } },
                { recipeType: { $in: recipeType } }
            ]
        }).exec();
        return { message: 'OK', updatedData: filteredRecipes, statusCode: 200 };
    }
    async deleteRecipe(userId, recipeId) {
        await this.getSimplifiedUserRecipesByUserId(userId);
        await this.findRecipeById(recipeId);
        try {
            await this.recipeModel.deleteOne({ _id: recipeId }).exec();
            await this.userRecipesModel.findOneAndUpdate({ userId: userId }, { $pull: { recipes: { _id: recipeId } } }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Deleted', updatedData: recipeId, statusCode: 200 };
    }
    async deleteManyRecipes(recipes) {
        const recipeIdArray = this.getIdsFromUserRecipes(recipes);
        try {
            await this.recipeModel.deleteMany({ _id: { $in: recipeIdArray } }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    getIdsFromUserRecipes(recipes) {
        const recipeIdArray = recipes.map((recipe) => {
            return recipe._id;
        });
        return recipeIdArray;
    }
    async createNewUserRecipeModel(userId) {
        const userRecipes = new this.userRecipesModel({
            userId: userId,
        });
        try {
            await userRecipes.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async deleteUserRecipeModel(userId) {
        try {
            await this.userRecipesModel.deleteOne({ userId: userId });
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
};
RecipesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Recipe')),
    __param(1, mongoose_1.InjectModel('UserRecipes')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map