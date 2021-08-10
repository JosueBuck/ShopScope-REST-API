import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { IRecipe, INewRecipe, IRecipeMongoose, RecipeType } from './models/recipe.model';

@Injectable()
export class RecipesService {

    constructor(
        private readonly userService: UserService,
        @InjectModel('Recipe') private readonly recipeModel: Model<IRecipe>
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
        await this.userService.addRecipeIdToUser(newRecipe.id, userId);
        try {
            await newRecipe.save();
            return { message: "Created", recipeId: newRecipe.id, userId: userId, statusCode: 201 } 
        } catch {
            throw new RequestTimeoutException();
        }
        
    }

    async updateRecipe(updatedRecipe: IRecipe) {
        let recipe = await this.findRecipeById(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;
        try {
            await recipe.save()
            return { message: "Updated", updatedRecipe: recipe, statusCode: 200 };
        } catch {
            throw new RequestTimeoutException();
        } 
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
        const userRecipesIds = await this.userService.getUserRecipesIds(userId);
        const filteredRecipes = await this.recipeModel.find({
            $and: [
                {_id: { $in: userRecipesIds}},
                {recipeType: { $in: recipeType}}
            ]
        }).exec();
        return filteredRecipes;
    }

    async deleteRecipe(userId: string, recipeId: string) {

        await this.userService.findUserById(userId);
        await this.findRecipeById(recipeId);

        try {
            await this.recipeModel.deleteOne({_id: recipeId}).exec();
            await this.userService.deleteUsersRecipeId(userId, recipeId);
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: "Deleted", recipeId, statusCode: 200 };
    }
}
