import { INewRecipeDto, IUpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(recipeDto: INewRecipeDto, userId: string): Promise<{
        message: string;
        recipeId: any;
        userId: string;
        status: number;
    }>;
    updateRecipe(updateRecipeDto: IUpdatedRecipeDto): Promise<{
        message: string;
        updatedRecipe: import("./models/recipe.model").IRecipeMongoose;
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
    deleteRecipe(userId: string, recipeId: string): Promise<string>;
}
