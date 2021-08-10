import { NewRecipeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(recipeDto: NewRecipeDto, userId: string): Promise<{
        message: string;
        recipeId: any;
        userId: string;
        statusCode: number;
    }>;
    updateRecipe(updateRecipeDto: UpdatedRecipeDto): Promise<{
        message: string;
        updatedRecipe: import("./models/recipe.model").IRecipeMongoose;
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
    deleteRecipe(userId: string, recipeId: string): Promise<{
        message: string;
        recipeId: string;
        statusCode: number;
    }>;
}
