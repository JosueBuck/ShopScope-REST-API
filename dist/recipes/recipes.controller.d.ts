import { INewRecipeDto, IUpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(recipeDto: INewRecipeDto): Promise<void>;
    updateRecipe(updateRecipeDto: IUpdatedRecipeDto): Promise<import("./models/recipe.model").IRecipeMongoose>;
    getSingleRecipe(recipeId: string): Promise<{
        id: string;
        name: string;
        recipeType: string;
        cookingTime: number;
        description: string;
        ingredients: import("./models/recipe.model").IIngredient[];
        instructions: string[];
    }>;
    deleteRecipe(recipeId: string): Promise<string>;
}
