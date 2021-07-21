import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeoutError } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { IRecipe, INewRecipe, IRecipeMongoose } from './models/recipe.model';

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
        await this.userService.addRecipeToUser(newRecipe.id, userId);
        try {
            await newRecipe.save();
            return { message: "Recipe was created.", recipeId: newRecipe.id, userId: userId, status: 200 } 
        } catch {
            throw new TimeoutError();
        }
        
    }

    async updateRecipe(updatedRecipe: IRecipe) {
        let recipe = await this.findRecipe(updatedRecipe.id);
        recipe.name = updatedRecipe.name;
        recipe.recipeType = updatedRecipe.recipeType;
        recipe.cookingTime = updatedRecipe.cookingTime;
        recipe.description = updatedRecipe.description;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.instructions = updatedRecipe.instructions;
        try {
            await recipe.save()
            return { message: "Recipe was updated", updatedRecipe: recipe, status: 200 };;
        } catch {
            throw new TimeoutError();
        } 
    }

    async getSingleRecipe(recipeId: string) {
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


    async findRecipe(id: string): Promise<IRecipeMongoose> {
        let recipe;
        try {
            recipe = await this.recipeModel.findById(id).exec();
        } catch {
            throw new NotFoundException('Could not find recipe');
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
    
    async getUserRecipesId(userId: string) {
        const userRecipes = await this.userService.findUserRecipesById(userId);
        const userRecipeIds = userRecipes.recipes;
        return userRecipeIds;
    }

    async deleteRecipe(userId: string, recipeId: string) {
        await this.recipeModel.deleteOne({_id: recipeId}).exec();
        await this.userService.deleteUserRecipe(userId, recipeId);
        return recipeId;
    }
}
