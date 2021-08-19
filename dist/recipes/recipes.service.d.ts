import { Model } from 'mongoose';
import { IRecipe, INewRecipe, IRecipeMongoose, RecipeType, IUserRecipes, IUserRecipesMongoose, ISimplifiedRecipe } from './models/recipe.model';
export declare class RecipesService {
    private readonly recipeModel;
    private readonly userRecipesModel;
    constructor(recipeModel: Model<IRecipe>, userRecipesModel: Model<IUserRecipes>);
    createRecipe(recipe: INewRecipe, userId: string): Promise<{
        message: string;
        userId: string;
        recipe: IRecipe & import("mongoose").Document<any, any>;
        statusCode: number;
    }>;
    addRecipeToUserRecipes(recipe: IRecipeMongoose, userId: string): Promise<void>;
    getSimplifiedUserRecipesInfo(userId: string): Promise<ISimplifiedRecipe[]>;
    getUsersLatestRecipesIds(userId: string): Promise<ISimplifiedRecipe[]>;
    getSimplifiedUserRecipesByUserId(userId: string): Promise<IUserRecipesMongoose>;
    updateRecipe(userId: string, updatedRecipe: IRecipe): Promise<{
        message: string;
        updatedRecipe: IRecipeMongoose;
        statusCode: number;
    }>;
    getSingleRecipe(recipeId: string): Promise<{
        id: string;
        name: string;
        recipeType: RecipeType[];
        cookingTime: number;
        description: string;
        ingredients: import("./models/recipe.model").IIngredient[];
        instructions: string[];
    }>;
    findRecipeById(id: string): Promise<IRecipeMongoose>;
    getAllRecipes(): Promise<IRecipe[]>;
    getUserRecipesOfRecipeType(recipeType: RecipeType[], userId: string): Promise<(IRecipe & import("mongoose").Document<any, any>)[]>;
    deleteRecipe(userId: string, recipeId: string): Promise<{
        message: string;
        recipeId: string;
        statusCode: number;
    }>;
    deleteUsersRecipeId(userId: string, recipeId: string): Promise<void>;
    createNewUserRecipeModel(userId: string): Promise<void>;
    deleteUserRecipeModel(userId: string): Promise<void>;
    deleteManyRecipes(recipes: ISimplifiedRecipe[]): Promise<void>;
    getIdsFromUserRecipes(recipes: ISimplifiedRecipe[]): string[];
}
