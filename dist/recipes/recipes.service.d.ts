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
        status: number;
    }>;
    updateRecipe(updatedRecipe: IRecipe): Promise<{
        message: string;
        updatedRecipe: IRecipeMongoose;
        status: number;
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
    findRecipe(id: string): Promise<IRecipeMongoose>;
    getAllRecipes(): Promise<IRecipe[]>;
    getUserRecipesId(userId: string): Promise<string[]>;
    deleteRecipe(userId: string, recipeId: string): Promise<string>;
}
