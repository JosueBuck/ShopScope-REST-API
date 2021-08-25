import { IResponse } from 'src/models/response.model';
import { NewRecipeDto, RecipeTypeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(userId: string, recipeDto: NewRecipeDto): Promise<IResponse>;
    updateRecipe(userId: string, updateRecipeDto: UpdatedRecipeDto): Promise<IResponse>;
    getSimplifiedUserRecipesInfo(userId: string): Promise<IResponse>;
    getUsersLatestRecipesIds(userId: string): Promise<IResponse>;
    getSingleRecipe(recipeId: string): Promise<IResponse>;
    getUserRecipesOfRecipeType(userId: string, recipeType: RecipeTypeDto): Promise<IResponse>;
    deleteRecipe(userId: string, recipeId: string): Promise<IResponse>;
}
