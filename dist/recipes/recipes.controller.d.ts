import { NewRecipeDto, RecipeTypeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(recipeDto: NewRecipeDto, userId: string): Promise<import("../models/response.model").IResponse>;
    updateRecipe(userId: string, updateRecipeDto: UpdatedRecipeDto): Promise<import("../models/response.model").IResponse>;
    getSimplifiedUserRecipesInfo(userId: string): Promise<import("./models/recipe.model").ISimplifiedRecipe[]>;
    getUsersLatestRecipesIds(userId: string): Promise<import("./models/recipe.model").ISimplifiedRecipe[]>;
    getSingleRecipe(recipeId: string): Promise<import("./models/recipe.model").IRecipeMongoose>;
    getUserRecipesOfRecipeType(userId: string, recipeType: RecipeTypeDto): Promise<import("./models/recipe.model").IRecipeMongoose[]>;
    deleteRecipe(userId: string, recipeId: string): Promise<import("../models/response.model").IResponse>;
}
