/// <reference types="mongoose" />
import { NewRecipeDto, RecipeTypeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(recipeDto: NewRecipeDto, userId: string): Promise<{
        message: string;
        userId: string;
        recipe: import("./models/recipe.model").IRecipe & import("mongoose").Document<any, any>;
        statusCode: number;
    }>;
    updateRecipe(userId: string, updateRecipeDto: UpdatedRecipeDto): Promise<{
        message: string;
        updatedRecipe: import("./models/recipe.model").IRecipeMongoose;
        statusCode: number;
    }>;
    getSimplifiedUserRecipesInfo(userId: string): Promise<import("./models/recipe.model").ISimplifiedRecipe[]>;
    getUsersLatestRecipesIds(userId: string): Promise<import("./models/recipe.model").ISimplifiedRecipe[]>;
    getSingleRecipe(recipeId: string): Promise<{
        id: string;
        name: string;
        recipeType: import("./models/recipe.model").RecipeType[];
        cookingTime: number;
        description: string;
        ingredients: import("./models/recipe.model").IIngredient[];
        instructions: string[];
    }>;
    getUserRecipesOfRecipeType(userId: string, recipeType: RecipeTypeDto): Promise<(import("./models/recipe.model").IRecipe & import("mongoose").Document<any, any>)[]>;
    deleteRecipe(userId: string, recipeId: string): Promise<{
        message: string;
        recipeId: string;
        statusCode: number;
    }>;
}
