import { Model } from 'mongoose';
import { IRecipe, INewRecipe, IRecipeMongoose } from './models/recipe.model';
export declare class RecipesService {
    private readonly recipeModel;
    constructor(recipeModel: Model<IRecipe>);
    createRecipe(recipe: INewRecipe): Promise<void>;
    updateRecipe(updatedRecipe: IRecipe): Promise<IRecipeMongoose>;
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
    deleteRecipe(recipeId: string): Promise<string>;
}
