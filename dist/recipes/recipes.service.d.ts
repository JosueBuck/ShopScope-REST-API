import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { IRecipe, INewRecipe, IRecipeMongoose } from './models/recipe.model';
export declare class RecipesService {
    private readonly userService;
    private readonly recipeModel;
    constructor(userService: UserService, recipeModel: Model<IRecipe>);
    createRecipe(recipe: INewRecipe, userId: string): Promise<{
        message: string;
        recipeId: any;
        userId: string;
        statusCode: number;
    }>;
    updateRecipe(updatedRecipe: IRecipe): Promise<{
        message: string;
        updatedRecipe: IRecipeMongoose;
        statusCode: number;
    }>;
    getSingleRecipe(recipeId: string): Promise<{
        id: string;
        name: string;
        recipeType: string;
        cookingTime: number;
        description: string;
        ingredients: import("./models/recipe.model").IIngredient[];
        instructions: string[];
    }>;
    findRecipeById(id: string): Promise<IRecipeMongoose>;
    getAllRecipes(): Promise<IRecipe[]>;
    deleteRecipe(userId: string, recipeId: string): Promise<{
        message: string;
        recipeId: string;
        statusCode: number;
    }>;
}
