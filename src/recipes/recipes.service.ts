import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/models/response.model';
import { IRecipe, INewRecipe, IRecipeMongoose, RecipeType, IUserRecipes, IUserRecipesMongoose, ISimplifiedRecipe } from './models/recipe.model';

@Injectable()
export class RecipesService {

    constructor(
        @InjectModel('Recipe') private readonly recipeModel: Model<IRecipe>,
        @InjectModel('UserRecipes') private readonly userRecipesModel: Model<IUserRecipes>,
    ) { }

    async createRecipe(recipe: INewRecipe, userId: string): Promise<IResponse> {

        const newRecipe: IRecipeMongoose = new this.recipeModel(
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
            return { message: 'Created', updatedData: newRecipe, statusCode: 201 } 
        } catch {
            throw new RequestTimeoutException();
        } 
    }

    async addRecipeToUserRecipes(recipe: IRecipeMongoose, userId: string): Promise<ISimplifiedRecipe[]> {

        const recipeInfo: ISimplifiedRecipe = {
            _id: recipe.id,
            recipeName: recipe.name,
            recipeType: recipe.recipeType
        }

        const userRecipes: IUserRecipesMongoose = await this.getSimplifiedUserRecipesByUserId(userId);
        userRecipes.recipes.push(recipeInfo);

        try {
            await userRecipes.save();
            return userRecipes.recipes;
        } catch {
            throw new RequestTimeoutException();
        } 

    }

    async getSimplifiedUserRecipesInfoRequest(userId: string): Promise<IResponse> {

        const userRecipesIds = await this.getSimplifiedUserRecipesInfo(userId);

        return { message: 'OK', updatedData: userRecipesIds, statusCode: 200 }

    }

    async getSimplifiedUserRecipesInfo(userId: string): Promise<ISimplifiedRecipe[]> {

        const userRecipes: IUserRecipesMongoose = await this.getSimplifiedUserRecipesByUserId(userId);

        const userRecipeIds: ISimplifiedRecipe[] = userRecipes.recipes;
        return userRecipeIds;

    }

    async getUsersLatestRecipesIds(userId: string): Promise<IResponse> {

        const userRecipes: IUserRecipesMongoose = await this.getSimplifiedUserRecipesByUserId(userId);

        const recipes: ISimplifiedRecipe[] = userRecipes.recipes;

        const latestRecipes: ISimplifiedRecipe[] = recipes.slice(-4);

        return { message: 'OK', updatedData: latestRecipes, statusCode: 200 };

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

    async updateRecipe(userId: string, updatedRecipe: IRecipe): Promise<IResponse> {

        let recipe: IRecipeMongoose = await this.findRecipeById(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;

        const userRecipes: IUserRecipesMongoose = await this.getSimplifiedUserRecipesByUserId(userId);
        userRecipes.recipes.map((recipeInfo) => {
            if (recipeInfo._id == recipe.id) {
                recipeInfo.recipeName = updatedRecipe.name;
                recipeInfo.recipeType = updatedRecipe.recipeType;
            }
        })

        try {
            await userRecipes.save();
            await recipe.save();
        } catch {
            throw new RequestTimeoutException();
        } 

        return { message: 'Updated', updatedData: recipe, statusCode: 200 };

    }

    async getSingleRecipe(recipeId: string): Promise<IResponse> {

        const recipe: IRecipeMongoose = await this.findRecipeById(recipeId);

        return  { message: 'OK', updatedData: recipe, statusCode: 200 };

    }


    async findRecipeById(id: string): Promise<IRecipeMongoose> {

        let recipe: IRecipeMongoose;

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

    async getAllRecipes(): Promise<IRecipeMongoose[]> {

        let recipes: IRecipeMongoose[] = await this.recipeModel.find().exec();;
        return recipes;

    }

    async getUserRecipesOfRecipeType(recipeType: RecipeType[], userId: string): Promise<IResponse> {

        const userRecipesIds: ISimplifiedRecipe[] = await this.getSimplifiedUserRecipesInfo(userId);

        const filteredRecipes: IRecipeMongoose[] = await this.recipeModel.find({
            $and: [
                {_id: { $in: userRecipesIds}},
                {recipeType: { $in: recipeType}}
            ]
        }).exec();

        return { message: 'OK', updatedData: filteredRecipes, statusCode: 200 };

    }

    async deleteRecipe(userId: string, recipeId: string): Promise<IResponse> {

        await this.getSimplifiedUserRecipesByUserId(userId);
        await this.findRecipeById(recipeId);

        try {
            await this.recipeModel.deleteOne({_id: recipeId}).exec();
            await this.userRecipesModel.findOneAndUpdate(
                {userId: userId },
                { $pull: { recipes: { _id: recipeId } }}
            ).exec();
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Deleted', updatedData: recipeId, statusCode: 200 };

    }

    async deleteManyRecipes(recipes: ISimplifiedRecipe[]): Promise<void> {

        const recipeIdArray: string[] = this.getIdsFromUserRecipes(recipes);

        try {
            await this.recipeModel.deleteMany({ _id: { $in: recipeIdArray }}).exec();
        } catch {
            throw new RequestTimeoutException();
        }        
    }

    getIdsFromUserRecipes(recipes: ISimplifiedRecipe[]): string[] {

        const recipeIdArray: string[] = recipes.map((recipe) => {
            return recipe._id
        });
        return recipeIdArray;
    
    }

    async createNewUserRecipeModel(userId: string): Promise<void> {

        const userRecipes: IUserRecipesMongoose = new this.userRecipesModel(
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

    async deleteUserRecipeModel(userId: string): Promise<void> {

        try {
            await this.userRecipesModel.deleteOne({ userId: userId });
        } catch {
            throw new RequestTimeoutException();
        }
        
    }
    
}
