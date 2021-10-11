import { IResponse } from 'src/models/response.model';
import { NewRecipeDto, RecipeTypeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(userId: string, recipeDto: NewRecipeDto): Promise<IResponse>;
    updateRecipe(userId: string, updateRecipeDto: UpdatedRecipeDto): Promise<IResponse>;
    getSimplifiedUserRecipes(userId: string): Promise<IResponse>;
    getLatestSimplifiedUserRecipes(userId: string): Promise<IResponse>;
    getSimplifiedUserRecipesOfRecipeType(userId: string, recipeType: RecipeTypeDto): Promise<IResponse>;
    getRecipe(recipeId: string): Promise<IResponse>;
    deleteRecipe(userId: string, recipeId: string): Promise<IResponse>;
}
