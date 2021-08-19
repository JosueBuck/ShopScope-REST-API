import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRecipe, INewRecipe, IRecipeMongoose, RecipeType, IUserRecipes, IUserRecipesMongoose, ISimplifiedRecipe } from './models/recipe.model';

@Injectable()
export class RecipesService {

    constructor(
        @InjectModel('Recipe') private readonly recipeModel: Model<IRecipe>,
        @InjectModel('UserRecipes') private readonly userRecipesModel: Model<IUserRecipes>,
    ) { }

    async createRecipe(recipe: INewRecipe, userId: string) {
        const newRecipe = new this.recipeModel(
            {
                name: recipe.name,
                recipeType: recipe.recipeType,
                cookingTime: recipe.cookingTime,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions
            }
        );
        await this.addRecipeToUserRecipes(newRecipe, userId);
        try {
            await newRecipe.save();
            return { message: 'Created', userId: userId, recipe: newRecipe, statusCode: 201 } 
        } catch {
            throw new RequestTimeoutException();
        } 
    }

    async addRecipeToUserRecipes(recipe: IRecipeMongoose, userId: string) {
        const recipeInfo: ISimplifiedRecipe = {
            _id: recipe.id,
            recipeName: recipe.name,
            recipeType: recipe.recipeType
        }
        const userRecipes: IUserRecipesMongoose = await this.getSimplifiedUserRecipesByUserId(userId)
        userRecipes.recipes.push(recipeInfo);
        try {
            await userRecipes.save();
        } catch {
            throw new RequestTimeoutException();
        } 
    }

    async getSimplifiedUserRecipesInfo(userId: string) {
        const userRecipes = await this.getSimplifiedUserRecipesByUserId(userId);
        const userRecipeIds = userRecipes.recipes;
        return userRecipeIds;
    }

    async getUsersLatestRecipesIds(userId: string) {
        const userRecipes = await this.getSimplifiedUserRecipesByUserId(userId);
        const recipes = userRecipes.recipes;
        const latestRecipes = recipes.slice(-4);
        return latestRecipes;
    }

    async getSimplifiedUserRecipesByUserId(userId: string): Promise<IUserRecipesMongoose> {
        let userRecipes: IUserRecipesMongoose;
        try {
            userRecipes = await this.userRecipesModel.findOne({ userId: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!userRecipes) {
            throw new NotFoundException('Could not find user recipes');
        }
        return userRecipes;
    }

    async updateRecipe(userId: string, updatedRecipe: IRecipe) {
        let recipe = await this.findRecipeById(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;

        const userRecipes: IUserRecipesMongoose = await this.getSimplifiedUserRecipesByUserId(userId)
        userRecipes.recipes.map((recipeInfo) => {
            if (recipeInfo._id == recipe.id) {
                recipeInfo.recipeName = updatedRecipe.name;
                recipeInfo.recipeType = updatedRecipe.recipeType;
            }
        })

        try {
            await userRecipes.save();
            await recipe.save()
        } catch {
            throw new RequestTimeoutException();
        } 

        return { message: 'Updated', updatedRecipe: recipe, statusCode: 200 };
    }

    async getSingleRecipe(recipeId: string) {
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


    async findRecipeById(id: string): Promise<IRecipeMongoose> {
        let recipe;
        try {
            recipe = await this.recipeModel.findById(id).exec();
        } catch {
            throw new NotFoundException('Innvalid recipe id');
        }
        
        if (!recipe) {
            throw new NotFoundException('Could not find recipe');
        }
        return recipe;
    }

    async getAllRecipes(): Promise<IRecipe[]> {
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

    async getUserRecipesOfRecipeType(recipeType: RecipeType[], userId: string) {

        const userRecipesIds = await this.getSimplifiedUserRecipesInfo(userId);

        const filteredRecipes = await this.recipeModel.find({
            $and: [
                {_id: { $in: userRecipesIds}},
                {recipeType: { $in: recipeType}}
            ]
        }).exec();

        return filteredRecipes;

    }

    async deleteRecipe(userId: string, recipeId: string) {

        await this.getSimplifiedUserRecipesByUserId(userId);
        await this.findRecipeById(recipeId);

        try {
            await this.recipeModel.deleteOne({_id: recipeId}).exec();
            await this.deleteUsersRecipeId(userId, recipeId);
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Deleted', recipeId, statusCode: 200 };
    }

    async deleteUsersRecipeId(userId: string, recipeId: string) {
        const response = await this.userRecipesModel.findOneAndUpdate(
           {userId: userId },
           { $pull: { recipes: { _id: recipeId } }}
       ).exec();
       console.log(response);
    }

    async createNewUserRecipeModel(userId: string) {
        const userRecipes = new this.userRecipesModel(
            {
                userId: userId,
            }
        );

        try {
            await userRecipes.save();
        } catch {
            throw new RequestTimeoutException();
        }
    }

    async deleteUserRecipeModel(userId: string) {
        const dbResponse = await this.userRecipesModel.deleteOne({ userId: userId });
    }

    async deleteManyRecipes(recipes: ISimplifiedRecipe[]) {
        const recipeIdArray = this.getIdsFromUserRecipes(recipes);
        try {
            const dbResponse = await this.recipeModel.deleteMany({ _id: { $in: recipeIdArray }}).exec();
        } catch {
            throw new RequestTimeoutException();
        }        
    }

    getIdsFromUserRecipes(recipes: ISimplifiedRecipe[]) {
        const recipeIdArray: string[] = recipes.map((recipe) => {
            return recipe._id
        });
        return recipeIdArray;
    }
}
